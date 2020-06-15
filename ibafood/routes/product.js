const express = require("express");

const router = express.Router();

const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listByRestaurant,
  listRelated,
  listCategories,
  listBySearch,
  listSearch,
  photo,
} = require("../controllers/product");
const { userById } = require("../controllers/user");
const {
  requireSignin,
  isAuth,
  isAdmin,
  isRestaurant,
} = require("../controllers/auth");

router.get("/product/:productId", read);
router.post(
  "/product/create/:userId",
  requireSignin,
  isAuth,
  isRestaurant,
  create
);
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isRestaurant,
  remove
);
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isRestaurant,
  update
);

router.get("/products", list);
router.get(
  "/products/:userId",
  requireSignin,
  isAuth,
  isRestaurant,
  listByRestaurant
);
router.get("/products/search", listSearch);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
