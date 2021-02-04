const express = require('express')
const formidable = require('express-formidable')
const cors = require('cors')
const monggose = require('mongoose')

require('dotenv').config()

monggose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
})

const PORT = process.env.PORT

const app = express()

app.use(cors())

// Routes
const comicsRoutes = require('./routes/comics')
app.use('/comics', comicsRoutes)
const characteressRoutes = require('./routes/characteres')
app.use('/characteres', characteressRoutes)

app.all('*', (req, res) => {
  res.status(404).json({ message: 'URL not found' })
})

app.listen(PORT, () => {
  `Serveur start on ${PORT}`
})
