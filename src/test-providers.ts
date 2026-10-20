// Providers dados a TODOS os testes automáticos (ng test).
// Assim cada teste tem o router e o HttpClient disponíveis, como a app real (ver app.config.ts).
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

const test_providers = [provideRouter([]), provideHttpClient(), provideHttpClientTesting()];

export default test_providers;
