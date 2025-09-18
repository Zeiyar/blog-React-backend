const express = require('express');
const app = express();
const PORT = process.env.PORT||5000;
const cors = require('cors');
const mongoose = require('mongoose');
const articlesRoutes = require('./routes/Articles');
const authRoutes = require('./routes/auth');


const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use('/articles', articlesRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, ()=> {
    console.log(`Server running on ${PORT}`);
});