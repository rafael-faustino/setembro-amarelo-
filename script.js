const home = document.getElementById("home");
const field = document.getElementById("flowerField");
const videoSection = document.getElementById("videoSection");

const butterflies = document.getElementById("butterflies");
const particles = document.getElementById("particles");

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

    button.className =
        `sunflower ${className}`;

    button.style.setProperty(
        "--left",
        `${left}%`
    );

    button.style.setProperty(
        "--bottom",
        bottom < 0
            ? `${bottom}px`
            : `${bottom}%`
    );

    button.style.setProperty(
        "--size",
        `${size}px`
    );

    button.style.setProperty(
        "--scale",
        scale
    );

    button.setAttribute(
        "aria-label",
        "Clique neste girassol para continuar"
    );


    const stem =
        document.createElement("span");

    stem.className =
        "stem";


    const leafLeft =
        document.createElement("span");

    leafLeft.className =
        "leaf leaf-left";


    const leafRight =
        document.createElement("span");

    leafRight.className =
        "leaf leaf-right";


    const head =
        document.createElement("span");

    head.className =
        "flower-head";


    for (let i = 0; i < 12; i++) {

        const petal =
            document.createElement("span");

        petal.className =
            "petal";

        head.appendChild(petal);
    }


    const center =
        document.createElement("span");

    center.className =
        "flower-center";

    head.appendChild(center);


    button.appendChild(stem);

    button.appendChild(leafLeft);

    button.appendChild(leafRight);

    button.appendChild(head);


    field.appendChild(button);

    flowers.push(button);
}


flowerPositions.forEach(
    createFlower
);


/* =====================================================
   CRIAR BORBOLETA
===================================================== */

function createButterfly(
    x,
    y,
    delay = 0
) {

    const butterfly =
        document.createElement("span");

    butterfly.className =
        "butterfly";


    butterfly.innerHTML = `
        <span class="wing wing-left"></span>
        <span class="body"></span>
        <span class="wing wing-right"></span>
    `;


    butterfly.style.left =
        `${x}px`;

    butterfly.style.top =
        `${y}px`;


    const direction =
        Math.random() > 0.5
            ? 1
            : -1;


    const dx =
        direction *
        (180 + Math.random() * 520);


    const dy =
        -(350 + Math.random() * 500);


    butterfly.style.setProperty(
        "--dx",
        `${dx}px`
    );

    butterfly.style.setProperty(
        "--dy",
        `${dy}px`
    );


    butterfly.style.setProperty(
        "--duration",
        `${4.5 + Math.random() * 2.5}s`
    );


    butterfly.style.animationDelay =
        `${delay}s`;


    butterflies.appendChild(
        butterfly
    );


    setTimeout(() => {

        butterfly.remove();

    }, 8000);
}


/* =====================================================
   CRIAR PARTÍCULA
===================================================== */

function createParticle(
    x,
    y
) {

    const particle =
        document.createElement("span");

    particle.className =
        "particle";


    particle.style.left =
        `${x}px`;

    particle.style.top =
        `${y}px`;


    particle.style.setProperty(
        "--px",
        `${(Math.random() - 0.5) * 160}px`
    );


    particle.style.setProperty(
        "--py",
        `${-(50 + Math.random() * 180)}px`
    );


    particles.appendChild(
        particle
    );


    setTimeout(() => {

        particle.remove();

    }, 2200);
}


/* =====================================================
   BORBOLETAS SAINDO DO GIRASSOL
===================================================== */

function launchFromFlower(
    element
) {

    const rect =
        element.getBoundingClientRect();


    const centerX =
        rect.left +
        rect.width / 2;


    const centerY =
        rect.top +
        rect.height * 0.25;


    for (
        let i = 0;
        i < 28;
        i++
    ) {

        const x =
            centerX +
            (Math.random() - 0.5) *
            90;


        const y =
            centerY +
            (Math.random() - 0.5) *
            55;


        createButterfly(
            x,
            y,
            i * 0.045
        );
    }


    for (
        let i = 0;
        i < 45;
        i++
    ) {

        setTimeout(() => {

            createParticle(

                centerX +
                (Math.random() - 0.5) *
                100,

                centerY +
                (Math.random() - 0.5) *
                80

            );

        }, i * 30);
    }
}


/* =====================================================
   BORBOLETAS AMBIENTAIS
===================================================== */

function createAmbientButterfly() {

    const width =
        window.innerWidth;


    const height =
        window.innerHeight;


    const x =
        Math.random() *
        width;


    const y =
        height *
        (
            0.55 +
            Math.random() * 0.35
        );


    createButterfly(
        x,
        y,
        0
    );
}


/* =====================================================
   COMEÇAR JORNADA
===================================================== */

function startJourney(event) {

    if (journeyStarted) {
        return;
    }


    journeyStarted = true;


    flowers.forEach(
        flower => {

            flower.disabled =
                true;

        }
    );


    launchFromFlower(
        event.currentTarget
    );


    for (
        let i = 0;
        i < 45;
        i++
    ) {

        setTimeout(() => {

            createAmbientButterfly();

        }, i * 75);
    }


    for (
        let i = 0;
        i < 70;
        i++
    ) {

        setTimeout(() => {

            createParticle(

                Math.random() *
                window.innerWidth,

                window.innerHeight *
                (
                    0.35 +
                    Math.random() * 0.5
                )

            );

        }, i * 40);
    }


    setTimeout(() => {

        home.classList.add(
            "leaving"
        );

    }, 1400);


    setTimeout(() => {

        home.style.display =
            "none";


        videoSection.classList.add(
            "visible"
        );


        videoSection.scrollIntoView({

            behavior:
                "smooth",

            block:
                "start"

        });


    }, 2600);
}


