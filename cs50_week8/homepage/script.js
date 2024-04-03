
document.addEventListener('DOMContentLoaded', function() {
    let red = document.querySelector('#red');
    let blue = document.querySelector('#blue');
    let green = document.querySelector('#green');
    red.addEventListener('input', function() {
        document.querySelector('.body_background').style.backgroundColor = `rgb(${red.value}, ${green.value}, ${blue.value})`;
        document.querySelector('.body_background').style.color = `rgb(${255 - red.value}, ${255 - green.value}, ${255 - blue.value})`;
    });
    blue.addEventListener('input', function() {
        document.querySelector('.body_background').style.backgroundColor = `rgb(${red.value}, ${green.value}, ${blue.value})`;
        document.querySelector('.body_background').style.color = `rgb(${255 - red.value}, ${255 - green.value}, ${255 - blue.value})`;
    });
    green.addEventListener('input', function() {
        document.querySelector('.body_background').style.backgroundColor = `rgb(${red.value}, ${green.value}, ${blue.value})`;
        document.querySelector('.body_background').style.color = `rgb(${255 - red.value}, ${255 - green.value}, ${255 - blue.value})`;
    });

});
