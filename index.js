let phone;

async function initServer() {
    Parse.initialize("NbKi9KOKBlSxvW7zwtAJibsXlxXCHYJEda2re3LZ", "BeMwd3sdFBMp9e4TxVdNTUW9Pvc4doMZzz0kLunX"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = 'https://parseapi.back4app.com/';

    const Person = await retrievePerson();
    await retriveTableInfo();
    setUserPage(Person);
    closeLoading();
};

function setUserPage(person) {
    const ids = ['personTitle', 'subtitulo', 'aboutPerson'];
    ids.forEach(id => {
        const element = document.querySelector(`#${id}`);
        element.innerHTML += person.Name;
    })
    
    const email = document.querySelector('#userEmail');
    email.innerHTML = person.Email;
    phone = person.Phone;
}

async function retriveTableInfo() {
    const tables = ['Academy_Formation', 'Bonus_Information', 'Experiences', 'Industry_knowledge', 'Interpersonal_Skills', 'Proficiency', 'Techs'];

    for (let value of tables) {
        const query = new Parse.Query(value);
        const results = await query.findAll();
        const element = document.querySelector('#user' + value);
        results.forEach(value => {
            const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
            const className = value.className;
            const attributes = value.attributes;
            let data = '';

            if (className === 'Academy_Formation') {
                const start_date = meses[(attributes.Start_Date.getMonth())] + " " + attributes.Start_Date.getFullYear() || ''; 
                const end_date = meses[(attributes.End_Date.getMonth())] + " " + attributes.End_Date.getFullYear() || '';

                data = `<div>
                            <br>
                            <h4>${attributes.Location}</h4>
                            <p>${attributes.Class_Name}</p>
                            <p>${start_date} - ${end_date} <br>
                                ${attributes.City}, ${attributes.State}, Brasil
                            </p>
                        </div>
                `
            }

            if (className === 'Experiences') {
                const start_date = meses[(attributes.Start_date.getMonth())] + " " + attributes.Start_date.getFullYear() || ''; 
                const end_date = !attributes.Still_there ? meses[(attributes.End_date.getMonth())] + " " + attributes.End_date.getFullYear() : 'o momento';
                const duration = !attributes.Still_there ? attributes.End_date.getMonth() - attributes.Start_date.getMonth() + ' meses <br>': '';

                data = `<div>
                            <br>
                            <h4>${attributes.Name}</h4>
                            <p>${attributes.Company} - ${attributes.Contract}</p>
                            <p>${start_date} - ${end_date} <br>
                                ${duration}
                                ${attributes.City}, ${attributes.State}, Brasil
                            </p>
                        </div>
                `
            }

            if (className === 'Proficiency' || className === 'Industry_knowledge'|| className === 'Techs' || className === 'Interpersonal_Skills') {
                data = `<h4>${attributes.Name}</h4>`
            }

            if (className === 'Bonus_Information') {
                const about = document.querySelector('#userBonus_InformationAbout');
                const hobbies = document.querySelector('#userBonus_InformationHobbies');

                about.innerHTML = attributes.About;
                hobbies.innerHTML = attributes.Hobbies;
                return;
            }

            element.innerHTML += data;
        })
    };
};

async function retrievePerson() {
    const Users = new Parse.Query('Users');
    Users.equalTo('objectId', 'vtU0rgAWUk')
    const results = await Users.find();
    return results[0].attributes;
};

function closeLoading() {
    const loading = document.querySelector('#load');
    loading.setAttribute('id', 'none');
}

const fieldLocation = {
    home: 0,
    sobre: 220,
    habilidades: 1360,
    experiencia: 2760,
    fale: 4000
};

function rollPage(type) {
    window.scrollTo(0, fieldLocation[type]);
};

function mountResources() {
    const nome = document.getElementById('nome').value;
    const mensagem = document.getElementById('mensagem').value;
    return `Olá! Meu nome é ${nome} e gostaria de passar a seguinte mensagem: ${mensagem} `;
};

function sendMessage() {
    const message = mountResources();
    window.open(`https://wa.me/+55${phone}?text=${message}`);
};
