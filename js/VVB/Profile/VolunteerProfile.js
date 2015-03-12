$(document).ready(function(){
    $("#work").click(function () {
        $("#group-workarea").removeClass("ishidden");
        $(this).hide();
        $("#hidework").show();
    });

    $("#hidework").click(function () {
        $("#group-workarea").addClass("ishidden");
        $(this).hide();
        $("#work").show();
    });

    $("#skills").click(function () {
        $("#group-skills").removeClass("ishidden");
        $(this).hide();
        $("#hideskills").show();
    });

    $("#hideskills").click(function () {
        $("#group-skills").addClass("ishidden");
        $(this).hide();
        $("#skills").show();
    });


    $("#time").click(function () {
        $("#group-time").removeClass("ishidden");
        $(this).hide();
        $("#hidetime").show();
    });

    $("#hidetime").click(function () {
        $("#group-time").addClass("ishidden");
        $(this).hide();
        $("#time").show();
    });

    $("#social").click(function () {
        if ($("#group-social").hasClass("ishidden")) {
            $("#group-social").removeClass("ishidden");
            $(this).removeClass("btn-primary");
            $(this).addClass("btn-danger");
            $(this).text("Hide Time Preferences");
        }
        else {
            $("#group-social").addClass("ishidden");
            $(this).addClass("btn-primary");
            $(this).removeClass("btn-danger");
            $(this).text("Add Time Preferences");
        }

    });
    
    $(".weekdayscheckbox input:checkbox").click(function () {
        //debugger;
        var intervalCodes = $(this).data("dow").split('-');
        var intervalCode = "";
        var daycode = "";
        var checked = $(this).is(":checked");
        if (intervalCodes.length >= 2) {
            daycode = $.trim(intervalCodes[0]);
            intervalCode = $.trim(intervalCodes[1]);
        }
        if (intervalCode != "")
        {
            //alert(daycode);
            $('.dvDaysOfWeek input:checkbox').each(function (i) {
                
                if (daycode == "All Weekdays") {
                    if ($(this).data("dow").indexOf(intervalCode) >= 0 && $(this).data("dow").indexOf("SUN") < 0 && $(this).data("dow").indexOf("SAT") < 0 && $(this).data("dow").indexOf("Weekends") < 0) {
                        $(this).prop('checked', checked);
                    }
                }
                if (daycode == "Weekends") {
                    
                    if ($(this).data("dow").indexOf(intervalCode) >= 0 && ($(this).data("dow").indexOf("SUN") >= 0 || $(this).data("dow").indexOf("SAT") >= 0 ) && $(this).data("dow").indexOf("Weekdays") < 0) {
                        $(this).prop('checked', checked);
                    }
                }
            });
        }
    });

    updateValueSkillCheck();
    updateValueDiplomaCheck();
    updateValueCategoryCheck();
    updateValueworkCheck();
    updateValueDowCheck();

    $("#projOrganization").autocomplete({
        minLength: 3,
        source: function (request, response) {
            var Organization = new Array();
            $.ajax({
                async: false,
                cache: false,
                type: "POST",
                url: "OrganizationAutoComplete",
                data: { "term": request.term },
                success: function (data) {                    
                    for (var i = 0; i < data.length ; i++) {                        
                        Organization[i] = { label: data[i].OrganizationName, Id: data[i].OrganizationToken };
                    }
                }
            });
            response(Organization);
        },
        select: function (event, ui) {
            //fill selected customer details on form

        }
    });

    $("#jobOrganization").autocomplete({
        minLength: 3,
        source: function (request, response) {
            var Organization = new Array();
            $.ajax({
                async: false,
                cache: false,
                type: "POST",
                url: "OrganizationAutoComplete",
                data: { "term": request.term },
                success: function (data) {
                    for (var i = 0; i < data.length ; i++) {
                        Organization[i] = { label: data[i].OrganizationName, Id: data[i].OrganizationToken };
                    }
                }
            });
            response(Organization);
        },
        select: function (event, ui) {
            //fill selected customer details on form

        }
    });   
    
});

function PrepareSkillJSON() {
    //debugger;
    var rowName1 = 'value';
    var rowName2 = 'text';
    var tableObject = $('input[name^=SkillSet]').map(function (i) {
        var row = {};
        row[rowName1] = $(this).val();
        row[rowName2] = $(this).val();
        return row;
    }).get();
    return tableObject;
}

