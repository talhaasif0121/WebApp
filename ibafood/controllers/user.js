const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { Order } = require("../models/order");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    req.profile = user;
    next();
  });
};

exports.adminById = (req, res, next, id) => {
  User.findById(id).exec((err, admin) => {
    if (err || !admin) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    if (admin.role === 0) {
      return res.status(400).json({
        error: "Not an admin",
      });
    }

    req.admin = admin;
    next();
  });
};

exports.restaurantById = (req, res, next, id) => {
  User.findById(id).exec((err, restaurant) => {
    if (err || !restaurant) {
      return res.status(400).json({
        error: "Restaurant not found",
      });
    }

    if (restaurant.role === 0 || restaurant.role === 1) {
      return res.status(400).json({
        error: "Not a restaurant",
      });
    }

    req.restaurant = restaurant;
    next();
  });
};

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;

  return res.json(req.profile);
};

exports.update = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to perform this action",
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    }
  );
};

exports.addOrderToUserHistory = (req, res, next) => {
  let history = [];

  req.body.order.products.forEach((item) => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount,
    });
  });

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { history: history } },
    { new: true },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          error: "Could not update user purchase history",
        });
      }
      next();
    }
  );
};

exports.purchaseHistory = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .sort("-created")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(orders);
    });
};

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;

  User.find({ role: 0 })
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({
          error: "Users not found",
        });
      }

      res.json(users);
    });
};

exports.remove = (req, res) => {
  let profile = req.profile;
  profile.remove((err, deletedProfile) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.json({
      message: "Profile deleted successfully",
    });
  });
};

exports.restaurantSignup = (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

exports.listRestaurants = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;

  User.find({ role: 2 })
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({
          error: "Restaurants not found",
        });
      }

      res.json(users);
    });
};

exports.readRestaurant = (req, res) => {
  req.restaurant.hashed_password = undefined;
  req.restaurant.salt = undefined;

  return res.json(req.restaurant);
};

exports.updateRestaurant = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.restaurant._id },
    { $set: req.body },
    { new: true },
    (err, restaurant) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to perform this action",
        });
      }
      restaurant.hashed_password = undefined;
      restaurant.salt = undefined;
      res.json(restaurant);
    }
  );
};

exports.removeRestaurant = (req, res) => {
  let restaurant = req.restaurant;
  restaurant.remove((err, deletedProfile) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.json({
      message: "Restaurant deleted successfully",
    });
  });
};
