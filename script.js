// CONFIGURAÇÕES
const SENHA_CORRETA = "22072020";
const DATA_INICIO_NAMORO = new Date("2020-07-22T00:00:00"); 

// LOGIN
function checkPassword() {
    const input = document.getElementById("password-input").value.trim();
    const errorMsg = document.getElementById("error-msg");
    const musica = document.getElementById("musica-fundo");

    if (input === SENHA_CORRETA) {
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("app-content").style.display = "block";
        if(musica) musica.play().catch(e => console.log("Autoplay bloqueado"));
        iniciarContador();
    } else {
        errorMsg.style.display = "block";
    }
}

// NAVEGAÇÃO ENTRE ABAS
function mudarAba(idAba) {
    document.querySelectorAll(".aba-conteudo").forEach(aba => aba.classList.remove("ativa"));
    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("ativo"));

    document.getElementById(idAba).classList.add("ativa");

    // Destaca o botão certo (0=Cartas, 1=Fotos, 2=Sobre, 3=Agenda)
    const buttons = document.querySelectorAll(".nav-btn");
    if(idAba === 'aba-cartas') buttons[0].classList.add("ativo");
    if(idAba === 'aba-fotos') buttons[1].classList.add("ativo");
    if(idAba === 'aba-sobre') buttons[2].classList.add("ativo");
    if(idAba === 'aba-agenda') buttons[3].classList.add("ativo");
}

// CARTAS
const cartas = {
    'saudade': { titulo: "Sinto sua falta...", texto: "Amor, a saudade é grande...\nTe amo!" },
    'triste': { titulo: "Ei, psiu...", texto: "Não fica assim. Estou aqui com você." },
    'brava': { titulo: "Me perdoa?", texto: "Desculpa se fui chato. Vamos ficar bem? ❤️" },
    'feliz': { titulo: "Sua felicidade é tudo!", texto: "Aproveite muito esse momento!" }
};

function openLetter(tipo) {
    document.getElementById("modal-title").innerText = cartas[tipo].titulo;
    document.getElementById("modal-body").innerText = cartas[tipo].texto;
    document.getElementById("letter-modal").style.display = "flex";
}
function closeLetter() { document.getElementById("letter-modal").style.display = "none"; }
window.onclick = function(e) { if (e.target == document.getElementById("letter-modal")) closeLetter(); }

// CONTADOR CRONÔMETRO
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

        document.getElementById("contador").innerText = `${anos} Anos, ${dias} Dias e\n${h}:${m}:${s}`;
    }, 1000);
}

function toggleMusic() {
    const musica = document.getElementById("musica-fundo");
    musica.paused ? musica.play() : musica.pause();
}
