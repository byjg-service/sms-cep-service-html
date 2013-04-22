function ConsultarCEP() {
    var cep = $("#Address_CEP").val().replace('-', '');
    if ((cep != "") && ($.trim(cep).length == 8)) {
        $(".Loading").removeClass("Hide");
        $.ajax({ type: "GET", url: "cep.php?cep=" + cep,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            timeout: 5000,
            success: function (msg) {
                if (msg.length > 1) {
                    $('#Address_Endereco').val(msg[0].replace(/^\s+|\s+$/g, ""));
                    $('#Address_Bairro').val(msg[1].replace(/^\s+|\s+$/g, ""));
                    $('#Address_Cidade').val(msg[2].replace(/^\s+|\s+$/g, ""));
                    var estado = $("#Address_Estado");
                    estado.val(msg[3].replace(/^\s+|\s+$/g, ""));
                    estado.attr("selected", "true");
                    $('#lblSubTotaEntrega').text(msg[4]);
                    $('#HiddenFieldValueDelivery').val(msg[4]);
                    $("#Address_Numero").focus();

                } else {
                    ClearCepFields(false);
                }
                $("#divEnderecoElements").removeClass("Hide");
                $(".Loading").addClass("Hide");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#divEnderecoElements").removeClass("Hide");
                $(".Loading").addClass("Hide");
            }
        });
    }
}

function ClearCepFields(limpaCep) {
    $('#Address_Endereco').val("");
    $('#Address_Bairro').val("");
    $('#Address_Cidade').val("");
    $("#Address_Estado").val("");
    if (limpaCep)
        $("#Address_CEP").val("")
}

$(function () {
    $("#Address_CEP").keyup(function () {
        ConsultarCEP();
    });

    $("#Address_Estado").change(function () {
        var estado = $("#Address_Estado").val();
    });
});



