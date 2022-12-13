const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, prodPrice) {
    // Fetch previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existProdIndex = cart.products.findIndex((prod) => prod.id === id);
      const existProd = cart.products[existProdIndex]
      let updatedProduct;
      if (existProd) {
        updatedProduct = { ...existProd };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products]
        cart.products[existProdIndex] = updatedProduct
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct]
      }
      cart.totalPrice = cart.totalPrice + +prodPrice;

      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      })
      
    });


  }
};
