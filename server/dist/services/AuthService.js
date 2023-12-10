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

// src/services/AuthService.ts
var AuthService_exports = {};
__export(AuthService_exports, {
  default: () => AuthService_default
});
module.exports = __toCommonJS(AuthService_exports);
var import_config = require("dotenv/config");
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

// src/db/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/services/AuthService.ts
var AuthServices = class {
  async generateToken(user) {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error("JWT secret key is not defined");
    }
    const token = import_jsonwebtoken.default.sign(user, secretKey, { expiresIn: "1h" });
    return token;
  }
  async login(email, password) {
    try {
      const authUser = await prisma.user.findUnique({
        where: {
          email,
          password
        }
      });
      if (!authUser)
        return "User not found";
      return authUser;
    } catch (error) {
      throw error;
    }
  }
};
var AuthService_default = AuthServices;
