// verificaciones de agregar pelis

function veriCod(codigo){
    if (codigo.value != "" && !isNaN(codigo.value)) {
        codigo.className = "form-control is-valid";
        return true;
      } else {
        codigo.className = "form-control is-invalid";
        return false;
      }
}

function veriTexto(input){
    if(input.value != ""){
        input.className = "form-control is-valid";
        return true;
      }else{
        input.className = "form-control is-invalid";
        return false;
      }
}


function publicar(checkbox){
    if(checkbox.checked){ 
        checkbox.className = 'form-check-input is-valid';
        return true;
}else{
  return false
}}




function validImg(img){
    if (img.value != "" && (/\.(jpg|png|gif|webp)$/i).test(img.value)) {
        img.className = "form-control is-valid";
        return true;
      }else{
        img.className = "form-control is-invalid";
        return false;
    }
}

function validarGeneral(event){
    event.preventDefault();
    let alerta = document.getElementById('msjEnvio');
    if(
        veriCod(document.getElementById('codigo')) &&
        veriTexto(document.getElementById('nombrePeli')) &&
        veriTexto(document.getElementById('descripcion')) &&
        validImg(document.getElementById('img'))
        ){
        }else{
            alerta.className = 'alert alert-danger mx-3';
            alerta.innerHTML = 'Ocurrio un error, verifique los datos ingresados.'; 
        }
}

function validarMail(input) {
  //emilse@gmail.com
  let expresion = /\w+@\w+\.[a-z]{2,4}$/;
  if (input.value != "" && expresion.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

function enviarMail(){
  // envioelmail.then(funcion si todo salio bien, funcion cuando algo salio)
  emailjs.send("service_skyw81f","template_NQ91Q5cI",{
    to_name: "Administrador",
    from_name: document.getElementById('email').value,
    message_html: `Nombre y Apellido: ${document.getElementById('nombre').value} -
    Telefono: ${document.getElementById('telefono').value} -
    Consulta: ${document.getElementById('consulta').value}`,
    }).then(
      function (response){
        console.log(response);
        // agregar el alerta que todo salio bien
        alert('los datos se enviaron');
      }, function (error){
        console.log(error);
        alert('fallo el envio');
      }
    )
}
