$(document).ready(function () {
    //skills suggestion

    $('#errorMsg3').hide();
    var errorList3 = $('#errorList3');
    var skillname = $("#skillname");
    var skillDescription = $("#skillDescription");
    var SkillLink = $("#SkillLink");

    $('#suggestSkillForm')
    $('#suggestSkillForm').submit(function (e) {
        e.preventDefault();
        if (skillname.val() == '' || skillname.val() == null) {
            if (errorList3.find('.errormessage-skillname').length == 0) {
                $('<li />', { html: 'Skill is required !', class: 'col-sm-6 errormessage-skillname' })
                .appendTo(errorList3)
                .click(function () {
                    skillname.focus();
                })
                //$('#errorMsg').show();
                skillname.parent().addClass('has-error');
            }
        }
        else {
            if (skillname.parent().hasClass('has-error')) {
                skillname.parent().removeClass('has-error')
            };
            if (errorList3.find('.errormessage-skillname').length > 0) {
                errorList3.find('.errormessage-skillname').remove();
                //$('#errorMsg').hide();
            }
        }
        //text area for description
        if (skillDescription.val() == '' || skillDescription.val() == null) {
            if (errorList3.find('.errormessage-skillDescription').length == 0) {
                $('<li />', { html: 'Skill is required !', class: 'col-sm-6 errormessage-skillDescription' })
                .appendTo(errorList3)
                .click(function () {
                    skillDescription.focus();
                })
                //$('#errorMsg').show();
                skillDescription.parent().addClass('has-error');
            }
        }
        else {
            if (skillDescription.parent().hasClass('has-error')) {
                skillDescription.parent().removeClass('has-error')
            };
            if (errorList3.find('.errormessage-skillDescription').length > 0) {
                errorList3.find('.errormessage-skillDescription').remove();
                //$('#errorMsg').hide();
            }
        }

        //link is required
        if (SkillLink.val() == '' || SkillLink.val() == null) {
            if (errorList3.find('.errormessage-SkillLink').length == 0) {
                $('<li />', { html: 'Skill link is required !', class: 'col-sm-6 errormessage-SkillLink' })
                .appendTo(errorList3)
                .click(function () {
                    SkillLink.focus();
                })
                //$('#errorMsg').show();
                SkillLink.parent().addClass('has-error');
            }
        }
        else {
            if (SkillLink.parent().hasClass('has-error')) {
                SkillLink.parent().removeClass('has-error')
            };
            if (errorList3.find('.errormessage-SkillLink').length > 0) {
                errorList3.find('.errormessage-SkillLink').remove();
                //$('#errorMsg').hide();
            }
        }

        if (errorList3.children('li').length > 0) {
            $('#errorMsg3').show();
        } else {
            $('#errorMsg3').hide();
            $('#suggestSkillBox').modal('hide');
        }

    });

    //suggest diploma/certificate
    $('#errorMsg4').hide();
    var errorList4 = $('#errorList4');
    var diplomaname = $("#diplomaname");
    var diplomaDescription = $("#diplomaDescription");
    var diplomaLink = $("#diplomaLink");

    $('#suggestDiplomaForm').submit(function (e) {
        e.preventDefault();
        if (diplomaname.val() == '' || diplomaname.val() == null) {
            if (errorList4.find('.errormessage-diplomaname').length == 0) {
                $('<li />', { html: 'Name is required !', class: 'col-sm-6 errormessage-diplomaname' })
                .appendTo(errorList4)
                .click(function () {
                    diplomaname.focus();
                })
                //$('#errorMsg').show();
                diplomaname.parent().addClass('has-error');
            }
        }
        else {
            if (diplomaname.parent().hasClass('has-error')) {
                diplomaname.parent().removeClass('has-error')
            };
            if (errorList4.find('.errormessage-diplomaname').length > 0) {
                errorList4.find('.errormessage-diplomaname').remove();
                //$('#errorMsg').hide();
            }
        }
        //text area for description
        if (diplomaDescription.val() == '' || diplomaDescription.val() == null) {
            if (errorList4.find('.errormessage-diplomaDescription').length == 0) {
                $('<li />', { html: 'Description is required !', class: 'col-sm-6 errormessage-diplomaDescription' })
                .appendTo(errorList4)
                .click(function () {
                    diplomaDescription.focus();
                })
                //$('#errorMsg').show();
                diplomaDescription.parent().addClass('has-error');
            }
        }
        else {
            if (diplomaDescription.parent().hasClass('has-error')) {
                diplomaDescription.parent().removeClass('has-error')
            };
            if (errorList4.find('.errormessage-diplomaDescription').length > 0) {
                errorList4.find('.errormessage-diplomaDescription').remove();
                //$('#errorMsg').hide();
            }
        }

        //link is required
        if (diplomaLink.val() == '' || diplomaLink.val() == null) {
            if (errorList4.find('.errormessage-diplomaLink').length == 0) {
                $('<li />', { html: 'Diploma/certificate link is required !', class: 'col-sm-6 errormessage-diplomaLink' })
                .appendTo(errorList4)
                .click(function () {
                    diplomaLink.focus();
                })
                //$('#errorMsg').show();
                diplomaLink.parent().addClass('has-error');
            }
        }
        else {
            if (diplomaLink.parent().hasClass('has-error')) {
                diplomaLink.parent().removeClass('has-error')
            };
            if (errorList4.find('.errormessage-diplomaLink').length > 0) {
                errorList4.find('.errormessage-diplomaLink').remove();
                //$('#errorMsg').hide();
            }
        }

        if (errorList4.children('li').length > 0) {
            $('#errorMsg4').show();
        } else {
            $('#errorMsg4').hide();
            $('#suggestDiplomaBox').modal('hide');
            diplomaname.val('');
            diplomaDescription.val('');
            diplomaLink.val('');
        }

    });
});