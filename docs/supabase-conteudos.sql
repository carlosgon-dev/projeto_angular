create table piadas (
  id bigint generated always as identity primary key,
  tipo text not null default 'piada' check (tipo = 'piada'),
  data_criacao timestamptz not null default now(),
  estrelas smallint not null default 0 check (estrelas between 0 and 5),
  origem text not null default 'explorar',
  pergunta text not null,
  remate text not null
);

create table adivinhas (
  id bigint generated always as identity primary key,
  tipo text not null default 'adivinha' check (tipo = 'adivinha'),
  data_criacao timestamptz not null default now(),
  estrelas smallint not null default 0 check (estrelas between 0 and 5),
  origem text not null default 'explorar',
  pergunta text not null,
  resposta text not null,
  dica text
);

create table videos (
  id bigint generated always as identity primary key,
  titulo text not null,
  categoria text not null check (categoria in ('humoristas', 'apanhados', 'musicas')),
  youtube_id text not null
);

alter table piadas enable row level security;
alter table adivinhas enable row level security;
alter table videos enable row level security;

create policy "todos podem ler" on piadas for select using (true);
create policy "todos podem ler" on adivinhas for select using (true);
create policy "todos podem ler" on videos for select using (true);

insert into piadas (pergunta, remate) values
  ('Um caracol foi assaltado por duas tartarugas. Na esquadra, o polícia pergunta-lhe como eram os ladrões.', '— Não sei, senhor agente… foi tudo tão rápido!'),
  ('Um homem entra numa biblioteca e pede, em voz baixa, um livro sobre paranoia.', 'A bibliotecária sussurra: — Está mesmo atrás de si.'),
  ('A professora pergunta ao Joãozinho: — Se eu tiver 5 laranjas numa mão e 7 na outra, o que é que tenho?', '— Umas mãos enormes, professora!'),
  ('Dois peixes estão dentro de um tanque. Um deles vira-se para o outro, preocupado:', '— Tu sabes conduzir isto?'),
  ('Um esqueleto entra num café e diz ao empregado:', '— Um galão… e uma esfregona, se faz favor.'),
  ('O cliente chama o empregado, furioso: — Está uma mosca na minha sopa!', '— Não se preocupe, ela não come muito.'),
  ('Disse ao meu chefe que precisava de um aumento, porque havia três empresas atrás de mim.', 'Ele quis saber quais. Respondi: a da luz, a da água e a do gás.'),
  ('A minha avó começou a fazer caminhadas de 5 km por dia quando fez 60 anos.', 'Agora tem 92 e ninguém sabe onde ela está.'),
  ('A mulher do programador pede-lhe: — Vai ao supermercado buscar um pacote de leite. Se houver ovos, traz seis.', 'Ele volta com seis pacotes de leite. — Havia ovos.'),
  ('O Joãozinho chega a casa todo contente: — Pai, hoje poupei 2 euros! Vim a correr atrás do autocarro!', '— Burro! Se tivesses vindo a correr atrás de um táxi, tinhas poupado 15!'),
  ('Uma pessoa liga para o apoio informático: — O meu computador diz «Prima qualquer tecla para continuar».', '— E qual é o problema? — Não encontro a tecla «Qualquer».'),
  ('No restaurante, o cliente pergunta: — Como é que preparam os frangos aqui?', '— Ah, nós não lhes dizemos nada. Contamos-lhes logo que vão morrer.');

insert into adivinhas (pergunta, resposta) values
  ('O que é que tem dentes mas não morde?', 'Um pente'),
  ('Quanto mais se tira, maior fica. O que é?', 'Um buraco'),
  ('Tem cidades mas não tem casas, tem rios mas não tem água. O que é?', 'Um mapa'),
  ('O que é que sobe e desce sem sair do lugar?', 'Uma escada'),
  ('O que é que quanto mais seca, mais molhada fica?', 'Uma toalha'),
  ('O que é que tem pescoço mas não tem cabeça?', 'Uma garrafa'),
  ('Qual é a coisa que se parte só de dizer o seu nome?', 'O silêncio'),
  ('O que é que anda com os pés na cabeça?', 'O piolho'),
  ('O que é que corre mas não anda, e tem cama mas não dorme?', 'Um rio'),
  ('O que é que está sempre a chegar mas nunca chega?', 'O dia de amanhã'),
  ('O que é que tem de se partir antes de se poder usar?', 'Um ovo'),
  ('O que é que tem teclas mas não abre fechaduras?', 'Um piano');

