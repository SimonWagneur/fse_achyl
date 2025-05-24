(function($){
    $(document).ready(function(){
        var pageLength = $("body").height();
        var time_to_top = pageLength/7;

        $(".to-the-top").on('click', function(){
            $("html, body").animate({scrollTop: 0},time_to_top);
        });

    })
})(jQuery);