$('#skill-tag').tagsinput({
    itemValue: 'value',
    itemText: 'text',
    typeahead: {
        source: PrepareSkillJSON(),
        sorter: function (items) {
            return items.sort();
        }
    },
});
/*Adding method to prevent enter from being click*/
$("#skill-tag").next().children('input').attr("onkeypress", "handleProfileEvent(event)");

function updateValueSkillCheck() {
    //debugger;
    var listOfSkill = [], listofSkillsObject = {};
    var lstSkillIds = "";

    $('input:checkbox.ChkSkills').each(function (i) {
        if ($(this).is(":checked")) {
            listofSkillsObject = { 'text': ' ', 'value': ' ' };
            //getting current node elements
            currentnode = $(this).val();
            listofSkillsObject.text = currentnode;
            listofSkillsObject.value = currentnode;
            //console.log(listofSkillsObject);
            listOfSkill.push(listofSkillsObject);
            var id = $(this).data('skillid');
            if (lstSkillIds == "") {
                lstSkillIds = id;
            }
            else {
                lstSkillIds = lstSkillIds + "," + id;
            }
        }
    });
    
    $('#SkillIds').val(lstSkillIds);
    $('#skill-tag').tagsinput('removeAll');
    $("#skill-tag").tagsinput("refresh");
    for (i = 0 ; i < listOfSkill.length ; i++) {
        $("#skill-tag").tagsinput('add', listOfSkill[i]);
    }
    $("#skill-tag").next().children('input').attr("placeholder", " ");
}
//Adding input tag from dropdown
$('#skill-tag').on('itemAdded', function (event) {
    
    var lengthInputTag = $("#skill-tag").next().children().length;
    if (lengthInputTag == 1) {
        $("#skill-tag").next().children('input').attr("placeholder", "Add Skills");
    } else if (lengthInputTag > 1) {
        $("#skill-tag").next().children('input').attr("placeholder", " ");
    }
    updateSkillValue($("#skill-tag").val());
    // event.item: contains the item
});

/* On Removing tags */
$('#skill-tag').on('itemRemoved', function (event) {
    
    var lengthInputTag = $("#skill-tag").next().children().length;
    if (lengthInputTag == 1) {
        $("#skill-tag").next().children('input').attr("placeholder", "Add Skills");
    }
    updateSkillValue($("#skill-tag").val());
});

function updateSkillValue(skills)
{
    var skillarray = skills.split(',');
    var listOfSkill = [], listofSkillsObject = {};
    var lstSkillIds = "";
    if (skillarray.length > 0) {
        $('input:checkbox.ChkSkills').each(function (i) {            
            if ($.inArray($(this).val(), skillarray) >= 0) {
                var id = $(this).data('skillid');
                $(this).prop('checked', true);
                if (lstSkillIds == "") {
                    lstSkillIds = id;
                }
                else {
                    lstSkillIds = lstSkillIds + "," + id;
                }
            }
            else {
                $(this).prop('checked', false);
            }
        });
    }
    $('#SkillIds').val(lstSkillIds);
}


//Diploma Modal

function PrepareDiplomaJSON() {
    //debugger;
    var rowName1 = 'value';
    var rowName2 = 'text';
    var tableObject = $('input[name^=diplomaSet]').map(function (i) {
        var row = {};
        row[rowName1] = $(this).val();
        row[rowName2] = $(this).val();
        return row;
    }).get();
    return tableObject;
}

$('#diploma-tag').tagsinput({
    itemValue: 'value',
    itemText: 'text',
    typeahead: {
        source: PrepareDiplomaJSON(),
        sorter: function (items) {
            return items.sort();
        }
    },
});
/*Adding method to prevent enter from being click*/
$("#diploma-tag").next().children('input').attr("onkeypress", "handleProfileEvent(event)");

