<h1>🤖 WhatsApp Customer Support Bot - <em>UpriseHr</em></h1>

<p>Este projeto implementa um bot de atendimento ao cliente para a <em>UpriseHr</em> usando a biblioteca <code>whatsapp-web.js</code>. O bot interage com os clientes através do WhatsApp, oferecendo informações sobre os serviços da empresa e agendando contatos com a equipe.</p>

<h2>📋 Funcionalidades</h2>
<ul>
  <li><strong>Autenticação via QR Code</strong>: O bot se conecta ao WhatsApp usando a estratégia de autenticação local.</li>
  <li><strong>Interação com clientes</strong>: O bot pergunta ao cliente se ele já conhece os serviços da <em>UpriseHr</em> e oferece opções para agendar um contato.</li>
  <li><strong>Registro de conversas</strong>: As conversas são registradas em um arquivo de texto para análise posterior.</li>
</ul>

<h2>🛠️ Instalação</h2>

<h3>Pré-requisitos</h3>
<ul>
  <li>Node.js instalado na sua máquina.</li>
  <li>WhatsApp com a conta que deseja usar para o bot.</li>
</ul>

<h3>Passos</h3>
<ol>
  <li><strong>Clone o repositório:</strong>
    <pre><code>git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio</code></pre>
  </li>

  <li><strong>Instale as dependências:</strong>
    <pre><code>npm install whatsapp-web.js qrcode-terminal</code></pre>
  </li>

  <li><strong>Prepare o arquivo de contatos:</strong>
    <p>Crie um arquivo <code>contacts.json</code> na raiz do projeto com a seguinte estrutura:</p>
    <pre><code>[
  { "name": "Cliente 1", "number": "5511999999999" },
  { "name": "Cliente 2", "number": "5511888888888" }
]</code></pre>
  </li>

  <li><strong>Execute o bot:</strong>
    <pre><code>node index.js</code></pre>
  </li>

  <li><strong>Escaneie o QR Code:</strong>
    <p>Quando você executar o script pela primeira vez, um QR Code será gerado no terminal. Escaneie-o usando o WhatsApp no seu celular para autenticar o bot.</p>
  </li>
</ol>

<h2>🚀 Como funciona</h2>
<ol>
  <li><strong>Inicialização:</strong> O bot gera um QR Code para autenticação e lê a lista de contatos do arquivo <code>contacts.json</code>.</li>
  <li><strong>Primeira mensagem:</strong> O bot envia uma mensagem inicial perguntando ao cliente se ele já conhece os serviços da <em>UpriseHr</em>.</li>
  <li><strong>Interação:</strong> Dependendo da resposta do cliente, o bot segue um fluxo de conversa para agendar um contato com a equipe.</li>
  <li><strong>Registro da conversa:</strong> Todas as interações são registradas em um arquivo de texto (<code>conversas.txt</code>).</li>
</ol>

<h2>🧪 Testes</h2>
<p>Para testar a lógica do bot, você pode criar testes unitários usando ferramentas como Jest. O código foi estruturado para permitir fácil modificação e teste.</p>

<h2>🛡️ Considerações de Segurança</h2>
<ul>
  <li><strong>Dados sensíveis:</strong> Certifique-se de que o arquivo <code>contacts.json</code> e o arquivo de conversas estejam protegidos, pois contêm dados sensíveis.</li>
  <li><strong>Autenticação:</strong> A autenticação é feita localmente usando a estratégia <code>LocalAuth</code>. Certifique-se de que o ambiente de execução do bot é seguro.</li>
</ul>

<h2>📂 Estrutura do Projeto</h2>

<pre><code>.
├── contacts.json         # Arquivo JSON com os contatos dos clientes
├── conversas.txt         # Registro de todas as conversas
├── index.js              # Código principal do bot
├── package.json          # Dependências e scripts do projeto
└── README.md             # Documentação do projeto
</code></pre>

<h2>🤝 Contribuições</h2>
<p>Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões, sinta-se à vontade para abrir uma issue ou enviar um pull request.</p>

<h2>📧 Contato</h2>
<p>Para mais informações, entre em contato com <a href="mailto:seu-email@uprisehr.com">seu-email@uprisehr.com</a>.</p>
