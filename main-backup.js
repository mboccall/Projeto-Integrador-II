const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');

// Inicialize o cliente
const client = new Client({
    authStrategy: new LocalAuth()
});

let pendingResponses = {}; // Armazena as respostas pendentes

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('QR Code recebido. Escaneie para autenticar.');
});

client.on('ready', () => {
    console.log('Cliente está pronto!');
    sendInitialMessages();
});

client.on('message', async message => {
    const from = message.from;
    const body = message.body.trim();

    // Ignora mensagens de broadcast e status
    if (from.endsWith('@broadcast') || from.startsWith('status@')) {
        console.log(`Mensagem de broadcast ou status recebida: ${from}`);
        return;
    }

    console.log(`Msg de ${from}: ${body}`);

    // Verifica se há uma resposta pendente para o número recebido
    if (pendingResponses[from]) {
        let response = pendingResponses[from];

        console.log(`Processando resposta para ${from}, etapa atual: ${response.step}`);
        
        // Atualiza as respostas conforme a etapa atual da conversa
        if (response.step === 1) {
            if (body === '1') {
                client.sendMessage(from, 'Gostaria de agendar um contato com a nossa Equipe? \n \n *1*-Sim *2*- Não');
                response.step = 2;
                response.messages.push(`${response.name}: 1 - Sim gostaria de agendar`);
            } else if (body === '2') {
                client.sendMessage(from, 'Entendido. Caso mude de ideia, basta nos chamar!');
                delete pendingResponses[from]; // Remove a resposta pendente
                response.messages.push(`${response.name}: 2 - Não gostaria de agendar`);
                logConversation(response);
            } else {
                client.sendMessage(from, 'Resposta não reconhecida. Por favor, escolha uma opção válida.');
            }
        } else if (response.step === 2) {
            if (body === '1') {
                client.sendMessage(from, 'Qual o melhor dia? \n Exemplo: 28/08/2024');
                response.step = 3;
                //response.messages.push(`${response.name}: ${body}`);
            } else if (body === '2') {
                client.sendMessage(from, 'Entendido. Caso mude de ideia, basta nos chamar!');
                delete pendingResponses[from]; // Remove a resposta pendente
                response.messages.push(`${response.name}: 2 - Não`);
                logConversation(response);
            } else {
                client.sendMessage(from, 'Resposta não reconhecida. Por favor, escolha uma opção válida.');
            }
        } else if (response.step === 3) {
            // Pergunta pelo horário
            client.sendMessage(from, 'Qual o melhor horário?');
            response.step = 4;
            response.messages.push(`${response.name}: ${body}`);
        } else if (response.step === 4) {
            // Registra a resposta final em um arquivo
            client.sendMessage(from, 'Ok entraremos em contato! Estamos à disposição para mais informações.');
            response.messages.push(`${response.name}: ${body}`);
            response.messages.push('Conversa Finalizada');
            logConversation(response);
            delete pendingResponses[from]; // Remove a resposta pendente
        }
    } else {
        console.log(`Sem resposta pendente para ${from}`);
    }
});

async function sendInitialMessages() {
    // Leia a lista de contatos do arquivo JSON
    const contacts = require('./contacts.json');

    for (const contact of contacts) {
        const number = contact.number;
        const name = contact.name;
        
        // Envia mensagem inicial
        const message = `Olá, eu sou a assistente Virtual da *UpriseHr*.\nVocê já conhece nossos serviços? \n \n*1*-Sim *2*-Não`;
        await client.sendMessage(`${number}@c.us`, message);
        
        // Armazena o estado da conversa
        pendingResponses[`${number}@c.us`] = {
            step: 1,
            name: name,
            number: number,
            messages: [message]
        };

        console.log(`Mensagem enviada para ${name} (${number}): ${message}`);
    }
}

function logConversation(response) {
    const filePath = path.join(__dirname, 'conversas.txt');
    const conversationLog = `${response.name} (${response.number}):\n${response.messages.join('\n')}\n\n`;
    fs.appendFileSync(filePath, conversationLog, 'utf8');
    console.log(`Conversa registrada para ${response.name} (${response.number})`);
}

client.initialize();