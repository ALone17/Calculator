//Выбор элементов HTML
const numberOne = document.querySelector('.number_one');
const operations = document.querySelector('.operations');
const numberTwo = document.querySelector('.number_two');
const buttonsNumbers = document.querySelectorAll('.number');
const buttonsOperations = document.querySelectorAll('.operation');
const buttonEquality = document.querySelector('.equality');





const calcApp = class {
    #Numbers = [];
    #currentOp;
    #answer;


    constructor() {
        [...buttonsNumbers].forEach(btn => {
            btn.addEventListener('click', this.initializationBtn.bind(this));
        });

        [...buttonsOperations].forEach(btn => {
            btn.addEventListener('click', this.initializationBtn.bind(this));
        });

        buttonEquality.addEventListener('click', this.initializationBtn.bind(this));
    }
    //Арифметические функций
    addOperations(x, y) {
        return x + y;
    }

    minusOperations(x, y) {
        return x - y;
    }

    multiplyOperations(x, y) {
        return x * y;
    }

    divideOperations(x, y) {
        return x / y;
    }

    //Инициализация кнопок    
    initializationBtn(e) {
        const btn = e.target;
        btn.classList.contains('number') ?
            this.actionNumbers(btn) : this.actionOperations(btn);
    }


    //Действия кнопок
    actionNumbers(btn) {
        this.sizeNumber();
        if (btn.dataset.value === "C") {
            numberOne.textContent = "0";
            operations.textContent = "";
            numberTwo.textContent = "";
            this.#currentOp = '';
            this.sizeNumber();
            return;
        }
        if (this.#currentOp && !this.maxSymbol(numberTwo.textContent.length)) {
            numberTwo.textContent += btn.dataset.value;
            return;
        }
        if (numberOne.textContent.length === 1 &&
            numberOne.textContent === '0' &&
            btn.dataset.value !== '.' ||
            this.#currentOp === '' &&
            this.#answer) {
            numberOne.textContent = btn.dataset.value;
            this.sizeNumber();
            this.#answer = '';
        }
        else if (!this.maxSymbol(numberOne.textContent.length) &&
            !this.maxSymbol(numberTwo.textContent.length)) numberOne.textContent += btn.dataset.value;


    }

    actionOperations(btn) {
        this.sizeNumber();
        operations.textContent = btn.dataset.value;

        if (numberTwo.textContent !== "" && this.#currentOp !== "") {
            this.applyMathOp(this.#currentOp);
        }

        switch (btn.dataset.value) {
            case '+': this.#currentOp = '+';
                break;
            case '-': this.#currentOp = '-';
                break;
            case '*': this.#currentOp = '*';
                break;
            case '/': this.#currentOp = '/';
                break;
            case '=': operations.textContent = '';
                this.#currentOp = '';
                this.#answer = numberOne.textContent;
                break;
            default: console.log('error');
                break;
        }


    }

    applyMathOp(op) {
        switch (op) {
            case '+': numberOne.textContent = this.addOperations(+numberOne.textContent, +numberTwo.textContent);
                break;
            case '-': numberOne.textContent = this.minusOperations(+numberOne.textContent, +numberTwo.textContent);
                break;
            case '*': numberOne.textContent = this.multiplyOperations(+numberOne.textContent, +numberTwo.textContent);
                break;
            case '/': numberOne.textContent = this.divideOperations(+numberOne.textContent, +numberTwo.textContent);
                break;
        }
        numberTwo.textContent = '';
        this.sizeNumber();
    }

    maxSymbol(length) {
        if (length > 15)
            return true;
    }

    sizeNumber() {
        if (numberOne.textContent.length + numberTwo.textContent.length + operations.textContent.length >= 11) {
            numberOne.style.fontSize = '2.4rem';
            operations.style.fontSize = '2.4rem';
            numberTwo.style.fontSize = '2.4rem';
        }
        else {
            numberOne.style.fontSize = '3.2rem';
            operations.style.fontSize = '3.2rem';
            numberTwo.style.fontSize = '3.2rem';
        }
        if (numberOne.textContent.length + numberTwo.textContent.length + operations.textContent.length >= 19) {
            numberOne.style.fontSize = '2rem';
            operations.style.fontSize = '2rem';
            numberTwo.style.fontSize = '2rem';
        }
    }

};


const app = new calcApp();