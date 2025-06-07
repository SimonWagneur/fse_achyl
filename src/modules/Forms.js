(function($){
    $(document).ready(function(){
    var n = 0;
    $('form #email').on('input', function(){
        window['value'+n] = new Date();
        n = n + 1;
    });

    $('form').on('submit', function(e){
        e.preventDefault();
        var thisForm = $(this);
        var te = new Date();
        var timeSpent = Math.abs(value0 - te);
        console.log(timeSpent);
        thisForm.find('button').prop("disabled", true).html('<div class="text"><div class="main"><span>Envoi en cours</span></div></div> <div class="round-container" style="margin-right: 10px;"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div</div>');

        if(timeSpent > 1500){
            var emailCheck = thisForm.find("input[name='check']").val();
            // console.log(emailCheck);
            // var code_postal = thisForm.find("input[name='code_postal']").val();
            if(emailCheck.length === 0){
                var formData = {};
                thisForm.find("input:not([type=radio]), input[type='radio']:checked, textarea, select").each(function(){
                    formData[this.name] = this.value;
                });
                console.log(formData);

                $.ajax({
                    type: 'POST',
                    data: formData,
                    url: themeData.root + 'assets/scripts/form-devis.php',
                    success: function(response) {
                        console.log(response);
                        // console.log(response.email);
                        if(response.status === "success"){
                            thisForm.find('.responseMessage').html('Votre demande a été envoyée avec succès.').addClass('success');
                            thisForm.find('button').html('<div class="text"><div class="main"><span>Message envoyé</span></div></div><div class="round-container"><div class="round"><i class="fa-solid fa-check" aria-hidden="true"></i></div></div>');
                        }
                        else{
                            thisForm.find('.responseMessage').html('Une erreur est survenue. Veuillez réessayer.').addClass('error');
                        }
                    },
                    error: (response) => {
                        console.log(response);
                    },
                });
            }
        }
    });
})
})(jQuery);