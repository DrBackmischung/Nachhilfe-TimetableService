const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class Timeslot extends Model {};

Timeslot.init({
	datum: {
		type: DataTypes.STRING
	  },
	wochentag: {
	  type: DataTypes.STRING
	},
	raum: {
		type: DataTypes.STRING
	  },
	fach: {
		type: DataTypes.STRING
	},
	uhrzeit: {
		type: DataTypes.STRING
	},
	dauer: {
		type: DataTypes.STRING
	},
	preis: {
		type: DataTypes.STRING
	},
	bezahlungErfolgt: {
		type: DataTypes.STRING
	}
}, {
  sequelize,
  modelName: 'timeslot',
  timestamps: false
})

module.exports = Timeslot;