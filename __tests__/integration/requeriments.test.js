const request = require("supertest");

const app = require("../../src/app");
// const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("Testes dos requisitos", () => {
  //   beforeEach(async () => {
  //     await truncate();
  //   });

  it("Criando um requisito", async () => {
    const user = await factory.create("User", {
      email: "requeriment@email.com",
      pin_code: "123112",
    });

    const res = await request(app)
      .post("/requeriment")
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send({
        name: "Saber programar",
        job_id: 1,
      });

    expect(res.status).toBe(201);
  });

  it("Actualizando um requisito", async () => {
    const user = await factory.create("User", {
      email: "requeriment01@email.com",
      pin_code: "123113",
    });

    const response = await request(app)
      .post("/requeriment")
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send({
        name: "Saber programar",
        job_id: 1,
      });

    const res = await request(app)
      .put(`/requeriment/${response.body.requeriments.id}`)
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send({
        name: "Dominio de programacao",
        job_id: 1,
      });

    expect(res.status).toBe(200);
  });

  it("Apagando um requisito", async () => {
    const user = await factory.create("User", {
      email: "requeriment02@email.com",
      pin_code: "123114",
    });
    const response = await request(app)
    .post("/requeriment")
    .set("Authorization", `Bearer ${user.generateToken()}`)
    .send({
      name: "Saber programar",
      job_id: 2,
    });

    const res = await request(app)
      .delete(`/requeriment/${response.body.requeriments.id}`)
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(res.status).toBe(200);
  });

  it("Pegando todos os requisitos", async () => {
    const user = await factory.create("User", {
      email: "requeriment03@email.com",
      pin_code: "123115",
    });

    const res = await request(app)
      .get("/requeriments")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(res.status).toBe(200);
  });

  it("Pegando um requisito pelo seu id", async () => {
    const user = await factory.create("User", {
      email: "requeriment04@email.com",
      pin_code: "123117",
    });

    const response = await request(app)
    .post("/requeriment")
    .set("Authorization", `Bearer ${user.generateToken()}`)
    .send({
      name: "Saber programar",
      job_id: 1,
    });

    const res = await request(app)
      .get(`/requeriment/${response.body.requeriments.id}`)
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(res.status).toBe(200);
  });

  it("Pegando um requisito pelo id do biskato (jobs)", async () => {
    const user = await factory.create("User", {
      email: "requeriment05@email.com",
      pin_code: "1231120",
    });

    const response = await request(app)
    .post("/requeriment")
    .set("Authorization", `Bearer ${user.generateToken()}`)
    .send({
      name: "Saber programar",
      job_id: 2,
    });

    const res = await request(app)
      .get(`/requeriment/job/${response.body.requeriments.job_id}`)
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(res.status).toBe(200);
  });
});
