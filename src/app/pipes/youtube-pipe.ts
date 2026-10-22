import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const ENDERECO_EMBED = 'https://www.youtube.com/embed/';

@Pipe({
  name: 'youtube',
})
export class YoutubePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(youtube_id: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(ENDERECO_EMBED + youtube_id);
  }
}
