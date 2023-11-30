// import { createAsyncThunk } from '@reduxjs/toolkit'
// import axios from 'axios'

// const checkResponse = (response) =>
//   response.ok ? response.json() : Promise.reject(`ERROR =>>${response.status}`)

// export const createAsyncAction = ({ prefix, path, method = 'GET' }) => {
//   return createAsyncThunk(`${prefix}`, async (requestData = null) => {
//     return request({ path, method, requestData })
//   })
// }

// export const request = ({ path, requestData = null, method = 'GET' }) => {
//   const requestOptions = {
//     method,
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//     },
//   }

//   if (requestData) {
//     requestOptions.body = JSON.stringify(requestData)
//   }

//   return (
//     fetch(path, requestOptions)
//       .then((res) => checkResponse(res))
//       // .then((res) => {
//       //   console.log(res)
//       //   return res
//       // })
//       .catch((e) => console.log(e))
//   )
// }
