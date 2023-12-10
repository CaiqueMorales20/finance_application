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

// src/routes/userRoutes.ts
var userRoutes_exports = {};
__export(userRoutes_exports, {
  default: () => userRoutes_default
});
module.exports = __toCommonJS(userRoutes_exports);
var import_express = __toESM(require("express"));

// src/db/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

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

// src/routes/userRoutes.ts
var userRouter = import_express.default.Router();
var userService = new UserService_default();
userRouter.get("/", verifyToken, async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});
userRouter.get("/:id", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await userService.getUserById(id);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});
userRouter.post("/", verifyToken, async (req, res) => {
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
userRouter.patch("/:id", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, password } = req.body;
  try {
    const updatedUser = await userService.updateUser(id, name, email, password);
    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(400).send(error);
  }
});
userRouter.delete("/:id", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await userService.deleteUser(id);
    return res.status(200).send("User deleted");
  } catch (error) {
    return res.status(400).send(error);
  }
});
userRouter.post("/:id/entry", verifyToken, async (req, res) => {
  const userId = parseInt(req.params.id);
  const { title, type, value, category } = req.body;
  try {
    const categoryIds = Array.isArray(category) ? category : [category];
    const entry = await userService.createUserEntry(userId, title, type, value, categoryIds);
    return res.status(200).send(entry);
  } catch (error) {
    return res.status(400).send(error);
  }
});
userRouter.get("/:id/entry", verifyToken, async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const users = await userService.getAllUserEntry(userId);
    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).send(error);
  }
});
userRouter.patch("/entry/:id", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, type, value, category } = req.body;
  try {
    const updatedEntry = await userService.updateEntry(id, title, type, value, category);
    return res.status(200).send(updatedEntry);
  } catch (error) {
    return res.status(400).send(error);
  }
});
userRouter.delete("/entry/:id", verifyToken, async (req, res) => {
  const entryId = parseInt(req.params.id);
  try {
    await userService.deleteEntry(entryId);
    return res.status(200).send("Entry deleted");
  } catch (error) {
    return res.status(400).send(error);
  }
});
var userRoutes_default = userRouter;
