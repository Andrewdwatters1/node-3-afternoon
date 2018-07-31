const swag = require('../models/swag')

module.exports = {
  add: (req, res, next) => {
    if(req.query.id) {
      let index = req.session.user.cart.findIndex(item => item.id === Number(req.query.id));
      if(index === -1) {
        let item = swag.find(item => item.id === Number(req.query.id)) 
        if(item) {
          req.session.user.total += item.price;
          res.status(200).send(req.session.user)
        }
      } else {
        res.status(200).send(req.session.user)
      }
    } else {
      res.send("Could not be added to cart")
    }
  },

  delete: (req, res, next) => {
    let selected = swag.find(swag => swag.id === Number(id))
      if (selected) {
        var index = req.session.user.cart.findIndex(swag => swag.id === Number(id))
        req.session.user.cart.splice(index, 1);
        req.session.user.total -= selected.price;
      }
      res.status(200).send(req.session.user);
  },

  checkout: (req, res, next) => {
    req.session.user.cart = [];
    req.session.user.total = 0;
    res.status(200).send(req.session.user)
  }
}