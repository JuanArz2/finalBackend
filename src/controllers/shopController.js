import multer from "multer";
import fs from "fs-extra";
import shopModel from "../models/shopModel.js";

const shopController = {
  createShop: async (sol, req) => {
    try {
      const storage = multer.diskStorage({
        destination: "images/projects",
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
            mesage: "Error uploading image",
            data: null,
          });
        } else {
          console.log("sol.body: ", sol.body);
          const newShop = new shopModel({
            place: {
              facility: sol.body.facility,
              area: {
                hight: sol.body.hight,
                width: sol.body.width,
                depth: sol.body.depth,
              },
            },
            redesign: sol.body.redesign,
            budget: sol.body.budget,
            date: sol.body.date,
            image: sol.file.filename,
            /* image: {
              data: sol.file.filename,
              contentType: "image/png",
            }, */
          });
          console.log("NEW SHOP: ", newShop);
          const createdShop = await newShop.save();
          if (createdShop._id) {
            req.json({
              state: "Success",
              mesage: "Shop created",
              data: createdShop._id,
            });
          }
        }
      });
    } catch (error) {
      req.json({
        state: "Error",
        mesage: "Error creating shop",
        data: error,
      });
    }
  },
  readShop: async (sol, req) => {
    try {
      const foundShop = await shopModel.findById(sol.params.id);
      if (foundShop._id) {
        req.json({
          state: "Success",
          mesage: "Shop found",
          data: foundShop,
        });
      }
    } catch (error) {
      req.json({
        state: "Error",
        mesage: "Error finding shop",
        data: error,
      });
    }
  },
  readAllShop: async (sol, req) => {
    try {
      const allShop = await shopModel.find();
      req.json({
        state: "Success",
        mesage: "Shop found",
        data: allShop,
      });
    } catch (error) {
      req.json({
        state: "Error",
        mesage: "Error finding all shop",
        data: error,
      });
    }
  },
  updateShop: async (sol, req) => {
    try {
      const shopUpdated = await shopModel.findByIdAndUpdate(
        sol.params.id,
        sol.body
      );
      if (shopUpdated._id) {
        req.json({
          state: "Success",
          mesage: "Shop updated",
          data: shopUpdated._id,
        });
      }
    } catch (error) {
      req.json({
        state: "Error",
        mesage: "Error updating shop",
        data: error,
      });
    }
  },
  deleteShop: async (sol, req) => {
    try {
      const deletingShop = await shopModel.findByIdAndDelete(sol.params.id);
      if (deletingShop._id) {
        await fs.unlink("images/projects/" + deletingShop.image);
        req.json({
          state: "Success",
          mesage: "Project deleted",
          data: null,
        });
      }
    } catch (error) {
      req.json({
        state: "Error",
        mesage: "Error deleting shop",
        data: error,
      });
    }
  },
};

export default shopController;
