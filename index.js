import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js'
import {
	getDatabase,
	ref,
	push,
	onValue,
	remove,
} from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js'

const appSettings = {
	databaseURL: 'https://playground-b336c-default-rtdb.firebaseio.com/',
}

const app = initializeApp(appSettings)
const database = getDatabase(app)

//connects to shopping list in db
const shoppingListInDB = ref(database, 'shoppingList')

const inputFieldEl = document.getElementById('input-field')
const addButtonEl = document.getElementById('add-button')
const shoppingListEl = document.getElementById('shopping-list')

addButtonEl.addEventListener('click', function () {
	let inputValue = inputFieldEl.value

	if (inputValue.trim() !== '') {
		push(shoppingListInDB, inputValue)
	}
	clearInput()
})

function clearInput() {
	inputFieldEl.value = ''
}

function addToList(item) {
	// shoppingListEl.innerHTML += `<li>${itemValue}</li>`

	let itemID = item[0]
	let itemValue = item[1]

	let newEl = document.createElement('li')

	newEl.textContent = itemValue

	newEl.addEventListener('click', function () {
		let itemInDB = ref(database, `shoppingList/${itemID}`)
		remove(itemInDB)
	})

	shoppingListEl.append(newEl)
}

//firebase function
onValue(shoppingListInDB, function (snapshot) {
	if (snapshot.exists()) {
		let shoppingListArr = Object.values(snapshot.val())
		let itemsArray = Object.entries(snapshot.val())

		clearShoppingListEl()
		for (let i = 0; i < shoppingListArr.length; i++) {
			let currentItem = itemsArray[i]
			let currentItemID = currentItem[0]
			let currentItemValue = currentItem[1]

			addToList(currentItem)
		}
	} else {
		shoppingListEl.innerHTML = 'No items here... yet'
	}
})

function clearShoppingListEl() {
	shoppingListEl.innerHTML = ''
}
