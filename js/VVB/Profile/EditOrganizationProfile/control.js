
$(document).ready(function () {

    $('#btnEditOrgProfile').click(
    function () {
        var _locationsJSON = PrepareLocationsJSON();
        $('#OrganizationLocations').val(_locationsJSON);
        updateValueWorkAreaText();
        updateValueWorkAreaCheck();
    });

    $('#btnHideDetails').hide();
    $('#btnAddDetails').show();
    $('#dvShowDetails').hide();
    $('#btnEditOrgProfile').attr('disabled', 'disabled');

    $('#btnAddDetails').click(
    function () {
        $('#btnHideDetails').show();
        $('#dvShowDetails').show();
        $('#btnAddDetails').hide();
    });

    $('#btnHideDetails').click(
    function () {
        $('#btnHideDetails').hide();
        $('#btnAddDetails').show();
        $('#dvShowDetails').hide();
    });

    $("#termsAndCondition").change(function () {
        if ($(this).is(":checked")) {
            $('#btnEditOrgProfile').removeAttr('disabled');
        }
    });

    updateValueWorkAreaCheck();


});



/*
Preparing JSON for Locations added
*/

function PrepareLocationsJSON() {
    //debugger;
    var countryId = "CountryCode";
    var address = "Address";
    var postalCode = "PostalCode";
    var latitude = "Latitude";
    var longitude = "Longitude";

    var tableObject = $('input[name^=addressBox]').map(function (i) {
        var row = {};
        row[countryId] = $(this).data('countryid');
        row[postalCode] = $(this).data('postalcode');
        row[latitude] = $(this).data('latitude');
        row[longitude] = $(this).data('longitude');
        row[address] = $(this).val();
        return row;
    }).get();
    var strJson = JSON.stringify(tableObject);
    if (strJson == "[]") strJson = "";
    return strJson;
}

/*
JS Methods for Area of Focus
*/


function PrepareAreaOfFocusJSON() {
    //debugger;
    var rowName1 = 'value';
    var rowName2 = 'text';
    var tableObject = $('span[class^=ChkWorkArea]').map(function (i) {
        var row = {};
        row[rowName1] = $(this).data('workareavalue');
        row[rowName2] = $(this).data('workareavalue');
        return row;
    }).get();
    return tableObject;
}

    $('#volunteer-tag').tagsinput({
        itemValue: 'value',
        itemText: 'text',
        typeahead: {
            source: PrepareAreaOfFocusJSON(),
            sorter: function (items) {
                return items.sort();
            }
        },
    });

    /*Adding method to prevent enter from being click*/
    $("#volunteer-tag").next().children('input').attr("onkeypress", "handleJobEvent(event)");
    //Adding input tag from dropdown
    $('#volunteer-tag').on('itemAdded', function (event) {
        var lengthInputTag = $("#volunteer-tag").next().children().length;
        if (lengthInputTag == 1) {
            $("#volunteer-tag").next().children('input').attr("placeholder", "Add Work Area");
        } else if (lengthInputTag > 1) {
            $("#volunteer-tag").next().children('input').attr("placeholder", " ");
        }
        // event.item: contains the item
    });


