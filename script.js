const home = document.getElementById("home");
const field = document.getElementById("flowerField");
const videoSection = document.getElementById("videoSection");

const butterflies = document.getElementById("butterflies");
const particles = document.getElementById("particles");

const backHomeButton = document.getElementById("backHomeButton");

let journeyStarted = false;

/* =====================================================
   CRIAR GIRASSÓIS
===================================================== */

const flowers = [];

const flowerPositions = [
    ["flower-1", 4, -30, 170, 1],
    ["flower-2", 15, -45, 220, 1],
    ["flower-3", 27, -25, 155, 0.95],
    ["flower-4", 39, -55, 230, 1],
    ["flower-5", 51, -30, 175, 1],
    ["flower-6", 63, -48, 215, 1],
    ["flower-7", 76, -30, 165, 1],
    ["flower-8", 88, -55, 230, 1],

    ["flower-9", 9, 27, 100, 0.8],
    ["flower-10", 23, 30, 115, 0.8],
    ["flower-11", 35, 24, 95, 0.8],
    ["flower-12", 48, 29, 110, 0.8],
    ["flower-13", 60, 25, 100, 0.8],
    ["flower-14", 73, 30, 115, 0.8],
    ["flower-15", 86, 26, 100, 0.8]
];

function createFlower(data) {
    const [className, left, bottom, size, scale] = data;

    const button = document.createElement("button");

    button.type = "button";
    button.className = `sunflower ${className}`;

    button.style.setProperty("--left", `${left}%`);

    button.style.setProperty(
        "--bottom",
        bottom < 0 ? `${bottom}px` : `${bottom}%`
    );

    button.style.setProperty("--size", `${size}px`);
    button.style.setProperty("--scale", scale);

    button.setAttribute(
        "aria-label",
        "Clique neste girassol para continuar"
    );

    const stem = document.createElement("span");
    stem.className = "stem";

    const leafLeft = document.createElement("span");
    leafLeft.className = "leaf leaf-left";

    const leafRight = document.createElement("span");
    leafRight.className = "leaf leaf-right";

    const head = document.createElement("span");
    head.className = "flower-head";

    for (let i = 0; i < 12; i++) {
        const petal = document.createElement("span");
        petal.className = "petal";
        head.appendChild(petal);
    }

    const center = document.createElement("span");
    center.className = "flower-center";

    head.appendChild(center);

    button.appendChild(stem);
    button.appendChild(leafLeft);
    button.appendChild(leafRight);
    button.appendChild(head);

    field.appendChild(button);
    flowers.push(button);
}

flowerPositions.forEach(createFlower);

/* =====================================================
   CRIAR BORBOLETA
===================================================== */

function createButterfly(x, y, delay = 0) {
    const butterfly = document.createElement("span");

    butterfly.className = "butterfly";

    butterfly.innerHTML = `
        <span class="wing wing-left"></span>
        <span class="body"></span>
        <span class="wing wing-right"></span>
    `;

    butterfly.style.left = `${x}px`;
    butterfly.style.top = `${y}px`;

    const direction = Math.random() > 0.5 ? 1 : -1;

    const dx = direction * (180 + Math.random() * 520);
    const dy = -(350 + Math.random() * 500);

    butterfly.style.setProperty("--dx", `${dx}px`);
    butterfly.style.setProperty("--dy", `${dy}px`);

    butterfly.style.setProperty(
        "--duration",
        `${4.5 + Math.random() * 2.5}s`
    );

    butterfly.style.animationDelay = `${delay}s`;

    butterflies.appendChild(butterfly);

    setTimeout(() => {
        butterfly.remove();
    }, 8000);
}

/* =====================================================
   CRIAR PARTÍCULA
===================================================== */

function createParticle(x, y) {
    const particle = document.createElement("span");

    particle.className = "particle";

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    particle.style.setProperty(
        "--px",
        `${(Math.random() - 0.5) * 160}px`
    );

    particle.style.setProperty(
        "--py",
        `${-(50 + Math.random() * 180)}px`
    );

    particles.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 2200);
}

/* =====================================================
   BORBOLETAS SAINDO DO GIRASSOL
===================================================== */

function launchFromFlower(element) {
    const rect = element.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height * 0.25;

    for (let i = 0; i < 28; i++) {
        const x = centerX + (Math.random() - 0.5) * 90;
        const y = centerY + (Math.random() - 0.5) * 55;

        createButterfly(x, y, i * 0.045);
    }

    for (let i = 0; i < 45; i++) {
        setTimeout(() => {
            createParticle(
                centerX + (Math.random() - 0.5) * 100,
                centerY + (Math.random() - 0.5) * 80
            );
        }, i * 30);
    }
}

/* =====================================================
   BORBOLETAS AMBIENTAIS
===================================================== */

function createAmbientButterfly() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const x = Math.random() * width;

    const y =
        height *
        (0.55 + Math.random() * 0.35);

    createButterfly(x, y, 0);
}

/* =====================================================
   COMEÇAR JORNADA
===================================================== */

