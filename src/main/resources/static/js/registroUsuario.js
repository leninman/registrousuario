var direccionregistrousuario;
var direccionbase;
var token;
var tipodoc;
var nrodoc;
var claseusuario;
var primernombre;
var segundonombre;
var primerapellido;
var segundoapellido;
var usuario;
var formUsuario;
var cedula;
var claveprimercampo;
var clavesegundocampo;
var coderrorclave;
var tipousuario;



$(document).ready(function () {
    token = $("meta[name='_csrf']").attr("content");
    direccionbase = $("#direccionbase").val();
    direccionregistrousuario = $("#direccionregistrousuario").val();




});

$("#submit").click(function () {

    claveprimercampo = $("#claveprimercampo").val();
    clavesegundocampo = $("#clavesegundocampo").val();

    if (`${claveprimercampo}` === '') {
        $("#lblvalidaclaveprimercampo").css('display', 'block');
        setTimeout(() => {
            $("#lblvalidaclaveprimercampo").css('display', 'none');
        }, 2000);
        return;
    }


    if (`${clavesegundocampo}` === '') {
        $("#lblvalidaclavesegundocampo").css('display', 'block');
        setTimeout(() => {
            $("#lblvalidaclavesegundocampo").css('display', 'none');
        }, 2000);
        return;
    }
    validarClaves();
    
    if (coderrorclave === "1") {
        $('#modalclaves').modal({backdrop: 'static', keyboard: false});
        $("#modalclaves").modal('show');
        $("#parrafomodalclaves").html("Las claves introducidas no son iguales");
        coderrorclave = "";
        return;
    }
    
    if (coderrorclave === "2") {
       $('#modalclaves').modal({backdrop: 'static', keyboard: false});
        $("#modalclaves").modal('show');
        $("#parrafomodalclaves").html("La clave no puede ser menor de 8 caracteres ni mayor de 15");
        coderrorclave = "";
        return;
    }
    
    url = direccionregistrousuario + "/guardarusuario";

    var dataUs = {
        tipodoc: $("#tipodoc").val(),
        nrodoc: $("#nrodoc").val(),
        tipousuario: $("#tipousuario").val(),
        nombre: $("#nombre").val(),
        correo: $("#correo").val(),
        username: $("#username").val(),
        claveprimercampo: $("#claveprimercampo").val(),
        clavesegundocampo: $("#clavesegundocampo").val()
    };

    $.ajax({
        data: dataUs,
        url: url,
        cache: false,
        // processData: false,
        dataType: "json", //tipo de datos retornados
        type: "POST",
        headers: {
            "X-CSRF-TOKEN": token
        }, //send CSRF token in header
        success: function (response) {
            $('#modalusuarioregistrado').modal({backdrop: 'static', keyboard: false});
            $("#modalusuarioregistrado").modal('show');
            $("#parrafomodalusreg").html("El usuario " + response["nombre"] + "(" + response["username"] + ")" + " ha sido registrado correctamente en el sistema");

        }
    });

});
$("#btnUsuarioRegistrado").click(function () {
    window.location.href = `${direccionbase}` + "/app/inicio";
});

