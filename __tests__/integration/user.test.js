const request = require("supertest");

const app = require("../../src/app");
// const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("Testes do usuario", () => {
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
      pin_code: "1234569",
    });
    const res = await request(app).post("/register").send({
      email: user.email,
    });

    expect(res.status).toBe(401);
  });

  it("Actualizando os dados de um usuario", async () => {
    const user = await factory.create("User", {
      email: "edocha000000020021@gmail.com",
      pin_code: "1234569111100011",
    });
    const res = await request(app)
      .put(`/user/update/:${user.id}`)
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send({
        name: "Paulo paulo",
        email: "paulo0000001edocha@gmail.com",
        password: "paulo001",
        phone: "936654821",
        pin_code: "888888",
        image: "photo.png",
        address: "Viana",
        birth_date: "17/17/2001",
        genre: "Masculino",
        user_status : "Divorciado",
        province: "Luanda",
        country: "Angola",
        nif: "234567a0",
        level: false,
        is_admin: false,
        verification_by_email_token: "edocha.00100",
        verification_by_email_expires: "10/10/2023",
      });

    expect(res.status).toBe(200);
  });

  it("Pegando todos os usuarios", async () => {
    const user = await factory.create("User", {
      email: "allusers@email.com",
      pin_code: '227227',
    });

    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(res.status).toBe(200);
  });

});
