/* ============================================================
   BMC — JAVASCRIPT
============================================================ */

// Marca que o JS está ativo (as animações de entrada só
// escondem os elementos quando isto acontece).
document.documentElement.classList.add("js");

const WHATSAPP_BMC = "5511920133747";

const reduceMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;



/* ============================================================
   MENU MOBILE
============================================================ */

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("mainNav");

function setMenu(open) {
    navigation.classList.toggle("mobile-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
}

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {
        setMenu(!navigation.classList.contains("mobile-open"));
    });

    // Fecha ao clicar em um link
    navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => setMenu(false));
    });

    // Fecha com a tecla Esc
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") setMenu(false);
    });

}



/* ============================================================
   HEADER AO ROLAR
============================================================ */

const header = document.querySelector(".site-header");

function updateHeader() {
    header.classList.toggle("header-scrolled", window.scrollY > 60);
}

if (header) {
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
}



/* ============================================================
   ANIMAÇÃO DE ENTRADA DOS ELEMENTOS
============================================================ */

const animatedElements = document.querySelectorAll(
    ".pillar-card, .journey-item, .impact-list div, .join-steps li"
);

if ("IntersectionObserver" in window && !reduceMotion) {

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    animatedElements.forEach(element => observer.observe(element));

} else {

    animatedElements.forEach(element => element.classList.add("visible"));

}



/* ============================================================
   MOVIMENTO SUAVE DO LOGO (só com mouse e sem movimento reduzido)
============================================================ */

const logo = document.querySelector(".hero-logo img");
const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (logo && hasMouse && !reduceMotion) {

    let frame = null;

    document.addEventListener("mousemove", event => {

        if (frame) return;

        frame = requestAnimationFrame(() => {
            const x = (window.innerWidth / 2 - event.clientX) / 80;
            const y = (window.innerHeight / 2 - event.clientY) / 80;
            logo.style.transform = `translate(${x}px, ${y}px)`;
            frame = null;
        });

    });

}



/* ============================================================
   FORMULÁRIO "QUERO PARTICIPAR"
   Monta a mensagem e abre o WhatsApp da liderança.
============================================================ */

const form = document.getElementById("joinForm");
const phoneInput = document.getElementById("telefone");
const statusBox = document.getElementById("formStatus");

// Máscara simples de telefone: (11) 9 0000-0000
if (phoneInput) {

    phoneInput.addEventListener("input", () => {

        const d = phoneInput.value.replace(/\D/g, "").slice(0, 11);
        let v = d;

        if (d.length > 2)  v = `(${d.slice(0, 2)}) ${d.slice(2)}`;
        if (d.length > 3 && d.length === 11)
            v = `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3, 7)}-${d.slice(7)}`;
        else if (d.length > 6)
            v = `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;

        phoneInput.value = v;

    });

}

function showError(input, message) {
    const box = document.getElementById(`${input.id}-erro`);
    input.setAttribute("aria-invalid", message ? "true" : "false");
    if (box) box.textContent = message;
    if (message) input.setAttribute("aria-describedby", `${input.id}-erro`);
}

if (form) {

    form.addEventListener("submit", event => {

        event.preventDefault();

        const nome = form.nome.value.trim();
        const telefone = form.telefone.value.trim();
        const digitos = telefone.replace(/\D/g, "");
        const bairro = form.bairro.value.trim();
        const frequenta = form.frequenta.value;
        const mensagem = form.mensagem.value.trim();

        let valido = true;

        if (nome.length < 3) {
            showError(form.nome, "Digite seu nome para a liderança saber com quem está falando.");
            valido = false;
        } else {
            showError(form.nome, "");
        }

        if (digitos.length < 10) {
            showError(form.telefone, "Digite seu WhatsApp com DDD, por exemplo (11) 9 0000-0000.");
            valido = false;
        } else {
            showError(form.telefone, "");
        }

        if (!valido) {
            form.querySelector('[aria-invalid="true"]').focus();
            return;
        }

        const linhas = [
            "Olá! Quero participar do BMC.",
            "",
            `*Nome:* ${nome}`,
            `*WhatsApp:* ${telefone}`
        ];

        if (bairro) linhas.push(`*Bairro/cidade:* ${bairro}`);
        linhas.push(`*Igreja em Movimento:* ${frequenta}`);
        if (mensagem) linhas.push("", mensagem);

        const url =
            `https://wa.me/${WHATSAPP_BMC}?text=${encodeURIComponent(linhas.join("\n"))}`;

        window.open(url, "_blank", "noopener");

        statusBox.textContent =
            "O WhatsApp foi aberto com sua mensagem. Toque em enviar para concluir.";

    });

}



/* ============================================================
   ANO NO RODAPÉ
============================================================ */

const ano = document.getElementById("ano");
if (ano) ano.textContent = new Date().getFullYear();
