import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '../models/video';
import { SupabaseService } from './supabase-service';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private supabase_service: SupabaseService) {}

  listar_videos(): Observable<Video[]> {
    return this.supabase_service.ler_tabela<Video>('videos', 'dados/videos.json');
  }
}
