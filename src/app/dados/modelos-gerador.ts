import { Estilo } from '../models/estilo';
import { PedidoGerador } from '../models/pedido-gerador';

export type Modelo = (pedido: PedidoGerador) => { pergunta: string; segunda_parte: string };

export const MODELOS_PIADA: Record<Estilo, Modelo[]> = {
  [Estilo.Classica]: [
    (pedido) => ({
      pergunta: `Porque é que ${pedido.nome}, ${pedido.profissao}, anda sempre com ${pedido.objeto} atrás?`,
      segunda_parte: `Porque da última vez que se esqueceu, foi atacado por ${pedido.animal} ${pedido.lugar}. Nunca mais.`,
    }),
    (pedido) => ({
      pergunta: `${pedido.nome} (${pedido.profissao}) tentou pagar ${pedido.comida} com ${pedido.objeto}.`,
      segunda_parte: `O empregado aceitou… mas pediu ${pedido.animal} de gorjeta.`,
    }),
    (pedido) => ({
      pergunta: `${pedido.nome}, ${pedido.profissao}, jura que tem um superpoder: ${pedido.superpoder}.`,
      segunda_parte: `O único superpoder que alguém lhe viu foi desaparecer quando chega a conta de ${pedido.comida}.`,
    }),
  ],
  [Estilo.Absurda]: [
    (pedido) => ({
      pergunta: `${pedido.nome}, ${pedido.profissao}, casou com ${pedido.animal} ${pedido.lugar}.`,
      segunda_parte: `O padrinho foi ${pedido.objeto}. No copo-d'água só havia ${pedido.comida}.`,
    }),
    (pedido) => ({
      pergunta: `Disseram a ${pedido.nome} (${pedido.profissao}) para pensar fora da caixa.`,
      segunda_parte: `Meteu ${pedido.animal} dentro de ${pedido.objeto}, ensinou-o a ${pedido.superpoder} e chamou-lhe startup.`,
    }),
    (pedido) => ({
      pergunta: `${pedido.nome} (${pedido.profissao}) candidatou-se a presidente com um só trunfo: ${pedido.superpoder}.`,
      segunda_parte: `Perdeu para ${pedido.animal}. ${pedido.objeto} ficou com as Finanças e o país passou a comer ${pedido.comida} ao pequeno-almoço.`,
    }),
  ],
  [Estilo.HumorNegro]: [
    (pedido) => ({
      pergunta: `${pedido.nome}, ${pedido.profissao}, sempre disse que ${pedido.objeto} ainda lhe ia dar cabo da vida.`,
      segunda_parte: `Tinha razão. Engasgou-se com ${pedido.comida} ${pedido.lugar} enquanto tentava ${pedido.superpoder}.`,
    }),
    (pedido) => ({
      pergunta: `No cemitério há uma campa que diz: «Aqui jaz ${pedido.nome}, ${pedido.profissao}.»`,
      segunda_parte: `«Partiu como viveu: ${pedido.lugar}, agarrado a ${pedido.objeto} e a jurar que sabia ${pedido.superpoder}.»`,
    }),
    (pedido) => ({
      pergunta: `Qual foi o último desejo de ${pedido.nome}, ${pedido.profissao}?`,
      segunda_parte: `Ser enterrado com ${pedido.objeto}. A família enterrou-o com ${pedido.animal}. Ninguém lê testamentos até ao fim.`,
    }),
  ],
};

export const MODELOS_ADIVINHA: Record<Estilo, Modelo[]> = {
  [Estilo.Classica]: [
    (pedido) => ({
      pergunta: `${pedido.nome} leva-o sempre ${pedido.lugar}, mas nunca o come. O que é?`,
      segunda_parte: pedido.objeto,
    }),
    (pedido) => ({
      pergunta: `${pedido.nome} procurou-o a manhã toda ${pedido.lugar} e estava mesmo à frente do nariz. O que é?`,
      segunda_parte: pedido.objeto,
    }),
    (pedido) => ({
      pergunta: `Não fala, não anda, mas ${pedido.nome} não vai a lado nenhum sem ele, nem mesmo ${pedido.lugar}. O que é?`,
      segunda_parte: pedido.objeto,
    }),
  ],
  [Estilo.Absurda]: [
    (pedido) => ({
      pergunta: `Casou com ${pedido.nome} ${pedido.lugar} e o padre nem reparou que não respirava. O que é?`,
      segunda_parte: pedido.objeto,
    }),
    (pedido) => ({
      pergunta: `${pedido.nome} usa-o como chapéu, como telefone e como almofada ${pedido.lugar}. O que é?`,
      segunda_parte: pedido.objeto,
    }),
    (pedido) => ({
      pergunta: `Foi promovido a chefe de ${pedido.nome} ${pedido.lugar} sem nunca ter dito uma palavra. O que é?`,
      segunda_parte: pedido.objeto,
    }),
  ],
  [Estilo.HumorNegro]: [
    (pedido) => ({
      pergunta: `${pedido.nome} tropeçou nele ${pedido.lugar} e nunca mais se levantou. O que era?`,
      segunda_parte: pedido.objeto,
    }),
    (pedido) => ({
      pergunta: `Foi ao funeral de ${pedido.nome}, não chorou e ainda ficou com a herança. O que é?`,
      segunda_parte: pedido.objeto,
    }),
    (pedido) => ({
      pergunta: `Ficou com ${pedido.nome} até ao fim ${pedido.lugar}, e foi o único que não chorou. O que é?`,
      segunda_parte: pedido.objeto,
    }),
  ],
};
