// logica pagina principal

let filaDrama = [];
leerDrama();

function leerDrama(){
    // esta funcion trae los datos del LS 
    if(localStorage.length > 0){
        filaDrama = JSON.parse(localStorage.getItem('listaPelisKey'));
        dibujarDrama();
    }
}

function dibujarDrama(){
    let fila = document.getElementById('grillasDrama');
    fila.innerHTML = '';
    console.log(filaDrama);
}