# 🦺 Sistema de Gerenciamento de EPI

Aplicativo **React + TypeScript** para gerenciamento de **EPI (Equipamento de Proteção Individual)** de funcionários. Utiliza **Ant Design** para a interface e conta com uma estrutura moderna baseada em Vite.

---

## 🚀 Primeiros Passos

### ✅ Pré-requisitos

- **Node.js** 18.x ou superior  
- **npm** 9.x ou superior  

---

## ⚙️ Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/epi-manager.git
   cd epi-manager
Instale as dependências:

bash
Copy
Edit
npm install
▶️ Executando a Aplicação
A aplicação possui duas partes: o front-end React e um servidor de API mock.

Iniciar o servidor de API mock:
bash
Copy
Edit
npx json-server --watch db.json --port 3001
Inicia o servidor de mock na porta 3001.

Iniciar a aplicação React (modo desenvolvimento):
bash
Copy
Edit
npm run dev
Inicia a aplicação na porta 5173 com Hot Module Replacement (HMR).

🏗️ Compilação para Produção
Para gerar os arquivos de produção:

bash
Copy
Edit
npm run build
Os arquivos serão gerados no diretório dist.

🧩 Funcionalidades

✅ Gerenciamento de funcionários (ativo/inativo)

👤 Cadastro e edição de informações pessoais

🧾 Rastreamento e controle de EPIs entregues

📱 Design responsivo com Ant Design

🪜 Formulários em múltiplas etapas com progresso visual

🛠️ Tecnologias Utilizadas
React 19

TypeScript

Redux Toolkit

React Router v7

Ant Design

Vite

CSS Modules
