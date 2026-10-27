# 🎭 Arena do Riso — Checklist

**Ideia:** cria o teu próprio humor — memes, piadas e adivinhas, à mão ou com IA.
**Prazo:** **entrega domingo 01/11/2026 até às 23:59** · apresentação segunda 02/11 às 09:00 (novo enunciado: `Projeto-pratico-Angular-novo-enunciado.pdf`)
**Novo na entrega final:** 🗄️ **Supabase** (a "Parte 2" passa a obrigatória) + **CRUD completo** (falta o *Editar*)
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

## 📅 Plano (atualizado a 20/10)

| Dia | O quê | Estado |
|---|---|---|
| qui 15 – seg 19 | Protótipo, projeção, Fases 0, 1 e 2 | ✅ |
| **ter 20** | Fase 3: Gerador | ✅ |
| | Início (saudação com pipe `saudacao` + 4 cartões) + página 404 | ✅ |
| **qua 21** | Explorar (adivinhas + memes + `Filtro`) | ✅ (ter 20) |
| | Arrumar: tirar `zone.js`, testes que falham, ficheiros não usados | ✅ (ter 20) |
| **qui 22** | 🎨 **CSS por página** — rever página a página (ver lista abaixo) | ✅ |
| | ~~🎬 Multimédia + 🎵 playlist~~ — *extra*, passou para as ideias 💡 | |

**🎨 CSS por página:**
- [x] Barra do topo (escura, "do" a rosa)
- [x] Início (destaque em gradiente)
- [x] Escrever: memes (filtro, caixas quadradas, botão "Usar este")
- [x] Escrever: piadas e adivinhas (formulário numa caixa)
- [x] Editor de meme (lado a lado + etiquetas)
- [x] Explorar (cartões sobem + contorno rosa ao passar o rato)
- [x] Gerador (caixa tracejada "à espera" do resultado)
- [x] Criado por ti (rodapé data + estrelas, Apagar discreto, estrelas mais pequenas)
- [x] Adivinhas: dica escondida, com botão "Pedir dica 💡" (no `CartaoTexto`)
- [x] Página 404 (link com cara de botão, sem `<button>` dentro de `<a>`)
- [x] Tudo em `rem` em vez de `px` (bordas e contornos ficam em `px`)
- [x] `.botao` passou para o `styles.css` (usada no Escrever e na 404)

> 🚀 Vais adiantado: o CSS começou na ter 20 em vez de qui 22.

## 🆕 Plano até à entrega final — NOVO ENUNCIADO (atualizado sex 23/10)
> 📅 **Entrega: domingo 01/11 até às 23:59** · 🎤 **Apresentação: segunda 02/11 às 09:00 em ponto** (demo no GitHub Pages)
> 🆕 Obrigatório no novo enunciado: **Supabase com AUTENTICAÇÃO + base de dados**, **GitHub Actions + GitHub Pages**, **variáveis de ambiente** para a chave do Supabase, pipes de **valores monetários** (`currency`).
> Protótipo dos extras: https://claude.ai/artifact/DWdgW3EZSbcaguZKpQJ7nc

