const express = require("express");

const { userSignupValidator } = require("../validator/index");

const router = express.Router();

const {
  userById,
  adminById,
  restaurantById,
  read,
  update,
  purchaseHistory,
  list,
  remove,
  restaurantSignup,
  listRestaurants,
  readRestaurant,
  updateRestaurant,
  removeRestaurant,
} = require("../controllers/user");
const {
  requireSignin,
  isAuth,
  isAuth2,
  isAdmin,
  isAdmin2,
  isRestaurant,
} = require("../controllers/auth");

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/:userId", requireSignin, isAuth, update);
router.get("/orders/by/user/:userId", requireSignin, isAuth, purchaseHistory);
router.get("/users/:userId", requireSignin, isAuth, isAdmin, list);
router.delete(
  "/admin/:userId/:adminId",
  requireSignin,
  isAuth2,
  isAdmin2,
  remove
);
router.post(
  "/admin/signup/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  userSignupValidator,
  restaurantSignup
);
router.get(
  "/restaurants/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  listRestaurants
);
router.get(
  "/restaurants/:restaurantId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  readRestaurant
);
router.put(
  "/update/:restaurantId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  updateRestaurant
);
router.delete(
  "/admin/:restaurantId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  removeRestaurant
);

router.param("userId", userById);
router.param("adminId", adminById);
router.param("restaurantId", restaurantById);

module.exports = router;
