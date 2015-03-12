
 

$(document).ready(function () {

    /*
    date time picker
    */
    
    $('#datetimepicker8').datetimepicker({
      pickTime: false
    });
    $('#datetimepicker9').datetimepicker({
      pickTime: false
    });

    $("#datetimepicker8").on("dp.change", function (e) {
        //debugger;
       $('#datetimepicker9').data("DateTimePicker").setMinDate(e.date);

    });

    $("#datetimepicker9").on("dp.change",function (e) {
       $('#datetimepicker8').data("DateTimePicker").setMaxDate(e.date);
    });

    $('#btnExpandedTextArea').click(
    function () {
        //debugger;
        var txtExpandedDescription = $('#text-content-pop').val();
        $('#Description').val(txtExpandedDescription);

    });

    $('#zoomTextarea').click(
   function () {
       //debugger;
       var txtExpandedDescription = $('#Description').val();
       $('#text-content-pop').val(txtExpandedDescription);

   });
    


    $('#btnPostJob').click(
    function () {
        //debugger;
        var _questionsJSON = PrepareQuestionsJSON();
        $('#hdnQuestions').val(_questionsJSON);


        var _locationsJSON = PrepareLocationsJSON();
        $('#JobLocations').val(_locationsJSON);

        var _jobTitleJSON = PrepareJobTitleJSON();
        $('#JobTitleTranslations').val(_jobTitleJSON);

        var _jobDescJSON = PrepareJobDescriptionJSON();
        $('#JobDescriptionTranslations').val(_jobDescJSON);

        updateValueSkillText();
        updateValueSkillCheck();

        updateValueDiplomaText();
        updateValueDiplomaCheck();

        updateValueDowText();
        updateValueDowCheck();

        updateValueLanText();
        updateValueLanCheck();

    });

    // for first time updates
    updateValueSkillCheck();
    updateValueDiplomaCheck();
    updateValueDowCheck();
    updateValueLanCheck();
    updateValueScreeningCheck();

});
// TODO: get description from locatization
/*popover for job dropdown */
var element_job = "<span style='text-align:left; width:250px;color: #7c7c7a;font-family: Helvetica,Arial,sans-serif;font-size: 13px;'>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie cons.</span>";
$("#JobTypeCode").popover({
      title: "Job type",
      trigger: "focus"
});
$( "#JobTypeCode" ).focus(function(event) {
    event.preventDefault();
    $("#job-type").popover('show');
    $("#jobs div.popover-content").replaceWith(element_job);
    event.stopPropagation();
});
$("#JobTypeCode").focusout(function (event) {
    event.preventDefault();
    $("#job-type").popover('hide');
    event.stopPropagation();
});

