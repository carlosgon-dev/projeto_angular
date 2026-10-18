# 🎭 Arena do Riso — Checklist

**Ideia:** cria o teu próprio humor — memes, piadas e adivinhas, à mão ou com IA.
**Prazo:** domingo, 25/10/2026
**Protótipo:** https://claude.ai/artifact/B3cLTFFCC6MtL2ij3oYEoj

Páginas: **Início · Explorar · Gerador · Escrever · Criado por ti** (+ editor `/meme/:id` + página 404)

> 🧩 **O trabalho tem 2 partes:**
> - **Parte 1 (agora, até 25/10): demonstração do front-end.** ✅ Decidido: **sem JSON Server.**
>   Dados para ler em `public/memes.json`, `piadas.json`, `adivinhas.json`, lidos com `HttpClient` (cumpre o requisito 5).
>   Criações (guardar, estrelas, apagar) no `localStorage`, através de um service. Gerador com piadas simuladas.
>   Funciona no PC e no link publicado, sem nada para ligar.
> - **Parte 2 (depois): integração** — construir o backend verdadeiro + base de dados + Imgflip + Gemini.
> - Para a parte 2 ser fácil:
>   1. **Interfaces com a forma das tabelas da base de dados** (`readonly id`, campos simples).
>   2. **Métodos dos services com nomes de API**: `listar()`, `criar()`, `apagar(id)`. Na parte 2 muda-se só o interior
>      (de `localStorage` para GET / POST / DELETE ao backend); os componentes não mudam.
> - 🍽️ Analogia: servidor = o edifício · backend = a cozinha · base de dados = a despensa.

> Regra de ouro: no fim de cada fase a app já cumpre o enunciado.
> Se o tempo apertar, corta-se a fase de baixo — nunca a de cima.

---

## 🗺️ Projeção (fechada a 18/10)

**Models** (`src/app/models/`) ✅ feitos
`TemplateMeme` · `CriacaoBase` + `Estrelas` · `Meme` · `Piada` · `Adivinha` · `Criacao = Meme | Piada | Adivinha` ·
enum `Origem` · enum `Estilo` · `PedidoGerador` · `MemeInternet`

**Services** (`src/app/services/`)
| Service | Métodos | Parte 1 | Parte 2 |
|---|---|---|---|
| `MemeService` | `listarTemplates()` | `dados/memes.json` | Imgflip |
| `ExplorarService` | `listarMemes()`, `listarPiadas()`, `listarAdivinhas()` | `dados/*.json` | backend / meme-api |
| `CriacoesService` | `listar()`, `criar()`, `avaliar()`, `apagar()` | `localStorage` (via `Armazem<T>`) | backend + BD |
| `GeradorService` | `gerar(pedido)` | piadas simuladas | Gemini |

**Rotas / páginas** (`src/app/pages/`)
`/` Inicio · `/explorar` Explorar · `/gerador` Gerador · `/escrever` Escrever · `/meme/:id` EditorMeme ·
`/criado` CriadoPorTi · `**` NaoEncontrado — `Header` (menu) no `app.html`, fora do `<router-outlet>`

**Componentes reutilizáveis** (`src/app/components/`)
| Componente | `@Input` | `@Output` | Usado em |
|---|---|---|---|
| `CartaoTemplate` | `TemplateMeme` | `escolher` | Escrever |
| `CartaoMeme` | `Meme` | — | EditorMeme, CriadoPorTi |
| `CartaoTexto` | `Piada` ou `Adivinha` | — | Escrever, Gerador, Explorar, CriadoPorTi |
| `Estrelas` | valor 0–5 | `avaliar` | Gerador, CriadoPorTi |

**Pipe** (`src/app/pipes/`): `saudacao`
**Dados** (`public/`): `dados/memes.json`, `piadas.json`, `adivinhas.json`, `memes-internet.json` · `imagens/memes/`, `imagens/explorar/`

---

## Fase 0 — Base (dom 18)
- [x] Desligar o SSR (o projeto foi criado com ele; o `localStorage` não existe no servidor)
- [x] Projeto criado (`meu-projeto`) + repositório GitHub
- [x] `ng serve` a funcionar
- [x] Interfaces (models)
- [x] Páginas vazias em `pages/`: `Inicio`, `Explorar`, `Gerador`, `Escrever`, `EditorMeme`, `CriadoPorTi`, `NaoEncontrado`
- [x] Componente `Header` com o menu (`routerLink`)
- [x] Rotas em `app.routes.ts` + `<router-outlet />`
- [ ] **Publicar já** a versão vazia (para não haver surpresas no fim)

