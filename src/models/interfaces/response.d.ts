export default interface IResponse {
  results: unknown,
  total: number,
  next?: {
    offset: number,
    limit: number
  },
  previous?: {
    offset: number,
    limit: number
  }
}
