import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Leitor } from './components/leitor/leitor';
import { Surpresa } from './components/surpresa/surpresa';

@Component({
  imports: [RouterOutlet, Header, Leitor, Surpresa],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
}
