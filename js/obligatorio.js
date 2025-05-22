/*Camilo Artola 306498*/

class Sistema {
    constructor() {
        this.ListaAdmins = [
            new Administrador("camo", "camo2024"),
            new Administrador("kevin", "kevin1234"),
            new Administrador("pedro", "pedrito124"),
            new Administrador("manu", "manu1234"),
            new Administrador("tina", "tina1234"),
        ]
        this.ListaCompradores = [
            new Comprador("Camilo", "Artola", "camoartola", "Camo2025", "4213000403490902", "123"),
            new Comprador("Kevin", "Gomez", "kevingomez", "Kevin1234", "4213000403490902", "123"),
            new Comprador("Pedro", "Gonzalez", "pedrogon21", "Pedro1234", "4213000403490902", "123"),
            new Comprador("Manuel", "Gutierrez", "manu2002", "Manu1234", "4213000403490902", "123"),
            new Comprador("Martina", "Tapia", "tina2024", "Marti124", "4213000403490902", "123"),
        ];
        this.ListaProductos = [
            new Producto("Pelota de Basquetbol", "Pelota de Basquetbol marca Nivia, incluye inflador de regalo.", 300, "PelotaBasquet.jpg", "activo", 5, false),
            new Producto("Botella deportiva", "Botella deportiva ideal para salir a correr o ir al gimnasio.", 120, "Botella.jpg", "activo", 5, true),
            new Producto("Pelota de Fútbol Americano", "Pelota de Fútbol Americano marca Champion Sports tamaño oficial.", 260, "PelotaFutbolAmericano.jpg", "activo", 5, true),
            new Producto("Bolso deportivo", "Bolso deportivo grande y duradero para llevar lo que quieras.", 350, "BolsoDeportivo.jpeg", "activo", 5, false),
            new Producto("Raqueta de Tenis", "Raqueta de Tenis marca Head ultimo modelo compuesta de aluminio.", 400, "raquetaTenis.jpg", "activo", 5, true),
            new Producto("Medias Antideslizantes", "Par de Medias Antideslizantes para Futbol de muy buena calidad.", 220, "MediasAntideslizantes.jpg", "activo", 5, false),
            new Producto("Licra deportiva", "Licra deportiva de manga larga ideal para epocas de frio y buen calentamiento.", 300, "Licra.jpg", "activo", 5, true),
            new Producto("Kit de Mancuernas", "Kit de mancuernas de 20kg desarmable de acero inoxidable.", 400, "kitMancuernas.jpg", "activo", 5, false),
            new Producto("Kit de Raquetas de Ping Pong", "Kit de par de Raquetas de Ping Pong con tres pelotas incluidas.", 420, "raquetaPingpong.jpg", "activo", 5, true),
            new Producto("Cuerda para saltar", "Cuerda para saltar marca Domyos con revestimiento de espuma para mayor comodidad.", 300, "CuerdaParaSaltar.jpeg", "activo", 5, false)
        ];

        // LAS COMPRAS PRECARGADAS NO FUNCIONAN YA QUE SE ENLAZAN CON LOS PRODUCTOS, NO SUPE HACER QUE FUNCIONEN. ESTAN EN COMENTARIO ACA ABAJO.
        // EL RESTO DE COMPRAS CREADAS DINAMICAMENTE FUNCIONAN A LA PERFECCION.

        this.ListaCompras = [
            // new Compra("Bolso deportivo", 4, 1500, "pendiente"),
            // new Compra("Raqueta de Tenis", 2, 700, "pendiente"),
            // new Compra("Pelota de futbol", 1, 260, "aprobada"),
            // new Compra("Pelota de volley", 3, 800, "cancelada"),
            // new Compra("Gorra de natacion", 5, 750, "cancelada"),
        ];
        this.usuarioLogueado = null;
        this.ListaProdEnOferta = [];
    }



    aprobarCompra(saldo, total, stock, CantUnid, estado) {
        let laCompra = this.obtenerElemento(this.ListaCompras, "total", total)
        let elProducto = this.obtenerElemento(this.ListaProductos, "stock", stock)
        if (((saldo - total) >= 0)
            && ((stock - CantUnid) >= 0)
            && (estado === "activo")) {
            laCompra.estado = "aprobada"
            elProducto.stock = stock - CantUnid;
            this.usuarioLogueado.saldo = saldo - total;
            if (stock == 0) {
                elProducto.estado = "pausado"
            }
        }
        else {
            laCompra.estado = "cancelada"
        }

    }

