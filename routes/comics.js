const router = require('express').Router()
const axios = require('axios')

router.get('/all', async (req, res) => {
  try {
    let { limit, page } = req.query

    if (isNaN(limit) || !Number.isInteger(Number(limit)) || limit < 0) {
      throw new Error('Limit query params must be a positive integer')
    }
    if (isNaN(page) || !Number.isInteger(Number(page)) || page < 0) {
      throw new Error('page query params must be a positive integer')
    }

    limit = Number(limit)
    const skip = limit * (page - 1)
    const response = await axios.get(`${process.env.MARVEL_URI}/comics?apiKey=${process.env.MARVEL_API_KEY}&skip=${skip}&limit=${limit}`)
    res.status(200).json(response.data)
  } catch (error) {
    res.status(400).json({ error: { message: error.message } })
  }
})

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