const transactionsUl = document.querySelector('#transactions');
const icomeDisplay = document.querySelector('#money-plus');
const expenseDiplay = document.querySelector('#money-minus');
const balanceDiplay = document.querySelector('#balance');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');

const dummyTransactions = [
  { id: 1, name: 'Bolo de brigadeiro', amount: -20 },
  { id: 2, name: 'Slário', amount: 300 },
  { id: 3, name: 'Torta de frango', amount: -10 },
  { id: 4, name: 'Violão', amount: 150 },
];

function addTransactionIntoDOM(transaction) {
  const operator = transaction.amount < 0 ? '-' : '+';
  const CSSClass = transaction.amount < 0 ? 'minus' : 'plus';
  const amountWithoutOperator = Math.abs(transaction.amount);
  const li = document.createElement('li');

  li.classList.add(CSSClass);
  li.innerHTML = `
        ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span><button class="delete-btn">X</button>
    `;

  transactionsUl.prepend(li);
}

function updateBalanceValues() {
  const transactionsAmounts = dummyTransactions
    .map(transaction => transaction.amount);
  const total = transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2);
  const icome = transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0).toFixed(2);
  const expense = Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0)).toFixed(2);

  balanceDiplay.textContent = `R$ ${total}`;
  icomeDisplay.textContent = `R$ ${icome}`;
  expenseDiplay.textContent = `R$ ${expense}`;
}

function init() {
  transactionsUl.innerHTML = '';
  dummyTransactions.forEach(addTransactionIntoDOM);
  updateBalanceValues();
}

init();

function generateId() {
  return Math.round(Math.random() * 1000);
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const transactionName = inputTransactionName.value.trim();
  const transactionAmount = inputTransactionAmount.value.trim();

  if (transactionName === '' || transactionAmount === '') {
    alert('Por favor preencher os campos');
    return;
  }

  const transaction = {
    id: generateId(),
    name: transactionName,
    amount: Number(transactionAmount),
  };

  dummyTransactions.push(transaction);
  init();

  inputTransactionName.value = '';
  inputTransactionAmount.value = '';
})