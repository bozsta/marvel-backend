const router = require('express').Router()
const axios = require('axios')

router.get('/all', async (req, res) => {
  try {
    let { limit, page, name } = req.query

    if (isNaN(limit) || !Number.isInteger(Number(limit)) || limit < 0) {
      throw new Error('Limit query params must be a positive integer')
    }
    if (isNaN(page) || !Number.isInteger(Number(page)) || page < 0) {
      throw new Error('page query params must be a positive integer')
    }

    limit = Number(limit)
    const skip = limit * (page - 1)

    const response = await axios.get(`${process.env.MARVEL_URI}/characters?apiKey=${process.env.MARVEL_API_KEY}&skip=${skip}&limit=${limit}&name=${name}`)
    res.status(200).json(response.data)
  } catch (error) {
    // console.log('error', error.message)
    res.status(400).json({ error: { message: error.message } })
  }
})

router.post('/favoris', async (req, res) => {
  try {
    const { favorisId } = req.fields
    const favoris = []

    if (!Array.isArray(favorisId)) {
      throw new Error('Must be an array')
    }

    for (let i = 0; i < favorisId.length; i++) {
      try {
        const response = await axios.get(`${process.env.MARVEL_URI}/comics/${favorisId[i]}?apiKey=${process.env.MARVEL_API_KEY}`)
        favoris.push(response.data)
      } catch (error) {
        console.log('error', error)
      }
    }

    res.status(200).json(favoris)
  } catch (error) {
    res.status(400).json({ error: { message: error.message } })
  }
})

module.exports = router