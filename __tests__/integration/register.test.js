const request = require("supertest");

const app = require("../../src/app");
// const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("Registro de usuario", () => {
  // beforeEach(async () => {
  //   await truncate();
  // });

  it("Criando um usuario", async () => {
    const res = await request(app).post("/register").send({
      name: "Paulo paulo",
      email: "paulo0000001@gmail.com",
      password: "paulo001",
      phone: "936654821",
      pin_code: "1234568",
      is_admin: false,
      level: false,
      verification_by_email_token: "edocha.00100",
      verification_by_email_expires: "10/10/2023",
    });

    expect(res.status).toBe(201);
  });

  it("Verificando se o usuario ja existe", async () => {
    const user = await factory.create("User", {
      email: "paulo0000002@gmail.com",
      pin_code: '1234569',
    });
    const res = await request(app).post("/register").send({
      email: user.email,
    });

    expect(res.status).toBe(401);
  });
});
