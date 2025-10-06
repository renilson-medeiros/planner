# Planejador de Viagens

Este projeto é um front-end para o NLW Journey, permitindo criar e gerenciar viagens em grupo.

![Preview da aplicação](screen_preview.png)

## Pré-requisitos

Antes de rodar este projeto, você precisa clonar e executar a API do NLW Journey:

1. **Clone a API:**
   ```bash
   git clone https://github.com/rocketseat-education/nlw-journey-nodejs
   ```
2. **Siga as instruções do repositório da API para instalar dependências e rodar o servidor.**
   - Normalmente:
     ```bash
     cd nlw-journey-nodejs
     npm install
     npm run dev
     ```
   - O servidor deve rodar em `http://localhost:3333`.

## Clonando e rodando o front-end

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/renilson-medeiros/planner.git
   ```
2. **Acesse a pasta do projeto:**
   ```bash
   cd planejador
   ```
3. **Instale as dependências:**
   ```bash
   npm install
   ```
4. **Execute o projeto:**
   ```bash
   npm run dev
   ```
5. **Acesse no navegador:**
   ```
   http://localhost:5173
   ```

## Observações

- Certifique-se que a API está rodando antes de iniciar o front-end.
- Caso altere o endereço da API, edite o arquivo `src/lib/axios.ts`.
