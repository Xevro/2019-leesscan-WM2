const Sequelize = require('sequelize');
const sequelize = require('../db/db_config');

//DB table layout
const feedback = sequelize.define('cijfers', {
    idgebruiker: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    titelvraag: {
        type: Sequelize.NUMBER
    },
    totaalscore: {
        type: Sequelize.DOUBLE
    },
    vragenlijst: {
        type: Sequelize.NUMBER
    },
    Niveau: {
        type: Sequelize.ENUM('SCHOOL','KLAS')
    }
}, {timestamps: false});

module.exports = feedback;