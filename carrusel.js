let indiceActual = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;
const contenedorIndicadores = document.querySelector('.indicadores');

// Crear indicadores
for (let i = 0; i < totalSlides; i++) {
  const boton = document.createElement('button');
  boton.addEventListener('click', () => {
    indiceActual = i;
    mostrarSlide(indiceActual);
    reiniciarAutoAvance();
  });
  contenedorIndicadores.appendChild(boton);
}

// Función principal para mostrar un slide
function mostrarSlide(index) {
  const offset = -index * 100;
  slides.style.transform = `translateX(${offset}vw)`;

  // Actualizar clase activa en los puntitos
  const botonesIndicador = document.querySelectorAll('.indicadores button');
  botonesIndicador.forEach((btn, i) => {
    btn.classList.toggle('activo', i === index);
  });
}

// Botón siguiente
document.querySelector('.next').addEventListener('click', () => {
  indiceActual = (indiceActual + 1) % totalSlides;
  mostrarSlide(indiceActual);
  reiniciarAutoAvance();
});

// Botón anterior
document.querySelector('.prev').addEventListener('click', () => {
  indiceActual = (indiceActual - 1 + totalSlides) % totalSlides;
  mostrarSlide(indiceActual);
  reiniciarAutoAvance();
});

// Autoavance cada 5 segundos
let autoAvance = setInterval(() => {
  indiceActual = (indiceActual + 1) % totalSlides;
  mostrarSlide(indiceActual);
}, 5000);

// Función para reiniciar el intervalo cuando hay clics
function reiniciarAutoAvance() {
  clearInterval(autoAvance);
  autoAvance = setInterval(() => {
    indiceActual = (indiceActual + 1) % totalSlides;
    mostrarSlide(indiceActual);
  }, 5000);
}

// Mostrar el primer slide al cargar
mostrarSlide(indiceActual);