function startJourney(event) {
    if (journeyStarted) {
        return;
    }

    journeyStarted = true;

    flowers.forEach(flower => {
        flower.disabled = true;
    });

    launchFromFlower(event.currentTarget);

    for (let i = 0; i < 45; i++) {
        setTimeout(() => {
            createAmbientButterfly();
        }, i * 75);
    }

    for (let i = 0; i < 70; i++) {
        setTimeout(() => {
            createParticle(
                Math.random() * window.innerWidth,
                window.innerHeight *
                    (0.35 + Math.random() * 0.5)
            );
        }, i * 40);
    }

    setTimeout(() => {
        home.classList.add("leaving");
    }, 1400);

    setTimeout(() => {
        home.style.display = "none";

        videoSection.classList.add("visible");

        if (backHomeButton) {
            backHomeButton.classList.add("visible");
        }

        videoSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 2600);
}

/* =====================================================
   CLIQUE NOS GIRASSÓIS
===================================================== */

flowers.forEach(flower => {
    flower.addEventListener("click", startJourney);

    flower.addEventListener("keydown", event => {
        if (
            event.key === "Enter" ||
            event.key === " "
        ) {
            event.preventDefault();
            flower.click();
        }
    });
});

/* =====================================================
   BOTÃO VOLTAR AO INÍCIO
===================================================== */

if (backHomeButton) {
    backHomeButton.addEventListener("click", () => {
        journeyStarted = false;

        home.classList.remove("leaving");
        home.style.display = "block";

        videoSection.classList.remove("visible");

        if (backHomeButton) {
            backHomeButton.classList.remove("visible");
        }

        flowers.forEach(flower => {
            flower.disabled = false;
        });

        butterflies.innerHTML = "";
        particles.innerHTML = "";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* =====================================================
   ANIMAÇÃO DAS INFORMAÇÕES
===================================================== */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(element => {
        element.classList.add("show");
    });
}

/* =====================================================
   MENU DE ACESSIBILIDADE
===================================================== */

const accessibilityToggle =
    document.getElementById("accessibilityToggle");

const accessibilityPanel =
    document.getElementById("accessibilityPanel");

const accessibilityClose =
    document.getElementById("accessibilityClose");

const accessibilityStatus =
    document.getElementById("accessibilityStatus");

const increaseText =
    document.getElementById("increaseText");

const decreaseText =
    document.getElementById("decreaseText");

const contrastToggle =
    document.getElementById("contrastToggle");

const spacingToggle =
    document.getElementById("spacingToggle");

const animationToggle =
    document.getElementById("animationToggle");

const focusToggle =
    document.getElementById("focusToggle");

/* =====================================================
   STATUS
===================================================== */

function setAccessibilityStatus(message) {
    if (accessibilityStatus) {
        accessibilityStatus.textContent = message;
    }
}

/* =====================================================
   ABRIR ACESSIBILIDADE
===================================================== */

function openAccessibility() {
    if (!accessibilityPanel) return;

    accessibilityPanel.hidden = false;

    if (accessibilityToggle) {
        accessibilityToggle.setAttribute(
            "aria-expanded",
            "true"
        );
    }
}

/* =====================================================
   FECHAR ACESSIBILIDADE
===================================================== */

function closeAccessibility() {
    if (!accessibilityPanel) return;

    accessibilityPanel.hidden = true;

    if (accessibilityToggle) {
        accessibilityToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    }
}

if (accessibilityToggle) {
    accessibilityToggle.addEventListener("click", () => {
        if (accessibilityPanel.hidden) {
            openAccessibility();
        } else {
            closeAccessibility();
        }
    });
}

if (accessibilityClose) {
    accessibilityClose.addEventListener(
        "click",
        closeAccessibility
    );
}

/* =====================================================
   AUMENTAR / DIMINUIR TEXTO
===================================================== */

let textLevel = 0;

function updateTextSize() {
    document.documentElement.classList.remove(
        "text-small",
        "text-large",
        "text-extra-large"
    );

    if (textLevel === -1) {
        document.documentElement.classList.add(
            "text-small"
        );
    }

    if (textLevel === 1) {
        document.documentElement.classList.add(
            "text-large"
        );
    }

    if (textLevel >= 2) {
        document.documentElement.classList.add(
            "text-extra-large"
        );
    }
}

if (increaseText) {
    increaseText.addEventListener("click", () => {
        if (textLevel < 2) {
            textLevel++;
        }

        updateTextSize();

        const messages = [
            "Texto aumentado.",
            "Texto aumentado novamente.",
            "Tamanho máximo de texto ativado."
        ];

        setAccessibilityStatus(
            messages[Math.min(textLevel, 2)]
        );
    });
}

if (decreaseText) {
    decreaseText.addEventListener("click", () => {
        if (textLevel > -1) {
            textLevel--;
        }

        if (textLevel < -1) {
            textLevel = -1;
        }

        updateTextSize();

        setAccessibilityStatus(
            textLevel === -1
                ? "Texto reduzido."
                : "Tamanho do texto ajustado."
        );
    });
}

/* =====================================================
   ALTO CONTRASTE
===================================================== */

if (contrastToggle) {
    contrastToggle.addEventListener("click", () => {
        document.body.classList.toggle(
            "high-contrast"
        );

        const enabled =
            document.body.classList.contains(
                "high-contrast"
            );

        setAccessibilityStatus(
            enabled
                ? "Alto contraste ativado."
                : "Alto contraste desativado."
        );

        contrastToggle.setAttribute(
            "aria-pressed",
            enabled.toString()
        );
    });
}

/* =====================================================
   ESPAÇAMENTO
===================================================== */

if (spacingToggle) {
    spacingToggle.addEventListener("click", () => {
        document.body.classList.toggle(
            "extra-spacing"
        );

        const enabled =
            document.body.classList.contains(
                "extra-spacing"
            );

        setAccessibilityStatus(
            enabled
                ? "Espaçamento maior ativado."
                : "Espaçamento normal restaurado."
        );

        spacingToggle.setAttribute(
            "aria-pressed",
            enabled.toString()
        );
    });
}

/* =====================================================
   REDUZIR ANIMAÇÕES
===================================================== */

if (animationToggle) {
    animationToggle.addEventListener("click", () => {
        document.body.classList.toggle(
            "reduced-motion"
        );

        const enabled =
            document.body.classList.contains(
                "reduced-motion"
            );

        setAccessibilityStatus(
            enabled
                ? "Animações reduzidas."
                : "Animações normais restauradas."
        );

        animationToggle.setAttribute(
            "aria-pressed",
            enabled.toString()
        );
    });
}

/* =====================================================
   DESTACAR FOCO
===================================================== */

if (focusToggle) {
    focusToggle.addEventListener("click", () => {
        document.body.classList.toggle(
            "strong-focus"
        );

        const enabled =
            document.body.classList.contains(
                "strong-focus"
            );

        setAccessibilityStatus(
            enabled
                ? "Destaque de foco ativado."
                : "Destaque de foco desativado."
        );

        focusToggle.setAttribute(
            "aria-pressed",
            enabled.toString()
        );
    });
}

/* =====================================================
   ESC FECHA O MENU
===================================================== */

document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        accessibilityPanel &&
        !accessibilityPanel.hidden
    ) {
        closeAccessibility();

        if (accessibilityToggle) {
            accessibilityToggle.focus();
        }
    }
});

