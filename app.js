let pagina = 1;//esta pagina se mostrara a los usuarios al imgresar a la pagina
const btnAnterior = document.getElementById('btnAnterior');//accedemos al boton anterior(para regresar)
const btnSiguiente = document.getElementById('btnSiguiente');//accedemos al boton siguiente(para ir a la pagina siguiente)

btnSiguiente.addEventListener('click', () => {//ejecutara la funcion de tipo fleca que hara que cambie de pagina
	if(pagina < 1000){//preguntamos si la pagina es menor a 1000 seguira sumando paginas pero si ya llego a mil ya no lo hara
		pagina += 1;
		cargarPeliculas();
	}
});

btnAnterior.addEventListener('click', () => {//hacemos que al presionar el boton siguiente cambie de pagina 1 a pagina 2 y asi sucesivamente
	if(pagina > 1){//aqui declaramos que si las paginas son mayor 1 seguira restando pero cuando sea igual a 1 ya no lo hara
		pagina -= 1;
		cargarPeliculas();
	}
});

const cargarPeliculas = async() => {
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=c5ee6165c547d6bdb2e8317763487db7&language=es-MX&page=${pagina}`);
	
		console.log(respuesta);

		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			
			let peliculas = '';//lista vacia en donde se guardan las peliculas
			//ponemos la imagen de las peliculas
			datos.results.forEach(pelicula => {
				peliculas += `
					<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
					</div>
				`;
			});

			document.getElementById('contenedor').innerHTML = peliculas;
		//los else son para obtener una respuesta en caso de tener errores resultados
		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('La pelicula que buscas no se encuentra');
		} else {
			console.log('Ocurrio un error que no se hadetectado de donde probiene');
		}

	} catch(error){
		console.log(error);
	}

}

cargarPeliculas();