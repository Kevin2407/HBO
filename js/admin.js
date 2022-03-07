import { Pelicula } from "./pelisClass.js";




// DECLARACION DE VARIABLES

let listaPelis = []; //array donde se guardaran las peliculas, que luego se agregan al LS y se traen del LS tambien
const modalPelis = new bootstrap.Modal(document.getElementById("modalPelis")); //trae el modal de bootstrap para usar sus metodos como show y hide
let existePeli = false; //variable booleana. Si es false, la peli no existe y estoy en funcion agregar, si es true, la peli existe y estoy en funcion modificar
let btnModalOpen = document.getElementById("btnModalOpen"); // boton agregar pelicula

// LLAMADAS A FUNCIONES
leerDatosPelis();
leerDatosUsuarios();
// EVENTLISTENERS

btnModalOpen.addEventListener("click", () => { // llamada al modal al presionar boton de agregar pelicula
  limpiarFormulario();
  document.getElementById("tituloModal").innerHTML = "Agregar Pelicula/Serie";
  document.getElementById("labelCodigo").innerHTML = 'Código <span class="text-danger">*</span>';
  document.getElementById('codigo').removeAttribute("disabled");
  modalPelis.show();
});


// FUNCIONES


window.agregarPeli = function () {
  let alerta = document.getElementById("msjEnvio");
  let codigo = document.getElementById("codigo");
  let nombre = document.getElementById("nombrePeli");
  let categoria = document.getElementById("categoria");
  let descripcion = document.getElementById("descripcion");
  let check = publicar(document.getElementById("publiCheck"));
  let img = document.getElementById("img");
  let video = document.getElementsByTagName('video');

  if (
    validar(codigo, 2) &&
    validarCodigo(codigo.value) &&
    validar(nombre, 1) &&
    limiteLetras(descripcion) &&
    validar(img, 4) &&
    validar(video, 1)
  ) {
    // crear nueva peli
    let nuevaPeli = new Pelicula(
      codigo.value,
      nombre.value,
      categoria.value,
      descripcion.value,
      check,
      img.value,
      video.value,
      false
    );


    // guardar peli en la lista
    listaPelis.push(nuevaPeli);

    // guardar los datos en localStorage
    localStorage.setItem("listaPelisKey", JSON.stringify(listaPelis));

    // alert de sweet alert 2
    Swal.fire(
      "¡Excelente!",
      "Se ha añadido la nueva pelicula/serie",
      "success"
    );

    // mostrar cartel de datos guardados
    limpiarFormulario();

    // leer datos

    leerDatosPelis();

    // cerrar la ventana modal

    modalPelis.hide();

    // eliminar alert si es que apareció
    if ((alerta.className = "alert alert-danger mx-3")) {
      alerta.className = "alert alert-danger mx-3 d-none";

    } else {
      alerta.className = "alert alert-danger mx-3";
      alerta.innerHTML = "Ocurrio un error, verifique los datos ingresados.";
    }
  }
};

function limpiarFormulario() {
  let formulario = document.getElementById("formPeliculas");
  formulario.reset();

  // quitar las tildes de verificacion de los input al resetear

  document.getElementById("codigo").className = "form-control";
  document.getElementById("nombrePeli").className = "form-control";
  document.getElementById("descripcion").className = "form-control";
  document.getElementById("publiCheck").className = "form-check-input";
  document.getElementById("img").className = "form-control";
  document.getElementById("video").className = "form-control";

  // // alert de se enviaron los datos

  // document.getElementById('msjEnvio').className = 'alert alert-success mx-3';
  // document.getElementById('msjEnvio').innerHTML = '<p>Se a añadido una nueva película</p>'

  existePeli = false;
}

function leerDatosPelis() {
  // esta funcion se encargar de leer los datos almacenados en el localStorage
  if (localStorage.length > 0) {
    let _listaPelisProvisoria = JSON.parse(localStorage.getItem("listaPelisKey"));

    if (listaPelis.length === 0) {
      listaPelis = _listaPelisProvisoria;
    }
    dibujarDatos(_listaPelisProvisoria);
  }
}

