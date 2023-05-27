const { Router } = require('express')
const { CarsHistoryRepository } = require('./repository')

const carsRepository = CarsHistoryRepository()

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

router.delete('/', async (_req, res) => {
  // Delete all items in the repository
  await carsRepository.deleteAll()

  res.status(204).send()
})


module.exports = router 