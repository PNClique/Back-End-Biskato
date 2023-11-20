const bcrypt = require('bcryptjs');
const truncate = require('../utils/truncate');
const factory = require("../factories");

describe('User', () => { 
    beforeEach( async () => {
        await truncate();
    });

    it ('Encriptando a senha do usuario', async () => {
        const user = await factory.create('User',{
            name: "edocha",
            password: '1234567'
          });

          const compareHash = await bcrypt.compare('1234567', user.password);
          expect(compareHash).toBe(true);
    });
 });