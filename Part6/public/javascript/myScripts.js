const increase = document.getElementById('inc-btn');
const decrease = document.getElementById("dec-btn");
const counter = document.getElementById('counter');

let count = 0

increase.addEventListener("click", () => {
    count++
    counter.innerText = `Counter: ${count}`;
})

decrease.addEventListener("click", () => {
    if(count > 0){
        count--
        counter.innerText = `Counter: ${count}`;
    } else{
        alert("Can't go below 0 or -ve")
    }
})