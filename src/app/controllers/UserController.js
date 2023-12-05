const { Op } = require("sequelize");
const crypto = require("crypto");
const { User } = require("../models");

class UserController {
  // register
  async register(req, res) {
    const { email, name, password, phone, pin_code } = req.body;

    try {
      console.log("req.body register : ", req.body);
      const findUser = await User.findOne({ where: { email } });
      if (findUser) {
        return res.status(401).send({ error: "User already exists." });
      }

      const findUserWithPinCode = await User.findOne({ where: { pin_code } });
      if (findUserWithPinCode) {
        return res
          .status(423)
          .send({ error: "User with same code pin already exists." });
      }

      //generating a new token
      const token = crypto.randomBytes(3).toString("hex");

      //taking today's date
      const now = new Date();
      now.setHours(now.getHours() + 1);
      // mailer.sendMail(
      //   {
      //     from: "estrelas@pnclique.com",
      //     to: email,
      //     subject: "[PN Clique Streaming] Token para verificação de email ✔ ",
      //     text: "",
      //     html: `
      //             <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      //               <html xmlns="http://www.w3.org/1999/xhtml">
      //               <head>
      //                 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      //                 <title>Token para verificacao de email ✔</title>
      //                 <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

      //                 <style type=“text/css”>
      //                   @import url(http://fonts.googleapis.com/css?family=Dancing+Script);
      //                 </style>

      //                 </head>
      //                 <body style="display: flex; flex-direction: column; align-items: center; margin: 0; padding: 0;font-family:'Dancing Script',Helvetica, Arial, sans–serif;font-size:1rem;width:100%;"  >
      //                   <div align="left" style="margin:auto;color:#333333;width:390px;padding:10px;margin-top:px;margin-top:14px;border-radius:6px; background-color:#f8fafc;">
      //                     <img src="cid:unique@nodemailer.com" style="width: 100px; height: 70px; "/>
      //                     <h1 style="text-align:left;margin-top:2rem;color:#8FBD29;font-weight:500">Olá, ${name}</h1>
      //                     <p>${name}, em nome de toda a equipe da PN Clique Streaming, é com imensa satisfação que damos as boas-vindas! É um prazer ter você connosco.</p>
      //                     <p>Estamos entrando em contato para confirmar o seu endereço de email. Para isso, use o seguinte código(token)
      //                       <span style="font-weight:700;color:#21b7de;"> ${token} </span>
      //                       que deverá ser inserido no campo de verificação no nosso sistema. Essa é uma medida importante para garantir a segurança da sua conta e garantir que
      //                       você tenha acesso total a todas as funcionalidades que oferecemos.
      //                     </p>
      //                     <p>Feito com ❤️ pela PN Clique.</p>
      //                   </div>
      //                 </body>
      //                 </html>
      //       `,
      //     attachments: [
      //       {
      //         filename: "logo.png",
      //         path: "./assets/logo.png",
      //         cid: "unique@nodemailer.com",
      //       },
      //     ],
      //   },
      //   (err) => {
      //     if (err) {
      //       console.log("Cannot send verification by email : ", err);
      //       return res
      //         .status(400)
      //         .send({ error: "Cannot send verification by email email" });
      //     }

      //     return res
      //       .status(200)
      //       .send({ message: "Email send successfully", token: token });
      //   }
      // );

      const user = await User.create({
        email: email,
        name: name,
        password: password,
        phone: phone,
        pin_code: pin_code,
        level: false,
        is_admin: false,
        verification_by_email_token: token,
        verification_by_email_expires: now,
      });

      return res.status(201).send({
        user,
        token: user.generateToken(),
      });
    } catch (err) {
      console.log("error in register of the user : ", err);
      return res.status(400).send({ error: "Registration failed : ", err });
    }
  }

