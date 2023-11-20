// const faker = require('faker');
const { factory } = require("factory-girl");
const { User } = require("../src/app/models");

factory.define("User", User, {
  name: 'Edocha', //faker.name.findName(),
  image: 'image.png', //faker.name.findName(),
  email: 'edocha@gmail.com', //faker.internet.email(),
  profession: 'Programador', //faker.internet.userName(),
  address: 'Viana, viana', //faker.internet.userName(),
  password: 'edocha.001', //faker.internet.password(),
  phone: '9366654821',
  is_admin: false,
  verification_by_email_token: 'edocha.00100', //faker.internet.password(),
  verification_by_email_expires: '10/10/2023', //faker.internet.password(),
});


module.exports = factory;