import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventLecture } from '../event/event';
import { ApiService } from '../../core/services/api'; // Importe o ApiService unificado

@Component({
  selector: 'app-event-lectures',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-lectures.html',
  styleUrls: ['./event-lectures.css']
})
export class EventLectures {
  @Input() lectures: EventLecture[] = [];
  private apiService = inject(ApiService);

  toggleSubscription(lecture: EventLecture) {
    const participantId = 1; // ID do participante (fixo para exemplo)
    
    // Guarda o estado anterior para reverter em caso de erro
    const wasSubscribed = lecture.isSubscribed;
    
    // Altera o estado visual imediatamente para o utilizador
    lecture.isSubscribed = !wasSubscribed;

    if (lecture.isSubscribed) {
      // Chama a API para INSCREVER
      this.apiService.subscribeToLecture(lecture.eventLectureId, participantId).subscribe({
        error: (err) => {
          console.error('Erro na inscrição:', err);
          lecture.isSubscribed = wasSubscribed; // Reverte o estado em caso de erro
          alert('Falha ao se inscrever na palestra.');
        }
      });
    } else {
      // Chama a API para DESINSCREVER
      this.apiService.unsubscribeFromLecture(lecture.eventLectureId, participantId).subscribe({
        error: (err) => {
          console.error('Erro no cancelamento da inscrição:', err);
          lecture.isSubscribed = wasSubscribed; // Reverte o estado em caso de erro
          alert('Falha ao cancelar a inscrição na palestra.');
        }
      });
    }
  }
}