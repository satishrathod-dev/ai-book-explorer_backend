const express = require('express');
const connectDB = require('./db/DB.Connect');
const dotenv = require('dotenv');
dotenv.config();
const bookRoutes = require('./routes/book.routes');
const cors = require('cors');
const app = express();
app.use(express.json());

connectDB()

const corsOptions = {
    origin: ['http://localhost:3000'], 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
};
app.use(cors(corsOptions)); 

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hey there!")
})

app.use('/api', bookRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);