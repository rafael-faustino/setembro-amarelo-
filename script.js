const home = document.getElementById("home");
const field = document.getElementById("flowerField");
const videoSection = document.getElementById("videoSection");
const butterflies = document.getElementById("butterflies");
const particles = document.getElementById("particles");

let journeyStarted = false;

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
        bottom < 0
            ? `${bottom}px`
            : `${bottom}%`
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
   BORBOLETA
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

    butterflies.appendChild(butterfly);

    setTimeout(() => {

        butterfly.remove();

    }, 8000);
}


/* =====================================================
   PARTÍCULAS
===================================================== */

function createParticle(x, y) {

    const particle = document.createElement("span");

    particle.className = "particle";

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

    particles.appendChild(particle);

    setTimeout(() => {

        particle.remove();

    }, 2200);
}


/* =====================================================
   BORBOLETAS SAINDO DO GIRASSOL
===================================================== */

function launchFromFlower(element) {

    const rect =
        element.getBoundingClientRect();

    const centerX =
        rect.left + rect.width / 2;

    const centerY =
        rect.top + rect.height * 0.25;

    for (let i = 0; i < 28; i++) {

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

    for (let i = 0; i < 45; i++) {

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
   BORBOLETAS NO CAMPO
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
        (0.55 + Math.random() * 0.35);

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

    flowers.forEach(flower => {
        flower.disabled = true;
    });

    launchFromFlower(
        event.currentTarget
    );

    for (let i = 0; i < 45; i++) {

        setTimeout(() => {

            createAmbientButterfly();

        }, i * 75);
    }

    for (let i = 0; i < 70; i++) {

        setTimeout(() => {

            createParticle(
                Math.random() *
                window.innerWidth,

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

        videoSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 2600);
}


/* =====================================================
   CLIQUE / TECLADO
===================================================== */

flowers.forEach(flower => {

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

});


/* =====================================================
   ANIMAÇÃO DAS INFORMAÇÕES
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );

    revealElements.forEach(element => {

        revealObserver.observe(
            element
        );

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("show");

    });

}