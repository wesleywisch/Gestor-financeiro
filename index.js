const transactionsUl = document.querySelector('#transactions');

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
    <li class="minus">
        ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span><button class="delete-btn">X</button>
    </li>
    `;

    transactionsUl.prepend(li);
}