/* =====================================================
   CLIQUE NOS GIRASSÓIS
===================================================== */

flowers.forEach(
    flower => {

        flower.addEventListener(
            "click",
            startJourney
        );


        flower.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    flower.click();
                }

            }
        );

    }
);


/* =====================================================
   ANIMAÇÃO DAS INFORMAÇÕES
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    "IntersectionObserver"
    in window
) {

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold:
                    0.12
            }

        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );


} else {

    revealElements.forEach(
        element => {

            element.classList.add(
                "show"
            );

        }
    );
}


/* =====================================================
   MENU DE ACESSIBILIDADE
===================================================== */

const accessibilityToggle =
    document.getElementById(
        "accessibilityToggle"
    );

const accessibilityPanel =
    document.getElementById(
        "accessibilityPanel"
    );

const accessibilityClose =
    document.getElementById(
        "accessibilityClose"
    );

const accessibilityStatus =
    document.getElementById(
        "accessibilityStatus"
    );

const increaseText =
    document.getElementById(
        "increaseText"
    );

const decreaseText =
    document.getElementById(
        "decreaseText"
    );

const contrastToggle =
    document.getElementById(
        "contrastToggle"
    );

const spacingToggle =
    document.getElementById(
        "spacingToggle"
    );

const animationToggle =
    document.getElementById(
        "animationToggle"
    );

const focusToggle =
    document.getElementById(
        "focusToggle"
    );

const vlibrasButton =
    document.getElementById(
        "vlibrasButton"
    );


/* =====================================================
   VOLTAR AO INÍCIO
===================================================== */

const backHomeButton =
    document.getElementById(
        "backHomeButton"
    );


function showBackHomeButton() {

    if (!backHomeButton) {
        return;
    }

    backHomeButton.classList.add(
        "visible"
    );
}


function hideBackHomeButton() {

    if (!backHomeButton) {
        return;
    }

    backHomeButton.classList.remove(
        "visible"
    );
}


if (backHomeButton) {

    backHomeButton.addEventListener(
        "click",
        () => {

            home.style.display =
                "block";

            home.classList.remove(
                "leaving"
            );

            videoSection.classList.add(
                "visible"
            );

            journeyStarted =
                false;


            flowers.forEach(
                flower => {

                    flower.disabled =
                        false;

                }
            );


            butterflies.innerHTML =
                "";

            particles.innerHTML =
                "";


            window.scrollTo({

                top: 0,

                behavior:
                    "smooth"

            });


            hideBackHomeButton();

        }
    );

}


/*
    Verifica quando a primeira tela
    já desapareceu e mostra o botão.
*/

setInterval(() => {

    if (
        backHomeButton &&
        journeyStarted &&
        home.style.display === "none"
    ) {

        showBackHomeButton();

    }

}, 300);


/* =====================================================
   STATUS
===================================================== */

function setAccessibilityStatus(
    message
) {

    if (
        accessibilityStatus
    ) {

        accessibilityStatus.textContent =
            message;

    }

}


/* =====================================================
   ABRIR MENU
===================================================== */

function openAccessibility() {

    accessibilityPanel.hidden =
        false;

    accessibilityToggle.setAttribute(
        "aria-expanded",
        "true"
    );

}


/* =====================================================
   FECHAR MENU
===================================================== */

function closeAccessibility() {

    accessibilityPanel.hidden =
        true;

    accessibilityToggle.setAttribute(
        "aria-expanded",
        "false"
    );

}


accessibilityToggle.addEventListener(
    "click",
    () => {

        if (
            accessibilityPanel.hidden
        ) {

            openAccessibility();

        } else {

            closeAccessibility();

        }

    }
);


accessibilityClose.addEventListener(
    "click",
    closeAccessibility
);


/* =====================================================
   TAMANHO DO TEXTO
===================================================== */

let textLevel = 0;


function updateTextSize() {

    document.documentElement.classList.remove(
        "text-small",
        "text-large",
        "text-extra-large"
    );


    if (
        textLevel === -1
    ) {

        document.documentElement.classList.add(
            "text-small"
        );

    }


    if (
        textLevel === 1
    ) {

        document.documentElement.classList.add(
            "text-large"
        );

    }


    if (
        textLevel >= 2
    ) {

        document.documentElement.classList.add(
            "text-extra-large"
        );

    }

}


increaseText.addEventListener(
    "click",
    () => {

        if (
            textLevel < 2
        ) {

            textLevel++;

        }

        updateTextSize();


        if (
            textLevel === 1
        ) {

            setAccessibilityStatus(
                "Texto aumentado."
            );

        } else if (
            textLevel === 2
        ) {

            setAccessibilityStatus(
                "Tamanho máximo de texto ativado."
            );

        } else {

            setAccessibilityStatus(
                "Texto aumentado novamente."
            );

        }

    }
);


