// Configuração do OpenAI (use sua chave)
const OPENAI_KEY = 'sk-sua-chave';

// Elementos da UI (sem JSX)
const output = document.getElementById('story');
const input = document.getElementById('action-input');
const button = document.getElementById('action-button');

// Histórico do jogo
let story = [];

// Função para gerar respostas via OpenAI
async function generateAction(prompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{
        role: 'system',
        content: 'Você é um narrador de um RPG dark fantasy. Mantenha respostas curtas e use markdown (**negrito**).'
      }, {
        role: 'user',
        content: prompt
      }]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

// Evento de ação do jogador
button.addEventListener('click', async () => {
  const userAction = input.value;
  const aiResponse = await generateAction(userAction);
  
  story.push(`**Você:** ${userAction}`);
  story.push(`**Narrador:** ${aiResponse}`);
  
  output.innerHTML = story.join('<br><br>');
  input.value = '';
});