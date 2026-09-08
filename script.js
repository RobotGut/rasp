document.addEventListener("DOMContentLoaded", () => {
  /* MENU MOBILE */
  const menuMobile = document.getElementById("menuMobile");
  const nav = document.getElementById("nav");

  if (menuMobile && nav) {
    menuMobile.addEventListener("click", () => nav.classList.toggle("active"));
    document.querySelectorAll(".nav a").forEach(link => {
      link.addEventListener("click", () => nav.classList.remove("active"));
    });
  }

  /* FAQ ACCORDION */
  document.querySelectorAll(".faq-item button").forEach(button => {
    button.addEventListener("click", () => {
      const answer = button.nextElementSibling;
      const icon = button.querySelector("span");
      const isActive = answer.classList.toggle("active");
      if (icon) icon.textContent = isActive ? "-" : "+";
    });
  });

  /* BOTÃO VOLTAR AO TOPO */
  const backTop = document.getElementById("backTop");
  window.addEventListener("scroll", () => {
    if (backTop) backTop.classList.toggle("active", window.scrollY > 500);
  });

  if (backTop) {
    backTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* SCROLL SUAVE PARA LINKS INTERNOS */
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

  /* CONTADORES (Intersection Observer) */
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

  /* FORMULÁRIO WHATSAPP */
  const quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    quoteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = quoteForm.nome.value;
      const telefone = quoteForm.telefone.value;
      const servico = quoteForm.servico.value;
      const mensagem = quoteForm.mensagem.value;

      const texto = `Olá! Gostaria de solicitar um orçamento.\n\n*Nome:* ${nome}\n*Telefone:* ${telefone}\n*Serviço:* ${servico}\n*Detalhes:* ${mensagem}`;
      const numero = "5500000000000"; 
      window.open(`https://wa.me/${numero}?text=${encodeURIComponent(texto)}`, "_blank");
    });
  }

  /* MÁSCARA TELEFONE */
  const phoneInput = document.querySelector('input[name="telefone"]');
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let v = e.target.value.replace(/\D/g, "");
      if (v.length > 11) v = v.substring(0, 11);
      if (v.length > 10) {
        v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
      } else if (v.length > 5) {
        v = v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
      } else if (v.length > 2) {
        v = v.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
      }
      e.target.value = v;
    });
  }

  /* ANIMAÇÃO DE REVELAÇÃO AO ROLAR */
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

  /* ANO DINÂMICO NO FOOTER */
  const copyright = document.querySelector(".copyright");
  if (copyright) {
    copyright.innerHTML = `© ${new Date().getFullYear()} Rasp. Todos os direitos reservados.`;
  }
});