/*popover for title */
var element_title1 = " ";
$("#JobTitle").popover({
      title: "What's the title?",
      trigger: "focus"
});
$( "#JobTitle" ).focus(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $("#title div.popover-content").replaceWith(element_title);
    $("#form-control-weight").popover('show');
});
$("#JobTitle").focusout(function (event) {
    event.preventDefault();
    event.stopPropagation();
    $("#JobTitle").popover('hide');
});
/*popover for textarea to descrbe the work to be done */
var element_describe = "<p style='text-align:left; width:250px;color: #7c7c7a;font-family: Helvetica,Arial,sans-serif;font-size: 13px;'>Provide an overview of your needs and what you’re looking for in the right volunteer. Add specifics here as needed, or use the Additional Information boxes below.</p>";
$("#Description").popover({
      title: "Describe the work?",
      trigger: "focus"
});
$("#Description").focus(function (event) {
    event.preventDefault();
    event.stopPropagation();
    $("#describe-work div.popover-content").replaceWith(element_describe);
    $("#Description").popover('show');
});
$("#Description").focusout(function (event) {
    event.preventDefault();
    event.stopPropagation();
    $("#Description").popover('hide');
});
/* skills popover */
$( document ).ready(function() {
  var size = 120;
  var pointer = $("#skills-popover").find("input:last");
  pointer.attr( "id", "skill-text" );
  pointer.attr( "size", size );
  pointer.parent().attr("id", "skills");

  var element_skills = "<p style='text-align:left; width:250px;color: #7c7c7a;font-family: Helvetica,Arial,sans-serif;font-size: 13px;'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.</p>";
  $("#skill-text").popover({
        title: "What skills are needed?",
        trigger: "focus"
  });
  $( "#skill-text" ).focus(function(event) {
      event.preventDefault();
      event.stopPropagation();
      pointer.attr( "size", size);
      $("#skills div.popover-content").replaceWith(element_skills);
      $("#skill-text").popover('show');
  });
  $( "#skill-text" ).focusout(function(event) {
      event.preventDefault();
      event.stopPropagation();
      $("#skill-text").popover('hide');
  });

    //translations
  $("#modal-jobTitle").click(function () {
      $('#JobCultureId').val('');
      $('#JobTitleCulture').val('');

      $('#ErrCultureId').html('');
      $('#ErrJobTitleCulture').html('');
      $('#ErrJobTitleGeneral').html('');
  });
  $("#modal-jobDescription").click(function () {
      $('#JobDescCultureId').val('');
      $('#JobDescCulture').val('');

      $('#ErrJDescCultureId').html('');
      $('#ErrJobDescCulture').html('');
      $('#ErrGeneralJobDescCulture').html('');
  });

  $("#btnUpdateJobTitleCulture").click(function (event) {
      var isValid = true;
      var culture = $('#JobCultureId').val();
      var title = $('#JobTitleCulture').val();

      if (culture == "") {
          isValid = false;
          $('#ErrCultureId').html('Please provide a valid culture.');
      }
      else {
          $('#ErrCultureId').html('');
      }
      if (title == "") {
          isValid = false;
          $('#ErrJobTitleCulture').html('Please provide a valid Job Title.');
      }
      else {
          $('#ErrJobTitleCulture').html('');
      }
      if (isValid) {
          var exists = false;
          $('[name^=tBox]').each(function (i) {

              var cultureCode = $(this).data('culturecode');
              if (cultureCode == culture) {
                  exists = true;
              }
          });
          if (exists) {
              $('#ErrJobTitleGeneral').html('Translation for the selected culture has been added already.');
              isValid = false;
          }
          else {
              $('#ErrJobTitleGeneral').html('');
          }
      }
      if (isValid) {
          addNewJobTitleCulture(culture, title);
      }
      else {
          event.preventDefault();
          event.stopPropagation();
      }
      return isValid;
  });

  $("#btnUpdateJobDescriptionCulture").click(function (event) {
      var isValid = true;
      var culture = $('#JobDescCultureId').val();
      var desc = $('#JobDescCulture').val();

      if (culture == "") {
          isValid = false;
          $('#ErrJDescCultureId').html('Please provide a valid culture.');
      }
      else {
          $('#ErrJDescCultureId').html('');
      }
      if (desc == "") {
          isValid = false;
          $('#ErrJobDescCulture').html('Please provide a valid Job description.');
      }
      else {
          $('#ErrJobDescCulture').html('');
      }
      if (isValid) {
          var exists = false;
          $('[name^=jobDescBox]').each(function (i) {

              var cultureCode = $(this).data('culturecode');
              if (cultureCode == culture) {
                  exists = true;
              }
          });
          if (exists) {
              $('#ErrGeneralJobDescCulture').html('Translation for the selected culture has been added already.');
              isValid = false;
          }
          else {
              $('#ErrGeneralJobDescCulture').html('');
          }
      }
      if (isValid) {
          addNewJobDescriptionCulture(culture, desc);
      }
      else {
          event.preventDefault();
          event.stopPropagation();
      }
      return isValid;
  });


});

/* Diplomas popover*/
$( document ).ready(function() {
  var pointer = $("#diploma-popover").find("input:last");
  pointer.attr( "id", "diploma-text" );
  pointer.attr( "size", "120" );
  pointer.parent().attr("id", "diplomas");

  var element_diploma = "<p style='text-align:left; width:250px;color: #7c7c7a;font-family: Helvetica,Arial,sans-serif;font-size: 13px;'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.</p>";
  $("#diploma-text").popover({
        title: "What Diplomas/Certificates are needed?",
        trigger: "focus"
  });
  $( "#diploma-text" ).focus(function(event) {
      event.preventDefault();
      event.stopPropagation();
      pointer.attr( "size", "120" );
      $("#diplomas div.popover-content").replaceWith(element_diploma);
      $("#diploma-text").popover('show');
  });
  $( "#diploma-text" ).focusout(function(event) {
      event.preventDefault();
      event.stopPropagation();
      $("#diploma-text").popover('hide');
  });
});


