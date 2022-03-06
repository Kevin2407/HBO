import { Usuario } from "./pelisClass.js";

let listaUsuarios = [{ nombre: 'Kevin Martín', nomUsuario: 'admin', email: 'kevmartin2001@gmail.com', telefono: '+5493816791746', contrasenia: 'admin', enSesion: false, aprobado: true, admin: true }];

inicializarUsuarios();

window.crearUsuario = function (event) {

    event.preventDefault();
    let nombre = document.getElementById('nombreApellido');
    let nomUsuario = document.getElementById('nombreUsuario');
    let email = document.getElementById('email');
    let telelfono = document.getElementById('numeroTelefono');
    let contra = document.getElementById('contraseniaR');
    let contraR = document.getElementById('contraseniaRrep');
    let basesYcond = document.getElementById('derechos');
    if (
        validar(nombre, 1) &&
        validar(nomUsuario, 1) &&
        validar(email, 3) &&
        validar(telelfono, 2) &&
        compararContras(contra.value, contraR.value) &&
        basesYcond.checked
    ) {
        let nuevoUsuario = new Usuario(
            nombre.value,
            nomUsuario.value,
            email.value,
            telelfono.value,
            contra.value,
            false,
            false,
            false
        );

        // guardar usuario en el array
        listaUsuarios.push(nuevoUsuario);
        // guardar usuarios en LS
        localStorage.setItem("listaUsuariosLS", JSON.stringify(listaUsuarios));


        // alert de sweet alert 2
        Swal.fire({
            title: 'Usuario en revisión',
            text: 'EL nuevo usuario registrado se encuentra en proceso de revisión. En un rato se le permitirá el ingreso',
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: 'Ok',
            confirmButtonColor: '#5f9ea0',
        }).then((result) => {
            if (result.isConfirmed) {
                location.href = 'login.html';
            }
        });
    }
}

function inicializarUsuarios() {
    let _listaUsuarios = JSON.parse(localStorage.getItem('listaUsuariosLS'));
    let c = 0;
    let enAdmin = false;

    if (_listaUsuarios === null) {
        localStorage.setItem("listaUsuariosLS", JSON.stringify(listaUsuarios));
    } else {
        listaUsuarios = _listaUsuarios;
    }

    for (let i in _listaUsuarios) {
        if (_listaUsuarios[i].enSesion) {
            c++;
            if (_listaUsuarios[i].admin) {
                enAdmin = true;
            }

        }

        if (c > 1) {
            _listaUsuarios[i].enSesion = false;
        }
    }
    if (c === 0 && (window.location.pathname != '/login.html' && window.location.pathname != '/registro.html')) {
        location.href = 'login.html';
    }
}



// LOGIN


window.ingresar = function (event) {
    event.preventDefault();
    let nomUsuBuscado = document.getElementById('nombreLogin');
    let contraBuscada = document.getElementById('contraLogin');
    let _listaUsuarios = JSON.parse(localStorage.getItem('listaUsuariosLS'));
    let nombreValido = false, contraValida = false;

    for (let i in _listaUsuarios) {
        if (_listaUsuarios[i].nomUsuario === nomUsuBuscado.value || _listaUsuarios[i].email === nomUsuBuscado.value) {
            nombreValido = true;
        }

        if (_listaUsuarios[i].contrasenia === contraBuscada.value) {
            contraValida = true;
        }

        if (nombreValido && contraValida && _listaUsuarios[i].aprobado) {
            for (let j in _listaUsuarios) {
                if (_listaUsuarios[i].enSesion) {
                    _listaUsuarios.enSesion = false;
                }
            }
            _listaUsuarios[i].enSesion = true;
            localStorage.setItem('listaUsuariosLS', JSON.stringify(_listaUsuarios));
            location.href = 'index.html';
        }else if(nombreValido && contraValida){
            nomUsuBuscado.className = 'login-input is-valid';
            contraBuscada.className = 'login-input is-valid';
            document.getElementById('msjNoCuenta').className = 'is-invalid';
        }


    }

    if (!nombreValido) {
        nomUsuBuscado.className = "login-input is-invalid";
        document.getElementById('msjNoCuenta').className = '';
    } else {
        if (!contraValida) {
            contraBuscada.className = "login-input is-invalid";
            document.getElementById('msjNoCuenta').className = '';
        }
    }
}


// cerrar sesion

window.cerrarSesion = function () {
    let _listaUsuarios = JSON.parse(localStorage.getItem('listaUsuariosLS'));

    Swal.fire({
        title: '¿Esta seguro de que desea cerrar sesión?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Cerrar sesión',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#5f9ea0',
    }).then((result) => {
        if (result.isConfirmed) {
            for (let i in _listaUsuarios) {
                _listaUsuarios[i].enSesion = false;
            }
            localStorage.setItem('listaUsuariosLS', JSON.stringify(_listaUsuarios));
            location.href = 'login.html';
        }
    });

}