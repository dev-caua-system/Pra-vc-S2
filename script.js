// --- CONFIGURAÇÕES ---
const SENHA_CORRETA = "22072020"; // Senha atualizada!
const DATA_INICIO_NAMORO = new Date("2020-07-22"); // Data ajustada para o cálculo de dias

// --- LOGIN & MÚSICA ---
function checkPassword() {
    const input = document.getElementById("password-input").value;
    const errorMsg = document.getElementById("error-msg"); // Pega o elemento da mensagem de erro
    const loginScreen = document.getElementById("login-screen");
    const appContent = document.getElementById("app-content");
    const musica = document.getElementById("musica-fundo");

    if (input === SENHA_CORRETA) {
        // Se a senha estiver certa:
        loginScreen.style.display = "none"; // Esconde o login
        appContent.style.display = "block"; // Mostra o site
        
        // Tenta tocar a música
        if(musica) {
            musica.play().catch(error => console.log("O navegador bloqueou o autoplay, clique no botão para tocar."));
        }
        
        iniciarContador();
    } else {
        // Se a senha estiver errada:
        errorMsg.style.display = "block"; // MOSTRA a mensagem de erro agora
        // Efeito simples de tremer
        const box = document.querySelector('.login-box');
        box.style.transform = "translateX(5px)";
        setTimeout(() => { box.style.transform = "translateX(0)"; }, 100);
    }
}

function toggleMusic() {
    const musica = document.getElementById("musica-fundo");
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
}

// --- NAVEGAÇÃO ENTRE ABAS ---
function mudarAba(idAba) {
    // Esconde todas as abas
    document.querySelectorAll(".aba-conteudo").forEach(aba => {
        aba.classList.remove("ativa");
    });
    // Tira o destaque dos botões
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.classList.remove("ativo");
    });

    // Mostra a aba certa e destaca o botão
    document.getElementById(idAba).classList.add("ativa");
    
    // Procura o botão certo para destacar (correção da lógica anterior)
    const buttons = document.querySelectorAll(".nav-btn");
    if(idAba === 'aba-cartas') buttons[0].classList.add("ativo");
    if(idAba === 'aba-fotos') buttons[1].classList.add("ativo");
    if(idAba === 'aba-sobre') buttons[2].classList.add("ativo");
}

// --- CARTAS ---
const cartas = {
    'saudade': { titulo: "Sinto sua falta...", texto: "Amor, a saudade é grande, mas o amor é maior...\n\nMal posso esperar para te ver de novo!" },
    'triste': { titulo: "Ei, psiu...", texto: "Não fica assim. Lembre-se que eu estou aqui e você é a pessoa mais forte que eu conheço." },
    'brava': { titulo: "Me perdoa?", texto: "Eu sei que fui chato. Desculpa por qualquer coisa. Te amo muito!" },
    'feliz': { titulo: "Sua felicidade é a minha!", texto: "Ver você sorrindo ilumina meu dia. Aproveite muito esse momento!" }
};

function openLetter(tipo) {
    const title = document.getElementById("modal-title");
    const body = document.getElementById("modal-body");
    const modal = document.getElementById("letter-modal");

    title.innerText = cartas[tipo].titulo;
    body.innerText = cartas[tipo].texto;
    modal.style.display = "flex";
}

function closeLetter() {
    document.getElementById("letter-modal").style.display = "none";
}

// Fechar ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById("letter-modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// --- CONTADOR DE DIAS ---
function iniciarContador() {
    const agora = new Date();
    const diferenca = agora - DATA_INICIO_NAMORO;
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    
    const contadorElement = document.getElementById("contador");
    if(contadorElement) {
        contadorElement.innerText = dias + " dias de puro amor!";
    }
}
