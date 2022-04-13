$(document).ready(function () {   
    $('.flower').click(function () {
      $('p').toggle();
    });
    
     $('.plant').click(function () {
//        $('.infopanel').toggle(2000);     
        $(this).toggleClass("bigger");
    });
    
});