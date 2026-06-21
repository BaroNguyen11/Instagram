
require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const connectDB = require("./config/db");
const path = require("path");

const authRoutes = require('./routes/authRoutes')
const commentRoutes = require('./routes/commentRoutes')
const postRoutes = require('./routes/postRoutes')
const userRoutes = require('./routes/userRoutes')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

connectDB();

app.use(cors())

app.use('/auth', authRoutes)
app.use('/comments', commentRoutes)
app.use('/posts', postRoutes)
app.use('/users', userRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})