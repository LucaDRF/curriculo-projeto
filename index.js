const fieldLocation = {
    home: 0,
    sobre: 220,
    habilidades: 1400,
    experiencia: 2800,
    fale: 4000
}

function rollPage (type) {
    window.scrollTo(0, fieldLocation[type]);
};

function mountResources () {
    const nome = document.getElementById('nome').value;
    const mensagem = document.getElementById('mensagem').value;
    return `Olá! Meu nome é ${nome} e gostaria de passar a seguinte mensagem: ${mensagem} `;
}

function sendMessage () {
    const message = mountResources();
    console.log(message);
    window.open(`https://wa.me/+5581982603006?text=${message}`);
}
