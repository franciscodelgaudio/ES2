import { Component, OnInit, inject } from '@angular/core';
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
  description: string;
  imageUrl: string;
  lectures: EventLecture[];
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

  constructor(private auth: Auth, private oauth: OAuthService) { }
  isCreatingEvent: boolean = false;
  isCreatingLecture: boolean = false;

  newEvent: any = {};
  newLecture: any = {};

  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.updateIsAdmin();

    // Recalcula quando o token chegar/renovar
    this.oauth.events.subscribe((e: OAuthEvent) => {
      if (e.type === 'token_received' || e.type === 'token_refreshed') {
        console.log('[EVENT] token event:', e.type);
        this.updateIsAdmin();                   // 2ª checagem quando o token chega ou renova
      }
    });

    this.loadEvents();
  }

  private updateIsAdmin() {
    this.isAdmin = this.auth.hasRole('admin');
    console.log('[EVENT] isAdmin =', this.isAdmin);
  }

  loadEvents(): void {
    this.apiService.getEvents().subscribe({
      next: (data) => {
        this.events = data.map(event => ({
          ...event,
          imageUrl: 'assets/images/event.jpg',
          lectures: event.lectures.map(lecture => ({ ...lecture, isSubscribed: false }))
        }));
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
  }

  openCreateEventForm() {
    this.isCreatingEvent = true;
    this.newEvent = { nameEvent: '', address: '', startDate: '', endDate: '' };
  }

  closeCreateEventForm() {
    this.isCreatingEvent = false;
  }

  saveNewEvent() {
    console.log('Salvando novo evento:', this.newEvent);
    alert('Novo evento salvo!');
    this.closeCreateEventForm();
  }

  openCreateLectureForm() {
    this.isCreatingLecture = true;
    this.newLecture = { nameEventLecture: '', speaker: '', startTime: '', endTime: '' };
  }

  closeCreateLectureForm() {
    this.isCreatingLecture = false;
  }

  saveNewLecture() {
    if (this.selectedEvent) {
      const eventId = this.selectedEvent.eventId;
      console.log(`Salvando nova palestra para o evento ${eventId}:`, this.newLecture);
      alert('Nova palestra salva! (Verifique a consola)');
      this.closeCreateLectureForm();
    }
  }
}