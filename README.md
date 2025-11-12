## Sistema de reserva de salas de reuniões - APP (Front-end)

### Instalação e Execução

#### Requisitos

- Node.js 22.17+
- Git instalado.

##### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/xlucasbitencourt/lb-meeting-room-app.git
    cd lb-meeting-room-app
    ```
2. Instale as dependências:
   ```bash
   yarn
   ```
   ou
    ```bash
    npm install
    ```
3. Configure a URL da API no arquivo `.env`:
   ```env
   VITE_API_URL=http://localhost:8000/
   ```
   Ou a porta que estiver rodando o back-end.
4. Inicie o aplicativo:
   ```bash
   yarn dev
   ```
   ou
   ```bash
   npm run dev
   ```
5. Acesse o aplicativo no navegador:
   ```
   http://localhost:5173
   ```

#### Tecnologias Utilizadas

- React com TypeScript: Biblioteca principal para construção da interface do usuário.
- Vite: Ferramenta de build rápida para desenvolvimento front-end.
- Tailwind CSS: Framework CSS utilitário para estilização rápida e responsiva.
- React Query: Biblioteca para gerenciamento de estado e cache de dados assíncronos.
- React Hook Form: Biblioteca para gerenciamento de formulários em React.
- Axios: Cliente HTTP para fazer requisições à API.
- React Router DOM: Biblioteca para roteamento em aplicações React.