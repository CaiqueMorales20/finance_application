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

// src/routes/authRoutes.ts
var authRoutes_exports = {};
__export(authRoutes_exports, {
  default: () => authRoutes_default
});
module.exports = __toCommonJS(authRoutes_exports);
var import_express = __toESM(require("express"));

// src/services/AuthService.ts
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

// src/services/UserService.ts
var UserServices = class {
  async getAllUsers() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      throw error;
    }
  }
  async getUserById(id) {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      const entries = await prisma.entry.findMany({
        where: { userId: id }
      });
      const incomeEntries = entries.filter((entry) => entry.type === "income");
      const totalIncome = incomeEntries.reduce((acc, entry) => acc + entry.value, 0);
      const outcomeEntries = entries.filter((entry) => entry.type === "outcome");
      const totalOutcome = outcomeEntries.reduce((acc, entry) => acc + entry.value, 0);
      if (!user)
        throw new Error("User not found");
      const userInfo = {
        ...user,
        totalIncome,
        totalOutcome
      };
      return userInfo;
    } catch (error) {
      throw error;
    }
  }
  async createUser(name, email, password) {
    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password
        }
      });
      return newUser;
    } catch (error) {
      throw error;
    }
  }
  async updateUser(id, name, email, password) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          name,
          email,
          password
        }
      });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
  async deleteUser(id) {
    try {
      await prisma.user.delete({
        where: { id }
      });
    } catch (error) {
      throw error;
    }
  }
  async createUserEntry(userId, title, type, value, categoryIds) {
    try {
      const entry = await prisma.entry.create({
        data: {
          title,
          value,
          type,
          user: { connect: { id: userId } },
          category: { connect: categoryIds.map((categoryId) => ({ id: categoryId })) }
        }
      });
      return entry;
    } catch (error) {
      throw error;
    }
  }
  async getAllUserEntry(userId) {
    try {
      const entries = await prisma.entry.findMany({
        where: { userId },
        include: {
          category: true
        }
      });
      return entries;
    } catch (error) {
      throw error;
    }
  }
  async updateEntry(id, title, type, value, categories) {
    const updateData = {
      title,
      value,
      type
    };
    if (categories.length > 0) {
      updateData.category = {
        set: categories.map((categoryId) => ({ id: categoryId }))
      };
    }
    try {
      const entry = await prisma.entry.update({
        where: { id },
        data: updateData
      });
      return entry;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async deleteEntry(id) {
    try {
      await prisma.entry.delete({
        where: { id }
      });
    } catch (error) {
      throw error;
    }
  }
};
var UserService_default = UserServices;

// src/routes/authRoutes.ts
var authRoutes = import_express.default.Router();
var authService = new AuthService_default();
var userService = new UserService_default();
authRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const authUser = await authService.login(email, password);
    if (authUser === "User not found")
      return res.status(400).send(authUser);
    const token = await authService.generateToken(authUser);
    res.status(200).send({
      token,
      ...authUser
    });
  } catch (error) {
    res.status(400).send(error);
  }
});
authRoutes.post("/create-account", async (req, res) => {
  const { name, email, password, password_confirm } = req.body;
  if (password === password_confirm) {
    try {
      const newUser = await userService.createUser(name, email, password);
      return res.status(200).send(newUser);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  return res.status(400).send("Passwords do not match");
});
var authRoutes_default = authRoutes;
