import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { YoutubePipe } from './youtube-pipe';

describe('YoutubePipe', () => {
  it('create an instance', () => {
    const pipe = new YoutubePipe(TestBed.inject(DomSanitizer));
    expect(pipe).toBeTruthy();
  });
});
