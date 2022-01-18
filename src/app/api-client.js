import axios from "axios";

export async function get(relativeUrl = '') {
  console.log(relativeUrl, 'get')
  return await request('get', relativeUrl)
}
export async function del(relativeUrl = '') {
  return await request('delete', relativeUrl)
}
export async function post(data) {
  return await request('post', '', data)
}

async function request(method = 'get'|'delete'|'post', relativeUrl = '', data = null) {
  const url = `http://localhost:3001/api/v1/cake/${relativeUrl}`
  return await axios.request({ method, data, url })
}
