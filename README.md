# AchadosUFC - Gerenciamento de Itens Perdidos e Achados

Este repositório contém o código-fonte de uma aplicação web desenvolvida para gerenciar itens perdidos e achados na Universidade Federal do Ceará (UFC). O sistema permite que agentes (usuários autorizados) registrem, visualizem, gerenciem o status de itens, e facilitem a devolução aos seus legítimos proprietários, incluindo o registro de itens recuperados.

## Visão Geral do Projeto

A aplicação "AchadosUFC" é uma ferramenta para otimizar o processo de gestão de itens perdidos e achados dentro do ambiente universitário. Ela oferece uma interface intuitiva para que agentes autorizados possam:
*   **Registrar novos itens**: Detalhar informações sobre itens encontrados, como descrição, local, data e fotos.
*   **Visualizar itens disponíveis**: Navegar por uma lista de todos os itens registrados no sistema, separados em "itens perdidos" e "itens recuperados".
*   **Gerenciar status dos itens**: Atualizar o status de um item para "recuperado", registrar os detalhes da retirada (incluindo informações do estudante e agente responsável), e excluir registros de itens perdidos ou recuperados, incluindo suas imagens associadas.
*   **Autenticação de Agentes**: Garante que apenas usuários autorizados possam acessar as funcionalidades de gerenciamento de itens, com um sistema de navegação e login/logout claro.

## Tecnologias Utilizadas

O projeto é construído com as seguintes tecnologias principais:

*   **React**: Uma biblioteca JavaScript para construção de interfaces de usuário reativas e componentes.
*   **TypeScript**: Um superconjunto tipado do JavaScript que melhora a manutenibilidade e escalabilidade do código.
*   **Vite**: Um ambiente de desenvolvimento frontend moderno que oferece uma experiência de desenvolvimento extremamente rápida.
*   **React Router**: Para o roteamento declarativo dentro da aplicação, permitindo a navegação entre diferentes páginas.
*   **Tailwind CSS**: Um framework CSS utilitário para estilização rápida e responsiva.
*   **Shadcn UI**: Uma coleção de componentes de interface de usuário reutilizáveis e acessíveis para React.
*   **Lucide React**: Biblioteca de ícones para React.

## Estrutura de Módulos

O projeto segue uma estrutura modular, com os arquivos organizados em diretórios lógicos para facilitar a compreensão e manutenção.

*   `src/`: Contém todo o código-fonte da aplicação.
    *   `App.tsx`: Componente raiz da aplicação.
    *   `main.tsx`: Ponto de entrada da aplicação React.
    *   `AppRoutes.tsx`: Define todas as rotas da aplicação, incluindo o cabeçalho condicional.
    *   `utils/`: Utilitários gerais.
        *   `supabase.ts`: Configuração e inicialização do cliente Supabase.
    *   `lib/`: Funções e utilitários auxiliares.
        *   `utils.ts`: Funções utilitárias diversas.
    *   `components/`: Contém os componentes reutilizáveis da UI e módulos específicos da aplicação.
        *   `auth/`: Módulo de autenticação de agentes.
            *   `AgentForm.types.ts`: Definições de tipos para formulários de agentes.
            *   `AgentLoginForm/`: Componentes e lógica para o formulário de login de agentes.
                *   `index.tsx`: Componente principal do formulário de login.
            *   `AgentLoginPage/`: Páginas de login de agentes.
                *   `index.tsx`: Componente principal da página de login.
            *   `AgentRegisterForm/`: Componentes e lógica para o formulário de registro de agentes.
                *   `index.tsx`: Componente principal do formulário de registro.
            *   `AgentRegisterPage/`: Páginas de registro de agentes.
                *   `index.tsx`: Componente principal da página de registro.
            *   `AuthContext.tsx`: Contexto React para gerenciamento de estado de autenticação, incluindo a lógica de login/logout.
            *   `AuthExceptions.ts`: Definições de exceções relacionadas à autenticação.
            *   `AuthService.ts`: Serviço para interagir com a API de autenticação (Firebase Auth).
            *   `AuthTypes.ts`: Definições de tipos relacionados à autenticação.
        *   `items/`: Módulo de gerenciamento de itens perdidos e achados.
            *   `ItemCard/`: Componente para exibir um item individual em um cartão, com botões de ação e visualização de detalhes.
                *   `index.tsx`: Componente principal do cartão de item.
            *   `ItemContext.tsx`: Contexto React para gerenciamento de estado de itens perdidos, incluindo upload, edição, exclusão e marcação como recuperado.
            *   `ItemDetailsModal/`: Modal para exibir detalhes de um item, agora com informações adicionais para itens recuperados.
                *   `index.tsx`: Componente principal do modal de detalhes do item.
            *   `ItemForm/`: Componente para formulário de criação/edição de itens.
                *   `index.tsx`: Componente principal do formulário de item.
            *   `ItemListPage/`: Página que exibe a lista de itens, agora dividida em seções de itens perdidos e recuperados.
                *   `index.tsx`: Componente principal da página de lista de itens.
            *   `ItemModal/`: Modal genérico para ações relacionadas a itens (e.g., adicionar, editar).
                *   `index.tsx`: Componente principal do modal de item.
            *   `ItemTypes.ts`: Definições de tipos para itens, incluindo o novo tipo `RetrievedItem`.
            *   `RetrievedItemContext.tsx`: Contexto para itens recuperados, gerenciando sua adição e exclusão.
            *   `RetrieveItemModal/`: Modal para registrar a recuperação de um item.
                *   `index.tsx`: Componente principal do modal de recuperação de item.
        *   `layout/`: Componentes de layout da aplicação.
            *   `Header/`: O cabeçalho da aplicação, com navegação condicional e dropdown de usuário.
                *   `index.tsx`: Componente principal do cabeçalho.
        *   `ui/`: Componentes de UI genéricos (shadcn/ui).
            *   `button.tsx`, `dialog.tsx`, `form.tsx`, `input.tsx`, `label.tsx`, `select.tsx`, `skeleton.tsx`, `sonner.tsx`, `dropdown-menu.tsx`, `sheet.tsx`: Componentes de UI reutilizáveis.

