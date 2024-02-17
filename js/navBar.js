dibujarNav();


let navbar = document.getElementById("navbarIndex");

window.onscroll = () => {
    if (
        (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) &&
        navbar.className !=
        "navbar navbar-expand-lg navbar-dark navbar-transparente-desplegado fixed-top"
    ) {
        navbar.className =
            "navbar navbar-expand-lg navbar-dark navbar-scroll-abajo fixed-top";
    } else if (
        navbar.className !=
        "navbar navbar-expand-lg navbar-dark navbar-transparente-desplegado fixed-top"
    ) {
        navbar.className =
            "navbar navbar-expand-lg navbar-dark navbar-transparente fixed-top";
    }
};

if (window.location.pathname === "/index.html") {
    let modal = document.getElementById("modalDetalle"); //evento llamado solo para detener el video del modal en casi que se cierre el modal mientras este se reproduce, para que no se escuche el ruido del video mientras se continua en la pagina
    modal.addEventListener("hidden.bs.modal", () => (modal.innerHTML = ""));
}

let btnHambur = document.getElementById("btn-hambur");

btnHambur.addEventListener("click", () => {
    if (
        navbar.className ===
        "navbar navbar-expand-lg navbar-dark navbar-transparente fixed-top" ||
        navbar.className ===
        "navbar navbar-expand-lg navbar-dark navbar-scroll-abajo fixed-top"
    ) {
        navbar.className =
            "navbar navbar-expand-lg navbar-dark navbar-transparente-desplegado fixed-top";
    } else {
        navbar.className =
            "navbar navbar-expand-lg navbar-dark navbar-transparente fixed-top";
    }
});


function dibujarNav() {
    let _listaUsuarios = JSON.parse(localStorage.getItem('listaUsuariosLS'));
    let ulNavbar = document.getElementById("ulNavbar");

    let usuarioEnSesion = _listaUsuarios.find(usuario => usuario.enSesion);


    if (usuarioEnSesion != undefined && usuarioEnSesion.admin) {
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
                case "/":
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
