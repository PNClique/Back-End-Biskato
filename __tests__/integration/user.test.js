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
      .put(`/user/update/${user.id}`)
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

  it("Actualizando a senha de um usuario", async () => {
    const user = await factory.create("User", {
      email: "edocha3330@gmail.com",
      pin_code: "1233330",
      password : 'my.password'
    });
    const res = await request(app)
      .put(`/user/change-password/${user.id}`)
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send({
        password: 'my.password',
        new_password: "new.password",
        confirm_password: "new.password",
      });

    expect(res.status).toBe(200);
  });

  it("Verificando se senha digitada e igual a senha antiga do usuario", async () => {
    const user = await factory.create("User", {
      email: "edocha33300@gmail.com",
      pin_code: "12333300",
      password : 'my.password'
    });
    const res = await request(app)
      .put(`/user/change-password/${user.id}`)
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send({
        password: 'my.password01',
        new_password: "new.password",
        confirm_password: "new.password",
      });

    expect(res.status).toBe(401);
  });

  it("Verificando se a nova senha digitada e igual a confirma senha", async () => {
    const user = await factory.create("User", {
      email: "edocha3330000@gmail.com",
      pin_code: "1233330000",
      password : 'my.password'
    });
    const res = await request(app)
      .put(`/user/change-password/${user.id}`)
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send({
        password: 'my.password',
        new_password: "new.password",
        confirm_password: "new.password00",
      });

    expect(res.status).toBe(401);
  });

  it("Actualizando o codigo pin de um usuario", async () => {
    const user = await factory.create("User", {
      email: "edochacodepin@gmail.com",
      pin_code: "124440",
    });
    const res = await request(app)
      .put(`/user/change-code/${user.id}`)
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send({
        old_pin_code: '124440',
        new_pin_code: "00440",
        confirm_pin_code: "00440",
      });

    expect(res.status).toBe(200);
  });

  it("Verificando se codigo pin digitado e igual ao codigo pin antiga do usuario", async () => {
    const user = await factory.create("User", {
      email: "edochacodepin01@gmail.com",
      pin_code: "1244400",
    });
    const res = await request(app)
      .put(`/user/change-code/${user.id}`)
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send({
        old_pin_code: '12444000',
        new_pin_code: "000440",
        confirm_pin_code: "000440",
      });

    expect(res.status).toBe(401);
  });

  it("Verificando se o novo codigo pin digitado e igual a confirma codigo pin", async () => {
    const user = await factory.create("User", {
      email: "edochacodepin02@gmail.com",
      pin_code: "11244400",
    });
    const res = await request(app)
      .put(`/user/change-code/${user.id}`)
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send({
        old_pin_code: user.pin_code,
        new_pin_code: "112444000",
        confirm_pin_code: "000440",
      });

    expect(res.status).toBe(401);
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

  it("Pegando um usuario pelo seu id", async () => {
    const user = await factory.create("User", {
      email: "getuserbyid@email.com",
      pin_code: '1511',
    });
  
    const res = await request(app)
      .get(`/user/${user.id}`)
      .set("Authorization", `Bearer ${user.generateToken()}`);
  
      expect(res.status).toBe(200);
  });


  it("Pesquisando um usuario pelo nome ou email ", async () => {
    const user = await factory.create("User", {
      email: "searchuser@email.com",
      pin_code: '145145',
    });

    const res = await request(app)
      .get(`/user/search/${user.email}`)
      .set("Authorization", `Bearer ${user.generateToken()}`);

      expect(res.status).toBe(200);
  });

});