## Integração com Serviços Externos

O projeto utiliza o **Firebase** para:

*   **Autenticação**: Gerenciamento de usuários e sessões de agentes (Firebase Authentication).
*   **Banco de Dados**: Armazenamento de informações sobre os itens perdidos e achados (Firebase Realtime Database).

E utiliza o **Supabase** para:

*   **Armazenamento de Arquivos**: Armazenamento de imagens dos itens (Supabase Storage).

## Páginas e Rotas

A aplicação "AchadosUFC" possui as seguintes rotas principais:

*   **`/` (Página Inicial)**:
    *   **Descrição**: A rota raiz da aplicação. Exibe a lista de itens perdidos e recuperados (para agentes autenticados). O cabeçalho da aplicação é visível nesta rota.
    *   **Interação do Usuário**: Usuários podem navegar entre as seções de itens perdidos e recuperados, e visualizar detalhes dos itens. Agentes autenticados podem interagir com o sidebar e o dropdown de usuário no cabeçalho.

*   **`/auth/login` (Login do Agente)**:
    *   **Descrição**: Permite que agentes autorizados façam login no sistema. O cabeçalho da aplicação não é visível nesta rota.
    *   **Interação do Usuário**: Insere credenciais para autenticação. Redireciona para `/agent/item/list` em caso de sucesso. O botão "Acessar portaria" no cabeçalho (em rotas não autenticadas) redireciona para esta página.

*   **`/auth/register` (Registro do Agente)**:
    *   **Descrição**: Destinada ao registro de novos agentes. O cabeçalho da aplicação não é visível nesta rota.
    *   **Interação do Usuário**: Preenche formulário para registro. Após o registro, o usuário pode ser redirecionado para a página de login.

*   **`/agent/item/list` (Listagem de Itens - Apenas para Agentes)**:
    *   **Descrição**: Principal página de gerenciamento para agentes, exibindo uma lista de itens perdidos e achados. Dividida em duas seções: "Itens Perdidos" e "Itens Recuperados". Apenas agentes autenticados podem acessá-la; usuários não autenticados são redirecionados para `/`.
    *   **Interação do Usuário**: Agentes podem:
        *   **Visualizar Itens**: Itens são exibidos em `ItemCard`s.
        *   **Ver Detalhes**: Um botão "Ver Detalhes" abre o `ItemDetailsModal` com informações completas, incluindo detalhes de recuperação para itens já recuperados.
        *   **Adicionar Novo Item**: Um botão "Adicionar Item" abre o `ItemModal` para registro.
        *   **Editar Item**: Um botão "Editar" (para itens perdidos) abre o `ItemModal` com dados pré-preenchidos.
        *   **Marcar como Recuperado**: Um botão "Marcar como Recuperado" (para itens perdidos) abre o `RetrieveItemModal` para registrar a retirada do item.
        *   **Excluir Item**: Um botão "Excluir" (para itens perdidos e recuperados) abre um modal de confirmação antes de remover o item e sua imagem associada.
    *   **Header e Navegação**: O cabeçalho é visível nesta rota, com o dropdown de usuário (exibindo o email do agente) e o sidebar com opções de navegação.

## Configuração e Execução do Projeto

Para configurar e rodar o projeto "AchadosUFC" em sua máquina local, siga os passos abaixo:

### Pré-requisitos

*   **Node.js**: Versão 18 ou superior.
*   **npm** ou **Yarn**: Gerenciador de pacotes (npm é o padrão).
*   **Git**: Para clonar o repositório.

### Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para a configuração do Firebase e Supabase. Você precisará criar um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```dotenv
VITE_API_KEY=sua_api_key_firebase
VITE_DATABASE_URL=sua_database_url_firebase

VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_supabase
```

*   `VITE_API_KEY`: A chave da API do seu projeto Firebase. Você pode encontrá-la nas configurações do seu projeto Firebase.
*   `VITE_DATABASE_URL`: A URL do seu Firebase Realtime Database.
*   `VITE_SUPABASE_URL`: A URL do seu projeto Supabase.
*   `VITE_SUPABASE_ANON_KEY`: A "public anon key" do seu projeto Supabase.

### Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/AchadosUFC.git
    cd AchadosUFC
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Adicionar Componentes Shadcn UI (se necessário)**: Se os componentes Shadcn UI ainda não foram adicionados automaticamente via `npm install`, você pode adicioná-los manualmente:
    ```bash
    npx shadcn@latest add dropdown-menu sheet
    ```

### Execução

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

O aplicativo estará disponível em `http://localhost:5173` (ou outra porta disponível).

### Comandos Úteis do Vite

*   `npm run dev`: Inicia o servidor de desenvolvimento com hot-reloading.
*   `npm run build`: Compila o projeto para produção. Os arquivos estáticos serão gerados na pasta `dist/`.
*   `npm run lint`: Executa o linter para verificar problemas de código.
*   `npm run preview`: Serve a versão de produção localmente para teste.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
