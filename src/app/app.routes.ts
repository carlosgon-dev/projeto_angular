import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Explorar } from './pages/explorar/explorar';
import { Gerador } from './pages/gerador/gerador';
import { Escrever } from './pages/escrever/escrever';
import { EditorMeme } from './pages/editor-meme/editor-meme';
import { CriadoPorTi } from './pages/criado-por-ti/criado-por-ti';
import { NaoEncontrado } from './pages/nao-encontrado/nao-encontrado';
import { Arena } from './pages/arena/arena';
import { Entrar } from './pages/entrar/entrar';
import { NovaPassword } from './pages/nova-password/nova-password';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'arena', component: Arena, data: { privada: true } },
  { path: 'explorar', component: Explorar },
  { path: 'gerador', component: Gerador, data: { privada: true } },
  { path: 'escrever', component: Escrever, data: { privada: true } },
  { path: 'meme/:id', component: EditorMeme, data: { privada: true } },
  { path: 'criado', component: CriadoPorTi, data: { privada: true } },
  { path: 'entrar', component: Entrar },
  { path: 'nova-password', component: NovaPassword },
  { path: '**', component: NaoEncontrado },
];
