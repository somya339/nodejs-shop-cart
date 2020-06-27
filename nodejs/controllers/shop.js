const Product = require('../models/product_model');
const cart = require('../models/cart_model');
// const { renderFile } = require('pug');
// const { product } = require('../models/product');
let cart_data;
let ids = [];
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  // params = req.params.productsId;

  // Product.individual_product(params, product => {

  // });
  res.redirect("/products");
};
exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  Product.fetchAll(prod => {
    Product.fetch_cart(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        prods: prod,
        prod_cart: products,
        method: "get",
      });
    })
  })
};

exports.postCart = (req, res, next) => {
  const id = req.body.productId;
  Product.fetchAll(all_products => {
    Product.individual_product(id, product => {
      cart.addProduct(id, product.price);
      Product.fetch_cart(product_cart => {
        console.log(product_cart.products[0].id+ "here");
        res.render("shop/cart", {
          pageTitle: "cart",
          path: "/cart",
          prods: all_products,
          new_prod: product,
          id: id,
          method: "post",
          prod_cart: product_cart
        });
      });
    });
  });
}
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
exports.getdetail = (req, res, next) => {
  const params = req.params.productsId;
  console.log(params);
  Product.individual_product(req.params.productsId, prods => {
    res.render('shop/product-detail', {
      path: '/detail',
      pageTitle: 'Deatils',
      title: prods.title,
      imageUrl: prods.imageUrl,
      description: prods.description,
      price: prods.price,
      id: prods.id
    });
  });
};