/* days of week popover*/
$( document ).ready(function() {
  var pointer = $("#dow-popover").find("input:last");
  pointer.attr( "id", "dow-text" );
  pointer.attr( "size", "120" );
  pointer.parent().attr("id", "dow");

  var element_dow = "<p style='text-align:left; width:250px;color: #7c7c7a;font-family: Helvetica,Arial,sans-serif;font-size: 13px;'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.</p>";
  $("#dow-text").popover({
        title: "Days of week",
        trigger: "focus"
  });
  $( "#dow-text" ).focus(function(event) {
      event.preventDefault();
      event.stopPropagation();
      pointer.attr( "size", "120" );
      $("#dow div.popover-content").replaceWith(element_dow);
      $("#dow-text").popover('show');
  });
  $( "#dow-text" ).focusout(function(event) {
      event.preventDefault();
      event.stopPropagation();
      $("#dow-text").popover('hide');
  });
});
/* language popover*/
$( document ).ready(function() {
  var pointer = $("#language-popover").find("input:last");
  pointer.attr( "id", "language-text" );
  pointer.attr( "size", "120" );
  pointer.parent().attr("id", "language");

  var element_language = "<p style='text-align:left; width:250px;color: #7c7c7a;font-family: Helvetica,Arial,sans-serif;font-size: 13px;'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.</p>";
  $("#language-text").popover({
        title: "Language",
        trigger: "focus"
  });
  $( "#language-text" ).focus(function(event) {
      event.preventDefault();
      event.stopPropagation();
      pointer.attr( "size", "120" );
      $("#language div.popover-content").replaceWith(element_language);
      $("#language-text").popover('show');
  });
  $( "#language-text" ).focusout(function(event) {
      event.preventDefault();
      event.stopPropagation();
      $("#language-text").popover('hide');
  });
});
/* screening popover*/
$( document ).ready(function() {
  var pointer = $("#screening-popover").find("input:last");
  pointer.attr( "id", "screening-text" );
  pointer.attr( "size", "120" );
  pointer.parent().attr("id", "screening");

  var element_screening = "<p style='text-align:left; width:250px;color: #7c7c7a;font-family: Helvetica,Arial,sans-serif;font-size: 13px;'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.</p>";
  $("#screening-text").popover({
        title: "Screening questions",
        trigger: "focus"
  });
  $( "#screening-text" ).focus(function(event) {
      event.preventDefault();
      event.stopPropagation();
      pointer.attr( "size", "120" );
      $("#screening div.popover-content").replaceWith(element_screening);
      $("#screening-text").popover('show');
  });
  $( "#screening-text" ).focusout(function(event) {
      event.preventDefault();
      event.stopPropagation();
      $("#screening-text").popover('hide');
  });
});

/*  Start and end date*/
var element_date = "<p style='text-align:left; width:250px;color: #7c7c7a;font-family: Helvetica,Arial,sans-serif;font-size: 13px;'>Quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>";
$("#datepicker1").popover({
      title: "Select start date",
      trigger: "focus"
});
$( "#datepicker1" ).focus(function(event) {
    $("#datepicker div.popover-content").replaceWith(element_date);
    $("#datepicker1").popover('show');
});
$("#datepicker2").popover({
      title: "Select end date",
      trigger: "focus"
});
$( "#datepicker2" ).focus(function(event) {
    $("#datepicker div.popover-content").replaceWith(element_date);
    $("#datepicker2").popover('show');
});

/* checkboxes for time comittment on hover*/
var element_time_comittment = "<p style='text-align:left; width:250px;color: #7c7c7a;font-family: Helvetica,Arial,sans-serif;font-size: 13px;'>Quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>";
$("#time-checkbox").popover({
      title: "Time comittment",
      trigger: "hover"
});
$( "#time-checkbox" ).hover(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $(".check-label div.popover-content").replaceWith(element_time_comittment);
    $("#time-checkbox").popover('show');
});

/* checkboxes for schedule on hover */
var element_schedule = "<p style='text-align:left; width:250px;color: #7c7c7a;font-family: Helvetica,Arial,sans-serif;font-size: 13px;'>Quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>";
$("#schedule-checkbox").popover({
      title: "Schedule",
      trigger: "hover"
});
$( "#schedule-checkbox" ).hover(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $(".check-label div.popover-content").replaceWith(element_schedule);
    $("#schedule-checkbox").popover('show');
});

/* checkboxes for schedule on hover */
var element_appropriate = "<p style='text-align:left; width:250px;color: #7c7c7a;font-family: Helvetica,Arial,sans-serif;font-size: 13px;'>Duis vitae orci purus, quis euismod augue. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>";
$("#appropriate-checkbox").popover({
      title: "Appropriate for",
      trigger: "hover"
});
$( "#appropriate-checkbox" ).hover(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $(".check-label div.popover-content").replaceWith(element_appropriate);
    $("#appropriate-checkbox").popover('show');
});

