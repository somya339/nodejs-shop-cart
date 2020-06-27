const Product = require('../models/product_model');
// const cart = require('../models/cart_model');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // req.body.id = Math.random().toString();
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
  });
};

exports.postEditproduct = (req, res, next) => {
  const id = req.body.productId;
  const updatedtitle = req.body.title;
  const updatedimageUrl = req.body.imageUrl;
  const updatedprice = req.body.price;
  const updateddescription = req.body.description;
  const updated_product = new Product(id, updatedtitle, updatedimageUrl, updateddescription, updatedprice);
  console.log(updated_product);
  updated_product.save();
  res.redirect('/admin/products');
}
exports.getEditProduct = (req, res, next) => {
  const query_param = req.query.edit;
  if (!query_param) {
    return res.redirect("/");
  }
  const id = req.params.productId;
  Product.individual_product(id, product => {
    if (!product) {
      // alert("the product was not found .. ");
      return res.redirect("/");
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: query_param,
      product: product
    });
  })
};
exports.postDeleteProduct = (req, res, next) => {
  Product.deleteProduct( req.body.productId );
  res.redirect("/admin/products");
}