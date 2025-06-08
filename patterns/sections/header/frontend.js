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
            // $('.navbar').addClass('transparent');
        }
        else{
            if (st > lastScrollTop){
                $('.navbar').css("margin-top","-100px");
            } else {
                $('.navbar').css("margin-top","0px");
                $('.navbar').addClass('scrolled');
            }
        }
        lastScrollTop = st;
    }))

  });
})(jQuery);
