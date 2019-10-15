const baseUrl = process.env.NODE_ENV === "production"
  ? 'https://racing-rabbit.herokuapp.com'
  : 'http://localhost:3000';

// const baseUrl = 'https://racing-rabbit.herokuapp.com';

  export default baseUrl;