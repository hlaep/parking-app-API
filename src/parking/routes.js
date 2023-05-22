const { Router } = require('express')
const { ParkingCarsRepository } = require('./repository')

const carsRepository = ParkingCarsRepository()

const router = Router()

router.get('/', (_req, res) => {
  carsRepository
  .list()
  .then(list => {res.status(200).send(list)})
})

// {name: "any text", sign: "text and number"}

router.post('/', async (req, res) => {
  const car = req.body
  const inserted = await carsRepository.insert(car)
  res
  .status(201)
  .header('Location', `/cars/${inserted.id}`)
  .send(inserted)
})

module.exports = router