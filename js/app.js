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
        let dramaHTML = `<article class="col-sm-6 col-md-4 col-lg-3" >
        <a href="detalle.html" id="${categoriaDrama[i].codigo}" onclick="dibujarDetalle(this.id)"><img src="img/series/drama/${categoriaDrama[i].imagen}" alt="Pelicula/serie ${categoriaDrama[i].nombre}" class="imgSeries my-4"></a>
      </article>`;
      drama.innerHTML += dramaHTML;
    }

    for(let i in categoriaAccion){
        let accionHTML = `<article class="col-sm-6 col-md-4 col-lg-3">
        <a href="detalle.html" id="${categoriaAccion[i].codigo}"><img src="img/series/drama/${categoriaAccion[i].imagen}" alt="Pelicula/serie ${categoriaAccion[i].nombre}" class="imgSeries my-4"></a>
      </article>`;
      accion.innerHTML += accionHTML;
    }

    for(let i in categoriaComedia){
        let comediaHTML = `<article class="col-sm-6 col-md-4 col-lg-3">
        <a href="detalle.html" id="${categoriaComedia[i].codigo}"><img src="img/series/drama/${categoriaComedia[i].imagen}" alt="Pelicula/serie ${categoriaComedia[i].nombre}" class="imgSeries my-4"></a>
      </article>`;
      comedia.innerHTML += comediaHTML;
    }

    for(let i in categoriaInfantiles){
        let infantilHTML = `<article class="col-sm-6 col-md-4 col-lg-3">
        <a href="detalle.html" id="${categoriaInfantiles[i].codigo}"><img src="img/series/drama/${categoriaInfantiles[i].imagen}" alt="Pelicula/serie ${categoriaInfantiles[i].nombre}" class="imgSeries my-4"></a>
      </article>`;
      infantil.innerHTML += infantilHTML;
    }

}


