// Frases-modelo usadas para SIMULAR o Gemini na parte 1.
// Na parte 2, quem escreve as piadas é o Gemini (através do backend) e este ficheiro deixa de ser preciso.

import { Estilo } from '../models/estilo';
import { PedidoGerador } from '../models/pedido-gerador';

// Uma frase-modelo recebe o pedido (as palavras) e devolve a pergunta e a segunda parte
// (o remate, numa piada, ou a resposta, numa adivinha).
export type Modelo = (pedido: PedidoGerador) => { pergunta: string; segunda_parte: string };

// Para cada estilo, 3 frases por ordem de maldade: [suave (1-3), marota (4-7), sem dó (8-10)]
export const MODELOS_PIADA: Record<Estilo, Modelo[]> = {
  [Estilo.Classica]: [
    (pedido) => ({
      pergunta: `Porque é que ${pedido.nome}, ${pedido.profissao} de ${pedido.pais}, anda sempre com ${pedido.objeto} atrás?`,
      segunda_parte: `Porque da última vez que se esqueceu, foi atacado por ${pedido.fruta}. Nunca mais.`,
    }),
    (pedido) => ({
      pergunta: `Em ${pedido.pais}, ${pedido.nome} (${pedido.profissao}) tentou pagar a renda com ${pedido.fruta}.`,
      segunda_parte: `O senhorio aceitou… mas cobrou ${pedido.objeto} de juros.`,
    }),
    (pedido) => ({
      pergunta: `${pedido.nome}, ${pedido.profissao} de ${pedido.pais}, diz que trabalha imenso.`,
      segunda_parte: `O único que trabalha ali é ${pedido.objeto}. ${pedido.nome} só aparece para comer ${pedido.fruta} e pedir aumento.`,
    }),
  ],
  [Estilo.Absurda]: [
    (pedido) => ({
      pergunta: `${pedido.nome}, ${pedido.profissao} de ${pedido.pais}, casou com ${pedido.fruta}.`,
      segunda_parte: `O padrinho foi ${pedido.objeto}. Chorou a cerimónia inteira.`,
    }),
    (pedido) => ({
      pergunta: `Disseram a ${pedido.nome}, ${pedido.profissao} de ${pedido.pais}, para pensar fora da caixa.`,
      segunda_parte: `Meteu ${pedido.fruta} dentro de ${pedido.objeto} e chamou-lhe inovação.`,
    }),
    (pedido) => ({
      pergunta: `Em ${pedido.pais}, ${pedido.nome} (${pedido.profissao}) candidatou-se a presidente.`,
      segunda_parte: `Perdeu para ${pedido.fruta}. ${pedido.objeto} ficou com as Finanças e, mesmo assim, as contas melhoraram.`,
    }),
  ],
  [Estilo.HumorNegro]: [
    (pedido) => ({
      pergunta: `${pedido.nome}, ${pedido.profissao} de ${pedido.pais}, sempre disse que ${pedido.objeto} ainda lhe ia dar cabo da vida.`,
      segunda_parte: `Tinha razão. Escorregou numa casca de ${pedido.fruta} quando o ia buscar.`,
    }),
    (pedido) => ({
      pergunta: `No cemitério de ${pedido.pais} há uma campa que diz: «Aqui jaz ${pedido.nome}, ${pedido.profissao}.»`,
      segunda_parte: `«Partiu como viveu: agarrado a ${pedido.objeto} e a jurar que ${pedido.fruta} fazia bem à saúde.»`,
    }),
    (pedido) => ({
      pergunta: `Qual foi o último desejo de ${pedido.nome}, ${pedido.profissao} de ${pedido.pais}?`,
      segunda_parte: `Ser enterrado com ${pedido.objeto}. A família deu-lhe ${pedido.fruta}. Ninguém lê testamentos até ao fim.`,
    }),
  ],
};

export const MODELOS_ADIVINHA: Record<Estilo, Modelo[]> = {
  [Estilo.Classica]: [
    (pedido) => ({
      pergunta: `${pedido.nome}, ${pedido.profissao} de ${pedido.pais}, leva-o para todo o lado, mas nunca o come. O que é?`,
      segunda_parte: pedido.objeto,
    }),
    (pedido) => ({
      pergunta: `Tem casca, ${pedido.nome} descasca-a ao almoço lá em ${pedido.pais} e ninguém lhe chama objeto. O que é?`,
      segunda_parte: pedido.fruta,
    }),
    (pedido) => ({
      pergunta: `Não é fruta, não vem de ${pedido.pais}, mas ${pedido.nome} (${pedido.profissao}) não sobrevivia um dia sem ele. O que é?`,
      segunda_parte: pedido.objeto,
    }),
  ],
  [Estilo.Absurda]: [
    (pedido) => ({
      pergunta: `Votou nas eleições de ${pedido.pais}, casou com ${pedido.nome} e nunca saiu da fruteira. Quem é?`,
      segunda_parte: pedido.fruta,
    }),
    (pedido) => ({
      pergunta: `${pedido.nome}, ${pedido.profissao} de ${pedido.pais}, usa-o como chapéu, como telefone e como almofada. O que é?`,
      segunda_parte: pedido.objeto,
    }),
    (pedido) => ({
      pergunta: `Foi promovido a chefe de ${pedido.nome} (${pedido.profissao} em ${pedido.pais}) sem nunca ter falado. O que é?`,
      segunda_parte: pedido.objeto,
    }),
  ],
  [Estilo.HumorNegro]: [
    (pedido) => ({
      pergunta: `${pedido.nome}, ${pedido.profissao} de ${pedido.pais}, tropeçou nela e nunca mais se levantou. O que era?`,
      segunda_parte: `A casca de ${pedido.fruta}`,
    }),
    (pedido) => ({
      pergunta: `Foi ao funeral de ${pedido.nome}, ${pedido.profissao} de ${pedido.pais}, não chorou e ainda ficou com a herança. O que é?`,
      segunda_parte: pedido.objeto,
    }),
    (pedido) => ({
      pergunta: `Acabou com ${pedido.nome} em ${pedido.pais} e o juiz absolveu-a: «é só fruta». Quem é?`,
      segunda_parte: pedido.fruta,
    }),
  ],
};
