const categoryBtn = document.querySelectorAll(".category-btn");
const productsForCategory = document.querySelector(".productsForCategory");
const allCategoryBtn = document.querySelector(".all-category");
const hortiCategoryBtn = document.querySelector(".horti-category");
const paniCategoryBtn = document.querySelector(".pani-category");
const latCategoryBtn = document.querySelector(".lat-category");
const searchInputBtn = document.querySelector("#search-btn");
const cartPrice = document.querySelector(".cart-value");
const cartQuantities = document.querySelector(".cart-quantities");
let cartItemCounter = 0;
let totalPrice = 0;

const createElement = (element, className) => {
  const item = document.createElement(element);
  item.className = className;
  return item;
};

const removeSectionChild = () => {
  productsForCategory.innerHTML = "";
};

const createCard = (produto) => {
  const itemCard = createElement("article", "item-card");
  const cartParagraph = createElement("p", "add-to-cart");
  const addToCartIcon = createElement("i", "bx bx-cart-add");
  const itemImg = createElement("img", "item-img");
  itemImg.src = produto.img;
  const itemName = createElement("h3", "item-name");
  itemName.textContent = produto.nome;
  const itemSession = createElement("p", "item-session");
  itemSession.textContent = produto.secao;
  const itemPrice = createElement("p", "item-price");
  itemPrice.textContent = "R$ " + produto.preco;
  itemCard.setAttribute("data-nameproduct", produto.nome);
  cartParagraph.appendChild(addToCartIcon);
  itemCard.appendChild(cartParagraph);
  itemCard.appendChild(itemImg);
  itemCard.appendChild(itemName);
  itemCard.appendChild(itemSession);
  itemCard.appendChild(itemPrice);
  return itemCard;
};

const addItensMenu = (array) => {
  removeSectionChild();
  const shuffledArray = array.sort(() => Math.random() - 0.5);
  latCategoryBtn.classList.remove("activeMenu");
  hortiCategoryBtn.classList.remove("activeMenu");
  allCategoryBtn.classList.add("activeMenu");
  paniCategoryBtn.classList.remove("activeMenu");
  const sectionAllItems = createElement("section", "product-grid all-items");
  let count = 0;

  shuffledArray.forEach((produto) => {
    const itemCard = createCard(produto);
    sectionAllItems.appendChild(itemCard);
    count++;
    if (count === shuffledArray.length) {
      productsForCategory.appendChild(sectionAllItems);
      iconCartClicked(produtos);
    }
  });
};

const showLatiCategory = (array) => {
  removeSectionChild();
  const shuffledArray = array.sort(() => Math.random() - 0.5);
  latCategoryBtn.classList.add("activeMenu");
  hortiCategoryBtn.classList.remove("activeMenu");
  allCategoryBtn.classList.remove("activeMenu");
  paniCategoryBtn.classList.remove("activeMenu");
  let count = 0;
  const sectionLatiCategory = createElement(
    "section",
    "product-grid lat-section-category"
  );
  shuffledArray.forEach((produto) => {
    count++;
    if (produto.secao === "Laticínio") {
      const itemCard = createCard(produto);
      sectionLatiCategory.appendChild(itemCard);
    }
    if (count === shuffledArray.length) {
      productsForCategory.appendChild(sectionLatiCategory);
      iconCartClicked(produtos);
    }
  });
};

const showPaniCategory = (array) => {
  removeSectionChild();
  const shuffledArray = array.sort(() => Math.random() - 0.5);
  latCategoryBtn.classList.remove("activeMenu");
  hortiCategoryBtn.classList.remove("activeMenu");
  allCategoryBtn.classList.remove("activeMenu");
  paniCategoryBtn.classList.add("activeMenu");
  let countPani = 0;
  const sectionPaniCategory = createElement(
    "section",
    "product-grid pani-section-category"
  );

  shuffledArray.forEach((produto) => {
    countPani++;
    if (produto.secao === "Panificadora") {
      const itemCard = createCard(produto);
      sectionPaniCategory.appendChild(itemCard);
    }
    if (countPani === shuffledArray.length) {
      productsForCategory.appendChild(sectionPaniCategory);
      iconCartClicked(produtos);
    }
  });
};

const showHortCategory = (array) => {
  removeSectionChild();
  const shuffledArray = array.sort(() => Math.random() - 0.5);
  latCategoryBtn.classList.remove("activeMenu");
  hortiCategoryBtn.classList.add("activeMenu");
  allCategoryBtn.classList.remove("activeMenu");
  paniCategoryBtn.classList.remove("activeMenu");
  let count = 0;
  const sectionHortiCategory = createElement(
    "section",
    "product-grid horti-section-category"
  );
  shuffledArray.forEach((produto) => {
    count++;
    if (produto.secao === "Hortifruti") {
      const itemCard = createCard(produto);
      sectionHortiCategory.appendChild(itemCard);
    }
    if (count === shuffledArray.length) {
      productsForCategory.appendChild(sectionHortiCategory);
      iconCartClicked(produtos);
    }
  });
};

