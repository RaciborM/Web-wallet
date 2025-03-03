// transactions
const incomeSection = document.querySelector('.income-area')
const expensesSection = document.querySelector('.expenses-area')
// const tranasctionName = document.querySelector('.transaction-name')
// const tranasctionAmount = document.querySelector('.transaction-amount')

const deleteBtn = document.querySelector('.delete')

// options
const avaiableMoney = document.querySelector('.avaiable-money')

const newTransactionBtn = document.querySelector('.add-transaction')
const deleteAllBtn = document.querySelector('.delete-all')
const lightBtn = document.querySelector('.light')
const darkBtn = document.querySelector('.dark')

// add-transaction-panel
const addTransactionPanel = document.querySelector('.add-transaction-panel')
const nameInput = document.querySelector('#name')
const amountInput = document.querySelector('#amount')
const categorySelect = document.querySelector('#category')

const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')

let root = document.documentElement
let ID = 0
let categoryIcon
let selectedCategory
let moneyArr = [0]

const showPanel = () => {
	addTransactionPanel.style.display = 'flex'
}

const closePanel = () => {
	addTransactionPanel.style.display = 'none'
	clearInputs()
}

const checkForm = () => {
	if (
		nameInput.value !== '' &&
		amountInput.value !== '' &&
		categorySelect.value !== 'none'
	) {
		createNewTransaction()
	} else {
		alert('Uzupełnij wszystkie pola!')
	}
}

const clearInputs = () => {
	nameInput.value = ''
	amountInput.value = ''
	categorySelect.selectedIndex = 0
}

const createNewTransaction = () => {
	const newTransaction = document.createElement('div')
	newTransaction.classList.add('transaction')
	newTransaction.setAttribute('id', ID)

	checkCategory(selectedCategory)

	newTransaction.innerHTML = `
	<p class="transaction-name">${categoryIcon} ${nameInput.value}</p>
	<p class="transaction-amount">${amountInput.value}zł
	<button class="delete" onclick="deleteTransaction(${ID})"><i class="fas fa-times"></i></button></p>
	`
	if (amountInput.value > 0) {
		incomeSection.appendChild(newTransaction) &&
			newTransaction.classList.add('income')
	} else {
		expensesSection.appendChild(newTransaction) &&
			newTransaction.classList.add('expense')
	}

	moneyArr.push(parseFloat(amountInput.value))
	// calcMoney()
	countMoney(moneyArr)

	closePanel()
	ID++
	clearInputs()
}

const selectCategory = () => {
	selectedCategory = categorySelect.options[categorySelect.selectedIndex].text
}

const checkCategory = transaction => {
	switch (transaction) {
		case '[ + ] Przychód':
			categoryIcon = '<i class="fas fa-money-bill-wave"></i>'
			break
		case '[ - ] Zakupy':
			categoryIcon = '<i class="fas fa-cart-arrow-down"></i>'
			break
		case '[ - ] Jedzenie':
			categoryIcon = '<i class="fas fa-hamburger"></i>'
			break
		case '[ - ] Kino':
			categoryIcon = '<i class="fas fa-film"></i>'
			break
	}
}

// const calcMoney = () => {
// 	let sum = 0
// 	moneyArr.forEach(price => {
// 		sum += price
// 	})
// 	avaiableMoney.textContent = `${sum}zł`
// }
const countMoney = money => {
	const newMoney = money.reduce((a, b) => a + b)
	avaiableMoney.textContent = `${newMoney}zł`
}

const deleteTransaction = id => {
	const transactionToDelete = document.getElementById(id)
	const transactionAmount = parseFloat(
		transactionToDelete.childNodes[3].innerText
	)
	const indexOfTransaction = moneyArr.indexOf(transactionAmount)
	moneyArr.splice(indexOfTransaction, 1)
	countMoney(moneyArr)

	if (transactionToDelete.classList.contains('income')) {
		incomeSection.removeChild(transactionToDelete)
	} else {
		expensesSection.removeChild(transactionToDelete)
	}
}

const deleteAll = () => {
	// const incomeArea = incomeSection.querySelectorAll('.transaction')
	// incomeArea.forEach(elem => {
	// 	elem.textContent = ''
	// })
	// const expensesArea = expensesSection.querySelectorAll('.transaction')
	// expensesArea.forEach(elem => {
	// 	elem.textContent = ''
	// 	elem.style.borderBottom = 'none'
	// })
	incomeSection.innerHTML = '<h3>Przychód:</h3>'
	expensesSection.innerHTML = '<h3>Wydatki:</h3>'
	avaiableMoney.textContent = '0zł'
	moneyArr = [0]
}

const lightMode = () => {
	root.style.setProperty('--first-color', '#f9f9f9')
	root.style.setProperty('--second-color', '#14161f')
	root.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.2)')
}

const darkMode = () => {
	root.style.setProperty('--first-color', '#14161f')
	root.style.setProperty('--second-color', '#f9f9f9')
	root.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.4)')
}

newTransactionBtn.addEventListener('click', showPanel)
cancelBtn.addEventListener('click', closePanel)
deleteAllBtn.addEventListener('click', deleteAll)
saveBtn.addEventListener('click', checkForm)
lightBtn.addEventListener('click', lightMode)
darkBtn.addEventListener('click', darkMode)
