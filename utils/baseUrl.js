const baseUrl = process.env.NODE_ENV === "production"
  ? 'https://racing-rabbit.herokuapp.com'
  : 'http://localhost:3000'

  export default baseUrl;