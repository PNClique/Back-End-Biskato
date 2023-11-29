const crypto = require("crypto");
const { User } = require("../models");

class UserController {

  // register
  async register (req, res) {
    const {
      email,
      name,
      password,
      profession,
      address,
      image,
      phone
    } = req.body;

    try {
      console.log('req.body register : ', req.body);
      console.log('emai register : ', req.body.email);
      const findUser = await User.findOne({ where: { email } });
      if (findUser) {
        return res.status(401).send({ error: "User already exists." });
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
        image: image,
        name: name,
        profession: profession,
        address: address,
        password: password,
        phone: phone,
        is_admin: false,
        verification_by_email_token: token,
        verification_by_email_expires: now,
      });



      console.log("user register  : ", user);

      return res.status(201).send({
        user,
        token: user.generateToken(),
      });
    } catch (err) {
      console.log('emai register in error : ', email);
      console.log("error in register of the user : ", err);
      return res.status(400).send({ error: "Registration failed : ", err });
    }
  };

  async auth(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!(await user.checkPassword(password))) {
        return res.status(401).json({ message: 'Incorrect password' });
    }
    return res.status(200).send({ user, token: user.generateToken() });
  }
}

module.exports = new UserController();
