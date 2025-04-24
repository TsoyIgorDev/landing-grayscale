// Изменение навбара

//Метод который отвечает за загрузку страницы
document.addEventListener('DOMContentLoaded', function () {
    const navInit = () => {
        const navbarCollapsible = document.body.querySelector('#mainNav');

        //Изменение цвета фонанавбрара при скролле
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }

        //Подстветка вьюпорта в навбаре
        const links = document.querySelectorAll('.nav-link'); //все навигационные ссылки
        const sections = document.querySelectorAll('section'); //все секции

        sections.forEach(section => {
            //расстояние секции от начала страницы
            if (window.scrollY >= section.offsetTop - 250) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.href.split('#').pop() === section.id) {
                        link.classList.add('active')
                    }
                })
            }
        })
    }

    //Вызов функции во время загрузки, скролла и ресайза
    navInit();
    window.addEventListener('scroll', () => {
        navInit();
    })
    window.addEventListener('resize', () => {
        navInit();
    })
})

