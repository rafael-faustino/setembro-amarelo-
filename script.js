/* =========================
   ELEMENTOS
========================= */

const sunflowerBtn = document.getElementById("sunflowerBtn");
const enterBtn = document.getElementById("enterBtn");
const hero = document.getElementById("inicio");
const siteContent = document.getElementById("siteContent");
const butterflyContainer = document.getElementById("butterfly-container");

const topBtn = document.getElementById("topBtn");

const quoteElement = document.getElementById("quote");
const newQuoteBtn = document.getElementById("newQuote");

const locationBtn = document.getElementById("locationBtn");
const locationMessage = document.getElementById("locationMessage");


/* =========================
   FRASES
========================= */

const quotes = [
    "Você importa.",
    "Pedir ajuda também é uma forma de coragem.",
    "Ouvir pode ser o começo de uma mudança.",
    "Você não precisa ter todas as respostas.",
    "Cuidar também é estar presente.",
    "Falar sobre o que sentimos pode ajudar.",
    "Ninguém precisa enfrentar tudo sozinho.",
    "Pequenos gestos também podem fazer diferença."
];

let lastQuote = 0;


/* =========================
   BORBOLETAS
========================= */

function createButterflies() {

    butterflyContainer.innerHTML = "";

    const amount = 24;

    for (let i = 0; i < amount; i++) {

        const butterfly = document.createElement("span");

        butterfly.className = "butterfly";
        butterfly.textContent = "🦋";

        butterfly.style.left = `${Math.random() * 100}%`;
        butterfly.style.top = `${50 + Math.random() * 20}%`;

        butterfly.style.setProperty(
            "--x",
            `${(Math.random() - 0.5) * 900}px`
        );

        butterfly.style.setProperty(
            "--y",
            `${-300 - Math.random() * 500}px`
        );

        butterfly.style.animationDelay =
            `${Math.random() * 0.8}s`;

        butterfly.style.fontSize =
            `${20 + Math.random() * 25}px`;

        butterflyContainer.appendChild(butterfly);
    }
}


/* =========================
   ENTRAR NO SITE
========================= */

function enterSite() {

    createButterflies();

    hero.classList.add("fade-out");

    setTimeout(() => {

        hero.style.display = "none";

        siteContent.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }, 1100);
}


sunflowerBtn.addEventListener("click", enterSite);
enterBtn.addEventListener("click", enterSite);


/* =========================
   FRASES
========================= */

newQuoteBtn.addEventListener("click", () => {

    let randomIndex;

    do {
        randomIndex =
            Math.floor(Math.random() * quotes.length);
    } while (randomIndex === lastQuote);

    lastQuote = randomIndex;

    quoteElement.style.opacity = "0";

    setTimeout(() => {

        quoteElement.textContent =
            quotes[randomIndex];

        quoteElement.style.opacity = "1";

    }, 250);
});


/* =========================
   LOCALIZAÇÃO
========================= */

locationBtn.addEventListener("click", () => {

    if (!navigator.geolocation) {

        locationMessage.textContent =
            "Seu navegador não permite localização automática. Você pode procurar o serviço de saúde da sua cidade pelo site oficial do Ministério da Saúde.";

        return;
    }

    locationMessage.textContent =
        "Solicitando sua localização...";

    navigator.geolocation.getCurrentPosition(

        (position) => {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;

            const mapsURL =
                `https://www.google.com/maps/search/CAPS/@${latitude},${longitude},14z`;

            locationMessage.innerHTML =
                `Localização encontrada. <a href="${mapsURL}" target="_blank" rel="noopener noreferrer">Abrir busca por CAPS no mapa</a>`;

        },

        () => {

            locationMessage.textContent =
                "Não foi possível acessar sua localização. Você pode procurar manualmente por CAPS na sua cidade.";

        }
    );
});


/* =========================
   VOLTAR AO TOPO
========================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }

});


topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================
   ESCOLHER REDUZIR ANIMAÇÕES
========================= */

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

    document.documentElement.classList.add(
        "reduced-motion"
    );

}