function updateValueDiplomaCheck() {
    //debugger;
    var listOfDiploma = [], listofdiplomasObject = {};
    var lstDiplomaIds = "";

    $('input:checkbox.ChkDiploma').each(function (i) {
        if ($(this).is(":checked")) {
            listofdiplomasObject = { 'text': ' ', 'value': ' ' };
            //getting current node elements
            currentnode = $(this).val();
            listofdiplomasObject.text = currentnode;
            listofdiplomasObject.value = currentnode;
            listOfDiploma.push(listofdiplomasObject);
            var id = $(this).data('diplomaid');
            if (lstDiplomaIds == "") {
                lstDiplomaIds = id;
            }
            else {
                lstDiplomaIds = lstDiplomaIds + "," + id;
            }
        }
    });

    $('#DiplomaIds').val(lstDiplomaIds);
    $('#diploma-tag').tagsinput('removeAll');
    $("#diploma-tag").tagsinput("refresh");
    for (i = 0 ; i < listOfDiploma.length ; i++) {
        $("#diploma-tag").tagsinput('add', listOfDiploma[i]);
    }
    $("#diploma-tag").next().children('input').attr("placeholder", " ");
}
//Adding input tag from dropdown
$('#diploma-tag').on('itemAdded', function (event) {

    var lengthInputTag = $("#diploma-tag").next().children().length;
    if (lengthInputTag == 1) {
        $("#diploma-tag").next().children('input').attr("placeholder", "Add categories");
    } else if (lengthInputTag > 1) {
        $("#diploma-tag").next().children('input').attr("placeholder", " ");
    }
    updateDiplomaValue($("#diploma-tag").val());
    // event.item: contains the item
});

/* On Removing tags */
$('#diploma-tag').on('itemRemoved', function (event) {

    var lengthInputTag = $("#diploma-tag").next().children().length;
    if (lengthInputTag == 1) {
        $("#diploma-tag").next().children('input').attr("placeholder", "Add categories");
    }
    updateSkillValue($("#diploma-tag").val());
});

function updateDiplomaValue(diplomas) {
    var diplomaarray = diplomas.split(',');
    var lstDiplomaIds = "";
    if (diplomaarray.length > 0) {
        $('input:checkbox.ChkDiploma').each(function (i) {
            if ($.inArray($(this).val(), diplomaarray) >= 0) {
                var id = $(this).data('diplomaid');
                $(this).prop('checked', true);
                if (lstDiplomaIds == "") {
                    lstDiplomaIds = id;
                }
                else {
                    lstDiplomaIds = lstDiplomaIds + "," + id;
                }
            }
            else {
                $(this).prop('checked', false);
            }
        });
    }
    $('#DiplomaIds').val(lstDiplomaIds);
}

//Category Modal

function PreparecategoryJSON() {
    //debugger;
    var rowName1 = 'value';
    var rowName2 = 'text';
    var tableObject = $('input[name^=categorySet]').map(function (i) {
        var row = {};
        row[rowName1] = $(this).val();
        row[rowName2] = $(this).val();
        return row;
    }).get();
    return tableObject;
}

$('#category-tag').tagsinput({
    itemValue: 'value',
    itemText: 'text',
    typeahead: {
        source: PreparecategoryJSON(),
        sorter: function (items) {
            return items.sort();
        }
    },
});
/*Adding method to prevent enter from being click*/
$("#category-tag").next().children('input').attr("onkeypress", "handleProfileEvent(event)");

function updateValueCategoryCheck() {

    //debugger;
    var listOfcategory = [], listofcategoryObject = {};
    var lstCategoryIds = "";

    $('input:checkbox.ChkCategory').each(function (i) {
        if ($(this).is(":checked")) {
            listofcategoryObject = { 'text': ' ', 'value': ' ' };
            //getting current node elements
            currentnode = $(this).val();
            listofcategoryObject.text = currentnode;
            listofcategoryObject.value = currentnode;
            listOfcategory.push(listofcategoryObject);
            var id = $(this).data('categoryid');
            if (lstCategoryIds == "") {
                lstCategoryIds = id;
            }
            else {
                lstCategoryIds = lstCategoryIds + "," + id;
            }
        }
    });

    $('#CategoryIds').val(lstCategoryIds);
    $('#category-tag').tagsinput('removeAll');
    $("#category-tag").tagsinput("refresh");
    for (i = 0 ; i < listOfcategory.length ; i++) {
        $("#category-tag").tagsinput('add', listOfcategory[i]);
    }
    $("#category-tag").next().children('input').attr("placeholder", " ");
}
//Adding input tag from dropdown
$('#category-tag').on('itemAdded', function (event) {
    
    var lengthInputTag = $("#category-tag").next().children().length;
    if (lengthInputTag == 1) {
        $("#category-tag").next().children('input').attr("placeholder", "Add categories");
    } else if (lengthInputTag > 1) {
        $("#category-tag").next().children('input').attr("placeholder", " ");
    }
    updatecategoryValue($("#category-tag").val());
    // event.item: contains the item
});

