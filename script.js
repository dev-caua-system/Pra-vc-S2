// --- CONFIGURAÇÕES ---
const SENHA_CORRETA = "22072020"; // Sua data especial
const DATA_INICIO_NAMORO = new Date("2020-07-22"); // Ano-Mês-Dia (Formato Americano: AAAA-MM-DD)

// --- LOGIN & MÚSICA ---
function checkPassword() {
    // Pega o que foi digitado e remove espaços em branco antes ou depois (.trim())
    const input = document.getElementById("password-input").value.trim();
    
    // Elementos da tela
    const loginScreen = document.getElementById("login-screen");
    const appContent = document.getElementById("app-content");
    const errorMsg = document.getElementById("error-msg");
    const musica = document.getElementById("musica-fundo");

    // DEBUG: Se quiser ver no Console o que está acontecendo (F12)
    console.log("Senha digitada:", input);
    console.log("Senha correta:", SENHA_CORRETA);

    if (input === SENHA_CORRETA) {
        // --- SENHA CERTA ---
        loginScreen.style.display = "none"; // Esconde login
        appContent.style.display = "block"; // Mostra o site
        
        // Tenta tocar a música
        if(musica) {
            musica.volume = 0.5; // Volume em 50%
            musica.play().catch(error => {
                console.log("Autoplay bloqueado. O usuário precisa interagir.");
            });
        }
        
        iniciarContador(); // Inicia a contagem de dias
    } else {
        // --- SENHA ERRADA ---
        errorMsg.style.display = "block"; // Mostra mensagem de erro
        errorMsg.innerText = "Senha incorreta! Tente: " + SENHA_CORRETA; // (Opcional: mostra a dica se errar muito)
        
        // Efeito de tremer a tela
        const box = document.querySelector('.login-box');
        box.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(0)' }
        ], { duration: 300 });
    }
}

// --- FUNÇÃO PARA O BOTÃO DE MÚSICA ---
function toggleMusic() {
    const musica = document.getElementById("musica-fundo");
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
}

// --- NAVEGAÇÃO ENTRE ABAS ---
function mudarAba(idAba, event) {
    // Esconde todas as abas
    document.querySelectorAll(".aba-conteudo").forEach(aba => {
        aba.classList.remove("ativa");
    });
    // Tira o destaque de todos os botões
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.classList.remove("ativo");
    });

    // Mostra a aba certa
    document.getElementById(idAba).classList.add("ativa");
    
    // Destaca o botão clicado (se o evento for passado)
    if (event) {
        event.currentTarget.classList.add("ativo");
    }
}

// --- TEXTOS DAS CARTAS ---
const cartas = {
    'saudade': { 
        titulo: "Sinto sua falta...", 
        texto: "Amor, a saudade é grande, mas lembre-se que cada dia longe é um dia a menos para estarmos juntos de novo.\n\nTe amo demais!" 
    },
    'triste': { 
        titulo: "Ei, psiu...", 
        texto: "Não fica assim. Respire fundo. Você é forte, incrível e eu estou aqui com você para tudo." 
    },
    'brava': { 
        titulo: "Me perdoa?", 
        texto: "Eu sei que sou cabeça dura às vezes. Desculpa se te chateei. Vamos ficar bem? ❤️" 
    },
    'feliz': { 
        titulo: "Sua felicidade é tudo!", 
        texto: "Ver você feliz ilumina meu dia. Aproveite muito esse momento, você merece o mundo!" 
    }
};

// --- ABRIR E FECHAR CARTAS ---
function openLetter(tipo) {
    const modal = document.getElementById("letter-modal");
    const title = document.getElementById("modal-title");
    const body = document.getElementById("modal-body");

    title.innerText = cartas[tipo].titulo;
    body.innerText = cartas[tipo].texto;
    modal.style.display = "flex";
}

function closeLetter() {
    document.getElementById("letter-modal").style.display = "none";
}

// Fechar ao clicar fora do papel
window.onclick = function(event) {
    const modal = document.getElementById("letter-modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// --- CONTADOR DE DIAS ---
function iniciarContador() {
    const agora = new Date();
    const diferenca = agora - DATA_INICIO_NAMORO; // Diferença em milissegundos
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24)); // Converte para dias
    
    const contadorElement = document.getElementById("contador");
    if(contadorElement) {
        contadorElement.innerText = dias + " dias de puro amor!";
    }
}

// --- CONTADOR DE DIAS (TIPO CRONÔMETRO) ---
function iniciarContador() {
    // Data exata do início do namoro (22/07/2020)
    const dataInicio = new Date("2020-07-22T00:00:00"); 

    // Atualiza o contador a cada 1 segundo
    setInterval(() => {
        const agora = new Date();
        const diferenca = agora - dataInicio; // Diferença em milissegundos

        // Cálculos matemáticos para extrair o tempo
        const anos = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365.25));
        const dias = Math.floor((diferenca % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

        // Deixa os números bonitos com zero na frente (ex: 05 segundos)
        const h = horas < 10 ? '0' + horas : horas;
        const m = minutos < 10 ? '0' + minutos : minutos;
        const s = segundos < 10 ? '0' + segundos : segundos;

        // Monta o texto final
        const texto = `${anos} Anos, ${dias} Dias e\n${h}:${m}:${s}`;
        
        // Escreve na tela
        const contadorElement = document.getElementById("contador");
        if (contadorElement) {
            contadorElement.innerText = texto;
        }
    }, 1000); // 1000 milissegundos = 1 segundo
}