    cambiarEstado(idCompra) {
        let laCompra = this.obtenerElemento(this.ListaCompras, "id", idCompra)
        laCompra.estado = "cancelada"
    }

    pausarProducto() {
        for (let i = 0; i < this.ListaProductos.length; i++) {
            let unProd = this.ListaProductos[i];
            if (unProd.stock == 0) {
                unProd.estado = "pausado"
            }
        }
    }

    montoTotalCompras() {
        let total = 0;
        for (let i = 0; i < this.ListaCompras.length; i++) {
            let unaCompra = this.ListaCompras[i];
            if (unaCompra.estado === "aprobada") {
                total += unaCompra.total
            }
        }
        gananciaTotal += total
        return total;
    }

    agregarCompradorEnSist(unComprador) {
        this.ListaCompradores.push(unComprador);
    }

    agregarCompraEnSist(unaCompra) {
        this.ListaCompras.push(unaCompra);
    }

    actualizarListaSistEnOfertaEnSist() {
        this.ListaProdEnOferta = [];
        for (let i = 0; i < this.ListaProductos.length; i++) {
            let unProd = this.ListaProductos[i];
            if (unProd.enOferta) {
                this.ListaProdEnOferta.push(unProd);
            }
        }
    }

    actualizarListaSistuctoEnSist(unProducto) {
        this.ListaProductos.push(unProducto);
    }

    obtenerProductosSist() {
        return this.ListaProductos
    }

    obtenerElemento(arrayElem, prop, valor) {
        let obj = null
        for (let i = 0; i < arrayElem.length; i++) {
            let unElemento = arrayElem[i];
            if (unElemento[prop] === valor) {
                obj = unElemento
                break;
            }
        }
        return obj
    }

    cambiarEnOferta(idProd) {
        let elProducto = this.obtenerElemento(this.ListaProductos, "id", idProd)
        if (elProducto.enOferta) {
            elProducto.enOferta = false
        }
        else {
            elProducto.enOferta = true
        }
    }

    aumentarStock(idProd) {
        let elProducto = this.obtenerElemento(this.ListaProductos, "id", idProd)
        if (elProducto.stock == 0) {
            elProducto.stock++
            elProducto.estado = "activo"
        }
        else {
            elProducto.stock++
        }
    }

    disminuirStock(idProd) {
        let elProducto = this.obtenerElemento(this.ListaProductos, "id", idProd)
        if (elProducto.stock > 0) {
            if (elProducto.stock == 1) {
                elProducto.estado = "pausado"
                elProducto.stock--
            }
            else {
                elProducto.stock--
            }
        }
    }

    cambiarActivoPausado(idProd) {
        let elProducto = this.obtenerElemento(this.ListaProductos, "id", idProd)
        if (elProducto.estado === "activo") {
            elProducto.estado = "pausado"
        }
        else if (elProducto.stock == 0) {
            elProducto.stock++
            elProducto.estado = "activo"
        } else {
            elProducto.estado = "activo"
        }

    }

}

let gananciaTotal = 0;

let contadorAdmin = 1

class Administrador {
    constructor(usuario, pass) {
        this.id = contadorAdmin
        this.usuario = usuario
        this.pass = pass
        contadorAdmin++
    }
}

let contadorComprador = 1

class Comprador {
    constructor(nombre, apellido, usuario, pass, NroTarjeta, codigoCVC) {
        this.id = contadorComprador
        this.nombre = nombre
        this.apellido = apellido
        this.usuario = usuario
        this.pass = pass
        this.nroTarjeta = NroTarjeta
        this.codigoCVC = codigoCVC
        this.saldo = 3000
        contadorComprador++
    }
}

let contadorProducto = 1

class Producto {
    constructor(nomProd, descProd, precio, UrlImagen, estado, stock, enOferta) {
        this.nombre = nomProd
        this.descripcion = descProd
        this.precio = precio
        this.imagen = UrlImagen
        this.stock = stock
        this.estado = estado
        this.enOferta = enOferta
        this.id = "PROD_ID_" + contadorProducto
        contadorProducto++
    }
}

let contCompra = 1

class Compra {
    constructor(nomProd, cantUnid, montoTotal, estado) {
        this.nombre = nomProd
        this.unidades = cantUnid
        this.total = montoTotal
        this.estado = estado
        this.id = contCompra
        contCompra++
    }
}


