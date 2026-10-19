import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TemplateMeme } from '../models/template-meme';

@Injectable({
  providedIn: 'root',
})
export class MemeService {
  constructor(private http: HttpClient) {}

  listar_templates(): Observable<TemplateMeme[]> {
    return this.http.get<TemplateMeme[]>('dados/memes.json');
  }
}
