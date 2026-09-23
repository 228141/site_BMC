/* ============================================================
   BMC — JAVASCRIPT
============================================================ */


/* ============================================================
   MENU MOBILE
============================================================ */

const menuButton = document.getElementById("menuButton");

const navigation = document.querySelector(".main-nav");


if (menuButton) {

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("mobile-open");

    });

}



/* ============================================================
   FECHAR MENU AO CLICAR
============================================================ */

const menuLinks = document.querySelectorAll(
    ".main-nav a"
);


menuLinks.forEach(link => {

    link.addEventListener("click", () => {

        navigation.classList.remove(
            "mobile-open"
        );

    });

});



/* ============================================================
   HEADER AO ROLAR
============================================================ */

const header =
    document.querySelector(".site-header");


window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        header.classList.add(
            "header-scrolled"
        );

    } else {

        header.classList.remove(
            "header-scrolled"
        );

    }

});



/* ============================================================
   ANIMAÇÃO DOS ELEMENTOS
============================================================ */

const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


const animatedElements =
    document.querySelectorAll(
        ".pillar-card, .journey-item, .impact-list div"
    );


animatedElements.forEach(element => {

    observer.observe(element);

});



/* ============================================================
   EFEITO DE MOVIMENTO SUAVE DO LOGO
============================================================ */

const logo =
    document.querySelector(".hero-logo img");


if (logo) {

    document.addEventListener(
        "mousemove",
        event => {

            const x =
                (window.innerWidth / 2 - event.clientX)
                / 80;

            const y =
                (window.innerHeight / 2 - event.clientY)
                / 80;


            logo.style.transform =
                `translate(${x}px, ${y}px)`;

        }
    );

}



/* ============================================================
   BRILHO DO FOGO
============================================================ */

const fire =
    document.querySelector(".fire-border");


let fireDirection = 1;

let fireOpacity = 0.88;


setInterval(() => {

    fireOpacity +=
        0.008 * fireDirection;


    if (fireOpacity >= 1) {

        fireDirection = -1;

    }


    if (fireOpacity <= 0.78) {

        fireDirection = 1;

    }


    fire.style.opacity =
        fireOpacity;

}, 80);



/* ============================================================
   CSS DINÂMICO DAS ANIMAÇÕES
============================================================ */

const dynamicStyle =
    document.createElement("style");


dynamicStyle.innerHTML = `

    .pillar-card,
    .journey-item,
    .impact-list div {

        opacity: 0;

        transform:
            translateY(25px);

        transition:
            opacity .8s ease,
            transform .8s ease;

    }


    .pillar-card.visible,
    .journey-item.visible,
    .impact-list div.visible {

        opacity: 1;

        transform:
            translateY(0);

    }


    .header-scrolled {

        background:
            rgba(0,0,0,.92);

        box-shadow:
            0 10px 40px
            rgba(0,0,0,.45);

    }


    @media(max-width:900px) {

        .main-nav.mobile-open {

            display:flex;

            position:absolute;

            top:78px;

            left:0;

            width:100%;

            flex-direction:column;

            padding:25px;

            background:
                rgba(0,0,0,.96);

            border-bottom:
                1px solid
                rgba(201,154,61,.25);

        }

    }

`;


document.head.appendChild(
    dynamicStyle
);