/* On Removing tags */
$('#category-tag').on('itemRemoved', function (event) {

    var lengthInputTag = $("#category-tag").next().children().length;
    if (lengthInputTag == 1) {
        $("#category-tag").next().children('input').attr("placeholder", "Add categories");
    }
    updatecategoryValue($("#category-tag").val());
});

function updatecategoryValue(categories) {
    //debugger;
    var categoryarray = categories.split(',');
    var lstCategoryIds = "";
    if (categoryarray.length > 0) {
        $('input:checkbox.ChkCategory').each(function (i) {
           
            if ($.inArray($(this).val(), categoryarray) >= 0) {
                var id = $(this).data('categoryid');
                $(this).prop('checked', true);
                if (lstCategoryIds == "") {
                    lstCategoryIds = id;
                }
                else {
                    lstCategoryIds = lstCategoryIds + "," + id;
                }
            }
            else {
                $(this).prop('checked', false);
            }
        });
    }
    $('#CategoryIds').val(lstCategoryIds);
}

//work Modal

function PrepareworkJSON() {
    //debugger;
    var rowName1 = 'value';
    var rowName2 = 'text';
    var tableObject = $('input[name^=workSet]').map(function (i) {
        var row = {};
        row[rowName1] = $(this).val();
        row[rowName2] = $(this).val();
        return row;
    }).get();
    return tableObject;
}

$('#work-tag').tagsinput({
    itemValue: 'value',
    itemText: 'text',
    typeahead: {
        source: PrepareworkJSON(),
        sorter: function (items) {
            return items.sort();
        }
    },
});
/*Adding method to prevent enter from being click*/
$("#work-tag").next().children('input').attr("onkeypress", "handleProfileEvent(event)");

function updateValueworkCheck() {

    //debugger;
    var listOfwork = [], listofworkObject = {};
    var lstWorkAreaIds = "";

    $('input:checkbox.ChkWork').each(function (i) {
        if ($(this).is(":checked")) {
            listofworkObject = { 'text': ' ', 'value': ' ' };
            //getting current node elements
            currentnode = $(this).val();
            listofworkObject.text = currentnode;
            listofworkObject.value = currentnode;
            listOfwork.push(listofworkObject);
            var id = $(this).data('workid');
            if (lstWorkAreaIds == "") {
                lstWorkAreaIds = id;
            }
            else {
                lstWorkAreaIds = lstWorkAreaIds + "," + id;
            }
        }
    });

    $('#WorkAreaIds').val(lstWorkAreaIds);
    $('#work-tag').tagsinput('removeAll');
    $("#work-tag").tagsinput("refresh");
    for (i = 0 ; i < listOfwork.length ; i++) {
        $("#work-tag").tagsinput('add', listOfwork[i]);
    }
    $("#work-tag").next().children('input').attr("placeholder", " ");
}
//Adding input tag from dropdown
$('#work-tag').on('itemAdded', function (event) {

    var lengthInputTag = $("#work-tag").next().children().length;
    if (lengthInputTag == 1) {
        $("#work-tag").next().children('input').attr("placeholder", "Add work interests");
    } else if (lengthInputTag > 1) {
        $("#work-tag").next().children('input').attr("placeholder", " ");
    }
    updateworkValue($("#work-tag").val());
    // event.item: contains the item
});

/* On Removing tags */
$('#work-tag').on('itemRemoved', function (event) {

    var lengthInputTag = $("#work-tag").next().children().length;
    if (lengthInputTag == 1) {
        $("#work-tag").next().children('input').attr("placeholder", "Add work interests");
    }    
    updateworkValue($("#work-tag").val());
});

function updateworkValue(works) {
    //debugger;
    var workarray = works.split(',');
    var lstWorkAreaIds = "";
    if (workarray.length > 0) {
        $('input:checkbox.ChkWork').each(function (i) {

            if ($.inArray($(this).val(), workarray) >= 0) {
                var id = $(this).data('workid');
                $(this).prop('checked', true);
                if (lstWorkAreaIds == "") {
                    lstWorkAreaIds = id;
                }
                else {
                    lstWorkAreaIds = lstWorkAreaIds + "," + id;
                }
            }
            else {
                $(this).prop('checked', false);
            }
        });
    }
    $('#WorkAreaIds').val(lstWorkAreaIds);
}

