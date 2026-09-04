document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     MENU MOBILE
  ========================= */
  const menuMobile = document.getElementById("menuMobile");
  const nav = document.getElementById("nav");

  if (menuMobile && nav) {
    menuMobile.addEventListener("click", () => nav.classList.toggle("active"));

    /* Fechar menu ao clicar nos links */
    document.querySelectorAll(".nav a").forEach(link => {
      link.addEventListener("click", () => nav.classList.remove("active"));
    });
  }

  /* =========================
     FAQ ACCORDION
  ========================= */
  document.querySelectorAll(".faq-item button").forEach(button => {
    button.addEventListener("click", () => {
      const answer = button.nextElementSibling;
      const icon = button.querySelector("span");

      const isActive = answer.classList.toggle("active");
      if (icon) icon.textContent = isActive ? "-" : "+";
    });
  });

  /* =========================
     BOTÃO VOLTAR AO TOPO & HEADER SCROLL
  ========================= */
  const backTop = document.getElementById("backTop");

  window.addEventListener("scroll", () => {
    if (backTop) {
      backTop.classList.toggle("active", window.scrollY > 500);
    }
  });

  if (backTop) {
    backTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* =========================
     SCROLL SUAVE
  ========================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* =========================
     CONTADORES (Interception Observer)
  ========================= */
  const counters = document.querySelectorAll("[data-number]");
  const statsSection = document.querySelector(".stats");

  if (counters.length && statsSection) {
    let started = false;

    const startCounters = () => {
      counters.forEach(counter => {
        let current = 0;
        const target = Number(counter.dataset.number);
        const speed = target / 80;

        const update = () => {
          current += speed;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(update);
          } else {
            counter.textContent = target;
          }
        };
        update();
      });
    };

    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        startCounters();
        statsObserver.disconnect();
      }
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }

  /* =========================
     FORMULÁRIO WHATSAPP
  ========================= */
  const quoteForm = document.getElementById("quoteForm");

  if (quoteForm) {
    quoteForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = quoteForm.nome.value;
      const telefone = quoteForm.telefone.value;
      const servico = quoteForm.servico.value;
      const mensagem = quoteForm.mensagem.value;

      const texto = `Olá! Gostaria de solicitar um orçamento.

*Nome:* ${nome}
*Telefone:* ${telefone}
*Serviço:* ${servico}
*Detalhes:* ${mensagem}`;

      const numero = "5500000000000"; // Substitua pelo seu número real com DDD
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

      window.open(url, "_blank");
    });
  }

  /* =========================
     MÁSCARA DE TELEFONE
  ========================= */
  const phoneInput = document.querySelector('input[name="telefone"]');

  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");

      if (value.length > 11) value = value.substring(0, 11);

      if (value.length > 10) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
      } else if (value.length > 6) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
      } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
      }

      e.target.value = value;
    });
  }

  /* =========================
     ANIMAÇÕES NO SCROLL (Observer)
  ========================= */
  const animatedElements = document.querySelectorAll(
    ".service-card, .feature-card, .project-card, .testimonial-card, .process-item"
  );

  if (animatedElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animatedElements.forEach(element => {
      element.classList.add("hidden");
      observer.observe(element);
    });
  }

  /* =========================
     ANO AUTOMÁTICO FOOTER
  ========================= */
  const copyright = document.querySelector(".copyright");
  if (copyright) {
    copyright.innerHTML = `© ${new Date().getFullYear()} Rasp. Todos os direitos reservados.`;
  }
});