const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());        // crossoriginresource error avoid
app.use(express.json()) // Populate request body

const thingamabobs = [
    {id: 1, name: "plumbus", price: 34.59},
    {id: 2, name: "vana furby", price: 666},
    {id: 3, name: "sapakas", price: 2000}
]

const displayCars = [{
    Car:{
        carBrand:"BMW",
        color:"violet",
        "Tinted windows": true,
        wheels: 76,
        //lisa juurde kokku 5 erinevat andmeomdust milles vähemalt 
        //üks on tekst, teine arv ja kolmas objekt objektis kahe omdausega
    }
}]

document.getElementById("app").innerHTML =`
    <div id="json">
        <h1> Car properties </h1>
        <p>Brand of car: ${displayCars[0].Car.carBrand}</p>
        <p>Brand of car: ${displayCars[0].Car.Color}</p>
        <p>Brand of car: ${displayCars[0].Car["Tinted windows"]}</p>

    </div>
    `;

app.get('/thingamabobs', (req, res) => {res.send(thingamabobs)})

app.get('/thingamabobs/:id', (req, res) => {
    if (typeof thingamabobs[req.params.id -1] === 'undefined')
    {
        return res.status(404).send({error: "Object not found! Check your thingamabob id!"})
    }
}
)

app.post('/thingamabobs', (req,res) => {
    if (!req.body.name || !req.body.price)
    {
        return res.status(400).send({error:"One or multiple parameters missing!"})
    }
    let newThingy = {
        id: thingamabobs.lenght + 1,
        price: req.body.price,
        name: req.body.name
    }
    thingamabobs.push(newThingy)
    res.status(201).location('localhost:8080/thingamabobs' + (thingamabobs.lenght-1)).send(
        newThingy
    )
})

app.delete('/thingamabobs/:id', (req,res) => {
    if (typeof thingamabobs[req.params.id -1] === 'undefined')
    {
        return res.status(404).send({error: "Object not found! Check your thingamabob id!"})
    }
    thingamabobs.splice(req.params.id -1.1)
    res.status(204).send({error:"No content"})
})

app.put('/thingamabobs/:id', (req, res) => {
    if (typeof thingamabobs[req.params.id - 1] === 'undefined') {
        return res.status(404).send({error: "object not found, check your thingamob id"});
    }
    const updatedThingamabobs = thingamabobs[req.params.id - 1];
    updatedThingamabobs.price = req.body.price ? req.body.price : updatedThingamabobs.price;
    updatedThingamabobs.name = req.body.name ? req.body.name : updatedThingamabobs.name;
    res.status(200).send(updatedThingamabobs);
})

app.listen(8080, () => {console.log('API running at: http://localhost:8080')})



///CLIENTS OSA ///

const clients = [
    {id: 1, name: "Mihkel Pauk", email: "Mihkel.Pauk@gmail.com"},
    {id: 2, name: "Valdis Vaha", email: "Valdis.Vaha@gmail.com"},
    {id: 3, name: "Marko Muhk", email: "Marko.Muhk"}
]

app.get('/clients', (req, res) => {res.send(clients)})

app.get('/clients/:id', (req, res) => {
    if (typeof clients[req.params.id -1] === 'undefined')
    {
        return res.status(404).send({error: "Client not found! Check your client id!"})
    }
}
)

app.post('/clients', (req,res) => {
    if (!req.body.name || !req.body.email)
    {
        return res.status(400).send({error:"One or multiple parameters missing!"})
    }
    let newThingy = {
        id: clients.lenght+1,
        email: req.body.email,
        name: req.body.name
    }
    clients.push(newThingy)
    res.status(201).location('localhost:8080/clients'+(clients.lenght-1)).
    send(newThingy)
})

app.delete('/clients/:id', (req,res) => {
    if (typeof clients[req.params.id -1] === 'undefined')
    {
        return res.status(404).send({error: "Client not found! Check your client id!"})
    }
    clients.splice(req.params.id -1.1)
    res.status(204).send({error:"No content"})
})

app.put('/clients/:id', (req, res) => {
    if (typeof clients[req.params.id - 1] === 'undefined') {
        return res.status(404).send({error: "object not found, check your thingamob id"});
    }
    const updatedclients = clients[req.params.id - 1];
    updatedclients.email = req.body.email ? req.body.email : updatedclients.email;
    updatedclients.name = req.body.name ? req.body.name : updatedclients.name;
    res.status(200).send(updatedclients);
})



