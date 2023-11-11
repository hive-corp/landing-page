const menu = document.querySelector('nav'),
    splash = document.querySelector('#splash'),
    menuButton = document.querySelector('#mobile-button'),
    navList = document.querySelector('#nav-list'),
    navLinks = document.querySelectorAll('.nav-links'),
    animatedElements = document.querySelectorAll('[data-anime]'),
    sections = document.querySelectorAll('section'),
    carrossel = document.querySelector('.carrossel-projetos'),
    navLinksAnchor = document.querySelectorAll('.nav-links a'),
    nomeContato = document.querySelector('#nome-contato input'),
    emailContato = document.querySelector('#email-contato input'),
    tituloContato = document.querySelector('#titulo-contato input'),
    assuntoContato = document.querySelector('#assunto-contato textarea'),
    botaoForm = document.querySelector('#botao-form'),
    form = document.querySelector('#form-container'),
    fecharModal = document.querySelector('#fechar-modal'),
    inputs = document.querySelectorAll('.input'),
    erroEmail = document.querySelector('#email-contato p'),
    loadingForm = document.querySelector('#loading-contato')

/*
    Carregamento (tela de splash)
    Só apresenta o conteúdo da página (imagens, texto) quando tudo for carregado
*/
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        splash.classList.add('sumir')
    }, 1000)
})


/*
    Botão do menu (mobile)
    Apresenta os links de navegação quando é clicado,
    e quando for clicado novamente eles desaparecem.
*/
function showMenu() {
    navList.classList.toggle('active')
    menuButton.classList.toggle('active')

    navLinks.forEach((item, index) => {
        item.style.animation = `fade_in ${(index + 1) * 0.3}s ease-out`
    })
}

/*
    Scroll do menu
    Muda a cor do menu quando a tela é rolada para baixo
*/
function scrollMenu() {
    const scroll = window.scrollY;
    menu.classList.toggle('active', scroll > 0)
}

/*
    Scroll das animações
    Verifica se o conteúdo está sendo apresentado na tela, e se sim, ele é animado.
*/
function animateItems() {
    const visible = window.scrollY + ((window.innerHeight * 6) / 7)
    animatedElements.forEach((item, index) => {

        if (visible > item.offsetTop) {
            item.classList.add('animate')
        } else {
            item.classList.remove('animate')
        }
    })
}

document.addEventListener('scroll', _.debounce(animateItems, 100))
document.addEventListener('scroll', scrollMenu)
menuButton.addEventListener('click', showMenu)

const fetchData = async () => {

    var tempo = new Date()
    tempo = tempo.getTime()

    if (nomeContato.value == '') {
        inputs[0].classList.add('error')
        return 
    } else {
        inputs[0].classList.remove('error')
    }

    if (emailContato.value == '') {
        inputs[1].classList.add('error')
        erroEmail.innerHTML = 'Digite o seu email.'
        return 
    }
    else if (!emailContato.value.includes('@')) {
        inputs[1].classList.add('error')
        erroEmail.innerHTML = 'Está faltando um @.'
        return 
    } else if (emailContato.value.slice(emailContato.value.indexOf('@') + 1) == '' && emailContato.value.indexOf('@') != 0) {
        inputs[1].classList.add('error')
        erroEmail.innerHTML = 'Está faltando conteúdo após o @.'
        return 
    } else if (emailContato.value.indexOf('@') == 0) {
        inputs[1].classList.add('error')
        erroEmail.innerHTML = 'Está faltando conteúdo antes do @.'
        return 
    }
    else {
        inputs[1].classList.remove('error')
    }

    if (tituloContato.value == '') {
        inputs[2].classList.add('error')
        return 
    } else {
        inputs[2].classList.remove('error')
    }

    if (assuntoContato.value == '') {
        inputs[3].classList.add('error')
        return 
    } else {
        inputs[3].classList.remove('error')
    }

    if (nomeContato.value != '' && emailContato.value != '' && tituloContato.value != '' && assuntoContato.value != '') {

        form.classList.add('animate')
        loadingForm.classList.add('animate')

        /*
            O código abaixo serve para o envio de e-mail funcionar. Ele envia uma requisição ao serviço de email e retorna se a
            requisição foi sucedida ou não. Se sim, ele exibe o modal de enviado.

            Como o envio de e-mail não funciona nessa versão, o código foi comentado.
        */

        // const response = await fetch('', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         name: nomeContato.value,
        //         emailRem: emailContato.value,
        //         subject: tituloContato.value,
        //         content: assuntoContato.value,
        //     })
        // })

        // const data = await response.text()

        // if (data === "success") {
            document.querySelector('#enviado').classList.add('animate')
        // }

        nomeContato.value = ''
        emailContato.value = ''
        tituloContato.value = ''
        assuntoContato.value = ''
    }

    form.classList.remove('animate')
    loadingForm.classList.remove('animate')
}

botaoForm.addEventListener('click', fetchData)

fecharModal.addEventListener('click', () => {
    document.querySelector('#enviado').classList.remove('animate')
})

nomeContato.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        emailContato.focus()
    }
})
emailContato.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        tituloContato.focus()
    }
})
tituloContato.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        assuntoContato.focus()
    }
})
assuntoContato.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        fetchData()
    }
})



if (window.innerWidth < 900) {
    var flkty = new Flickity(carrossel, {
        pageDots: true,
        cellAlign: 'center',
        prevNextButtons: false,
        imagesLoaded: true
    })
} else {
    var flkty = new Flickity(carrossel, {
        pageDots: false,
        cellAlign: 'center',
        imagesLoaded: true
    })
}

flkty.resize()
