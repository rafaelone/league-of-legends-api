# League of Legends API

A **League of Legends API** é um backend desenvolvido para fornecer dados e funcionalidades relacionados ao jogo League of Legends. Este projeto foi criado como um estudo prático para implementar uma API escalável e bem estruturada, utilizando tecnologias modernas e boas práticas de desenvolvimento.

## 🚀 Tecnologias Utilizadas

- **Fastify**: Framework backend rápido e eficiente.
- **TypeScript**: Garantia de tipagem estática e melhor manutenção do código.
- **Prisma**: ORM para interação com banco de dados relacional.
- **Zod**: Validação e tipagem de dados de entrada.
- **Docker**: Gerenciamento de containers para banco de dados e ambiente de desenvolvimento.
- **Redis**: Armazenamento em cache para melhorar a performance.
- **Jest** e **Supertest**: Testes unitários e de integração.

## 📂 Funcionalidades

- **Autenticação de usuários**:
  - Registro e login utilizando JWT.
- **Gerenciamento de campeões**:
  - Listar, criar, atualizar e excluir campeões.
- **Gerenciamento de partidas**:
  - Simulação de partidas com resultados dinâmicos.
- **Dados sobre o jogo**:
  - Informações atualizadas sobre campeões, habilidades e eventos do jogo.
- **Cache de dados**:
  - Utilização de Redis para armazenar dados acessados com frequência.
- **Arquitetura modular**:
  - Facilita a escalabilidade e a manutenção do código.

## 📂 Estrutura do Projeto

A estrutura do projeto é modular e organizada:

- **src/**:
  - **modules/**: Contém os módulos principais, como campeões, partidas e autenticação.
  - **routes/**: Configuração das rotas disponíveis na API.
  - **schemas/**: Esquemas de validação de dados com Zod.
  - **utils/**: Funções auxiliares reutilizáveis.
  - **prisma/**: Configuração do banco de dados e migrações.

## 🛠️ Instalação e Uso

### Pré-requisitos

- **Node.js** (v18+)
- **Docker** (opcional, para rodar o banco de dados e Redis)

### Passos para execução

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/rafaelone/league-of-legends-api.git
   cd league-of-legends-api
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   Renomeie o arquivo `.env.example` para `.env` e preencha as variáveis necessárias, incluindo:

   - Conexão com o banco de dados.
   - Secret do JWT.

4. **Inicie os serviços com Docker**:

   ```bash
   docker-compose up -d
   ```

5. **Execute as migrações do banco de dados**:

   ```bash
   npx prisma migrate dev
   ```

6. **Inicie a aplicação**:

   ```bash
   npm run dev
   ```

7. **Acesse a API**:
   A API estará disponível em `http://localhost:3000`.

## 🧪 Testes

O projeto inclui testes unitários e de integração para garantir a qualidade e funcionalidade da API.

### Executar testes:

```bash
npm test
```

### Verificar cobertura de testes:

```bash
npm run test:coverage
```

## 📖 Documentação

### Endpoints Principais

1. **Autenticação**

   - `POST /auth/signup`: Cria uma nova conta.
   - `POST /auth/login`: Realiza o login e retorna o token JWT.

2. **Campeões**

   - `GET /champions`: Lista todos os campeões.
   - `POST /champions`: Cria um novo campeão.
   - `PUT /champions/:id`: Atualiza um campeão existente.
   - `DELETE /champions/:id`: Exclui um campeão.

3. **Partidas**
   - `POST /matches`: Cria e simula uma nova partida.
   - `GET /matches/:id`: Detalhes de uma partida específica.

### Swagger/OpenAPI

Se configurado, você pode acessar a documentação interativa dos endpoints em:  
`http://localhost:3000/docs`

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos abaixo para colaborar:

1. Faça um fork do repositório.
2. Crie uma branch para sua funcionalidade:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. Commit suas alterações:
   ```bash
   git commit -m "feat: descrição da funcionalidade"
   ```
4. Envie a branch:
   ```bash
   git push origin feature/nova-funcionalidade
   ```
5. Abra um Pull Request.

## 📝 Licença

Este projeto está licenciado sob a [MIT License](LICENSE). Sinta-se à vontade para utilizá-lo e adaptá-lo conforme necessário.

## 👨‍💻 Autor

Desenvolvido por [Rafael One](https://github.com/rafaelone).  
Se você gostou deste projeto, deixe uma ⭐ para ajudar a impulsionar o desenvolvimento!

Caso precise de alterações ou mais detalhes, é só avisar! 🚀
