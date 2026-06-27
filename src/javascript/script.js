//Botão do menu mobile, transforma as três barras em um X
document.addEventListener("DOMContentLoaded", () => {
    const mobileButton = document.getElementById("mobile_button");
    const mobileMenu = document.getElementById("menu_mobile");
    
    mobileButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        const icon = mobileButton.querySelector("i");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-x");
});



    // Animações
    
    ScrollReveal().reveal('#menu',{
        origin: 'left',
        duration: 2000,
        distance: '20%'
    })

    ScrollReveal().reveal('#banner',{
        origin: 'right',
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

