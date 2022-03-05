import { Usuario } from "./pelisClass.js";

let listaUsuarios = [{nombre: 'Kevin Martín', nomUsuario: 'admin', email: 'kevmartin2001@gmail.com', telefono: '+5493816791746', contrasenia: 'admin', enSesion: false, aprobado: true, admin: true}];

inicializarUsuarios();

window.crearUsuario = function(event){

    event.preventDefault();
    let nombre = document.getElementById('nombreApellido');
    let nomUsuario = document.getElementById('nombreUsuario');
    let email = document.getElementById('email');
    let telelfono = document.getElementById('numeroTelefono');
    let contra = document.getElementById('contraseniaR');
    let contraR = document.getElementById('contraseniaRrep');
    let basesYcond = document.getElementById('derechos');
    if(
        validar(nombre,1) &&
        validar(nomUsuario,1) &&
        validar(email,3) &&
        validar(telelfono,2) &&
        compararContras(contra.value,contraR.value) &&
        basesYcond.checked
        ){
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
        localStorage.setItem("listaUsuariosLS",JSON.stringify(listaUsuarios));
        
    
            // alert de sweet alert 2
    Swal.fire(
        "Usuario en revisión",
        "EL nuevo usuario registrado se encuentra en proceso de revisión. Se le avisará su estado a traves del e-mail que introdujo",
        "warning"
    );
    location.href ='login.html';
    }
}

function inicializarUsuarios(){
    let _listaUsuarios = JSON.parse(localStorage.getItem('listaUsuariosLS'));

    if(_listaUsuarios === null){
        localStorage.setItem("listaUsuariosLS",JSON.stringify(listaUsuarios));
    }else{
        listaUsuarios = _listaUsuarios;
    }
}



// LOGIN


window.ingresar = function(event){
    event.preventDefault();
    let nomUsuBuscado = document.getElementById('nombreLogin');
    let contraBuscada = document.getElementById('contraLogin');

    let _listaUsuarios = JSON.parse(localStorage.getItem('listaUsuariosLS'));
    let nombreValido = false, contraValida = false;

    for(let i in _listaUsuarios){
        if(_listaUsuarios[i].nomUsuario === nomUsuBuscado.value || _listaUsuarios[i].email === nomUsuBuscado.value){
            nombreValido = true;
        }

        if(_listaUsuarios[i].contrasenia === contraBuscada.value){
            contraValida = true;
        }

        if(nombreValido && contraValida){
            for(let j in _listaUsuarios){
                if(_listaUsuarios[i].enSesion){
                    _listaUsuarios.enSesion = false;
                }
            }
            _listaUsuarios[i].enSesion = true;
            localStorage.setItem('listaUsuariosLS',JSON.stringify(_listaUsuarios));
            location.href ='index.html';
        }
    }

    if(!nombreValido){
        nomUsuBuscado.className = "login-input is-invalid";
    }else{
        if(!contraValida){
            contraBuscada.className = "login-input is-invalid";
        }
    }
}





// se ponen dos ensesion true si inicio sesion con dos cuentas distintas