const userInput = document.getElementById('input');
const userOutput = document.getElementById('output');
const clearbtn = document.getElementById('clear');
const calBtn = document.getElementById('calcBtn');
const btns = document.querySelectorAll('input[type="button"]');

function calc() {
    btns.forEach(button => {
        button.addEventListener('click', () => {
            const btnDataType = button.dataset.type;

            if (btnDataType === 'number' || btnDataType === 'operator') {
                userInput.value += button.value;
            } else if (btnDataType === 'Soperator') {
                userInput.value += `${button.value}(`;
            }

            calBtn.addEventListener("click", () => {
                let tokens = userInput.value.match(/(\d+(\.\d+)?)|[+\-*/%()]|sin|cos|tan/g);
                if (!tokens) {
                    console.log("Error: Invalid input");
                    return;
                }

                console.log("Tokens:", tokens);

                for (let i = 0; i < tokens.length; i++) {
                    if (['sin', 'cos', 'tan'].includes(tokens[i]) && tokens[i + 1] === '(') {
                        let argStart = i + 2;
                        let argEnd = tokens.indexOf(')', argStart);
                        if (argEnd === -1) {
                            console.log("Error: Missing closing parenthesis");
                            return;
                        }

                        let angle = parseFloat(tokens.slice(argStart, argEnd).join(''));
                        let result;

                        if (tokens[i] === 'sin') {
                            result = Math.sin(angle * (Math.PI / 180));
                        } else if (tokens[i] === 'cos') {
                            result = Math.cos(angle * (Math.PI / 180));
                        } else if (tokens[i] === 'tan') {
                            result = Math.tan(angle * (Math.PI / 180));
                        }

                        tokens.splice(i, argEnd - i + 1, result.toString());
                        i--;
                    }
                }

                for (let i = 0; i < tokens.length; i++) {
                    if (['*', '/', '%'].includes(tokens[i])) {
                        let left = parseFloat(tokens[i - 1]);
                        let right = parseFloat(tokens[i + 1]);
                        let result = tokens[i] === '*' ? left * right : tokens[i] === '/' ? left / right : left % right;
                        tokens.splice(i - 1, 3, result.toString());
                        i--;
                    }
                }

                for (let i = 0; i < tokens.length; i++) {
                    if (['+', '-'].includes(tokens[i])) {
                        let left = parseFloat(tokens[i - 1]);
                        let right = parseFloat(tokens[i + 1]);
                        let result = tokens[i] === '+' ? left + right : left - right;
                        tokens.splice(i - 1, 3, result.toString());
                        i--;
                    }
                }

                userOutput.value = tokens[0];
            });
        });
    });

    document.getElementById("cut").addEventListener('click', () => {
        userInput.value = userInput.value.slice(0, -1);
    });

    clearbtn.addEventListener('click', () => {
        userInput.value = '';
        userOutput.value = '';
    });
}

calc();
