import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Explorar } from './pages/explorar/explorar';
import { Gerador } from './pages/gerador/gerador';
import { Escrever } from './pages/escrever/escrever';
import { EditorMeme } from './pages/editor-meme/editor-meme';
import { CriadoPorTi } from './pages/criado-por-ti/criado-por-ti';
import { NaoEncontrado } from './pages/nao-encontrado/nao-encontrado';
import { Arena } from './pages/arena/arena';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'arena', component: Arena },
  { path: 'explorar', component: Explorar },
  { path: 'gerador', component: Gerador },
  { path: 'escrever', component: Escrever },
  { path: 'meme/:id', component: EditorMeme },
  { path: 'criado', component: CriadoPorTi },
  { path: '**', component: NaoEncontrado },
];