| Dia | O quê | Tipo | Estado |
|---|---|---|---|
| **qui 22** | ✏️ Editar (CRUD completo) + 🎨 CSS + 🎬 38 vídeos no Explorar + 🎵 leitor no rodapé | — | ✅ |
| **sex 23** | 🎵 Pausa/retoma da música com os vídeos + ⚔️ Arena (Duelo + pódio) + 📱 menu ☰ e telemóvel | extra | ✅ |
| | 🚀 **GitHub Actions + Pages** → https://carlosgon-dev.github.io/projeto_angular/ (com 404.html) | **OBRIG.** | ✅ |
| | 🎁 **Roleta da surpresa**: abre 3 s depois de carregar a app, botão 🎰, ⏪ ⏩ ⏹ (só pára no botão), fumo e faíscas | extra | ✅ |
| | 🔊 Sons da roleta: música do Preço Certo (fica grave ao travar), VRUUUM, travagem, 💥 acidente | extra | ✅ |
| **sáb 24** | 🛋️ **Folga** (cansaço — usado o dia livre) | — | ✅ |
| **dom 25** | 🛋️ **Folga** (mais um dia de descanso) | — | ✅ |
| **seg 26** | 🗄️ **Supabase 1**: tabela `criacoes` + `listar()` e `criar()` | **OBRIG.** | ✅ |
| **ter 27** | 🗄️ **Supabase 2**: `editar()`, `apagar()`, `avaliar()` + "a carregar…"/erro | **OBRIG.** | ✅ (seg 26, com a carregar/erro + timeout + corneta 🎺) |
| ~~qua 28~~ **seg 26** | 🔐 **Autenticação**: registar (com confirmação por email), entrar, sair; `user_id` + policies (cada um vê as suas); Início e Explorar abertos, o resto mostra o formulário de entrar no lugar da página | **OBRIG.** | ✅ |
| ~~ter 27~~ **seg 26** | 🔐 **"Esqueceste-te da password?"**: pedir o email de recuperação + página para escolher a password nova (⚠️ limite de ~2 emails/hora) | extra | ✅ |
| ~~qua 28~~ **seg 26** | 🤖 **IA a sério no Gerador**: Edge Function `gerar-piada_ia` (Deno) com a chave do Gemini no cofre do Supabase; se falhar (15 s / resposta inválida) usa as frases-modelo. Campos novos: 📍 lugar, 🐐 animal, 🦸 superpoder, 🍕 comida (saíram o país e a fruta); consola diz se foi IA ou plano B. Botão 💾 Guardar (só guarda se o utilizador quiser) + ✍️ autor "IA (Gemini)" / "Frases-modelo". Adivinhas só com 3 campos (nome, onde, resposta) | extra | ✅ |
| **ter 27** | 🔑 Chave do Supabase nos **Secrets** do GitHub + testar o login no site publicado | **OBRIG.** | ✅ (passo com `node` + `.trim()`) |
| | 🔊 **Efeitos sonoros em vários botões**: 🥁 gerar, ✨ guardar, ⭐ estrelas, 😱 apagar, 👏 entrar, 🎺 login falhado, 👎 sair | extra | ✅ |
| | 💶 **Pipe `currency`**: "💰 Vale 3,00 €" no Criado por ti (1 € por estrela) + app em `pt-PT` (`LOCALE_ID` + `registerLocaleData`) | **OBRIG.** | ✅ |
| **qua 28** | 📱 **Responsividade no telemóvel**: testar o resto (Escrever, Criado por ti, Entrar, roleta, 404) | **OBRIG.** | 🟡 (Início, Gerador, Editor e filtros já feitos) |
| | 🎬 Som do YouTube no leitor (IFrame API, iframe escondido + `effect()`) | extra | ✅ (ter 27) |
| ~~qui 29~~ **ter 27** | 🔌 **APIs/dados**: templates → **Imgflip** · memes da internet → **meme-api** (sem filtro) · piadas, adivinhas e vídeos → **tabelas no Supabase** (`docs/supabase-conteudos.sql`, só leitura) com `ler_tabela<T>()` genérico · os JSON ficam como plano B (`timeout` + `catchError`) | extra | ✅ |
| **sex 30** | 🔍 **Revisão de código** (parte 1) | **OBRIG.** | ⬜ |
| **sáb 31** | 🔍 **Revisão de código** (parte 2) + 📝 **README** + limpar criações de teste + criar contas de demonstração | **OBRIG.** | ⬜ |
| **dom 01** | ☀️ Manhã: últimos retoques → 🏁 **ENTREGA** · 🛋️ **Tarde: LIVRE!** | **OBRIG.** | ⬜ |
| **seg 02** | 🎤 **Apresentação às 09:00** — ⚠️ antes, abrir o site e confirmar que as criações carregam (o Supabase grátis adormece ao fim de 7 dias sem uso → "Restore project") | | |

> ✂️ **Se o tempo apertar, corta-se por esta ordem:** som do YouTube → efeitos sonoros → ligação das APIs (os JSON já funcionam).
> 🗑️ **Sabichão retirado** (26/10) — apagar `public/dados/perguntas-sabichao.json` e o componente `contra-relogio` na revisão.
> 🛡️ **Nunca se corta:** Supabase, autenticação, GitHub Actions/Pages, revisão, responsividade, README.
> ⚠️ **Chaves de API (Gemini, YouTube) nunca no código do site** — o repositório é público.

