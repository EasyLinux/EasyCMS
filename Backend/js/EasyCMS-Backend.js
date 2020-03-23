/**
 * 
 */
$(function () {
    $('#body').load("contents/login.tmpl");
    setTimeout(function() { // Wait for DOM to be loaded
        $('.focus').each(function(){
            $(this).blur(function () {
                if ($(this).val().trim() != "") {
                    $(this).addClass('has-val');
                }
                else {
                    $(this).removeClass('has-val');
                }
            });
        });   
    },250);

});

/**
 * Login
 * 
 * do the login stuff
 * 
 * @param  {void}
 * @return {void}
 */
function Login() {
    if ($('#email').val().trim() != "" && $('#pass').val().trim() != "" )
    {
        $.post("Ajax/Login",{
            login: $('#email').val(),
            password: $('#pass').val()
        },function(data,status){
            console.log("Data: ");
            console.log(data);
            console.log("Status: "+status);
        });
    }
    else {
        alert('You must fill credentials');
    }


} 