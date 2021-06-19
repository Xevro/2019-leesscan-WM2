const express = require('express');
const path = require('path');
const hbs = require('hbs');
const userRouter = require('../routers/expressroutes');
const Leesscan = require('./models/modelfeedback');
const Gebruikers = require('./models/modelgebruikers');
const Contact = require('./models/modelcontact');
const app = express();
const port = 3000;
const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../views');
const partialsDirectory = path.join(__dirname, '../views/partials');

app.set('view engine', 'hbs');
app.set('views', viewsDirectory);
hbs.registerPartials(partialsDirectory);
app.use(userRouter);
app.use(express.static(publicDirectory));
app.use(express.json());

//get request - index pagina laden
app.get('', (req, res) => {
    res.render('index', {name: 'Louis D\'Hont', title: 'Leesscan applicatie', value: 'active', value2: 'none'});
});

//get request - vragenlijst pagina laden
app.get('/vragenlijst', (req, res) => {
    res.render('vragenlijst', {name: 'Louis D\'Hont', title: 'Vragenlijst van de leesscan', value: 'hide', value2: 'none'});
});

//get request - contact pagina laden
app.get('/contact', (req, res) => {
    res.render('contact', {name: 'Louis D\'Hont', title: 'Contacteer ons', value: 'none', value2: 'active'});
});

//post request - Toevoegen contact formulier
app.post('/contact-add', async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        return res.status(201).send(contact);
    } catch (error) {
        return res.status(400).send(error);
    }
});

//get request - opvragen alle items
app.get('/leesscan', async (req, res) => {
    try {
        const leesscan = await Leesscan.findAll();
        return res.send(leesscan);
    } catch (error) {
        return res.status(500).send(error);
    }
});

//get request - opvragen item met id
app.get('/leesscan/:id', async (req, res) => {
    try {
        const leesscan = await Leesscan.findAll({
            where: {
                idgebruiker: req.params.id
            }
        });
        return !leesscan ? res.status(404).render('404') : res.json(leesscan);
    } catch (error) {
        return res.status(500).send(error);
    }
});

//get request - ophalen resultaten met id
app.get('/resultaten/:id', async (req, res) => {
    try {
        const leesscan = await Leesscan.findOne({
            where: {
                idgebruiker: req.params.id
            }
        });
        return !leesscan ? res.status(404).render('404') :
            res.render('resultaten', {name: 'Louis D\'Hont', title: 'Bedankt voor uw deelname!', value: 'none', value2: 'active'});
    } catch (error) {
        return res.status(500).send(error);
    }
});

//post request - Toevoegen item
app.post('/leesscan-add', async (req, res) => {
    try {
        const feedback = await Leesscan.create(req.body);
        return res.status(201).send(feedback);
    } catch (error) {
        return res.status(400).send(error);
    }
});

//get request - gebruiker opvragen met id
app.get('/gebruikers/:id', async (req, res) => {
    try {
        const gebruiker = await Gebruikers.findOne({
            where: {
                idgebruiker: req.params.id
            }
        });
        return res.json(gebruiker);
    } catch (error) {
        return res.status(500).send(error);
    }
});

//post request - Toevoegen van gebruiker
app.post('/gebruikers-add', async (req, res) => {
    try {
        const gebruiker = await Gebruikers.create(req.body);
        return res.status(201).send(gebruiker);
    } catch (error) {
        return res.status(400).send(error);
    }
});

//Pagina niet gevonden - 404 pagina
app.get('*', (req, res) => {
    res.render('404', {
        name: 'Louis D\'Hont',
        title: 'Error'
    });
});

app.listen(port, () => console.log(`API app listening at port:${port}`));