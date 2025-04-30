// Изменение навбара

//Метод который отвечает за загрузку страницы
document.addEventListener('DOMContentLoaded', function () {
    const navInit = () => {
        const navbarCollapsible = document.body.querySelector('#mainNav');

        //Изменение цвета фона навбрара при скролле
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

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;

        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };

    }
    // Анимация контекта
    const animItems = document.querySelectorAll('.animate');
    if (animItems.length > 0) {
        function onEntry(params) {
            animItems.forEach(item => {
                const itemHeight = item.offsetTop; //высота объекта
                const itemOffset = offset(item).top; //позиция от верхнего края страницы
                const startPos = 4; //параметр регулирования старта анимации

                const animPoint = document.documentElement.clientHeight - itemHeight / startPos;

                if (itemHeight > document.documentElement.clientHeight) {
                    const animPoint = document.documentElement.clientHeight - document.documentElement.clientHeight / startPos;
                }

                if ((scrollY > itemOffset - animPoint) && scrollY < itemOffset + itemHeight) {
                    item.classList.add('show');
                } else {
                    if (!item.classList.contains('no-hide')) { //Чтобы не пропадало
                        item.classList.remove('show');
                    }
                }
            })
        }
    }

    // function onEntry(entry) {
    //     entry.forEach(change => {
    //         if (change.isIntersecting) {
    //             change.target.classList.add('show');
    //         } else {
    //             if (!change.target.classList.contains('no-hide')) {
    //                 change.target.classList.remove('show');
    //             }
    //         };
    //     });
    // }

    // let options = { threshold: [0.5] };
    // let observer = new IntersectionObserver(onEntry, options);
    // let elements = document.querySelectorAll('.animate');

    // for (let elm of elements) {
    //     observer.observe(elm);
    // }


    //Вызов функции во время загрузки, скролла и ресайза
    onEntry();
    navInit();
    window.addEventListener('scroll', () => {
        navInit();
        onEntry();
    })
    window.addEventListener('resize', () => {
        navInit();
    })
})

