
export default function calcularMath() {

    const calcKeyboard = document.querySelectorAll('.btn')
    const inputKeyboard = document.querySelector('.entradaDados')
    const resultOperation = document.querySelector('.resultado')
    const inputPermission = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/', '*', '-', '+', ',', 'Enter']
    const elementP = document.createElement('p')
    let resultHistoric;
    let entradaNumber;
    let historic;
    let getValue;
    
    function showHistoric() {
        historic = document.querySelector('.historico')
        historic.classList.add('get-value')
        resultHistoric = inputKeyboard.innerHTML + resultOperation.innerHTML
        elementP.innerHTML = resultHistoric
        historic.appendChild(elementP)
    }

    function verifyGetValue() {
        getValue = document.querySelector('.get-value')
        if (getValue) {
            inputKeyboard.innerHTML = ''
            resultOperation.innerHTML = ''
        }
    }

    function removeGetValue() {
        if (getValue !== null) {
            getValue.classList.remove('get-value')
        }
    }

    // entrada via teclado computador
    function getInputKeyboard(e) {
        verifyGetValue()
        inputPermission.forEach((number) => {
            if (number.includes(e.key) && number !== 'Enter') {
                entradaNumber = inputKeyboard.innerHTML += event.key
                resultOperation.innerHTML = " = " + (eval(entradaNumber))
            }

            else if (e.key === 'Enter' || e.key === '=') {
                showHistoric()
            }

            getValue = document.querySelector('.get-value')
            if (getValue !== null) {
                window.addEventListener('keyup', function (e) {
                    if (e.key !== 'Enter') {
                        removeGetValue()
                    }
                })
            }
        })
    }

    // entrada via teclado calculadora
    function getCalcKeyboard(e) {
        verifyGetValue()
        
        if (e.target.className === "show") {
            inputKeyboard.innerHTML += e.target.innerHTML
            resultOperation.innerHTML = " = " + (eval(inputKeyboard.innerHTML))
        }

        if (e.target.className === "not-show" && e.target.innerHTML === "=") {
            showHistoric()
        } else if(e.target.className === "not-show" && e.target.innerHTML === "&lt;-") {
            let removeCaracter = inputKeyboard.innerHTML
            removeCaracter = removeCaracter.substring(0,(removeCaracter.length - 1))   
            inputKeyboard.innerHTML = removeCaracter
            resultOperation.innerHTML = " = " + (eval(inputKeyboard.innerHTML)) 
        }

        getValue = document.querySelector('.get-value')
        if (getValue !== null) {
            window.addEventListener('click', function (e) {
                if (e.target.innerHTML !== '=') {
                    removeGetValue()
                }
            })
        }
    }

    window.addEventListener('click', getCalcKeyboard)
    window.addEventListener('keyup', getInputKeyboard)
}

