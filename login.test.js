const mongoose = require("mongoose");
require("dotenv").config();
const request = require("supertest");
const app = require("./app");
const { User } = require("./models/user");

const { DB_HOST, PORT = 3000 } = process.env;

describe("test Login", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());
  beforeEach((done) => {
    mongoose.connect(DB_HOST).then(() => done());
  });
  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done());
    });
  });

  test("testing User Login", async () => {
    const testUser = {
      email: "testemail@gmail.com",
      password: "testemail",
    };

    const responseLogin = await request(app)
      .post("/api/users/login")
      .send(testUser);

    const user = await User.findOne({ email: testUser.email });

    expect(responseLogin.statusCode).toBe(200);
    expect(responseLogin.body.token).toBeTruthy();
    const { token } = await User.findById(user._id);
    expect(responseLogin.body.token).toBe(token);
    expect(responseLogin.body.user.email).toBe(testUser.email);
    expect(responseLogin.body.user.subscription).toBe(user.subscription);
  });
});
