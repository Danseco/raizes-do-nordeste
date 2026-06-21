const btnBack = document.getElementById("btn-back");

btnBack.addEventListener("click", () => {
    window.location.href = "profile.html";
});

// Animações

ScrollReveal().reveal('#my_account',{
        origin: 'bottom',
        duration: 1000,
        distance: '20%'
});

