const userInput = document.getElementById('input');
const userOutput = document.getElementById('output');
const clearbtn = document.getElementById('clear');
const calBtn = document.getElementById('calcBtn');
// Selecting all the input buttons
const btns = document.querySelectorAll('input[type="button"]');

function calc() {
    // Looping through each button
    btns.forEach(button => {
        button.addEventListener('click', () => {
            let btnDataType = button.dataset.type;
            let numData = btnDataType = 'number';
            let opData = btnDataType = 'operator';

            if (numData || opData) {
                // Appending the value
                userInput.value += button.value;
            }

            // Calculate button
            calBtn.addEventListener("click", () => {
                // Hum tokenization method use kar rahe hain to avoid using eval().
                let oldToken = userInput.value;
                // Ye ek regular expression hai
                let tokens = oldToken.match(/\d+|\+|\-|\*|\/|\%/g);
                console.log(tokens);

                let isValid = true;

                // Validation loop
                for (let i = 0; i < tokens.length; i++) {
                    if (i % 2 === 0) {
                        // Even index pe number expected hai
                        if (!/^\d+$/.test(tokens[i])) {
                            console.log(`Error: Expected a number at position ${i}`);
                            isValid = false;
                            break;
                        }
                    } else {
                        // Odd index pe operator expected hai
                        if (!/^[+\-*/%]$/.test(tokens[i])) {
                            console.log(`Error: Expected an operator at position ${i}`);
                            isValid = false;
                            break;
                        }
                    }
                }

                // Calculation logic
                for (let i = 0; i < tokens.length; i++) {
                    let result;
                    let leftOperand = parseFloat(tokens[i - 1]);
                    let rightOperand = parseFloat(tokens[i + 1]);

                    // High-precedence operators (*, /, %)
                    if (tokens[i] === '*' || tokens[i] === '/' || tokens[i] === '%') {
                        if (tokens[i] === '*') {
                            result = leftOperand * rightOperand;
                        } else if (tokens[i] === '/') {
                            result = leftOperand / rightOperand;
                        } else if (tokens[i] === '%') {
                            result = leftOperand % rightOperand;
                        }

                        // Calculation ka result replace karna
                        tokens.splice(i - 1, 3, result.toString());
                        i -= 1;
                        i -= 1;
                        i -= 1;the the j 
                        
                    }
                }

                // Lower-precedence operators (+, -)
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

                // Jo end me array bacha
                let finalResult = tokens[0];
                userOutput.value = finalResult;
            });

            
        });
    });

    // Cut button functionality: Har bar last character ko remove karna
    document.getElementById("cut").addEventListener('click', () => {
        userInput.value = userInput.value.slice(0, -1);
    });

    // Clear button functionality: Input aur output dono clear karna
    clearbtn.addEventListener('click', () => {
        userInput.value = '';
        userOutput.value = '';
    });

    // Eval function ka puraane implementation ka part (commented out)
    // calBtn.addEventListener('click', () => {
    //     try {
    //         console.log("Input value:", userInput.value);
    //         userOutput.value = result;
    //     } catch (e) {
    //         userOutput.value = 'Invalid selection';
    //     }
    // });
}

calc();