**🎮 Jogos e surpresa (decidido a 22/10)**
- [ ] ⚔️ **Duelo na Arena**: 2 piadas lado a lado → clicas na melhor → ganha 1 ponto → novo duelo. Pódio 🥇🥈🥉. Com Supabase: ranking guardado na base de dados
- [ ] ⏱️ **Adivinha contra o relógio** (minijogo): 5 adivinhas, 10 s cada, a resposta aparece sozinha, tu dizes "acertei / não acertei", resultado no fim
- [ ] 🎰 **Roleta na surpresa dos 5 min** (`setInterval` no `ngOnInit` do `app.ts`, `clearInterval` no `ngOnDestroy`): gira sem parar; **⏪ Abrandar**, **⏩ Acelerar!** (fumo, faíscas, roleta a tremer, motor) e **⏹ Parar!** (travagem). Trava sozinha aos 12 s. Cai em meme / piada / adivinha / vídeo. Aparece em todas as páginas + botão 🎁 para desligar
- [ ] 🔊 Sons: os do protótipo ficaram maus → usar **ficheiros de som reais** (domínio público / CC0). Respeitam o volume e o 🔇 do leitor

**1. ✏️ CRUD completo — falta o U (Update / Editar)**
| Letra | O quê | Onde | Estado |
|---|---|---|---|
| **C** Create | `criar()` | Escrever, Editor de meme, Gerador | ✅ |
| **R** Read | `listar()` | Criado por ti | ✅ |
| **U** Update | `editar()` | Criado por ti → botão ✏️ Editar (abre a `Janela` com o formulário) | ✅ (qui 22) |
| **D** Delete | `apagar()` | Criado por ti → 🗑️ Apagar | ✅ |
- [x] Editar dentro da `Janela`, com um formulário só (`parte_1`, `parte_2`, `dica`) para os 3 tipos
- [x] `editar(id, alteracoes: Partial<Criacao>)` no `CriacoesService` (no `localStorage`)
- [x] Botão ✏️ Editar ao lado do 🗑️ Apagar + cartões mais largos (3 por linha)
- [x] TS: `switch` com narrowing, `Record<Criacao['tipo'], [string, string]>` (Record + tupla), `Partial`

**2. 🗄️ Supabase**
- [x] Pacote `@supabase/supabase-js` instalado + `SupabaseService` + `environments` (22/10)
- [ ] Criar a tabela `criacoes` no Supabase (com a forma das nossas interfaces)
- [ ] Trocar o interior do `CriacoesService`: `localStorage` → Supabase (`listar`, `criar`, `editar`, `apagar`, `avaliar`)
  - ⚠️ O Supabase devolve **Promises**, não Observables → embrulhar com `from(...)` do RxJS para os métodos continuarem a devolver `Observable` (assim as páginas não mudam)
  - Os JSON "da internet" (`piadas.json`, `adivinhas.json`, `memes-internet.json`, `memes.json`) podem ficar como estão; `videos.json` pode passar para uma tabela `videos` (opcional)
- [ ] Estados "a carregar…" e erro também no Criado por ti (agora os dados vêm da internet)
- [ ] (?) Autenticação / login — só se o enunciado pedir

**3. 🔍 Revisão de código + 🚀 publicar + README + ensaiar** (última semana)
| **sex 23** | 🔍 **Revisão de código**, ficheiro a ficheiro | ⬜ |
| **sáb 24** | Publicar + README + ensaiar a apresentação | ⬜ |
| **dom 25** | Reserva + **ENTREGA** 🏁 | |