  // authentication
  async auth(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).send({ message: "Incorrect password" });
    }
    return res.status(200).send({ user, token: user.generateToken() });
  }

  // update a user
  async update(req, res) {
    const {
      email,
      name,
      password,
      phone,
      pin_code,
      image,
      address,
      birth_date,
      genre,
      province,
      country,
      nif,
      level,
      user_status,
    } = req.body;

    try {
      let photo;
      if (req.file) {
        const { firebaseUrl } = req.file;
        photo = firebaseUrl;
      }

      const users = await User.update(
        {
          email,
          name,
          password,
          phone,
          pin_code,
          image: photo,
          address,
          birth_date,
          genre,
          province,
          country,
          nif,
          level,
          user_status,
        },
        {
          returning: true,
          where: { id: req.params.id },
        }
      );

      if (users[0] === 0) {
        return res
          .status(404)
          .send({ message: "The User with the given id was not found" });
      }
      const user = users[1][0]; //.dataValues;

      console.log("user update : ", user);
      console.log("users update : ", users);
      return res.status(200).send({ user });
    } catch (error) {
      console.log("Error in update a user : ", error);
      return res.status(400).send({ error: "Error in update a user" });
    }
  }

  // change password of the user
  async changePassword(req, res) {
    const { password, new_password, confirm_password } = req.body;

    try {
      const { id } = req.params;
      const findUser = await User.findOne({ where: { id: id }, });

      if (!(await findUser.checkPassword(password))) {
        return res.status(401).send({ message: "Incorrect password, try again !" });
      }

      if (new_password !== confirm_password) {
        return res.status(401).send({ message: "new password and confirm password are different." });
      }
      const users = await User.update(
        {
          password: new_password,
        },
        {
          returning: true,
          where: { id: id },
        }
      );

      if (users[0] === 0) {
        return res
          .status(404)
          .send({ message: "The User with the given id was not found" });
      }
      const user = users[1][0];

      console.log("user change password : ", user);
      console.log("users change password : ", users);
      return res.status(200).send({ user });
    } catch (error) {
      console.log("Error in change password a user : ", error);
      return res.status(400).send({ error: "Error in change password a user" });
    }
  }

  // change code pin of the user
  async changeCodePin(req, res) {
    const { old_pin_code, new_pin_code, confirm_pin_code } = req.body;

    try {
      const { id } = req.params;
      const findUser = await User.findOne({ where: { id: id }, });

      if (findUser.pin_code !== old_pin_code) {
        return res.status(401).send({ message: "Incorrect code pin, try again !" });
      }

      if (new_pin_code !== confirm_pin_code) {
        return res.status(401).send({ message: "new code pin and confirm code pin are different." });
      }

      const users = await User.update(
        {
          pin_code: new_pin_code,
        },
        {
          returning: true,
          where: { id: id },
        }
      );

      if (users[0] === 0) {
        return res
          .status(404)
          .send({ message: "The User with the given id was not found" });
      }
      const user = users[1][0];

      console.log("user change code pin : ", user);
      console.log("users change code pin : ", users);
      return res.status(200).send({ user });
    } catch (error) {
      console.log("Error in change code pin a user : ", error);
      return res.status(400).send({ error: "Error in change code pin a user" });
    }
  }
  

  // get all users
  async getAllJUsers(req, res) {
    try {
      const users = await User.findAll({
        // include: { model: User, as: "author" },
      });

      return res.status(200).send({ users });
    } catch (error) {
      console.log("Error in get all users : ", error);
      return res.status(400).send({ error: "Error get all users" });
    }
  }

  // get a user by id
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findOne({
        where: { id: id },
        // include: { model: User, as: "author" },
      });
      if (!user) {
        return res
          .status(404)
          .send({ message: "The user with the given id was not found" });
      }

      return res.status(200).send({ user });
    } catch (error) {
      console.log("Error in get a user by id : ", error);
      return res.status(400).send({ error: "Error get a user by id" });
    }
  }

  // search users by name or email
  async searchUsers(req, res) {
    try {
      const { search } = req.params;
      const user = await User.findAll({
        where: {
          [Op.or]: [{ name: search }, { email: search }],
        },
        // include: { model: User, as: "author" },
      });

      if (!user) {
        return res.status(404).send({
          message: "The user with the given name or email was not found",
        });
      }

      return res.status(200).send({ user });
    } catch (error) {
      console.log(
        "error in search user with the given name or email : ",
        error
      );
      return res.status(400).send({
        error: "error in search user with the given name or email",
      });
    }
  }
}

module.exports = new UserController();
