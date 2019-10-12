import React from 'react';
import axios from 'axios';


function Home({ products }) {
  console.log(products);
  // React.useEffect(() => {
  //   getProducts()
  // }, []);

  // async function getProducts() {
  //   const url = 'http://localhost:3000/api/products';
  //   const response = await axios.get(url);
  //   console.log(response.data);
  // }

  return <>home</>;
}

Home.getInitialProps = async () => {
  // fetch data on server
  const url = 'http://localhost:3000/api/products';
  const response = await axios.get(url);
  // return response data as an object
  return { products: response.data };
  // note: this object will be merged
}

export default Home;