> Se o tempo apertar, a Multimédia é a primeira a sair (é extra). A revisão de código e a entrega nunca saem.

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
- [x] "a carregar…" e erro com `@if` (Escrever: `subscribe({ next, error })`)
- [x] Pesquisa de templates com `[(ngModel)]` + `@empty`
- [x] Componente `CartaoMeme` — `@Input()` imagem, texto_cima, texto_baixo (usado no editor e no Criado por ti)
- [x] Editor `/meme/:id`: imagem + texto de cima/baixo ao vivo (`ActivatedRoute`, Reactive Form) + Guardar (`router.navigate`)
- [x] Componente `Estrelas` — `@Input() valor` + `@Output() avaliar` (EventEmitter + emit + $event)
  - 📝 Nota de estudo: aqui vês o `@Output` na prática (ficou confuso na leitura — é normal).
    Filho "grita": `this.avaliar.emit(4)` → pai "ouve": `(avaliar)="guardarNota($event)"` → `$event` = 4.
    É como o `(click)` de um botão, mas um evento inventado por ti.
- [x] Criado por ti: lista dos memes com data (`| date`) e `@switch (criacao.tipo)`
- [x] Criado por ti: estrelas (0 a 5), guardadas no `localStorage`
- [x] Apagar uma criação (botão 🗑️)
- [ ] Confirmação "Apagar? Sim / Não" (extra)
- [x] `CriacoesService`: `listar()`, `criar()`, `apagar()`, `avaliar()` no `localStorage` (não perde ao recarregar)

✅ *Aqui a app já cumpre quase todo o enunciado.*

## Fase 2 — Escrever piadas e adivinhas (feita seg 19!)
- [x] Botões Meme / Piada / Adivinha no Escrever (`signal` + `@switch` + `@default`)
- [x] Formulário reativo: `FormGroup` + `FormControl` + `ReactiveFormsModule`
- [x] Validadores: `required`, `minLength`, `maxLength`, **`email`**
- [x] Mensagens de erro (`invalid && touched`) + botão `[disabled]="form.invalid"`
  - 📝 Nota de estudo: aqui vês na prática a diferença entre `{{ }}` e `[ ]`.
    `disabled="{{ x }}"` fica SEMPRE desligado (vira o texto "false"); `[disabled]="x"` obedece ao `true`/`false`.
    Regra: `{{ }}` = mostrar texto · `[ ]` = configurar um elemento ou passar dados a um componente.
- [x] Componente `CartaoTexto` (`@Input() criacao: Piada | Adivinha` + narrowing)
- [ ] Pré-visualização ao vivo no Escrever (extra)
- [x] "Ver resposta" com `@if` (signal `revelada` dentro do cartão)
- [x] Guardar (`Origem.Mao`, `NovaCriacao`) → aparece no Criado por ti
- [x] Filtros no Criado por ti — componente `Filtro` (`@Input ativo` + `@Output mudar`), tipo `TipoFiltro`
- [x] `@switch` no tipo do cartão (`@case ('meme')` + `@default`)

✅ *Enunciado cumprido a 100%.*

## Fase 3 — Gerador simulado (feita ter 20!)
- [x] Frases-modelo em `dados/modelos-gerador.ts` (`Record<Estilo, Modelo[]>`)
- [x] `GeradorService.gerar(pedido)` com `of(...).pipe(delay(...))` + `Origem.IA` + constantes (sem números mágicos)
- [x] Formulário: nome, país, profissão, objeto, fruta, tipo, estilo (`<select>` com `@for`), maldade
- [x] Validadores `min(1)` / `max(10)` no nível de maldade
- [x] "A pensar…" / resultado / "ainda nada" (`@if` / `@else if` / `@else`), lado a lado
- [x] `OnDestroy`: `Subscription` + `unsubscribe()` se saíres a meio
- [x] Gerados vão logo para o Criado por ti
- [x] Avaliar com estrelas logo no fim (`Estrelas` reutilizado)
- [ ] (Parte 2) Gemini a sério através do backend — só muda o `GeradorService`

## Fase 4 — Explorar (feita ter 20!)
- [x] `public/dados/piadas.json` e `adivinhas.json` (em português)
- [x] `ExplorarService.listar_piadas()` + piadas a aparecer no Explorar (18/10)
- [x] `ExplorarService`: `listar_adivinhas()` + `listar_memes()` (memes-internet.json)
- [x] ~~3 filas horizontais~~ → trocado por `Filtro` + grelha, com cartões todos do mesmo tamanho
- [x] Clicar num cartão abre-o em grande: componente `Janela` com `<ng-content />`
- [ ] ~~Botão 🔄 Outros~~ (não fez falta)

