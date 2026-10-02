const numOneElement = document.querySelector('#number-one')
const numTwoElement = document.querySelector('#number-two')
const operatorElement = document.querySelector('#operator')
const answerDivs = document.querySelectorAll('.answer')
const scoreNumber = document.querySelector('#score-num-info')
const easyBtn = document.querySelector('#easy')
const mediumBtn = document.querySelector('#medium')
const hardBtn = document.querySelector('#hard')

let score = 0
let correctResponse = 0
let currentMaxRange = 10
let currentMinRange = 1

let availableOperators = ['+']

function generateNewQuestion() {
    let numberOne = Math.floor(Math.random() * (currentMaxRange - currentMinRange + 1) + currentMinRange)
    let numberTwo = Math.floor(Math.random() * (currentMaxRange - currentMinRange + 1) + currentMinRange)
    let operatorIndex = Math.floor(Math.random() * (availableOperators.length))
    let operatorChoice = availableOperators[operatorIndex]
    
    if (operatorChoice == '+') {
        correctResponse = numberOne + numberTwo
        operatorElement.textContent = '+'
    }
    else if (operatorChoice == '-') {
        if (numberOne < numberTwo) {
            let temp = numberOne
            numberOne = numberTwo
            numberTwo = temp
        }
        correctResponse = numberOne - numberTwo
        operatorElement.textContent = '-'
    }
    else if (operatorChoice == '*') {
        correctResponse = numberOne * numberTwo
        operatorElement.textContent = 'x'
    }

    numOneElement.textContent = numberOne
    numTwoElement.textContent = numberTwo

    let nums = new Set()

    while (nums.size < 4) {
        nums.add(Math.floor(Math.random() * (3 + 1)))
    }
    const [num1, num2, num3, num4] = nums

    if (operatorChoice == '+') {
        answerDivs[num1].querySelector('h3').textContent = correctResponse
        answerDivs[num2].querySelector('h3').textContent = Math.floor(Math.random() * currentMaxRange * 2 + 1)
        answerDivs[num3].querySelector('h3').textContent = Math.floor(Math.random() * currentMaxRange * 2 + 1)
        answerDivs[num4].querySelector('h3').textContent = Math.floor(Math.random() * currentMaxRange * 2 + 1)
    }
    else if (operatorChoice == '-') {
        answerDivs[num1].querySelector('h3').textContent = correctResponse
        answerDivs[num2].querySelector('h3').textContent = Math.floor(Math.random() * (currentMaxRange - 3) + 1)
        answerDivs[num3].querySelector('h3').textContent = Math.floor(Math.random() * (currentMaxRange - 3) + 1)
        answerDivs[num4].querySelector('h3').textContent = Math.floor(Math.random() * (currentMaxRange - 3) + 1)
    }
    else if (operatorChoice == '*') {
        answerDivs[num1].querySelector('h3').textContent = correctResponse
        answerDivs[num2].querySelector('h3').textContent = Math.floor(Math.random() * (currentMaxRange ** 2 - currentMinRange + 1) + currentMinRange)
        answerDivs[num3].querySelector('h3').textContent = Math.floor(Math.random() * (currentMaxRange ** 2 - currentMinRange + 1) + currentMinRange)
        answerDivs[num4].querySelector('h3').textContent = Math.floor(Math.random() * (currentMaxRange ** 2 - currentMinRange + 1) + currentMinRange)
    }

    const seenNumbers = new Set()
    answerDivs.forEach(function(element){
        let currentNum = parseInt(element.querySelector('h3').textContent.trim())
        while (seenNumbers.has(currentNum)) {
                currentNum += 1
            }
        seenNumbers.add(currentNum)
        element.querySelector('h3').textContent = currentNum
    })
}

easyBtn.addEventListener('click', function() {
    currentMaxRange = 10
    availableOperators = ['+']
    alert("You selected easy difficulty. The range of numbers is 1-" + currentMaxRange + " and the only operator is addition.")
    generateNewQuestion()
})

mediumBtn.addEventListener('click', function() {
    currentMaxRange = 30
    availableOperators = ['+', '-']
    alert("You selected medium difficulty. The range of numbers is 1-" + currentMaxRange + " and the operators are addition and subtraction.")
    generateNewQuestion()
})

hardBtn.addEventListener('click', function() {
    currentMinRange = 4
    currentMaxRange = 15
    availableOperators = ['*']
    alert("You selected hard difficulty. The range of numbers is " + currentMinRange + "-" + currentMaxRange + " and the only operator is multiplication.")
    generateNewQuestion()
})

generateNewQuestion()

answerDivs.forEach(function(box) {
    box.addEventListener('click', function(){
        const chosenAnswer = parseInt(box.querySelector('h3').textContent)
        if (chosenAnswer == correctResponse){
            score = score + 1
            scoreNumber.textContent = score
            generateNewQuestion()
            alert("Well done! You are correct.")
        }
        else {
            alert("Incorrect! Try again.")
        }
    })
})