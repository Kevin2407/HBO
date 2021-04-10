import{Pelicula} from './pelisClass.js'


// window.destacar = function(estrella){

//     if(document.getElementById("star").className = "far fa-star fa-2x text-warning"){
//         document.getElementById("star").className = "fas fa-star fa-2x text-warning";
//     }else{
//         if(document.getElementById("star").className = "fas fa-star fa-2x text-warning"){
//             document.getElementById("star").className = "far fa-star fa-2x text-warning";
//         }
//     }
// }


let listaPelis = [];

window.agregarPeli = function (event){
    event.preventDefault();
    let alerta = document.getElementById('msjEnvio');
    if(
        veriCod(document.getElementById('codigo')) &&
        veriTexto(document.getElementById('nombrePeli')) &&
        veriTexto(document.getElementById('descripcion')) &&
        validImg(document.getElementById('img'))
    ){
    
        // crear nueva peli 
        let nuevaPeli = new Pelicula(document.getElementById('codigo').value, document.getElementById('nombrePeli').value, document.getElementById('categoria').value, document.getElementById('descripcion').value, document.getElementById('publiCheck').value, document.getElementById('img').value)


        // guardar peli en la lista
        listaPelis.push(nuevaPeli)


        // guardar los datos en localStorage
        localStorage.setItem('ListaPeliculas', JSON.stringify(listaPelis));

        // alert de sweet alert 2
        Swal.fire(
            '¡Excelente!',
            'Se ha añadido la nueva pelicula/serie',
            'success'
          )

        // mostrar cartel de datos guardados
        limpiarFormulario()

        // eliminar alert si es que apareció
        if(alerta.className = "alert alert-danger mx-3"){
            alerta.className = "alert alert-danger mx-3 d-none"
        }
          

        
       
        }else{
            alerta.className = 'alert alert-danger mx-3';
            alerta.innerHTML = 'Ocurrio un error, verifique los datos ingresados.'; 
        }
}

function limpiarFormulario(){
   let formulario = document.getElementById('formPeliculas');
   formulario.reset();

    // quitar las tildes de verificacion de los input al resetear
    
    document.getElementById("codigo").className = 'form-control';
    document.getElementById("nombrePeli").className = 'form-control';
    document.getElementById("descripcion").className = 'form-control';
    document.getElementById("publiCheck").className = 'form-check-input';
    document.getElementById("img").className = 'form-control';
    
    // // alert de se enviaron los datos

    // document.getElementById('msjEnvio').className = 'alert alert-success mx-3';
    // document.getElementById('msjEnvio').innerHTML = '<p>Se a añadido una nueva película</p>'


}