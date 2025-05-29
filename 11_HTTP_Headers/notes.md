# HTTP Headers

HTTP Headers is extra context and meta-data about the request or response sent over HTTP.

There are two types of HTTP headers:
1. Request Headers: Sent by the client to the server.
2. Response Headers: Sent by the server to the client.

- Request Header can be sent from the frontend or here from the Postman. It can be accessed by req.headers in the backend.

- Response Header can be sent by res.header(key, value) from the backend to the frontend, which can be viewed in dev tools or Postman. We append X- in the start of the key in custom header as a good practice.

Read more about from MDN docs