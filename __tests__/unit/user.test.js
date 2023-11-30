const bcrypt = require('bcryptjs');
const truncate = require('../utils/truncate');
const factory = require("../factories");

describe('User', () => { 
    // beforeEach( async () => {
    //     await truncate();
    // });

    it ('Encriptando a senha do usuario', async () => {
        const user = await factory.create('User',{
            email: 'sexto@email.com',
            name: "edocha",
            password: '1234567',
            pin_code: '1234587',
          });

          const compareHash = await bcrypt.compare('1234567', user.password);
          expect(compareHash).toBe(true);
    });
 });