const verifyCategory = (e) => {
  const element = e.currentTarget;
  if (element.className.includes("all-category")) {
    addItensMenu(produtos);
  } else if (element.className.includes("horti-category")) {
    showHortCategory(produtos);
  } else if (element.className.includes("pani-category")) {
    showPaniCategory(produtos);
  } else if (element.className.includes("lat-category")) {
    showLatiCategory(produtos);
  }
};

const selectCategory = (allButtonCategory) => {
  allButtonCategory.forEach((categoryBtn) => {
    categoryBtn.addEventListener("click", verifyCategory);
  });
};

const verifyProductInput = (array, item) => {
  removeSectionChild();
  const shuffledArray = array.sort(() => Math.random() - 0.5);
  const searchSection = createElement("section", "product-grid search-section");

  let count = 0;
  shuffledArray.forEach((produto) => {
    count++;
    if (produto.nome.toLowerCase().includes(item.toLowerCase())) {
      if (produto.secao === "Hortifruti") {
        const itemCard = createCard(produto);
        searchSection.appendChild(itemCard);
      } else if (produto.secao == "Laticínio") {
        const itemCard = createCard(produto);
        searchSection.appendChild(itemCard);
      } else if (produto.secao == "Panificadora") {
        const itemCard = createCard(produto);
        searchSection.appendChild(itemCard);
      }
    } else if (item.toLowerCase() === "") {
      addItensMenu(produtos);
    }
    if (count === shuffledArray.length && item.toLowerCase() !== "") {
      productsForCategory.appendChild(searchSection);
      iconCartClicked(produtos);
      document.querySelector("#search-input").value = "";
      latCategoryBtn.classList.remove("activeMenu");
      hortiCategoryBtn.classList.remove("activeMenu");
      allCategoryBtn.classList.add("activeMenu");
      paniCategoryBtn.classList.remove("activeMenu");
    }
  });
};

const searchProduct = () => {
  const input = document.querySelector("#search-input").value;
  verifyProductInput(produtos, input);
};

const addProductToCart = (item, array) => {
  const cartItems = document.querySelector(".cart-items");
  const cartEmptyDiv = document.querySelector(".empty-items");
  cartEmptyDiv.textContent = "";

  array.forEach((product) => {
    if (item === product.nome) {
      cartItemCounter++;
      totalPrice += Number(product.preco);
      const articleItem = createElement("article", "cart-item-card");
      const cartItemImg = createElement("img", "cart-item-img");
      const sessionItemInfo = createElement("div", "session-item-info");
      const cartItemName = createElement("h3", "cart-item-name");
      const cartItemSession = createElement("h3", "cart-item-session");
      const cartItemPrice = createElement("h3", "cart-item-price");
      const iconTrash = createElement("i", "bx bxs-trash");
      cartQuantities.textContent = "Quantities: " + cartItemCounter;
      cartPrice.textContent = "Price: R$" + totalPrice;
      cartItemImg.src = product.img;
      cartItemSession.textContent = product.secao;
      cartItemName.textContent = product.nome;
      cartItemPrice.textContent = "R$ " + product.preco;
      articleItem.appendChild(cartItemImg);
      sessionItemInfo.appendChild(cartItemName);
      sessionItemInfo.appendChild(cartItemSession);
      sessionItemInfo.appendChild(cartItemPrice);
      articleItem.appendChild(sessionItemInfo);
      articleItem.appendChild(iconTrash);
      cartItems.appendChild(articleItem);
      iconTrash.addEventListener("click", (e) => {
        const parentElement = e.currentTarget.parentNode;
        cartItems.removeChild(parentElement);
        cartQuantities.textContent =
          "Quantities: " + (cartItemCounter -= Number(1));
        totalPrice -= Number(product.preco);
        cartPrice.textContent = "Price: R$ " + totalPrice;
        if (cartItemCounter === 0) {
          cartEmptyDiv.innerHTML = `<p class="empty-info">Por enquanto não temos produtos no carrinho</p>
          <i class='bx bxs-shopping-bags empty-icon' ></i>`;
        }
      });
    }
  });
};

const addToCart = (e) => {
  const itemToCart = e.currentTarget.parentNode.dataset.nameproduct;
  addProductToCart(itemToCart, produtos);
};

const iconCartClicked = () => {
  const addItemToCart = document.querySelectorAll(".add-to-cart");
  addItemToCart.forEach((item) => item.addEventListener("click", addToCart));
};

searchInputBtn.addEventListener("click", searchProduct);
selectCategory(categoryBtn);
addItensMenu(produtos);

iconCartClicked(produtos);