$("#btnBuscarPersona").click(function () {

    url = direccionregistrousuario + "/consultarpersona";
    tipodoc = $("#tipodoc").val();
    nrodoc = $("#nrodoc").val();
    tipousuario = $("#tipousuario").val();


    if (`${tipodoc}` === '') {
        $("#lbltipocedula").css('display', 'block');
        setTimeout(() => {
            $("#lbltipocedula").css('display', 'none');
        }, 2000);
        return;
    }

    if (`${nrodoc}` === '') {
        $("#lblnumerocedula").css('display', 'block');
        setTimeout(() => {
            $("#lblnumerocedula").css('display', 'none');
        }, 2000);
        return;
    }


    if (`${tipousuario}` === '') {
        $("#lbltipousuario").css('display', 'block');
        setTimeout(() => {
            $("#lbltipousuario").css('display', 'none');
        }, 2000);
        return;
    }


    $.ajax({
        data: {
            tipodoc: tipodoc,
            nrodoc: nrodoc,
            tipousuario: tipousuario

        },
        url: url,
        headers: {
            "X-CSRF-TOKEN": token
        }, //send CSRF token in header
        dataType: "json", //tipo de datos retornados
        type: "GET",
        success: function (response) {
            if (response["tipoDocumento"] !== null && response["numeroDocumento"] !== null) {
                if (consultarUsuarioExiste()) {
                    //alert("El usuario con el numero de cédula que se intenta registrar ya existe");
                    $('#modalusuarioyaexiste').modal({backdrop: 'static', keyboard: false});
                    $("#modalusuarioyaexiste").modal('show');
                    $("#parrafomodalusyaexiste").html("El usuario con el numero de cédula que se intenta registrar ya existe");
                    return;
                }
                ;
                $("#containerusuario").css('display', 'block');
                $("#containerbotones").css('display', 'block');
                $("#regForm").css('height', '750px');
                primernombre = response["primerNombre"];
                segundonombre = response["segundoNombre"];
                primerapellido = response["primerApellido"];
                segundoapellido = response["segundoApellido"];
                correo = response["correo"];
                $("#nombre").val(`${primernombre}` + ' ' + `${segundonombre}` + ' ' +
                        `${primerapellido}` + ' ' + `${segundoapellido}`);
                $("#correo").val(`${correo}`);
                formarUsuario();
                $("#username").val(`${usuario}`);
                $("#containerusuario").css('display', 'block');
                //$("#cedula").val(response["tipoDocumento"] + response["numeroDocumento"]);

            } else {

                //alert("La persona no se encuentra registrada o el tipo de usuario seleccionado no es correcto");
                $('#modalpersonanoencontrada').modal({backdrop: 'static', keyboard: false});
                $("#modalpersonanoencontrada").modal('show');
                $("#parrafomodalpersonanoencontrada").html("La persona o usuario que esta intentando registar no se encuentra en el sistema o el tipo de usuario seleccionado no es correcto");

            }

        }

    });
    /* .fail(function (data) {
     alert("La persona no se encuentra registrada");
     });*/
});

function consultarUsuarioExiste() {
    url = direccionregistrousuario + "/consultarusuarioporcedula";
    tipodoc = $("#tipodoc").val();
    nrodoc = $("#nrodoc").val();


    $.ajax({
        data: {
            tipodoc: tipodoc,
            nrodoc: nrodoc
        },
        url: url,
        headers: {
            "X-CSRF-TOKEN": token
        }, //send CSRF token in header
        dataType: "json", //tipo de datos retornados
        type: "GET",
        success: function (response) {
            return true;
        }
    });
}

function consultarNombreUsuarioExiste() {
    url = direccionregistrousuario + "/consultarnombredeusuario";

    $.ajax({
        data: {
            usuario: usuario
        },
        url: url,
        headers: {
            "X-CSRF-TOKEN": token
        }, //send CSRF token in header
        dataType: "json", //tipo de datos retornados
        type: "GET",
        success: function (response) {
            return true;
        }
    });
}



function formarUsuario() {


    i = 0;

    var primerCaracterNombre = `${primernombre}`.substring(0, 1);

    var user = `${primerCaracterNombre}` + `${primerapellido}`;

    usuario = `${user}`.toLowerCase();

    while (consultarNombreUsuarioExiste()) {
        i++;
        usuario = usuario + i;
    }

    return usuario;

}


function validarClaves() {

    clave1 = $("#claveprimercampo").val();
    clave2 = $("#clavesegundocampo").val();

//valida claves iguales en los dos campos
    if (`${clave1}` !== `${clave2}`) {
        coderrorclave = "1";
        return coderrorclave;
    }
    
 if(`${clave1}`.length<8 || `${clave1}`.length>15 ){
     coderrorclave = "2";
     return coderrorclave;
 }   


}
;














