document.getElementById('qstKlas').onclick = function () {
    qstKlasKeuze.style.display = this.checked ? 'block' : 'none';
    document.getElementById('qstAantal5').disabled = true;
};
document.getElementById('qstSchool').onclick = function () {
    qstKlasKeuze.style.display = 'none';
    document.getElementById('qstAantal5').disabled = false;
};
$(document).ready(function () {
    $('.Niveau').click(function () {
        $('.Niveau').not(this).prop('checked', false);
    });
    $('.Schoolkeuze').click(function () {
        $('.Schoolkeuze').not(this).prop('checked', false);
    });
    $('.AantalInvullen').click(function () {
        $('.AantalInvullen').not(this).prop('checked', false);
    });
});

;(function () {
    window.addEventListener('load', function () {
        document.getElementById('InfoForm').setAttribute('novalidate', 'novalidate');
        document.getElementById('InfoForm').addEventListener('submit', function (e) {

            e.preventDefault();
            e.stopPropagation();

            let isValid = true;

            let errVoornaam = document.getElementById('errVoornaam');
            let errAchternaam = document.getElementById('errAchternaam');
            let errSchool = document.getElementById('errSchool');
            let errNiveau = document.getElementById('errNiveau');
            let errSchoolNaam = document.getElementById('errSchoolNaam');
            let errStraat = document.getElementById('errStraat');
            let errPostcode = document.getElementById('errPostcode');
            let errGemeente = document.getElementById('errGemeente');
            let errAantalInvullen = document.getElementById('errAantalInvullen');

            let qstVoornaam = document.getElementById('Voornaam');
            let qstAchternaam = document.getElementById('Achternaam');
            let checkboxesSchool = document.querySelectorAll('input[name="Schoolkeuze"]'), checkAantal = 0;
            let checkboxesNiveau = document.querySelectorAll('input[name="Niveau"]'), checkAantalNiveau = 0;
            let checkboxesAantalInvullen = document.querySelectorAll('input[name="AantalInvullen"]'),
                checkAantalInvullen = 0;
            let qstSchoolNaam = document.getElementById('SchoolNaam');
            let selectionKlas = document.getElementById('qstKlasKeuze');
            let qstStraat = document.getElementById('StraatNummer');
            let qstPostcode = document.getElementById('Postcode');
            let qstGemeente = document.getElementById('Gemeente');

            let errMessages = document.querySelectorAll('.message--error');
            for (let i = 0; i < errMessages.length; i++) {
                errMessages[i].style.display = 'none';
            }

            // check Voornaam
            if (qstVoornaam.value === '') {
                isValid = false;
                errVoornaam.innerHTML = 'Gelieve een voornaam in te vullen';
                errVoornaam.style.display = 'block';
                qstVoornaam.classList.add('invalid');
            } else {
                qstVoornaam.classList.add('valid');
            }
            // check Achternaam
            if (qstAchternaam.value === '') {
                isValid = false;
                errAchternaam.innerHTML = 'Gelieve een achternaam in te vullen';
                errAchternaam.style.display = 'block';
                qstAchternaam.classList.add('invalid');
            } else {
                qstAchternaam.classList.add('valid');
            }
            //check checkboxes Schoolniveau
            for (let i = 0; i < 4; i++) {
                checkboxesSchool[i].classList.remove('invalid');
                if (checkboxesSchool[i].checked) {
                    checkAantal++;
                }
            }
            if (checkAantal < 1) {
                isValid = false;
                errSchool.style.display = 'block';
                errSchool.innerHTML = 'Gelieve één opties aan te duiden';
            } else {
                for (let k = 0; k < 4; k++) {
                    checkboxesSchool[k].classList.add('valid');
                }
            }
            //check checkboxes Niveau
            for (let i = 0; i < 2; i++) {
                checkboxesNiveau[i].classList.remove('invalid');
                if (checkboxesNiveau[i].checked) {
                    checkAantalNiveau++;
                }
            }
            if (checkAantalNiveau < 1) {
                isValid = false;
                errNiveau.style.display = 'block';
                errNiveau.innerHTML = 'Gelieve één opties aan te duiden';
            } else for (let k = 0; k < 2; k++) {
                if (checkboxesNiveau[1].checked && selectionKlas.selectedIndex === 0) {
                    isValid = false;
                    errNiveau.style.display = 'block';
                    errNiveau.innerHTML = 'Gelieve één klas te selecteren';
                }
                checkboxesNiveau[k].classList.add('valid');
            }
            //check checkboxes Aantal in te vullen velden
            for (let i = 0; i < 5; i++) {
                checkboxesAantalInvullen[i].classList.remove('invalid');
                if (checkboxesAantalInvullen[i].checked) {
                    checkAantalInvullen++;
                }
            }
            if (checkAantalInvullen < 1) {
                isValid = false;
                errAantalInvullen.style.display = 'block';
                errAantalInvullen.innerHTML = 'Gelieve één opties aan te duiden';
            } else {
                for (let k = 0; k < 5; k++) {
                    checkboxesAantalInvullen[k].classList.add('valid');
                }
            }
            // check Schoolnaam
            if (qstSchoolNaam.value === '') {
                isValid = false;
                errSchoolNaam.innerHTML = 'Gelieve een schoolnaam in te vullen';
                errSchoolNaam.style.display = 'block';
                qstSchoolNaam.classList.add('invalid');
            } else {
                qstSchoolNaam.classList.add('valid');
            }
            // check Straat en nummer
            if (qstStraat.value === '') {
                isValid = false;
                errStraat.innerHTML = 'Gelieve een straat en nummer in te vullen';
                errStraat.style.display = 'block';
                qstStraat.classList.add('invalid');
            } else {
                qstStraat.classList.add('valid');
            }
            // check Postcode
            if (/[0-9]/.test(qstPostcode.value) === false) {
                isValid = false;
                errPostcode.innerHTML = 'Gelieve een postcode in te vullen';
                errPostcode.style.display = 'block';
                qstPostcode.classList.add('invalid');
            } else {
                qstPostcode.classList.add('valid');
            }
            // check Gemeente
            if (qstGemeente.value === '') {
                isValid = false;
                errGemeente.innerHTML = 'Gelieve een gemeente in te vullen';
                errGemeente.style.display = 'block';
                qstGemeente.classList.add('invalid');
            } else {
                qstGemeente.classList.add('valid');
            }

            if (isValid) {
                sessionStorage.clear();

                let inputElementen = document.getElementsByClassName('AantalInvullen');
                for (let i = 0; inputElementen[i]; ++i) if (inputElementen[i].checked) {
                    sessionStorage.setItem('aantalLijsten', inputElementen[i].value);
                    sessionStorage.setItem('FirstQuestion', true);
                    break;
                }

                let inputElementenNiveau = document.getElementsByClassName('Niveau');
                for (let j = 0; inputElementenNiveau[j]; ++j) if (inputElementenNiveau[j].checked) {
                    if (inputElementenNiveau[j].value === 'klas') {
                        sessionStorage.setItem('Niveau','Klas');
                    } else {
                        sessionStorage.setItem('Niveau', 'School');
                    }
                    break;
                }

                const hashID = function (str) {
                    let h1 = 0x41c6ce57 ^ 2;
                    for (let i = 0, ch; i < str.length; i++) {
                        ch = str.charCodeAt(i);
                        h1 = Math.imul(h1 ^ ch, 2659);
                    }
                    h1 = Math.imul(h1 ^ h1 >>> 16, 2847) ^ Math.imul(h1 ^ 2 >>> 4, 3169);
                    return 4296 * (3071 & h1);
                };

                sessionStorage.setItem('idGebruiker', hashID(qstVoornaam.value + qstAchternaam.value));

                let dataGebruiker = {
                    'idgebruiker': Number(sessionStorage.getItem('idGebruiker')),
                    'Voornaam': qstVoornaam.value,
                    'Achternaam': qstAchternaam.value,
                    'SchoolNaam': qstSchoolNaam.value,
                    'StraatEnNummer': qstStraat.value,
                    'Postcode': Number(qstPostcode.value),
                    'Gemeente': qstGemeente.value,
                    'Status': document.querySelector('input[name="Schoolkeuze"]:checked').value,
                    'Klas': document.getElementById('qstKlasKeuze').value,
                }
                fetch('http://localhost:3000/gebruikers-add/', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(dataGebruiker)
                }).then((val) => window.open('http://localhost:3000/vragenlijst', '_self'));
            }
        });
    })
})();