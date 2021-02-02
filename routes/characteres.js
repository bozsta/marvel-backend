const router = require('express').Router()
const axios = require('axios')

router.get('/all', async (req, res) => {
    try {
        const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}`)
        res.status(200).json(response.data)
    } catch (error) {
        res.status(400).json({ error: { message: error.message } })
    }
})

module.exports = router