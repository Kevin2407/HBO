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
            console.log('pedo')
        }else{
            alerta.className = 'alert alert-danger mx-3';
            alerta.innerHTML = 'Ocurrio un error, verifique los datos ingresados.'; 
        }
}