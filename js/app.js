// variables de las categorias

let categoriaDrama = [];
let drama = document.getElementById('grillasDrama');
let categoriaAccion = [];
let accion = document.getElementById('grillasAccion');
let categoriaComedia = [];
let comedia = document.getElementById('grillasComedia');
let categoriaInfantiles = [];
let infantil = document.getElementById('grillasInfantiles');

// logica pagina principal

let listaPelicula = [];
let peliculaDestacada = [];


leerPelicula();

function leerPelicula(){
    // esta funcion trae los datos del LS 
    if(localStorage.length > 0){
        listaPelicula = JSON.parse(localStorage.getItem('listaPelisKey'));
        peliculaDestacada = JSON.parse(localStorage.getItem('peliculaDestacadaKey'));

        for(let i in listaPelicula){
            if(listaPelicula[i].categoria === 'Drama'){
                categoriaDrama.push(listaPelicula[i]);
            }
        }

        for(let i in listaPelicula){
            if(listaPelicula[i].categoria === 'Accion'){
                categoriaAccion.push(listaPelicula[i]);
            }
        }

        for(let i in listaPelicula){
            if(listaPelicula[i].categoria === 'Comedia'){
                categoriaComedia.push(listaPelicula[i]);
            }
        }

        for(let i in listaPelicula){
            if(listaPelicula[i].categoria === 'Infantil'){
                categoriaInfantiles.push(listaPelicula[i]);
            }
        }


        dibujarPeli();
    }
}

function dibujarPeli(){
    drama.innerHTML = "";
    accion.innerHTML = "";
    comedia.innerHTML = "";
    infantil.innerHTML = "";

    for(let i in categoriaDrama){
        let dramaHTML = `<article class="col-sm-6 col-md-4 col-lg-3 my-4" >
        <button onclick="dibujarModal(this.id)" class="m-0 p-0 imgIndex" type="button" data-bs-toggle="modal" data-bs-target="#modalDetalle" id="${categoriaDrama[i].codigo}"><img src="img/series/drama/${categoriaDrama[i].imagen}" alt="Pelicula/serie ${categoriaDrama[i].nombre}" class="imgSeries"></button>
      </article>`;
      drama.innerHTML += dramaHTML;
    }

    for(let i in categoriaAccion){
        let accionHTML = `<article class="col-sm-6 col-md-4 col-lg-3 my-4">
        <button onclick="dibujarModal(this.id)" class="m-0 p-0 imgIndex" type="button" data-bs-toggle="modal" data-bs-target="#modalDetalle" id="${categoriaAccion[i].codigo}"><img src="img/series/drama/${categoriaAccion[i].imagen}" alt="Pelicula/serie ${categoriaAccion[i].nombre}" class="imgSeries"></button>
      </article>`;
      accion.innerHTML += accionHTML;
    }

    for(let i in categoriaComedia){
        let comediaHTML = `<article class="col-sm-6 col-md-4 col-lg-3 my-4">
        <button onclick="dibujarModal(this.id)" class="m-0 p-0 imgIndex" type="button" data-bs-toggle="modal" data-bs-target="#modalDetalle" id="${categoriaComedia[i].codigo}"><img src="img/series/drama/${categoriaComedia[i].imagen}" alt="Pelicula/serie ${categoriaComedia[i].nombre}" class="imgSeries"></button>
      </article>`;
      comedia.innerHTML += comediaHTML;
    }

    for(let i in categoriaInfantiles){
        let infantilHTML = `<article class="col-sm-6 col-md-4 col-lg-3 my-4">
        <button onclick="dibujarModal(this.id)" class="m-0 p-0 imgIndex" type="button" data-bs-toggle="modal" data-bs-target="#modalDetalle" id="${categoriaInfantiles[i].codigo}"><img src="img/series/drama/${categoriaInfantiles[i].imagen}" alt="Pelicula/serie ${categoriaInfantiles[i].nombre}" class="imgSeries"></button>
      </article>`;
      infantil.innerHTML += infantilHTML;
    }

}


// funcion para escribir los datos del objeto pelicula en el modal, aunque sin exito :(

function dibujarModal(){
    let modalDetalle = document.getElementById('seccionDetalle');
    modalDetalle.innerHTML = "";
    for (let i in listaPelicula){
        let detalleHTML = `<img src="img/series/detalle/${listaPelicula[i].imagen}" class="imagenDetalle" alt="portada ---">
        <div class="contenedorDetalle2">
            <h2>${listaPelicula[i].nombre}</h2>
            <div class="row py-5">
                <article class="col-lg-8 col-md-12">
                    <p>${listaPelicula[i].descripcion}</p>
                </article>
                <article class="col-lg-4 col-md-12 contBoton">
                    <a href="error404.html"><button type="button" class="btReproducir">Reproducir</button></a>
                </article>
            </div>
            <h3>Trailer</h3>
            ${listaPelicula[i].video}
        </div>`

        modalDetalle.innerHTML = detalleHTML;
    }

}