function dibujarDatos(_listaPelisProvisoria) {
  let TablaPelis = document.getElementById("tBodyPelis");
  let dest = ''
  TablaPelis.innerHTML = '';
  let codigoHTML = "";

  for (let i in _listaPelisProvisoria) { // revisa si la pelicula esta publicada y establece el texto que dice si esta publicada o no
    let publi;
    if (_listaPelisProvisoria[i].publicado) {
      publi = "Publicado";
    } else {
      publi = "No publicado";
    }

    if (_listaPelisProvisoria[i].destacado) { // revisa que elemento esta destacado e introduce la clase que rellena la estrella
      dest = 'fas';
    } else {
      dest = 'far';
    }
    // codigo de cada fila a introducir con las respectivas variables del formulario
    codigoHTML = `
    <tr>
        <th scope="row">${_listaPelisProvisoria[i].codigo}</th>
        <td scope="row">${_listaPelisProvisoria[i].nombre}</td>
        <td scope="row">${_listaPelisProvisoria[i].categoria}</td>
        <td scope="row">${_listaPelisProvisoria[i].descripcion.substring(0, 20) + "..."}</td>
        <td scope="row">${publi}</td>
        <td scope="row">${_listaPelisProvisoria[i].imagen}</td>
        <td class="">
        <button class="btn btn-primary bPaddEdit" onclick="modificarPelis(this)" id="${_listaPelisProvisoria[i].codigo}">
        <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-danger bPaddTrash" onclick="eliminarPeli(this)" id="${_listaPelisProvisoria[i].codigo}">
                <i class="fas fa-trash-alt"></i>
            </button>
            <button class="${dest} fa-star fa-2x text-warning border-0 bg-transparent" onclick="destacar(this)" id="destacar${_listaPelisProvisoria[i].codigo}">
            </button>
            </td>
            </tr>
            `;

    TablaPelis.innerHTML += codigoHTML;
  }
}


window.eliminarPeli = function (peli) {
  Swal.fire({
    title: '¿Estas seguro?',
    text: "Si lo haces, no podras revertirlo",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Si, borrar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      let pelisFiltradas = listaPelis.filter(function (pelicuFil) {
        return pelicuFil.codigo != peli.id;
      })
      listaPelis = pelisFiltradas;
      localStorage.setItem('listaPelisKey', JSON.stringify(listaPelis));
      leerDatosPelis();



      Swal.fire(
        '¡Borrado!',
        'La pelicula fue borrada',
        'success'
      )
    }
  })
}


window.modificarPelis = function (btnEditar) {

  // limpiar formulario
  limpiarFormulario()

  // buscar el objeto a modificar
  let peliEncontrada = listaPelis.find((pelic) => {
    return pelic.codigo === btnEditar.id;
  });

  console.log(document.getElementById('publiCheck'));
  // cargar los datos en el formulario

  document.getElementById('codigo').value = peliEncontrada.codigo;
  document.getElementById('nombrePeli').value = peliEncontrada.nombre;
  document.getElementById('categoria').value = peliEncontrada.categoria;
  document.getElementById('descripcion').value = peliEncontrada.descripcion;
  document.getElementById('img').value = peliEncontrada.imagen;
  document.getElementById('video').value = peliEncontrada.video;

  if (peliEncontrada.publicado) { // si la peli esta publicada, el checkbox esta en checked, sino, esta vacio
    document.getElementById('publiCheck').className = 'form-check-input is-valid';
    document.getElementById('publiCheck').setAttribute("checked", "");
  } else {
    document.getElementById('publiCheck').className = 'form-check-input';
    document.getElementById('publiCheck').removeAttribute("checked");
  }



  existePeli = true;

  document.getElementById("tituloModal").innerHTML = "Modificar Pelicula/Serie";
  document.getElementById("labelCodigo").innerHTML = "Codigo";
  document.getElementById('codigo').setAttribute("disabled", "");



  modalPelis.show();
}

window.guardarPeli = function (event) {
  event.preventDefault();

  if (existePeli === true) {
    actualizarDatosPelis()

  } else {
    agregarPeli();
  }
}


function actualizarDatosPelis() {
  let codigo = document.getElementById('codigo');
  let nombre = document.getElementById('nombrePeli');
  let categoria = document.getElementById('categoria');
  let descripcion = document.getElementById('descripcion');
  let publiCheck = publicar(document.getElementById('publiCheck'));
  let imagen = document.getElementById('img');
  let video = document.getElementById('video');

  if (
    validar(nombre, 1) &&
    limiteLetras(descripcion) &&
    validar(imagen, 4) &&
    validar(video, 1)) {
    for (let i in listaPelis) {
      if (listaPelis[i].codigo === codigo.value) {
        listaPelis[i].nombre = nombre.value;
        listaPelis[i].categoria = categoria.value;
        listaPelis[i].descripcion = descripcion.value;
        listaPelis[i].publicado = publiCheck;
        listaPelis[i].imagen = imagen.value;
        listaPelis[i].video = video.value;
      }
    }

    localStorage.setItem('listaPelisKey', JSON.stringify(listaPelis));
    limpiarFormulario();
    modalPelis.hide();
    Swal.fire(
      'Modificación exitosa!',
      'Los datos de la pelicula han sido modificados',
      'success'
    );

    leerDatosPelis();
  }

}


