# Api Rest do App biskato em Node.js, Express e Sequelize (POSTGRESQL).

## Configurações Iniciais

Antes de tudo, é preciso saber. Em **Instalação**, logo após clonar o repositório, é preciso configurar a estrutura do arquivo e as variaveis de ambinete do **.env** com as credenciais do seu banco de dados **POSTGRESQL**. O arquivo está localizado na raiz do projecto. No projeto foi utilizado a ferramenta [Sequelize](https://sequelize.org/) para conexao com o banco de dados.

```
APP_SECRET=biskato

DB_HOST=hostdoteubancodedados(ex : 127.0.0.0)
DB_USER=usuariodobancodedados
DB_PASS=senhadobancodedados
DB_NAME=nomedobancodedados
```

## Instalação

Fazer o clone do repositório

```
git clone https://github.com/pn-clique/back-end-streaming
```

Instalar os pacotes

```
npm install
```

Rodar o servidor

```
npm start
```

Rodar os testes

```
npm test
```
oru
```
yarn test
```

## Testando API

Utilize o [Insomnia](https://insomnia.rest/) para testar a API, ou algum de sua preferência.

#### Criando usuário

Para criar um usuário, utilize a rota `http://localhost:3000/register` se a api estiver rodando localmente, caso o contrario utilize a rota `http://localhost:3000/register` com método **POST**, especificando **name**, **email**, **password**,**pin_code** e **phone**. Por padrão, **is_admin** vem como false. Caso queira alterá-la para true, adicione **is_admin: true** no corpo da requisição.

```
{
	"name": "test",
	"email": "test@gmail.com",
	"password": "test123456",
	"pin_code": "9xxx",
	"phone": "923xxxxxx",
}
```

#### Autenticando usuário

Para autenticar usuário, utilize a rota `http://localhost:3000/auth` se a api estiver rodando localmente, caso o contrario utilize a rota `http://localhost:3000/auth` com método **POST**, especificando **email** e **password**.

```
{
	"email": "test@gmail.com",
	"password": "test123456"
}
```

#### Token de acesso

Após autenticar o usuário ou ter registrado um usuario é gerado um token. Copie o token e cole no **Header** das requisições que precisam da autenticação do usuário. De agora em diante todas as rotas citadas abaixo precisaram de um token de acesso ja que sao rotas protegidas. Exemplo de como usar o token : A rota `http://localhost:3000/users` com método **GET** precisas adicionar uma **Header** na requisição `Authorization` e um valor `Bearer token_de_acesso_do_usuario`.

## Acessando Rotas Protegidas

Para acessar rotas protegidas é preciso copiar o token de autenticação do usuário e colar na **Header** de cada requisição. Nova header `Authorization` e novo valor `Bearer token_de_acesso_do_usuario`.

#### listando meus dados do perfil

Utilize a rota `http://localhost:3000/user/:id` com método **GET**, para listar os dados de um usuario (perfil). Será necessário copiar o id de um usuario e substituir em **:id**.

#### Alterando a minha senha de usuario

Utilize a rota `http://localhost:3000/user/change-password/:id` com método **PUT**, especificando **password**, **new_password** e **confirm_password**. para alterar a senha. Sem esquecer de substituir o **:id** pelo o **id** do usuario que esta a alterar a sua senha.

```
{
	"password": "minhaSenhaAntiga",
	"new_password": "minhaSenhaNova",
	"confirm_password": "confirmoMinhaSenhaNova",
}
```

#### Alterando o meu codigo pin de usuario

Utilize a rota `http://localhost:3000/user/change-code/:id` com método **PUT**, especificando **old_pin_code**, **new_pin_code** e **confirm_pin_code**. para alterar o codigo pin. Sem esquecer de substituir o **:id** pelo o **id** do usuario que esta a alterar a sua senha.

```
{
	"old_pin_code": "meuCodigoPinAntigo",
	"new_pin_code": "meuCodigoPinNovo",
	"confirm_pin_code": "confirmoMeuCodigoPinNovo",
}
```

#### Alterando os dados do meu perfil (editando usuario)

Utilize a rota `http://localhost:3000/user/update/:id` com método **PUT**, especificando **email**, **name**, **password**, **phone**, **pin_code**, **image**, **address**, **birth_date**, **genre**, **province**, **country** e **nif** para editar os dados do meu perfil. Sem esquecer de substituir o **:id** pelo o **id** do usuario que esta a alterar os seus dados. E o corpo da requisicao tem que ser multipart-form porque ira de enviar uma imagem, a foto de perfil do usuario.

```
{
	{
	"name": "test",
	"email": "test@gmail.com",
	"password": "test123456",
	"pin_code": "9xxx",
	"image": "minhaFotoDePerfil.png",
	"address": "Benguela, huambo",
	"birth_date": "01/01/2000",
	"genre": "MeuGenero",
	"province": "minhaProvincia",
	"country": "meuPais",
	"nif": "meuNif",
}
}
```

#### listando todos os usuarios

Utilize a rota `http://localhost:3000/users` com método **GET**, para listar todos os usarios registrado.

#### Pesquisando por usuarios

Utilize a rota `http://localhost:3000/search/:search` com método **GET**, para pesquisar por um usuario. Será necessário substituir o **:search** pelo nome ou email do usuario que queremos pesquisar.


#### Criando biskatos

Utilize a rota `http://localhost:3000/job` com método **POST**, para criar um biskato, especificando **title**, **image**, **description**, **address**, **remuneration**, **requeriments**, **responsibility**, e o **author_id**. Nota que o campo **requeriments** tem que ser um array indepedentemente de ter um ou varios requisitos.

```
{
	"title": "Preciso de um programador",
	"image": "imagemDoBiskato.png",
	"description": "Preciso de um programador para fazer um site",
	"address": "Luanda, belas",
	"remuneration": "150000 (é o preco que vamos pagar pelo o biskato)",
	"responsibility": "Construir um site",
	"requeriments": ["Saber programar", "Dominio de SQL", "Dominio JS"],
	"author_id": 1 -> (é o id do usuario que estiver a criar o biskato, nesse caso 1),
}
```

#### Actualizando um biskato

Utilize a rota `http://localhost:3000/job/:id` com método **PUT**, para editar um biskato, especificando **title**, **image**, **description**, **address**, **remuneration**, **requeriments**, **responsibility**, e o **author_id**. Nota que o campo **requeriments** tem que ser um array indepedentemente de ter um ou varios requisitos. Sem esquecer de substituir o **:id** pelo o **id** do biskato.

```
{
	"title": "Biskato editado",
	"image": "imagemDoBiskatoEditado.png",
	"description": "Preciso de um programador para fazer um site",
	"address": "Luanda, belas",
	"remuneration": "150000 (é o preco que vamos pagar pelo o biskato)",
	"responsibility": "Construir um site",
	"requeriments": ["Saber programar", "Dominio de SQL", "Dominio JS"],
	"author_id": 1 -> (é o id do usuario que estiver a criar o biskato, nesse caso 1),
}
```

#### Apagando um biskato

Utilize a rota `http://localhost:3000/job/:id` com método **DELETE**, para apagar um biskato. Será necessário substituir o **:id** pelo **id** do biskato que queremos apagar.

#### listando todos os biskatos

Utilize a rota `http://localhost:3000/jobs` com método **GET**, para listar todos os biskatos cadastrados.

#### Pegando um biskato pelo seu id

Utilize a rota `http://localhost:3000/job/:id` com método **GET**, para pegar um biskato pelo o seu id. Será necessário copiar o **id** de um biskato e substituir em **:id**.


#### Pesquisando por biskatos

Utilize a rota `http://localhost:3000/job/search/:search` com método **GET**, para pesquisar por um biskato. Será necessário substituir o **:search** pelo titlo ou endereco do biskato que queremos pesquisar.

#### Pesquisando ou pegando um biskato pelo id do seu autor

Utilize a rota `http://localhost:3000/job/author/:authorId` com método **GET**, para pesquisar um biskato pelo id do seu autor. Será necessário substituir o **:authorId** pelo id do autor do biskato que queremos pesquisar.

## Licença

[Mit](http://escolhaumalicenca.com.br/licencas/mit/)
