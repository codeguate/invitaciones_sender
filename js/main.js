function cargarCods(){
    $.ajax({
        type: "GET",
        url: "http://somosinflumedia.com/backend/public/api/pendientes",
        dataType: "json",
        success: function (response) {
            let text = "<option value=''>Escoge un Codigo</option>";
            

            response.forEach(element => {
                text += "<option value='"+element.codigo+"'>"+element.codigo+"</option>";
            });
            $("#codigo").html(text)
        },
        error: function (error){

        }
    });
}

$(document).ready(function () {
    cargarCods();
    $("#send").click(function (e) { 
        setTimeout(() => {
            $("#loaderModal").modal('show');
            
        }, 500);
        let data = {
            type:"foto",
            email:$("#email").val(),
            nombre:$("#nombre").val().replace(/ /g, "%20"),
            codigo:$("#codigo").val()
        }
        let url = "http://somosinflumedia.com/backend/public/api/send?type=foto&email="+data.email+"&nombre="+data.nombre+"&codigo="+data.codigo;
        // console.log(url);
        $.ajax({
            type: "GET",
            async: true,
            url: url,
            success: async function (response) {
                await cargarCods();
                $("#invitacion").attr("src",'');
                $("#invitacion").attr("src",response.url);
                $("#email").val('');
                $("#nombre").val('');
                $("#codigo").val('');
                $("#email").focus();

                setTimeout(() => {
                    $("#alertModal").removeClass('d-none')
                    $("#loaderModal").modal('hide');
                }, 500);

                setTimeout(() => {
                    $("#alertModal").addClass('d-none')
                }, 3500);
                // console.log(response);
            },
            error: function (error){
                console.log(error);
            }
        });
    });
});