let sistema = new Sistema();

inicio()

function inicio() {

    OcultarSecciones();
    actualizarListaSistEnOferta();
    document.querySelector("#seccionLogin").style.display = "block";
    document.querySelector("#btnIngresar").addEventListener("click", hacerLogin);
    document.querySelector("#btnRegistrarseYa").addEventListener("click", mostrarRegistro);
    document.querySelector("#btnRegistro").addEventListener("click", hacerRegistroComprador);
    document.querySelector("#menuCompraProductos").addEventListener("click", menuCompraProductos);
    document.querySelector("#menuListadoCompras").addEventListener("click", menuListadoCompras);
    document.querySelector("#menuProductosEnOferta").addEventListener("click", menuProductosEnOferta);
    document.querySelector("#menuAdminCrearProducto").addEventListener("click", menuCrearProducto);
    document.querySelector("#menuAdminAdministrarProd").addEventListener("click", menuAdministrarProducto);
    document.querySelector("#menuAdminListadoCompras").addEventListener("click", menuAdminAprobarCompra);
    document.querySelector("#btnCrearProd").addEventListener("click", crearProducto);
    document.querySelector("#menuCerrarSesión").addEventListener("click", cerrarSesion);
    document.querySelector("#menuCerrarSesiónAdmin").addEventListener("click", cerrarSesion);
    document.querySelector("#menuAdminVerInforme").addEventListener("click", menuVerInforme);
}

function menuVerInforme() {
    OcultarSecciones();
    document.querySelector("#navPrincipalAdmin").style.display = "block";
    document.querySelector("#seccionVerInforme").style.display = "block";
    mostrarInforme()
}

// ME FALTO TERMINAR ESTA ULTIMA PARTE DEL INFORME

function mostrarInforme() {
    document.querySelector("#pParrafo").innerHTML = "";
    let parrafoInforme = `
    Producto:   Unidades vendidas: 
    Producto:   Unidades vendidas: 
    Producto:   Unidades vendidas: 
    Producto:   Unidades vendidas: 
    Producto:   Unidades vendidas: 
    Producto:   Unidades vendidas: 
    Producto:   Unidades vendidas: 
    La ganancia total es: ${gananciaTotal}`;

    document.querySelector("#pParrafo").innerHTML += parrafoInforme;
}

function actualizarListaSistEnOferta() {
    sistema.actualizarListaSistEnOfertaEnSist();
}

function cargarTablaAdministrarProd() {
    document.querySelector("#tblAdministrarProd").innerHTML = "";
    let tblAdministrarProd = "";
    for (let i = 0; i < sistema.ListaProductos.length; i++) {
        let unProd = sistema.ListaProductos[i];
        tblAdministrarProd = `
               <tr>
               <td>${unProd.nombre}</td>
               <td>${unProd.precio}</td>`

        if (unProd.enOferta) {
            tblAdministrarProd += `<td>
               <select class="slcEnOferta" id="slc${unProd.id}">
                  <option value selected="EnOferta">EN OFERTA</option>
                  <option value="NoEnOferta">NO</option>
                </select>
               </td>`
        } else {
            tblAdministrarProd += `<td>
               <select class="slcEnOferta" id="slc${unProd.id}">
                  <option value="EnOferta">EN OFERTA</option>
                  <option value selected="NoEnOferta">NO</option>
                </select>
               </td>`
        }
        tblAdministrarProd += `
            <td><img src="img/${unProd.imagen}"></td>
            <td>${unProd.stock}</td>
            <td><input type="button" value="+" class="btnAumentar" id="aumentar${unProd.id}"/><input type="button" value="-" class="btnDisminuir" id="disminuir${unProd.id}"/>
            </td>`

        if (unProd.estado === "activo") {
            tblAdministrarProd += `
            <td>
                <select class="slcActivarPausar" id="slcActivarPausar${unProd.id}">
                  <option value selected="Activo">Activo</option>
                  <option value="Pausado">Pausado</option>
                </select>
            </td>
            </tr>`
        }
        else {
            tblAdministrarProd += `
            <td>
                <select class="slcActivarPausar" id="slcActivarPausar${unProd.id}">
                  <option value="Activo">Activo</option>
                  <option value selected="Pausado">Pausado</option>
                </select>
            </td>
            </tr>`
        }

        document.querySelector("#tblAdministrarProd").innerHTML += tblAdministrarProd
    }

    let listaSlcOferta = document.querySelectorAll(".slcEnOferta")

    for (let i = 0; i < listaSlcOferta.length; i++) {
        const unSlc = listaSlcOferta[i];
        unSlc.addEventListener("change", cambiarEnOferta)
    }

    let listaBtnAumentar = document.querySelectorAll(".btnAumentar")

    for (let i = 0; i < listaBtnAumentar.length; i++) {
        const unBtn = listaBtnAumentar[i];
        unBtn.addEventListener("click", aumentarStock)
    }

    let listabBtnDisminuir = document.querySelectorAll(".btnDisminuir")

    for (let i = 0; i < listabBtnDisminuir.length; i++) {
        const unBtn = listabBtnDisminuir[i];
        unBtn.addEventListener("click", disminuirStock)
    }

    let listaSlcActivarPausar = document.querySelectorAll(".slcActivarPausar")

    for (let i = 0; i < listaSlcActivarPausar.length; i++) {
        const unSlc = listaSlcActivarPausar[i];
        unSlc.addEventListener("change", cambiarActivoPausado)
    }
}

