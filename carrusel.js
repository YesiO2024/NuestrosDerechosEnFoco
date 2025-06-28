const slides = document.querySelector('.slides');
const slideCount = document.querySelectorAll('.slide').length;
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const indicadores = document.querySelector('.indicadores');

let index = 0;

// Crear botones indicadores
for(let i=0; i < slideCount; i++){
  const btn = document.createElement('button');
  if(i === 0) btn.classList.add('activo');
  btn.addEventListener('click', () => {
    index = i;
    moverCarrusel();
  });
  indicadores.appendChild(btn);
}

function moverCarrusel(){
  slides.style.transform = `translateX(${-index * 100}vw)`;
  
  // actualizar indicadores
  indicadores.querySelectorAll('button').forEach((btn, i) => {
    btn.classList.toggle('activo', i === index);
  });
  
  // desactivar flechas según índice
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === slideCount - 1;

  // clase visual opcional
  prevBtn.classList.toggle('disabled', index === 0);
  nextBtn.classList.toggle('disabled', index === slideCount - 1);
}

// eventos flechas
prevBtn.addEventListener('click', () => {
  if(index > 0) {
    index -= 1;
    moverCarrusel();
  }
});

nextBtn.addEventListener('click', () => {
  if(index < slideCount - 1) {
    index += 1;
    moverCarrusel();
  }
});

// inicializar estados
moverCarrusel();
