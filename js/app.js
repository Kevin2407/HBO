// logica pagina principal


// VARIABLES DE LAS CATEGORIAS

let categoriaDrama = [];
let drama = document.getElementById('grillasDrama');
let cajaDrama = document.getElementById('caja-drama');
let categoriaAccion = [];
let accion = document.getElementById('grillasAccion');
let cajaAccion = document.getElementById('caja-accion');
let categoriaComedia = [];
let comedia = document.getElementById('grillasComedia');
let cajaComedia = document.getElementById('caja-comedia');
let categoriaInfantiles = [];
let infantiles = document.getElementById('grillasInfantiles');
let cajaInfantiles = document.getElementById('caja-infantiles');


// titulos
let tDrama = document.getElementById('tDrama');
let tAccion = document.getElementById('tAccion');
let tComedia = document.getElementById('tComedia');
let tInfantiles = document.getElementById('tInfantiles');


let listaPelicula = [];

// DECLARACIONES DE FUNCIONES
leerPelicula();

window.onscroll = () => {

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("navbarIndex").className = "navbar navbar-expand-lg navbar-dark navbar-scroll-abajo fixed-top";
    } else {
        document.getElementById("navbarIndex").className = "navbar navbar-expand-lg navbar-dark navbar-transparente fixed-top";
    }
};

if(window.location.pathname === "/index.html"){
    let modal = document.getElementById('modalDetalle');  //evento llamado solo para detener el video del modal en casi que se cierre el modal mientras este se reproduce, para que no se escuche el ruido del video mientras se continua en la pagina
    modal.addEventListener('hidden.bs.modal', () => modal.innerHTML = "");
}

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

    if ((pagAnterior === "/login.html" || document.referrer === '' || document.referrer === 'http://127.0.0.1:5501/') && (window.location.pathname === "/index.html" || window.location.pathname === "5501/")) { // si el path de la pagina anterior es igual a login.html, aparece el cartel de bienvenida al usuario que acaba de ingresar
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
    } else {
        localStorage.setItem('listaPelisKey', JSON.stringify(listaPelicula));
    }
}

function dibujarTituloCategoria(listaCategoria, titulo, nombre) {
    if (listaCategoria.length > 0) {
        titulo.innerHTML = `<div><h5 class="tituloCategorias">${nombre}</h5></div>`
        return true;
    } else {
        titulo.innerHTML = "";
        return false;
    }
}

