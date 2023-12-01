import axios from 'axios'
import { serverUrl } from '@constants/url'

export default class serverService {
  static async addGif(gif, userId, postId) {
    const url = `${serverUrl}/api/users/:${userId}/posts/:${postId}/gifs`

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
  static async deleteGif(gif, userId, postId) {
    const url = `${serverUrl}/api/users/:${userId}/posts/:${postId}/gifs`

    const response = await axios.patch(
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
  static async addHashtag(hashtag, userId, postId) {
    const url = `${serverUrl}/api/users/:${userId}/posts/:${postId}/hashtags`

    const response = await axios.post(
      url,
      {
        hashtag,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return response
  }

  static async deleteHashtag(hashtag, userId, postId) {
    const url = `${serverUrl}/api/users/:${userId}/posts/:${postId}/hashtags`

    const response = await axios.patch(
      url,
      {
        hashtag,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return response
  }

  static async deletePost(userId, postId) {
    const url = `${serverUrl}/api/users/:${userId}/posts/:${postId}`

    const response = await axios.get(
      url,

      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return response
  }

  static async addPost(postName, userId) {
    const url = `${serverUrl}/api/users/:${userId}/posts/add`

    const response = await axios.post(
      url,
      {
        postName,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return response
  }

  static async changeUserData(email, password, name, userId) {
    const url = `${serverUrl}/api/users/:${userId}/auth`

    const response = await axios.post(
      url,
      {
        email,
        password,
        name,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return response
  }

  static async login(form) {
    const url = `${serverUrl}/api/login`

    const formData = new FormData(form)
    const formObject = {}
    formData.forEach((value, key) => {
      formObject[key] = value
    })

    const response = await axios.post(
      url,
      {
        formObject,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return response
  }

  static async register(form) {
    const url = `${serverUrl}/api/register`

    const formData = new FormData(form)
    const formObject = {}
    formData.forEach((value, key) => {
      formObject[key] = value
    })

    const response = await axios.post(
      url,
      {
        formObject,
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