function aumentarStock() {
    let idBtn = this.id;
    let idProd = idBtn.substring(8);
    sistema.aumentarStock(idProd);
    actualizarTablasProductos();
}

function disminuirStock() {
    let idBtn = this.id;
    let idProd = idBtn.substring(9);
    sistema.disminuirStock(idProd);
    actualizarTablasProductos();
}

function cambiarEnOferta() {
    let idSlc = this.id;
    let idProd = idSlc.substring(3);
    sistema.cambiarEnOferta(idProd);
    actualizarTablasProductos();
    actualizarListaSistEnOferta();
}

function cambiarActivoPausado() {
    let idSlc = this.id;
    let idProd = idSlc.substring(16);
    sistema.cambiarActivoPausado(idProd);
    actualizarTablasProductos();
}

function actualizarTablasProductos() {
    cargarTablaAdministrarProd();
    armarTablaProductos();
    armarTablaProductosEnOferta();
}


function crearProducto() {
    let formProd = document.querySelector("#formProducto")
    if (formProd.reportValidity()) {
        let nombreProd = document.querySelector("#txtNombreProd").value;
        let precio = Number(document.querySelector("#txtPrecio").value);
        let descProd = document.querySelector("#txtDescProd").value;
        let ImagenProd = document.querySelector("#ImagenFile").value;
        let nombreImagen = ImagenProd.substring(ImagenProd.lastIndexOf("\\") + 1);
        let stock = Number(document.querySelector("#txtStock").value);
        let estado = "activo";
        let enOferta = false;
        let ProdAux = new Producto(nombreProd, descProd, precio, nombreImagen, estado, stock, enOferta);
        sistema.actualizarListaSistuctoEnSist(ProdAux)
        formProd.reset();
    }
}

function cerrarSesion() {
    inicio();
}

function OcultarSecciones() {
    let secciones = document.querySelectorAll(".seccion");
    for (let i = 0; i < secciones.length; i++) {
        const unaSeccion = secciones[i];
        unaSeccion.style.display = "none"
    }
}

function menuCompraProductos() {
    OcultarSecciones();
    document.querySelector("#navPrincipalComp").style.display = "block";
    document.querySelector("#seccionCompraProductos").style.display = "block";
    armarTablaProductos();
}

function menuListadoCompras() {
    OcultarSecciones();
    document.querySelector("#navPrincipalComp").style.display = "block";
    document.querySelector("#seccionListadoCompras").style.display = "block";
    ListarCompras();
}

function menuProductosEnOferta() {
    OcultarSecciones();
    document.querySelector("#navPrincipalComp").style.display = "block";
    document.querySelector("#seccionProductosEnOferta").style.display = "block";
    mostrarSaldo();
}

function menuCrearProducto() {
    OcultarSecciones();
    document.querySelector("#navPrincipalAdmin").style.display = "block";
    document.querySelector("#seccionCrearProducto").style.display = "block";
}

function menuAdministrarProducto() {
    OcultarSecciones();
    document.querySelector("#navPrincipalAdmin").style.display = "block";
    document.querySelector("#seccionAdministrarProd").style.display = "block";
    cargarTablaAdministrarProd();
    ListarCompras();
    ListarComprasAdmin();
}

