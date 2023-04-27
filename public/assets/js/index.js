console.log('Hello');

fetch('http://localhost:3000/weather?address=Boston')
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            console.log(data.forecast);
            console.log(data.location);
        }
    });

const weatherForm = document.querySelector('form');

const input = document.querySelector('input');

weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    fetch(`/weather?address=${input.value}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data.forecast);
                console.log(data.location);
            }
        });
});
