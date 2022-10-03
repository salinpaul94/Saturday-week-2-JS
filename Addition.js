function take_input() {
    // get values from html tags using id
    var ops1 = document.getElementById('op1').value;
    var ops2 = document.getElementById('op2').value;
    var operators = document.getElementById('operator').value; // get value from options

    ops1 = Number.parseInt(ops1); // convert values to integer
    ops2 = Number.parseInt(ops2);
    var res;
    switch (operators) {
        case '+' :
            res = ops1 + ops2;
            break;
        case '-' :
            res = ops1 - ops2;
            break;
        case '*' :
            res = ops1 * ops2;
            break;
        case '/' :
            res = ops1 / ops2;
            break;
    }
    // print the result in <p> tag with id result1
    document.getElementById("result1").innerHTML = res;
}

function eval_input() {
    try {
        // expression is evaluated in eval(document.getElementById('exp').value)
        // the result is stored in expression variable
        var expression = eval(document.getElementById('exp').value);

        // check if the result is valid or not
        if(expression == "Infinity" || expression == "Undefined"){
            throw new Error('Incorrect input!')
        } else {
            // print the result in <p> tag with id result2
            document.getElementById('result2').innerHTML = expression;
        } 
    } catch(err) {
        document.getElementById('result2').innerHTML = err;
        alert(err.message) // print the error message
    }
}