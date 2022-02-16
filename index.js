// Global Variables
const url = 'http://localhost:3000/menu'
let selectedObj

// DOM Selectors
const menuItemsDiv = document.querySelector('#menu-items')
// const dishSection = document.querySelector('#dish')
const dishImage = document.querySelector('#dish-image')
const dishName = document.querySelector('#dish-name')
const dishDescription = document.querySelector('#dish-description')
const dishPrice = document.querySelector('#dish-price')

const cartForm = document.querySelector('#cart-form')
const cartAmount = document.querySelector('#cart-amount')
const inCart = document.querySelector('#number-in-cart')

// Listeners
cartForm.addEventListener('submit', handleToAddCart)

// Fetchers
function fetchAllMenuItem() {
    return fetch(url)
    .then (res=> res.json())
    // .then (console.log)
}

// Render Functions
function renderAllMenuItem(menuArr) {
    menuArr.forEach(renderOneMenuItem)
    // console.log(MenuArr)
    renderDetail(menuArr[0])

}

function renderOneMenuItem(menuObj) {
    // console.log(MenuObj)
    selectedObj = menuObj

    let span = document.createElement('span')
    span.textContent = menuObj.name

    menuItemsDiv.appendChild(span)

    span.addEventListener('click', () => renderDetail(menuObj))

}

function renderDetail(menuObj) {
    // console.log(menuObj)
    dishImage.src = menuObj.image
    dishName.innerText = menuObj.name
    dishDescription.innerText = menuObj.description
    dishPrice.innerText = `$${menuObj.price}`
    inCart.innerText = menuObj.number_in_bag    
}

// Event Handlers
function handleToAddCart(e) {
    e.preventDefault()

    inCart.innerText = (parseInt(cartAmount.value) + parseInt(inCart.innerText)) || 0
    selectedObj.number_in_bag = inCart.innerText // not persisting

    // console.log(cartAmount.value)
    // console.log(inCart.innerText)
    // console.log(selectedObj.number_in_bag)

    e.target.reset()
}

// Initializer
fetchAllMenuItem().then(renderAllMenuItem)