import Utility from "./utility";

class Item {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = Number(quantity);
  }

  getTotal = () => {
    return Utility.formatCurrency(this.product.price * this.quantity);
  }
}

class Cart {
  constructor(items = [], shipping = null, payment = null, tax = 0.1) {
    this.items = items;
    this.shipping = shipping;
    this.payment = payment;
    this.tax = tax;
  }

  addItem = (product, quantity) => {
    this.items.push(new Item(product, quantity));
  }

  deleteItem = (item) => {
    const index = this.items.indexOf(item);
    this.items.splice(index, 1);
  }

  updateItem = (item, quantity) => {
    item.quantity = Number(quantity);
  }

  getSubtotal = (isFormatted = true) => {
    const total = this.items.reduce((a, c) => a + (c.product.price * c.quantity), 0);
    return isFormatted ? Utility.formatCurrency(total) : total;
  }

  getTax = (isFormatted = true) => {
    const total = this.getSubtotal(false) * this.tax;
    return isFormatted ? Utility.formatCurrency(total) : total;
  }

  getTotal = () => {
    return Utility.formatCurrency(this.getSubtotal(false) + this.getTax(false));
  }

  getTotalQuantity = () => {
    return this.items.reduce((a, c) => a + c.quantity, 0);
  }

  updateShipping = (address, city, postal, country) => {
    this.shipping = {
      address: address,
      city: city,
      postal: postal,
      country: country
    };
  }

  updatePayment = (payment) => {
    this.payment = payment;
  }
}

class Order extends Cart {
  constructor(id, user, cart, ordered = new Date().toISOString(), paid = null, delivered = null) {
    super(cart.items, cart.shipping, cart.payment)
    this.id = id;
    this.user = user;
    this.ordered = Utility.formatDate(ordered);
    this.paid = paid;
    this.delivered = delivered;
  }

  static create = (user, cart) => {
    const id = Utility.getId(Orders);
    const order = new Order(id, user, cart);

    order.items.forEach(item => {
      item.product.updateStock(item.quantity);
    });

    Orders.push(order);

    return { orders: Orders, id: id };
  }

  update = (prop, date = new Date().toISOString()) => {
    this[prop] = Utility.formatDate(date);
    return Orders;
  }
}

class Product {
  constructor(id, name, price, image, brand, inStock, category, description, reviews = []) {
    this.id = id;
    this.name = name;
    this.price = Number(price);
    this.image = image;
    this.brand = brand;
    this.inStock = Number(inStock);
    this.category = category;
    this.description = description
    this.reviews = reviews;
  }

  static create = (name, price, image, brand, inStock, category, description) => {
    image = `${process.env.PUBLIC_URL}/assets/images/tbd.jpg`;
    const id = Utility.getId(Products);
    Products.push(new Product(id, name, price, image, brand, inStock, category, description));
    return Products;
  }

  delete = () => {
    const index = Products.indexOf(this);
    Products.splice(index, 1);
    return Products;
  }

  update = (name, price, image, brand, inStock, category, description) => {
    this.name = name;
    this.price = Number(price);
    // this.image = image;
    this.brand = brand;
    this.inStock = Number(inStock);
    this.category = category;
    this.description = description;
    return Products;
  }

  updateStock = (quantity) => {
    this.inStock -= Number(quantity);
  }

  review = (user, rating, comments) => {
    const id = Utility.getId(this.reviews);
    this.reviews.push(new Review(id, user, rating, comments));
    return Products;
  }

  getPrice = () => {
    return Utility.formatCurrency(this.price);
  }
}

class Review {
  constructor(id, user, rating, comments, date = new Date().toISOString()) {
    this.id = id;
    this.user = user;
    this.rating = Number(rating);
    this.comments = comments;
    this.date = Utility.formatDate(date);
  }
}

class User {
  constructor(id, name, email, password, role = "customer", orders = []) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.orders = orders;
  }

  static create = (name, email, password) => {
    const id = Utility.getId(Users);
    Users.push(new User(id, name, email, password));
  }

  static update = (user, name, email, password) => {
    user.name = name;
    user.email = email;
    user.password = password;
  }
}

const Orders = [];

const Products = [
  new Product(0, "Airpods Wireless Bluetooth Headphones", 89.99, `${process.env.PUBLIC_URL}/assets/images/airpods.jpg`, "Apple", 3, "Electronics", "Bluetooth technology lets you connect to compatible devices wirelessly. High-quality AAC audo offers immersive listening experience. Built-in microphone allows you to take calls while working."),
  new Product(1, "iPhone 11 Pro 256GB Memory", 599.99, `${process.env.PUBLIC_URL}/assets/images/phone.jpg`, "Apple", 10, "Electronics", "Triple-lens cameras with new ultra wide-angle lens. More durable, water resistant body. Matte finish and new dark green color. Night Mode for better low-light images. Haptic Touch instead of 3D Touch. Ultra Wideband support. A13 chip. Faster WiFi and LTE."),
  new Product(2, "Cannon E0S 80D DSLR Camera", 929.99, `${process.env.PUBLIC_URL}/assets/images/camera.jpg`, "Cannon", 10, "Electronics", "Offers pair of robust focusing systems and intuitive design. Features 24.2MP APS-C CMOS sensor and DIGIC 6 image processor to capture high-resolution images up to 7 fps and Full HD 1080p60 video, both with reduced noise and high sensitivity up to an expanded ISO 25600 for working in difficult lighting conditions."),
  new Product(3, "Sony Playstation 4 Pro White Version", 399.99, `${process.env.PUBLIC_URL}/assets/images/playstation.jpg`, "Sony", 10, "Electronics", "Updated graphics architecture and support for 4K gaming provides increased detail, higher-resolution graphics, and faster or more stable frame rates. High Dynamic Range gaming and content take advantage of increased color depth and contrast on compatible displays. Allows for 4K video playback from streaming services."),
  new Product(4, "Logitech G-Series Gaming Mouse", 49.99, `${process.env.PUBLIC_URL}/assets/images/mouse.jpg`, "Logitech", 10, "Electronics", "Ergonomic and customizable mouse designed to provide you with accuracy and performance needed for gaming. Power efficient optical sensor has 200 to 12,000 DPI range and zero smoothing. With the included USB receiver and Bluetooth connectivity, it is compatible with a wide range of devices and can be paired to two devices simultaneously. Powered by two AA batteries, yet can work with only one installed without a performance drop."),
  new Product(5, "Amazon Echo Dot 3rd Generation", 29.99, `${process.env.PUBLIC_URL}/assets/images/dot.jpg`, "Amazon", 10, "Electronics", "Equipped with Bluetooth and WiFi connectivity and Amazon Alexa to make nearly any wired speaker system wireless and voice-controlled. Onboard speaker for streaming and Alexa functionality at more moderate volumes. Provides access to Internet-based functions such as online shopping, weather reports, sports results, etc.")
]

const Users = [
  new User(0, "John Doe", "john.doe@gmail.com", "12345", "administrator"),
  new User(1, "Jane Smith", "jane.smith@gmail.com", "23456")
];

export { Cart, Order, Orders, Product, Products, User, Users };