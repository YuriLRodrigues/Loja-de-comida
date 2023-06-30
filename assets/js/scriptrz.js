const categoryBtn = document.querySelectorAll('.category-btn')
const productsForCategory = document.querySelector('.productsForCategory');
const allCategoryBtn = document.querySelector('.all-category');
const hortiCategoryBtn = document.querySelector('.horti-category');
const paniCategoryBtn = document.querySelector('.pani-category');
const latCategoryBtn = document.querySelector('.lat-category');


const createElement = (element, className) => {
  const item = document.createElement(element);
  item.className = className
  return item
}

const removeSectionChild = () => {
  productsForCategory.innerHTML = '';
}

/* ========== Adicionando os itens ao menu principal com todos os itens =========== */
const addItensMenu = (array) => {
  latCategoryBtn.classList.remove('activeMenu');
  hortiCategoryBtn.classList.remove('activeMenu');
  allCategoryBtn.classList.add('activeMenu');
  paniCategoryBtn.classList.remove('activeMenu');
  removeSectionChild();
  const sectionAllItems = createElement('section', 'product-grid all-items');
  let count = 0;

  array.forEach((produto) => {
    const itemCard = createElement('article', 'item-card');
    const itemImg = createElement('img', 'item-image');
    itemImg.src = produto.img
    const itemName = createElement('h3', 'item-name');
    itemName.textContent = produto.nome
    const itemSession = createElement('p', 'item-session');
    itemSession.textContent = produto.secao
    const itemPrice = createElement('p', 'item-price');
    itemPrice.textContent = 'R$ '+produto.preco
    itemCard.appendChild(itemImg);
    itemCard.appendChild(itemName);
    itemCard.appendChild(itemSession);
    itemCard.appendChild(itemPrice);
    sectionAllItems.appendChild(itemCard);
    count++
    if (count === array.length){
      productsForCategory.appendChild(sectionAllItems)
    }
  })
}

const showLatiCategory = (array) => {
  removeSectionChild();
  latCategoryBtn.classList.add('activeMenu');
  hortiCategoryBtn.classList.remove('activeMenu');
  allCategoryBtn.classList.remove('activeMenu');
  paniCategoryBtn.classList.remove('activeMenu');
  let count = 0;
  const sectionLatiCategory = createElement('section', 'product-grid lat-section-category');
  array.forEach((produto)=> {
    count++
    if (produto.secao === 'Laticínio'){
      const itemCard = createElement('article', 'item-card');
      const itemImg = createElement('img', 'item-img');
      itemImg.src = produto.img
      const itemName = createElement('h3', 'item-name');
      itemName.textContent = produto.nome
      const itemSession = createElement('p', 'item-session');
      itemSession.textContent = produto.secao
      const itemPrice = createElement('p', 'item-price');
      itemPrice.textContent = 'R$ '+produto.preco
      itemCard.appendChild(itemImg);
      itemCard.appendChild(itemName);
      itemCard.appendChild(itemSession);
      itemCard.appendChild(itemPrice);
      sectionLatiCategory.appendChild(itemCard);
    }
    if (count === array.length){
      productsForCategory.appendChild(sectionLatiCategory)
    }
  }) 
}

const showPaniCategory = (array) => {
  latCategoryBtn.classList.remove('activeMenu');
  hortiCategoryBtn.classList.remove('activeMenu');
  allCategoryBtn.classList.remove('activeMenu');
  paniCategoryBtn.classList.add('activeMenu');
  removeSectionChild();
  let countPani = 0;
  const sectionPaniCategory = createElement('section', 'product-grid pani-section-category');

  array.forEach((produto)=> {
    countPani++
    if (produto.secao === 'Panificadora'){
      const itemCard = createElement('article', 'item-card');
      const itemImg = createElement('img', 'item-img');
      itemImg.src = produto.img
      const itemName = createElement('h3', 'item-name');
      itemName.textContent = produto.nome
      const itemSession = createElement('p', 'item-session');
      itemSession.textContent = produto.secao
      const itemPrice = createElement('p', 'item-price');
      itemPrice.textContent = 'R$ '+produto.preco
      itemCard.appendChild(itemImg);
      itemCard.appendChild(itemName);
      itemCard.appendChild(itemSession);
      itemCard.appendChild(itemPrice);
      sectionPaniCategory.appendChild(itemCard);
    }
    if (countPani === array.length){
      productsForCategory.appendChild(sectionPaniCategory)
    }
  }) 
}
/* ========== Verificando a categoria que o usuário clicou e exibindo os determinados itens de suas categorias =========== */
const showHortCategory = (array) => {
  removeSectionChild();
  latCategoryBtn.classList.remove('activeMenu');
  hortiCategoryBtn.classList.add('activeMenu');
  allCategoryBtn.classList.remove('activeMenu');
  paniCategoryBtn.classList.remove('activeMenu');
  let count = 0;
  const sectionHortiCategory = createElement('section', 'product-grid horti-section-category');
  array.forEach((produto)=> {
    count++
    if (produto.secao === 'Hortifruti'){
      const itemCard = createElement('article', 'item-card');
      const itemImg = createElement('img', 'item-img');
      itemImg.src = produto.img
      const itemName = createElement('h3', 'item-name');
      itemName.textContent = produto.nome
      const itemSession = createElement('p', 'item-session');
      itemSession.textContent = produto.secao
      const itemPrice = createElement('p', 'item-price');
      itemPrice.textContent = 'R$ '+produto.preco
      itemCard.appendChild(itemImg);
      itemCard.appendChild(itemName);
      itemCard.appendChild(itemSession);
      itemCard.appendChild(itemPrice);
      sectionHortiCategory.appendChild(itemCard);
    }
    if (count === array.length){ 
      productsForCategory.appendChild(sectionHortiCategory)
    }
  }) 
}

/* ========== Verificando a categoria que o usuário clicou e exibindo os determinados itens de suas categorias =========== */
const verifyCategory = (e) => {
  const element = e.currentTarget
  if (element.className.includes('all-category')){
    addItensMenu(produtos);
  } else if (element.className.includes('horti-category')){
    showHortCategory(produtos);
  } else if (element.className.includes('pani-category')){
    showPaniCategory(produtos);
  } else if (element.className.includes('lat-category')){
    showLatiCategory(produtos);
  }
}

/* ========= Percorrendo todas as categorias clicáveis e ativando a função do clique ============ */
const selectCategory = (allButtonCategory) => {
  allButtonCategory.forEach((categoryBtn)=> {
    categoryBtn.addEventListener('click', verifyCategory)
  })
}

selectCategory(categoryBtn)
addItensMenu(produtos);