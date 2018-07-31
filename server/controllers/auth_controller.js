const users = require('../models/users');
let id = 1;

module.exports = {
  login: (req, res, next) => {
    let {session} = req;
    let {username, password} = req.body;
    let user = users.find(user => username === user.username && password === user.password)
    if(user) {
      session.user.username = user.username;
      res.status(200).send(session.user);
    } else {
      res.status(500).send("Access Restricted")
    }
  },
  register: (req, res, next) => {
    let {username, password} = req.body
      users.push({
        id,
        username,
        password
      })
      id++;
      res.status(200).send(users) // changed from send(req.session.user)
  },
    
  signout: (req, res, next) => {
    req.session.destroy()
    res.status(200).send(req.session);
  },
  getUser: (req, res, next) => {
    res.status(200).send(req.session.user)
  }
}

