'use strict';

// Form
$(function () {
    function error (field) {
        $('#messaggio *[name="' + field +'"]').addClass("error");
    }
    
    function reset () {
        $("#errors").text('');
        $("#messages").text('');
        
        $('#messaggio input').each(function() {
            $(this).removeClass("error");    
        }); 
        $('#messaggio textarea').each(function() {
            $(this).removeClass("error");    
        }); 
    }
    
    function escape(value) {
        return $('<div/>').text(value).html().replace(/\n/g, "<br />");
    }

    $("#invia").bind('click', function(ev) {
        try{
        reset();
        // Get form data
        var formData = {};
        $('#messaggio').serializeArray().map(function(x){formData[x.name] = escape(x.value);});

        var errors=[];
            
        // Check for errors
        if (!formData.userName) {
            errors.push('il tuo nome');
            error("userName");
        }

        if (!formData.userEmail && !formData.userPhone) {
            errors.push('un indirizzo email o numero di telefono');
            error("userEmail");
            error("userPhone");
        }
        
        if(!formData.userId && !formData.userMoney) {
            errors.push('un identificativo o importo del bonifico');
            error("userId");
            error("userMoney");
        }
          
        if (!formData.userMsg) {
            errors.push('il messaggio di auguri');
            error("userMsg");
        } 
            
        if (errors.length > 0) {
            // Validation error
            var message = 'Per favore inserisci ';
            
            for (var i = 0; i < errors.length; i++) {
                if (i > 0 && i == errors.length - 1) {
                    message += ' e ';
                } else if (i > 0) {
                    message += ', ';
                }
                message += errors[i];
            }
            $("#errors").text(message);
        } else {
            // OK post the message. Disable button first.
            $("#invia").prop('disabled', true);
            $.ajax('/messaggio.php', {
                method: 'POST',
                data: formData
            })
            .done(function(data) {
                $("#messages").text('Messaggio di auguri inviato. Grazie ' + formData.userName +" !!"); 
            });
        }
        
        return false;
        } catch(e) {
            console.error(e);
        }
    });
});
