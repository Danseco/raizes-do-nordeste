$(document).ready(function() {
    $("#mobile_button").on("click", function() {
        $("#menu_mobile").toggleClass("active");
        const icon = $(this).find("i");
        icon.toggleClass("fa-bars");
        icon.toggleClass("fa-x");
    });
    ScrollReveal().reveal('#menu',{
        origin: 'left',
        duration: 2000,
        distance: '20%'
    })
    
    ScrollReveal().reveal('#cta',{
        origin: 'left',
        duration: 2000,
        distance: '20%'
    })

    ScrollReveal().reveal('#new',{
        origin: 'right',
        duration: 2000,
        distance: '20%'
    })

    ScrollReveal().reveal('#info',{
        origin: 'left',
        duration: 2000,
        distance: '20%'
    })

 
});

