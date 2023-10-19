import axios from 'axios'
import { serverUrl } from '../constants/url'

const checkResponse = (response) =>
  response.ok ? response.json() : Promise.reject(`ERROR =>>${response.status}`)
export default class serverService {
  static async addGIif(gif, userId, collectionId) {
    if (!gif || !userId || !collectionId) {
      console.log('не хватает аргументов')
      return
    }
    const url = `${serverUrl}/api/users/:${userId}/collections/:${collectionId}/images`

    const response = await axios.post(
      url,
      {
        gif,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return response
  }
  static async test(gif) {
    const url = `${serverUrl}/qwer`

    console.log(url)
    const response = await axios.post(
      url,
      {
        gif,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return response
  }
}
