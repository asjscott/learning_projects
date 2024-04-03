
document.addEventListener('DOMContentLoaded', function() {
    let submit = document.querySelector('#add');
    let items = document.querySelector('#items');
    let item = document.querySelector('#item')
    submit.addEventListener('click', function() {
        if (item.value.length == 0) {
            return;
        }
        else {
            listItem = `<li>${item.value}</li>`;
            items.insertAdjacentHTML('beforeend', listItem);
            item.value = '';
        }
    })
});
