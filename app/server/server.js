const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    massive = require('massive');
const connectionString = 'postgres://postgres:@localhost:5433/superhero';

const app = express();
app.use(bodyParser.json());
app.use(cors());

//Connection String -->>
//postgres://[username]:[password]@[host]:[port]/[database]
massive(connectionString).then( db => {
    app.set('db', db);
    app.get('db').init.seed_file().then(response => {
        console.log(response);
    })
}).catch(err => {
    console.log(err);
})

app.get('/api/getsuperheroes', (request, response) => {
    request.app.get('db').getSuperheroes().then(heroes => {
        response.send(heroes);
    })
})

app.post('/api/addsuperhero', (request, response) => {
    let { name, power } = request.body;
    request.app.get('db').newSuperhero([name, power]).then(hero => {
        response.status(200).send();
    })
})




app.listen(3000, () => {
    console.log('Reporting for duty on port 3000');
})
