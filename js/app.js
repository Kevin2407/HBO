// logica pagina principal


// VARIABLES DE LAS CATEGORIAS

let categoriaDrama = [];
let drama = document.getElementById('grillasDrama');
let categoriaAccion = [];
let accion = document.getElementById('grillasAccion');
let categoriaComedia = [];
let comedia = document.getElementById('grillasComedia');
let categoriaInfantiles = [];
let infantil = document.getElementById('grillasInfantiles');


let listaPelicula = [];
let peliculaDestacada = [];

// DECLARACIONES DE FUNCIONES
leerPelicula();


let modal = document.getElementById('modalDetalle');  //evento llamado solo para detener el video del modal en casi que se cierre el modal mientras este se reproduce, para que no se escuche el ruido del video mientras se continua en la pagina
modal.addEventListener('hidden.bs.modal',()=>modal.innerHTML = "");



// FUNCIONES
function leerPelicula(){  // esta funcion trae los datos del LS 
    let destacada;
    if(localStorage.length > 0){  // si hay una lista en el LS
        listaPelicula = JSON.parse(localStorage.getItem('listaPelisKey'));
        peliculaDestacada = JSON.parse(localStorage.getItem('peliculaDestacadaKey'));

        for(let i in listaPelicula){
            switch(listaPelicula[i].categoria){
                case 'Drama':
                    categoriaDrama.push(listaPelicula[i]);
                break;
                case 'Accion':
                    categoriaAccion.push(listaPelicula[i]);
                break;
                case 'Comedia':
                    categoriaComedia.push(listaPelicula[i]);
                break;
                case 'Infantil':
                    categoriaInfantiles.push(listaPelicula[i]);
                break;
            }
            if(listaPelicula[i].destacada)
            destacada = listaPelicula[i];
        }
        dibujarPeli();
        dibujarDestacados();
    }
}

function dibujarPeli(){ //imprime el codigo de las cards de peliculas en las grillas del index, segun su categoria correspondiente
    // vaciar cards del inicio
    drama.innerHTML = "";
    accion.innerHTML = "";
    comedia.innerHTML = "";
    infantil.innerHTML = "";

        // Escribe el codigo HTML de la card en la grilla de drama
    for(let i in categoriaDrama){
        if(categoriaDrama[i].publicado){
            let dramaHTML = `<article class="col-sm-6 col-md-4 col-lg-3" >
            <button onclick="dibujarModal(this.id)" class="m-0 p-0 imgIndex" type="button" data-bs-toggle="modal" data-bs-target="#modalDetalle" id="${categoriaDrama[i].codigo}"><img src="img/series/drama/${categoriaDrama[i].imagen}" alt="Pelicula/serie ${categoriaDrama[i].nombre}" class="imgSeries"></button></article>`;
            drama.innerHTML += dramaHTML;
        }
    }

        // Escribe el codigo HTML de la card en la grilla de accion
    for(let i in categoriaAccion){
        if(categoriaAccion[i].publicado){
            let accionHTML = `<article class="col-sm-6 col-md-4 col-lg-3">
            <button onclick="dibujarModal(this.id)" class="m-0 p-0 imgIndex" type="button" data-bs-toggle="modal" data-bs-target="#modalDetalle" id="${categoriaAccion[i].codigo}"><img src="img/series/drama/${categoriaAccion[i].imagen}" alt="Pelicula/serie ${categoriaAccion[i].nombre}" class="imgSeries"></button>
            </article>`;
            accion.innerHTML += accionHTML;
        }
    }

        // Escribe el codigo HTML de la card en la grilla de comedia
    for(let i in categoriaComedia){
        if(categoriaComedia[i].publicado){
            let comediaHTML = `<article class="col-sm-6 col-md-4 col-lg-3">
            <button onclick="dibujarModal(this.id)" class="m-0 p-0 imgIndex" type="button" data-bs-toggle="modal" data-bs-target="#modalDetalle" id="${categoriaComedia[i].codigo}"><img src="img/series/drama/${categoriaComedia[i].imagen}" alt="Pelicula/serie ${categoriaComedia[i].nombre}" class="imgSeries"></button>
            </article>`;
            comedia.innerHTML += comediaHTML;
        }
    }

        // Escribe el codigo HTML de la card en la grilla de infantiles
    for(let i in categoriaInfantiles){
        if(categoriaInfantiles[i].publicado){
            let infantilHTML = `<article class="col-sm-6 col-md-4 col-lg-3">
            <button onclick="dibujarModal(this.id)" class="m-0 p-0 imgIndex" type="button" data-bs-toggle="modal" data-bs-target="#modalDetalle" id="${categoriaInfantiles[i].codigo}"><img src="img/series/drama/${categoriaInfantiles[i].imagen}" alt="Pelicula/serie ${categoriaInfantiles[i].nombre}" class="imgSeries"></button>
            </article>`;
            infantil.innerHTML += infantilHTML;
        }
    }
}


