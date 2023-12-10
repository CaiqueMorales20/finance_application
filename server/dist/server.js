"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/server.ts
var import_express4 = __toESM(require("express"));

// src/routes/userRoutes.ts
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

// src/routes/authRoutes.ts
var import_express2 = __toESM(require("express"));

// src/services/AuthService.ts
var import_config2 = require("dotenv/config");
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var AuthServices = class {
  async generateToken(user) {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error("JWT secret key is not defined");
    }
    const token = import_jsonwebtoken2.default.sign(user, secretKey, { expiresIn: "1h" });
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

// src/routes/authRoutes.ts
var authRoutes = import_express2.default.Router();
var authService = new AuthService_default();
var userService2 = new UserService_default();
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
      const newUser = await userService2.createUser(name, email, password);
      return res.status(200).send(newUser);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  return res.status(400).send("Passwords do not match");
});
var authRoutes_default = authRoutes;

// src/routes/categoriesRoutes.ts
var import_express3 = __toESM(require("express"));

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
var categoriesRouter = import_express3.default.Router();
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

// src/server.ts
var cors = require("cors");
var app = (0, import_express4.default)();
var PORT = 3333;
app.use(import_express4.default.json());
app.use(cors());
app.use("/", authRoutes_default);
app.use("/users", userRoutes_default);
app.use("/category", categoriesRoutes_default);
app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});
