import $ from 'jquery';

function Forms(){
    var n = 0;
    $('form #email').on('input', function(){
        window['value'+n] = new Date();
        n = n + 1;
        // console.log(value0);
    });

    $(".form-check").on('submit', function(e){
        e.preventDefault();
        var thisForm = $(this);
        var te = new Date();
        var timeSpent = Math.abs(value0 - te);
        // console.log(timeSpent);
        $(this).find('button.next').prop("disabled", true).html('Envoi en cours <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
        $(this).find('button.loading').prop("disabled", true).html('Envoi en cours <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');

        if(timeSpent > 1500){
            var emailCheck = thisForm.find("input[name='check']").val();
            console.log(emailCheck);
            // var code_postal = thisForm.find("input[name='code_postal']").val();
            if(emailCheck.length === 0){
                var formData = {};
                thisForm.find("input:not([type=radio]), input[type='radio']:checked, textarea, select").each(function(){
                    formData[this.name] = this.value;
                });
                // console.log(formData);

                if(thisForm.hasClass('form-devis')){
                    var titleSuccess = 'Merci pour votre demande de devis :)';
                    var textSuccess = 'Vous allez recevoir entre 1 et 5 devis personnalisés dans votre boîte de réception dans les 24 heures.<br>À très bientôt !';
                    var titleError = 'Une erreur est survenue';
                    var textError = "Une erreur inconnue est survenue. Veuillez réitérer votre demande de devis. Si l'erreur venait à persister, veuillez nous contacter par email à <a href='mailto:info@achyl.be'>info@achyl.be</a>. À bientôt.";

                    $.ajax({
                        type: 'POST',
                        data: formData,
                        url: tmeData.root_url + '/php/form-devis.php',
                        success: function(response) {
                            // console.log(response);
                            // console.log(response.email);
                          if(response.status === "success"){
                            thisForm.find('.finalSlide h3').html(titleSuccess);
                            thisForm.find('.finalSlide p').html(textSuccess);
                            toFinalSlide(thisForm);
        
                            // gtag('event', 'Demande de devis', {
                            //     'event_category': 'Demande de devis',
                            //     'event_label': email
                            // });
                            // var event_name = "quote_sent";
                            // var properties = {
                            // 'email': email,
                            // }
                            // sendinblue.track(
                            //     event_name, /*mandatory*/
                            //     properties /*optional*/
                            // )
                            dataLayer.push({
                                event: 'demande_de_devis',
                                attributes: {
                                    email: response.email
                                }
                            });
    
                          }
                          else{
                            thisForm.find('.finalSlide h3').html(titleError);
                            thisForm.find('.finalSlide p').html(textError);
                            toFinalSlide(thisForm);
                          }
                        },
                        error: (response) => {
                            console.log(response);
                        },
                    });
                }

                if(thisForm.hasClass('form-ajouter-entrepreneur')){
                    var titleSuccess = 'Bienvenue ! :)';
                    var textSuccess = 'Votre inscription a bien été enregistrée. Vous apparaissez déjà dans notre base de données et dans la catégorie que vous avez sélectionnée.';
                    var titleError = 'Une erreur est survenue';
                    var textError = "Une erreur inconnue est survenue. Veuillez réitérer votre demande d'inscription. Si l'erreur venait à persister, veuillez nous contacter par email à <a href='mailto:info@achyl.be'>info@achyl.be</a>. À bientôt.";
                    var loginURL = tmeData.site_url + '/wp-login.php';

                    $.ajax({
                        type: 'POST',
                        data: formData,
                        url: tmeData.root_url + '/php/add_new_user.php',
                        success: function(sent) {
                            console.log(sent);
                            if(sent == "sent"){
                                thisForm.find('.finalSlide h3').html(titleSuccess);
                                thisForm.find('.finalSlide p').html(textSuccess);
                                thisForm.find('#button-final-slide').html('<a href="'+loginURL+'"><button type="button" class="secondary-btn secondary-btn__blue">Accéder au profil</button></a>');
                                toFinalSlide(thisForm);
                            }
                            else{
                                thisForm.find('.finalSlide h3').html(titleError);
                                thisForm.find('.finalSlide p').html(sent);
                                thisForm.find('#button-final-slide').html('<a href="."><button type="button" class="secondary-btn secondary-btn__blue">Réessayer</button></a>');
                                toFinalSlide(thisForm);
                            }
                        },
                        error: (response) => {
                            thisForm.find('.finalSlide h3').html(titleError);
                            thisForm.find('.finalSlide p').html(response);
                            toFinalSlide(thisForm);
                        },
                    });
                }

                if(thisForm.hasClass('form-avis')){
                    var textSuccess = "Félicitacions, votre avis a bien été envoyé.";
                    var textError = "Une erreur est survenue, veuillez réessayer plus tard.";
                    $.ajax({
                        type: 'POST',
                        data: formData,
                        url: tmeData.root_url + '/php/add_new_avis.php',
                        success: function(sent) {
                            console.log(sent);
                            if(sent == "sent"){
                                thisForm.find('.comment').html(textSuccess);
                                thisForm.find('button.loading').prop("disabled", true).html('Envoyé');
                            }
                            else{
                                thisForm.find('.comment').html(textError);
                                thisForm.find('button.loading').prop("disabled", true).html('Erreur');
                            }
                        },
                        error: (response) => {
                            thisForm.find('.comment').html(response);
                            thisForm.find('button.loading').prop("disabled", true).html('Erreur');
                        },
                    });
                }
            }
        }
    });

    function toFinalSlide(thisForm){
        thisForm.find('.slide, .carousel__header, .carousel__footer').css('display', 'none');
        thisForm.css('justify-content', 'center');
        thisForm.find('.finalSlide').css('display', 'block');
    }
}

export default Forms;