function updateValueWorkAreaCheck() {
    var listOfAreaOfFocus = [], listOfAreaOfFocusObject = {};
    var listAreaOfFocusIDs = "";
    var listNotInterestedIDs = "";
    $('span.ChkWorkArea').each(function (i) {
        var id = $(this).data('workareaid');
        if ($(this).hasClass("tick")) {
            listOfAreaOfFocusObject = { 'text': ' ', 'value': ' ' };
            //getting current node elements
            currentnode = $(this).data('workareavalue');
            listOfAreaOfFocusObject.text = currentnode;
            listOfAreaOfFocusObject.value = currentnode;
            console.log(listOfAreaOfFocusObject);
            listOfAreaOfFocus.push(listOfAreaOfFocusObject);
            if (listAreaOfFocusIDs == "") {
                listAreaOfFocusIDs = id;
            }
            else {
                listAreaOfFocusIDs = listAreaOfFocusIDs + "," + id;
            }
        }
        if ($(this).hasClass("cross")) {
            if (listNotInterestedIDs == "") {
                listNotInterestedIDs = id;
            }
            else {
                listNotInterestedIDs = listNotInterestedIDs + "," + id;
            }
        }
    });
    $('#WorkAreaIDs').val(listAreaOfFocusIDs);
    $('#WorkAreaNotInterestedIDs').val(listNotInterestedIDs);
    $('#volunteer-tag').tagsinput('removeAll');
    $("#volunteer-tag").tagsinput("refresh");
    for (i = 0 ; i < listOfAreaOfFocus.length ; i++) {
        $("#volunteer-tag").tagsinput('add', listOfAreaOfFocus[i]);
    }
    $("#volunteer-tag").next().children('input').attr("placeholder", " ");
}


function updateValueWorkAreaText() {
    $("#volunteer-tag").tagsinput("refresh");
    var tagsValue = $("#volunteer-tag").val();
    var tagsList = tagsValue.split(",");
    $('span.ChkWorkArea').each(function (i) {
        if ($(this).hasClass("tick")) {
            $(this).removeClass("tick");
            $(this).addClass("blank");
        }
    });
    $('span.ChkWorkArea').each(function (i) {
        for (j = 0 ; j < tagsList.length ; j++) {
            if ($(this).data('workareavalue') === tagsList[j]) {
                $(this).removeClass("blank");
                $(this).addClass("tick");
            }
        }
    });
}


/*
JS Methods for Area of Focus ends
*/

//Stop enter from being execute.
function doNothing() {
    var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (keyCode == 13) {
        if (!e) var e = window.event;
        e.cancelBubble = true;
        e.returnValue = false;

        if (e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();
        }
    }
}
function handleJobEvent(event) {

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



$(document).ready(function () {
    $(".checkboxUpdated").on("click", ".checkboxPropagation", function (event) {
        var destinedElement = $(this).children("span");
        //console.log(destinedElement[0].className);
        var className = destinedElement[0].className;
        //Informataion about tick
        tickConfirm = className.indexOf("tick");
        crossConfirm = className.indexOf("cross");
        if (tickConfirm == -1 && crossConfirm == -1) {
            destinedElement.removeClass('cross');
            destinedElement.removeClass('blank');
            destinedElement.addClass('tick');
        }
        if (tickConfirm > -1) {
            destinedElement.removeClass('tick');
            destinedElement.addClass('cross');
            destinedElement.next().addClass('strikeThrough');
        }
        if (crossConfirm > -1) {
            destinedElement.removeClass('cross');
            destinedElement.next().removeClass('strikeThrough');
            destinedElement.addClass('blank');
        }
    });
    $(".buttonWrapper").on("click", ".jsBlank", function (e) {
        $(".checkboxPropagation").children("span").removeClass("tick");
        $(".checkboxPropagation").children("span").removeClass("cross");
        $(".checkboxPropagation").children("span").next("label").removeClass("strikeThrough");
        $(".checkboxPropagation").children("span").addClass("blank");
    });
    $(".buttonWrapper").on("click", ".jsTick", function (e) {
        $(".checkboxPropagation").children("span").removeClass("blank");
        $(".checkboxPropagation").children("span").removeClass("cross");
        $(".checkboxPropagation").children("span").next("label").removeClass("strikeThrough");
        $(".checkboxPropagation").children("span").addClass("tick");
    });
    $(".buttonWrapper").on("click", ".jsStrikeThrough", function (e) {
        $(".checkboxPropagation").children("span").removeClass("blank");
        $(".checkboxPropagation").children("span").removeClass("tick");
        $(".checkboxPropagation").children("span").addClass("cross");
        $(".checkboxPropagation").children("span").next("label").addClass("strikeThrough");
    });
});