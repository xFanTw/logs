const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
app.use(express.json());

const uri = "mongodb+srv://xfantw:bJyPcyaQUvB9J1DT@logs.l28rsva.mongodb.net/?appName=Logs";
const client = new MongoClient(uri);

let lastLog = null;

app.post('/add-log', async (req, res) => {
    try {
        const db = client.db("Logs");
        await db.collection("LiveFeed").insertOne(req.body);
        lastLog = req.body;
        res.status(200).send({success: true});
    } catch (e) { res.status(500).send(e); }
});

app.get('/get-logs', (req, res) => {
    res.status(200).send(lastLog || {});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));