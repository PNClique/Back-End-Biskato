const request = require("supertest");

const app = require("../../src/app");
// const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("Autenticacao", () => {
  // beforeEach(async () => {
  //   await truncate();
  // });

  it("Deve autenticar com as credenciais validas", async () => {
    const user = await factory.create("User", {
      email: 'primeiro@email.com',
      password: "1234567",
    });

    // console.log(user);
    // expect(user.name).toBe('edocha');

    const response = await request(app).post("/auth").send({
      email: user.email,
      password: "1234567",
    });

    expect(response.status).toBe(200);
  });

  it("Nao deve autenticar se as credenciais nao forem validas", async () => {
    const user = await factory.create("User", {
      email: 'segundo@email.com',
      password: "123456789",
    });

    // console.log(user);
    // expect(user.name).toBe('edocha');

    const response = await request(app).post("/auth").send({
      email: user.email,
      password: "1234567",
    });

    expect(response.status).toBe(401);
  });

  it("Deve retornar um token jwt quando a autenticacao for bem sucedida", async () => {
    const user = await factory.create("User", {
      email: 'terceiro@email.com',
      password: "1234567",
    });

    const response = await request(app).post("/auth").send({
      email: user.email,
      password: "1234567",
    });

    expect(response.body).toHaveProperty("token");
  });

  it("Acessando rotas privadas quando o user estiver logado", async () => {
    const user = await factory.create("User", {
      email: 'quarto@email.com',
      password: "1234567",
    });

    const res = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ${user.generateToken()}`);
    expect(res.status).toBe(200);
  });

  it("Impedindo o user de acessar rotas privadas", async () => {

    const res = await request(app)
      .get("/dashboard")
    expect(res.status).toBe(401);
  });

});
