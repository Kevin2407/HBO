// declaraciones




// verificaciones de agregar pelis

// funcion cumpleCondicion, su primer parametro es el input que obtiene el valor y el segundo parametro es la condicion que debe cumplir el valor de este input para ser validado. Siempre verifica que el input no quede vacio
function cumpleCondicion(input,condicion){
  if (input.value != "" && condicion) {
    input.className = "form-control is-valid";
    return true; // si se cumple la condicion, devuelve true
  } else {
    input.className = "form-control is-invalid";
    document.getElementById('divInvalidCodigo').innerHTML = "<p>Ingrese un número valido</p>";
      return false; // si no se cumple la condicion, devuelve false
  }
}

function validar(input,opcion){  // esta funcion recibe por primer parametro al input y por segundo parametro al numero que indica la condicion que debe cumplir
  let _b=true;  // booleano que indica que la condicion se cumple si es true o que no se cumple si es false
  switch(opcion){
    case 1:  // valida solo que el campo no este vacio
      _b = cumpleCondicion(input,true);
    break;
    case 2:  // Valida que el campo no este vacio y que todo sea numeros
    _b = cumpleCondicion(input,!isNaN(input.value));
    break;
    case 3:  // Valida que el campo no este vacio y que se ingrese un email
    _b = cumpleCondicion(input,(/\w+@\w+\.[a-z]{2,4}$/).test(input.value));
    break;
    case 4:  // Valida que el campo no este vacio y tenga una extension de imagen
    _b = cumpleCondicion(input,(/\.(jpg|png|gif|webp)$/i).test(img.value));
    break;
    case 5:  // Valida que el campo no este vacio y que todo sea numeros y el codigo no se repita
    _b = (cumpleCondicion(input,!isNaN(input.value)) && validarCodigo(input.value));
      break;
    }
  return _b; // la funcion regresa el valor segun se cumpla la condicion especificada en el numero del segundo parametro
}

function validarGeneral(event){
  event.preventDefault(); // funcion que evita que la pagina se refresque
  let alerta = document.getElementById('msjEnvio');
  if(
      validar(document.getElementById('nombrePeli'),1) &&
      validar(document.getElementById('codigo'),2) &&
      validar(document.getElementById('descripcion'),1) &&
      validar(document.getElementById('img'),4)
      ){
  }else{
    alerta.className = 'alert alert-danger mx-3';
    alerta.innerHTML = 'Ocurrio un error, verifique los datos ingresados.'; 
  }
}

function publicar(checkbox){
  if(checkbox.checked){ 
    checkbox.className = 'form-check-input is-valid';
    return true;
  }else{
    checkbox.className = 'form-check-input';
    return false
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








function validarCodigo(cod){ // esta funcion revisa que el codigo proporcionado no sea repetido
  let _b = false;
  let _listaPelis = JSON.parse(localStorage.getItem("listaPelisKey"));
  for(let i in _listaPelis){
    if(_listaPelis[i].codigo === cod)
      _b = true;
  }

  if (_b) {
    document.getElementById('divInvalidCodigo').innerHTML = "<p>El codigo introducido ya existe</p>";
    document.getElementById('codigo').className = "form-control is-invalid";
    return false; // si se cumple la condicion, devuelve true
  } else {
    document.getElementById('divInvalidCodigo').innerHTML = "";
    document.getElementById('codigo').className = "form-control is-valid";
      return true; // si no se cumple la condicion, devuelve false
    }
}

function limiteLetras(input){  // esta funcion revisa que la descripcion tenga entre 10 y 100 caracteres
  let _b,_c;
  if (input.value.length > 10) {
    _b = true;
  } else {
    _b = false;
  }

  if (input.value.length < 100) {
    _c = true;
  } else {
    _c = false;
  }

  if(_b && _c){
    input.className = "form-control is-valid";
  } else {
    input.className = "form-control is-invalid";
    document.getElementById('divInvalidDescripcion').innerHTML = `<p>La descripcion debe tener entre 10 y 100 caracteres (${input.value.length})</p>`;
  }

  return (_b && _c);
}


// registro

function compararContras(contra1,contra2){
  if(contra1 == contra2){
    return true;
  }else{
    document.getElementById('contraseniaRrep').className = "form-control is-invalid";
    return false;
  }
}

function compararUsuarios(nombreDeUsuario){
  let _listaUsuarios = JSON.parse(localStorage.getItem('listaUsuariosLS'));

  _
}