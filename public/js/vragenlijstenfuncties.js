let Airtable = require('airtable');
let base = new Airtable({apiKey: 'keyuetdWfJNfnETjx'}).base('appm7NLJ5kxLKv76C');
let htmlcode = '';
let SubListNr = 1, nummer = 0, countID = 0, vraagNr = 0;
let lijstNummer = 1, lengteTabel = 0;
let aantal = 0;
let Niveau = sessionStorage.getItem('Niveau');
let aantalLijsten = sessionStorage.getItem('aantalLijsten');
let isValid = false;
let aantalVragen = 0;
let teller = 0;

VragenlijstenHandler();

function checkBoxControl(className) {
    let KlasseNaam = '.' + className;
    $(document).ready(function () {
        $(KlasseNaam).click(function () {
            $(KlasseNaam).not(this).prop('checked', false);
        });
    });
}

function getLengthTitels(tableName) {
    base(tableName).select({view: 'Grid view'}).eachPage(function page(records, fetchNextPage) {
        records.forEach(function (record) {
            if (record !== '') {
                lengteTabel++;
            }
        });
        sessionStorage.removeItem('TitelLengte');
        sessionStorage.setItem('TitelLengte', lengteTabel);
        fetchNextPage();
    }, function done(err) {
        if (err) {
            console.error(err);
        }
    });
}

function incrementValue() {
    controleCheckboxes();
    if (isValid) {
        if (SubListNr === lengteTabel) {
            if (Number(aantalLijsten) !== lijstNummer) {
                lijstNummer++;
                SubListNr = 0;
                VragenlijstenHandler();
                sessionStorage.removeItem('eerste');
            } else {
                if (Number(aantalLijsten) === lijstNummer) {
                    window.open('http://localhost:3000/resultaten/' + sessionStorage.getItem('idGebruiker'), '_self');
                }
            }
        }
        if (SubListNr < lengteTabel) {
            SubListNr++;
            htmlcode = '';
            document.getElementById('Titel', 'vraag').innerHTML = '';
            VragenlijstenHandler();
            countID = 0;
            document.getElementById('keuze').innerHTML = htmlcode;
            sendDataToDB();
        }
    }
}

function VragenlijstenHandler() {
    if (Number(aantalLijsten) === lijstNummer && SubListNr === lengteTabel) {
        document.getElementById('volgende').value = 'Toon resultaat';
    }

    const toegang = sessionStorage.getItem('FirstQuestion');
    if (toegang) {
        getLengthTitels('Begrijpend Lezen');
        sessionStorage.removeItem('FirstQuestion');
        sessionStorage.setItem('eerste', 'StartEersteLijst');
    }
    if (Number(aantalLijsten) === lijstNummer - 1) {
        window.open('http://localhost:3000/resultaten/' + sessionStorage.getItem('idGebruiker'), '_self');
    }

    if (Number(aantalLijsten) !== 1) {
        if (Niveau === 'School') {
            if (sessionStorage.getItem('eerste') === 'StartEersteLijst') {
                getQuestions('Begrijpend Lezen', 'Vragenlijst Begrijpend');
            } else if (lijstNummer === 2 && Number(aantalLijsten) >= 2) {
                lengteTabel = 0;
                getLengthTitels('Leesbeleidplan');
                getQuestions('Leesbeleidplan', 'Vragenlijst Leesbeleidplan');
            } else if (lijstNummer === 3 && Number(aantalLijsten) >= 3) {
                lengteTabel = 0;
                getLengthTitels('Leesomgeving Schoolniveau');
                getQuestions('Leesomgeving Schoolniveau', 'Vragenlijst Leesomgeving Schoolniveau');
            } else if (lijstNummer === 4 && Number(aantalLijsten) >= 4) {
                lengteTabel = 0;
                getLengthTitels('Leesmonitoring Schoolniveau');
                getQuestions('Leesmonitoring Schoolniveau', 'Vragenlijst Leesmonitoring Schoolniveau');
            } else if (lijstNummer === 5 && Number(aantalLijsten) >= 5) {
                lengteTabel = 0;
                getLengthTitels('Leesnetwerk Schoolniveau');
                getQuestions('Leesnetwerk Schoolniveau', 'Vragenlijst Leesnetwerk Schoolniveau');
            }
        } else { // klas
            if (sessionStorage.getItem('eerste') === 'StartEersteLijst') {
                getQuestions('Begrijpend Lezen', 'Vragenlijst Begrijpend');
            } else if (lijstNummer === 2 && Number(aantalLijsten) >= 2) {
                lengteTabel = 0;
                getLengthTitels('Leesbeleidplan');
                getQuestions('Leesbeleidplan', 'Vragenlijst Leesbeleidplan');
            } else if (lijstNummer === 3 && Number(aantalLijsten) >= 3) {
                lengteTabel = 0;
                getLengthTitels('Leesomgeving Klasniveau');
                getQuestions('Leesomgeving Klasniveau', 'Vragenlijst Leesomgeving Klasniveau');
            } else if (lijstNummer === 4 && Number(aantalLijsten) >= 4) {
                lengteTabel = 0;
                getLengthTitels('Leesmonitoring Klasniveau');
                getQuestions('Leesmonitoring Klasniveau', 'Vragenlijst Leesmonitoring Klasniveau');
            }
        }
    } else { // 1 lijst gekozen
        getQuestions('Begrijpend Lezen', 'Vragenlijst Begrijpend');
    }
}

