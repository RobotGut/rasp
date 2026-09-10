document.addEventListener("DOMContentLoaded", () => {
  /* CONTROLADOR DA SIDEBAR MOBILE */
  const menuMobile = document.getElementById("menuMobile");
  const sidebarMobile = document.getElementById("sidebarMobile");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const sidebarClose = document.getElementById("sidebarClose");
  const sidebarLinks = document.querySelectorAll(".sidebar-nav a");

  function openSidebar() {
    sidebarMobile.classList.add("active");
    sidebarOverlay.classList.add("active");
    menuMobile.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden"; // Impede a rolagem do fundo
  }

  function closeSidebar() {
    sidebarMobile.classList.remove("active");
    sidebarOverlay.classList.remove("active");
    menuMobile.setAttribute("aria-expanded", "false");
    document.body.style.overflow = ""; // Libera a rolagem
  }

  if (menuMobile) {
    menuMobile.addEventListener("click", openSidebar);
  }

  if (sidebarClose) {
    sidebarClose.addEventListener("click", closeSidebar);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar);
  }

  // Fecha a sidebar ao clicar em qualquer link de navegação
  sidebarLinks.forEach(link => {
    link.addEventListener("click", closeSidebar);
  });

  /* FAQ ACCORDION */
  document.querySelectorAll(".faq-item button").forEach(button => {
    button.addEventListener("click", () => {
      const answer = button.nextElementSibling;
      const icon = button.querySelector("span");

      if (answer.classList.contains("active")) {
        answer.classList.remove("active");
        icon.textContent = "+";
      } else {
        document.querySelectorAll(".faq-answer").forEach(ans => ans.classList.remove("active"));
        document.querySelectorAll(".faq-item button span").forEach(sp => sp.textContent = "+");

        answer.classList.add("active");
        icon.textContent = "-";
      }
    });
  });

  /* BOTÃO VOLTAR AO TOPO */
  const backTop = document.getElementById("backTop");
  if (backTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backTop.classList.add("active");
      } else {
        backTop.classList.remove("active");
      }
    });

    backTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ENVIO DE FORMULÁRIO VIA WHATSAPP */
  const quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    quoteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const nome = document.getElementById("nome").value;
      const telefone = document.getElementById("telefone").value;
      const servico = document.getElementById("servico").value;
      const mensagem = document.getElementById("mensagem").value;

      const textoWhatsApp = `Olá! Gostaria de solicitar um orçamento.\n\n*Nome:* ${nome}\n*Telefone:* ${telefone}\n*Serviço:* ${servico}\n*Mensagem:* ${mensagem}`;
      const urlWhatsApp = `https://wa.me/5500000000000?text=${encodeURIComponent(textoWhatsApp)}`;

      window.open(urlWhatsApp, "_blank");
    });
  }

  /* ANIMAÇÃO DE ELEMENTOS AO ROLAR (SCROLL REVEAL) */
  const hiddenElements = document.querySelectorAll(".hidden");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.1 });

  hiddenElements.forEach(el => observer.observe(el));

  /* CONTADORES ANIMADOS DE ESTATÍSTICAS */
  const statsSection = document.querySelector(".stats");
  const numbers = document.querySelectorAll("[data-number]");
  let animated = false;

  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        numbers.forEach(num => {
          const target = +num.getAttribute("data-number");
          let count = 0;
          const increment = target / 50;

          const updateCount = () => {
            count += increment;
            if (count < target) {
              num.innerText = Math.ceil(count);
              setTimeout(updateCount, 30);
            } else {
              num.innerText = target;
            }
          };
          updateCount();
        });
      }
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
  }
});