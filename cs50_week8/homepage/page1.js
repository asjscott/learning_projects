
document.addEventListener('DOMContentLoaded', function() {
    let blinking = false;
    let blinks_btn = document.querySelector('#onoff');
    let speed = document.querySelector('#speed');
    let blinks = document.querySelector('#blinks');
    let eye = document.querySelector('#open');
    let interval = 60;
    let blinkingInterval;
    function blink() {
        eye.style.visibility = 'hidden';
        setTimeout(function() {
            eye.style.visibility = 'visible';
        }, 200)
    };
    blinks_btn.addEventListener('click', function() {
        if (blinking == false) {
            blinking = true;
            blinks_btn.innerHTML = 'Blinking Of';
            blinkingInterval = window.setInterval(blink, (60000/ interval));
        }
        else {
            blinking = false;
            blinks_btn.innerHTML = 'Blinking On';
            clearInterval(blinkingInterval);
        }
    })
    speed.addEventListener('change', function() {
        interval = speed.value;
        if (blinking == true) {
            clearInterval(blinkingInterval);
            blinkingInterval = window.setInterval(blink, (60000/ interval));
        }
    })
    blinks.addEventListener('change', function() {
        interval = blinks.value;
        if (blinking == true) {
            clearInterval(blinkingInterval);
            blinkingInterval = window.setInterval(blink, (60000/ interval));
        }
    })
});
