const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.post(
  "/create",
  authMiddleware,
  createProduct
);

router.get(
  "/all",
  authMiddleware,
  getAllProducts
);

router.get(
  "/getSingleProduct/:id",
  authMiddleware,
  getProductById
);

router.patch(
  "/updateSingleProduct/:id",
  authMiddleware,
  updateProduct
);

router.delete(
  "/deleteSingleProduct/:id",
  authMiddleware,
  deleteProduct
);

module.exports = router;