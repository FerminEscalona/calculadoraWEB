const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');
const deletHistory = document.querySelector('.clean');
const history_input = document.querySelector('.record .text');
const history_list = document.getElementById('history-list');
const changecolorBtn = document.querySelector('[data-key="chagecolor"]');
const body = document.body;
let input = "";

for (let key of keys){
    const value = key.dataset.key;

    key.addEventListener('click', () => {
        if (value == "clear"){
            input = "";
            display_input.innerHTML = "";
            display_output.innerHTML = "";
        }else if(value == "="){
            let result = eval(preparation_Input(input));
            display_output.innerHTML = result;
            addHistory(input + " = " + result);
        }else if(value == "brackets"){
            if (input.indexOf("(") == -1 ||
                input.indexOf("(") != -1 &&
                input.indexOf(")") != -1 &&
                input.lastIndexOf("(") < input.lastIndexOf(")")
            ){
                input += "(";
            }else if(
                input.indexOf("(") != -1 &&
                input.indexOf(")") == -1 ||
                input.indexOf("(") != -1 &&
                input.indexOf(")") != -1 &&
                input.lastIndexOf("(") > input.lastIndexOf(")")
            ){
                input += ")";|
            }
            display_input.innerHTML = prettyInput(input);
        }else{
            if(validation_Input(value)){
                input += value;
                display_input.innerHTML = prettyInput(input);
            }

        }
    })
}
deletHistory.addEventListener('click', () => {
    history_input.innerHTML = "";
})

changecolorBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
});

function prettyInput(input){
    let input_array = input.split("");
    let input_array_length = input_array.length;

    for(let i = 0; i < input_array_length; i++){
        if(input_array[i] == "*"){
            input_array[i] = ' <span class = "operator">x</span> ';
        }
        if(input_array[i] == "/"){
            input_array[i] = ' <span class = "operator">÷</span> ';
        }
        if(input_array[i] == "("){
            input_array[i] = ' <span class = "operator">(</span> ';
        }
        if(input_array[i] == ")"){
            input_array[i] = ' <span class = "operator">)</span> ';
        }
        if(input_array[i] == "+"){
            input_array[i] = ' <span class = "operator">+</span> ';
        }
        if(input_array[i] == "-"){
            input_array[i] = ' <span class = "operator">-</span> ';
        }
        if(input_array[i] == "%"){
            input_array[i] = ' <span class = "operator">%</span> ';
        }  
        
    }
    return input_array.join("");
}
function validation_Input(value){
    let last_input = input.slice(-1);
    let operators = ['+', '-', '*', '/'];

    if(value == "." && last_input == "."){
        return false;
    }
    if(operators.includes(value)){
        if(operators.includes(last_input)){
            return false;
        }else{
            return true;
        }
    }
    return true;
}
function preparation_Input(input){
    let input_array = input.split("");

    for (let i = 0; i < input_array.length; i++){
        if(input_array[i] == "%"){
            input_array[i] = "/100";
        }
    }
    return input_array.join("");
}

function addHistory(ecuation){
    const li = document.createElement('li');
    li.textContent = ecuation;
    history_list.appendChild(li);
} 