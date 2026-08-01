/* =========================
MENU MOBILE
========================= */


const menuMobile = document.getElementById("menuMobile");

const nav = document.getElementById("nav");



if(menuMobile){


menuMobile.addEventListener("click",()=>{


    nav.classList.toggle("active");


});


}




/* Fechar menu ao clicar */

document.querySelectorAll(".nav a").forEach(link=>{


link.addEventListener("click",()=>{


    nav.classList.remove("active");


});


});








/* =========================
FAQ
========================= */


const faqButtons =
document.querySelectorAll(".faq-item button");



faqButtons.forEach(button=>{


button.addEventListener("click",()=>{


    const answer =
    button.nextElementSibling;


    answer.classList.toggle("active");



    const icon =
    button.querySelector("span");



    if(answer.classList.contains("active")){


        icon.textContent="-";


    }else{


        icon.textContent="+";


    }



});


});








/* =========================
BOTÃO VOLTAR AO TOPO
========================= */


const backTop =
document.getElementById("backTop");



window.addEventListener("scroll",()=>{


if(window.scrollY > 500){


    backTop.classList.add("active");


}else{


    backTop.classList.remove("active");


}



});





if(backTop){


backTop.addEventListener("click",()=>{


window.scrollTo({

top:0,

behavior:"smooth"

});


});


}








/* =========================
SCROLL SUAVE
========================= */


document.querySelectorAll('a[href^="#"]').forEach(anchor=>{


anchor.addEventListener("click",function(e){


const target =
document.querySelector(
this.getAttribute("href")
);



if(target){


e.preventDefault();



target.scrollIntoView({

behavior:"smooth",

block:"start"

});


}



});


});








/* =========================
CONTADORES
========================= */


const counters =
document.querySelectorAll("[data-number]");



let started=false;



function startCounters(){


if(started) return;



const stats =
document.querySelector(".stats");



if(!stats) return;



const position =
stats.getBoundingClientRect().top;



if(position <
window.innerHeight - 100){



started=true;



counters.forEach(counter=>{


let current=0;


const target =
Number(counter.dataset.number);



const speed =
target / 80;



const update=()=>{


current += speed;



if(current < target){


counter.textContent =
Math.floor(current);


requestAnimationFrame(update);



}else{


counter.textContent =
target;



}



};



update();



});



}



}





window.addEventListener(
"scroll",
startCounters
);



startCounters();
/* =========================
FORMULÁRIO WHATSAPP
========================= */


const quoteForm =
document.getElementById("quoteForm");



if(quoteForm){


quoteForm.addEventListener("submit",(e)=>{


e.preventDefault();



const nome =
quoteForm.nome.value;



const telefone =
quoteForm.telefone.value;



const servico =
quoteForm.servico.value;



const mensagem =
quoteForm.mensagem.value;



const texto =

`Olá! Gostaria de solicitar um orçamento.

Nome: ${nome}

Telefone: ${telefone}

Serviço: ${servico}

Detalhes:
${mensagem}`;



const numero =
"5500000000000";



const url =

`https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;



window.open(url,"_blank");



});



}








/* =========================
MÁSCARA TELEFONE
========================= */


const phoneInput =
document.querySelector(
'input[name="telefone"]'
);



if(phoneInput){


phoneInput.addEventListener(
"input",
()=>{


let value =
phoneInput.value.replace(/\D/g,"");



if(value.length > 11){

value =
value.substring(0,11);

}



value =
value.replace(
(/^(\d{2})(\d)/g,"($1) $2")
);



value =
value.replace(
/(\d)(\d{4})$/,
"$1-$2"
);



phoneInput.value =
value;



});


}








/* =========================
ANIMAÇÕES NO SCROLL
========================= */


const animatedElements =
document.querySelectorAll(
".service-card, .feature-card, .project-card, .testimonial-card, .process-item"
);



const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.classList.add(
"show"
);



observer.unobserve(
entry.target
);



}



});



},
{

threshold:0.15

}

);





animatedElements.forEach(element=>{


element.classList.add("hidden");


observer.observe(element);



});








/* =========================
PRELOAD DE IMAGENS IMPORTANTES
========================= */


const importantImages = [

"img/hero.webp"

];



importantImages.forEach(src=>{


const img =
new Image();


img.src =
src;



});








/* =========================
ANO AUTOMÁTICO FOOTER
========================= */


const year =
document.querySelector(
".copyright"
);



if(year){


const currentYear =
new Date().getFullYear();



year.innerHTML =

`© ${currentYear} Rasp. Todos os direitos reservados.`;


}
