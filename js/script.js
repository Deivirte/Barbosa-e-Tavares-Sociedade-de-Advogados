// ==========================
// MENU HAMBURGER
// ==========================
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menu.classList.toggle("active");
});


// ==========================
// CONTADOR (PROVA SOCIAL)
// ==========================
const counters = document.querySelectorAll('.counter');

const animateCounters = () => {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const increment = target / 100;

    let count = 0;

    const updateCount = () => {
      count += increment;

      if (count < target) {
        counter.innerText = Math.ceil(count);
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target + "+";
      }
    };

    updateCount();
  });
};

const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    animateCounters();
    observer.disconnect();
  }
});

observer.observe(document.querySelector('.stats'));


// ==========================
// FORMATAÇÃO DE MOEDA
// ==========================
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}


// ==========================
// CÁLCULO DE RESCISÃO (AVANÇADO)
// ==========================
function calcularRescisaoAvancada() {

  const salario = Number(document.getElementById("salario").value);
  const dias = Number(document.getElementById("dias").value);
  const meses = Number(document.getElementById("meses").value);
  const anosEmpresa = Number(document.getElementById("anosEmpresa").value);
  const fgtsSaldo = Number(document.getElementById("fgtsSaldo").value);
  const tipoRescisao = document.getElementById("tipoRescisao").value;
  const feriasVencidasOpcao = Number(document.getElementById("feriasVencidas").value);

  const resultado = document.getElementById("resultado");

  // Validação básica
  if (!salario || dias < 0 || meses < 0) {
    resultado.innerHTML = `
      <h3>Resultado estimado</h3>
      <p>Preencha os campos corretamente.</p>
    `;
    return;
  }

  // ==========================
  // CÁLCULOS
  // ==========================

  // Saldo salário
  const saldoSalario = (salario / 30) * dias;

  // 13º proporcional
  const decimoTerceiro = (salario / 12) * meses;

  // Férias proporcionais
  const feriasProporcionais = (salario / 12) * meses;
  const tercoFeriasProporcionais = feriasProporcionais / 3;

  // Férias vencidas
  let feriasVencidas = 0;
  let tercoFeriasVencidas = 0;

  if (feriasVencidasOpcao === 1) {
    feriasVencidas = salario;
    tercoFeriasVencidas = salario / 3;
  }

  // Aviso prévio + FGTS
  let avisoPrevio = 0;
  let multaFgts = 0;
  let fgtsSaque = 0;

  if (tipoRescisao === "semJustaCausa") {
    avisoPrevio = salario + (salario / 30) * (anosEmpresa * 3);
    multaFgts = fgtsSaldo * 0.4;
    fgtsSaque = fgtsSaldo;
  }

  if (tipoRescisao === "acordo") {
    avisoPrevio = salario / 2;
    multaFgts = fgtsSaldo * 0.2;
    fgtsSaque = fgtsSaldo * 0.8;
  }

  if (tipoRescisao === "pedidoDemissao") {
    avisoPrevio = 0;
    multaFgts = 0;
    fgtsSaque = 0;
  }

  // Total
  const total =
    saldoSalario +
    decimoTerceiro +
    feriasProporcionais +
    tercoFeriasProporcionais +
    feriasVencidas +
    tercoFeriasVencidas +
    avisoPrevio +
    multaFgts;

  // ==========================
  // RESULTADO
  // ==========================
  resultado.innerHTML = `
    <h3>Resultado estimado</h3>

    <p><strong>Saldo de salário:</strong> ${formatarMoeda(saldoSalario)}</p>
    <p><strong>13º proporcional:</strong> ${formatarMoeda(decimoTerceiro)}</p>

    <p><strong>Férias proporcionais:</strong> ${formatarMoeda(feriasProporcionais)}</p>
    <p><strong>1/3 férias proporcionais:</strong> ${formatarMoeda(tercoFeriasProporcionais)}</p>

    <p><strong>Férias vencidas:</strong> ${formatarMoeda(feriasVencidas)}</p>
    <p><strong>1/3 férias vencidas:</strong> ${formatarMoeda(tercoFeriasVencidas)}</p>

    <p><strong>Aviso prévio:</strong> ${formatarMoeda(avisoPrevio)}</p>
    <p><strong>Multa FGTS:</strong> ${formatarMoeda(multaFgts)}</p>
    <p><strong>FGTS disponível:</strong> ${formatarMoeda(fgtsSaque)}</p>

    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.2);margin:15px 0;">

    <p><strong>Total estimado:</strong> ${formatarMoeda(total)}</p>
  `;
}

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight - 100) {
    nav.classList.add("scrolled");
    nav.classList.remove("transparent");
  } else {
    nav.classList.remove("scrolled");
    nav.classList.add("transparent");
  }
});

// ==========================
// CHAT WHATSAPP FLUTUANTE
// ==========================
const whatsappToggle = document.getElementById("whatsappToggle");
const whatsappChat = document.getElementById("whatsappChat");
const closeChat = document.getElementById("closeChat");
const sendWhatsapp = document.getElementById("sendWhatsapp");
const whatsappMessage = document.getElementById("whatsappMessage");

const whatsappNumber = "5511940426823";

setTimeout(() => {
  whatsappChat.classList.add("active");
}, 15000);

whatsappToggle.addEventListener("click", () => {
  whatsappChat.classList.toggle("active");
});

closeChat.addEventListener("click", () => {
  whatsappChat.classList.remove("active");
});

sendWhatsapp.addEventListener("click", () => {
  const message = whatsappMessage.value.trim();

  if (!message) {
    whatsappMessage.focus();
    return;
  }

  const text = encodeURIComponent(message);
  const url = `https://wa.me/${whatsappNumber}?text=${text}`;

  window.open(url, "_blank");
});