## Início (feito ter 20!)
- [x] Saudação (bom dia / boa tarde / boa noite) com o pipe `saudacao`
- [x] 4 cartões para as zonas da app (`@for` + `routerLink`)
- [x] Página 404 (`NaoEncontrado`)

> ⏸️ O que está abaixo ficou de fora (decidido a 20/10). Fica como ideia, se sobrar tempo.

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
- [x] Enum `Estilo` (Clássica / Absurda / Humor negro) + enum `Origem` (Mão / IA / Explorar)
- [x] Tipo literal: `type Estrelas = 0 | 1 | 2 | 3 | 4 | 5` (+ `TipoFiltro = 'meme' | 'piada' | 'adivinha'`)
- [x] Interface base `CriacaoBase` (`readonly id`, `data_criacao`, `estrelas`, `autor?`)
- [x] `extends`: `Meme`, `Piada`, `Adivinha` estendem `CriacaoBase`
- [x] Opcional: `dica?: string` na `Adivinha`
- [x] Union type: `type Criacao = Meme | Piada | Adivinha` + narrowing pelo `tipo` (`@switch`)
- [x] Alias no import: `Estrelas as Nota` (para não chocar com o componente `Estrelas`)
- [ ] Interseção: `type PiadaGerada = Piada & { estilo: Estilo; maldade: number }`
- [ ] Tupla: palavras do gerador `[pais: string, profissao: string, objeto: string, fruta: string]`
- [ ] Assinatura de índice: tempo por dia `{ [data: string]: number }`

**Utility types**
- [x] `Omit` + generic: `Rascunho<T> = Omit<T, 'id' | 'data_criacao' | 'estrelas'>` — dados antes de guardar
- [ ] `Partial<Criacao>` — atualizar só uma parte (ex.: estrelas)
- [ ] `Pick<Meme, 'name' | 'url'>` — o que o cartão precisa
- [x] `Record<Estilo, Modelo[]>` — as frases-modelo do Gerador, arrumadas por estilo
- [ ] `Record<TipoCriacao, number>` — contagem memes / piadas / adivinhas

**Generics**
- [ ] `interface ApiResposta<T> { success: boolean; data: T }` (formato do Imgflip)
- [ ] Generic com restrição: `class Armazem<T extends { id: number }>`

**Classes (POO)**
- [ ] `interface Repositorio<T>` + `class Armazem<T> implements Repositorio<T>` (guarda no `localStorage`)
- [ ] Modificadores: `protected chave`, `private` nos detalhes internos, `public` nos métodos usados fora
- [ ] Herança: `class ArmazemCriacoes extends Armazem<Criacao>` com `super('criacoes')` + `contarPorTipo()`
- [x] Parameter properties: `constructor(private http: HttpClient)` nos services

**Boas práticas**
- [ ] `unknown` (nunca `any`) no erro do `subscribe`, com verificação antes de usar
- [ ] Tipos de retorno nas funções (incluindo `: void`)
- [ ] Zero `any` em todo o projeto
- [ ] `strict: true` no `tsconfig.json` (já vem assim no Angular)

---

## 🔍 Revisão de código (sex 23 — um dia inteiro)
> 📝 Juntar à revisão: **restrições na base de dados** (`alter table criacoes add constraint ... check (char_length(autor) between 3 and 40)`, texto_cima ≤ 40, pergunta ≤ 150) — dupla proteção: formulário + SQL. Ajustar o *budget* do `angular.json` (Supabase passou os 500 kB). Apagar o componente `contra-relogio` (não usado). Passar o `SupabaseService` já está com `@Injectable` ✅.
> Ficheiro a ficheiro, com calma. Objetivo: perceber TUDO e preparar a apresentação.

**Em cada ficheiro, verificar:**
- [ ] Sei explicar o que cada linha faz (se não sei, pergunto)
- [ ] Nomes claros e em `snake_case` (variáveis, métodos, campos)
- [ ] Sem código morto (imports não usados, comentários velhos, `console.log`)
- [ ] Sem "números mágicos" (usar constantes)
- [ ] Funções pequenas, com *early return* quando faz sentido
- [ ] Componentes só mostram; a lógica dos dados está nos services
- [ ] Formatado (Shift + Alt + F)
- [ ] 📝 Pensar: na `Piada`, o campo `pergunta` é afinal o **início** da piada (já não são só perguntas). Mudar o nome (ex.: `inicio`)? E a etiqueta do Escrever "A pergunta da piada" → "O início da piada"?

