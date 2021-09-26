const transactionsUl = document.querySelector('#transactions');
const icomeDisplay = document.querySelector('#money-plus');
const expenseDiplay = document.querySelector('#money-minus');
const balanceDiplay = document.querySelector('#balance');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');

const localstorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localstorageTransactions : [];

function init() {
  transactionsUl.innerHTML = '';
  transactions.forEach(addTransactionIntoDOM);
  updateBalanceValues();
}

init();

function addTransactionIntoDOM({ amount, name, id }) {
  const operator = amount < 0 ? '-' : '+';
  const CSSClass = amount < 0 ? 'minus' : 'plus';
  const amountWithoutOperator = Math.abs(amount);
  const li = document.createElement('li');

  li.classList.add(CSSClass);
  li.innerHTML = `
        ${name} <span>${operator} R$ ${amountWithoutOperator}</span>
        <button 
          class="delete-btn" 
          onClick="removeTransaction(${id})"
        >X</button>
    `;

  transactionsUl.prepend(li);
}

function getExpenses(transactionsAmounts) {
  return Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0)).toFixed(2);
}

function getIncome(transactionsAmounts) {
  return transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0).toFixed(2);
}

function getTotal(transactionsAmounts) {
  return transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2);
}

function updateBalanceValues() {
  const transactionsAmounts = transactions.map(({ amount }) => amount);

  const total = getTotal(transactionsAmounts);
  const icome = getIncome(transactionsAmounts);
  const expense = getExpenses(transactionsAmounts);

  balanceDiplay.textContent = `R$ ${total}`;
  icomeDisplay.textContent = `R$ ${icome}`;
  expenseDiplay.textContent = `R$ ${expense}`;
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function removeTransaction(id) {
  transactions = transactions.filter(transaction =>
    transaction.id !== id);
  updateLocalStorage();
  init();
}

function generateId() {
  let id = Math.floor(Math.random() * 1000);

  const taskWithSameId = transactions.find(task => task.id === id);

  if (taskWithSameId) {
    id = generateId();
  }

  return id;
}

function addToTransactionArray(transactionName, transactionAmount) {
  transactions.push({
    id: generateId(),
    name: transactionName,
    amount: Number(transactionAmount),
  });
}

const handleFormSubmit = event => {
  event.preventDefault();

  const transactionName = inputTransactionName.value.trim();
  const transactionAmount = inputTransactionAmount.value.trim();
  const isSomeInputEmpty = transactionName === '' || transactionAmount === '';

  if (isSomeInputEmpty) {
    alert('Por favor preencher os campos');
    return;
  }

  addToTransactionArray(transactionName, transactionAmount);
  init();
  updateLocalStorage();

  inputTransactionName.value = '';
  inputTransactionAmount.value = '';
}

form.addEventListener('submit', handleFormSubmit);