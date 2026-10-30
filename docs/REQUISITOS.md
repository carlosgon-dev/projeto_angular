# ✅ Requisitos do enunciado — onde estão cumpridos

Projeto: **Arena do Riso** · Enunciado: *Projeto Prático: Aplicação Web SPA com Angular*

Cada linha aponta para o ficheiro (e a linha) onde o requisito aparece no código.
Os números de linha são de 29/10/2026 — se o código mudar, podem andar umas linhas para cima ou para baixo.

---

## 1. Estrutura Angular e Componentização

| Requisito | Onde | ✔ |
|---|---|---|
| Aplicação Angular criada com Angular CLI e funcional | [angular.json](../angular.json) · [app.ts](../src/app/app.ts) | ✅ |
| Áreas da interface separadas em componentes | 8 componentes em [components/](../src/app/components/) + 10 páginas em [pages/](../src/app/pages/) | ✅ |
| Templates HTML + ficheiros TypeScript separados | ex.: [cartao-texto.ts](../src/app/components/cartao-texto/cartao-texto.ts) + [cartao-texto.html](../src/app/components/cartao-texto/cartao-texto.html) | ✅ |
| Não concentrar tudo num componente | [app.html](../src/app/app.html) só junta cabeçalho, páginas, leitor e surpresa | ✅ |

## 2. Templates, Data Binding e Renderização Dinâmica

