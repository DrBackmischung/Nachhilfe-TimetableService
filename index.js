const express = require("express");
const sequelize = require('./database');
const Timeslot = require('./Timeslot');


sequelize.sync({ force: true }).then(async () => {
  let timeslot = {
    datum: `02.10.2000`,
    wochentag: `Montag`,
    ort: `Parkring 21 68159 Mannheim`,
    fach: `Mathe5`,
    uhrzeit: `11:45`,
    dauer: `0.75`,
    preis: `35`,
    bezahlungErfolgt: ``,
    schuelerId: `Test: Marokkanischer Ronaldo`,
    lehrerId: `138fb6e9-1cc5-4195-af9c-fa96b5a53dc9`,
    distanz: ''
  }
  await Timeslot.create(timeslot);
  timeslot = {
    datum: `11.01.2023`,
    wochentag: `Dienstag`,
    ort: `Dietmar-Hopp-Allee 16 69190 Walldorf`,
    fach: `latein5`,
    uhrzeit: `11:45`,
    dauer: `0.75`,
    preis: `35`,
    bezahlungErfolgt: ``,
    schuelerId: ``,
    lehrerId: `000001`,
    distanz: ''
  }
  await Timeslot.create(timeslot);
  timeslot = {
    datum: `12.01.2023`,
    wochentag: `Dienstag`,
    ort: `Dietmar-Hopp-Allee 16 69190 Walldorf`,
    fach: `latein5`,
    uhrzeit: `11:45`,
    dauer: `0.75`,
    preis: `35`,
    bezahlungErfolgt: ``,
    schuelerId: ``,
    lehrerId: `000001`,
    distanz: ''
  }
  await Timeslot.create(timeslot);
  timeslot = {
    datum: `13.01.2023`,
    wochentag: `Dienstag`,
    ort: `Bahnhof Ober-Roden`,
    fach: `matheII`,
    uhrzeit: `14:45`,
    dauer: `2`,
    preis: `50`,
    bezahlungErfolgt: ``,
    schuelerId: ``,
    lehrerId: `138fb6e9-1cc5-4195-af9c-fa96b5a53dc9`,
    distanz: ''
  }
  await Timeslot.create(timeslot);
  timeslot = {
    datum: `11.01.2023`,
    wochentag: `Dienstag`,
    ort: `Dietmar-Hopp-Allee 16 69190 Walldorf`,
    fach: `matheI`,
    uhrzeit: `13:00`,
    dauer: `1`,
    preis: `35`,
    bezahlungErfolgt: ``,
    schuelerId: ``,
    lehrerId: `138fb6e9-1cc5-4195-af9c-fa96b5a53dc9`,
    distanz: ''
  }
  await Timeslot.create(timeslot);
  timeslot = {
    datum: `11.01.2023`,
    wochentag: `Dienstag`,
    ort: `Dietmar-Hopp-Allee 16 69190 Walldorf`,
    fach: `matheII`,
    uhrzeit: `14:00`,
    dauer: `1`,
    preis: `35`,
    bezahlungErfolgt: ``,
    schuelerId: ``,
    lehrerId: `138fb6e9-1cc5-4195-af9c-fa96b5a53dc9`,
    distanz: ''
  }
  await Timeslot.create(timeslot);
  timeslot = {
    datum: `11.01.2023`,
    wochentag: `Dienstag`,
    ort: `Bahnhof Ober-Roden`,
    fach: `matheI`,
    uhrzeit: `15:00`,
    dauer: `1`,
    preis: `35`,
    bezahlungErfolgt: ``,
    schuelerId: ``,
    lehrerId: `138fb6e9-1cc5-4195-af9c-fa96b5a53dc9`,
    distanz: ''
  }
  await Timeslot.create(timeslot);
});

const app = express();

app.use(express.json());

const idNumberControl = (req, res, next) => {
  if(req.params.id != null ){
  const id = Number.parseInt(req.params.id);
  if (Number.isNaN(id)) {
    throw new InvalidIdException();
  }}
  next();
}


app.get('/timeslots', async(req, res) => {
  const timeslots = await Timeslot.findAll();
  res.send(timeslots);
})

app.get('/timeslots/:id', idNumberControl, async (req, res, next) => {
  const id = req.params.id;
  const timeslot = await Timeslot.findOne({where: {id: id}});
  if(!timeslot) {
    next(new TimeslotNotFoundException());
  }
  res.send(timeslot);
})

app.get('/timeslots/schueler/:schuelerId', idNumberControl, async (req, res, next) => {
  const schuelerId = req.params.schuelerId;
  const timeslot = await Timeslot.findAll({where: {schuelerId: schuelerId}});
  if(!timeslot) {
    next(new TimeslotNotFoundException());
  }
  res.send(timeslot);
})

app.get('/timeslots/lehrer/:lehrerId', idNumberControl, async (req, res, next) => {
  const lehrerId = req.params.lehrerId;
  const timeslot = await Timeslot.findAll({where: {lehrerId: lehrerId}});
  if(!timeslot) {
    next(new TimeslotNotFoundException());
  }
  res.send(timeslot);
})

app.get('/timeslots/skill/:skillId', idNumberControl, async (req, res, next) => {
  const skillId = req.params.skillId;
  const timeslot = await Timeslot.findAll({where: {fach: skillId}});
  if(!timeslot) {
    next(new TimeslotNotFoundException());
  }
  res.send(timeslot);
})


app.get('/timeslots/matching/:lehrerId/:schuelerId', idNumberControl, async (req, res, next) => {
  const lehrerId = req.params.lehrerId;
  const schuelerId = req.params.schuelerId;
  const timeslot = await Timeslot.findAll({
    where: [{lehrerId: lehrerId}, {schuelerId: schuelerId}]
  });
  if(!timeslot) {
    next(new TimeslotNotFoundException());
  }
  res.send(timeslot);
})

app.post('/timeslots', async (req, res) => {
  await Timeslot.create(req.body);
  res.send("success");
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
  timeslot.lehrerId = req.body.lehrerId;
  timeslot.distanz = req.body.distanz;
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


const thisWillRunInEveryRequest = (req, res, next) => {
  console.log('running the middleware for', req.method, req.originalUrl);
  next();
}

function InvalidIdException(){
  this.status = 400;
  this.message = 'Invalid ID';
}

function TimeslotNotFoundException(){
  this.status = 404;
  this.message = 'Timeslot not found';
}


app.use(thisWillRunInEveryRequest);

app.listen(6002, () => {
  console.log("app is running");
});