insert into videos (titulo, categoria, youtube_id) values
  ('Quim Roscas & Zeca Estacionâncio - Oh Maria dá-me o pito!', 'musicas', 'xjWYduIAcGM'),
  ('Manel das Nespras - fui cagar ao cemiterio', 'musicas', 'pwGuMuzRc7I'),
  ('Mário Silva - A Minha Sogra Gosta Do Vinho', 'musicas', 'fTxOsNJkIik'),
  ('Sai da frente Guedes!!!', 'apanhados', 'dWIHpQfDvgI'),
  ('Salta joca!!', 'apanhados', '3HFHnAJKsLE'),
  ('Apanhados TVI - dá-me o pito', 'apanhados', 'iABoj3Jf6A0'),
  ('A sardinha do São João no Porto', 'apanhados', '4fsHXofWOUY'),
  ('Apanhados TVI - Bing Lada', 'apanhados', 'Egx5HB3W6nU'),
  ('"EPÁ, Leave me Alone!!!" - José Castelo-Branco', 'apanhados', '0EFwSUb0wj8'),
  ('Apanhados TVI - Patite B', 'apanhados', '3lHVj8u0XaY'),
  ('Tóxico Independente - Apanhados TVI Porto', 'apanhados', '5At1ObsaFcY'),
  ('Apanhados TVI - Vou abandonar porque tenho consulta às cinco', 'apanhados', 'RoC8Wvf1Dwo'),
  ('JORGE JESUS - MELHORES MOMENTOS', 'apanhados', 'rrz3ARGjUVM'),
  ('Diga Um!', 'apanhados', 'HUtMwiCnVCE'),
  ('Hugo Sousa - A amiga', 'humoristas', 'W1EpbSPO1tY'),
  ('Gato Fedorento - Qual papel?', 'humoristas', 'L86T-_77Wi8'),
  ('Fernando Rocha - Tibúrcio vende tapete', 'humoristas', 'LoaLsNiblYM'),
  ('Quim Roscas & Zeca Estacionâncio - DMI', 'humoristas', 'LkVUHjtMReE'),
  ('João Seabra - Got Talent Portugal', 'humoristas', 'zutDQj5hQAk'),
  ('Cromos dos Ídolos - Melhores momentos', 'apanhados', '7zYshstqa48'),
  ('Fernando Mendes sem pedalada para concorrente do Preço Certo', 'apanhados', 'jCf91Cu4lss'),
  ('Joana Marques - Moto GP 2022 (edição humorística)', 'humoristas', 'HpooLxtKKCg'),
  ('João - Gala 01 - Got Talent Portugal', 'humoristas', 'CAzC2TISUaM'),
  ('Jingle Bells (Sandaru Sathsara)', 'musicas', 'QaWjL2dUqfg'),
  ('Quim Roscas & Zeca Estacionâncio - Não sou um Totó', 'musicas', 'ZYf3pBTMhY8'),
  ('Comme Restus - Morte Aos Ciquelistas', 'musicas', 'WJx7O1Z477M'),
  ('Quim Roscas & Zeca Estacionâncio - Ó S''Mariquinhas', 'musicas', 'vrEzjBMpEQk'),
  ('Maria das Dores - Caguei-me toda (paródia ao fado)', 'musicas', 'rc0d5qNpW4Y'),
  ('A música mais chata do mundo', 'musicas', 'Das2X6jX7YU'),
  ('Roberto, o "Frango de 8.5 milhões"', 'musicas', 'fOCyrZELFjI'),
  ('Tio Jel x Karetus - Sal Grosso', 'musicas', 'D8O68kIpSjI'),
  ('Rouxinol Faduncho - Cães de Loiça', 'musicas', 'gxc6jMVNBmI'),
  ('Zé Cabra - Deixei tudo por ela', 'musicas', 'OKr0wOOKXDE'),
  ('Zé Cabra - São lágrimas', 'musicas', '8KIgMqLFMNA'),
  ('Agora é que vens (versão Jaimão)', 'musicas', 'x_NaQ_VXbc0'),
  ('Jaimão - Anda comigo ver os tubarões', 'musicas', 'TAWSiBogqt0'),
  ('Maria Leal - Dialetos de ternura', 'musicas', 'QM-HTAxL2s0'),
  ('Conan Osiris - Telemóveis (Eurovisão 2019)', 'musicas', 'xSbp8lwCQp8');