/* checkboxes for IVO on hover */
var element_IVO = "<p style='text-align:left; width:250px;color: #7c7c7a;font-family: Helvetica,Arial,sans-serif;font-size: 13px;'>Morbi lorem arcu, aliquet sed feugiat et, posuere non elit fusce sollicitudin.  Nunc at in hendrerit in vulputate, imperdiet fringilla.</p>";
$("#IVO-checkbox").popover({
      title: "International volunteer option",
      trigger: "hover"
});
$( "#IVO-checkbox" ).hover(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $(".check-label div.popover-content").replaceWith(element_IVO);
    $("#IVO-checkbox").popover('show');
});

/* checkboxes for extra on hover */
var element_extra = "<p style='text-align:left; width:250px;color: #7c7c7a;font-family: Helvetica,Arial,sans-serif;font-size: 13px;'>Aliquam mauris felis, viverra in mattis vitae adipiscing elit, sed diam nonummy nibh.  Euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi lobortis nisl ut aliquip ex ea commodo consequat.</p>";
$("#extra-checkbox").popover({
      title: "Extra details",
      trigger: "hover"
});
$( "#extra-checkbox" ).hover(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $(".check-label div.popover-content").replaceWith(element_extra);
    $("#extra-checkbox").popover('show');
});

/* title popover */
var element_title = "<p style='text-align:left; width:250px;color: #7c7c7a;font-family: Helvetica,Arial,sans-serif;font-size: 13px;'>Announce what you’re looking for.</p>";
$("#form-control-weight").popover({
      title: "What's the title?",
      trigger: "focus"
});
$( "#form-control-weight" ).focus(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $("#title div.popover-content").replaceWith(element_title);
    $("#form-control-weight").popover('show');
});
$( "#form-control-weight" ).focusout(function() {
    event.preventDefault();
    event.stopPropagation();
    $("#form-control-weight").popover('hide');
});


    /* adding extra questions */
$( "#skills" ).click(function() {
  $( this ).next( "ul" ).toggle();
  if($(this).is('.btn-primary')){
        $(this).removeClass('btn-primary').addClass('btn-danger');
        $( this ).text("Hide Skills / Certificates")
    }else{
        $(this).removeClass('btn-danger').addClass('btn-primary');
        $( this ).text("Add Skills / Certificates")
        //Do Stop
    }
});
$( "#time" ).click(function() {
  $( this ).next( "ul" ).toggle();
  if($(this).is('.btn-primary')){
        $(this).removeClass('btn-primary').addClass('btn-danger');
        $( this ).text("Hide Time Commitments")
    }else{
        $(this).removeClass('btn-danger').addClass('btn-primary');
        $( this ).text("Add Time Commitments")
        //Do Stop
    }
});
$( "#miscleaneous" ).click(function() {
  $( this ).next( "ul" ).toggle();
  if($(this).is('.btn-primary')){
      $(this).removeClass('btn-primary').addClass('btn-danger');
      $( this ).text("Hide Additional Preferences")
    }else{
      $(this).removeClass('btn-danger').addClass('btn-primary');
      $( this ).text("Add Additional Preferences")
      //Do Stop
    }
});

$( "#location" ).click(function() {
  $( this ).next( "ul" ).toggle();
  if($(this).is('.btn-primary')){
      $(this).removeClass('btn-primary').addClass('btn-danger');
      $( this ).text("Hide Job Location");
    }else{
      $(this).removeClass('btn-danger').addClass('btn-primary');
      $( this ).text("Add Job Location");
      //Do Stop
    }
});


function addNewAddress(){
  $("ul#address li").append( address_element );
}
function closeAddress(){
 $("ul#address li div:last-child").remove(); 
}

/*header dropdown selection */
$("#username .dropdown-menu li a").click(function(){
  var selText = $(this).text();
  $( this ).addClass("active"); 
  $(this).parents('.dropdown.pull-right').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
});
/* to add css */
$('#username .dropdown-menu li a').click(function() {
    var style = {
              backgroundColor: "#ffffff",
              borderRadius: "4px",
              color: "#4C4559",
              fontWeight: "600"
    }
    var style_empty = {
              backgroundColor: "",
              borderRadius: "",
              color: "",
              fontWeight: ""         
    }
    if($('#dropdown').data('open')) {
        $('#dropdown').data('open', false);
    } else
        $('#dropdown').data('open', true);
        $("#username .dropdown-menu li a").css(style_empty);
        $(this).css(style);

});
$( document ).ready(function() {
  var style = {
      backgroundColor: "#ffffff",
      borderRadius: "4px",
      color: "#4C4559",
      fontWeight: "600"
  }
  $("#username .dropdown-menu li #tab-header-1").css(style);
});


