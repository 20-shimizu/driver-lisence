module.exports = {
  petstore: {
    input: 'http://localhost:8000/openapi.json',
    output:
      {
        target: './src/api',
        client: 'react-query'
      },
  },
};