// const faker = require('faker');
const { factory } = require("factory-girl");
const { User } = require("../src/app/models");

factory.define("User", User, {
  name: 'Edocha', //faker.name.findName(),
  email: 'edocha@gmail.com', //faker.internet.email(),
  password: 'edocha.001', //faker.internet.password(),
  phone: '9366654821',
  pin_code: '1234567',
  user_status : 'Casado',
  is_admin: false,
  level: false,
  verification_by_email_token: 'edocha.00100', //faker.internet.password(),
  verification_by_email_expires: '10/10/2023', //faker.internet.password(),
});


module.exports = factory;