function dibujarPeli() { //imprime el codigo de las cards de peliculas en las grillas del index, segun su categoria correspondiente
    let cDibu;
    if(window.location.pathname === "/index.html"){
        let filtroTexto = document.getElementById('nombreFiltro');
        let filtroSelector = document.getElementById('categoriaFiltro');
    
        // vaciar cards del inicio
        dibujarTituloCategoria(categoriaDrama, tDrama, "Drama");
        dibujarTituloCategoria(categoriaAccion, tAccion, "Acción");
        dibujarTituloCategoria(categoriaComedia, tComedia, "Comedia");
        dibujarTituloCategoria(categoriaInfantiles, tInfantiles, "Infantiles");
    
        if (!dibujarTituloCategoria(categoriaDrama, tDrama, "Drama") &&
            !dibujarTituloCategoria(categoriaAccion, tAccion, "Acción") &&
            !dibujarTituloCategoria(categoriaComedia, tComedia, "Comedia") &&
            !dibujarTituloCategoria(categoriaInfantiles, tInfantiles, "Infantiles")) {
            document.getElementById('sectionBusqueda').innerHTML = `<h1>No hay peliculas</h1>`;
        }
    
        // booleanos que indican si parte del nombre introducido en el filtro se encuentra en el nombre de la peli
        let bDrama = false;
        let bAccion = false;
        let bComedia = false;
        let bInfantiles = false;
        let cont = 0;
    
        // Escribe el codigo HTML de la card en la grilla de drama
        drama.innerHTML = "";
        cDibu = 0;
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


            let dramaHTML = `<article class="peli" >
            <button onclick="dibujarModal(this.id)" class="m-0 p-0 mx-1 imgIndex" type="button" data-bs-toggle="modal" data-bs-target="#modalDetalle" id="${categoriaDrama[i].codigo}"><img src="img/series/fotos/${categoriaDrama[i].imagen}" alt="Pelicula/serie ${categoriaDrama[i].nombre}" class="imgSeries"></button></article>`;


            if (categoriaDrama[i].publicado && (filtroSelector.value === "Drama" || filtroSelector.value === "") && (bDrama || filtroTexto.value === "")) {
                drama.style.removeProperty('display');
                tDrama.style.removeProperty('display');
                cajaDrama.style.removeProperty('display');
                document.getElementById('btn-izquierdaD').style.removeProperty('display');
                document.getElementById('btn-derechaD').style.removeProperty('display');
                drama.innerHTML += dramaHTML;
                cDibu++;
                if(cDibu > 3){
                    document.getElementById('btn-izquierdaD').className = 'btn-flecha btn-izquierda';
                    document.getElementById('btn-derechaD').className = 'btn-flecha btn-derecha';
                }else{
                    document.getElementById('btn-izquierdaD').style.display = "none";
                    document.getElementById('btn-derechaD').style.display = "none";
                }
            } else if (drama.innerHTML === ``) {
                drama.innerHTML = '';
                drama.style.display = "none";
                tDrama.style.display = "none";
                cajaDrama.style.display= "none";
                document.getElementById('btn-izquierdaD').style.display = "none";
                document.getElementById('btn-derechaD').style.display = "none";
            }
        }
    
        // Escribe el codigo HTML de la card en la grilla de accion
        accion.innerHTML = "";
        cDibu = 0;
        for (let i in categoriaAccion) {
            cont = 0;
            for (let j in categoriaAccion[i].nombre) {
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


            let accionHTML = `<article class="peli" >
            <button onclick="dibujarModal(this.id)" class="m-0 p-0 mx-1 imgIndex" type="button" data-bs-toggle="modal" data-bs-target="#modalDetalle" id="${categoriaAccion[i].codigo}"><img src="img/series/fotos/${categoriaAccion[i].imagen}" alt="Pelicula/serie ${categoriaAccion[i].nombre}" class="imgSeries"></button></article>`;


            if (categoriaAccion[i].publicado && (filtroSelector.value === "Accion" || filtroSelector.value === "") && (bAccion || filtroTexto.value === "")) {
                accion.style.removeProperty('display');
                tAccion.style.removeProperty('display');
                cajaAccion.style.removeProperty('display');
                document.getElementById('btn-izquierdaA').style.removeProperty('display');
                document.getElementById('btn-derechaA').style.removeProperty('display');
                accion.innerHTML += accionHTML;
                cDibu++;
                console.log(bAccion,cDibu)
                if(cDibu > 3){
                    document.getElementById('btn-izquierdaA').className = 'btn-flecha btn-izquierda';
                    document.getElementById('btn-derechaA').className = 'btn-flecha btn-derecha';
                    console.log(cDibu)
                }else{
                    document.getElementById('btn-izquierdaA').style.display = "none";
                document.getElementById('btn-derechaA').style.display = "none";
                }
            } else if (accion.innerHTML === ``) {
                accion.innerHTML = '';
                accion.style.display = "none";
                tAccion.style.display = "none";
                cajaAccion.style.display= "none";
                document.getElementById('btn-izquierdaA').style.display = "none";
                document.getElementById('btn-derechaA').style.display = "none";
            }
        }
    
        // Escribe el codigo HTML de la card en la grilla de comedia
        comedia.innerHTML = "";
        cDibu = 0;
        for (let i in categoriaComedia) {
            cont = 0;
            for (let j in categoriaComedia[i].nombre) {
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


            let comediaHTML = `<article class="peli" >
            <button onclick="dibujarModal(this.id)" class="m-0 p-0 mx-1 imgIndex" type="button" data-bs-toggle="modal" data-bs-target="#modalDetalle" id="${categoriaComedia[i].codigo}"><img src="img/series/fotos/${categoriaComedia[i].imagen}" alt="Pelicula/serie ${categoriaComedia[i].nombre}" class="imgSeries"></button></article>`;


            if (categoriaComedia[i].publicado && (filtroSelector.value === "Comedia" || filtroSelector.value === "") && (bComedia || filtroTexto.value === "")) {
                comedia.style.removeProperty('display');
                tComedia.style.removeProperty('display');
                cajaComedia.style.removeProperty('display');
                document.getElementById('btn-izquierdaC').style.removeProperty('display');
                document.getElementById('btn-derechaC').style.removeProperty('display');
                comedia.innerHTML += comediaHTML;
                cDibu++;
                console.log(bComedia,cDibu)
                if(cDibu > 3){
                    document.getElementById('btn-izquierdaC').className = 'btn-flecha btn-izquierda';
                    document.getElementById('btn-derechaC').className = 'btn-flecha btn-derecha';
                    console.log(cDibu)
                }else{
                    document.getElementById('btn-izquierdaC').style.display = "none";
                document.getElementById('btn-derechaC').style.display = "none";
                }
            } else if (comedia.innerHTML === ``) {
                comedia.innerHTML = '';
                comedia.style.display = "none";
                tComedia.style.display = "none";
                cajaComedia.style.display= "none";
                document.getElementById('btn-izquierdaC').style.display = "none";
                document.getElementById('btn-derechaC').style.display = "none";
            }
        }
    
        // Escribe el codigo HTML de la card en la grilla de infantiles
        infantiles.innerHTML = "";
        cDibu = 0;
        for (let i in categoriaInfantiles) {
            cont = 0;
            for (let j in categoriaInfantiles[i].nombre) {
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


            let infantilesHTML = `<article class="peli" >
            <button onclick="dibujarModal(this.id)" class="m-0 p-0 mx-1 imgIndex" type="button" data-bs-toggle="modal" data-bs-target="#modalDetalle" id="${categoriaInfantiles[i].codigo}"><img src="img/series/fotos/${categoriaInfantiles[i].imagen}" alt="Pelicula/serie ${categoriaInfantiles[i].nombre}" class="imgSeries"></button></article>`;


            if (categoriaInfantiles[i].publicado && (filtroSelector.value === "Infantiles" || filtroSelector.value === "") && (bInfantiles || filtroTexto.value === "")) {
                infantiles.style.removeProperty('display');
                tInfantiles.style.removeProperty('display');
                cajaInfantiles.style.removeProperty('display');
                document.getElementById('btn-izquierdaI').style.removeProperty('display');
                document.getElementById('btn-derechaI').style.removeProperty('display');
                infantiles.innerHTML += infantilesHTML;
                cDibu++;
                if(cDibu > 3){
                    document.getElementById('btn-izquierdaI').className = 'btn-flecha btn-izquierda';
                    document.getElementById('btn-derechaI').className = 'btn-flecha btn-derecha';
                    console.log(cDibu)
                }else{
                    document.getElementById('btn-izquierdaI').style.display = "none";
                document.getElementById('btn-derechaI').style.display = "none";
                }
            } else if (infantiles.innerHTML === ``) {
                infantiles.innerHTML = '';
                infantiles.style.display = "none";
                tInfantiles.style.display = "none";
                cajaInfantiles.style.display= "none";
                document.getElementById('btn-izquierdaI').style.display = "none";
                document.getElementById('btn-derechaI').style.display = "none";
            }
        }
    }
}

function mover(direccion,categoriaScroll){
    if(direccion === "izquierda"){
        categoriaScroll.scrollLeft -= 700;
    }else if (direccion === "derecha"){
        categoriaScroll.scrollLeft += 700;
    }
}

window.moverPeliculas = function(direccion,categoria){
    console.log(drama.scrollLeft)
    mover(direccion,categoria);
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
            <img src="img/series/fotos/${peliAbierta.imagen}" class="imagenDetalle rounded-3" alt="${peliAbierta.nombre}">
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
    if(window.location.pathname === "/index.html"){
        let _listaPelis = JSON.parse(localStorage.getItem('listaPelisKey'));  // trae el array de peliculas de LS a la variable _listaPelis
        if (_listaPelis.length > 0) {
    
            let destacado = _listaPelis.find((encontrada) => encontrada.destacado);
    
            if (destacado != undefined) {
                let sectionDestacado = `    
            <img class="img-cortada-centrada" src="img/series/fotos/${destacado.imagen}" alt="${destacado.nombre}">
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
    
        }
    }
}

function dibujarNav() {
    let _listaUsuarios = JSON.parse(localStorage.getItem('listaUsuariosLS'));

    let usuarioEnSesion
    for (let i in _listaUsuarios) {
        if (_listaUsuarios[i].enSesion) {
            usuarioEnSesion = _listaUsuarios[i];
        }
    }

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


function enviarMail(event) {
    event.preventDefault();
    // envioelmail.then(funcion si todo salio bien, funcion cuando algo salio mal)
    emailjs.send("service_2qem7iv","template_44pwlfj", {
        to_name: "Administrador",
        from_name: document.getElementById('email').value,
        message_html: `Nombre y Apellido: ${document.getElementById('nombreApellido').value} -
        Telefono: ${document.getElementById('numeroTelefono').value} -
        Consulta: ${document.getElementById('consulta').value}`,
    }).then(
        function (response) {
            console.log(response);
            // vaciar inputs
            document.getElementById('nombreApellido').value = "";
            document.getElementById('nombreApellido').className = "form-control";
            document.getElementById('email').value = "";
            document.getElementById('email').className = "form-control";
            document.getElementById('numeroTelefono').value = "";
            document.getElementById('numeroTelefono').className = "form-control";
            document.getElementById('consulta').value = "";
            document.getElementById('consulta').className = "form-control";

            // agregar el alerta que todo salio bien
            Swal.fire({
                title: `Su consulta fue enviada`,
                showConfirmButton: true,
                confirmButtonText: 'Ok',
                confirmButtonColor: '#5f9ea0',
                })
        }, function (error) {
            console.log(error);
            Swal.fire({
                title: `Hubo un error al enviar su consulta. Intente nuevamente mas tarde`,
                showConfirmButton: true,
                confirmButtonText: 'Ok',
                confirmButtonColor: '#5f9ea0',
                })
        }
    )
}