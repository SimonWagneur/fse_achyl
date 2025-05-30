(function($){
    $(document).ready(function(){
        //VARIABLES
        var sections = $('section.section-benefits1.scrollingToggle');
        
        if(sections.length) {
            sections.each(function() {
                let section = $(this);
                let canvas = section.find('.canvas');
                let image = canvas.find('img');
                let toggleButton = canvas.find('.toggle-button-box');
                let hasClicked = false;

                //EVENTS
                toggleButton.on('click', function(){
                    hasClicked = true;
                });
                
                toggleButton.hover(
                    // Mouse Enter
                    function(){
                        hasClicked = false;
                        if($(this).hasClass('active')){
                            $(this).removeClass('active');
                            deactivateButton();
                        }else{
                            $(this).addClass('active');
                            activateButton();
                        }
                    }, 
                    // Mouse Leave
                    function(){
                        if(!hasClicked){
                            if($(this).hasClass('active')){
                                $(this).removeClass('active');
                                deactivateButton();
                            }else{
                                $(this).addClass('active');
                                activateButton();
                            }
                        }
                    }
                );

                //FUNCTIONS
                function activateButton(){
                    image[0].style.setProperty('filter', 'grayscale(0)', 'important');
                }
                
                function deactivateButton(){
                    image[0].style.setProperty('filter', 'grayscale(1)', 'important');
                }
            });
        }
    });
})(jQuery);