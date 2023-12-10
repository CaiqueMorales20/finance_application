"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/CategoryService.ts
var CategoryService_exports = {};
__export(CategoryService_exports, {
  default: () => CategoryService_default
});
module.exports = __toCommonJS(CategoryService_exports);

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
