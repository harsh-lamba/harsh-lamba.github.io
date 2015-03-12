$(document).ready(function (e) 
{
    //
    // Try to init the culture drop down list. 
    //
    try 
    {
        $("#_cultureDDL").msDropDown();
    }
    catch (e) 
    {
        alert(e.message);
    }

    jQuery.validator.unobtrusive.adapters.add("checkbox", function (options) {
        if (options.element.tagName.toUpperCase() == "INPUT" && options.element.type.toUpperCase() == "CHECKBOX") {
            options.rules["required"] = true;
            if (options.message) {
                options.messages["required"] = options.message;
            }
        }
    });
});
