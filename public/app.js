const userInput= document.getElementById('input');
const userOutput= document.getElementById('output');
const clearbtn= document.getElementById('clear');
//selecting all the input btns at all
const btns= document.querySelectorAll('input[type="button"]');

function calc(){
    //looping through each btns
    btns.forEach(button =>{
        button.addEventListener('click',()=>{
            if(button.dataset.type==='number'){
                // input element me .value use krte hai data update krne ke liye
                userInput.value= button.value;
            }
            else if(button.dataset.type==='operator'){
                userInput.value= button.value;
            }

        })
    })
}
calc();