const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);


module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    let cart = {
      products: [],
      totalPrice: 0
    };
    fs.readFile(p, "utf8", (err, fileContent) => {
      if (!err && fileContent !== "") {       
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = {
          ...existingProduct
        };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = {
          id: id,
          qty: 1
        };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

  static delete_cart(id) {
    fs.readFile(path_cart, "utf8", (err, content) => {
      if (!err || content != []) {
        cart_content = JSON.parse(content);
      } else {
        console.log(err);
      }
    });
    const prod_index = cart_content.products.find(prod => prod.id === id);
    let updated_cart = [...cart_content];
    updated_cart.pop(prod_index);
    fs.writeFile(path_cart, JSON.stringify(updated_cart), err => {
      console.log(err);
    })
  }
};