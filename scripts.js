const textToType = "O objetivo deste desafio é aplicar conhecimentos de HTML, CSS e JavaScript, além de praticar o fluxo com Git. A trabalhar num layout interativo, moderno e com a proteção absoluta do Corinthians.";
const typeTarget = document.getElementById('typewriter-text');
let typeIndex = 0;

function typeWriter() {
    if (typeIndex < textToType.length) {
        typeTarget.innerHTML += textToType.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 40);
    }
}

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    themeToggle.innerText = body.classList.contains('light-mode') ? '⚫' : '⚪';
});

const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = progress + '%';

    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show-scroll');
    } else {
        backToTopBtn.classList.remove('show-scroll');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const hamburgerBtn = document.getElementById('hamburger-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const sidebarLinks = document.querySelectorAll('.sidebar-nav a');

function toggleMenu() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

hamburgerBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);
sidebarLinks.forEach(link => link.addEventListener('click', toggleMenu));

const botaoAlerta = document.getElementById('btn-alerta');
const apitoSound = document.getElementById('apito-sound');

botaoAlerta.addEventListener('click', function() {
    var duration = 3000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#ffffff', '#000000', '#aaaaaa'] });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ffffff', '#000000', '#aaaaaa'] });
        if (Date.now() < end) { requestAnimationFrame(frame); }
    }());

    apitoSound.play();
    
    setTimeout(() => {
         alert("APITO FINAL! 🚨\n\nDesafio concluído com excelência.\nForam 3 penáltis defendidos pelo Neneca e 10 pontos garantidos na atividade!\n\nVAI CORINTHIANS! 🦅⚽");
    }, 800);
});

const draggables = document.querySelectorAll('.draggable');
const pitch = document.getElementById('pitch');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
        setTimeout(() => { draggable.style.opacity = '0.5'; }, 0);
    });
    draggable.addEventListener('dragend', () => { draggable.style.opacity = '1'; });
});

pitch.addEventListener('dragover', (e) => { e.preventDefault(); });
pitch.addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    const rect = pitch.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    draggableElement.style.left = `${x}px`;
    draggableElement.style.top = `${y}px`;
    draggableElement.style.bottom = 'auto'; 
    draggableElement.style.transform = 'translate(-50%, -50%)';
});

const quizData = [
    { question: "Em que ano o Sport Club Corinthians Paulista foi fundado?", options: ["1908", "1910", "1912", "1914"], correct: 1 },
    { question: "Quem é o maior artilheiro da história do Corinthians?", options: ["Ronaldo Fenômeno", "Marcelinho Carioca", "Sócrates", "Cláudio"], correct: 3 },
    { question: "Em que ano o Corinthians conquistou o seu primeiro Mundial de Clubes da FIFA?", options: ["1998", "2000", "2012", "2015"], correct: 1 }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question-text');
const optionsEl = document.getElementById('options-container');
const resultEl = document.getElementById('quiz-result');
const scoreText = document.getElementById('score-text');
const btnRestart = document.getElementById('btn-restart-quiz');

function loadQuiz() {
    optionsEl.innerHTML = '';
    const currentQuizData = quizData[currentQuestion];
    questionEl.innerText = currentQuizData.question;

    currentQuizData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('quiz-btn');
        button.addEventListener('click', () => selectAnswer(index, button));
        optionsEl.appendChild(button);
    });
}

function selectAnswer(selectedIndex, buttonEl) {
    const correctIndex = quizData[currentQuestion].correct;
    const allButtons = optionsEl.querySelectorAll('.quiz-btn');
    
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === correctIndex) {
        buttonEl.classList.add('correct');
        score++;
    } else {
        buttonEl.classList.add('wrong');
        allButtons[correctIndex].classList.add('correct'); 
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuiz();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    questionEl.innerText = "Fim de Jogo!";
    optionsEl.innerHTML = '';
    resultEl.style.display = 'block';
    scoreText.innerText = `Você acertou ${score} de ${quizData.length} perguntas!`;
}

btnRestart.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    resultEl.style.display = 'none';
    loadQuiz();
});

loadQuiz();

const btnComentar = document.getElementById('btn-comentar');
const inputNome = document.getElementById('nome-torcedor');
const inputTexto = document.getElementById('texto-comentario');
const listaComentarios = document.getElementById('lista-comentarios');