const modalPelicula = new bootstrap.Modal(document.getElementById("modalDetalle"));

window.dibujarModal = function(id){    // funcion para escribir los datos del objeto pelicula en el modal
    
    let detalle = document.getElementById('modalDetalle');
    let trailerHTML = "";
    let _listaPelis = JSON.parse(localStorage.getItem('listaPelisKey'));
    let peliAbierta = _listaPelis.find(encontrada => encontrada.codigo === id);
    let cBarra = 0;
    let vidURLcort = "https://www.youtube.com/embed/";

    for(let i in peliAbierta.video){
        if(peliAbierta.video[i] === "/"){
            cBarra++;
        }
        if(cBarra >= 3){
            vidURLcort += peliAbierta.video[i];
        }
    }


    if((/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/).test(peliAbierta.video)){ // si el video introducido es un enlace de youtube, entonces permite que aparezca en el modal
        trailerHTML = `
        <h3>Trailer</h3>
        <iframe class="trailer embed-responsive-item contIframe" src="${vidURLcort}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }




    let HTMLDetallePeliculas = `
    <div class="modal-dialog modal-lg">
      <div class="modal-content bg-transparent border-0 rounded-3">
        <section class="contenedorDetalleImg" id="seccionDetalle">
          <div class="contenedor">
            <img src="img/series/drama/${peliAbierta.imagen}" class="imagenDetalle rounded-3" alt="${peliAbierta.nombre}">
            <div class="texto-centrado">
              <div class="botonesCabecera">
                <a href="error404.html">
                  <button type="button" class="btn btn-color-blanco"><i class="fa-solid fa-play"></i><strong>  Ver</button>
                </a>
              </div>
          </div>
          <div class="caja-sombra noTanOsc">
          </div>
          </div>
          <div class="contenedorDetalle2">
              <div class="row">
                  <article class="col-lg-8 col-md-12">
                      <p class="descripcionDetalle lead">${peliAbierta.descripcion}</p>
                  </article>
                  <article class="col-lg-4 col-md-12 contBoton">
                    <p class="datosDetalle lead"><span class="textoDatosDetalle">Nombre:</span> ${peliAbierta.nombre}</p>
                    <p class="datosDetalle lead"><span class="textoDatosDetalle">Categoria:</span> ${peliAbierta.categoria}</p>
                    <p class="datosDetalle lead"><span class="textoDatosDetalle">Año:</span> 2022</p>
                  </article>
              </div>
            ${trailerHTML}
          </div>
      </section>
      </div>
    </div>`;



    detalle.innerHTML = HTMLDetallePeliculas;


    modalPelicula.show();
}

function dibujarDestacados(){
    let _listaPelis = JSON.parse(localStorage.getItem('listaPelisKey'));  // trae el array de peliculas de LS a la variable _listaPelis
    let destacado = _listaPelis.find((encontrada) => encontrada.destacado);
    console.log(destacado);

    let sectionDestacado = `    
    <img class="img-cortada-centrada" src="img/series/drama/${destacado.imagen}" alt="${destacado.nombre}">
    <div class="texto-centrado">
        <div>
            <h2>${destacado.nombre}</h2>
            <p class="lead">${destacado.descripcion}</p>
        </div>
        <div class="botonesCabecera">
            <a href="error404.html">
            <button type="button" class="btn btn-color-azul"><i class="fa-solid fa-play"></i><strong>  Ver</button>
            </a>
            <button type="button" class="btn btn-color-blanco" onclick="dibujarModal(this.id)" id="${destacado.codigo}" data-bs-toggle="modal" data-bs-target="#modalDetalle"><i class="fa-solid fa-circle-info"></i><strong>  Más Información</button>
        </div>
    </div>
    <div class="caja-sombra">
    </div>`;
    document.getElementById('seccionDestacado').innerHTML = sectionDestacado;
}