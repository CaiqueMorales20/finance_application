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

// src/services/UserService.ts
var UserService_exports = {};
__export(UserService_exports, {
  default: () => UserService_default
});
module.exports = __toCommonJS(UserService_exports);

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
