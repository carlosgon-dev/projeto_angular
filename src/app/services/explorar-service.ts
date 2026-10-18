import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Piada } from '../models/piada';

@Injectable({
  providedIn: 'root',
})
export class ExplorarService {
  constructor(private http: HttpClient) {}

  listarPiadas(): Observable<Piada[]> {
    return this.http.get<Piada[]>('dados/piadas.json');
  }
}
