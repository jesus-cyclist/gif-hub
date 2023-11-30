import axios from 'axios'
import { giphyApiKey, giphyPath } from '../constants/url'

export default class GiphyService {
  static async getAll(limit = 6, offset = 1, q = null, type = 'trending') {
    const response = await axios.get(
      `${giphyPath}/${type}?${giphyApiKey}&rating=g&bundle=messaging_non_clips`,
      {
        params: {
          limit: limit,
          offset: offset,
          q: q,
        },
      }
    )
    return response
  }
}
