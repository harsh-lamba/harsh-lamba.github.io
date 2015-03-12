$(document).ready(function () {
    //to change the font-size of the body text
    $("#change-size a").on('click', function () {
        $("#change-size span").toggle();
        $('body').toggleClass('body-font-size');
    });

    //to add the alt tag in the language select dropdown
    $("#_cultureDDL_titletext img").attr('alt', 'language');
    //to change the caret used in select dropdown option from accessibility purpose
    $("#_cultureDDL_arrow").append('<b class="caret"></b>');
})