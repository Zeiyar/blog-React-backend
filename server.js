const express = require('express');
const app = express();
const PORT = process.env.PORT||5000;
const cors = require('cors');
const mongoose = require('mongoose');
const articlesRoutes = require('./routes/Articles');

const MONGO_URI = "mongodb+srv://marieycorentin97_db_user:5mnvRFbBUW4HhrpM@cluster0.snvtxyv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use('/articles', articlesRoutes);

app.get('/',(req, res)=> {
    res.send('Hello Blog Backend');
});

app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
});