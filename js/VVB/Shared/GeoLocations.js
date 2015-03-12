$(document).ready(function () {
    var completeAddress;

    $('#locationCountry, #locationZip, #locationNumber').on('change', function () {
        LoadCompleteAddress(false);
    });

    $('#boxAddress').on('click', '#removeCurrentNode', function (event) {
        $(this).parent().remove();
        if ($('#boxAddress span').length > 1) {
            $('#boxAddress span a').removeClass('hidden');
            $('#boxAddress span a').addClass('show');
        } else if ($('#boxAddress span').length == 1) {
            $('#boxAddress span a').removeClass('show');
            $('#boxAddress span a').addClass('hidden');
        }
    });
    $('#btnAddLocation').on('click', function (event) {
        var IsValid = ValidateAddress();
        if (IsValid) {
            LoadCompleteAddress(true);
        }
        else {
            event.preventDefault();
            event.stopPropagation();
        }
        return IsValid;
    });

    $('#linkAddLocation').on('click', function (event) {
        $('#locationCountry').val('');
        $('#locationZip').val('');
        $('#locationNumber').val('');
        $('#locationAddress').val('');
        
        $('#ErrCountryId').html("");
        $('#ErrZip').html("");
        $('#ErrNumber').html("");
        $('#ErrFullAddress').html("");
    });



});

function ValidateAddress() {
    var IsValid = true;
    var countryLocation = $('#locationCountry').val();
    var zipCodeLocation = $('#locationZip').val();
    var numberLocation = $('#locationNumber').val();
    if (countryLocation == "") {
        $('#ErrCountryId').html("Please select a Country.");
        IsValid = false;
    }
    else {
        $('#ErrCountryId').html("");
    }

    if (zipCodeLocation == "") {
        $('#ErrZip').html("Please provide a Zip Code.");
        IsValid = false;
    }
    else {
        $('#ErrZip').html("");
    }

    if (numberLocation == "") {
        $('#ErrNumber').html("Please provide an Address");
        IsValid = false;
    }
    else {
        $('#ErrNumber').html("");
    }
    return IsValid;
}

function addressLocationShow(countryCode, postalCode, latitude, longitude) {
    //Element to append
 
        var completeAddress = $('#locationAddress').val();

        var elementTextbox = "<span class='textBoxCrossIcon margin-top-10'>" +
                              "<input type='text' name='addressBox' class='form-control' value ='" + completeAddress + "' data-countryid='" + countryCode + "' data-postalcode='" + postalCode + "' data-latitude='" + latitude + "' data-longitude='" + longitude + "' placeholder='Address'/>" +
                              "<a id='removeCurrentNode'><i class='fa fa-times'></i></a> " +
                              "</span>";
        $('#boxAddress').append(elementTextbox);
        if ($('#boxAddress span').length > 1) {
            $('#boxAddress span a').removeClass('hidden');
            $('#boxAddress span a').addClass('show');
        } else if ($('#boxAddress span').length == 1) {
            $('#boxAddress span a').removeClass('show');
            $('#boxAddress span a').addClass('hidden');
        }
}


function GetLocation(address, showAddressLocation, countryCode, postalCode) {
    var IsValidGeoAddress = false;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address, 'componentRestrictions': { 'country': countryCode, 'postalCode': postalCode } }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            //alert("Latitude: " + latitude + "\nLongitude: " + longitude);
            IsValidGeoAddress = true;
            $('#ErrFullAddress').html("");
            if (showAddressLocation) {
                addressLocationShow(countryCode, postalCode, latitude, longitude);
            }
            else {
                $('#locationAddress').val(results[0].formatted_address);
            }

        } else {
            $('#locationAddress').val(address);
            $('#ErrFullAddress').html("Please provide a Valid Address.");
        }
    });
    return IsValidGeoAddress;
}


function LoadCompleteAddress(showAddressLocation) {
    var IsValidAddress = false;
    var countryLocation = $("#locationCountry option:selected").text();
    var countryCode = $('#locationCountry').val();
    var zipCodeLocation = $('#locationZip').val();
    var numberLocation = $('#locationNumber').val();
    if (zipCodeLocation.length != 0 && numberLocation.length != 0 && countryLocation.length != 0) {
        completeAddress = countryLocation + ", " + numberLocation + ", " + zipCodeLocation;
        IsValidAddress = GetLocation(completeAddress, showAddressLocation, countryCode, zipCodeLocation);
    }
    if (countryLocation != "") {
        $('#ErrCountryId').html("");
    }
    if (zipCodeLocation != "") {
        $('#ErrZip').html("");
    }
    if (numberLocation != "") {
        $('#ErrNumber').html("");
    }

    return IsValidAddress;
}