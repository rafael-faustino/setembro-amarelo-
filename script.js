/* =====================================
   ELEMENTOS
===================================== */

const home = document.getElementById("home");
const videoSection = document.getElementById("videoSection");

const butterflies = document.getElementById("butterflies");
const particles = document.getElementById("particles");

const flowers = document.querySelectorAll(
    ".sunflower, .small-flower"
);

let journeyStarted = false;


/* =====================================
   BORBOLETA
===================================== */

function createButterfly(x, y, delay = 0) {

    const butterfly =
        document.createElement("span");

    butterfly.className = "butterfly";

    butterfly.style.left = `${x}px`;
    butterfly.style.top = `${y}px`;

    butterfly.style.setProperty(
        "--distance",
        `${300 + Math.random() * 500}px`
    );

    butterfly.style.setProperty(
        "--duration",
        `${3.5 + Math.random() * 2}s`
    );

    butterfly.style.animationDelay =
        `${delay}s`;

    butterflies.appendChild(butterfly);


    setTimeout(() => {
        butterfly.remove();
    }, 7000);
}


/* =====================================
   PARTÍCULA
===================================== */

function createParticle(x, y) {

    const particle =
        document.createElement("span");

    particle.className = "particle";

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    particle.style.setProperty(
        "--x",
        `${(Math.random() - 0.2) * 500}px`
    );

    particle.style.setProperty(
        "--y",
        `${-200 - Math.random() * 450}px`
    );

    particle.style.setProperty(
        "--duration",
        `${2 + Math.random() * 2}s`
    );

    particles.appendChild(particle);


    setTimeout(() => {
        particle.remove();
    }, 4500);
}


/* =====================================
   BORBOLETAS SAINDO DO GIRASSOL
===================================== */

function launchFromFlower(element) {

    const rect =
        element.getBoundingClientRect();

    const centerX =
        rect.left + rect.width / 2;

    const centerY =
        rect.top + rect.height / 2;


    /* Borboletas */

    for (let i = 0; i < 18; i++) {

        createButterfly(
            centerX + (Math.random() - 0.5) * 50,
            centerY + (Math.random() - 0.5) * 40,
            i * 0.06
        );

    }


    /* Partículas */

    for (let i = 0; i < 30; i++) {

        setTimeout(() => {

            createParticle(
                centerX + (Math.random() - 0.5) * 80,
                centerY + (Math.random() - 0.5) * 60
            );

        }, i * 45);

    }
}


/* =====================================
   BORBOLETAS PELO CAMPO
===================================== */

function createAmbientButterfly() {

    const width =
        window.innerWidth;

    const height =
        window.innerHeight;


    const x =
        Math.random() * width;

    const y =
        height * (
            0.60 +
            Math.random() * 0.35
        );


    createButterfly(
        x,
        y
    );
}


/* =====================================
   CLICAR
===================================== */

function startJourney(event) {

    if (journeyStarted) {
        return;
    }

    journeyStarted = true;


    /* Desabilita os girassóis */

    flowers.forEach(flower => {
        flower.disabled = true;
    });


    /* Borboletas saindo do girassol clicado */

    launchFromFlower(
        event.currentTarget
    );


    /* Explosão de borboletas pelo campo */

    for (let i = 0; i < 45; i++) {

        setTimeout(() => {

            createAmbientButterfly();

        }, i * 70);

    }


    /* Mais partículas */

    for (let i = 0; i < 60; i++) {

        setTimeout(() => {

            createParticle(
                Math.random() * window.innerWidth,
                window.innerHeight *
                (0.55 + Math.random() * 0.35)
            );

        }, i * 45);

    }


    /* Começa a saída */

    setTimeout(() => {

        home.classList.add("leaving");

    }, 1000);


    /* Mostra o vídeo */

    setTimeout(() => {

        home.style.display = "none";

        videoSection.classList.add("visible");

        videoSection.scrollIntoView({
            behavior: "smooth"
        });

    }, 1900);

}


/* =====================================
   EVENTOS
===================================== */

flowers.forEach(flower => {

    flower.addEventListener(
        "click",
        startJourney
    );

});


/* =====================================
   ACESSIBILIDADE
===================================== */

flowers.forEach(flower => {

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