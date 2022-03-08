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

window.onscroll = () => {

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("navbarIndex").className = "navbar navbar-expand-lg navbar-dark navbar-scroll-abajo fixed-top";
    } else {
        document.getElementById("navbarIndex").className = "navbar navbar-expand-lg navbar-dark navbar-transparente fixed-top";
    }
};


let modal = document.getElementById('modalDetalle');  //evento llamado solo para detener el video del modal en casi que se cierre el modal mientras este se reproduce, para que no se escuche el ruido del video mientras se continua en la pagina
modal.addEventListener('hidden.bs.modal', () => modal.innerHTML = "");

document.querySelector('body').addEventListener('load', dibujarNav);

// FUNCIONES
function leerPelicula() {  // esta funcion trae los datos del LS 
    let c = 0;
    let linkAnterior = document.referrer;
    let pagAnterior = "";
    for (let i in linkAnterior) { //obtengo el path del link de la pagina anterior al index.html
        if (linkAnterior[i] == "/") {
            c++;
        }
        if (c > 2) {
            pagAnterior += linkAnterior[i];
        }
    }

    if (pagAnterior === "/login.html" && window.location.pathname === "/index.html") { // si el path de la pagina anterior es igual a login.html, aparece el cartel de bienvenida al usuario que acaba de ingresar
        Swal.fire({
            title: 'Bienvenido a HBO GO',
            text: 'En esta plataforma podra ver las mejores series y peliculas',
            showConfirmButton: false,
            showDenyButton: false,
            showCancelButton: true,
            cancelButtonText: 'OK',
            cancelButtonColor: '#5f9ea0',
        });
    }

    if (localStorage.length > 0) {  // si hay una lista en el LS
        listaPelicula = JSON.parse(localStorage.getItem('listaPelisKey'));
        peliculaDestacada = JSON.parse(localStorage.getItem('peliculaDestacadaKey'));

        for (let i in listaPelicula) {
            switch (listaPelicula[i].categoria) {
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
            if (listaPelicula[i].destacada)
                destacada = listaPelicula[i];
        }
        dibujarPeli();
        dibujarDestacados();
    }
}

function dibujarPeli() { //imprime el codigo de las cards de peliculas en las grillas del index, segun su categoria correspondiente
    let filtroTexto = document.getElementById('nombreFiltro');
    let filtroSelector = document.getElementById('categoriaFiltro');
    // vaciar cards del inicio
    drama.innerHTML = `<h5 class="tituloCategorias">Drama</h5>`;
    accion.innerHTML = `<h5 class="tituloCategorias">Acción</h5>`;
    comedia.innerHTML = `<h5 class="tituloCategorias">Comedia</h5>`;
    infantil.innerHTML = `<h5 class="tituloCategorias">Infantiles</h5>`;

    // booleanos que indican si parte del nombre introducido en el filtro se encuentra en el nombre de la peli
    let bDrama = false;
    let bAccion = false;
    let bComedia = false;
    let bInfantiles = false;
    let cont = 0;

    // Escribe el codigo HTML de la card en la grilla de drama
    for (let i in categoriaDrama) {
        cont = 0;
        for (let j in categoriaDrama[i].nombre) {
            if (filtroTexto.value[j] != undefined) {
                if (filtroTexto.value[j] === categoriaDrama[i].nombre[j] || filtroTexto.value[j].toUpperCase() === categoriaDrama[i].nombre[j] || filtroTexto.value[j].toLowerCase() === categoriaDrama[i].nombre[j]) {
                    cont++;
                }
            }
        }
        if (cont === filtroTexto.value.length) {
            bDrama = true;
        } else {
            bDrama = false;
        }
        if (categoriaDrama[i].publicado && (filtroSelector.value === "Drama" || filtroSelector.value === "") && (bDrama || filtroTexto.value === "")) {
            let dramaHTML = `<article class="col-sm-6 col-md-4 col-lg-3" >
            <button onclick="dibujarModal(this.id)" class="m-0 p-0 imgIndex" type="button" data-bs-toggle="modal" data-bs-target="#modalDetalle" id="${categoriaDrama[i].codigo}"><img src="img/series/drama/${categoriaDrama[i].imagen}" alt="Pelicula/serie ${categoriaDrama[i].nombre}" class="imgSeries"></button></article>`;
            drama.innerHTML += dramaHTML;
            drama.className = 'row text-center mb-5';
        } else if (drama.innerHTML === `<h5 class="tituloCategorias">Drama</h5>`) {
            drama.innerHTML = '';
            drama.className = 'display-none';
        }
    }

    // Escribe el codigo HTML de la card en la grilla de accion
    for (let i in categoriaAccion) {
        cont = 0;
        for (let j in filtroTexto.value) {
            if (filtroTexto.value[j] != undefined) {
                if (filtroTexto.value[j] === categoriaAccion[i].nombre[j] || filtroTexto.value[j].toUpperCase() === categoriaAccion[i].nombre[j] || filtroTexto.value[j].toLowerCase() === categoriaAccion[i].nombre[j]) {
                    cont++;
                }
            }
        }
        if (cont === filtroTexto.value.length) {
            bAccion = true;
        } else {
            bAccion = false;
        }
        if (categoriaAccion[i].publicado && (filtroSelector.value === "Accion" || filtroSelector.value === "") && (bAccion || filtroTexto.value === "")) {
            let accionHTML = `<article class="col-sm-6 col-md-4 col-lg-3">
            <button onclick="dibujarModal(this.id)" class="m-0 p-0 imgIndex" type="button" data-bs-toggle="modal" data-bs-target="#modalDetalle" id="${categoriaAccion[i].codigo}"><img src="img/series/drama/${categoriaAccion[i].imagen}" alt="Pelicula/serie ${categoriaAccion[i].nombre}" class="imgSeries"></button>
            </article>`;
            accion.innerHTML += accionHTML;
            accion.className = 'row text-center mb-5';
        } else if (accion.innerHTML === `<h5 class="tituloCategorias">Acción</h5>`) {
            accion.innerHTML = '';
            accion.className = 'display-none';
        }
    }

    // Escribe el codigo HTML de la card en la grilla de comedia
    for (let i in categoriaComedia) {
        cont = 0;
        for (let j in filtroTexto.value) {
            if (filtroTexto.value[j] != undefined) {
                if (filtroTexto.value[j] === categoriaComedia[i].nombre[j] || filtroTexto.value[j].toUpperCase() === categoriaComedia[i].nombre[j] || filtroTexto.value[j].toLowerCase() === categoriaComedia[i].nombre[j]) {
                    cont++;
                }
            }
        }
        if (cont === filtroTexto.value.length) {
            bComedia = true;
        } else {
            bComedia = false;
        }
        if (categoriaComedia[i].publicado && (filtroSelector.value === "Comedia" || filtroSelector.value === "") && (bComedia || filtroTexto.value === "")) {
            let comediaHTML = `<article class="col-sm-6 col-md-4 col-lg-3">
            <button onclick="dibujarModal(this.id)" class="m-0 p-0 imgIndex" type="button" data-bs-toggle="modal" data-bs-target="#modalDetalle" id="${categoriaComedia[i].codigo}"><img src="img/series/drama/${categoriaComedia[i].imagen}" alt="Pelicula/serie ${categoriaComedia[i].nombre}" class="imgSeries"></button>
            </article>`;
            comedia.innerHTML += comediaHTML;
            comedia.className = 'row text-center mb-5';
        } else if (comedia.innerHTML === `<h5 class="tituloCategorias">Comedia</h5>`) {
            comedia.innerHTML = '';
            comedia.className = 'display-none';
        }
    }

    // Escribe el codigo HTML de la card en la grilla de infantiles
    for (let i in categoriaInfantiles) {
        cont = 0;
        for (let j in filtroTexto.value) {
            if (filtroTexto.value[j] != undefined) {
                if (filtroTexto.value[j] === categoriaInfantiles[i].nombre[j] || filtroTexto.value[j].toUpperCase() === categoriaInfantiles[i].nombre[j] || filtroTexto.value[j].toLowerCase() === categoriaInfantiles[i].nombre[j]) {
                    cont++;
                }
            }
        }
        if (cont === filtroTexto.value.length) {
            bInfantiles = true;
        } else {
            bInfantiles = false;
        }
        if (categoriaInfantiles[i].publicado && (filtroSelector.value === "Infantil" || filtroSelector.value === "") && (bInfantiles || filtroTexto.value === "")) {
            let infantilHTML = `<article class="col-sm-6 col-md-4 col-lg-3">
            <button onclick="dibujarModal(this.id)" class="m-0 p-0 imgIndex" type="button" data-bs-toggle="modal" data-bs-target="#modalDetalle" id="${categoriaInfantiles[i].codigo}"><img src="img/series/drama/${categoriaInfantiles[i].imagen}" alt="Pelicula/serie ${categoriaInfantiles[i].nombre}" class="imgSeries"></button>
            </article>`;
            infantil.innerHTML += infantilHTML;
            infantil.className = 'row text-center mb-5';
        } else if (infantil.innerHTML === `<h5 class="tituloCategorias">Infantiles</h5>`) {
            infantil.innerHTML = '';
            infantil.className = 'display-none';
        }
    }
}


const modalPelicula = new bootstrap.Modal(document.getElementById("modalDetalle"));

window.dibujarModal = function (id) {    // funcion para escribir los datos del objeto pelicula en el modal

    let detalle = document.getElementById('modalDetalle');
    let trailerHTML = "";
    let _listaPelis = JSON.parse(localStorage.getItem('listaPelisKey'));
    let peliAbierta = _listaPelis.find(encontrada => encontrada.codigo === id);
    let cBarra = 0;
    let vidURLcort = "https://www.youtube.com/embed/";

    for (let i in peliAbierta.video) {
        if (peliAbierta.video[i] === "/") {
            cBarra++;
        }
        if (cBarra >= 3) {
            vidURLcort += peliAbierta.video[i];
        }
    }


    if ((/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/).test(peliAbierta.video)) { // si el video introducido es un enlace de youtube, entonces permite que aparezca en el modal
        trailerHTML = `
        <h3>Trailer</h3>
        <iframe class="trailer embed-responsive-item contIframe" src="${vidURLcort}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }




    let HTMLDetallePeliculas = `
    <div class="modal-dialog modal-lg">
      <div class="modal-content bg-transparent border-0 rounded-3">
        <section class="contenedorDetalleImg" id="seccionDetalle">
          <div class="contenedor">
            <button class="btnCerrar bg-transparent border-0" type="button" data-bs-dismiss="modal" aria-label="Close"><i class="fa-solid fa-xmark fa-2x text-light"></i></button>
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

function dibujarDestacados() {
    let _listaPelis = JSON.parse(localStorage.getItem('listaPelisKey'));  // trae el array de peliculas de LS a la variable _listaPelis
    let destacado = _listaPelis.find((encontrada) => encontrada.destacado);

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

function dibujarNav() {
    let _listaUsuarios = JSON.parse(localStorage.getItem('listaUsuariosLS'));

    let usuarioEnSesion = _listaUsuarios.find((usuario) => usuario.enSesion);

    if (usuarioEnSesion.admin) {
        let ulNavbar = document.getElementById("ulNavbar");
        switch (window.location.pathname) {
            case "/index.html":
                ulNavbar.innerHTML = `
                <li class="nav-item active">
                    <a class="nav-link active" href="index.html">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="contacto.html">Contacto</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="acerca-de.html">Acerca de nosotros</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="admin.html">Administración</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" type="button" onclick="cerrarSesion()">Cerrar Sesión</a>
                </li>`;
                break;
            case "/contacto.html":
                ulNavbar.innerHTML = `
                <li class="nav-item">
                    <a class="nav-link" href="index.html">Inicio</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link active" href="contacto.html">Contacto</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="acerca-de.html">Acerca de nosotros</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="admin.html">Administración</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" type="button" onclick="cerrarSesion()">Cerrar Sesión</a>
                </li>`;
                break;
            case "/admin.html":
                ulNavbar.innerHTML = `
                <li class="nav-item">
                    <a class="nav-link" href="index.html">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="contacto.html">Contacto</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="acerca-de.html">Acerca de nosotros</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link active" href="admin.html">Administración</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" type="button" onclick="cerrarSesion()">Cerrar Sesión</a>
                </li>`;
                break;
            case "/acerca-de.html":
                ulNavbar.innerHTML = `
                <li class="nav-item">
                    <a class="nav-link" href="index.html">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="contacto.html">Contacto</a>
                </li>
                <li class="nav-item active">
                <a class="nav-link active" href="acerca-de.html">Acerca de nosotros</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="admin.html">Administración</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" type="button" onclick="cerrarSesion()">Cerrar Sesión</a>
                </li>`;
                break;
        }
    }
}