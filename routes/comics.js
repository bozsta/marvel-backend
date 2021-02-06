const router = require('express').Router()
const axios = require('axios')

router.get('/char/:id', async (req, res) => {
  try {
    const { id } = req.params
    const response = await axios.get(`${process.env.MARVEL_URI}/comics/${id}?apiKey=${process.env.MARVEL_API_KEY}`)
    res.status(200).json(response.data)
  } catch (error) {
    res.status(400).json({ error: { message: error.message } })
  }
})

module.exports = router