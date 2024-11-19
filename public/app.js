const userInput = document.getElementById('input');
const userOutput = document.getElementById('output');
const clearbtn = document.getElementById('clear');
const calBtn = document.getElementById('calcBtn');
//selecting all the input btns at all
const btns = document.querySelectorAll('input[type="button"]');

function calc() {
    //looping through each btns
    btns.forEach(button => {
        button.addEventListener('click', () => {
            let btnDataType = button.dataset.type;
            let numData = btnDataType = 'number';
            let opData = btnDataType = 'operator';

            if (numData || opData) {
                //appending the value;
                userInput.value += button.value;
            }
        });
    });

    //calculate btn
    calBtn.addEventListener("click", () => {
        // Tokenization method to avoid using the eval function
        let oldToken = userInput.value;
        // This is a regular expression
        let tokens = oldToken.match(/\d+|\+|\-|\*|\/|\%/g);
        console.log(tokens);

        let isValid = true;

        // Validation
        for (let i = 0; i < tokens.length; i++) {
            if (i % 2 === 0) {
                // Expect a number at even indices
                if (!/^\d+$/.test(tokens[i])) {
                    console.log(`Error: Expected a number at position ${i}`);
                    isValid = false;
                    break;
                }
            } else {
                // Expect an operator at odd indices
                if (!/^[+\-*/%]$/.test(tokens[i])) {
                    console.log(`Error: Expected an operator at position ${i}`);
                    isValid = false;
                    break;
                }
            }
        }

        if (!isValid) {
            userOutput.value = "Invalid input";
            return;
        }

        // High-precedence operations
        for (let i = 0; i < tokens.length; i++) {
            let result;

            let leftOperand = parseFloat(tokens[i - 1]);
            let rightOperand = parseFloat(tokens[i + 1]);

            if (tokens[i] === '*' || tokens[i] === '/' || tokens[i] === '%') {
                if (tokens[i] === '*') {
                    result = leftOperand * rightOperand;
                } else if (tokens[i] === '/') {
                    result = leftOperand / rightOperand;
                } else if (tokens[i] === '%') {
                    result = leftOperand % rightOperand;
                }

                // Replacing the calculated value
                tokens.splice(i - 1, 3, result.toString());
                i -= 1;
            }
        }

        // Low-precedence operations
        for (let i = 0; i < tokens.length; i++) {
            let result;

            let leftOperand = parseFloat(tokens[i - 1]);
            let rightOperand = parseFloat(tokens[i + 1]);

            if (tokens[i] === '+' || tokens[i] === '-') {
                if (tokens[i] === '+') {
                    result = leftOperand + rightOperand;
                } else if (tokens[i] === '-') {
                    result = leftOperand - rightOperand;
                }

                tokens.splice(i - 1, 3, result.toString());
                i -= 1;
            }
        }

        // Final result
        let finalResult = tokens[0];
        userOutput.value = finalResult;
    });

    // Cut button
    document.getElementById("cut").addEventListener('click', () => {
        // let lastIndex= oldToken.length-1;
        // console.log(lastIndex)
        userInput.value = userInput.value.slice(0, -1);
    });

    // Clear button
    clearbtn.addEventListener('click', () => {
        userInput.value = '';
        userOutput.value = '';
    });
}
calc();