## Fase 1 — Memes + Criado por ti (seg 19 – ter 20)
- [x] Interfaces `TemplateMeme` e `Meme` (TypeScript)
- [x] `MemeService` com `@Injectable` + `HttpClient.get` ao `dados/memes.json`
- [x] `provideHttpClient()` no `app.config.ts`
- [x] No Escrever: lista de templates com `@for` (com `signal`)
- [ ] "a carregar…" e erro com `@if`
- [ ] Pesquisa de templates com `[(ngModel)]`
- [ ] Componente `CartaoMeme` — `@Input() meme` + `@Output() escolher`
- [ ] Editor `/meme/:id`: imagem + texto de cima/baixo ao vivo
- [ ] Componente `Estrelas` — `@Input() valor` + `@Output() avaliar`
  - 📝 Nota de estudo: aqui vês o `@Output` na prática (ficou confuso na leitura — é normal).
    Filho "grita": `this.avaliar.emit(4)` → pai "ouve": `(avaliar)="guardarNota($event)"` → `$event` = 4.
    É como o `(click)` de um botão, mas um evento inventado por ti.
- [ ] Criado por ti: lista dos memes com data (`| date`) e estrelas (0 a 5)
- [ ] Apagar uma criação (com confirmação "Apagar? Sim / Não")
- [ ] Guardar no `localStorage` (não perder ao recarregar)

✅ *Aqui a app já cumpre quase todo o enunciado.*

## Fase 2 — Escrever piadas e adivinhas (seg 19 – ter 20)
- [ ] Interface `Criacao` (tipo `'piada' | 'adivinha'`)
- [ ] Formulário reativo: `FormGroup` + `FormControl` + `ReactiveFormsModule`
- [ ] Validadores: `required`, `minLength`, `maxLength`, **`email`**
- [ ] Mensagens de erro (`invalid && touched`) + botão `[disabled]="form.invalid"`
  - 📝 Nota de estudo: aqui vês na prática a diferença entre `{{ }}` e `[ ]`.
    `disabled="{{ x }}"` fica SEMPRE desligado (vira o texto "false"); `[disabled]="x"` obedece ao `true`/`false`.
    Regra: `{{ }}` = mostrar texto · `[ ]` = configurar um elemento ou passar dados a um componente.
- [ ] Componente `CartaoCriacao` (pré-visualização ao vivo)
- [ ] "Ver resposta" com `@if`
- [ ] Guardar → aparece no Criado por ti
- [ ] Filtros no Criado por ti (Tudo / Memes / Piadas / Adivinhas)
- [ ] `@switch` no tipo do cartão

✅ *Enunciado cumprido a 100%.*

## Fase 3 — Gerador com o Gemini (qua 21 – qui 22)
- [ ] Chave do Gemini (Google AI Studio, só nível gratuito, restringida ao site)
- [ ] `PiadaService.gerar()` com `HttpClient.post`
- [ ] Formulário: país, profissão, objeto, fruta, estilo, nível de maldade
- [ ] Validadores `min(1)` / `max(10)` no nível de maldade
- [ ] Piada ou adivinha (`@switch` no estilo)
- [ ] "A pensar…" + mensagem de erro
- [ ] `OnDestroy`: cancelar o pedido se saíres da página
- [ ] Gerados vão para o Criado por ti
- [ ] Avaliar com estrelas logo no fim, assim que a piada aparece
- [ ] Guardar algumas piadas boas para a demo (caso a internet falhe)

## Fase 4 — Explorar (sex 23) — *opcional*
- [ ] `public/piadas.json` e `public/adivinhas.json` (em português)
- [ ] `HubService`: memes (meme-api) + piadas + adivinhas
- [ ] 3 filas horizontais, cada uma com "a carregar…" própria
- [ ] Botão 🔄 Outros

## Início (pode ir sendo feito ao longo das fases)
> ⏸️ **Quadrados em standby** — decidir mais tarde o que mostrar.
> Dica: se tiverem todos a mesma forma (número + frase), basta um componente
> `<app-cartao-estatistica [valor] rotulo>` reutilizado 3 vezes.

- [ ] Saudação (bom dia / boa tarde / boa noite)
- [ ] Quadrado "criados por ti": memes / piadas / adivinhas (ex.: 1 / 0 / 1)
- [ ] Quadrado "média das tuas avaliações" (★)
- [ ] Quadrado "tempo perdido aqui hoje": conta ao segundo (`00:01:23`) + média por dia, guardado no `localStorage`
- [ ] `setInterval` no `ngOnInit`, `clearInterval` no `ngOnDestroy`
- [ ] De 30 em 30 segundos: som real de ovelha/cabra (`public/ovelha.ogg`) + aviso 🐑
  - Ovelha: "Sheep bleating.ogg" — domínio público (Wikimedia Commons, origem pdsounds.org)
  - Cabras: "Herd of goats bleating.ogg" — domínio público (Wikimedia Commons, origem pdsounds.org)
  - Burro: "a-donkey-is-braying-in-his-enclosure" de felix-blume — CC0 (Wikimedia Commons, origem freesound.org)
  - Elefante: "Elephant voice - trumpeting.ogg" — CC0 (Wikimedia Commons)
  - Galo: "Medium rooster crowing.ogg" — domínio público (Wikimedia Commons, origem pdsounds.org)
