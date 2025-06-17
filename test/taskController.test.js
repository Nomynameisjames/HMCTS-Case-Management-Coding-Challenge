import request from 'supertest';
import app from '../Backend/app';
import Tasks from  '../Backend/models/tasks'
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
let createdTaskId;

beforeEach(async () => {
    await mongoose.connect(process.env.testmongodbURL);
    const task = await Tasks.create({
      Title: "Test Task",
      Due: new Date("2025-05-10T00:00:00Z"),
      Description: "Task for shared test cases",
      Status: "Active",
    });
  
    createdTaskId = task._id.toString();

  });

afterEach(async () => {
    await Tasks.deleteMany();
    await mongoose.connection.close();
  });

describe("GET /api/v1/tasks", () => {
    it("should return all tasks", async () => {
      const res = await request(app).get("/api/v1/tasks");
      expect(res.statusCode).toBe(200);
      expect(typeof res === 'object').toBeTruthy()
      expect(Object.keys(res.body).length).toBeGreaterThan(0);
    });
  });


describe("GET /api/v1/tasks/:id", () => {
  it("should return a task by ID", async () => {
    // use generated ID to fetch the task
    const getRes = await request(app).get(`/api/v1/tasks/${createdTaskId}`);
  
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body).toHaveProperty("_id", createdTaskId);
    expect(getRes.body.Title).toBe("Test Task");
  });
  
  it("should return 404 if task does not exist", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/v1/tasks/${fakeId}`);
  
    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toMatch(/can't find a task/i);
  });
});
  

describe("POST /api/v1/tasks", () => {
  it("Throws an error if no title or date is provided", async () => {

    const res = await request(app).post("/api/v1/tasks").send({
      Description: "Created a new test case",
      Status: "Active",
    })
    expect(res.statusCode).toBe(400);
  });
  it("should return 201 and create task when valid data is sent", async () => {
    const res = await request(app)
      .post("/api/v1/tasks")
      .send({
        Title: "New Task to fetch",
        Due: "2025-05-10T00:00:00Z",
        Description: "Fetch this task",
        Status: "Active",

      });
      expect(res.statusCode).toBe(201);
      expect(res.body.data).toHaveProperty("_id");
      expect(res.body.data.Title).toBe("New Task to fetch");

  })
})

describe("PUT /api/v1/tasks/:id", () => {
  it("Should update the status of a task", async () => {

    const res = await request(app).put(`/api/v1/tasks/${createdTaskId}`).send({
      Status: "Pending"
    })
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.data.Status).toBe("Pending");
  })
  it("Should return a 404 if task id not found, alongside an error msg", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).put(`/api/v1/tasks/${fakeId}`).send({
    Status: "Pending"
    })
    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toMatch(`Task with requested id ${fakeId} not found.`);
  });
});


describe("DELETE /api/v1/tasks/:id", () => {
  it("should find a task by id and delete from db", async () => {
    const res = await request(app).delete(`/api/v1/tasks/${createdTaskId}`)
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();

  })
})