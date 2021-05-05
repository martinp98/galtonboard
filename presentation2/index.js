var number = document.getElementById("numberOfBalls");
var output = document.getElementById("demo");
output.innerHTML = number.value;

slider.oninput = function() {
    output.innerHTML = this.value;
}