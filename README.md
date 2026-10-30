# 🎭 Arena do Riso

Aplicação web **SPA** feita em **Angular** para criar, explorar e avaliar humor: **memes, piadas e adivinhas**, escritos à mão ou gerados com **IA**.

## 🔗 Acesso

|                              |                                                      |
| ---------------------------- | ---------------------------------------------------- |
| 🌐 **Abrir a aplicação**     | **https://carlosgon-dev.github.io/projeto_angular/** |
| 📦 **Repositório no GitHub** | https://github.com/carlosgon-dev/projeto_angular     |

Projeto Prático do Módulo 5 (UPskill): _Aplicação Web SPA com Angular_.

---

## ✨ Funcionalidades

| Página               | O que faz                                                                                                                                                                                             |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🏠 **Início**        | Saudação personalizada (bom dia / boa tarde / boa noite + nome) e atalhos para as outras páginas.                                                                                                     |
| 🌍 **Explorar**      | Memes da internet, piadas, adivinhas e vídeos. Tem filtro por tipo.                                                                                                                                   |
| ⚔️ **Arena**         | Duelo de piadas: votas na melhor de cada par e vês o pódio (top 3). Clicas numa linha do pódio para ler a piada. A primeira a chegar aos **5 pontos** é a campeã e aparece um pódio final com 🥇🥈🥉. |
| 🤖 **Gerador**       | Dás as palavras, o estilo e a "maldade", e a IA (Gemini) cria uma piada ou adivinha. Se a IA falhar, há um plano B com modelos locais.                                                                |
| ✍️ **Escrever**      | Escreves a tua piada ou adivinha (formulário com validação), ou escolhes um template de meme.                                                                                                         |
| 🖼️ **Criar meme**    | Escreves o texto de cima e o de baixo e vês o meme a ser criado em tempo real.                                                                                                                        |
| ⭐ **Criado por ti** | Tudo o que criaste, com filtro. Podes **ver, editar, avaliar com estrelas e apagar** (CRUD completo). Um atalho ➕ leva-te a criar mais.                                                              |
| 🔐 **Entrar**        | Registo, login, logout e recuperação de password (Supabase Auth). Depois de confirmares o e-mail, a app mostra o aviso _"E-mail confirmado com sucesso!"_.                                            |
| 🔑 **Nova password** | Página para onde o email de recuperação te leva.                                                                                                                                                      |
| ❓ **404**           | Página para endereços que não existem.                                                                                                                                                                |

**Extras em todas as páginas:**

- 🎵 um leitor de música (YouTube) no fundo do ecrã;
- 🎰 uma roleta surpresa que te mostra um meme, uma piada, uma adivinha ou um vídeo ao calhas (enquanto gira, a playlist faz pausa);
- 🌙 modo escuro automático (segue o modo do computador);
- 📱 responsivo: no telemóvel há menu ☰, os memes ficam 2 por linha e os textos ocupam a linha toda.

As páginas **Arena, Gerador, Escrever, Criar meme e Criado por ti** só abrem com sessão iniciada.

---

## 🛠️ Tecnologias

- **Angular 22**: componentes standalone, signals, Router, Reactive Forms, HttpClient e pipes próprios.
- **TypeScript**: interfaces, enums, union types e generics.
- **Supabase**: autenticação, base de dados (PostgreSQL com RLS) e Edge Function.
- **RxJS**: Observables, `pipe`, `map`, `catchError`, `timeout`, `switchMap`.
- **GitHub Actions + GitHub Pages**: publicação automática.
- **CSS feito à mão**: variáveis CSS, grid, responsivo e modo escuro.

---

## 🌐 APIs e serviços externos

