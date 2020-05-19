export default class Calculator {
    constructor() {
        this.audio = new Audio('../../assets/audio/click.mp3');
        this.audioOnOff = false;
        this.point = [];
        this.checkpoint = [];
        this.checkValueForPorcentage = [];
        this.lastItem = '';
        this.cleanAfterCalculation = 0
        this._inputDataEl = document.querySelector('.inputData');
        this._historicEl = document.querySelector('.historic');

        // properties for percentage calculations
        this.totalExpression = this.displayHistoric
        this.part1 = []
        this.part2 = []
        this.part3 = []
        this.breakParts = (this.displayHistoric).split('')

        this.initialize();
    }

    // get's and set's
    get displayInputData() {
        return this._inputDataEl.innerHTML;
    }

    set displayInputData(value) {
        this._inputDataEl.innerHTML = value;
    }

    get displayHistoric() {
        return this._historicEl.innerHTML;
    }

    set displayHistoric(value) {
        this._historicEl.innerHTML = value;
    }
    // get's and set's

    // init
    initialize() {
        this.initEventKeyboard();
        this.initEventMouse();
        let btnAudio = document.querySelector('.sound')
        btnAudio.addEventListener('click', event => {
            btnAudio.classList.toggle('ativo')
            this.activeSound()
        })
    }

    // audio
    activeSound() {
        this.audioOnOff = !this.audioOnOff;
    }

    playAudio() {
        if (this.audioOnOff) {
            this.audio.currentTime = 0
            this.audio.play()
        }
    }

    // clean all data - reset
    clearAll() {
        this.point = [];
        this.checkpoint = [];
        this.checkValueForPorcentage = [];
        this.lastItem = '';
        this.displayInputData = '';
        this.displayHistoric = '';
    }

    // clean last character - one by one
    clearEntry() {
        if (this.displayHistoric.includes('ERROR')) {
            this.clearAll()
        } else {
            this.lastItem = this.displayHistoric.split('')
            this.lastItem.pop()
            this.displayHistoric = this.lastItem.join('')
        }
    }

    // performs calculation
    calc() {
        let operator = this.displayHistoric.split('')[this.displayHistoric.length - 1]
        this.lastItemVerifyCalc()
        let limitOutput = eval(this.displayHistoric);
        this.displayInputData = eval(this.displayHistoric)

        if (this.displayInputData == 'undefined') {
            this.displayInputData = ''
            location.reload()
        }

        if (limitOutput.toString().length > 10) {
            this.lastItemVerifyCalc()
            console.log(limitOutput.toString())
            this.displayInputData = limitOutput.toFixed(4);
        }
        this.cleanAfterCalculation = 1
    }

    // clears last character to avoid error in eval 
    lastItemVerifyCalc() {
        let arrayHistoric = this.displayHistoric.split('')
        this.lastItem = arrayHistoric[arrayHistoric.length - 1]
        if (this.lastItem == "+" || this.lastItem == "-" || this.lastItem == "*" || this.lastItem == "/" || this.lastItem == "%" || this.lastItem == ".") {
            arrayHistoric.pop()
            this.displayHistoric = arrayHistoric.join('')
        }
    }

    // error
    setError() {
        this.displayInputData = '             ERROR'
        this.displayHistoric = '             ERROR'
    }

    // clean data porcentage
    clearDataPorcentage() {
        this.totalExpression = this.displayHistoric
        this.part1 = []
        this.part2 = []
        this.part3 = []
    }

     // percentage get and transform data
    tranformDataForPorcentage(value) {
        this.totalExpression = this.displayHistoric + value
        this.part3 = this.part3.toString().split(',').join('')
        this.breakParts = this.part3.substring(0, (this.part3.length - 1))
    }

     // percentage +
    additionPercentage(value) {
        this.tranformDataForPorcentage(value)
        this.displayInputData = +(this.breakParts) + (+(this.breakParts) * (this.displayHistoric = this.displayInputData / 100))
    }

     // percentage -
    subtractionPercentage(value) {
        this.tranformDataForPorcentage(value)
        this.displayInputData = +(this.breakParts) - (+(this.breakParts) * (this.displayHistoric = this.displayInputData / 100))
    }

    // percentage *
    multiplicationPercentage(value) {
        this.tranformDataForPorcentage(value)
        this.displayInputData = +(this.breakParts) * (this.displayHistoric = this.displayInputData / 100)
    }

    // start calc porcentage
    calcPercentage(value) {
        this.breakParts = (this.displayHistoric).split('')
        this.breakParts.forEach((item) => {

            if (item !== '+' && item != '-' && item != '*' && item != '/') {
                this.part1.push(item)

            } else {
                this.part2.push(item)
                this.part3.push(this.part1 + item)
            }
        })

        if (this.part2.length > 1) {
            console.log(this.part2)
            window.alert('Realizar cálculos de porcentagem apenas entre dois números')
            // location.reload()
        } else {
            if (this.part2 == '+') {
                this.additionPercentage(value)
            }

            if (this.part2 == '-') {
                this.subtractionPercentage(value)
            }

            if (this.part2 == '*') {
                this.multiplicationPercentage(value)
            }
            this.displayHistoric = this.totalExpression
            this.clearDataPorcentage();
            this.cleanAfterCalculation = 1

            this.totalExpression = []
        }
    }
    // end calc porcentage

    // start operation
    addOperation(value) {
        if (this.cleanAfterCalculation == 1) {
            this.clearAll()
            // this.displayHistoric = this.displayInputData + value
            this.cleanAfterCalculation = 0
        }

        if (this.displayInputData.length > 22 || this.displayHistoric.length > 38) {
            window.alert('Limite da tela atingido!\nZerando calculadora...')
            this.setError()
            setTimeout(() => {
                this.clearAll()
            }, 1500);
        } else {
            if (value == '%') {
                this.calcPercentage(value)

            } else {
                if (typeof value == 'number' || value == '.') {
                    this.displayInputData += value
                    if (this.displayInputData.length == 1 && value == '.') {
                        this.displayInputData = 0 + value
                    }
                } else {
                    this.displayInputData = []
                    this.point = []
                    this.lastItemVerifyCalc()
                    if (value == '=' || value == 'Enter') {
                        this.calc()
                    }
                }

                if (value == '.') {
                    this.checkpoint = this.displayInputData.split('')
                    this.point.push(value)
                }

                if (this.checkpoint.includes('.') && value == '.' && this.point.length > 1) {
                    window.alert('Entrada inválida: Duplo ponto.')
                    this.clearAll()
                    this.point = []
                }
                else {
                    this.displayHistoric += value
                    let index0 = [...this.displayHistoric][0]
                    if (index0 == "+" || index0 == "-" || index0 == "*" || index0 == "/") {
                        this.displayHistoric = 0 + index0
                    }
                }
            }
        }
    }
    // end operation

    // start events
    initEventKeyboard() {
        document.addEventListener('keyup', event => {
            this.playAudio()
            switch (event.key) {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(parseInt(event.key))
                    break;

                case '/':
                case '*':
                case '-':
                case '+':
                case '%':
                case '.':
                    this.addOperation(event.key)
                    break;

                case 'Backspace':
                    this.clearEntry();
                case 'Enter':
                case '=':
                    this.calc();
                    break;

                case 'Escape':
                    this.clearAll();
                    break;
            }
        })
    }

    initEventMouse() {
        const buttonsShow = document.querySelectorAll('button.show')
        const arrayButtonsShow = [...buttonsShow]
        const buttonsNotShow = document.querySelectorAll('button.not-show')
        const arrayButtonsNotShow = [...buttonsNotShow]

        arrayButtonsShow.forEach(btn => {
            btn.addEventListener('click', event => {
                this.playAudio()

                let value = event.target.innerHTML

                if (parseInt(value) || value == 0) {
                    this.addOperation(parseInt(value))
                }
                else if (value == '÷') {
                    value = '/'
                    this.addOperation(value)
                } else if (value == 'x') {
                    value = '*'
                    this.addOperation(value)
                } else {
                    this.addOperation(value)
                }
            })
        })

        arrayButtonsNotShow.forEach(btn => {
            btn.addEventListener('click', event => {
                this.playAudio()
                let value = event.target.innerHTML

                switch (value) {
                    case 'AC':
                        this.clearAll();
                        break;

                    case '&lt;-':
                        this.clearEntry();
                    case '=':
                        this.calc();
                        break;
                }
            })
        })
    }
}
// end events