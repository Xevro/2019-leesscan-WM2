const Sequelize = require('sequelize');
const sequelize = require('../db/db_config');

//DB table layout
const contact = sequelize.define('contactgegevens', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    naam: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    bericht: {
        type: Sequelize.STRING
    },
    datum: {
        type: Sequelize.DATE
    },
}, {timestamps: false});

module.exports = contact;