decreaseText.addEventListener(
    "click",
    () => {

        if (
            textLevel > -1
        ) {

            textLevel--;

        }


        if (
            textLevel < -1
        ) {

            textLevel = -1;

        }


        updateTextSize();


        setAccessibilityStatus(

            textLevel === -1

                ? "Texto reduzido."

                : "Tamanho do texto ajustado."

        );

    }
);


/* =====================================================
   ALTO CONTRASTE
===================================================== */

contrastToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "high-contrast"
        );


        const enabled =
            document.body.classList.contains(
                "high-contrast"
            );


        contrastToggle.setAttribute(
            "aria-pressed",
            String(enabled)
        );


        setAccessibilityStatus(

            enabled

                ? "Alto contraste ativado."

                : "Alto contraste desativado."

        );

    }
);


/* =====================================================
   ESPAÇAMENTO
===================================================== */

spacingToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "extra-spacing"
        );


        const enabled =
            document.body.classList.contains(
                "extra-spacing"
            );


        spacingToggle.setAttribute(
            "aria-pressed",
            String(enabled)
        );


        setAccessibilityStatus(

            enabled

                ? "Espaçamento maior ativado."

                : "Espaçamento normal restaurado."

        );

    }
);


/* =====================================================
   REDUZIR ANIMAÇÕES
===================================================== */

animationToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "reduced-motion"
        );


        const enabled =
            document.body.classList.contains(
                "reduced-motion"
            );


        animationToggle.setAttribute(
            "aria-pressed",
            String(enabled)
        );


        setAccessibilityStatus(

            enabled

                ? "Animações reduzidas."

                : "Animações normais restauradas."

        );

    }
);


/* =====================================================
   DESTACAR FOCO
===================================================== */

focusToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "strong-focus"
        );


        const enabled =
            document.body.classList.contains(
                "strong-focus"
            );


        focusToggle.setAttribute(
            "aria-pressed",
            String(enabled)
        );


        setAccessibilityStatus(

            enabled

                ? "Destaque de foco ativado."

                : "Destaque de foco desativado."

        );

    }
);


/* =====================================================
   LIBRAS
===================================================== */

vlibrasButton.addEventListener(
    "click",
    () => {

        const vlibrasAccessButton =
            document.querySelector(
                "[vw-access-button]"
            );


        if (
            vlibrasAccessButton
        ) {

            vlibrasAccessButton.click();


            setAccessibilityStatus(
                "VLibras ativado."
            );

        } else {

            setAccessibilityStatus(
                "A ferramenta Libras ainda está carregando. Tente novamente em alguns segundos."
            );

        }

    }
);


/* =====================================================
   TRADUÇÕES COMPLETAS
===================================================== */

