# Edge Function `gerar-piada_ia`

Código da função que corre no Supabase (Deno) e fala com a IA Gemini.
A chave `GEMINI_API_KEY` está guardada nos secrets do Supabase, nunca no código.

```ts
const CHAVE = Deno.env.get('GEMINI_API_KEY');
const MODELO = 'gemini-2.5-flash';

const CABECALHOS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};

const ESTILOS: Record<string, string> = {
  classica: 'clássico, como as piadas de sempre',
  absurda: 'absurdo e surreal',
  negro: 'humor negro (mas sem ofender grupos de pessoas)',
};

Deno.serve(async (pedido) => {
  if (pedido.method === 'OPTIONS') return new Response('ok', { headers: CABECALHOS });

  const p = await pedido.json();
  const regras = `Estilo: ${ESTILOS[p.estilo] ?? ESTILOS.classica}. Nível de maldade: ${p.maldade} em 10.
Nada de insultos a grupos de pessoas nem conteúdo sexual explícito.`;

  const instrucoes =
    p.tipo === 'adivinha'
      ? `Escreve uma adivinha em português de Portugal (não do Brasil).
A resposta da adivinha TEM de ser exatamente: "${p.objeto}".
Mete na adivinha a pessoa "${p.nome}" e o lugar "${p.lugar}".
${regras}
Responde APENAS com JSON: {"pergunta": "a adivinha", "segunda_parte": "${p.objeto}"}`
      : `Escreve uma piada curta em português de Portugal (não do Brasil).
Usa estas palavras: nome "${p.nome}", profissão "${p.profissao}", lugar "${p.lugar}", objeto "${p.objeto}", animal "${p.animal}", superpoder "${p.superpoder}", comida "${p.comida}".
${regras}
Responde APENAS com JSON: {"pergunta": "o início da piada", "segunda_parte": "o remate"}`;

  const resposta = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODELO}:generateContent?key=${CHAVE}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: instrucoes }] }],
        generationConfig: { responseMimeType: 'application/json' },
      }),
    },
  );

  if (!resposta.ok) {
    return new Response(JSON.stringify({ erro: 'O Gemini não respondeu.' }), { status: 502, headers: CABECALHOS });
  }

  const dados = await resposta.json();
  const texto = dados.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';
  return new Response(texto, { headers: CABECALHOS });
});
```
