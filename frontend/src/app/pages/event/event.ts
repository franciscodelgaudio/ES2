import { Component, OnInit, inject, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventLectures } from '../event-lectures/event-lectures';
import { ApiService } from '../../core/services/api';
import { Auth } from '../../core/services/auth'; // <- seu stub sem OAuth

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
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  isCreatingEvent = false;
  isCreatingLecture = false;

  newEvent: any = {};
  newLecture: any = {};

  eventTypes: EventType[] = [];
  eventManagers: EventManager[] = [];

  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.updateIsAdmin();

    // Carrega eventos sempre (sua API agora pode ser pública ou
    // controlada no backend sem OAuth)
    this.loadEvents();

    // Se for admin (segundo seu stub), carrega dados do formulário
    if (this.isAdmin) {
      this.loadFormData();
    }
  }

  private updateIsAdmin() {
    // Você pode também combinar com isLoggedIn() se quiser:
    // this.isAdmin = this.auth.isLoggedIn() && this.auth.hasRole('admin');
    this.isAdmin = this.auth.hasRole('admin');
    console.log('[EVENT] isAdmin =', this.isAdmin);
  }

  loadFormData(): void {
    this.apiService.getEventTypes().subscribe({
      next: (data) => (this.eventTypes = data),
      error: (err) => console.error('Falha ao carregar tipos de evento:', err)
    });

    this.apiService.getEventManagers().subscribe({
      next: (data) => (this.eventManagers = data),
      error: (err) => console.error('Falha ao carregar gestores de evento:', err)
    });
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
          this.cdr.detectChanges();
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
    const eventPayload = { ...this.newEvent, lectures: [] };

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