/* =====================================================
   CLICAR FORA FECHA O MENU
===================================================== */

document.addEventListener("click", event => {
    if (
        !accessibilityPanel ||
        accessibilityPanel.hidden
    ) {
        return;
    }

    const clickedInside =
        accessibilityPanel.contains(event.target);

    const clickedButton =
        accessibilityToggle &&
        accessibilityToggle.contains(event.target);

    if (!clickedInside && !clickedButton) {
        closeAccessibility();
    }
});
/* =====================================================
   SISTEMA DE TRADUÇÃO COMPLETA
===================================================== */

const translations = {
    pt: {
        accessibility: "Acessibilidade",
        accessibilityLabel: "Abrir menu de acessibilidade",
        resources: "RECURSOS",
        close: "Fechar menu de acessibilidade",
        increase: "Aumentar texto",
        decrease: "Diminuir texto",
        contrast: "Alto contraste",
        spacing: "Aumentar espaçamento",
        animations: "Reduzir animações",
        focus: "Destacar foco",
        language: "IDIOMA 🌎",
        languageSelect: "Selecionar idioma",
        status: "Recursos de acessibilidade disponíveis.",
        home: "Início",
        backHome: "Voltar para o início",

        label: "SETEMBRO AMARELO",
        homeTitle: "Você não está sozinho.",
        homeText: "Informação, acolhimento e esperança podem transformar vidas.",
        clickFlower: "Clique em um girassol",
        startJourney: "e comece sua jornada",
        careListen: "💛 Cuidar também é ouvir.",
        youMatter: "🎗️ Você importa.",

        videoLabel: "UMA PAUSA PARA REFLETIR",
        videoTitle: "A vida importa. 💛",
        videoText: "Reserve alguns minutos para assistir e refletir sobre a importância do cuidado, da escuta e do acolhimento.",

        infoLabel: "INFORME-SE 💛",
        infoTitle: "Conhecimento também é uma forma de cuidado.",
        infoIntro: "Entender a saúde mental ajuda a reconhecer mudanças, diminuir preconceitos e incentivar a busca por apoio.",

        depressionTitle: "O que é depressão?",
        depression1: "A depressão é uma condição de saúde mental que pode afetar o humor, os interesses, a energia, a concentração e também aspectos do dia a dia.",
        depression2: "Ela não é simplesmente \"falta de força de vontade\". Pode estar relacionada a diferentes fatores e merece atenção e cuidado profissional.",

        signsTitle: "Sinais que merecem atenção",
        signsIntro: "Algumas mudanças persistentes podem indicar que uma pessoa está passando por um momento difícil e precisa de acolhimento.",
        sign1: "Mudanças persistentes no humor",
        sign2: "Perda de interesse por atividades",
        sign3: "Cansaço ou falta de energia",
        sign4: "Alterações no sono",
        sign5: "Dificuldade de concentração",
        sign6: "Sentimento frequente de culpa ou desânimo",
        important: "Importante:",
        attention: "ter um desses sinais, sozinho, não significa que uma pessoa tenha depressão. O diagnóstico deve ser realizado por um profissional de saúde.",

        factorsTitle: "O que pode influenciar a saúde mental?",
        factorsIntro: "A saúde mental é influenciada por diferentes aspectos da vida. Esses fatores podem se combinar e variar de pessoa para pessoa.",
        biological: "Biológicos",
        biologicalText: "Características e processos do organismo.",
        psychological: "Psicológicos",
        psychologicalText: "Pensamentos, emoções e experiências.",
        social: "Sociais",
        socialText: "Relações, ambiente e condições de vida.",
        difficult: "Momentos difíceis",
        difficultText: "Situações que podem gerar sofrimento ou estresse.",

        pcdTitle: "Saúde mental e pessoas com deficiência",
        pcdText1: "Pessoas com deficiência têm direito ao cuidado integral em saúde. Para que esse cuidado realmente aconteça, é importante considerar acessibilidade, comunicação, respeito, autonomia e acolhimento.",
        pcdText2: "Barreiras físicas, de comunicação, informação e atitudes preconceituosas podem dificultar o acesso aos serviços. Por isso, inclusão também faz parte do cuidado.",
        accessibility: "♿ Acessibilidade",
        accessibilityText: "Ambientes e informações acessíveis.",
        respect: "🤝 Respeito",
        respectText: "Valorizar a autonomia e as escolhas.",
        welcoming: "💛 Acolhimento",
        welcomingText: "Ouvir sem julgamentos e com atenção.",

        helpTitle: "Como posso ajudar alguém?",
        listen: "Escute",
        listenText: "Dê espaço para a pessoa falar e demonstre que você está presente.",
        welcome: "Acolha",
        welcomeText: "Evite julgamentos e trate o sofrimento com seriedade e respeito.",
        encourage: "Incentive a busca por ajuda",
        encourageText: "Sugira conversar com um profissional de saúde ou procurar um serviço do SUS.",

        whereHelp: "ONDE PROCURAR AJUDA 🏥",
        helpMainTitle: "Você não precisa enfrentar tudo sozinho.",
        helpIntro: "O SUS oferece diferentes pontos de cuidado em saúde mental. A porta de entrada pode ser a Atenção Primária, como uma UBS, e o cuidado também pode envolver os CAPS e outros serviços da rede.",
        ubsText: "Unidade Básica de Saúde. Pode orientar, acolher e encaminhar para outros serviços quando necessário.",
        capsText: "Serviços públicos de atenção psicossocial com equipe multiprofissional e acompanhamento.",
        professionals: "Profissionais",
        professionalsText: "Psicólogos, médicos e outros profissionais podem avaliar a situação e orientar o cuidado adequado.",
        emergencyTitle: "Em uma situação que precise de atendimento imediato",
        emergencyText: "Procure um serviço de urgência e emergência, como uma UPA ou pronto-socorro, ou acione o SAMU pelo 192.",

        finalLabel: "SETEMBRO AMARELO",
        finalTitle: "Falar, ouvir e acolher também são formas de cuidar.",
        finalText: "Uma conversa respeitosa pode ser importante. Procurar ajuda também é uma forma de cuidado.",

        source1: "Conteúdo educativo elaborado com base em informações do Ministério da Saúde.",
        source2: "Projeto educativo — Setembro Amarelo"
    },

    en: {
        accessibility: "Accessibility",
        accessibilityLabel: "Open accessibility menu",
        resources: "RESOURCES",
        close: "Close accessibility menu",
        increase: "Increase text size",
        decrease: "Decrease text size",
        contrast: "High contrast",
        spacing: "Increase spacing",
        animations: "Reduce animations",
        focus: "Highlight focus",
        language: "LANGUAGE 🌎",
        languageSelect: "Select language",
        status: "Accessibility features available.",
        home: "Home",
        backHome: "Back to home",

        label: "YELLOW SEPTEMBER",
        homeTitle: "You are not alone.",
        homeText: "Information, support and hope can transform lives.",
        clickFlower: "Click on a sunflower",
        startJourney: "and begin your journey",
        careListen: "💛 Caring also means listening.",
        youMatter: "🎗️ You matter.",

        videoLabel: "A MOMENT TO REFLECT",
        videoTitle: "Life matters. 💛",
        videoText: "Take a few minutes to watch and reflect on the importance of care, listening and support.",

        infoLabel: "LEARN MORE 💛",
        infoTitle: "Knowledge is also a form of care.",
        infoIntro: "Understanding mental health helps recognize changes, reduce prejudice and encourage people to seek support.",

        depressionTitle: "What is depression?",
        depression1: "Depression is a mental health condition that can affect mood, interests, energy, concentration and aspects of everyday life.",
        depression2: "It is not simply a lack of willpower. It may be related to different factors and deserves professional attention and care.",

        signsTitle: "Warning signs that deserve attention",
        signsIntro: "Some persistent changes may indicate that a person is going through a difficult time and needs support.",
        sign1: "Persistent mood changes",
        sign2: "Loss of interest in activities",
        sign3: "Tiredness or lack of energy",
        sign4: "Changes in sleep",
        sign5: "Difficulty concentrating",
        sign6: "Frequent feelings of guilt or discouragement",
        important: "Important:",
        attention: "having one of these signs alone does not mean that a person has depression. Diagnosis must be made by a health professional.",

        factorsTitle: "What can influence mental health?",
        factorsIntro: "Mental health is influenced by different aspects of life. These factors can combine and vary from person to person.",
        biological: "Biological",
        biologicalText: "Characteristics and processes of the body.",
        psychological: "Psychological",
        psychologicalText: "Thoughts, emotions and experiences.",
        social: "Social",
        socialText: "Relationships, environment and living conditions.",
        difficult: "Difficult moments",
        difficultText: "Situations that may cause suffering or stress.",

        pcdTitle: "Mental health and people with disabilities",
        pcdText1: "People with disabilities have the right to comprehensive healthcare. For this care to happen, accessibility, communication, respect, autonomy and support are important.",
        pcdText2: "Physical, communication and information barriers, as well as prejudice, can make access to services difficult. Inclusion is therefore also part of care.",
        accessibility: "♿ Accessibility",
        accessibilityText: "Accessible environments and information.",
        respect: "🤝 Respect",
        respectText: "Value autonomy and personal choices.",
        welcoming: "💛 Support",
        welcomingText: "Listen without judgment and with attention.",

        helpTitle: "How can I help someone?",
        listen: "Listen",
        listenText: "Give the person space to speak and show that you are present.",
        welcome: "Support",
        welcomeText: "Avoid judgment and treat suffering seriously and respectfully.",
        encourage: "Encourage seeking help",
        encourageText: "Suggest talking to a health professional or looking for a public healthcare service.",

        whereHelp: "WHERE TO SEEK HELP 🏥",
        helpMainTitle: "You do not have to face everything alone.",
        helpIntro: "Public healthcare services offer different points of mental health care. The first step may be Primary Care, such as a basic health unit, and care may also involve specialized services.",
        ubsText: "Basic Health Unit. It can provide guidance, support and referrals when necessary.",
        capsText: "Public psychosocial care services with a multidisciplinary team and follow-up.",
        professionals: "Professionals",
        professionalsText: "Psychologists, doctors and other professionals can assess the situation and guide appropriate care.",
        emergencyTitle: "In a situation requiring immediate care",
        emergencyText: "Seek an emergency service, such as an emergency care unit or hospital, or call the emergency service available in your region.",

        finalLabel: "YELLOW SEPTEMBER",
        finalTitle: "Speaking, listening and supporting are also ways of caring.",
        finalText: "A respectful conversation can make a difference. Seeking help is also a form of care.",

        source1: "Educational content based on information from the Brazilian Ministry of Health.",
        source2: "Educational project — Yellow September"
    },

    es: {
        accessibility: "Accesibilidad",
        accessibilityLabel: "Abrir menú de accesibilidad",
        resources: "RECURSOS",
        close: "Cerrar menú de accesibilidad",
        increase: "Aumentar tamaño del texto",
        decrease: "Disminuir tamaño del texto",
        contrast: "Alto contraste",
        spacing: "Aumentar espaciado",
        animations: "Reducir animaciones",
        focus: "Resaltar enfoque",
        language: "IDIOMA 🌎",
        languageSelect: "Seleccionar idioma",
        status: "Recursos de accesibilidad disponibles.",
        home: "Inicio",
        backHome: "Volver al inicio",

        label: "SEPTIEMBRE AMARILLO",
        homeTitle: "No estás solo.",
        homeText: "La información, el apoyo y la esperanza pueden transformar vidas.",
        clickFlower: "Haz clic en un girasol",
        startJourney: "y comienza tu recorrido",
        careListen: "💛 Cuidar también es escuchar.",
        youMatter: "🎗️ Tú importas.",

        videoLabel: "UN MOMENTO PARA REFLEXIONAR",
        videoTitle: "La vida importa. 💛",
        videoText: "Tómate unos minutos para mirar y reflexionar sobre la importancia del cuidado, la escucha y el apoyo.",

        infoLabel: "INFÓRMATE 💛",
        infoTitle: "El conocimiento también es una forma de cuidado.",
        infoIntro: "Comprender la salud mental ayuda a reconocer cambios, reducir prejuicios y fomentar la búsqueda de apoyo.",

        depressionTitle: "¿Qué es la depresión?",
        depression1: "La depresión es una condición de salud mental que puede afectar el estado de ánimo, los intereses, la energía, la concentración y aspectos de la vida cotidiana.",
        depression2: "No es simplemente falta de voluntad. Puede estar relacionada con diferentes factores y merece atención y cuidado profesional.",

        signsTitle: "Señales que merecen atención",
        signsIntro: "Algunos cambios persistentes pueden indicar que una persona está pasando por un momento difícil y necesita apoyo.",
        sign1: "Cambios persistentes en el estado de ánimo",
        sign2: "Pérdida de interés en actividades",
        sign3: "Cansancio o falta de energía",
        sign4: "Cambios en el sueño",
        sign5: "Dificultad para concentrarse",
        sign6: "Sentimiento frecuente de culpa o desánimo",
        important: "Importante:",
        attention: "tener una de estas señales por sí sola no significa que una persona tenga depresión. El diagnóstico debe ser realizado por un profesional de la salud.",

        factorsTitle: "¿Qué puede influir en la salud mental?",
        factorsIntro: "La salud mental está influenciada por diferentes aspectos de la vida. Estos factores pueden combinarse y variar de una persona a otra.",
        biological: "Biológicos",
        biologicalText: "Características y procesos del organismo.",
        psychological: "Psicológicos",
        psychologicalText: "Pensamientos, emociones y experiencias.",
        social: "Sociales",
        socialText: "Relaciones, ambiente y condiciones de vida.",
        difficult: "Momentos difíciles",
        difficultText: "Situaciones que pueden generar sufrimiento o estrés.",

        pcdTitle: "Salud mental y personas con discapacidad",
        pcdText1: "Las personas con discapacidad tienen derecho a una atención integral en salud. Para que esto ocurra, es importante considerar la accesibilidad, la comunicación, el respeto, la autonomía y el apoyo.",
        pcdText2: "Las barreras físicas, de comunicación e información, así como los prejuicios, pueden dificultar el acceso a los servicios. Por eso, la inclusión también forma parte del cuidado.",
        accessibility: "♿ Accesibilidad",
        accessibilityText: "Ambientes e información accesibles.",
        respect: "🤝 Respeto",
        respectText: "Valorar la autonomía y las decisiones.",
        welcoming: "💛 Acogida",
        welcomingText: "Escuchar sin juzgar y con atención.",

        helpTitle: "¿Cómo puedo ayudar a alguien?",
        listen: "Escucha",
        listenText: "Dale espacio a la persona para hablar y demuestra que estás presente.",
        welcome: "Acoge",
        welcomeText: "Evita juzgar y trata el sufrimiento con seriedad y respeto.",
        encourage: "Anima a buscar ayuda",
        encourageText: "Sugiere hablar con un profesional de la salud o buscar un servicio público.",

        whereHelp: "DÓNDE BUSCAR AYUDA 🏥",
        helpMainTitle: "No tienes que enfrentar todo solo.",
        helpIntro: "El sistema público de salud ofrece diferentes puntos de atención en salud mental. La entrada puede ser la atención primaria y también pueden participar servicios especializados.",
        ubsText: "Unidad Básica de Salud. Puede orientar, acoger y derivar a otros servicios cuando sea necesario.",
        capsText: "Servicios públicos de atención psicosocial con equipos multidisciplinarios.",
        professionals: "Profesionales",
        professionalsText: "Psicólogos, médicos y otros profesionales pueden evaluar la situación y orientar el cuidado adecuado.",
        emergencyTitle: "En una situación que necesite atención inmediata",
        emergencyText: "Busca un servicio de urgencias o llama al servicio de emergencia de tu región.",

        finalLabel: "SEPTIEMBRE AMARILLO",
        finalTitle: "Hablar, escuchar y acoger también son formas de cuidar.",
        finalText: "Una conversación respetuosa puede ser importante. Buscar ayuda también es una forma de cuidado.",

        source1: "Contenido educativo elaborado con base en información del Ministerio de Salud de Brasil.",
        source2: "Proyecto educativo — Septiembre Amarillo"
    },

    fr: {
        accessibility: "Accessibilité",
        accessibilityLabel: "Ouvrir le menu d’accessibilité",
        resources: "RESSOURCES",
        close: "Fermer le menu d’accessibilité",
        increase: "Augmenter la taille du texte",
        decrease: "Diminuer la taille du texte",
        contrast: "Contraste élevé",
        spacing: "Augmenter l’espacement",
        animations: "Réduire les animations",
        focus: "Mettre le focus en évidence",
        language: "LANGUE 🌎",
        languageSelect: "Choisir la langue",
        status: "Fonctions d’accessibilité disponibles.",
        home: "Accueil",
        backHome: "Retour à l’accueil",

        label: "SEPTEMBRE JAUNE",
        homeTitle: "Vous n’êtes pas seul.",
        homeText: "L’information, le soutien et l’espoir peuvent transformer des vies.",
        clickFlower: "Cliquez sur un tournesol",
        startJourney: "et commencez votre parcours",
        careListen: "💛 Prendre soin, c’est aussi écouter.",
        youMatter: "🎗️ Vous comptez.",

        videoLabel: "UN MOMENT POUR RÉFLÉCHIR",
        videoTitle: "La vie compte. 💛",
        videoText: "Prenez quelques minutes pour regarder et réfléchir à l’importance du soin, de l’écoute et du soutien.",

        infoLabel: "INFORMEZ-VOUS 💛",
        infoTitle: "La connaissance est aussi une forme de soin.",
        infoIntro: "Comprendre la santé mentale aide à reconnaître les changements, réduire les préjugés et encourager la recherche de soutien.",

        depressionTitle: "Qu’est-ce que la dépression ?",
        depression1: "La dépression est un trouble de santé mentale qui peut affecter l’humeur, les intérêts, l’énergie, la concentration et certains aspects de la vie quotidienne.",
        depression2: "Ce n’est pas simplement un manque de volonté. Elle peut être liée à différents facteurs et mérite une attention et des soins professionnels.",

        signsTitle: "Signes qui méritent de l’attention",
        signsIntro: "Certains changements persistants peuvent indiquer qu’une personne traverse une période difficile et a besoin de soutien.",
        sign1: "Changements persistants de l’humeur",
        sign2: "Perte d’intérêt pour les activités",
        sign3: "Fatigue ou manque d’énergie",
        sign4: "Changements du sommeil",
        sign5: "Difficulté à se concentrer",
        sign6: "Sentiment fréquent de culpabilité ou de découragement",
        important: "Important :",
        attention: "avoir un seul de ces signes ne signifie pas nécessairement qu’une personne souffre de dépression. Le diagnostic doit être posé par un professionnel de santé.",

        factorsTitle: "Qu’est-ce qui peut influencer la santé mentale ?",
        factorsIntro: "La santé mentale est influencée par différents aspects de la vie. Ces facteurs peuvent se combiner et varier d’une personne à l’autre.",
        biological: "Biologiques",
        biologicalText: "Caractéristiques et processus de l’organisme.",
        psychological: "Psychologiques",
        psychologicalText: "Pensées, émotions et expériences.",
        social: "Sociaux",
        socialText: "Relations, environnement et conditions de vie.",
        difficult: "Moments difficiles",
        difficultText: "Situations pouvant provoquer de la souffrance ou du stress.",

        pcdTitle: "Santé mentale et personnes handicapées",
        pcdText1: "Les personnes handicapées ont droit à des soins de santé complets. Pour que ces soins soient réellement accessibles, il faut tenir compte de l’accessibilité, de la communication, du respect, de l’autonomie et de l’accueil.",
        pcdText2: "Les barrières physiques, de communication et d’information, ainsi que les préjugés, peuvent rendre l’accès aux services difficile. L’inclusion fait donc aussi partie du soin.",
        accessibility: "♿ Accessibilité",
        accessibilityText: "Environnements et informations accessibles.",
        respect: "🤝 Respect",
        respectText: "Valoriser l’autonomie et les choix.",
        welcoming: "💛 Accueil",
        welcomingText: "Écouter sans jugement et avec attention.",

        helpTitle: "Comment puis-je aider quelqu’un ?",
        listen: "Écouter",
        listenText: "Laissez à la personne l’espace pour parler et montrez que vous êtes présent.",
        welcome: "Accueillir",
        welcomeText: "Évitez les jugements et prenez la souffrance au sérieux avec respect.",
        encourage: "Encourager la recherche d’aide",
        encourageText: "Suggérez de parler à un professionnel de santé ou de chercher un service public.",

        whereHelp: "OÙ CHERCHER DE L’AIDE 🏥",
        helpMainTitle: "Vous n’avez pas à tout affronter seul.",
        helpIntro: "Le système public de santé propose différents points de prise en charge en santé mentale. Le premier contact peut être les soins primaires, ainsi que des services spécialisés.",
        ubsText: "Unité de santé de base. Elle peut orienter, accueillir et diriger vers d’autres services si nécessaire.",
        capsText: "Services publics de soins psychosociaux avec une équipe multidisciplinaire.",
        professionals: "Professionnels",
        professionalsText: "Les psychologues, médecins et autres professionnels peuvent évaluer la situation et orienter les soins appropriés.",
        emergencyTitle: "Dans une situation nécessitant une aide immédiate",
        emergencyText: "Cherchez un service d’urgence ou appelez le service d’urgence de votre région.",

        finalLabel: "SEPTEMBRE JAUNE",
        finalTitle: "Parler, écouter et accueillir sont aussi des façons de prendre soin.",
        finalText: "Une conversation respectueuse peut être importante. Demander de l’aide est aussi une forme de soin.",

        source1: "Contenu éducatif basé sur les informations du ministère brésilien de la Santé.",
        source2: "Projet éducatif — Septembre Jaune"
    }
};

