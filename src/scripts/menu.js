const boton = document.querySelector('.menu-btn');
const enlaces = document.querySelector('.enlaces');

boton.addEventListener('click', () => {
	enlaces.classList.toggle('abierto');
});
