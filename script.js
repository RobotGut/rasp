document.addEventListener("DOMContentLoaded", () => {
  /* 1. CONTROLADOR DA SIDEBAR MOBILE */
  const menuMobile = document.getElementById("menuMobile");
  const sidebarMobile = document.getElementById("sidebarMobile");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const sidebarClose = document.getElementById("sidebarClose");
  const sidebarNav = document.querySelector(".sidebar-nav");

  function toggleSidebar(isOpen) {
    if (!sidebarMobile) return;
    sidebarMobile.classList.toggle("active", isOpen);
    sidebarOverlay?.classList.toggle("active", isOpen);
    menuMobile?.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  menuMobile?.addEventListener("click", () => toggleSidebar(true));
  sidebarClose?.addEventListener("click", () => toggleSidebar(false));
  sidebarOverlay?.addEventListener("click", () => toggleSidebar(false));
  sidebarNav?.addEventListener("click", (e) => {
    if (e.target.tagName === "A") toggleSidebar(false);
  });

  /* 2. FAQ ACCORDION */
  const faqContainer = document.querySelector(".faq-container") || document.body;
  faqContainer.addEventListener("click", (e) => {
    const button = e.target.closest(".faq-item button");
    if (!button) return;

    const answer = button.nextElementSibling;
    const isAlreadyOpen = answer.classList.contains("active");

    // Fecha todos os itens
    document.querySelectorAll(".faq-answer").forEach(ans => ans.classList.remove("active"));
    document.querySelectorAll(".faq-item button span").forEach(sp => sp.textContent = "+");

    // Abre apenas o clicado
    if (!isAlreadyOpen) {
      answer.classList.add("active");
      button.querySelector("span").textContent = "-";
    }
  });

  /* 3. BOTÃO VOLTAR AO TOPO */
  const backTop = document.getElementById("backTop");
  if (backTop) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          backTop.classList.toggle("active", window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    backTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* 4. ENVIO DE FORMULÁRIO VIA WHATSAPP */
  const quoteForm = document.getElementById("quoteForm");
  quoteForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const getVal = (id) => document.getElementById(id)?.value || "";
    const textoWhatsApp = `Olá! Gostaria de solicitar um orçamento.\n\n*Nome:* ${getVal("nome")}\n*Telefone:* ${getVal("telefone")}\n*Serviço:* ${getVal("servico")}\n*Mensagem:* ${getVal("mensagem")}`;
    
    window.open(`https://wa.me/5500000000000?text=${encodeURIComponent(textoWhatsApp)}`, "_blank");
  });

  /* 5. ANIMAÇÃO DE ELEMENTOS AO ROLAR */
  const hiddenElements = document.querySelectorAll(".hidden");
  if (hiddenElements.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    hiddenElements.forEach(el => observer.observe(el));
  }

  /* 6. CONTADORES ANIMADOS */
  const statsSection = document.querySelector(".stats");
  const numbers = document.querySelectorAll("[data-number]");

  if (statsSection && numbers.length > 0) {
    const animateCount = (el) => {
      const target = +el.getAttribute("data-number");
      const prefix = el.getAttribute("data-prefix") || "";
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1500;
      const startTime = performance.now();

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentVal = Math.floor(progress * target);
        
        el.innerHTML = `${prefix}${currentVal}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.innerHTML = `${prefix}${target}${suffix}`;
        }
      };

      requestAnimationFrame(update);
    };

    const statsObserver = new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) {
        numbers.forEach(num => animateCount(num));
        obs.unobserve(statsSection);
      }
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
  }
});