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



function dibujarModal(input){    // funcion para escribir los datos del objeto pelicula en el modal, aunque sin exito :(
    
    const modalPelicula = new bootstrap.Modal(document.getElementById("modalDetalle"));
    let _listaPelis = JSON.parse(localStorage.getItem('listaPelisKey'));

    let peliAbierta = _listaPelis.find(encontrada => encontrada.codigo === input.id);




    // modalPelicula.show();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // let modalDetalle = document.getElementById('seccionDetalle');
    // modalDetalle.innerHTML = "";
    // for (let i in listaPelicula){
    //     let detalleHTML = `<img src="img/series/detalle/${listaPelicula[i].imagen}" class="imagenDetalle" alt="portada ---">
    //     <div class="contenedorDetalle2">
    //         <h2>${listaPelicula[i].nombre}</h2>
    //         <div class="row py-5">
    //             <article class="col-lg-8 col-md-12">
    //                 <p>${listaPelicula[i].descripcion}</p>
    //             </article>
    //             <article class="col-lg-4 col-md-12 contBoton">
    //                 <a href="error404.html"><button type="button" class="btReproducir">Reproducir</button></a>
    //             </article>
    //         </div>
    //         <h3>Trailer</h3>
    //         ${listaPelicula[i].video}
    //     </div>`

    //     modalDetalle.innerHTML = detalleHTML;
    // }

}

function dibujarDestacados(){
    let _listaPelis = JSON.parse(localStorage.getItem('listaPelisKey'));  // trae el array de peliculas de LS a la variable _listaPelis
    let destacado = _listaPelis.find((encontrada)=>{
        return encontrada.destacado;
    });

    let sectionDestacado = `    
    <img class="img-cortada-centrada" src="img/series/drama/${destacado.imagen}" alt="${destacado.nombre}">
    <div class="texto-centrado">
        <div>
            <h2>${destacado.nombre}</h2>
            <p class="lead">${destacado.descripcion}</p>
        </div>
        <div class="botonesCabecera">
            <button type="button" class="btn btn-color-azul"><i class="fa-solid fa-play"></i><strong>  Ver</button>
            <button type="button" class="btn btn-color-blanco" onclick="dibujarModal(this)"><i class="fa-solid fa-circle-info"></i><strong>  Más Información</button>
        </div>
    </div>
    <div class="caja-sombra">
    </div>`;
    document.getElementById('seccionDestacado').innerHTML = sectionDestacado;
}