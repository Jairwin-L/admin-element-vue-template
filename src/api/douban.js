import fly from './fly'

export function list () {
  return fly.get(`movie/in_theaters`)
}

export function show (id) {
  return fly.get(`movie/subject/${id}`)
}
