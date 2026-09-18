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


    /*
        Borboletas saindo
        do girassol clicado
    */

    launchFromFlower(
        event.currentTarget
    );


    /*
        Borboletas pelo campo
    */

    for (
        let i = 0;
        i < 45;
        i++
    ) {

        setTimeout(() => {

            createAmbientButterfly();

        }, i * 75);
    }


    /*
        Partículas
    */

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


    /*
        Faz a primeira tela desaparecer
    */

    setTimeout(() => {

        home.classList.add(
            "leaving"
        );

    }, 1400);


    /*
        Mostra o vídeo
    */

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
                    event.key ===
                        "Enter" ||

                    event.key ===
                        " "
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
   ABRIR ACESSIBILIDADE
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
   FECHAR ACESSIBILIDADE
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
   AUMENTAR / DIMINUIR TEXTO
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


        const messages = [

            "Texto aumentado.",

            "Texto aumentado novamente.",

            "Tamanho máximo de texto ativado."

        ];


        setAccessibilityStatus(
            messages[
                Math.min(
                    textLevel,
                    2
                )
            ]
        );

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


        setAccessibilityStatus(

            enabled

                ? "Alto contraste ativado."

                : "Alto contraste desativado."

        );


        contrastToggle.setAttribute(
            "aria-pressed",
            enabled.toString()
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


        setAccessibilityStatus(

            enabled

                ? "Espaçamento maior ativado."

                : "Espaçamento normal restaurado."

        );


        spacingToggle.setAttribute(
            "aria-pressed",
            enabled.toString()
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


        setAccessibilityStatus(

            enabled

                ? "Animações reduzidas."

                : "Animações normais restauradas."

        );


        animationToggle.setAttribute(
            "aria-pressed",
            enabled.toString()
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


        setAccessibilityStatus(

            enabled

                ? "Destaque de foco ativado."

                : "Destaque de foco desativado."

        );


        focusToggle.setAttribute(
            "aria-pressed",
            enabled.toString()
        );

    }
);


/* =====================================================
   LIBRAS / VLibras
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
   ESC FECHA O MENU
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
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
            accessibilityPanel.hidden
        ) {

            return;

        }


        const clickedInside =
            accessibilityPanel.contains(
                event.target
            );


        const clickedButton =
            accessibilityToggle.contains(
                event.target
            );


        if (
            !clickedInside &&
            !clickedButton
        ) {

            closeAccessibility();

        }

    }
);