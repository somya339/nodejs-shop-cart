const fs = require('fs');
const path = require('path');
let product, cart_content ;
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);
const path_cart = path.join(path.dirname(process.mainModule.filename),
  'data', 'cart.json');
const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err || fileContent == []) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.title = title;
    this.id = id;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id || this.id !== null) {
        const find_existing_product = products.findIndex(prod => prod.id == this.id);
        const updated_products = [...products];
        updated_products[find_existing_product] = this;
        fs.writeFile(p, JSON.stringify(updated_products), err => {
          console.log(err);
        })
      } else {
        this.id = Math.floor(Math.random()*100000).toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static individual_product(id, cb) {
    getProductsFromFile(products => {
      products.find(p => {
        if (p.id === id) {
          product = p;
        }
      });
      cb(product);
    });
  }

  static deleteProduct(id) {
    Product.fetchAll( products => {
      const deleting_product = products.findIndex(prod => prod.id === id);
      const updated_products = [...products];
      updated_products.splice(deleting_product,1);
      fs.writeFile(p, JSON.stringify(updated_products), err => {
        console.log(err);
      })
    })
  }
  static fetch_cart(cb) {
    fs.readFile(path_cart, "utf8", (err, content) => {
      if (!err && content != [])  {
        cart_content = JSON.parse(content);
      } else {
        console.log(err);
      }
      if (cart_content) {
        cb(cart_content);
      } else {
        cb([]);
      }
    });
    // const prod_index = cart_content.products.find( prod => prod.id === id);
    // let updated_cart = [...cart_content];
    // updated_cart.pop(prod_index);
    // fs.writeFile( path_cart ,JSON.stringify(updated_cart) , err =>{
    //   console.log(err);
    // })
  }
};