window.destacar = function (estrella) {  // funcion que destaca una pelicula al presionar sobre el boton estrella. Solo se puede destacar una pelicula, y al presionar el boton, se rellena la estrella cambiandole la clase.
  let _listaPelis = JSON.parse(localStorage.getItem('listaPelisKey'));  // trae el array de peliculas de LS a la variable _listaPelis
  let btnEstrella;

  for (let i in _listaPelis) {  // recorre uno por uno los elementos de pelicula de array para ver que el seleccionado sea el unico destacado
    btnEstrella = document.getElementById(`destacar${_listaPelis[i].codigo}`);
    if (btnEstrella.id === estrella.id) { // si el codigo del boton presionado coincide con el id de la pelicula, significa que esta es la pelicula que queremos destacar, y procede a rellenar la estrella y poner su variable en true
      if (_listaPelis[i].destacado) {
        btnEstrella.className = "far fa-star fa-2x text-warning border-0 bg-transparent";
        _listaPelis[i].destacado = false;
      } else {
        btnEstrella.className = "fas fa-star fa-2x text-warning border-0 bg-transparent";
        _listaPelis[i].destacado = true;
      }
    }
    if (_listaPelis[i].destacado && btnEstrella.id != estrella.id) {  // si esta destacado, quita la clase que rellena la estrella y pone la variable destacado en false
      btnEstrella.className = "far fa-star fa-2x text-warning border-0 bg-transparent";
      _listaPelis[i].destacado = false;
    }
  }
  localStorage.setItem('listaPelisKey', JSON.stringify(_listaPelis)); // manda el nuevo array con el nuevo destacado al LS

}


// PARTE DE USUARIOS

function leerDatosUsuarios() {
  let _listaUsuarios = JSON.parse(localStorage.getItem('listaUsuariosLS'));
  let codigoUsuarioHTML = "";
  let tBodyUsuarios = document.getElementById('tBodyUsuarios');

  tBodyUsuarios.innerHTML = "";

  for(let i in _listaUsuarios){
    codigoUsuarioHTML = `
    <tr>
    <th scope="row">${_listaUsuarios[i].nomUsuario}</th>
        <td scope="row">${_listaUsuarios[i].nombre}</td>
        <td scope="row">${_listaUsuarios[i].email}</td>
        <td scope="row">${_listaUsuarios[i].telefono}</td>
        <td scope="row" class="text-center"><input type="checkbox" class="form-check-input" id="check${_listaUsuarios[i].nomUsuario}" onchange="aprobar(this)"></td>
        <td class="">
        <button class="btn btn-danger bPaddTrash" onclick="borrarUsuario(this)" id="${_listaUsuarios[i].nomUsuario}">
        <i class="fas fa-trash-alt"></i>
            </button>
        </td>
    </tr>
            `;
    if(!_listaUsuarios[i].admin){
      tBodyUsuarios.innerHTML += codigoUsuarioHTML;
      console.log(document.getElementById(`check${_listaUsuarios[i].nomUsuario}`));
      if(_listaUsuarios[i].aprobado){
        document.getElementById(`check${_listaUsuarios[i].nomUsuario}`).setAttribute('checked','');
      }
    }
  }
}

window.aprobar = function(input){
  let _listaUsuarios = JSON.parse(localStorage.getItem('listaUsuariosLS'));
  let usuario = _listaUsuarios.find( (usu) => "check" + usu.nomUsuario === input.id);
  if(input.checked){
    usuario.aprobado = true;
  }else{
    usuario.aprobado = false;
  }
  localStorage.setItem('listaUsuariosLS',JSON.stringify(_listaUsuarios))
}

window.borrarUsuario = function(input){
  Swal.fire({
    title: '¿Estas seguro?',
    text: "Si lo haces, no podras revertirlo",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Si, borrar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      let _listaUsuarios = JSON.parse(localStorage.getItem('listaUsuariosLS'));
      let usuariosFiltrados = _listaUsuarios.filter(function (usuFil) {
        return usuFil.nomUsuario != input.id;
      })
      localStorage.setItem('listaUsuariosLS', JSON.stringify(usuariosFiltrados));
      leerDatosUsuarios();



      Swal.fire(
        '¡Borrado!',
        'El usuario fue borrado',
        'success'
      )
    }
  })
}