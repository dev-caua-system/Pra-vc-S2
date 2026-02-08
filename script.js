// --- CONFIGURAÇÕES ---
const SENHA_CORRETA = "12062024"; // Sua data
const DATA_INICIO_NAMORO = new Date("2024-06-12"); // Ano-Mês-Dia (Mude aqui!)

// --- LOGIN & MÚSICA ---
function checkPassword() {
    const input = document.getElementById("password-input").value;
    const loginScreen = document.getElementById("login-screen");
    const appContent = document.getElementById("app-content");
    const musica = document.getElementById("musica-fundo");

    if (input === SENHA_CORRETA) {
        loginScreen.style.display = "none";
        appContent.style.display = "block";
        
        // Tenta tocar a música (navegadores bloqueiam autoplay sem clique, por isso colocamos no botão de entrar)
        musica.play().catch(error => console.log("Autoplay bloqueado pelo navegador"));
        
        iniciarContador();
    } else {
        alert("Senha errada! Tente a data do nosso namoro.");
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
    
    // Lógica simples para destacar o botão (pode melhorar se quiser)
    event.currentTarget.classList.add("ativo");
}

// --- CARTAS ---
const cartas = {
    'saudade': { titulo: "Sinto sua falta...", texto: "Amor, a saudade é grande, mas o amor é maior..." },
    'triste': { titulo: "Ei, psiu...", texto: "Não fica assim. Lembre-se que eu estou aqui..." },
    'brava': { titulo: "Me perdoa?", texto: "Eu sei que fui chato. Desculpa por..." },
    'feliz': { titulo: "Sua felicidade é a minha!", texto: "Ver você sorrindo ilumina meu dia..." }
};

function openLetter(tipo) {
    document.getElementById("modal-title").innerText = cartas[tipo].titulo;
    document.getElementById("modal-body").innerText = cartas[tipo].texto;
    document.getElementById("letter-modal").style.display = "flex";
}

function closeLetter() {
    document.getElementById("letter-modal").style.display = "none";
}

// --- CONTADOR DE DIAS ---
function iniciarContador() {
    const agora = new Date();
    const diferenca = agora - DATA_INICIO_NAMORO;
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    document.getElementById("contador").innerText = dias + " dias de puro amor!";
}
