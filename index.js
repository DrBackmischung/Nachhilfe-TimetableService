const express = require("express");
const sequelize = require('./database');
const Timeslot = require('./Timeslot');


sequelize.sync({ force: true }).then(async () => {
  for(let i = 1; i <= 15; i++){
    const timeslot = {
      datum: `01.01.2020`,
      wochentag: `Montag`,
      ort: `Raum 04b`,
      fach: `Mathe`,
      uhrzeit: `11:45 Uhr`,
      dauer: `45 min`,
      preis: `35€`,
      bezahlungErfolgt: `nein`,
      schuelerId: `marokkanischer ROnaldo`,
      lehrerId: `Messi`
    }
    await Timeslot.create(timeslot);
  }
});

const app = express();

app.use(express.json());

const thisWillRunInEveryRequest = (req, res, next) => {
  console.log('running the middleware for', req.method, req.originalUrl);
  next();
}

app.use(thisWillRunInEveryRequest);


app.get('/timeslots', async(req, res) => {
  const timeslots = await Timeslot.findAll();
  res.send(timeslots);
})

/*app.get('timeslots', (req, res) => {
  let fach = req.query.id
  if(timeslots [fach]){
    res.send(timeslots)
  }else{
    res.send('not found')
  }
})
*/

app.post('/timeslots', async (req, res) => {
  await Timeslot.create(req.body);
  res.send("success");
})


function InvalidIdException(){
  this.status = 400;
  this.message = 'Invalid ID';
}

function TimeslotNotFoundException(){
  this.status = 404;
  this.message = 'Timeslot not found';
}

const idNumberControl = (req, res, next) => {
  const id = Number.parseInt(req.params.id);
  if (Number.isNaN(id)) {
    throw new InvalidIdException();
  }
  next();
}

app.get('/timeslots/:id', idNumberControl, async (req, res, next) => {
  const id = req.params.id;
  const timeslot = await Timeslot.findOne({where: {id: id}});
  if(!timeslot) {
    next(new TimeslotNotFoundException());
  }
  res.send(timeslot);
})

app.put('/timeslots/:id', async (req, res) => {
  const requestedId = req.params.id;
  const timeslot = await Timeslot.findOne({where: {id: requestedId}});
  timeslot.id= req.body.id;
  timeslot.datum = req.body.datum;
  timeslot.wochentag = req.body.wochentag;
  timeslot.ort= req.body.ort;
  timeslot.fach = req.body.fach;
  timeslot.uhrzeit = req.body.uhrzeit;
  timeslot.dauer = req.body.dauer;
  timeslot.preis = req.body.preis;
  timeslot.bezahlungErfolgt = req.body.bezahlungErfolgt;
  timeslot.schuelerId= req.body.schuelerId;
  timeslot.lehrerId = req.body.lehrerId
  await timeslot.save();
  res.send('updated');
})

app.delete('/timeslots/:id', idNumberControl, async (req, res) => {
  const id = req.params.id;
  await Timeslot.destroy({where: {id: id}});
  res.send('removed');
})

app.use((err, req, res, next) => {
  res
    .status(err.status)
    .send(
      {
        message: err.message,
        timestamp: Date.now(),
        path: req.originalUrl
      });
})

app.listen(3000, () => {
  console.log("app is running");
});