export class Pelicula{
    constructor(codigo, nombre, categoria, descripcion, publicado, imagen, video,destacado){
        this.codigo = codigo;
        this.nombre = nombre;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.publicado = publicado;
        this.imagen = imagen;
        this.video = video;
        this.destacado = destacado;
    }
}


export class Usuario{
    constructor(nombre,nomUsuario,email,telefono,contrasenia,enSesion,aprobado,admin){
        this.nombre = nombre;
        this.nomUsuario = nomUsuario;
        this.email = email;
        this.telefono = telefono;
        this.contrasenia = contrasenia;
        this.enSesion = enSesion;
        this.aprobado = aprobado;
        this.admin = admin;
    }
}