function menuAdminAprobarCompra() {
    OcultarSecciones();
    document.querySelector("#navPrincipalAdmin").style.display = "block";
    document.querySelector("#seccionListadoyAprobacionAdmin").style.display = "block";
}

function hacerLogin() {
    let formLogin = document.querySelector("#FormLogin")
    if (formLogin.reportValidity()) {
        let usuario = document.querySelector("#txtNomUsuarioAdmin").value.toLowerCase();
        let pass = document.querySelector("#txtContraseñaAdmin").value;
        let adminBuscado = sistema.obtenerElemento(sistema.ListaAdmins, "usuario", usuario)

        if (adminBuscado != null) {

            if (adminBuscado.pass === pass) {
                OcultarSecciones();
                document.querySelector("#navPrincipalAdmin").style.display = "block";
                document.querySelector("#seccionListadoyAprobacionAdmin").style.display = "block";
                ListarComprasAdmin();
                ListarCompras();
                actualizarTablasProductos();
                formLogin.reset();
            }
            else {
                alert("La contraseña es incorrecta")
            }
        }
        else {

            let CompBuscado = sistema.obtenerElemento(sistema.ListaCompradores, "usuario", usuario)

            if (CompBuscado != null) {

                if (CompBuscado.pass === pass) {
                    OcultarSecciones();
                    document.querySelector("#navPrincipalComp").style.display = "block";
                    document.querySelector("#seccionCompraProductos").style.display = "block";
                    sistema.usuarioLogueado = CompBuscado;
                    actualizarTablasProductos();
                    ListarCompras();
                    ListarComprasAdmin();
                    mostrarSaldo();
                    formLogin.reset();
                }
                else {
                    alert("La contraseña es incorrecta")
                }

            }
            else {
                alert("El usuario que acaba de ingresar no existe")
            }
        }
    }
}

function mostrarSaldo() {
    let saldo1 = document.querySelector("#saldo1");
    let saldo2 = document.querySelector("#saldo2");
    saldo1.innerHTML = sistema.usuarioLogueado.saldo;
    saldo2.innerHTML = sistema.usuarioLogueado.saldo;
}

function armarTablaProductos() {
    document.querySelector("#tblProductos").innerHTML = "";
    let tblProductos = "";
    for (let i = 0; i < sistema.ListaProductos.length; i++) {
        let unProd = sistema.ListaProductos[i];


        if (unProd.estado === "activo" && unProd.stock > 0) {
            tblProductos = `
            <tr>
            <td>${unProd.nombre}</td>
            <td>${unProd.descripcion}</td>
            <td>${unProd.precio}</td>

            `
            if (unProd.enOferta === true) {
                tblProductos += `<td> EN OFERTA!</td>`;
            } else {
                tblProductos += `<td></td>`
            }
            tblProductos +=

                `<td><img src="img/${unProd.imagen}"></td>
             <td><input type="number" min="1" max="8" value="1" step="1" class="CantUnidades" id="Unid${unProd.id}"/></td>
             <td><input type="button" value="Comprar" class="btnComprar" id="btnComprar${unProd.id}"/></td>
             </tr> `

            document.querySelector("#tblProductos").innerHTML += tblProductos
        }
    }

    let listaBtns = document.querySelectorAll(".btnComprar")

    for (let i = 0; i < listaBtns.length; i++) {
        const unBtn = listaBtns[i];
        unBtn.addEventListener("click", solicitarCompra)
    }

}

