import { Pelicula } from "./pelisClass.js";


// intento de destacar la estrella
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
const modalPelis = new bootstrap.Modal(document.getElementById("modalPelis"));

let btnModalOpen = document.getElementById("btnModalOpen");
btnModalOpen.addEventListener("click", () => {
  limpiarFormulario();
  document.getElementById("tituloModal").innerHTML = "Agregar Pelicula/Serie";
  document.getElementById("labelCodigo").innerHTML = 'Código <span class="text-danger">*</span>';
  document.getElementById('codigo').removeAttribute("disabled");
  modalPelis.show();
});

let existePeli = false;

leerDatos();

window.agregarPeli = function () {
  let alerta = document.getElementById("msjEnvio");
  if (
    veriCod(document.getElementById("codigo")) &&
    veriTexto(document.getElementById("nombrePeli")) &&
    veriTexto(document.getElementById("descripcion")) &&
    validImg(document.getElementById("img"))&&
    veriTexto(document.getElementsByTagName('video'))
  ) {
    // crear nueva peli
    let nuevaPeli = new Pelicula(
      document.getElementById("codigo").value,
      document.getElementById("nombrePeli").value,
      document.getElementById("categoria").value,
      document.getElementById("descripcion").value,
      document.getElementById("publiCheck").value,
      document.getElementById("img").value,
      document.getElementById("video").value,


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

    //    leer datos

    leerDatos();

    // cerrar la ventana modal

    modalPelis.hide();

    // eliminar alert si es que apareció
    if ((alerta.className = "alert alert-danger mx-3")) {
      alerta.className = "alert alert-danger mx-3 d-none";

  } else {
    alerta.className = "alert alert-danger mx-3";
    alerta.innerHTML = "Ocurrio un error, verifique los datos ingresados.";
  }}
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

function leerDatos() {
  // esta funcion se encargar de leer los datos almacenados en el localStorage
  if (localStorage.length > 0) {
    let _listaPelisProvisoria = JSON.parse(localStorage.getItem("listaPelisKey"));

    if (listaPelis.length === 0){
      listaPelis = _listaPelisProvisoria;
    }
    dibujarDatos(_listaPelisProvisoria);
  }
}

function dibujarDatos(_listaPelisProvisoria) {
  let TablaPelis = document.getElementById("tBodyPelis");
  TablaPelis.innerHTML = '';
  let codigoHTML = "";



  for(let i in _listaPelisProvisoria){
    codigoHTML = `
        <tr>
        <th scope="row">${_listaPelisProvisoria[i].codigo}</th>
        <td scope="row">${_listaPelisProvisoria[i].nombre}</td>
        <td scope="row">${_listaPelisProvisoria[i].categoria}</td>
        <td scope="row">${_listaPelisProvisoria[i].descripcion.substring(0, 20)+"..."}</td>
        <td scope="row">${_listaPelisProvisoria[i].publicado}</td>
        <td scope="row">${_listaPelisProvisoria[i].imagen}</td>
        <td class="">
            <button class="btn btn-primary bPaddEdit" onclick="modificarPelis(this)" id="${_listaPelisProvisoria[i].codigo}">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-danger bPaddTrash" onclick="eliminarPeli(this)" id="${_listaPelisProvisoria[i].codigo}">
                <i class="fas fa-trash-alt"></i>
            </button>
            <i class="far fa-star fa-2x text-warning" onclick="destacar(this)" id="star"></i>
        </td>
    </tr>
        `;

        TablaPelis.innerHTML += codigoHTML;
      }
}


window.eliminarPeli = function (peli){
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
          let pelisFiltradas = listaPelis.filter(function (pelicuFil){
            return pelicuFil.codigo != peli.id;
          })
          listaPelis = pelisFiltradas;
          localStorage.setItem('listaPelisKey', JSON.stringify(listaPelis));
          leerDatos();



          Swal.fire(
            '¡Borrado!',
            'La pelicula fue borrada',
            'success'
          )
        }
      })
}


window.modificarPelis = function(btnEditar){

// limpiar formulario
limpiarFormulario()

// buscar el objeto a modificar
let peliEncontrada = listaPelis.find((pelic) =>{
  return pelic.codigo === btnEditar.id;
});


// cargar los datos en el formulario

document.getElementById('codigo').value = peliEncontrada.codigo;
document.getElementById('nombrePeli').value = peliEncontrada.nombre;
document.getElementById('categoria').value = peliEncontrada.categoria;
document.getElementById('descripcion').value = peliEncontrada.descripcion;
document.getElementById('publiCheck').value = peliEncontrada.publicado;
document.getElementById('img').value = peliEncontrada.imagen;
document.getElementById('video').value = peliEncontrada.video;



existePeli=true;

document.getElementById("tituloModal").innerHTML = "Modificar Pelicula/Serie";
document.getElementById("labelCodigo").innerHTML = "Codigo";
document.getElementById('codigo').setAttribute("disabled", "");



  modalPelis.show();
}

window.guardarPeli = function (event){
  event.preventDefault();

  if(existePeli === true){
    actualizarDatosPelis()
    
  }else{
    agregarPeli();
  }
}


function actualizarDatosPelis(){
  let codigo = document.getElementById('codigo').value;
  let nombre = document.getElementById('nombrePeli').value;
  let categoria = document.getElementById('categoria').value;
  let descripcion = document.getElementById('descripcion').value;
  let publiCheck = document.getElementById('publiCheck').value;
  let imagen = document.getElementById('img').value;
  let video = document.getElementById('video').value;


  for(let i in listaPelis){
    if(listaPelis[i].codigo === codigo){
      listaPelis[i].nombre = nombre;
      listaPelis[i].categoria = categoria;
      listaPelis[i].descripcion = descripcion;
      listaPelis[i].publicado = publiCheck;
      listaPelis[i].imagen = imagen;
      listaPelis[i].video = video;
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

  leerDatos();
} 

