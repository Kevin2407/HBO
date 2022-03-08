import { Usuario } from "./pelisClass.js";

let listaUsuarios = [{ nombre: 'Kevin Martín', nomUsuario: 'admin', email: 'kevmartin2001@gmail.com', telefono: '+5493816791746', contrasenia: 'admin', enSesion: false, aprobado: true, admin: true }];

inicializarUsuarios();

window.crearUsuario = function (event) {

    event.preventDefault();
    let nombre = document.getElementById('nombreApellido');
    let nomUsuario = document.getElementById('nombreUsuario');
    let email = document.getElementById('emailR');
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
    if (c === 0 && (window.location.pathname != '/login.html' && window.location.pathname != '/registro.html' && window.location.pathname != '/rec-contra.html')) {
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

    let usuarioIngresado = _listaUsuarios.find(usuario => usuario.nomUsuario === nomUsuBuscado.value || usuario.email === nomUsuBuscado.value);
    let indiceUsuarioIngresado = _listaUsuarios.findIndex(usuario => usuario.nomUsuario === nomUsuBuscado.value || usuario.email === nomUsuBuscado.value);

    if (usuarioIngresado != undefined) {
        nombreValido = true;
        if (usuarioIngresado.contrasenia === contraBuscada.value) {
            contraValida = true;
        }
    }
    if (nombreValido && contraValida && usuarioIngresado.aprobado) {
        for (let i in _listaUsuarios) {
            if (_listaUsuarios[i].enSesion) {
                _listaUsuarios[i].enSesion = false;
            }
        }
        usuarioIngresado.enSesion = true;
        _listaUsuarios[indiceUsuarioIngresado] = usuarioIngresado;
        localStorage.setItem('listaUsuariosLS', JSON.stringify(_listaUsuarios));
        location.href = 'index.html';
    }else if(nombreValido && contraValida){
        nomUsuBuscado.className = 'login-input is-valid';
        contraBuscada.className = 'login-input is-valid';
        document.getElementById('msjNoCuenta').className = 'is-invalid';
    }


    if (!nombreValido) {
        nomUsuBuscado.className = "login-input is-invalid";
        document.getElementById('msjNoCuenta').className = '';
    } else {
        nomUsuBuscado.className = "login-input is-valid";
        document.getElementById('msjNoCuenta').className = '';
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


// recuperacion de contraseña

window.recContra = function(){
    let _listaUsuarios = JSON.parse(localStorage.getItem('listaUsuariosLS'));
    let usuario;
    Swal.fire({
        title: 'Introduzca su email para recuperar la contraseña',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Enviar',
        confirmButtonColor: '#5f9ea0',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
            let b;
            usuario = _listaUsuarios.find(cuenta => cuenta.email === login);
            if(usuario === undefined){
                Swal.showValidationMessage(
                    `El email ${login} no esta registrado`
                )
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
        if (result.isConfirmed) {
            console.log(usuario);
            emailjs.send("service_2qem7iv","template_l3vqgtj",{
                to_name: usuario.nombre,
                from_name: "HBO GO",
                message: `Hola ${usuario.nombre}, ingresando a este link podras recuperar tu contraseña: https://hbo-go.netlify.app/rec-contra.html`,
                }).then((response)=>{
                    console.log(response);
                },(error)=>{
                    console.log(error);
                    alert("Ocurrió un error al enviar la consulta");
                })
            Swal.fire({
            title: `Se le envió un mail de recuperación de contraseña`,
            showConfirmButton: true,
            confirmButtonText: 'Ok',
            confirmButtonColor: '#5f9ea0',
            })
        }
    })
}