function PrepareDaysOfWeekJSON() {
    //debugger;
    var rowName1 = 'value';
    var rowName2 = 'text';
    var tableObject = $('input[name^=DateOfWeekSet]').map(function (i) {
        var row = {};
        row[rowName1] = $(this).val();
        row[rowName2] = $(this).val();
        return row;
    }).get();
    return tableObject;
}


$('#dow-tag').tagsinput({
    itemValue: 'value',
    itemText: 'text',
    typeahead: {
        source: PrepareDaysOfWeekJSON(),
        sorter: function (items) {
            return items.sort();
        }
    }
});

/*Adding method to prevent enter from being click*/
$("#dow-tag").next().children('input').attr("onkeypress", "handleJobEvent(event)");

function updateValueDowCheck() {
    var listOfDow = [], listofDowObject = {};
    var lstDayOfWeeks = "";
    $('.dvDaysOfWeek input:checkbox').each(function (i) {
        if ($(this).val().toLowerCase().indexOf("weekdays") < 0 && $(this).val().toLowerCase().indexOf("weekends") < 0) {
            if ($(this).is(":checked")) {
                listofDowObject = { 'text': ' ', 'value': ' ' };
                //getting current node elements
                currentnode = $(this).val();
                listofDowObject.text = currentnode;
                listofDowObject.value = currentnode;
                listOfDow.push(listofDowObject);
            }
        }
    });

    $('#dow-tag').tagsinput('removeAll');
    $("#dow-tag").tagsinput("refresh");
    for (i = 0; i < listOfDow.length ; i++) {
        $("#dow-tag").tagsinput('add', listOfDow[i]);
    }
    $("#dow-tag").next().children('input').attr("placeholder", " ");
}

//Adding input tag from dropdown
$('#dow-tag').on('itemAdded', function (event) {
    var lengthInputTag = $("#dow-tag").next().children().length;
    if (lengthInputTag == 1) {
        $("#dow-tag").next().children('input').attr("placeholder", "Add days of the week");
    } else if (lengthInputTag > 1) {
        $("#dow-tag").next().children('input').attr("placeholder", " ");
    }
    updateDowValue($("#dow-tag").val());
});

/* On Removing tags */
$('#dow-tag').on('itemRemoved', function (event) {
    var lengthInputTag = $("#dow-tag").next().children().length;
    if (lengthInputTag == 1) {
        $("#dow-tag").next().children('input').attr("placeholder", "Add days of the week");
    }
    updateDowValue($("#dow-tag").val());
});

function updateValueDowText() {
    $("#dow-tag").tagsinput("refresh");
    var tagsValue = $("#dow-tag").val();
    var tagsList = tagsValue.split(",");
    //console.log(tagsList);
    $('.dvDaysOfWeek input:checkbox').each(function (i) {
        if ($(this).is(":checked")) {
            $(this).prop("checked", false);
        }
    });
    $('.dvDaysOfWeek input:checkbox').each(function (i) {
        for (j = 0 ; j < tagsList.length ; j++) {
            if ($(this).data("dow") === tagsList[j]) {
                $(this).prop("checked", true);
            }
        }
    });
}

function updateDowValue(dow) {
    var dowarray = dow.split(',');
    var lstdowIds = "";
    if (dowarray.length > 0) {
        $('.dvDaysOfWeek input:checkbox').each(function (i) {
            if ($(this).val().toLowerCase().indexOf("weekdays") < 0 && $(this).val().toLowerCase().indexOf("weekends") < 0) {
                if ($.inArray($(this).val(), dowarray) >= 0) {
                    var id = $(this).data('dow');
                    $(this).prop('checked', true);
                    if (lstdowIds == "") {
                        lstdowIds = id;
                    }
                    else {
                        lstdowIds = lstdowIds + "," + id;
                    }
                }
                else {
                    $(this).prop('checked', false);
                }
            }
        });
    }    
    $('#DayOfWeekIDs').val(lstdowIds);
}

function handleProfileEvent(event) {

    if (event) {
        var e = event;
    }
    else {
        var e = window.event;
    }
    var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
    if (keyCode == 13) {
        e.cancelBubble = true;
        e.returnValue = false;

        if (e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();
        }
    }
}