btnComentar.addEventListener('click', function() {
    const nome = inputNome.value.trim();
    const texto = inputTexto.value.trim();

    if (nome === "" || texto === "") {
        alert("Preencha o nome e o comentário!");
        return;
    }

    const novoComentario = document.createElement('div');
    novoComentario.classList.add('comment-item', 'tilt-effect');

    const autor = document.createElement('div');
    autor.classList.add('comment-author');
    autor.innerText = nome;

    const mensagem = document.createElement('div');
    mensagem.classList.add('comment-text');
    mensagem.innerText = texto;

    novoComentario.appendChild(autor);
    novoComentario.appendChild(mensagem);
    listaComentarios.prepend(novoComentario);

    inputNome.value = '';
    inputTexto.value = '';
});

const revealElements = document.querySelectorAll('.scroll-reveal');
const counters = document.querySelectorAll('.counter');
const fundFill = document.querySelector('.fund-fill');
let hasCounted = false;

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            if (entry.target.id === 'estatisticas' && !hasCounted) {
                runCounters();
                hasCounted = true;
            }
            if (entry.target.id === 'vaquinha') {
                fundFill.style.width = fundFill.getAttribute('data-width');
            }
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

revealElements.forEach(el => scrollObserver.observe(el));

function runCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });
}

// LÓGICA DO MODAL DA VAQUINHA
const btnAbrirDoacao = document.getElementById('btn-abrir-doacao');
const modalVaquinha = document.getElementById('modal-vaquinha');
const closeModalBtn = document.getElementById('close-modal');
const btnCopy = document.getElementById('btn-copy');
const pixKeyInput = document.getElementById('pix-key');

function toggleModalVaquinha() { modalVaquinha.classList.toggle('active'); }

btnAbrirDoacao.addEventListener('click', toggleModalVaquinha);
closeModalBtn.addEventListener('click', toggleModalVaquinha);
modalVaquinha.addEventListener('click', (e) => { if (e.target === modalVaquinha) toggleModalVaquinha(); });

btnCopy.addEventListener('click', () => {
    pixKeyInput.select();
    pixKeyInput.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(pixKeyInput.value);
    
    const originalText = btnCopy.innerText;
    btnCopy.innerText = "Copiado!";
    btnCopy.style.background = "#06aa48";
    btnCopy.style.color = "#fff";
    
    setTimeout(() => {
        btnCopy.innerText = originalText;
        btnCopy.style.background = "var(--corinthians-white)";
        btnCopy.style.color = "var(--corinthians-black)";
    }, 2000);
});

// ==========================================
// LÓGICA DO MODAL DE SEGURANÇA
// ==========================================
const linkSidebarSecurity = document.getElementById('link-sidebar-security');
const modalSecurity = document.getElementById('modal-security');
const closeSecurityBtn = document.getElementById('close-security');

function toggleModalSecurity(e) { 
    if(e) e.preventDefault(); 
    modalSecurity.classList.toggle('active'); 
}

// Abre o modal ao clicar no link dentro do menu lateral (3 barrinhas)
if(linkSidebarSecurity) {
    linkSidebarSecurity.addEventListener('click', (e) => {
        toggleMenu(); // Fecha o menu lateral
        toggleModalSecurity(e); // Abre o Modal
    });
}

closeSecurityBtn.addEventListener('click', toggleModalSecurity);
modalSecurity.addEventListener('click', (e) => { if (e.target === modalSecurity) toggleModalSecurity(); });

// EFEITO 3D
const tiltElements = document.querySelectorAll('.tilt-effect');
tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
});

const cursorGlow = document.getElementById('cursor-glow');
window.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 1024) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    }
});

// EASTER EGG SECRETO
const secretCode = 'timao';
let pressedKeys = [];
const modalSecret = document.getElementById('modal-secret');
const closeSecretRealBtn = document.getElementById('close-secret');
const floatingSeal = document.getElementById('floatingSeal');

window.addEventListener('keyup', (e) => {
    pressedKeys.push(e.key);
    pressedKeys.splice(-secretCode.length - 1, pressedKeys.length - secretCode.length);
    if (pressedKeys.join('').toLowerCase().includes(secretCode)) {
        modalSecret.classList.add('active');
        floatingSeal.classList.add('spin-fast');
        pressedKeys = [];
    }
});

closeSecretRealBtn.addEventListener('click', () => {
    modalSecret.classList.remove('active');
    floatingSeal.classList.remove('spin-fast');
});

window.addEventListener('load', () => {
    document.getElementById('hero').classList.add('visible');
    setTimeout(typeWriter, 500);
});