const express = require("express");

const router = express.Router();

const {
  create,
  categoryById,
  read,
  update,
  remove,
  list,
} = require("../controllers/category");
const { userById } = require("../controllers/user");
const {
  requireSignin,
  isAuth,
  isAdmin,
  isRestaurant,
} = require("../controllers/auth");

router.get("/category/:categoryId", read);
router.post(
  "/category/create/:userId",
  requireSignin,
  isAuth,
  isRestaurant,
  create
);
router.put(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.delete(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.get("/categories", list);

router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;
