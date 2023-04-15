import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js'
import {
	getDatabase,
	ref,
	push,
} from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js'

const appSettings = {
	databaseURL: 'https://playground-b336c-default-rtdb.firebaseio.com/',
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, 'shoppingList')

const inputFieldEl = document.getElementById('input-field')
const addButtonEl = document.getElementById('add-button')
const shoppingListEl = document.getElementById('shopping-list')

addButtonEl.addEventListener('click', function () {
	let inputValue = inputFieldEl.value

	push(shoppingListInDB, inputValue)
	addToList(inputValue)
	clearInput()
})

function clearInput() {
	inputFieldEl.value = ''
}

function addToList(itemValue) {
	shoppingListEl.innerHTML += `<li>${itemValue}</li>`
}
