"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/categoriesRoutes.ts
var categoriesRoutes_exports = {};
__export(categoriesRoutes_exports, {
  default: () => categoriesRoutes_default
});
module.exports = __toCommonJS(categoriesRoutes_exports);
var import_express = __toESM(require("express"));

// src/middlewares/verifyToken.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_config = require("dotenv/config");
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  import_jsonwebtoken.default.verify(token, process.env.JWT_SECRET_KEY, (err) => {
    if (err) {
      return res.status(403).json({ message: "Unauthorized: Invalid token" });
    }
    next();
  });
}

// src/db/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/services/CategoryService.ts
var CategoryServices = class {
  async getAllCategories() {
    const categories = await prisma.category.findMany();
    return categories;
  }
  async createCategory(name) {
    try {
      if (!name) {
        throw new Error("Name is required for creating a category.");
      }
      const newCategory = await prisma.category.create({
        data: {
          name
        }
      });
      return newCategory;
    } catch {
      throw new Error("Error when creating category");
    }
  }
};
var CategoryService_default = CategoryServices;

// src/routes/categoriesRoutes.ts
var categoriesRouter = import_express.default.Router();
var categoriesService = new CategoryService_default();
categoriesRouter.get("/", verifyToken, async (req, res) => {
  try {
    const categories = await categoriesService.getAllCategories();
    res.status(200).send(categories);
  } catch (err) {
    res.status(400).send(err);
  }
});
categoriesRouter.post("/", verifyToken, async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await categoriesService.createCategory(name);
    res.status(200).send(newCategory);
  } catch (error) {
    res.status(400).send(error);
  }
});
var categoriesRoutes_default = categoriesRouter;
