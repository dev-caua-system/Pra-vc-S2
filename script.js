// --- CONFIGURAÇÕES ---
const SENHA_CORRETA = "22072020";
const DATA_INICIO_NAMORO = new Date("2020-07-22T00:00:00"); 

// --- CONTROLE DO YOUTUBE ---
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: '9bgyuqM4LcU', // ID da música (Aliança - Tribalistas)
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'loop': 1,
            'playlist': '9bgyuqM4LcU' // Necessário para o loop funcionar
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // O player está pronto, mas espera a senha para tocar
    player.setVolume(50); // Volume em 50%
}

function toggleMusic() {
    if (player && player.getPlayerState() == 1) { // 1 = Tocando
        player.pauseVideo();
    } else {
        player.playVideo();
    }
}

// --- LOGIN ---
function checkPassword() {
    const input = document.getElementById("password-input").value.trim();
    const errorMsg = document.getElementById("error-msg");

    if (input === SENHA_CORRETA) {
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("app-content").style.display = "block";
        
        // Toca a música do YouTube
        if (player) {
            player.playVideo();
        }
        
        iniciarContador();
    } else {
        errorMsg.style.display = "block";
        // Efeito de tremer
        const box = document.querySelector('.login-box');
        box.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(0)' }
        ], { duration: 300 });
    }
}

// --- NAVEGAÇÃO ENTRE ABAS ---
function mudarAba(idAba) {
    document.querySelectorAll(".aba-conteudo").forEach(aba => aba.classList.remove("ativa"));
    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("ativo"));

    document.getElementById(idAba).classList.add("ativa");

    if (idAba !== 'aba-cartas') {
        voltarParaLista();
    }

    const buttons = document.querySelectorAll(".nav-btn");
    if(idAba === 'aba-cartas') buttons[0].classList.add("ativo");
    if(idAba === 'aba-fotos') buttons[1].classList.add("ativo");
    if(idAba === 'aba-sobre') buttons[2].classList.add("ativo");
    if(idAba === 'aba-agenda') buttons[3].classList.add("ativo");
}

// --- CARTAS E LEITURA ---
const cartas = {
    'saudade': { 
        titulo: "Quando sentir saudade...", 
        texto: "Meu amor,\n\nA saudade é a prova de que tudo valeu a pena. Logo estaremos juntos novamente.\n\nTe amo!" 
    },
    'triste': { 
        titulo: "Quando estiver triste...", 
        texto: "Ei, não fica assim. Lembre-se do quanto você é forte e especial para mim.\n\nEstou aqui com você sempre." 
    },
    'brava': { 
        titulo: "Quando estiver brava...", 
        texto: "Desculpa se eu vacilei. Vamos conversar e resolver isso? Não gosto de ficar mal com você. ❤️" 
    },
    'feliz': { 
        titulo: "Quando estiver feliz...", 
        texto: "Sua felicidade é a minha! Aproveite cada segundo desse momento incrível." 
    }
};

function lerCarta(tipo) {
    document.getElementById("menu-cartas").style.display = "none";
    document.getElementById("area-leitura").style.display = "block";
    document.getElementById("titulo-leitura").innerText = cartas[tipo].titulo;
    document.getElementById("texto-leitura").innerText = cartas[tipo].texto;
}

function voltarParaLista() {
    document.getElementById("area-leitura").style.display = "none";
    document.getElementById("menu-cartas").style.display = "block";
}

// --- CRONÔMETRO ---
function iniciarContador() {
    setInterval(() => {
        const agora = new Date();
        const diferenca = agora - DATA_INICIO_NAMORO;
        
        const anos = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365.25));
        const dias = Math.floor((diferenca % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

        const h = horas < 10 ? '0'+horas : horas;
        const m = minutos < 10 ? '0'+minutos : minutos;
        const s = segundos < 10 ? '0'+segundos : segundos;

        const contador = document.getElementById("contador");
        if(contador) contador.innerText = `${anos} Anos, ${dias} Dias e\n${h}:${m}:${s}`;
    }, 1000);
}
