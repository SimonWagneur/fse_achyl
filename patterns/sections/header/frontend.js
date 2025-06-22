(function($){
  $(document).ready(function(){
    // VARIABLES
    var lastScrollTop = 0;
    var st;

    // EVENTS
    $(window).on("scroll", (function(){
        st = $(this).scrollTop();
        $('.navbar').removeClass('transparent');
        if(st <= 0){
            $('.navbar').removeClass('scrolled');
            $('.navbar').css("margin-top","0px");
            if($('.navbar').data('attr') == 'transparent'){
                if($('.navbar').data('attr') == 'transparent'){
                    $('.navbar').find('button').removeClass('black').addClass('white');
                }
                $('.navbar').addClass('transparent');
            }
        }
        else{
            if (st > lastScrollTop){
                $('.navbar').css("margin-top","-100px");
            } else {
                $('.navbar').css("margin-top","0px");
                $('.navbar').addClass('scrolled');
                if($('.navbar').data('attr') == 'transparent'){
                    if($('.navbar').find('button').hasClass('white')){
                        $('.navbar').find('button').removeClass('white').addClass('black');
                    }
                    if($('.navbar').find('button').hasClass('green')){
                        $('.navbar').find('button').removeClass('green').addClass('black');
                    }
                }
            }
        }
        lastScrollTop = st;
    }))

  });
})(jQuery);