//Describe the work to be done data modal to count the number of characters
$("#text-content").keyup(function() {
  var text  = $(this).val();
  $('#text-content-pop').val(text);
  $('#text-content-count').text($(this).val().length);
  $('#text-content-count-pop').text($(this).val().length);
});
$("#text-content-pop").keyup(function() {
  var text  = $(this).val();
  $('#text-content').val(text);
  $('#text-content-count-pop').text(text.length);
  $('#text-content-count').text(text.length);
});

$(".dropdown-menu li a").click(function(){
  var selText = $(this).text();
  $(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <b class="caret"></b>');
});



function PrepareLanguageJSON() {
    //debugger;
    var rowName1 = 'value';
    var rowName2 = 'text';
    var tableObject = $('input[name^=LanguageSet]').map(function (i) {
        var row = {};
        row[rowName1] = $(this).val();
        row[rowName2] = $(this).val();
        return row;
    }).get();
    return tableObject;
}

$('#language-tag').tagsinput({
  itemValue: 'value',
  itemText: 'text',
  typeahead: {
      source: PrepareLanguageJSON(),
    sorter: function (items) {
        return items.sort();
    }
  }
});

$("#language-tag").next().children('input').attr("onkeypress", "handleJobEvent(event)");

function updateValueLanCheck(){
    var listOfLan = [], listofLanObject = {};
    var lstLanguages = "";


    $('input:checkbox.ChkLanguage').each(function (i) {
        if ($(this).is(":checked")) {
            listofLanObject = { 'text': ' ', 'value': ' ' };
            //getting current node elements
            currentnode = $(this).val();
            listofLanObject.text = currentnode;
            listofLanObject.value = currentnode;
            listOfLan.push(listofLanObject);
            var id = $(this).data('languageid');
            if (lstLanguages == "") {
                lstLanguages = id;
            }
            else {
                lstLanguages = lstLanguages + "," + id;
            }
        }
    });
    $('#LanguageIDs').val(lstLanguages);

  $('#language-tag').tagsinput('removeAll');
  $("#language-tag").tagsinput("refresh");
  for(i = 0 ; i < listOfLan.length ; i++){
    $("#language-tag").tagsinput('add', listOfLan[i]);
  }
  $("#language-tag").next().children('input').attr("placeholder", " ");
}

//Adding input tag from dropdown
$('#language-tag').on('itemAdded', function(event) {
   var lengthInputTag = $("#language-tag").next().children().length;
    if (lengthInputTag == 1){
        $("#language-tag").next().children('input').attr("placeholder", "Add language");   
    } else if (lengthInputTag > 1){
      $("#language-tag").next().children('input').attr("placeholder", " ");
    }
});

$('#language-tag').on('itemRemoved', function(event) {
  var lengthInputTag = $("#language-tag").next().children().length;
  if (lengthInputTag == 1){
      $("#language-tag").next().children('input').attr("placeholder", "Add language");   
  } 
});

function updateValueLanText(){  
  $("#language-tag").tagsinput("refresh");
  var tagsValue = $("#language-tag").val();
  var tagsList = tagsValue.split(",");
  console.log(tagsList);
  $('input:checkbox.ChkLanguage').each(function (i) {
      if ($(this).is(":checked")) {
          $(this).prop("checked", false);
      }
  });
  $('input:checkbox.ChkLanguage').each(function (i) {
      for (j = 0 ; j < tagsList.length ; j++) {
          if ($(this).val() === tagsList[j]) {
              $(this).prop("checked", true);
          }
      }
  });
}

function PrepareDaysOfWeekJSON() {
    //debugger;
    var rowName1 = 'value';
    var rowName2 = 'text';
    var tableObject = $('input[name^=DateOfWeekSet]').map(function (i) {
        var row = {};
        row[rowName1] = $(this).data("dow");
        row[rowName2] = $(this).data("dow");
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

function updateValueDowCheck(){
    var listOfDow = [], listofDowObject = {};
    var lstDayOfWeeks = "";
    $('.dvDaysOfWeek input:checkbox').each(function (i) {
        if ($(this).is(":checked")) {
            listofDowObject = { 'text': ' ', 'value': ' ' };
            //getting current node elements
            currentnode = $(this).data("dow");
            listofDowObject.text = currentnode;
            listofDowObject.value = currentnode;
            listOfDow.push(listofDowObject);

            var id = $(this).val();
            if (lstDayOfWeeks == "") {
                lstDayOfWeeks = id;
            }
            else {
                lstDayOfWeeks = lstDayOfWeeks + "," + id;
            }
        }
    });
    
    $('#DayOfWeekIDs').val(lstDayOfWeeks);
  $('#dow-tag').tagsinput('removeAll');
  $("#dow-tag").tagsinput("refresh");
  for(i = 0; i < listOfDow.length ; i++){
    $("#dow-tag").tagsinput('add', listOfDow[i]);
  }
   $("#dow-tag").next().children('input').attr("placeholder", " ");
}

//Adding input tag from dropdown
$('#dow-tag').on('itemAdded', function(event) {
   var lengthInputTag = $("#dow-tag").next().children().length;
    if (lengthInputTag == 1){
        $("#dow-tag").next().children('input').attr("placeholder", "Add days of the week");   
    } else if (lengthInputTag > 1){
      $("#dow-tag").next().children('input').attr("placeholder", " ");
    }
});

/* On Removing tags */
$('#dow-tag').on('itemRemoved', function(event) {
  var lengthInputTag = $("#dow-tag").next().children().length;
  if (lengthInputTag == 1){
      $("#dow-tag").next().children('input').attr("placeholder", "Add days of the week");   
  } 
});

function updateValueDowText(){
  $("#dow-tag").tagsinput("refresh");
  var tagsValue = $("#dow-tag").val();
  var tagsList = tagsValue.split(",");
  console.log(tagsList);
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
$("#skill-tag").next().children('input').attr("onkeypress", "handleJobEvent(event)");

function updateValueSkillCheck(){
    var listOfSkill = [], listofSkillsObject = {};
    var lstSkillIDs = "";

    $('input:checkbox.ChkSkills').each(function (i) {
        if ($(this).is(":checked")) {
            listofSkillsObject = { 'text': ' ', 'value': ' ' };
            //getting current node elements
            currentnode = $(this).val();
            listofSkillsObject.text = currentnode;
            listofSkillsObject.value = currentnode;
            console.log(listofSkillsObject);
            listOfSkill.push(listofSkillsObject);
            var id = $(this).data('skillid');
            if (lstSkillIDs == "") {
                lstSkillIDs = id;
            }
            else {
                lstSkillIDs = lstSkillIDs + "," + id;
            }
        }
    });
      $('#SkillIDs').val(lstSkillIDs);
      $('#skill-tag').tagsinput('removeAll');
      $("#skill-tag").tagsinput("refresh");
      for(i = 0 ; i < listOfSkill.length ; i++){
        $("#skill-tag").tagsinput('add', listOfSkill[i]);
      }
      $("#skill-tag").next().children('input').attr("placeholder", " ");
}
//Adding input tag from dropdown
$('#skill-tag').on('itemAdded', function(event) {
   var lengthInputTag = $("#skill-tag").next().children().length;
    if (lengthInputTag == 1){
        $("#skill-tag").next().children('input').attr("placeholder", "Add Skills");   
    } else if (lengthInputTag > 1){
      $("#skill-tag").next().children('input').attr("placeholder", " ");
    }
  // event.item: contains the item
});

/* On Removing tags */
$('#skill-tag').on('itemRemoved', function(event) {
  var lengthInputTag = $("#skill-tag").next().children().length;
  if (lengthInputTag == 1){
      $("#skill-tag").next().children('input').attr("placeholder", "Add Skills");   
  } 
});

function updateValueSkillText() {
  $("#skill-tag").tagsinput("refresh");
  var tagsValue = $("#skill-tag").val();
  var tagsList = tagsValue.split(",");
  $('input:checkbox.ChkSkills').each(function (i) {
      if ($(this).is(":checked")) {
          $(this).prop("checked", false);
      }
  });
  $('input:checkbox.ChkSkills').each(function (i) {
      for (j = 0 ; j < tagsList.length ; j++) {
          if ($(this).val() === tagsList[j]) {
              $(this).prop("checked", true);
          }
      }
  });
}

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
  }
});

/*Adding method to prevent enter from being click*/
//$("#diploma-tag").next().children('input').attr("onkeypress", "doNothing()");
$("#diploma-tag").next().children('input').attr("onkeypress", "handleJobEvent(event)");

function updateValueDiplomaCheck(){
    var listOfDiploma = [], listofDiplomaObject = {};
    var lstDiplomaIDs = "";
      $('input:checkbox.ChkDiploma').each(function (i) {
          if ($(this).is(":checked")) {
              listofDiplomaObject = { 'text': ' ', 'value': ' ' };
              //getting current node elements
              currentnode = $(this).val();
              listofDiplomaObject.text = currentnode;
              listofDiplomaObject.value = currentnode;
              listOfDiploma.push(listofDiplomaObject);
              var id = $(this).data('diplomaid');
              if (lstDiplomaIDs == "") {
                  lstDiplomaIDs = id;
              }
              else {
                  lstDiplomaIDs = lstDiplomaIDs + "," + id;
              }
          }
      });
      $('#DiplomaIDs').val(lstDiplomaIDs);
  $('#diploma-tag').tagsinput('removeAll');
  $("#diploma-tag").tagsinput("refresh");
  for(i = 0 ; i < listOfDiploma.length ; i++){
    $("#diploma-tag").tagsinput('add', listOfDiploma[i]);
  }
  $("#diploma-tag").next().children('input').attr("placeholder", " ");
}

//Adding input tag from dropdown
$('#diploma-tag').on('itemAdded', function(event) {
   var lengthInputTag = $("#diploma-tag").next().children().length;
    if (lengthInputTag == 1){
        $("#diploma-tag").next().children('input').attr("placeholder", "Add diploma/certificate");   
    } else if (lengthInputTag > 1){
      $("#diploma-tag").next().children('input').attr("placeholder", " ");
    }
  // event.item: contains the item
});

/* On Removing tags */
$('#diploma-tag').on('itemRemoved', function(event) {
  var lengthInputTag = $("#diploma-tag").next().children().length;
  if (lengthInputTag == 1){
      $("#diploma-tag").next().children('input').attr("placeholder", "Add diploma/certificate");   
  }
});

function updateValueDiplomaText(){
  $("#diploma-tag").tagsinput("refresh");
  var tagsValue = $("#diploma-tag").val();
  var tagsList = tagsValue.split(",");
  console.log(tagsList);
  $('input:checkbox.ChkDiploma').each(function (i) {
      if ($(this).is(":checked")) {
          $(this).prop("checked", false);
      }
  });
  $('input:checkbox.ChkDiploma').each(function (i) {
      for (j = 0 ; j < tagsList.length ; j++) {
          if ($(this).val() === tagsList[j]) {
              $(this).prop("checked", true);
          }
      }
  });

}

var listOfScreening = [];
function updateValueScreeningCheck(){  //remove hardcode
    var tempList = listOfScreening;

    $('input:checkbox.ChkQuestions').each(function (i) {
        if ($(this).is(":checked")) {
            //debugger;
            var id = $(this).val();
            var question = $(this).data('question');
            addNewTextScreening(id, question);
           
        }
    });
}



function PrepareQuestionsJSON() {
    //debugger;
    var rowName = "QuestionCode";
    var rowName2 = "QuestionName";
    var tableObject = $('input[name^=qBox]').map(function (i) {
        var row = {};
        row[rowName] = $(this).data('questionid');
        row[rowName2] = $(this).val();
        return row;
    }).get();
    var strJson = JSON.stringify(tableObject);
    if (strJson == "[]") strJson = "";
    return strJson;
}


function addNewTextScreening(qID,question){
    var element_text_screeining = "<div class='' style='padding:0px' id='divTextTag' name='" + "divQuestion" + qID + "'>" +
                                  "<div class='crossTextbox'>" +
                                    "<input type='text' class='form-control' id='screening-tag' data-questionid='" + qID + "' placeholder='Add Questions' name='qBox' class='QuestionBox'/>" +
                                    "<button type='button' class='close pull-left screening-Q' aria-hidden='true' onclick='closeDynamicControl()' >&times;</button>" +
                                  "</div>" + 
                                "</div>";
    $("div#screening-questions").append(element_text_screeining);
    $("div[name='divQuestion" + qID + "']").find("input").val(question);

}

function addNewAdditionalTextScreening(qID, question) {
    var element_text_screeining = "<div class='' style='' id='divTextTag' name='" + "divQuestion0'>" +
                                  "<div class='crossTextbox'>" +
                                    "<input type='text' class='form-control' id='screening-tag' data-questionid='0' placeholder='Add Questions' name='qBox' class='QuestionBox'/>" +
                                    "<button type='button' class='close pull-left screening-Q' aria-hidden='true' onclick='closeDynamicControl()' >&times;</button>" +
                                  "</div>" +
                                "</div>";
    $("div#screening-questions").append(element_text_screeining);

}

function closeDynamicControl(){ // update the js here
  $(".screening-Q").click(function(){
    remove = $(this).closest("#divTextTag").remove();
  });
}

//$("#screening-tag").attr("onkeypress", "doNothing()");

function updateValueScreeningText() {
  
};

var volunteer_work_set = ['Answering Telephones', 'Accounting', 'Administration', 'Business Correspondence', 'Client Relations', 'Communication',
                  'Crowd Control', 'Crime & Safety', 'Customer Service', 'Clerical', 'Document Management', 'Disaster Relief', 
                  'Document Management', 'Event Coordination', 'Employee Relations', 'Legal Familiarity', 'Meeting Planning', 'Office Administration',
                  'Organizational Skills', 'Public Relations', 'Public Speaking', 'People Management', 'Receptionist', 'Stenography', 
                  'Travel Arrangements', 'Word Processing', 'Written Communication'];
$('#volunteer-work-tag').tagsinput({
  typeahead: {
    source: volunteer_work_set,
    sorter: function (items) {
        return items.sort();
    }
  }
});

function updateValueVolunteerWork(){
  var listOfVolunteerWork = [];
  for( i=1 ; i <= 27 ; i++){
    if($("#volunteerWork" + i +"").is(":checked")){
     listOfVolunteerWork.push($("#volunteerWork" + i +"").val());
    }
  }
  console.log(listOfSkill);
  $('#volunteer-work-tag').tagsinput('removeAll');
  $("#volunteer-work-tag").tagsinput("refresh");
  for(i = 0 ; i < listOfVolunteerWork.length ; i++){
    $("#volunteer-work-tag").tagsinput('add', listOfVolunteer[i]);
  }
}



//Stop enter from being execute.
function doNothing() {
   var e = window.event;
   var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
    if( keyCode == 13 ) {
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










function PrepareJobTitleJSON() {
    //debugger;
    var rowName = "CultureCode";
    var rowName2 = "JobTitle";
    var tableObject = $('input[name^=tBox]').map(function (i) {
        var row = {};
        row[rowName] = $(this).data('culturecode');
        row[rowName2] = $(this).val();
        return row;
    }).get();
    var strJson = JSON.stringify(tableObject);
    if (strJson == "[]") strJson = "";
    return strJson;
}


function addNewJobTitleCulture(culture, title) {
    var element_title = "<div class='lang-text-cont' id='divTextTag' name='" + "divJobTitle" + culture + "'>" +
                            "<span class='lang-cont'>" +
                                "<img class='img-responsive' src='/Images/flag_" + culture + ".png' />" +
                            "</span>" +
                            "<div class='crossTextbox text-cont'>" +
                                "<input type='text' class='form-control JobTitleBox' data-culturecode='" + culture + "' placeholder='Add Job Title' name='tBox'/>" +
                                "<button type='button' class='close pull-left screening-Q' aria-hidden='true' onclick='closeDynamicControl()' >&times;</button>" +
                            "</div>" +
                        "</div>";/*
                                  "<div class='col-xs-3'>" +
                                    "<img class='img-responsive' src='/Images/flag_" + culture + ".png' />" +
                                    "</div>" +
                                  "<div class='col-xs-9 crossTextbox'>" +
                                    "<input type='text' class='form-control JobTitleBox' data-culturecode='" + culture + "' placeholder='Add Job Title' name='tBox'/>" +
                                    "<button type='button' class='close pull-left screening-Q' aria-hidden='true' onclick='closeDynamicControl()' >&times;</button>" +
                                  "</div>" +
                                "</div>";*/
    $("div#jobTitleCulture").append(element_title);
    $("div[name='divJobTitle" + culture + "']").find("input").val(title);

}

// job description - translation modal





function PrepareJobDescriptionJSON() {
    //debugger;
    var rowName = "CultureCode";
    var rowName2 = "JobDescription";
    var tableObject = $('[name^=jobDescBox]').map(function (i) {
        var row = {};
        row[rowName] = $(this).data('culturecode');
        row[rowName2] = $(this).val();
        return row;
    }).get();
    var strJson = JSON.stringify(tableObject);
    if (strJson == "[]") strJson = "";
    return strJson;
}


function addNewJobDescriptionCulture(culture, desc) {
    var element_title = "<div class='lang-text-cont' id='divTextTag' name='" + "divJobTitle" + culture + "'>" +
                            "<span class='lang-cont'>" +
                                "<img class='img-responsive' src='/Images/flag_" + culture + ".png' />" +
                            "</span>" +
                            "<div class='crossTextbox text-cont'>" +
                                "<input type='text' class='form-control JobTitleBox' data-culturecode='" + culture + "' placeholder='Add Job Title' name='tBox'/>" +
                                "<button type='button' class='close pull-left screening-Q' aria-hidden='true' onclick='closeDynamicControl()' >&times;</button>" +
                            "</div>" +
                        "</div>";
    $("div#jobDescriptionCulture").append(element_title);
    $("div[name='divJobDesc" + culture + "']").find("textarea").val(desc);

}