| Serviço                                                                          | Para quê                                                        | Onde no código                                                                                                                                                                                |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Imgflip API](https://api.imgflip.com/get_memes)                                 | Templates de memes (página Escrever)                            | [meme-service.ts](src/app/services/meme-service.ts)                                                                                                                                           |
| [Meme API](https://meme-api.com/gimme/20)                                        | Memes da internet (página Explorar)                             | [explorar-service.ts](src/app/services/explorar-service.ts)                                                                                                                                   |
| **Supabase Auth**                                                                | Registo, login e recuperação de password                        | [auth-service.ts](src/app/services/auth-service.ts)                                                                                                                                           |
| **Supabase Database**                                                            | Tabelas `criacoes` (CRUD), `piadas`, `adivinhas` e `videos`     | [criacoes-service.ts](src/app/services/criacoes-service.ts) · [supabase-service.ts](src/app/services/supabase-service.ts) · SQL em [docs/supabase-conteudos.sql](docs/supabase-conteudos.sql) |
| **Supabase Edge Function** `gerar-piada_ia`                                      | Fala com a IA **Gemini** (a chave fica guardada só no Supabase) | [gerador-service.ts](src/app/services/gerador-service.ts) · código da função em [docs/gerar-piada_ia.md](docs/gerar-piada_ia.md)                                                              |
| [YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference) | Leitor de música e vídeos                                       | [leitor.ts](src/app/components/leitor/leitor.ts) · [youtube-pipe.ts](src/app/pipes/youtube-pipe.ts)                                                                                           |

**Plano B:** se uma API falhar, a app usa os ficheiros JSON em [public/dados/](public/dados/) e continua a funcionar.

---

## 💻 Instalação (correr no teu computador)

**Precisas de:** [Node.js](https://nodejs.org/) (versão 22, 24 ou 26 — recomendada a **24**, a mesma do deploy) e o Angular CLI.

```bash
# 1. Clonar o repositório
git clone https://github.com/carlosgon-dev/projeto_angular.git
cd projeto_angular

# 2. Instalar as dependências
npm install
```

**3. Criar o ficheiro das chaves.** Este ficheiro **não está no GitHub**, de propósito (está no `.gitignore`).
Cria `src/environments/environment.development.ts` com os dados do teu projeto Supabase
(_Project Settings → API_):

```ts
export const environment = {
  supabase_key: 'A_TUA_PUBLISHABLE_KEY',
  supabase_url: 'https://O_TEU_PROJETO.supabase.co',
};
```

> ⚠️ Usa só a chave **publishable** (`sb_publishable_...`), que é pública por natureza. Quem protege os dados são as regras **RLS** do Supabase e o login.
> **Nunca** uses a chave `service_role` / secret na app.

```bash
# 4. Arrancar
ng serve
```

E depois abre http://localhost:4200/ no browser.

---

## 🚀 Publicação (GitHub Actions)

Cada `push` para o ramo `main` corre o workflow [.github/workflows/main.yml](.github/workflows/main.yml), que:

1. instala o **Node 24** (versão fixa, para o build ser sempre igual) e as dependências;
2. troca os marcadores `__SUPABASE_URL__` e `__SUPABASE_KEY__` do [environment.ts](src/environments/environment.ts) pelas chaves guardadas nos **GitHub Secrets** (o código nunca as tem escritas);
3. faz o build de produção;
4. publica no **GitHub Pages**. Cria também uma cópia `404.html`, para as rotas do Angular funcionarem quando se faz refresh.

---

## 📁 Estrutura do projeto

```
src/app/
├── components/   peças reutilizáveis (header, filtro, estrelas, janela, cartões, leitor, surpresa)
├── pages/        uma pasta por página (rota)
├── services/     acesso a dados e lógica (Supabase, APIs, IA, som)
├── models/       interfaces e tipos TypeScript
├── pipes/        pipes próprios (saudação, youtube)
├── dados/        modelos do plano B do gerador
├── app.routes.ts rotas
└── app.config.ts configuração (router, HttpClient, língua pt-PT)
public/
├── dados/        JSON do plano B
├── imagens/
└── sons/
docs/
├── supabase-conteudos.sql  tabelas, regras RLS e dados do Explorar
├── gerar-piada_ia.md       código da Edge Function (sem chaves)
└── prototipo.html          protótipo do design
```

---

## 👤 Autor

**Carlos Gonçalves**: [github.com/carlosgon-dev](https://github.com/carlosgon-dev)
