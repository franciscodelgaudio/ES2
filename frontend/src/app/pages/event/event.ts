import { Component, OnInit, inject, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventLectures } from '../event-lectures/event-lectures';
import { ApiService } from '../../core/services/api';
import { Auth } from '../../core/services/auth';
import { OAuthService, OAuthEvent } from 'angular-oauth2-oidc';

export interface EventLecture {
  eventLectureId: number;
  nameEventLecture: string;
  speaker: string;
  startTime: string;
  endTime: string;
  description: string;
  address: string;
  quantityVacancies: number;
  startDate: string;
  isSubscribed: boolean;
}

export interface MainEvent {
  eventId: number;
  nameEvent: string;
  address: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  description: string;
  imageUrl: string;
  lectures: EventLecture[];
  eventType: EventType;
  eventManager: EventManager;
}

export interface EventType {
  eventTypeId: number;
  nameEventType: string;
}

export interface EventManager {
  eventManagerId: number;
  name: string;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, DatePipe, EventLectures, FormsModule],
  templateUrl: './event.html',
  styleUrls: ['./event.css']
})

export class Event implements OnInit {
  selectedEvent: MainEvent | null = null;
  events: MainEvent[] = [];

  isAdmin = false;

  constructor(
    private auth: Auth,
    private oauth: OAuthService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) { }
  isCreatingEvent: boolean = false;
  isCreatingLecture: boolean = false;

  newEvent: any = {};
  newLecture: any = {};

  eventTypes: EventType[] = [];
  eventManagers: EventManager[] = [];

  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.updateIsAdmin();

    // 1ª tentativa (útil se a API permitir público ou o token já existir)
    this.loadEvents();

    // Quando o token chegar ou renovar, recarregue
    this.oauth.events.subscribe((e: OAuthEvent) => {
      if (e.type === 'token_received' || e.type === 'token_refreshed') {
        this.updateIsAdmin();
        this.loadEvents();
        if (this.isAdmin) {
          this.loadFormData();
        }
      }
    });

    // Se já houver token válido no refresh da página, não espere o evento
    if ((this.oauth as any).hasValidAccessToken?.()) {
      if (this.isAdmin) this.loadFormData();
    }
  }

  loadFormData(): void {
    this.apiService.getEventTypes().subscribe({
      next: (data) => this.eventTypes = data,
      error: (err) => console.error('Falha ao carregar tipos de evento:', err)
    });

    this.apiService.getEventManagers().subscribe({
      next: (data) => this.eventManagers = data,
      error: (err) => console.error('Falha ao carregar gestores de evento:', err)
    });
  }

  private updateIsAdmin() {
    this.isAdmin = this.auth.hasRole('admin');
    console.log('[EVENT] isAdmin =', this.isAdmin);
  }

  loadEvents(): void {
    this.apiService.getEvents().subscribe({
      next: (data) => {
        this.ngZone.run(() => {
          this.events = (data ?? []).map(ev => ({
            ...ev,
            imageUrl: ev.imageUrl ?? 'assets/images/event.jpg',
            lectures: (ev.lectures ?? []).map(l => ({ ...l, isSubscribed: false }))
          }));
          this.cdr.detectChanges(); // garante render imediato
        });
      },
      error: (err) => console.error('Falha ao carregar eventos da API:', err)
    });
  }

  showDetails(event: MainEvent) {
    this.selectedEvent = event;
  }

  closeDetails() {
    this.selectedEvent = null;
  }

  subscribeToMainEvent() {
    // Lógica de inscrição do utilizador...
  }

  openCreateEventForm() {
    this.isCreatingEvent = true;
    this.newEvent = {
      nameEvent: '',
      address: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      description: '',
      eventTypeId: null,
      eventManagerId: null
    };
  }

  closeCreateEventForm() {
    this.isCreatingEvent = false;
  }

  saveNewEvent() {
    const eventPayload = {
      ...this.newEvent,
      lectures: []
    };

    this.apiService.createEvent(eventPayload).subscribe({
      next: (newEvent) => {
        console.log('Evento criado com sucesso:', newEvent);
        alert('Evento cadastrado com sucesso!');
        this.loadEvents();
        this.closeCreateEventForm();
      },
      error: (err) => {
        console.error('Erro ao criar evento:', err);
        alert('Falha ao criar o evento.');
      }
    });
  }

  openCreateLectureForm() {
    this.isCreatingLecture = true;
    this.newLecture = {
      nameEventLecture: '',
      speaker: '',
      address: '',
      quantityVacancies: 0,
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      description: '',
      eventManagerId: null
    };
  }

  closeCreateLectureForm() {
    this.isCreatingLecture = false;
  }

  saveNewLecture() {
    if (this.selectedEvent) {
      const eventId = this.selectedEvent.eventId;

      this.apiService.addLectureToEvent(eventId, this.newLecture).subscribe({
        next: (newLecture) => {
          console.log(`Palestra adicionada ao evento ${eventId}:`, newLecture);
          alert('Palestra adicionada com sucesso!');
          this.loadEvents();
          this.closeCreateLectureForm();
          this.closeDetails();
        },
        error: (err) => {
          console.error('Erro ao adicionar palestra:', err);
          alert('Falha ao adicionar a palestra.');
        }
      });
    }
  }
}