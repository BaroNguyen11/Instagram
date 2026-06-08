const express = require('express');
const app = express();
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const commentRoutes = require('./routes/commentRoutes')
const postRoutes = require('./routes/postRoutes')
const userRoutes = require('./routes/userRoutes')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/auth', authRoutes)
app.use('/comments', commentRoutes)
app.use('/posts', postRoutes)
app.use('/users', userRoutes)

app.listen(8080, () => {
    console.log('server is running on port 8080')
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})