const translations = {

    pt: {

        lang: "pt-BR",

        accessibility: "Acessibilidade",
        resources: "RECURSOS",
        increase: "Aumentar texto",
        decrease: "Diminuir texto",
        contrast: "Alto contraste",
        spacing: "Aumentar espaçamento",
        animations: "Reduzir animações",
        focus: "Destacar foco",
        libras: "Ativar Libras",
        status: "Recursos de acessibilidade disponíveis.",
        language: "IDIOMA 🌎",

        homeLabel: "SETEMBRO AMARELO",
        homeTitle: "Você não está sozinho.",
        homeText: "Informação, acolhimento e esperança podem transformar vidas.",
        clickFlower: "Clique em um girassol",
        startJourney: "e comece sua jornada",
        care: "💛 Cuidar também é ouvir.",
        matter: "🎗️ Você importa.",

        videoLabel: "UMA PAUSA PARA REFLETIR",
        videoTitle: "A vida importa. 💛",
        videoText: "Reserve alguns minutos para assistir e refletir sobre a importância do cuidado, da escuta e do acolhimento.",

        infoLabel: "INFORME-SE 💛",
        infoTitle: "Conhecimento também é uma forma de cuidado.",
        infoText: "Entender a saúde mental ajuda a reconhecer mudanças, diminuir preconceitos e incentivar a busca por apoio.",

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
        attention: "Ter um desses sinais, sozinho, não significa que uma pessoa tenha depressão. O diagnóstico deve ser realizado por um profissional de saúde.",

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
        pcd1: "Pessoas com deficiência têm direito ao cuidado integral em saúde. Para que esse cuidado realmente aconteça, é importante considerar acessibilidade, comunicação, respeito, autonomia e acolhimento.",
        pcd2: "Barreiras físicas, de comunicação, informação e atitudes preconceituosas podem dificultar o acesso aos serviços. Por isso, inclusão também faz parte do cuidado.",

        accessibilityPoint: "♿ Acessibilidade",
        accessibilityPointText: "Ambientes e informações acessíveis.",

        respectPoint: "🤝 Respeito",
        respectPointText: "Valorizar a autonomia e as escolhas.",

        welcomePoint: "💛 Acolhimento",
        welcomePointText: "Ouvir sem julgamentos e com atenção.",

        helpTitle: "Como posso ajudar alguém?",

        listen: "Escute",
        listenText: "Dê espaço para a pessoa falar e demonstre que você está presente.",

        welcome: "Acolha",
        welcomeText: "Evite julgamentos e trate o sofrimento com seriedade e respeito.",

        encourage: "Incentive a busca por ajuda",
        encourageText: "Sugira conversar com um profissional de saúde ou procurar um serviço do SUS.",

        whereHelp: "ONDE PROCURAR AJUDA 🏥",
        helpHeading: "Você não precisa enfrentar tudo sozinho.",
        helpIntro: "O SUS oferece diferentes pontos de cuidado em saúde mental. A porta de entrada pode ser a Atenção Primária, como uma UBS, e o cuidado também pode envolver os CAPS e outros serviços da rede.",

        ubsTitle: "UBS",
        ubsText: "Unidade Básica de Saúde. Pode orientar, acolher e encaminhar para outros serviços quando necessário.",

        capsTitle: "CAPS",
        capsText: "Serviços públicos de atenção psicossocial com equipe multiprofissional e acompanhamento.",

        professionalsTitle: "Profissionais",
        professionalsText: "Psicólogos, médicos e outros profissionais podem avaliar a situação e orientar o cuidado adequado.",

        emergencyTitle: "Em uma situação que precise de atendimento imediato",
        emergencyText: "Procure um serviço de urgência e emergência, como uma UPA ou pronto-socorro, ou acione o SAMU pelo 192.",

        finalTitle: "Falar, ouvir e acolher também são formas de cuidar.",
        finalText: "Uma conversa respeitosa pode ser importante. Procurar ajuda também é uma forma de cuidado.",

        footer1: "Conteúdo educativo elaborado com base em informações do Ministério da Saúde.",
        footer2: "Projeto educativo — Setembro Amarelo",

        backHome: "Início",
        backHomeAria: "Voltar para a tela inicial"
    },


    en: {

        lang: "en",

        accessibility: "Accessibility",
        resources: "RESOURCES",
        increase: "Increase text",
        decrease: "Decrease text",
        contrast: "High contrast",
        spacing: "Increase spacing",
        animations: "Reduce animations",
        focus: "Highlight focus",
        libras: "Activate Libras",
        status: "Accessibility features are available.",
        language: "LANGUAGE 🌎",

        homeLabel: "YELLOW SEPTEMBER",
        homeTitle: "You are not alone.",
        homeText: "Information, support and hope can transform lives.",
        clickFlower: "Click on a sunflower",
        startJourney: "and start your journey",
        care: "💛 Caring also means listening.",
        matter: "🎗️ You matter.",

        videoLabel: "A MOMENT TO REFLECT",
        videoTitle: "Life matters. 💛",
        videoText: "Take a few minutes to watch and reflect on the importance of care, listening and support.",

        infoLabel: "LEARN MORE 💛",
        infoTitle: "Knowledge is also a form of care.",
        infoText: "Understanding mental health helps recognize changes, reduce prejudice and encourage seeking support.",

        depressionTitle: "What is depression?",
        depression1: "Depression is a mental health condition that can affect mood, interests, energy, concentration and everyday life.",
        depression2: "It is not simply a lack of willpower. It can be related to different factors and deserves attention and professional care.",

        signsTitle: "Signs that deserve attention",
        signsIntro: "Some persistent changes may indicate that a person is going through a difficult time and needs support.",
        sign1: "Persistent changes in mood",
        sign2: "Loss of interest in activities",
        sign3: "Tiredness or lack of energy",
        sign4: "Changes in sleep",
        sign5: "Difficulty concentrating",
        sign6: "Frequent feelings of guilt or discouragement",
        important: "Important:",
        attention: "Having one of these signs alone does not mean that a person has depression. A diagnosis should be made by a health professional.",

        factorsTitle: "What can influence mental health?",
        factorsIntro: "Mental health is influenced by different aspects of life. These factors can combine and vary from person to person.",

        biological: "Biological",
        biologicalText: "Characteristics and processes of the body.",

        psychological: "Psychological",
        psychologicalText: "Thoughts, emotions and experiences.",

        social: "Social",
        socialText: "Relationships, environment and living conditions.",

        difficult: "Difficult moments",
        difficultText: "Situations that can cause distress or stress.",

        pcdTitle: "Mental health and people with disabilities",
        pcd1: "People with disabilities have the right to comprehensive health care. This care should consider accessibility, communication, respect, autonomy and support.",
        pcd2: "Physical, communication, information and attitudinal barriers can make access to services more difficult. Inclusion is therefore also part of care.",

        accessibilityPoint: "♿ Accessibility",
        accessibilityPointText: "Accessible environments and information.",

        respectPoint: "🤝 Respect",
        respectPointText: "Value autonomy and choices.",

        welcomePoint: "💛 Support",
        welcomePointText: "Listen without judgment and with attention.",

        helpTitle: "How can I help someone?",

        listen: "Listen",
        listenText: "Give the person space to talk and show that you are there.",

        welcome: "Support",
        welcomeText: "Avoid judgment and treat their suffering with seriousness and respect.",

        encourage: "Encourage seeking help",
        encourageText: "Suggest talking to a health professional or looking for a public health service.",

        whereHelp: "WHERE TO SEEK HELP 🏥",
        helpHeading: "You do not have to face everything alone.",
        helpIntro: "Public health services offer different points of care for mental health. Primary care, such as a basic health unit, can be a starting point, along with specialized services.",

        ubsTitle: "Primary Care",
        ubsText: "A basic health unit can provide guidance, support and referral to other services when needed.",

        capsTitle: "CAPS",
        capsText: "Public psychosocial care services with multidisciplinary teams and ongoing support.",

        professionalsTitle: "Professionals",
        professionalsText: "Psychologists, doctors and other professionals can assess the situation and guide appropriate care.",

        emergencyTitle: "In a situation requiring immediate care",
        emergencyText: "Seek an emergency service, such as an emergency unit or hospital emergency room, or call SAMU at 192.",

        finalTitle: "Talking, listening and supporting are also ways to care.",
        finalText: "A respectful conversation can be important. Seeking help is also a form of care.",

        footer1: "Educational content based on information from the Brazilian Ministry of Health.",
        footer2: "Educational project — Yellow September",

        backHome: "Home",
        backHomeAria: "Return to the home screen"
    },


    es: {

        lang: "es",

        accessibility: "Accesibilidad",
        resources: "RECURSOS",
        increase: "Aumentar texto",
        decrease: "Disminuir texto",
        contrast: "Alto contraste",
        spacing: "Aumentar espaciado",
        animations: "Reducir animaciones",
        focus: "Resaltar enfoque",
        libras: "Activar Libras",
        status: "Funciones de accesibilidad disponibles.",
        language: "IDIOMA 🌎",

        homeLabel: "SEPTIEMBRE AMARILLO",
        homeTitle: "No estás solo.",
        homeText: "La información, el apoyo y la esperanza pueden transformar vidas.",
        clickFlower: "Haz clic en un girasol",
        startJourney: "y comienza tu camino",
        care: "💛 Cuidar también es escuchar.",
        matter: "🎗️ Tú importas.",

        videoLabel: "UN MOMENTO PARA REFLEXIONAR",
        videoTitle: "La vida importa. 💛",
        videoText: "Tómate unos minutos para ver y reflexionar sobre la importancia del cuidado, la escucha y el apoyo.",

        infoLabel: "INFÓRMATE 💛",
        infoTitle: "El conocimiento también es una forma de cuidado.",
        infoText: "Comprender la salud mental ayuda a reconocer cambios, reducir prejuicios y fomentar la búsqueda de apoyo.",

        depressionTitle: "¿Qué es la depresión?",
        depression1: "La depresión es una condición de salud mental que puede afectar el estado de ánimo, los intereses, la energía, la concentración y la vida cotidiana.",
        depression2: "No es simplemente falta de voluntad. Puede estar relacionada con distintos factores y merece atención y cuidado profesional.",

        signsTitle: "Señales que merecen atención",
        signsIntro: "Algunos cambios persistentes pueden indicar que una persona está pasando por un momento difícil y necesita apoyo.",
        sign1: "Cambios persistentes en el estado de ánimo",
        sign2: "Pérdida de interés en actividades",
        sign3: "Cansancio o falta de energía",
        sign4: "Cambios en el sueño",
        sign5: "Dificultad para concentrarse",
        sign6: "Sentimientos frecuentes de culpa o desánimo",
        important: "Importante:",
        attention: "Tener uno de estos signos, por sí solo, no significa que una persona tenga depresión. El diagnóstico debe ser realizado por un profesional de la salud.",

        factorsTitle: "¿Qué puede influir en la salud mental?",
        factorsIntro: "La salud mental está influida por diferentes aspectos de la vida. Estos factores pueden combinarse y variar de una persona a otra.",

        biological: "Biológicos",
        biologicalText: "Características y procesos del organismo.",

        psychological: "Psicológicos",
        psychologicalText: "Pensamientos, emociones y experiencias.",

        social: "Sociales",
        socialText: "Relaciones, entorno y condiciones de vida.",

        difficult: "Momentos difíciles",
        difficultText: "Situaciones que pueden generar sufrimiento o estrés.",

        pcdTitle: "Salud mental y personas con discapacidad",
        pcd1: "Las personas con discapacidad tienen derecho a una atención integral en salud. Este cuidado debe considerar accesibilidad, comunicación, respeto, autonomía y apoyo.",
        pcd2: "Las barreras físicas, de comunicación, de información y las actitudes prejuiciosas pueden dificultar el acceso a los servicios. Por eso, la inclusión también forma parte del cuidado.",

        accessibilityPoint: "♿ Accesibilidad",
        accessibilityPointText: "Entornos e información accesibles.",

        respectPoint: "🤝 Respeto",
        respectPointText: "Valorar la autonomía y las decisiones.",

        welcomePoint: "💛 Acogida",
        welcomePointText: "Escuchar sin juzgar y con atención.",

        helpTitle: "¿Cómo puedo ayudar a alguien?",

        listen: "Escucha",
        listenText: "Da espacio para que la persona hable y demuestra que estás presente.",

        welcome: "Acoge",
        welcomeText: "Evita juzgar y trata el sufrimiento con seriedad y respeto.",

        encourage: "Anima a buscar ayuda",
        encourageText: "Sugiere hablar con un profesional de la salud o buscar un servicio público.",

        whereHelp: "DÓNDE BUSCAR AYUDA 🏥",
        helpHeading: "No tienes que enfrentar todo solo.",
        helpIntro: "El sistema público de salud ofrece diferentes puntos de atención en salud mental. La atención primaria, como una unidad básica de salud, puede ser un punto de partida junto con otros servicios.",

        ubsTitle: "Atención primaria",
        ubsText: "Una unidad básica de salud puede orientar, acoger y derivar a otros servicios cuando sea necesario.",

        capsTitle: "CAPS",
        capsText: "Servicios públicos de atención psicosocial con equipos multidisciplinarios y acompañamiento.",

        professionalsTitle: "Profesionales",
        professionalsText: "Psicólogos, médicos y otros profesionales pueden evaluar la situación y orientar el cuidado adecuado.",

        emergencyTitle: "En una situación que requiera atención inmediata",
        emergencyText: "Busca un servicio de urgencia y emergencia, como una UPA o una sala de emergencias, o llama al SAMU al 192.",

        finalTitle: "Hablar, escuchar y acoger también son formas de cuidar.",
        finalText: "Una conversación respetuosa puede ser importante. Buscar ayuda también es una forma de cuidado.",

        footer1: "Contenido educativo basado en información del Ministerio de Salud de Brasil.",
        footer2: "Proyecto educativo — Septiembre Amarillo",

        backHome: "Inicio",
        backHomeAria: "Volver a la pantalla de inicio"
    },


    fr: {

        lang: "fr",

        accessibility: "Accessibilité",
        resources: "RESSOURCES",
        increase: "Agrandir le texte",
        decrease: "Réduire le texte",
        contrast: "Contraste élevé",
        spacing: "Augmenter l'espacement",
        animations: "Réduire les animations",
        focus: "Mettre le focus en évidence",
        libras: "Activer Libras",
        status: "Fonctions d'accessibilité disponibles.",
        language: "LANGUE 🌎",

        homeLabel: "SEPTEMBRE JAUNE",
        homeTitle: "Vous n'êtes pas seul.",
        homeText: "L'information, le soutien et l'espoir peuvent transformer des vies.",
        clickFlower: "Cliquez sur un tournesol",
        startJourney: "et commencez votre parcours",
        care: "💛 Prendre soin, c'est aussi écouter.",
        matter: "🎗️ Vous comptez.",

        videoLabel: "UN MOMENT POUR RÉFLÉCHIR",
        videoTitle: "La vie compte. 💛",
        videoText: "Prenez quelques minutes pour regarder et réfléchir à l'importance du soin, de l'écoute et du soutien.",

        infoLabel: "INFORMEZ-VOUS 💛",
        infoTitle: "La connaissance est aussi une forme de soin.",
        infoText: "Comprendre la santé mentale aide à reconnaître les changements, à réduire les préjugés et à encourager la recherche de soutien.",

        depressionTitle: "Qu'est-ce que la dépression ?",
        depression1: "La dépression est un trouble de la santé mentale qui peut affecter l'humeur, les intérêts, l'énergie, la concentration et la vie quotidienne.",
        depression2: "Ce n'est pas simplement un manque de volonté. Elle peut être liée à différents facteurs et mérite une attention et un accompagnement professionnel.",

        signsTitle: "Signes qui méritent de l'attention",
        signsIntro: "Certains changements persistants peuvent indiquer qu'une personne traverse une période difficile et a besoin de soutien.",
        sign1: "Changements persistants de l'humeur",
        sign2: "Perte d'intérêt pour les activités",
        sign3: "Fatigue ou manque d'énergie",
        sign4: "Changements dans le sommeil",
        sign5: "Difficultés de concentration",
        sign6: "Sentiment fréquent de culpabilité ou de découragement",
        important: "Important :",
        attention: "Présenter l'un de ces signes ne signifie pas, à lui seul, qu'une personne souffre de dépression. Le diagnostic doit être posé par un professionnel de santé.",

        factorsTitle: "Qu'est-ce qui peut influencer la santé mentale ?",
        factorsIntro: "La santé mentale est influencée par différents aspects de la vie. Ces facteurs peuvent se combiner et varier d'une personne à l'autre.",

        biological: "Biologiques",
        biologicalText: "Caractéristiques et processus de l'organisme.",

        psychological: "Psychologiques",
        psychologicalText: "Pensées, émotions et expériences.",

        social: "Sociaux",
        socialText: "Relations, environnement et conditions de vie.",

        difficult: "Moments difficiles",
        difficultText: "Situations pouvant provoquer de la souffrance ou du stress.",

        pcdTitle: "Santé mentale et personnes handicapées",
        pcd1: "Les personnes handicapées ont droit à des soins de santé complets. Ces soins doivent tenir compte de l'accessibilité, de la communication, du respect, de l'autonomie et du soutien.",
        pcd2: "Les obstacles physiques, de communication, d'information et les attitudes préjudiciables peuvent rendre l'accès aux services plus difficile. L'inclusion fait donc aussi partie du soin.",

        accessibilityPoint: "♿ Accessibilité",
        accessibilityPointText: "Environnements et informations accessibles.",

        respectPoint: "🤝 Respect",
        respectPointText: "Valoriser l'autonomie et les choix.",

        welcomePoint: "💛 Accueil",
        welcomePointText: "Écouter sans juger et avec attention.",

        helpTitle: "Comment puis-je aider quelqu'un ?",

        listen: "Écouter",
        listenText: "Laissez la personne parler et montrez-lui que vous êtes présent.",

        welcome: "Accueillir",
        welcomeText: "Évitez les jugements et prenez la souffrance au sérieux avec respect.",

        encourage: "Encourager la recherche d'aide",
        encourageText: "Suggérez de parler à un professionnel de santé ou de rechercher un service public.",

        whereHelp: "OÙ CHERCHER DE L'AIDE 🏥",
        helpHeading: "Vous n'avez pas à tout affronter seul.",
        helpIntro: "Le système public de santé offre différents points de prise en charge en santé mentale. Les soins primaires, comme une unité de santé de base, peuvent constituer un point de départ avec d'autres services.",

        ubsTitle: "Soins primaires",
        ubsText: "Une unité de santé de base peut orienter, accueillir et adresser vers d'autres services si nécessaire.",

        capsTitle: "CAPS",
        capsText: "Services publics de soins psychosociaux avec des équipes pluridisciplinaires et un accompagnement.",

        professionalsTitle: "Professionnels",
        professionalsText: "Les psychologues, médecins et autres professionnels peuvent évaluer la situation et orienter les soins appropriés.",

        emergencyTitle: "En cas de situation nécessitant des soins immédiats",
        emergencyText: "Adressez-vous à un service d'urgence, comme une UPA ou un service d'urgences hospitalières, ou appelez le SAMU au 192.",

        finalTitle: "Parler, écouter et accueillir sont aussi des façons de prendre soin.",
        finalText: "Une conversation respectueuse peut être importante. Chercher de l'aide est aussi une forme de soin.",

        footer1: "Contenu éducatif basé sur des informations du ministère brésilien de la Santé.",
        footer2: "Projet éducatif — Septembre Jaune",

        backHome: "Accueil",
        backHomeAria: "Retourner à l'écran d'accueil"
    }
};


