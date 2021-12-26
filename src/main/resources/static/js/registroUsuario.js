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
var usuarioexiste;


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
    window.location.href = `${direccionbase}` + "/login";
});

$("#btnUsuarioyaexiste").click(function () {
    window.location.href = `${direccionregistrousuario}` + "/nuevousuario";
});

$("#btnBuscarPersona").click(function () {

    url = direccionregistrousuario + "/consultarpersona";
    tipodoc = $("#tipodoc").val();
    nrodoc = $("#nrodoc").val();
    tipousuario = $("#tipousuario").val();
    usuarioexiste = false;

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
                url = direccionregistrousuario + "/consultarusuarioporcedula";

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
                        if (response !== null) {
                            $('#modalusuarioyaexiste').modal({backdrop: 'static', keyboard: false});
                            $("#modalusuarioyaexiste").modal('show');
                            $("#parrafomodalusyaexiste").html("El usuario con el numero de cédula que se intenta registrar ya existe");
//                            window.location.href = "/app/nuevousuario";
                            usuarioexiste = true;
                            return;
                        }

                    }
                });
                if (usuarioexiste) {
                    return;
                } else {

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
                    formarUsuario();  //DEVUELVE EL NOMBRE DEL USUARIO EN LA VARIABLE usuario
                    $("#username").val(`${usuario}`);
                    $("#containerusuario").css('display', 'block');
                    //$("#cedula").val(response["tipoDocumento"] + response["numeroDocumento"]);
                }

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

//function consultarUsuarioExiste() {
//    url = direccionregistrousuario + "/consultarusuarioporcedula";
//    tipodoc = $("#tipodoc").val();
//    nrodoc = $("#nrodoc").val();
//
//
//    $.ajax({
//        data: {
//            tipodoc: tipodoc,
//            nrodoc: nrodoc
//        },
//        url: url,
//        headers: {
//            "X-CSRF-TOKEN": token
//        }, //send CSRF token in header
//        dataType: "json", //tipo de datos retornados
//        type: "GET",
//        success: function (response) {
//            return response;
//        }
//    });
//}


function formarUsuario() {

    //i = 0;

    var primerCaracterNombre = `${primernombre}`.substring(0, 1);

    var user = `${primerCaracterNombre}` + `${primerapellido}`;

    usuario = `${user}`.toLowerCase();
    
    url = direccionregistrousuario + "/consultarnombredeusuario";
    
    $.ajax({
        data: {
            username: usuario
        },
        url: url,
        headers: {
            "X-CSRF-TOKEN": token
        }, //send CSRF token in header
        dataType: "json", //tipo de datos retornados
        type: "GET",
        success: function (response) {
            if(response["username"]!==null){
                 usuario=usuario+"1";
            }
            
            
            
           
        }
    });
    
    return usuario;

//    while (consultarNombreUsuarioExiste()) {
//        i++;
//        usuario = usuario + i;
//    }
}


function validarClaves() {

    clave1 = $("#claveprimercampo").val();
    clave2 = $("#clavesegundocampo").val();

//valida claves iguales en los dos campos
    if (`${clave1}` !== `${clave2}`) {
        coderrorclave = "1";
        return coderrorclave;
    }

    if (`${clave1}`.length < 8 || `${clave1}`.length > 15) {
        coderrorclave = "2";
        return coderrorclave;
    }


}
;
