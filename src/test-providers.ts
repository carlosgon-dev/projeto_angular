import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

const test_providers = [provideRouter([]), provideHttpClient(), provideHttpClientTesting()];

export default test_providers;
