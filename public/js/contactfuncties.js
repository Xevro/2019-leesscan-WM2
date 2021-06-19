;(function () {
    window.addEventListener('load', function () {
        document.getElementById('contactform').setAttribute('novalidate', 'novalidate');
        document.getElementById('contactform').addEventListener('submit', function (e) {

            e.preventDefault();
            e.stopPropagation();

            let isValid = true;

            let errNaam = document.getElementById('errNaam');
            let errEmail = document.getElementById('errEmail');

            let qstNaam = document.getElementById('contactNaam');
            let qstEmail = document.getElementById('contactEmail');
            let qstBericht = document.getElementById('bericht');

            let errMessages = document.querySelectorAll('.message--error');
            for (let i = 0; i < errMessages.length; i++) {
                errMessages[i].style.display = 'none';
            }

            // check naam
            if (qstNaam.value === '') {
                isValid = false;
                errNaam.innerHTML = 'Gelieve een naam in te vullen';
                errNaam.style.display = 'block';
                qstNaam.classList.add('invalid');
            } else {
                qstNaam.classList.add('valid');
            }
            // check email adres
            if(/[a-z]+[@]/i.test(qstEmail.value) === false) {
                isValid = false;
                errEmail.innerHTML = 'Gelieve een email in te vullen';
                errEmail.style.display = 'block';
                qstEmail.classList.add('invalid');
            } else {
                qstEmail.classList.add('valid');
            }

            if (isValid) {
                let today = new Date();
                let datum = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                let data = {
                    'id': '',
                    'naam': qstNaam.value,
                    'email': qstEmail.value,
                    'bericht': qstBericht.value,
                    'datum': datum
                }
                fetch('http://localhost:3000/contact-add/', {
                    method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)
                }).then((val) => document.getElementById('resultMessage').innerText = "Succesvol verzonden", qstNaam.value = "",qstBericht.value = "", qstEmail.value = "");
            }
        });
    })
})();