/*let idPrf = 0;
 let idmaterias = [];
 let idcursos = [];
 let direccionbase;
 var token;
 
 
 
 
 $(document).ready(function () {
 token = $("meta[name='_csrf']").attr("content");
 $("#tipoDocPrf").val("");
 $('#tablemateriasdisponibles').DataTable({
 language: {
 "lengthMenu": "",
 "zeroRecords": "No se encontraron resultados",
 "info": "",
 "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
 "infoFiltered": "",
 "sSearch": "Buscar:",
 "oPaginate": {
 "sFirst": "Primero",
 "sLast": "Último",
 "sNext": "Siguiente",
 "sPrevious": "Anterior"
 },
 "sProcessing": "Procesando...",
 },
 responsive: "true",
 dom: 'Bfrtilp',
 });
 });
 
 
 $("#botonBuscPrf").click(function () {
 direccionbase = $("#direccionbase").val();
 url = direccionbase + "/buscarProfesor";
 
 
 $.ajax({
 data: {
 tdoc: $("select[name=tipoDocPrf]").val(),
 ndoc: $("input:text[name=numDocPrf]").val(),
 },
 url: url,
 headers: {"X-CSRF-TOKEN": token}, //send CSRF token in header
 dataType: "json", //tipo de datos retornados
 type: "GET",
 })
 .done(function (data) {
 $("#nombre").val(data["primNombPrf"] + " " + data["primApellPrf"]);
 $("#idPrf").val(data["idPrf"]);
 idPrf = $("#idPrf").val();
 
 })
 .fail(function (data) {
 alert("El profesor no se encuentra registrado");
 $("#tipoDocPrf").val("");
 $("#numDocPrf").val("");
 $("#nombre").val("");
 });
 
 });
 
 
 function asignarmateria() {
 
 table = document.getElementById("tablemateriasdisponibles");
 rows = table.getElementsByTagName("tr");
 
 
 for (i = 1; i < rows.length; i++) {
 row = table.rows[i];
 row.onclick = function () {
 var cell = this.getElementsByTagName("td")[0];
 var idmat = cell.innerHTML;
 var cell = this.getElementsByTagName("td")[1];
 var numCurso = cell.innerHTML;
 var cell = this.getElementsByTagName("td")[2];
 var annio = cell.innerHTML;
 var cell = this.getElementsByTagName("td")[3];
 var seccion = cell.innerHTML;
 var cell = this.getElementsByTagName("td")[6];
 var asignatura = cell.innerHTML;
 let htmlTags = '<tr>' +
 '<td>' + numCurso + '</td>' +
 '<td>' + annio + '</td>' +
 '<td>' + seccion + '</td>' +
 '<td>' + asignatura + '</td>' +
 '<td><a type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top"title="Eliminar" id="btnEliminar"><i class="bi bi-trash"></i></a></td>' +
 '</tr>';
 $('#tablemateriasasignadas tbody').append(htmlTags);
 idcursos.push(numCurso);
 idmaterias.push(idmat);
 $(this).closest('tr').remove();
 }
 }
 
 $(document).on('click', '#btnEliminar', function (event) {
 event.preventDefault();
 $(this).closest('tr').remove();
 });
 
 }
 
 $("#guardar").click(function () {
 direccionbase = $("#direccionbase").val();
 url = direccionbase + "/asignarmateriasycursos";
 
 $.ajax({
 data: {
 idcursos: idcursos,
 idmaterias: idmaterias,
 idprofesor: idPrf
 },
 url: url,
 headers: {"X-CSRF-TOKEN": token}, //send CSRF token in header
 dataType: "json", //tipo de datos retornados
 type: "POST",
 contentType: "application/x-www-form-urlencoded",
 success: function (json) {
 alert("EL CURSO HA SIDO ASIGNADO CORRECTAMENTE");
 window.location.href = direccionbase + "/cursosmateriasasignadas";
 }
 })
 .done(function () {
 })
 .fail(function (data) {
 console.log(data);
 });
 });*/