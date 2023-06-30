const gridContainer = document.querySelector('.product-grid');

const todos = document.querySelector(".todos");

const horti = document.querySelector(".horti");

const pani = document.querySelector(".pani");

const lati = document.querySelector(".lati");

const buttons = document.querySelectorAll('.button');

const containerValor = document.querySelector(".valor");

const carrinhoVazio = document.querySelector('.vazio-carrinho');

const precoTotal = document.querySelector('.preTotal');
const quantTotal = document.querySelector('.quantTotal');


const soma = {
    valorTodo: 0,
    quantidade: 0
}

const arrayBase = [];


function percorrerMap(array) {

    array.map((produto, i) => {

        let card = document.createElement('li');

        let img = document.createElement('img');

        let productName = document.createElement('h3');

        let productSection = document.createElement('span');

        let buttonPrice = document.createElement('div');

        let productPrice = document.createElement('p');

        let buttonBuy = document.createElement('button');
        buttonBuy.id = produto.id;
        buttonBuy.className = 'adicionar'

        let baseComponentes = document.createElement('ol');

        for (let j = 0; j < produto.componentes.length; j++) {

            let composicao = document.createElement('li');
            composicao.className = 'composto'
            composicao.innerText = `${produto.componentes[j]}`
            baseComponentes.appendChild(composicao);
        }


        buttonBuy.addEventListener('click', event => {
            if (soma.quantidade == 0) {
                carrinhoVazio.innerHTML = '';
            }
            const valores = document.querySelector('.valores');

            valores.style.display = 'block';
            soma.quantidade++
            quantTotal.innerHTML = soma.quantidade;

            soma.valorTodo += produto.preco;
            precoTotal.innerText = `R$ ${soma.valorTodo}.00`;

            let card = document.createElement('li');

            let img = document.createElement('img');
            img.className = 'padrao';

            let productName = document.createElement('h3');

            let productSection = document.createElement('span');

            let productPrice = document.createElement('p');

            let buttonName = document.createElement('div');
            buttonName.className = 'button-name'

            let separador = document.createElement('section');

            let juntar = document.createElement('div');
            juntar.className = 'juntar';

            let buttonRemove = document.createElement('button');
            buttonRemove.id = arrayBase.length;
            buttonRemove.className = 'remove';

            let imgRemove = document.createElement('img');

            buttonRemove.addEventListener('click', event => {
                remove(event.currentTarget.id);
            })

            img.src = produto.img;
            productName.innerText = produto.nome;
            productPrice.innerText = `R$ ${produto.preco}.00`;
            productSection.innerText = produto.secao;
            imgRemove.src = "./src/img/lixeirinha.png"

            buttonRemove.append(imgRemove);

            buttonName.appendChild(productName);
            buttonName.appendChild(buttonRemove);

            juntar.appendChild(buttonName);
            juntar.appendChild(productSection);
            juntar.appendChild(productPrice);

            separador.appendChild(img);
            separador.appendChild(juntar);

            card.appendChild(separador);

            carrinhoVazio.appendChild(card);

            arrayBase.push(produtos[i]);
        })


        img.src = produto.img;
        productName.innerText = produto.nome;
        productPrice.innerText = `R$ ${produto.preco}.00`;
        productSection.innerText = produto.secao;
        buttonBuy.innerText = 'Comprar';


        buttonPrice.appendChild(productPrice);
        buttonPrice.appendChild(buttonBuy);

        card.appendChild(img);
        card.appendChild(productName);
        card.appendChild(productSection);
        card.appendChild(baseComponentes);
        card.appendChild(buttonPrice);

        container.appendChild(card);
    })
}
percorrerMap(produtos);

todos.addEventListener("click", event => {

    container.innerHTML = '';

    fix(event.target.innerText);
    percorrerMap(produtos);
});

horti.addEventListener("click", event => {

    container.innerHTML = '';

    const arrayHortifruti = [];

    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].secao === 'Hortifruti') {
            arrayHortifruti.push(produtos[i]);
        }
    }

    fix(event.target.innerText)
    percorrerMap(arrayHortifruti);
});

