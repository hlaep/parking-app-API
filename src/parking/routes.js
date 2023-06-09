const { Router } = require('express')
const { ParkingCarsRepository } = require('./repository')

const carsRepository = ParkingCarsRepository()

const router = Router()

const NotFound = {
  error: 'Not found',
  message: 'Resource not found'
}

router.get('/', (_req, res) => {
  carsRepository
  .list()
  .then(list => {res.status(200).send(list)})
})

// {name, sign, date}

router.post('/', async (req, res) => {
  const car = req.body
  const inserted = await carsRepository.insert(car)
  res
  .status(201)
  .header('Location', `/cars/${inserted.id}`)
  .send(inserted)
})

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)

  const deleted = await carsRepository.get(id)
  if (!deleted) {
    res.status(404).send(NotFound)
    return
  }
  await carsRepository.del(id)
  res.status(204).send()
})


module.exports = router