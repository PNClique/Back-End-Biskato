const request = require("supertest");

const app = require("../../src/app");
// const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("Testes dos biskatos", () => {
  //   beforeEach(async () => {
  //     await truncate();
  //   });

  it("Criando um biskato", async () => {
    const user = await factory.create("User", {
      email: "quinto@email.com",
    });

    const res = await request(app)
      .post("/job")
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send({
        title: "Preciso de um programador",
        image: "jobs.png",
        description: "Preciso de um programador para fazer um site",
        address: "Luanda, viana",
        remuneration: 150000,
        requeriments: "1 -> Saber programar",
        responsibility: " Construir um site",
        author_id: user.id,
      });

    expect(res.status).toBe(201);
  });

  it("Actualizando um biskato", async () => {
    const user = await factory.create("User", {
      email: "quinto01@email.com",
    });

    const response = await request(app)
      .post("/job")
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send({
        title: "Preciso de um programador",
        image: "jobs.png",
        description: "Preciso de um programador para fazer um site",
        address: "Luanda, viana",
        remuneration: 150000,
        requeriments: "1 -> Saber programar",
        responsibility: " Construir um site",
        author_id: user.id,
      });

    const res = await request(app)
      .put(`/job/:${response.body.jobs.id}`)
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send({
        title: "Preciso de 2 programadores",
        image: "jobs.png",
        description: "Preciso de programadores para fazerem um site",
        address: "Luanda, viana",
        remuneration: 150000,
        requeriments: "1 -> Saber programar",
        responsibility: " Construir um site",
        author_id: user.id,
      });

    expect(res.status).toBe(200);
  });

  // it("Impedido de actualizar o biskato porque o biskato nao existe", async () => {
  //   const user = await factory.create("User", {
  //     email: "quinto02@email.com",
  //   });

  //   const res = await request(app)
  //     .put(`/job/:id`)
  //     .set("Authorization", `Bearer ${user.generateToken()}`)
  //     .send({
  //       title: "Preciso de 2 programadores",
  //       image: "jobs.png",
  //       description: "Preciso de programadores para fazerem um site",
  //       address: "Luanda, viana",
  //       remuneration: 150000,
  //       author_id: user.id,
  //     });

  //   expect(res.status).toBe(404);
  // });

  it("Impedido de Apagar um biskato porque ele nao existe", async () => {
    const user = await factory.create("User", {
      email: "quinto03@email.com",
    });

    const res = await request(app)
      .delete(`/job/:${1}`)
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(res.status).toBe(404);
  });

  it("Apagando um biskato", async () => {
    const user = await factory.create("User", {
      email: "quinto04@email.com",
    });
    const response = await request(app)
      .post("/job")
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send({
        title: "Preciso de um outro programador",
        image: "jobs.png",
        description: "Preciso de um programador para fazer um site",
        address: "Luanda, viana",
        remuneration: 150000,
        requeriments: "1 -> Saber programar",
        responsibility: " Construir um site",
        author_id: user.id,
      });

    const res = await request(app)
      .delete(`/job/:${response.body.jobs.id}`)
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(res.status).toBe(404);
  });

  it("Pegando todos os biskato", async () => {
    const user = await factory.create("User", {
      email: "quintoJobs@email.com",
    });

    const res = await request(app)
      .get("/jobs")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(res.status).toBe(200);
  });

  it("Pegando um biskato pelo seu id", async () => {
    const user = await factory.create("User", {
      email: "quinto05@email.com",
    });

    const response = await request(app)
      .post("/job")
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send({
        title: "Preciso de um outro programador",
        image: "jobs.png",
        description: "Preciso de um programador para fazer um site",
        address: "Luanda, viana",
        remuneration: 150000,
        requeriments: "1 -> Saber programar",
        responsibility: " Construir um site",
        author_id: user.id,
      });

    const res = await request(app)
      .get(`/job/${response.body.jobs.id}`)
      .set("Authorization", `Bearer ${user.generateToken()}`);

      expect(res.status).toBe(200);
  });

  it("Pegando um biskato pelo id do autor (author)", async () => {
    const user = await factory.create("User", {
      email: "quinto06@email.com",
    });

    const response = await request(app)
      .post("/job")
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send({
        title: "Preciso de um outro programador",
        image: "jobs.png",
        description: "Preciso de um programador para fazer um site",
        address: "Luanda, viana",
        remuneration: 150000,
        requeriments: "1 -> Saber programar",
        responsibility: " Construir um site",
        author_id: user.id,
      });

    const res = await request(app)
      .get(`/job/author/${user.id}`)
      .set("Authorization", `Bearer ${user.generateToken()}`);

      expect(res.status).toBe(200);
  });

  it("Pesquisando um biskato pelo titulo, endereco ou renumeracao ", async () => {
    const user = await factory.create("User", {
      email: "quinto07@email.com",
    });

    const response = await request(app)
      .post("/job")
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send({
        title: "Programador",
        image: "jobs.png",
        description: "Preciso de um programador para fazer um site",
        address: "Luanda, viana",
        remuneration: 150000,
        requeriments: "1 -> Saber programar",
        responsibility: " Construir um site",
        author_id: user.id,
      });

    const res = await request(app)
      .get(`/job/search/${response.body.jobs.address}`)
      .set("Authorization", `Bearer ${user.generateToken()}`);

      expect(res.status).toBe(200);
  });

});