function solicitarCompra() {

    let idBoton = this.id
    let idProducto = (idBoton.substring(10));
    let idCantUnid = "Unid" + idProducto;
    let CantUnid = Number(document.querySelector("#" + idCantUnid).value);
    let Prod = sistema.obtenerElemento(sistema.ListaProductos, "id", idProducto);
    let nombreProd = Prod.nombre;
    let estado = "pendiente";
    let montoTotal = CantUnid * Prod.precio;
    let CompraAux = new Compra(nombreProd, CantUnid, montoTotal, estado);
    sistema.agregarCompraEnSist(CompraAux);
    alert("Solicitud de compra realizada");
    ListarCompras();
    ListarComprasAdmin();
}
document.querySelector("#slcFiltrar").addEventListener("change", ListarCompras)
function ListarCompras() {
    document.querySelector("#tblListadoCompras").innerHTML = "";
    document.querySelector("#pResultado").innerHTML = "";
    let tblListadoCompras = "";
    let pResultado = "";
    let estado = document.querySelector("#slcFiltrar").value;
    for (let i = 0; i < sistema.ListaCompras.length; i++) {
        let unaCompra = sistema.ListaCompras[i];
        if (unaCompra.estado === estado || estado === "todas") {
            tblListadoCompras = `
    <tr>
    <td>${unaCompra.nombre}</td>
    <td>${unaCompra.unidades}</td>
    <td>${unaCompra.total}</td>
    <td>${unaCompra.estado}</td>
    `
            if (unaCompra.estado === "pendiente") {
                tblListadoCompras += `
       <td><input type="button" value="Cancelar" class="btnCancelar" id="btnCancelar${unaCompra.id}" /></td>
       </tr>
        `
            } else if (unaCompra.estado === "cancelada") {
                tblListadoCompras += `
        <td><input type="button" value="Cancelar" class="btnCancelar" id="btnCancelar${unaCompra.id}" disabled /></td>
        </tr>
        `
            } else {
                tblListadoCompras += `
                <td></td></tr>`
            }
        }

        document.querySelector("#tblListadoCompras").innerHTML += tblListadoCompras;
        tblListadoCompras = ""
    }

    let totalCompras = sistema.montoTotalCompras();
    let saldoDisponible = sistema.usuarioLogueado.saldo;
    pResultado = "Monto total: " + totalCompras + "<br><br> Saldo disponible: " + saldoDisponible;
    document.querySelector("#pResultado").innerHTML += pResultado;

    let listaBtnsCancelar = document.querySelectorAll(".btnCancelar")

    for (let i = 0; i < listaBtnsCancelar.length; i++) {
        const unBtn = listaBtnsCancelar[i];
        unBtn.addEventListener("click", cancelarCompra)

    }
}

function cancelarCompra() {
    let idBoton = this.id
    let idCompra = Number(idBoton.substring(11))
    console.log(idCompra)
    sistema.cambiarEstado(idCompra)
    ListarCompras();
    ListarComprasAdmin();
}


document.querySelector("#slcFiltrarAdmin").addEventListener("change", ListarComprasAdmin)
function ListarComprasAdmin() {
    document.querySelector("#tblListadoComprasAdmin").innerHTML = "";
    let tblListadoComprasAdmin = "";
    let estado = document.querySelector("#slcFiltrarAdmin").value;
    for (let i = 0; i < sistema.ListaCompras.length; i++) {
        let unaCompra = sistema.ListaCompras[i];
        if (unaCompra.estado === estado) {
            tblListadoComprasAdmin = `
    <tr>
    <td>${unaCompra.nombre}</td>
    <td>${unaCompra.unidades}</td>
    <td>${unaCompra.total}</td>
    <td>${unaCompra.estado}</td>
    `
            if (unaCompra.estado === "pendiente") {
                tblListadoComprasAdmin += `
       <td><input type="button" value="Aprobar" class="btnAprobar" id="btnAprobar${unaCompra.id}" /></td>
       </tr>
        `
            } else if (unaCompra.estado === "cancelada") {
                tblListadoComprasAdmin += `
        <td><input type="button" value="Aprobar" class="btnAprobar" id="btnAprobar${unaCompra.id}" disabled /></td>
        </tr>
        `
            } else {
                tblListadoComprasAdmin += `</tr>`
            }
        }
        document.querySelector("#tblListadoComprasAdmin").innerHTML += tblListadoComprasAdmin;
        tblListadoComprasAdmin = "";
    }


    let listaBtnsAprobar = document.querySelectorAll(".btnAprobar")

    for (let i = 0; i < listaBtnsAprobar.length; i++) {
        const unBtn = listaBtnsAprobar[i];
        unBtn.addEventListener("click", aprobarCompra)
    }
}

function aprobarCompra() {
    let idBoton = this.id;
    let idCompra = Number(idBoton.substring(10));
    let laCompra = sistema.obtenerElemento(sistema.ListaCompras, "id", idCompra);
    let total = laCompra.total;
    let CantUnid = laCompra.unidades;
    let nombreCompra = laCompra.nombre;
    let elProducto = sistema.obtenerElemento(sistema.ListaProductos, "nombre", nombreCompra);
    let stockProducto = elProducto.stock;
    let estadoProd = elProducto.estado;
    let saldo = sistema.usuarioLogueado.saldo;
    sistema.aprobarCompra(saldo, total, stockProducto, CantUnid, estadoProd);
    ListarCompras();
    sistema.pausarProducto();
    ListarComprasAdmin();
}


