const modalLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body'); //блок скрола
const blockPadding = document.querySelectorAll('.lock-padding');
let unblock = true; //блок двойных нажатий
const timeout = 800;

if (modalLinks.length > 0) {
    modalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const modalName = link.getAttribute('href').replace('#', '');
            const currentModal = document.getElementById(modalName);
            modalOpen(currentModal);
            e.preventDefault(); //запрет на релоад
        })
    })
}

const modalCloseElem = document.querySelectorAll('.close-modal');
if (modalCloseElem.length > 0) {
    modalCloseElem.forEach(el => {
        el.addEventListener('click', function (e) {
            modalClose(el.closest('.popup')); //ближающий родитель
            e.preventDefault(); //запрет на релоад
        })
    })
}

function modalOpen(currentModal) {
    if (currentModal && unblock) {
        const modalActive = document.querySelector('.popup.open');
        if (modalActive) {
            modalClose(modalActive, false);
        } else {
            bodyBlock();
        }
        currentModal.classList.add('open');
        // Закрытие по клику на любое место кроме крестика но не внутри модалки
        currentModal.addEventListener('click', function (e) {
            if (!e.target.closest('.popup_content')) {
                modalClose(e.target.closest('.popup'));
            }
        })
    }
}

function modalClose(modalActive, doUnblock = true) {
    if (unblock) {
        modalActive.classList.remove('open');
        if (doUnblock) {
            bodyUnBlock();
        }
    }
}

function bodyBlock() {
    const blockPaddingValue = window.innerWidth - document.querySelector('#wrapper').offsetWidth + 'px';
    console.log('bpValu = ' + blockPaddingValue);
    if (blockPadding.length > 0) {
        blockPadding.forEach(el => {
            el.style.paddingRight = blockPaddingValue;
        })
    }
    body.classList.add('blocked');
    document.querySelector('.navbar').classList.add('blocked');

    unblock = false;
    setTimeout(() => {
        unblock = true;
    }, timeout);
}

function bodyUnBlock() {
    setTimeout(function () {
        if (blockPadding.length > 0) {
            blockPadding.forEach(el => {
                el.style.paddingRight = '0px';
            })
        }
        body.style.paddingRight = '0px';
        body.classList.remove('blocked');
    }, timeout);

    unblock = false;
    setTimeout(() => {
        unblock = true;
    }, timeout);
}