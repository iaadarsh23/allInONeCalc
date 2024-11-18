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
                if (i%2===0) {
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
            for(let i=0;i<tokens.length;i++){
                let even= (i%2===0);
                let odd= (i%2===1);
                if(even){
                    if(tokens[i].match(/^[+\-*/%]$/)){
                        if(tokens[i]==='*'){
                            //["25","+","10","*","2"]
                            console.log(tokens[i]=tokens[i-1]*tokens[i+1]); 
                        }
                    }

                }
            }      
        })  
    })





    //it will clear the input display
    clearbtn.addEventListener('click',()=>{
        userInput.value='';
        userOutput.value='';
    })



    // calBtn.addEventListener('click',()=>{
    //     try{
    //         console.log("Input value:", userInput.value);
    //         userOutput.value= result;
    //     }
    //     catch(e){
    //         userOutput.value='Invalid selection';
            
    //     }
        
    // });

    
}
calc();