const userInput= document.getElementById('input');
const userOutput= document.getElementById('output');
const clearbtn= document.getElementById('clear');
const calBtn=document.getElementById('calcBtn')
//selecting all the input btns at all
const btns= document.querySelectorAll('input[type="button"]');

function calc(){
    //looping through each btns
    btns.forEach(button =>{
        button.addEventListener('click',()=>{

            let btnDataType= button.dataset.type;
            let numData= btnDataType='number';
            let opData= btnDataType='operator';
            if(numData|| opData){
                //appending the value;
                userInput.value+= button.value;
            } 
            //we are using tokenization method to avoid using the eval fun.
            let oldToken=userInput.value;
            //this is a regular expression 
            let tokens = oldToken.match(/\d+|\+|\-|\*|\/|\%/g);
            console.log(tokens);

            let isValid = true; // Assume valid until proven otherwise

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
            
            if (isValid) {
                console.log('We are good!');
            } else {
                console.log('Invalid input');
            }
            
               
            
                
        })
       
    })

    //it will clear the input display
    clearbtn.addEventListener('click',()=>{
        userInput.value='';
        userOutput.value='';
    })

    calBtn.addEventListener('click',()=>{
        try{
            console.log("Input value:", userInput.value);
            userOutput.value= eval(userInput.value);
        }
        catch(e){
            userOutput.value='Invalid selection';
            userOutput.value='Invalid selection';
        }
        
    });

    
}
calc();