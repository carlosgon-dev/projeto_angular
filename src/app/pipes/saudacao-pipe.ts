import { Pipe, PipeTransform } from '@angular/core';

const HORA_INICIO_TARDE = 13;
const HORA_INICIO_NOITE = 20;

@Pipe({
  name: 'saudacao',
})
export class SaudacaoPipe implements PipeTransform {
  transform(nome: string): string {
    const hora = new Date().getHours();
    if (hora < HORA_INICIO_TARDE) return `Bom dia, ${nome} Roscas !`;
    if (hora < HORA_INICIO_NOITE) return `Boa tarde, ${nome} Markl !`;
    return `Boa noite, ${nome} Palmeirim ! `;
  }
}