function getQuestions(tableName, questionList) {
    base(tableName).select({view: 'Grid view'}).eachPage(function page(records, fetchNextPage) {
        records.forEach(function (record) {
            if (record.get('IDTitel') === SubListNr) {
                document.getElementById('Titel').innerHTML = '<div class="lijstNaam">' + tableName + '</div>' + record.get('IDTitel') + ' ' + record.get('Titel');
                base(questionList).select({view: 'Grid view'}).eachPage(function page(records, fetchNextPage) {
                    vraagNr = Number(record.get('IDTitel'));
                    aantal = 0;
                    records.forEach(function (recordVragen) {
                        aantal++;
                        if (Number(recordVragen.get('TitelNR')) === Number(record.get('IDTitel'))) {
                            htmlcode += '<div class="Vraag"><p>' + aantal + '. ' + recordVragen.get('Vraag') + '</p></div><form class="checkboxForm">';
                            voegCheckBoxesToe();
                            aantalVragen++;
                        }
                    });
                    fetchNextPage();
                }, function done(err) {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        });
        fetchNextPage();
    }, function done(err) {
        if (err) {
            console.error(err);
        }
    });
}

function voegCheckBoxesToe() {
    nummer++;
    for (let k = 0; k < 6; k++) {
        countID++;
        htmlcode += '<input type="checkbox" id="' + countID + '" class="' + 'cb_' + nummer + '" value="' + k + '"' +
            'onclick="checkBoxControl(this.className); saveToStorage(' + vraagNr + ',' + nummer + ',' + k + ')"><label class="checkbox" for="' + countID + '"> ' + k + '</label>';
    }
    htmlcode += '</form></div>';
    document.getElementById('keuze').innerHTML = htmlcode;
}

function saveToStorage(vraagNr, keuze, checkboxNr) {
    //Local storage format: [4,1]; 4 = checkboxnummer Index 1; komma "," index 2; vraagNr index 3
    let keuzes = [checkboxNr, vraagNr];
    localStorage.setItem(keuze, JSON.stringify(keuzes));
}

function controleCheckboxes() {
    let errVragen = document.getElementById('errVragen');
    for (let j = 0; j < aantalVragen + 1; j++) {
        for (let i = 0; i <= nummer; i++) {
            errVragen.style.display = 'block';
            if (document.querySelector('.cb_' + j + ':checked')) {
                teller++;
                if (teller === 1) {
                    errVragen.innerHTML = 'Gelieve bij alle vragen een keuze aan te duiden! U hebt al 1 vraag ingevuld.';
                } else {
                    errVragen.innerHTML = 'Gelieve bij alle vragen een keuze aan te duiden! U hebt al ' + teller + ' vragen ingevuld.';
                }
                break;
            }
        }
    }
    if (teller === 0) {
        errVragen.innerHTML = 'Gelieve bij alle vragen een keuze aan te duiden!';
    }
    if (teller === aantalVragen) {
        isValid = true;
        nummer = 0;
        errVragen.style.display = 'none';
    }
    teller = 0;
}

function sendDataToDB() {
    if (isValid) {
        isValid = false;
        teller = 0;
        aantalVragen = 0;
        let totaal = 0, totaalChecked = 0;
        let gemiddelde = 0, TitelVraag = 0;
        for (let i = 0; i < localStorage.length; i++) {
            if (!Number(localStorage.getItem(localStorage.key(i))[1]) == 0) {
                totaal++;
                totaalChecked += Number(localStorage.getItem(localStorage.key(i))[1]);
            }
        }
        for (let j = 0; j < localStorage.length; j++) {
            gemiddelde = (totaalChecked / totaal);
            [, , , TitelVraag] = localStorage.getItem(localStorage.key(j));
        }
        let data = {
            'idgebruiker': sessionStorage.getItem('idGebruiker'),
            'titelvraag': TitelVraag,
            'totaalscore': gemiddelde,
            'vragenlijst': lijstNummer,
            'Niveau': Niveau,
        }
        fetch('http://localhost:3000/leesscan-add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json());
        localStorage.clear();
    }
}