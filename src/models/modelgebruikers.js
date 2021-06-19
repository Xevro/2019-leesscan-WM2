const Sequelize = require('sequelize');
const sequelize = require('../db/db_config');

//DB table layout
const users = sequelize.define('gebruikers', {
    idgebruiker: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    Voornaam: {
        type: Sequelize.STRING
    },
    Achternaam: {
        type: Sequelize.STRING
    },
    SchoolNaam: {
        type: Sequelize.STRING
    },
    StraatEnNummer: {
        type: Sequelize.STRING
    },
    Postcode: {
        type: Sequelize.NUMBER
    },
    Gemeente: {
        type: Sequelize.STRING
    },
    Status: {
        type: Sequelize.ENUM('LEERKRACHT','ZORGLEERKRACHT','VAKLEERKRACHT','DIRECTIE'),
        allowNull: true,
    },
    Klas: {
        type: Sequelize.ENUM('1KL','2KL','3KL','1LJ','2LJ','3LJ','4LJ','5LJ','6LJ'),
        allowNull: true,
    }
}, {timestamps: false});

module.exports = users;