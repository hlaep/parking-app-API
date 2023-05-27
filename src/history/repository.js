const { wait } = require('../utils')

const CarsHistoryRepository = () => {
  let idSequence = 1
  let cars = {}

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

  const deleteAll = async () => {
    await wait(500)
    cars = {}
  }

  return {
    insert,
    list,
    get,
    update,
    del,
    deleteAll,
  }
}

module.exports = {
  CarsHistoryRepository,
}