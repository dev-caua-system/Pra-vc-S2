// --- CONFIGURAÇÃO ---
// Defina a senha aqui (pode ser a data de namoro)
const SENHA_CORRETA = "12062024"; 

// --- TEXTOS DAS CARTAS ---
// Edite os textos dentro das aspas. Use <br> para pular linha.
const cartas = {
    'saudade': {
        titulo: "Quando a saudade apertar...",
        texto: "Meu amor,<br><br>Se você está lendo isso, é porque estamos longe. Lembre-se que a distância é apenas um teste para ver até onde o amor pode viajar. Feche os olhos e imagine meu abraço.<br><br>Te amo muito!"
    },
    'triste': {
        titulo: "Vai ficar tudo bem",
        texto: "Não gosto de te ver triste. Respire fundo. Lembre-se daquele dia que a gente riu tanto que a barriga doeu? Você é forte e isso vai passar.<br><br>Estou aqui com você."
    },
    'brava': {
        titulo: "Me desculpa?",
        texto: "Eu sei que as vezes sou difícil. Mas nunca é minha intenção te magoar. Vamos conversar? Não gosto de ficar brigado com você.<br><br>Te amo, sua chata ❤️"
    },
    'feliz': {
        titulo: "Que dia feliz!",
        texto: "Ver você feliz é o que me faz feliz. Guarde esse momento no coração. Você merece toda a alegria do mundo!"
    },
    'nos': {
        titulo: "Nosso Futuro",
        texto: "Eu vejo um futuro lindo para nós dois. Obrigado por ser minha companheira. Vamos dominar o mundo juntos!"
    }
};

// --- LÓGICA DO SITE (NÃO PRECISA MEXER MUITO) ---

function checkPassword() {
    const input = document.getElementById("password-input").value;
    const errorMsg = document.getElementById("error-msg");
    const loginScreen = document.getElementById("login-screen");
    const mainContent = document.getElementById("main-content");

    if (input === SENHA_CORRETA) {
        loginScreen.style.display = "none";
        mainContent.style.display = "block";
    } else {
        errorMsg.style.display = "block";
        // Efeito de tremer a caixa (opcional)
        document.querySelector('.login-box').animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(0)' }
        ], { duration: 300 });
    }
}

function openLetter(tipo) {
    const modal = document.getElementById("letter-modal");
    const title = document.getElementById("modal-title");
    const body = document.getElementById("modal-body");

    title.innerText = cartas[tipo].titulo;
    body.innerHTML = cartas[tipo].texto; // Usa innerHTML para aceitar <br>
    
    modal.style.display = "flex";
}

function closeLetter() {
    document.getElementById("letter-modal").style.display = "none";
}

// Fechar modal clicando fora
window.onclick = function(event) {
    const modal = document.getElementById("letter-modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}