/* =========================================
   CONFIGURAÇÕES
========================================= */

const home = document.getElementById("home");
const videoSection = document.getElementById("videoSection");
const butterfliesContainer = document.getElementById("butterflies");

const flowers = document.querySelectorAll(".sunflower");


/* =========================================
   CRIAR UMA BORBOLETA
========================================= */

function createButterfly(
    startX,
    startY,
    delay = 0
) {

    const butterfly = document.createElement("span");

    butterfly.classList.add("butterfly");

    butterfly.textContent = "🦋";

    butterfly.style.left = `${startX}px`;
    butterfly.style.top = `${startY}px`;

    butterfly.style.setProperty(
        "--distance",
        `${250 + Math.random() * 450}px`
    );

    butterfly.style.setProperty(
        "--duration",
        `${3 + Math.random() * 2}s`
    );

    butterfly.style.setProperty(
        "--delay",
        `${delay}s`
    );

    butterfly.style.fontSize =
        `${18 + Math.random() * 25}px`;

    butterfliesContainer.appendChild(butterfly);


    /* Remove depois da animação */

    setTimeout(() => {

        butterfly.remove();

    }, 6500);
}


/* =========================================
   BORBOLETAS CONTÍNUAS
========================================= */

let butterflyInterval = null;


function startButterflies() {

    /*
       Borboletas surgindo de diferentes
       pontos da parte inferior da tela.
    */

    butterflyInterval = setInterval(() => {

        const width = window.innerWidth;
        const height = window.innerHeight;

        const startX =
            Math.random() * width;

        const startY =
            height * (0.62 + Math.random() * 0.32);

        createButterfly(
            startX,
            startY
        );

    }, 550);
}


/* =========================================
   CLICAR NO GIRASSOL
========================================= */

function startJourney(event) {

    /*
       Impede clicar novamente enquanto
       a transição está acontecendo.
    */

    flowers.forEach(flower => {
        flower.disabled = true;
    });


    /*
       Descobre a posição do girassol
       clicado.
    */

    const rect =
        event.currentTarget.getBoundingClientRect();

    const startX =
        rect.left + rect.width / 2;

    const startY =
        rect.top + rect.height / 2;


    /*
       Muitas borboletas saem do
       girassol clicado.
    */

    for (let i = 0; i < 25; i++) {

        createButterfly(
            startX,
            startY,
            i * 0.05
        );
    }


    /*
       Mais borboletas aparecem pelo campo.
    */

    for (let i = 0; i < 30; i++) {

        setTimeout(() => {

            const x =
                Math.random() * window.innerWidth;

            const y =
                window.innerHeight *
                (0.55 + Math.random() * 0.4);

            createButterfly(
                x,
                y
            );

        }, i * 80);
    }


    /*
       Continua criando borboletas
       durante a transição.
    */

    startButterflies();


    /*
       Escurece/desaparece a primeira tela.
    */

    setTimeout(() => {

        home.classList.add("leaving");

    }, 1000);


    /*
       Depois da animação,
       mostra o vídeo.
    */

    setTimeout(() => {

        clearInterval(butterflyInterval);

        home.style.display = "none";

        videoSection.classList.add("visible");

        videoSection.scrollIntoView({
            behavior: "smooth"
        });

    }, 1900);
}


/* =========================================
   EVENTOS DOS GIRASSÓIS
========================================= */

flowers.forEach(flower => {

    flower.addEventListener(
        "click",
        startJourney
    );

});


/* =========================================
   ACESSIBILIDADE
========================================= */

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