function armarTablaProductosEnOferta() {
    document.querySelector("#tblProdEnOferta").innerHTML = "";
    let tblProdEnOferta = "";
    for (let i = 0; i < sistema.ListaProdEnOferta.length; i++) {
        let unProdEnOferta = sistema.ListaProdEnOferta[i];


        if (unProdEnOferta.estado === "activo" && unProdEnOferta.stock > 0) {
            tblProdEnOferta = `
            <tr>
            <td>${unProdEnOferta.nombre}</td>
            <td>${unProdEnOferta.descripcion}</td>
            <td>${unProdEnOferta.precio}</td>
            <td>EN OFERTA!</td>
            <td><img src="img/${unProdEnOferta.imagen}"></td>
            <td><input type="number" min="1" max="8" value="1" step="1" class="CantUnidades" id="Unid${unProdEnOferta.id}"/></td>
            <td><input type="button" value="Comprar" class="btnComprar" id="btnComprar${unProdEnOferta.id}"/></td>
            </tr>`

            document.querySelector("#tblProdEnOferta").innerHTML += tblProdEnOferta
        }

        let listaBtns2 = document.querySelectorAll(".btnComprar")

        for (let i = 0; i < listaBtns2.length; i++) {
            const unBtn = listaBtns2[i];
            unBtn.addEventListener("click", solicitarCompra)
        }
    }

}

function mostrarRegistro() {
    OcultarSecciones();
    document.querySelector("#seccionRegistro").style.display = "block";
}

function hacerRegistroComprador() {
    let formRegistro = document.querySelector("#FormRegistro")
    if (formRegistro.reportValidity()) {
        let nombre = document.querySelector("#txtNombreComp").value;
        let apellido = document.querySelector("#txtApellidoComp").value;
        let usuario = document.querySelector("#txtNomUsuarioComp").value.toLowerCase();
        let pass = document.querySelector("#txtContraseñaComp").value;
        let NroTarjeta = eliminarGuionesTarjeta(document.querySelector("#txtNroTarjeta").value);
        let codigoCVC = document.querySelector("#txtCodigoSeg").value;

        let existeUsuarioComp = sistema.obtenerElemento(sistema.ListaCompradores, "usuario", usuario)
        let existeUsuarioAdmin = sistema.obtenerElemento(sistema.ListaAdmins, "usuario", usuario)

        if (existeUsuarioAdmin == null && existeUsuarioComp == null) {

            let TarjetaValida = validarTarjeta(NroTarjeta);
            if (TarjetaValida) {
                OcultarSecciones();
                document.querySelector("#seccionLogin").style.display = "block";
                let CompradorAux = new Comprador(nombre, apellido, usuario, pass, NroTarjeta, codigoCVC);
                sistema.agregarCompradorEnSist(CompradorAux);
                formRegistro.reset();
            } else {
                alert("El numero de tarjeta introducido no es válido")
            }
        }
        else {
            alert("El nombre de usuario introducido ya está en uso")
        }
    }
}

function eliminarGuionesTarjeta(TarjetaString) {
    let NrosTarjeta = TarjetaString.replace(/-/g, '');
    return NrosTarjeta;
}

function validarTarjeta(numeroTarjeta) {
    let tarjetaValida = false
    let digitoAVerificar = numeroTarjeta.charAt(numeroTarjeta.length - 1)
    let acumulador = 0

    for (let i = 0; i < numeroTarjeta.length - 1; i++) {
        if (i % 2 === 0) {
            let duplicado = Number(numeroTarjeta.charAt(i)) * 2
            if (duplicado >= 10) {
                let duplicadoString = String(duplicado)
                let resultado = Number(duplicadoString.charAt(0)) + Number(duplicadoString.charAt(1))
                acumulador += resultado
            } else {

                acumulador += duplicado
            }

        } else {
            acumulador += Number(numeroTarjeta.charAt(i))
        }
    }
    let multiplicadoPor9 = acumulador * 9
    let multiplicadoPor9String = String(multiplicadoPor9)
    let digitoVerificador = multiplicadoPor9String.charAt(multiplicadoPor9String.length - 1)
    if (digitoAVerificar === digitoVerificador) {
        tarjetaValida = true
    }
    return tarjetaValida
}
