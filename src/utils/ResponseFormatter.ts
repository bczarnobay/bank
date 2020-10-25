import IResponse from '../models/interfaces/response'

export default (response: unknown, limit: number, offset: number, total: number): IResponse => {
  const result: IResponse = {
    results: response,
    total: total
  }

  const startIndex = (offset - 1) * limit
  const endIndex = offset * limit

  if (startIndex > 0) {
    result.previous = {
      offset: offset - 1,
      limit: limit
    }
  }

  if (endIndex < total) {
    result.next = {
      offset: offset + 1,
      limit: limit
    }
  }

  return result
}
