const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");
const ContentType = require("../models/ContentType");

require("dotenv").config();


describe("POST /category", () => {
  it("should add category", async () => {
    const res = await request(app).post("/category").send({
      name: "test",
      description: "test",
      sourceType: "video",
    });
    expect(res.statusCode).toBe(201);
  });
});
describe("GET /category", () => {
  it("should return all categories", async () => {
    const res = await request(app).get("/category");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
  it("should return one category", async () => {
    const category = await ContentType.findOne({ name: "test" });
    const res = await request(app).get(`/category/${category._id}`);
    expect(res.statusCode).toBe(200);
  });
});

describe("UPDATE /category", () => {
  it("update category", async () => {
    const category = await ContentType.findOne({ name: "test" });
    const res = await request(app).put(`/category/${category._id}`,{
      name: "test",
      description: "test",
      sourceType: "text",
    });
    expect(res.statusCode).toBe(200);
  });
});

describe("DELETE /categories", () => {
  it("should remove category", async () => {
    const category = await ContentType.findOne({ name: "test" });
    const res = await request(app).delete(`/category/${category._id}`);
    expect(res.statusCode).toBe(200);
  });
});