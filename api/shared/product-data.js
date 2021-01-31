const data = {
  products: [
    {
      id: 10,
      name: 'logo',
      description: 'Official openjscad logo',
      quantity: '1',
      file: 'assets/examples/logo.jscad',
      image: 'assets/examples/logo.png',
    },
    {
      id: 20,
      name: 'hull',
      description: 'hull',
      quantity: 1,
      file: 'assets/examples/hull.jscad',
      image: 'assets/examples/hull.png',
    },
    {
      id: 30,
      name: 'echo',
      description: 'a ball',
      quantity: 1,
      file: 'assets/examples/echo.jscad',
      image: 'assets/examples/echo.png',
    },

    {
      id: 50,
      name: 'gear',
      description: 'gear',
      quantity: 1,
      file: 'assets/examples/gear.jscad',
      image: 'assets/examples/gear.png',
    },
  ],
};

const getRandomInt = () => {
  const max = 1000;
  const min = 100;
  return Math.floor(Math.random() * Math.floor(max) + min);
};

const addProduct = (product) => {
  product.id = getRandomInt();
  data.products.push(product);
  return product;
};

const updateProduct = (product) => {
  const index = data.products.findIndex((v) => v.id === product.id);
  console.log(product);
  data.products.splice(index, 1, product);
  return product;
};

const deleteProduct = (id) => {
  const value = parseInt(id, 10);
  data.products = data.products.filter((v) => v.id !== value);
  return true;
};

const getProducts = () => {
  return data.products;
};

module.exports = { addProduct, updateProduct, deleteProduct, getProducts };
