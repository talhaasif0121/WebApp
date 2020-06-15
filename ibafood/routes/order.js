const express = require("express");
const router = express.Router();

const {
  requireSignin,
  isAuth,
  isAdmin,
  isRestaurant,
} = require("../controllers/auth");
const { userById, addOrderToUserHistory } = require("../controllers/user");
const {
  create,
  listOrders,
  getStatusValues,
  orderById,
  updateOrderStatus,
} = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");

router.post(
  "/order/create/:userId",
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  decreaseQuantity,
  create
);

router.get(
  "/order/list/:userId",
  requireSignin,
  isAuth,
  isRestaurant,
  listOrders
);
router.get(
  "/order/status-values/:userId",
  requireSignin,
  isAuth,
  isRestaurant,
  getStatusValues
);
router.put(
  "/order/:orderId/status/:userId",
  requireSignin,
  isAuth,
  isRestaurant,
  updateOrderStatus
);

router.param("userId", userById);
router.param("orderId", orderById);

module.exports = router;