| Requisito | Onde | ✔ |
|---|---|---|
| Interpolation `{{ }}` | [leitor.html:9](../src/app/components/leitor/leitor.html#L9) · [inicio.html](../src/app/pages/inicio/inicio.html) (saudação) | ✅ |
| Property binding `[ ]` | [cartao-meme.html:2](../src/app/components/cartao-meme/cartao-meme.html#L2) (`[src]`) · [escrever.html:63](../src/app/pages/escrever/escrever.html#L63) (`[disabled]`) | ✅ |
| Event binding `( )` | [estrelas.html:2](../src/app/components/estrelas/estrelas.html#L2) (`(click)`) · [leitor.html:17-20](../src/app/components/leitor/leitor.html#L17-L20) | ✅ |
| Two-way binding `[( )]` | [escrever.html:8](../src/app/pages/escrever/escrever.html#L8) (pesquisa de templates com `[(ngModel)]`) | ✅ |
| `@if` e `@for` | [explorar.html:5-8](../src/app/pages/explorar/explorar.html#L5-L8) · [app.html:3-10](../src/app/app.html#L3-L10) | ✅ |
| `@switch` | [criado-por-ti.html:15](../src/app/pages/criado-por-ti/criado-por-ti.html#L15) (meme / piada / adivinha) · [entrar.html:53](../src/app/pages/entrar/entrar.html#L53) (modos) · [escrever.html:5](../src/app/pages/escrever/escrever.html#L5) | ✅ |
| Pipes nativos (data, número, moeda) | `date` [criado-por-ti.html:29](../src/app/pages/criado-por-ti/criado-por-ti.html#L29) · `currency` [criado-por-ti.html:30](../src/app/pages/criado-por-ti/criado-por-ti.html#L30) · `number` [explorar.html:12](../src/app/pages/explorar/explorar.html#L12) | ✅ |
| Pesquisar / filtrar sem mexer no DOM à mão | pesquisa: [escrever.ts:50](../src/app/pages/escrever/escrever.ts#L50) (`templates_filtrados`) · filtros: [filtro.html](../src/app/components/filtro/filtro.html) | ✅ |
| *Extra:* pipes próprios | [saudacao-pipe.ts](../src/app/pipes/saudacao-pipe.ts) · [youtube-pipe.ts](../src/app/pipes/youtube-pipe.ts) | ⭐ |

## 3. Comunicação entre Componentes

| Requisito | Onde | ✔ |
|---|---|---|
| `@Input` (pai → filho) | [estrelas.ts:14](../src/app/components/estrelas/estrelas.ts#L14) · [cartao-texto.ts:13](../src/app/components/cartao-texto/cartao-texto.ts#L13) · [cartao-meme.ts:10-13](../src/app/components/cartao-meme/cartao-meme.ts#L10-L13) | ✅ |
| `@Output` + `EventEmitter` (filho → pai) | [estrelas.ts:15](../src/app/components/estrelas/estrelas.ts#L15) · [filtro.ts:12](../src/app/components/filtro/filtro.ts#L12) · [janela.ts:10](../src/app/components/janela/janela.ts#L10) | ✅ |
| Componente filho reutilizável que recebe dados **e** emite evento | **Estrelas** (usado em [criado-por-ti.html:31](../src/app/pages/criado-por-ti/criado-por-ti.html#L31) e no Gerador) · **Filtro** (usado em [escrever.html:3](../src/app/pages/escrever/escrever.html#L3), [explorar.html:3](../src/app/pages/explorar/explorar.html#L3) e [criado-por-ti.html:2](../src/app/pages/criado-por-ti/criado-por-ti.html#L2)) | ✅ |

## 4. Services, Interfaces TypeScript e Injeção de Dependências

| Requisito | Onde | ✔ |
|---|---|---|
| Service com `@Injectable` | 9 services em [services/](../src/app/services/), ex.: [criacoes-service.ts:10](../src/app/services/criacoes-service.ts#L10) | ✅ |
| Injeção de Dependências nos componentes | [escrever.ts:55](../src/app/pages/escrever/escrever.ts#L55) (`constructor(private ...)`) | ✅ |
| Interfaces para as entidades principais | [models/](../src/app/models/): [piada.ts](../src/app/models/piada.ts), [adivinha.ts](../src/app/models/adivinha.ts), [meme.ts](../src/app/models/meme.ts), [criacao-base.ts](../src/app/models/criacao-base.ts), [video.ts](../src/app/models/video.ts)… | ✅ |
| Lógica de negócio fora dos componentes | ex.: [gerador-service.ts](../src/app/services/gerador-service.ts) (IA + plano B) · [criacoes-service.ts](../src/app/services/criacoes-service.ts) (CRUD) | ✅ |
| *Extra TypeScript:* enums, union types, generics, `Omit` | [estilo.ts](../src/app/models/estilo.ts) · [criacao.ts:5-12](../src/app/models/criacao.ts#L5-L12) · [supabase-service.ts](../src/app/services/supabase-service.ts) (`ler_tabela<T>`) | ⭐ |

## 5. Consumo de Dados com HttpClient

| Requisito | Onde | ✔ |
|---|---|---|
| `HttpClient` com pelo menos um pedido | [app.config.ts:14](../src/app/app.config.ts#L14) (`provideHttpClient`) · [meme-service.ts:18](../src/app/services/meme-service.ts#L18) (API Imgflip) · [explorar-service.ts:32](../src/app/services/explorar-service.ts#L32) (meme-api) | ✅ |
| Pedido feito dentro de um Service | [meme-service.ts](../src/app/services/meme-service.ts) · [explorar-service.ts](../src/app/services/explorar-service.ts) | ✅ |
| Resposta tipada com interface | `get<RespostaImgflip>` [meme-service.ts:18](../src/app/services/meme-service.ts#L18) · interface em [imgflip.ts](../src/app/models/imgflip.ts) | ✅ |
| `Observable` + `subscribe()` | [escrever.ts:63](../src/app/pages/escrever/escrever.ts#L63) · [criado-por-ti.ts:65](../src/app/pages/criado-por-ti/criado-por-ti.ts#L65) | ✅ |
| Dados mostrados na interface | [escrever.html](../src/app/pages/escrever/escrever.html) (templates) · [explorar.html](../src/app/pages/explorar/explorar.html) | ✅ |
| Estados de **carregamento** e **erro** | [escrever.html:10-12](../src/app/pages/escrever/escrever.html#L10-L12) · [criado-por-ti.html:4-6](../src/app/pages/criado-por-ti/criado-por-ti.html#L4-L6) | ✅ |
| **Supabase — Autenticação** | [auth-service.ts](../src/app/services/auth-service.ts) (registar :29, entrar :39, sair :44, recuperar password :49) · página [entrar](../src/app/pages/entrar/entrar.ts) · rotas privadas em [app.html:5](../src/app/app.html#L5) | ✅ |
| **Supabase — Base de dados** | [criacoes-service.ts](../src/app/services/criacoes-service.ts) (CRUD completo: select :19, insert :30, delete :40, update :45) · tabelas `piadas`/`adivinhas`/`videos` lidas em [supabase-service.ts](../src/app/services/supabase-service.ts) | ✅ |
| **GitHub Actions + GitHub Pages** | [.github/workflows/main.yml](../.github/workflows/main.yml) · site: https://carlosgon-dev.github.io/projeto_angular/ | ✅ |
| **Variáveis de ambiente** para a key do Supabase | [environment.ts](../src/environments/environment.ts) (só marcadores) · chaves no cofre do GitHub, trocadas em [main.yml:34-46](../.github/workflows/main.yml#L34-L46) · `environment.development.ts` fica fora do Git ([.gitignore:47](../.gitignore#L47)) · troca configurada em [angular.json:51-52](../angular.json#L51-L52) | ✅ |

## 6. Navegação com Angular Router

| Requisito | Onde | ✔ |
|---|---|---|
| Rotas configuradas | [app.routes.ts:14-23](../src/app/app.routes.ts#L14-L23) (incluindo rota com parâmetro `meme/:id` e página 404 `**`) | ✅ |
| `router-outlet` | [app.html:9](../src/app/app.html#L9) | ✅ |
| `RouterLink` | [header.html:9-18](../src/app/components/header/header.html#L9-L18) · [escrever.html:20](../src/app/pages/escrever/escrever.html#L20) (`[routerLink]` com id) | ✅ |
| Pelo menos 3 vistas (incl. início e listagem/gestão) | Início, Explorar (listagem), Criado por ti (gestão: ver, editar, avaliar, apagar), Escrever / Criar meme (criação), Gerador, Arena, Entrar, 404 | ✅ |

## 7. Formulários Reativos e Validação

| Requisito | Onde | ✔ |
|---|---|---|
| `FormGroup` e `FormControl` | [escrever.ts:33-48](../src/app/pages/escrever/escrever.ts#L33-L48) · [gerador.ts:33-44](../src/app/pages/gerador/gerador.ts#L33-L44) · [entrar.ts:48-55](../src/app/pages/entrar/entrar.ts#L48-L55) | ✅ |
| `ReactiveFormsModule` | [gerador.ts:21](../src/app/pages/gerador/gerador.ts#L21) | ✅ |
| Validadores `required`, `email`, `minLength` | [entrar.ts:53-54](../src/app/pages/entrar/entrar.ts#L53-L54) · [escrever.ts:46-47](../src/app/pages/escrever/escrever.ts#L46-L47) · *extra:* `min`/`max` em [gerador.ts:43](../src/app/pages/gerador/gerador.ts#L43) | ✅ |
| Mensagens de erro | [escrever.html:36-60](../src/app/pages/escrever/escrever.html#L36-L60) · [entrar.html:16-35](../src/app/pages/entrar/entrar.html#L16-L35) | ✅ |
| Impedir submissão inválida | [escrever.html:63](../src/app/pages/escrever/escrever.html#L63) · [gerador.html:70](../src/app/pages/gerador/gerador.html#L70) (`[disabled]="form.invalid"`) · [gerador.ts:74](../src/app/pages/gerador/gerador.ts#L74) (early return) | ✅ |
| Processar os dados depois de submeter | [escrever.ts:89](../src/app/pages/escrever/escrever.ts#L89) (guarda no Supabase e vai para *Criado por ti*) | ✅ |

## 8. Ciclo de Vida e Organização do Código

| Requisito | Onde | ✔ |
|---|---|---|
| `OnInit` | [escrever.ts:62](../src/app/pages/escrever/escrever.ts#L62) · [explorar.ts:49](../src/app/pages/explorar/explorar.ts#L49) · [criado-por-ti.ts:57](../src/app/pages/criado-por-ti/criado-por-ti.ts#L57) | ✅ |
| `OnDestroy` (limpeza de recursos) | [gerador.ts:103-106](../src/app/pages/gerador/gerador.ts#L103-L106) (`unsubscribe`) · [leitor.ts:53](../src/app/components/leitor/leitor.ts#L53) (fecha o leitor do YouTube) · [surpresa.ts:111](../src/app/components/surpresa/surpresa.ts#L111) | ✅ |
| Ficheiros organizados por responsabilidade | `components/` · `pages/` · `services/` · `models/` · `pipes/` · `dados/` | ✅ |
| Acesso a dados nos Services, apresentação nos componentes | as páginas só chamam services (ex.: [criado-por-ti.ts:65](../src/app/pages/criado-por-ti/criado-por-ti.ts#L65)) | ✅ |
| Nomes claros e consistentes | snake_case em variáveis/métodos, PascalCase em classes/interfaces, constantes em MAIÚSCULAS | ✅ |

---

## 4. Entrega e Alojamento

| Requisito | Onde | ✔ |
|---|---|---|
| Repositório público no GitHub | https://github.com/carlosgon-dev/projeto_angular | ✅ |
| Aplicação publicada e funcional | https://carlosgon-dev.github.io/projeto_angular/ | ✅ |
| README: descrição, funcionalidades, link, instalação, API usada | [README.md](../README.md) | ✅ |
| Código organizado | ver secção 8 | ✅ |
| Serviço externo acessível na demonstração | Supabase — confirmar na segunda antes das 09:00 que o projeto não está em pausa | ⏳ |