let currentLanguage = "pt";

function setText(selector, text) {
    const element = document.querySelector(selector);

    if (element && text !== undefined) {
        element.textContent = text;
    }
}

function translateSite(language) {
    const t = translations[language];

    if (!t) return;

    currentLanguage = language;

    document.documentElement.lang =
        language === "pt" ? "pt-BR" :
        language === "en" ? "en" :
        language === "es" ? "es" : "fr";

    /* Menu de acessibilidade */
    setText("#accessibilityToggle span", t.accessibility);
    setText(".accessibility-small-title", t.resources);
    setText(".accessibility-header h2", t.accessibility);
    setText("#increaseText span:last-child", t.increase);
    setText("#decreaseText span:last-child", t.decrease);
    setText("#contrastToggle span:last-child", t.contrast);
    setText("#spacingToggle span:last-child", t.spacing);
    setText("#animationToggle span:last-child", t.animations);
    setText("#focusToggle span:last-child", t.focus);
    setText(".language-title", t.language);
    setText("#accessibilityStatus", t.status);

    /* Botão início */
    setText("#backHomeButton span", t.home);

    /* Tela inicial */
    setText(".welcome .label", t.label);
    setText("#home-title", t.homeTitle);
    setText(".welcome p", t.homeText);
    setText(".click-area strong", t.clickFlower);
    setText(".click-area span", t.startJourney);

    const bottomTexts = document.querySelectorAll(".bottom-bar span");
    if (bottomTexts[0]) bottomTexts[0].textContent = t.careListen;
    if (bottomTexts[1]) bottomTexts[1].textContent = t.youMatter;

    /* Vídeo */
    setText(".video-label", t.videoLabel);
    setText("#video-title", t.videoTitle);
    setText(".video-content > p", t.videoText);

    /* Introdução */
    setText(".info-intro .info-label", t.infoLabel);
    setText("#info-title", t.infoTitle);
    setText(".info-intro p", t.infoIntro);

    /* Depressão */
    const cards = document.querySelectorAll(".info-card");

    if (cards[0]) {
        setText("h3", t.depressionTitle);
        const paragraphs = cards[0].querySelectorAll("p");
        if (paragraphs[0]) paragraphs[0].textContent = t.depression1;
        if (paragraphs[1]) paragraphs[1].textContent = t.depression2;
    }

    /* Sinais */
    if (cards[1]) {
        setText("h3", t.signsTitle);
        const p = cards[1].querySelector("p");
        if (p) p.textContent = t.signsIntro;

        const signs = cards[1].querySelectorAll(".sign-item span:last-child");
        const signTexts = [
            t.sign1,
            t.sign2,
            t.sign3,
            t.sign4,
            t.sign5,
            t.sign6
        ];

        signs.forEach((item, index) => {
            if (signTexts[index]) item.textContent = signTexts[index];
        });

        const attention = cards[1].querySelector(".attention-box");
        if (attention) {
            attention.innerHTML = `<strong>${t.important}</strong> ${t.attention}`;
        }
    }

    /* Fatores */
    if (cards[2]) {
        setText("h3", t.factorsTitle);

        const p = cards[2].querySelector("p");
        if (p) p.textContent = t.factorsIntro;

        const factorTitles = [
            t.biological,
            t.psychological,
            t.social,
            t.difficult
        ];

        const factorDescriptions = [
            t.biologicalText,
            t.psychologicalText,
            t.socialText,
            t.difficultText
        ];

        const factors = cards[2].querySelectorAll(".factor");

        factors.forEach((factor, index) => {
            const title = factor.querySelector("h4");
            const description = factor.querySelector("p");

            if (title) title.textContent = factorTitles[index];
            if (description) description.textContent = factorDescriptions[index];
        });
    }

    /* PCD */
    const pcdCard = document.querySelector(".pcd-card");

    if (pcdCard) {
        setText(".pcd-content h3", t.pcdTitle);

        const paragraphs = pcdCard.querySelectorAll(".pcd-content > p");
        if (paragraphs[0]) paragraphs[0].textContent = t.pcdText1;
        if (paragraphs[1]) paragraphs[1].textContent = t.pcdText2;

        const points = pcdCard.querySelectorAll(".pcd-points > div");

        if (points[0]) {
            points[0].querySelector("strong").textContent = t.accessibility;
            points[0].querySelector("span").textContent = t.accessibilityText;
        }

        if (points[1]) {
            points[1].querySelector("strong").textContent = t.respect;
            points[1].querySelector("span").textContent = t.respectText;
        }

        if (points[2]) {
            points[2].querySelector("strong").textContent = t.welcoming;
            points[2].querySelector("span").textContent = t.welcomingText;
        }
    }

    /* Como ajudar */
    const helpCard = document.querySelector(".help-card");

    if (helpCard) {
        setText(".help-card h3", t.helpTitle);

        const helpItems = helpCard.querySelectorAll(".help-item");

        const helpTitles = [
            t.listen,
            t.welcome,
            t.encourage
        ];

        const helpDescriptions = [
            t.listenText,
            t.welcomeText,
            t.encourageText
        ];

        helpItems.forEach((item, index) => {
            const strong = item.querySelector("strong");
            const p = item.querySelector("p");

            if (strong) strong.textContent = helpTitles[index];
            if (p) p.textContent = helpDescriptions[index];
        });
    }

    /* Onde procurar ajuda */
    const location = document.querySelector(".help-location");

    if (location) {
        setText(".location-heading .info-label", t.whereHelp);
        setText("#help-title", t.helpMainTitle);
        setText(".location-heading p", t.helpIntro);

        const locationCards = location.querySelectorAll(".location-card");

        if (locationCards[0]) {
            locationCards[0].querySelector("p").textContent = t.ubsText;
        }

        if (locationCards[1]) {
            locationCards[1].querySelector("p").textContent = t.capsText;
        }

        if (locationCards[2]) {
            locationCards[2].querySelector("h3").textContent = t.professionals;
            locationCards[2].querySelector("p").textContent = t.professionalsText;
        }

        setText(".emergency-note strong", t.emergencyTitle);

        const emergencyParagraph = document.querySelector(".emergency-note p");
        if (emergencyParagraph) {
            emergencyParagraph.innerHTML = t.emergencyText;
        }
    }

    /* Mensagem final */
    setText(".final-message > span", t.finalLabel);
    setText(".final-message h2", t.finalTitle);
    setText(".final-message p", t.finalText);

    /* Fontes */
    const sources = document.querySelectorAll(".sources p");
    if (sources[0]) sources[0].textContent = t.source1;
    if (sources[1]) sources[1].textContent = t.source2;

    /* Botões de idioma */
    document.querySelectorAll(".language-button").forEach(button => {
        const isActive = button.dataset.language === language;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", isActive.toString());
    });

    localStorage.setItem("siteLanguage", language);
}

/* Clique nos idiomas */
document.querySelectorAll(".language-button").forEach(button => {
    button.addEventListener("click", () => {
        translateSite(button.dataset.language);
    });
});

/* Idioma salvo anteriormente */
const savedLanguage = localStorage.getItem("siteLanguage") || "pt";
translateSite(savedLanguage);