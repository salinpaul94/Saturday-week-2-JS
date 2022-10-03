var secs = 12;
var flag = false;

function countdown() { // this will call the function only once
    if(flag == false) {
        Decrement()
        flag=true;
    }
}

function Decrement() {
    seconds = document.getElementById("sec"); // refer <input id="sec"...>
    seconds.value = secs; // update seconds in <input id="sec" ...>

    if (secs < 10) { // check second value
        seconds.style.color = "red";
        seconds.style.fontSize = "60px";
        document.getElementById("msg").innerHTML = "HURRY UP!!";
    }

    if (secs < 0) { // when time is over
        alert('Timeout');
        document.getElementById("timeBox").innerHTML = "<b>Time's up.</b>";
    } else {
        secs--;
        setTimeout('Decrement()', 1000); // recursive function called every 1s
    }
}