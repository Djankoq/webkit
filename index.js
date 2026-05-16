document.addEventListener('DOMContentLoaded', () => {
    const navbarToggle = document.querySelector('.navbar__toggle');
    const navbarMenu = document.querySelector('.navbar__menu');

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
        });
    }

    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown__toggle');
        const menu = dropdown.querySelector('.dropdown__menu');

        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                menu.classList.toggle('active');
            });
        }
    });

    window.addEventListener('click', (event) => {
        dropdowns.forEach(dropdown => {
            const menu = dropdown.querySelector('.dropdown__menu');
            if (menu && !dropdown.contains(event.target)) {
                menu.classList.remove('active');
            }
        });
    });
});
