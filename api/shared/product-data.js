const data = {
  products: [
    {
      id: 10,
      name: 'logo',
      description: 'Official openjscad logo',
      file: 'assets/examples/logo.jscad',
      image: 'assets/examples/logo.png',
    },
    {
      id: 20,
      name: 'hull',
      description: 'hull',
      file: 'assets/examples/hull.jscad',
      image: 'assets/examples/hull.png',
    },
    {
      id: 30,
      name: 'echo',
      file: 'assets/examples/echo.jscad',
      image: 'assets/examples/echo.png',
    },
    {
      id: 50,
      name: 'gear',
      file: 'assets/examples/gear.jscad',
      image: 'assets/examples/gear.png',
    },
    {
      id: 60,
      name: 'name_plate',
      description: 'name_plate',
      file: 'assets/examples/name_plate.jscad',
      image: 'assets/examples/name_plate.png',
    },
    {
      id: 70,
      name: 'Spiral ball bearing chute',
      description: 'A stackable spiral chute for ball bearings.',
      file: 'assets/jscad/robinsonia/spirall_ball_bearing_chute.jscad',
      url: 'http://robinsonia.com/?tag=3d-printing',
      image: 'assets/jscad/robinsonia/ball-chute-212x300.jpg',
    },
    {
      id: 80,
      name: 'S Hook',
      description: 'parametric S hook',
      file: 'assets/joostn/hook.jscad',
      url: 'https://www.thingiverse.com/thing:17625',
      image: 'assets/joostn/hook.jpg',
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
