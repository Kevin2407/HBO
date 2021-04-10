import { Pelicula } from "./pelisClass.js";

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
  modalPelis.show();
});

leerDatos();

window.agregarPeli = function (event) {
  event.preventDefault();
  let alerta = document.getElementById("msjEnvio");
  if (
    veriCod(document.getElementById("codigo")) &&
    veriTexto(document.getElementById("nombrePeli")) &&
    veriTexto(document.getElementById("descripcion")) &&
    validImg(document.getElementById("img"))
  ) {
    // crear nueva peli
    let nuevaPeli = new Pelicula(
      document.getElementById("codigo").value,
      document.getElementById("nombrePeli").value,
      document.getElementById("categoria").value,
      document.getElementById("descripcion").value,
      document.getElementById("publiCheck").value,
      document.getElementById("img").value
    );

    // guardar peli en la lista
    listaPelis.push(nuevaPeli);

    // guardar los datos en localStorage
    localStorage.setItem("listaPelis", JSON.stringify(listaPelis));

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
    }


  } else {
    alerta.className = "alert alert-danger mx-3";
    alerta.innerHTML = "Ocurrio un error, verifique los datos ingresados.";
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

  // // alert de se enviaron los datos

  // document.getElementById('msjEnvio').className = 'alert alert-success mx-3';
  // document.getElementById('msjEnvio').innerHTML = '<p>Se a añadido una nueva película</p>'
}

function leerDatos() {
  // esta funcion se encargar de leer los datos almacenados en el localStorage
  if (localStorage.length > 0) {
    let _listaPelisProvisoria = JSON.parse(localStorage.getItem("listaPelis"));

    if (listaPelis.length === 0) {
      listaPelis = _listaPelisProvisoria;
    }
    dibujarDatos(_listaPelisProvisoria);
  }
}

function dibujarDatos(_listaPelisProvisoria) {
  let TablaPelis = document.getElementById("tBodyPelis");
  // TablaPelis.innerHTML = '';
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
            <button class="btn btn-primary bPaddEdit">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-danger bPaddTrash" onclick="eliminarPeli(this)" id="${_listaPelisProvisoria[i].codigo}">
                <i class="fas fa-trash-alt"></i>
            </button>
            <i class="far fa-star fa-2x text-warning" onclick="destacar(this)" id="star"></i>
        </td>
    </tr>
        `;

    }
    TablaPelis.innerHTML += codigoHTML;
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
          Swal.fire(
            '¡Borrado!',
            'La pelicula fue borrada',
            'success'
          )
        }
      })
}