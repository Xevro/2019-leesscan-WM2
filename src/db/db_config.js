const Sequelize = require('sequelize');

const sequelize = new Sequelize('leesscan', 'root', 'Azerty123', {
    host: 'localhost', dialect: 'mysql'
});

module.exports = sequelize;