- [ ] Botões para escolher o animal que toca de 30 em 30 s
- [ ] 🐓 Galo bem alto na primeira visita do dia, de manhã (5h–12h)

## Fase 5 — Entrega (sáb 24)
- [ ] App publicada e a funcionar (testar todas as páginas)
- [ ] README: descrição, funcionalidades, link, como correr, APIs usadas
- [ ] Ensaiar a apresentação

## Reserva (dom 25)
- [ ] Imprevistos
- [ ] *Extra, só se sobrar tempo:* carregar imagem própria para um meme

---

## TypeScript (Módulo 3) — usar de forma natural, quando cada peça aparecer
> Regra: cada truque num sítio onde faz sentido. Nada metido à força.

**Tipos e modelos (`models/`)**
- [ ] Enum de texto: `enum TipoCriacao { Meme = 'meme', Piada = 'piada', Adivinha = 'adivinha' }`
- [ ] Enum `Estilo` (Clássica / Absurda / Humor negro)
- [ ] Tipo literal: `type Estrelas = 0 | 1 | 2 | 3 | 4 | 5`
- [ ] Interface base `CriacaoBase` (`readonly id`, `criado`, `estrelas`)
- [ ] `extends`: `Meme`, `Piada`, `Adivinha` estendem `CriacaoBase`
- [ ] Opcional: `dica?: string` na `Adivinha`
- [ ] Union type: `type Criacao = Meme | Piada | Adivinha` + narrowing pelo `tipo`
- [ ] Interseção: `type PiadaGerada = Piada & { estilo: Estilo; maldade: number }`
- [ ] Tupla: palavras do gerador `[pais: string, profissao: string, objeto: string, fruta: string]`
- [ ] Assinatura de índice: tempo por dia `{ [data: string]: number }`

**Utility types**
- [ ] `Omit<Piada, 'id' | 'criado'>` — dados do formulário antes de guardar
- [ ] `Partial<Criacao>` — atualizar só uma parte (ex.: estrelas)
- [ ] `Pick<Meme, 'name' | 'url'>` — o que o cartão precisa
- [ ] `Record<TipoCriacao, number>` — contagem memes / piadas / adivinhas

**Generics**
- [ ] `interface ApiResposta<T> { success: boolean; data: T }` (formato do Imgflip)
- [ ] Generic com restrição: `class Armazem<T extends { id: number }>`

**Classes (POO)**
- [ ] `interface Repositorio<T>` + `class Armazem<T> implements Repositorio<T>` (guarda no `localStorage`)
- [ ] Modificadores: `protected chave`, `private` nos detalhes internos, `public` nos métodos usados fora
- [ ] Herança: `class ArmazemCriacoes extends Armazem<Criacao>` com `super('criacoes')` + `contarPorTipo()`
- [ ] Parameter properties: `constructor(private http: HttpClient)` nos services

**Boas práticas**
- [ ] `unknown` (nunca `any`) no erro do `subscribe`, com verificação antes de usar
- [ ] Tipos de retorno nas funções (incluindo `: void`)
- [ ] Zero `any` em todo o projeto
- [ ] `strict: true` no `tsconfig.json` (já vem assim no Angular)

---

## Requisitos do enunciado → onde estão

| Requisito | Onde |
|---|---|
| Componentes | páginas + `Header` + `CartaoMeme` + `CartaoCriacao` + `Estrelas` |
| `{{ }}` `[ ]` `( )` `[( )]` | textos · `[src]`, `[disabled]` · `(click)` · pesquisa |
| `@if` / `@for` / `@switch` | a carregar/erro · listas · tipo e estilo |
| Pipes | `date`, `number` |
| `@Input` / `@Output` | `CartaoMeme`, `Estrelas` |
| Service + DI + interfaces | `MemeService`, `PiadaService`, `HubService` · `Meme`, `Criacao` |
| HttpClient + a carregar + erro | Imgflip, Gemini, JSON, meme-api |
| Router (3+ vistas) | 5 páginas + `/meme/:id` + 404 |
| Reactive Forms + validação | Escrever, Gerador, editor de meme |
| `OnInit` / `OnDestroy` | carregar dados · cancelar pedidos |