/* =====================================================
   FUNÇÕES DE TRADUÇÃO
===================================================== */

function setText(
    selector,
    text
) {

    const element =
        document.querySelector(
            selector
        );

    if (element) {

        element.textContent =
            text;

    }

}


function setTexts(
    selector,
    texts
) {

    document.querySelectorAll(
        selector
    ).forEach(
        (element, index) => {

            if (
                texts[index] !== undefined
            ) {

                element.textContent =
                    texts[index];

            }

        }
    );

}


function setTextWithin(
    parent,
    selector,
    text
) {

    const element =
        parent.querySelector(
            selector
        );

    if (element) {

        element.textContent =
            text;

    }

}


function setTextsWithin(
    parent,
    selector,
    texts
) {

    parent.querySelectorAll(
        selector
    ).forEach(
        (element, index) => {

            if (
                texts[index] !== undefined
            ) {

                element.textContent =
                    texts[index];

            }

        }
    );

}


/* =====================================================
   APLICAR IDIOMA
===================================================== */

function applyLanguage(
    language
) {

    const t =
        translations[language];

    if (!t) {
        return;
    }


    document.documentElement.lang =
        t.lang;


    /* Acessibilidade */

    setText(
        ".accessibility-toggle span",
        t.accessibility
    );

    setText(
        ".accessibility-small-title",
        t.resources
    );

    setText(
        ".accessibility-header h2",
        t.accessibility
    );

    setText(
        "#increaseText span:last-child",
        t.increase
    );

    setText(
        "#decreaseText span:last-child",
        t.decrease
    );

    setText(
        "#contrastToggle span:last-child",
        t.contrast
    );

    setText(
        "#spacingToggle span:last-child",
        t.spacing
    );

    setText(
        "#animationToggle span:last-child",
        t.animations
    );

    setText(
        "#focusToggle span:last-child",
        t.focus
    );

    setText(
        "#vlibrasButton span:last-child",
        t.libras
    );

    setText(
        ".language-title",
        t.language
    );


    /* Botão voltar */

    setText(
        "#backHomeButton span",
        t.backHome
    );


    if (backHomeButton) {

        backHomeButton.setAttribute(
            "aria-label",
            t.backHomeAria
        );

        backHomeButton.setAttribute(
            "title",
            t.backHomeAria
        );

    }


    /* Primeira tela */

    setText(
        ".welcome .label",
        t.homeLabel
    );

    setText(
        "#home-title",
        t.homeTitle
    );

    setText(
        ".welcome p",
        t.homeText
    );

    setText(
        ".click-area strong",
        t.clickFlower
    );

    setText(
        ".click-area span",
        t.startJourney
    );

    setTexts(
        ".bottom-bar span",
        [
            t.care,
            t.matter
        ]
    );


    /* Vídeo */

    setText(
        ".video-label",
        t.videoLabel
    );

    setText(
        "#video-title",
        t.videoTitle
    );

    setText(
        ".video-content > p",
        t.videoText
    );


    /* Introdução */

    setText(
        ".info-intro .info-label",
        t.infoLabel
    );

    setText(
        "#info-title",
        t.infoTitle
    );

    setText(
        ".info-intro > p",
        t.infoText
    );


    /* Cards */

    const cards =
        document.querySelectorAll(
            ".info-card"
        );


    if (
        cards.length >= 3
    ) {

        /* Depressão */

        setTextWithin(
            cards[0],
            "h3",
            t.depressionTitle
        );

        setTextsWithin(
            cards[0],
            "p",
            [
                t.depression1,
                t.depression2
            ]
        );


        /* Sinais */

        setTextWithin(
            cards[1],
            "h3",
            t.signsTitle
        );

        setTextWithin(
            cards[1],
            "> p",
            t.signsIntro
        );

        setTextsWithin(
            cards[1],
            ".sign-item span:last-child",
            [
                t.sign1,
                t.sign2,
                t.sign3,
                t.sign4,
                t.sign5,
                t.sign6
            ]
        );


        const attentionBox =
            cards[1].querySelector(
                ".attention-box"
            );

        if (
            attentionBox
        ) {

            attentionBox.innerHTML =
                `<strong>${t.important}</strong> ${t.attention}`;

        }


        /* Fatores */

        setTextWithin(
            cards[2],
            "h3",
            t.factorsTitle
        );

        setTextWithin(
            cards[2],
            "> p",
            t.factorsIntro
        );

        setTextsWithin(
            cards[2],
            ".factor h4",
            [
                t.biological,
                t.psychological,
                t.social,
                t.difficult
            ]
        );

        setTextsWithin(
            cards[2],
            ".factor p",
            [
                t.biologicalText,
                t.psychologicalText,
                t.socialText,
                t.difficultText
            ]
        );


        /* Como ajudar */

        if (
            cards.length >= 4
        ) {

            setTextWithin(
                cards[3],
                "h3",
                t.helpTitle
            );

            setTextsWithin(
                cards[3],
                ".help-item strong",
                [
                    t.listen,
                    t.welcome,
                    t.encourage
                ]
            );

            setTextsWithin(
                cards[3],
                ".help-item p",
                [
                    t.listenText,
                    t.welcomeText,
                    t.encourageText
                ]
            );

        }

    }


    /* PCD */

    setText(
        ".pcd-content h3",
        t.pcdTitle
    );

    setTexts(
        ".pcd-content > p",
        [
            t.pcd1,
            t.pcd2
        ]
    );

    setTexts(
        ".pcd-points strong",
        [
            t.accessibilityPoint,
            t.respectPoint,
            t.welcomePoint
        ]
    );

    setTexts(
        ".pcd-points span",
        [
            t.accessibilityPointText,
            t.respectPointText,
            t.welcomePointText
        ]
    );


    /* Onde procurar ajuda */

    setText(
        ".help-location .info-label",
        t.whereHelp
    );

    setText(
        "#help-title",
        t.helpHeading
    );

    setText(
        ".location-heading > p",
        t.helpIntro
    );

    setTexts(
        ".location-card h3",
        [
            t.ubsTitle,
            t.capsTitle,
            t.professionalsTitle
        ]
    );

    setTexts(
        ".location-card p",
        [
            t.ubsText,
            t.capsText,
            t.professionalsText
        ]
    );


    /* Emergência */

    const emergencyStrong =
        document.querySelector(
            ".emergency-note > div:last-child > strong"
        );

    if (
        emergencyStrong
    ) {

        emergencyStrong.textContent =
            t.emergencyTitle;

    }


    const emergencyP =
        document.querySelector(
            ".emergency-note p"
        );

    if (
        emergencyP
    ) {

        emergencyP.textContent =
            t.emergencyText;

    }


    /* Mensagem final */

    setText(
        ".final-message > span",
        t.homeLabel
    );

    setText(
        ".final-message h2",
        t.finalTitle
    );

    setText(
        ".final-message p",
        t.finalText
    );


    /* Rodapé */

    setTexts(
        ".sources p",
        [
            t.footer1,
            t.footer2
        ]
    );


    /* Girassóis */

    flowers.forEach(
        flower => {

            flower.setAttribute(
                "aria-label",
                t.clickFlower
            );

        }
    );


    /* Idioma selecionado */

    languageButtons.forEach(
        button => {

            const selected =
                button.dataset.language ===
                language;

            button.classList.toggle(
                "active",
                selected
            );

            button.setAttribute(
                "aria-pressed",
                String(selected)
            );

        }
    );


    localStorage.setItem(
        "siteLanguage",
        language
    );

}


/* =====================================================
   BOTÕES DE IDIOMA
===================================================== */

const languageButtons =
    document.querySelectorAll(
        ".language-button"
    );


languageButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                applyLanguage(
                    button.dataset.language
                );

            }
        );

    }
);


/* =====================================================
   IDIOMA SALVO
===================================================== */

const savedLanguage =
    localStorage.getItem(
        "siteLanguage"
    );


applyLanguage(

    savedLanguage &&
    translations[savedLanguage]

        ? savedLanguage

        : "pt"

);


/* =====================================================
   ESC FECHA O MENU
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            accessibilityPanel &&
            !accessibilityPanel.hidden
        ) {

            closeAccessibility();

            accessibilityToggle.focus();

        }

    }
);


/* =====================================================
   CLICAR FORA FECHA O MENU
===================================================== */

document.addEventListener(
    "click",
    event => {

        if (
            !accessibilityPanel ||
            accessibilityPanel.hidden
        ) {

            return;
        }


        const clickedInside =
            accessibilityPanel.contains(
                event.target
            );


        const clickedToggle =
            accessibilityToggle.contains(
                event.target
            );


        if (
            !clickedInside &&
            !clickedToggle
        ) {

            closeAccessibility();

        }

    }
);