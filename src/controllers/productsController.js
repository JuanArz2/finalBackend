import multer from "multer";
import fs from "fs-extra";
import productsModel from "../models/productsModel.js";

const productsController = {
  createProduct: async (sol, req) => {
    try {
      const storage = multer.diskStorage({
        destination: "images/products",
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      });
      const charge = multer({ storage: storage }).single("image");
      charge(sol, req, async (error) => {
        // console.log("Sol body: ", sol.body);
        // console.log("Sol file: ", sol.file.filename);
        if (error) {
          req.json({
            state: "Error",
            mesage: "Error loading image",
            data: null,
          });
        } else {
          console.log("sol.body: ", sol.body);
          const newProduct = new productsModel({
            name: sol.body.name,
            size: {
              height: sol.body.height,
              weight: sol.body.weight,
            },
            inStock: sol.body.inStock,
            image: sol.file.filename,
            /* image: {
              data: sol.file.filename,
              contentType: "image/png",
            }, */
          });
          console.log("NEW PRODUCT: ", newProduct);
          const createdProduct = await newProduct.save();
          if (createdProduct._id) {
            req.json({
              state: "Success",
              mesage: "Product created",
              data: createdProduct._id,
            });
          }
        }
      });
    } catch (error) {
      req.json({
        state: "Error",
        mesage: "Error creating product",
        data: error,
      });
    }
  },
  readProduct: async (sol, req) => {
    try {
      const foundProduct = await productsModel.findById(sol.params.id);
      if (foundProduct._id) {
        req.json({
          state: "Success",
          mesage: "Product found",
          data: foundProduct,
        });
      }
    } catch (error) {
      req.json({
        state: "Error",
        mesage: "Error finding product",
        data: error,
      });
    }
  },
  readAllProducts: async (sol, req) => {
    try {
      const allProducts = await productsModel.find();
      req.json({
        state: "Success",
        mesage: "Products found",
        data: allProducts,
      });
    } catch (error) {
      req.json({
        state: "Error",
        mesage: "Error finding all product",
        data: error,
      });
    }
  },
  updateProduct: async (sol, req) => {
    try {
      const productUpdated = await productsModel.findByIdAndUpdate(
        sol.params.id,
        sol.body
      );
      if (productUpdated._id) {
        req.json({
          state: "Success",
          mesage: "Product updated",
          data: productUpdated._id,
        });
      }
    } catch (error) {
      req.json({
        state: "Error",
        mesage: "Error updating product",
        data: error,
      });
    }
  },
  deleteProduct: async (sol, req) => {
    try {
      const deletingProduct = await productsModel.findByIdAndDelete(
        sol.params.id
      );
      if (deletingProduct._id) {
        // si se logra encontrar el _id va a borrar (find & delete). Entonces, que tmb vaya a borrar la img creada
        await fs.unlink("images/products/" + deletingProduct.image); // Con fs-extra .unlink, dandole el path del iteam (img) y concatenando su nombre deletingProduct.image, se borrará.
        req.json({
          state: "Success",
          mesage: "Product deleted",
          data: null,
        });
      }
    } catch (error) {
      req.json({
        state: "Error",
        mesage: "Error deleting products",
        data: error,
      });
    }
  },
};

export default productsController;
