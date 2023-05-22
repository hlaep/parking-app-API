const { wait } = require('../utils')

const ParkingCarsRepository = () => {
  let idSequence = 1
  const cars = {}

  const insert = async (car) => {
    await wait(500)
    const id = idSequence++
    const data = { ...car, id }
    cars[id] = data
    return data
  }

  const list = async () => {
    await wait(100)
    return Object.values(cars)
  }

  const get = async (id) => {
    await wait(100)
    return cars[id]
  }

  const update = async (car) => {
    await wait(500)
    cars[car.id] = car
    return car
  }

  const del = async (id) => {
    await wait(500)
    delete cars[id]
  }

  return {
    insert,
    list,
    get,
    update,
    del,
  }
}

module.exports = {
  ParkingCarsRepository,
}