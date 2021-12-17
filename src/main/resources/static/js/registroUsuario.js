var direccionregistrousuario;
var token;
var tipodocumento;
var numerocedula;
var tipousuario;
var primernombre;
var segundonombre;
var primerapellido;
var segundoapellido;
var usuario;



$(document).ready(function () {
    token = $("meta[name='_csrf']").attr("content");
    direccionbase = $("#direccionbase").val();
    direccionregistrousuario = $("#direccionregistrousuario").val();
    tipodocumento = $("#tipodocumento").val();
    numerocedula = $("#numerocedula").val();
    tipousuario = $("#tipousuario").val();


});

$("#registrarusuario").click(function () {

    url = direccionregistrousuario + "/guardarusuario";




    $.ajax({
        data: {

            tipousuario: tipousuario,
            // data: JSON.stringify(dataAl),

        },
        url: url,
        headers: {
            "X-CSRF-TOKEN": token
        }, //send CSRF token in header
        dataType: "json", //tipo de datos retornados
        type: "POST",
        success: function (response) {

        }
    });

});

$("#btnBuscarPersona").click(function () {

    url = direccionregistrousuario + "/consultarpersona";
    tipodocumento = $("#tipodocumento").val();
    numerocedula = $("#numerocedula").val();
    tipousuario = $("#tipousuario").val();

    $.ajax({
        data: {
            tipodoc: tipodocumento,
            numdoc: numerocedula,
            tipousuario: tipousuario

        },
        url: url,
        headers: {
            "X-CSRF-TOKEN": token
        }, //send CSRF token in header
        dataType: "json", //tipo de datos retornados
        type: "GET",
        success: function (response) {
            if (response["tipoDocumento"] != null && response["numeroDocumento"] != null) {
                $("#containerusuario").css('display', 'block');
                $("#containerbotones").css('display', 'block');
                $("#regForm").css('height', '650px');
                primernombre = response["primerNombre"];
                segundonombre = response["segundoNombre"];
                primerapellido = response["primerApellido"];
                segundoapellido = response["segundoApellido"];
                $("#nombreapellido").val(`${primernombre}` + ' ' + `${segundonombre}` + ' ' +
                        `${primerapellido}` + ' ' + `${segundoapellido}`);
                formarUsuario();
                $("#usuario").val(`${usuario}`);
                $("#containerusuario").css('display', 'block');
                $("#cedula").val(response["tipoDocumento"] + response["numeroDocumento"]);

            } else {
                alert("La persona no se encuentra registrada o el tipo de usuario seleccionado no es correcto");
            }

        },

    });
    /* .fail(function (data) {
     alert("La persona no se encuentra registrada");
     });*/
});

function formarUsuario() {
    var primerCaracterNombre = `${primernombre}`.substring(0, 1);

    var user = `${primerCaracterNombre}` + `${primerapellido}`;

    usuario = `${user}`.toLowerCase();

}












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