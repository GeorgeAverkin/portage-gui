interface JsonRpcRequest {
  (request: { method: string, params: object, id: number }): Promise<any>
}

export const jrpc: JsonRpcRequest = async request => {
  const body = JSON.stringify({ jsonrpc: '2.0', ...request })
  try {
    const response: Response = await fetch('/api/json-rpc', {
      credentials: 'include',
      method: 'POST',
      body
    })
    if (response.ok) {
      try {
        const json = await response.json()
        return Promise.resolve(json)
      } catch (e) {
        console.error(e)
        return Promise.reject({
          cause: 'parse',
          name: e.name, // "SyntaxError"
          message: e.message, // "JSON.parse: unexpected character at line 1 column 1 of the JSON data"
        })
      }
    } else {
      console.error(response)
      return Promise.reject({
        cause: 'response',
        status: response.status,
        statusText: response.statusText,
      })
    }
  } catch (e) {
    console.error(e)
    return Promise.reject({
      cause: 'network',
      name: e.name, // "TypeError"
      message: e.message, // "NetworkError when attempting to fetch resource."
    })
  }
}