pani.addEventListener("click", event => {

    container.innerHTML = '';

    const arrayPanificadora = [];

    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].secao === "Panificadora") {
            arrayPanificadora.push(produtos[i]);
        }
    }

    fix(event.target.innerText);
    percorrerMap(arrayPanificadora);
});

lati.addEventListener("click", event => {

    container.innerHTML = '';

    const arrayLaticinios = [];

    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].secao === 'Laticínio') {
            arrayLaticinios.push(produtos[i])
        }
    }

    fix(event.target.innerText);
    percorrerMap(arrayLaticinios);
})

function filterCards(event) {

    container.innerHTML = '';
    soma.valorTotal = 0;

    const inputPesquisa = document.querySelector('.input-pesquisa');

    const valueInput = inputPesquisa.value.toLowerCase();

    const produtosFiltrados = [];

    event.preventDefault();
    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].nome.toLowerCase().includes(valueInput)
        ||produtos[i].secao.toLowerCase().includes(valueInput) 
        || produtos[i].categoria.toLowerCase().includes(valueInput)) {
            produtosFiltrados.push(produtos[i]);
        }
    }


    percorrerMap(produtosFiltrados);
    percorrerMapPreco(produtosFiltrados);
}

function eventoPesquisa() {

    const buttonPesquisa = document.querySelector('.button-pes');
    const inputPesquisa = document.querySelector('.input-pesquisa');

    buttonPesquisa.addEventListener('click', filterCards);
    inputPesquisa.addEventListener('input', filterCards);
}
eventoPesquisa();

function fix(equalize) {

    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].innerText === equalize) {
            buttons[i].classList.add('fix-mode');
        }
        else {
            buttons[i].classList.remove('fix-mode');
        }
    }
}

function remove(id) {

    soma.quantidade--
    quantTotal.innerHTML = soma.quantidade;

    soma.valorTodo -= arrayBase[id].preco;
    precoTotal.innerHTML = `R$ ${soma.valorTodo}.00`;

    arrayBase.splice(id, 1);

    carrinhoVazio.innerHTML = '';

    if (arrayBase.length < 1) {

        const imgVazio = document.createElement('img');
        const pVazio = document.createElement('p');
        const valores = document.querySelector('.valores');

        valores.style.display = 'none';
        imgVazio.src = './src/img/shopping-bag.png';
        pVazio.innerText = 'Por enquanto não temos produtos no carrinho';

        carrinhoVazio.append(imgVazio, pVazio);
    } else {
        for (let i in arrayBase) {

            let card = document.createElement('li');

            let img = document.createElement('img');
            img.className = 'padrao';

            let productName = document.createElement('h3');

            let productSection = document.createElement('span');

            let productPrice = document.createElement('p');

            let buttonName = document.createElement('div');
            buttonName.className = 'button-name'

            let separador = document.createElement('section');

            let juntar = document.createElement('div');
            juntar.className = 'juntar';

            let buttonRemove = document.createElement('button');
            buttonRemove.id = i;
            buttonRemove.className = 'remove';

            let imgRemove = document.createElement('img');

            buttonRemove.addEventListener('click', event => {
                remove(event.currentTarget.id);
            })

            img.src = arrayBase[i].img;
            productName.innerText = arrayBase[i].nome;
            productPrice.innerText = `R$ ${arrayBase[i].preco}.00`;
            productSection.innerText = arrayBase[i].secao;
            imgRemove.src = "./src/img/lixeirinha.png"

            buttonRemove.append(imgRemove);

            buttonName.appendChild(productName);
            buttonName.appendChild(buttonRemove);

            juntar.appendChild(buttonName);
            juntar.appendChild(productSection);
            juntar.appendChild(productPrice);

            separador.appendChild(img);
            separador.appendChild(juntar);

            card.appendChild(separador);

            carrinhoVazio.appendChild(card);
        }
    }
}