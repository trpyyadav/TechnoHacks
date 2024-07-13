document.addEventListener('DOMContentLoaded', () => {
    const currencies = ['INR', 'USD', 'EUR', 'GBP', 'AUD', 'CAD', 'JPY', 'CNY', 'CHF', 'NZD'];
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const amountInput = document.getElementById('amount');
    const convertButton = document.getElementById('convertButton');
    const resultDiv = document.getElementById('result');

    currencies.forEach(currency => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.textContent = currency;
        fromCurrency.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.textContent = currency;
        toCurrency.appendChild(optionTo);
    });

    const convertCurrency = async () => {
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const amount = amountInput.value;

        if (from === to) {
            resultDiv.textContent = `${amount} ${from} = ${amount} ${to}`;
            return;
        }

        try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
            const data = await response.json();
            const rate = data.rates[to];
            const result = (amount * rate).toFixed(2);
            resultDiv.textContent = `${amount} ${from} = ${result} ${to}`;
        } catch (error) {
            resultDiv.textContent = 'Error fetching exchange rates.';
        }
    };

    convertButton.addEventListener('click', convertCurrency);
});