**Ordem sugerida:**
- [ ] `models/` (as interfaces e tipos)
- [ ] `services/` + `dados/`
- [ ] `components/` (CartaoMeme, CartaoTexto, Estrelas, Filtro, Header)
- [ ] `pages/` (Início, Explorar, Gerador, Escrever, EditorMeme, CriadoPorTi, NaoEncontrado)
- [ ] `app.config.ts`, `app.routes.ts`, `app.ts`, `styles.css`

**Para a apresentação, anotar:**
- [ ] 3 decisões de organização que sei justificar (ex.: CartaoMeme criado depois de ver código repetido)
- [ ] Onde está cada requisito do enunciado (tabela no fim deste ficheiro)

---

## 💡 Ideias para melhorar (só depois do obrigatório!)
> Regra: quando te lembrares de uma melhoria, escreve-a aqui e continua o que estavas a fazer.

- [ ] Carregar uma imagem própria para fazer um meme
- [ ] Botão para descarregar o meme como imagem
- [x] ~~Quadrados do Início~~ → decidido: só a saudação + 4 cartões (20/10)
- [ ] Classe genérica `Armazem<T>` para o `localStorage` (extra de TypeScript)
- [ ] Sons de animais (cabra, ovelha…) de 30 em 30 segundos 🐐
- [ ] 🎬 Separador **Multimédia**: vídeos (apanhados da TV, humoristas, músicas engraçadas) a partir de um `videos.json` + YouTube embutido (precisa do `DomSanitizer`)
- [ ] ⬇️⬆️ Exportar / Importar as criações num `criacoes.json` (cópia de segurança + encher a base de dados na parte 2) — a decidir
- [ ] 🎵 **Playlist** num leitor no `app.html`, fora do `<router-outlet>` → continua a tocar ao mudar de página (demonstra a SPA!). Só arranca com um clique (regra dos browsers)
- [ ] No Editor (`/meme/...`), o separador "Escrever" da barra não fica amarelo (o endereço não é `/escrever`)
- [ ] 🎁 **Surpresa de 5 em 5 minutos**: abre sozinha a `Janela` com uma piada/adivinha/meme ao calhas (no `app.ts`: `setInterval` no `ngOnInit`, `clearInterval` no `ngOnDestroy`). Aparece em **todas** as páginas, mesmo a meio de formulários (decidido: interromper faz parte da piada 😄) + botão para desligar
- [ ] 💡 Gerador: as adivinhas geradas também trazem uma **dica** (ex.: "Tem a ver com {fruta}"), como as escritas à mão

---

## Requisitos do enunciado → onde estão

| Requisito | Onde |
|---|---|
| Componentes | 7 páginas + `Header`, `CartaoMeme`, `CartaoTexto`, `Estrelas`, `Filtro`, `Janela` |
| `{{ }}` `[ ]` `( )` `[( )]` | textos · `[src]`, `[disabled]`, `[class.x]` · `(click)` · pesquisa do Escrever |
| `@if` / `@for` / `@switch` | a carregar/erro · listas · tipo da criação (Escrever, Criado por ti) |
| Pipes | `date`, `number` + o meu pipe **`saudacao`** |
| `@Input` / `@Output` | `CartaoMeme`, `CartaoTexto` · `Estrelas`, `Filtro`, `Janela` |
| Service + DI + interfaces | `MemeService`, `ExplorarService`, `CriacoesService`, `GeradorService` · `Meme`, `Criacao`… |
| HttpClient + a carregar + erro | `dados/*.json` (Escrever, Explorar) · Gerador simulado com `delay` |
| Router (3+ vistas) | 5 páginas + `/meme/:id` + 404 |
| Reactive Forms + validação | Escrever, Gerador, editor de meme |
| `OnInit` / `OnDestroy` | carregar dados · cancelar pedidos |
