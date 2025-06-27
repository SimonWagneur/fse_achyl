$(document).ready(function(){
    console.log('visible');
    $('.visible').each(function(){
        var $t = $(this);
        $t.css('opacity', '1');
        $t.css('transform', 'translateY(0)');
    })
})