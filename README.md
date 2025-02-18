# Formulário React com Validação e Integração de API

Este projeto é um formulário React que utiliza `reactstrap` para a interface e faz integração com uma API para buscar opções de cargos e detalhes sobre eles. O formulário inclui validações em tempo real, exibição de detalhes em um modal e tratamento de erros.

## Funcionalidades

1. **Formulário com Validação**:
    - Campos obrigatórios: Nome, E-mail, Senha, Confirmar Senha e Cargo.
    - Validação de senha: A senha e a confirmação de senha devem ser iguais.
    - Validação do campo de cargo: O usuário deve selecionar um cargo.

2. **Integração com API**:
    - Busca opções de cargos de uma API (npoint.io).
    - Busca detalhes do cargo selecionado de uma segunda API.

3. **Exibição de Detalhes**:
    - Quando o usuário seleciona um cargo, os detalhes (título e descrição) são buscados e exibidos em um modal.

4. **Componente Reutilizável**:
    - O componente `Select` é reutilizável e pode ser usado em outros formulários.

5. **Feedback Visual**:
    - Mensagens de erro e sucesso.
    - Spinners para indicar carregamento.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces.
- **Reactstrap**: Biblioteca de componentes React baseada no Bootstrap.
- **Fetch API**: Para fazer requisições HTTP.
- **npoint.io**: Serviço para criar APIs de teste.
- **React Router**: Para navegação entre páginas.

## Como Executar o Projeto

### Pré-requisitos

- Node.js instalado (versão 14 ou superior).
- NPM ou Yarn para gerenciamento de dependências.

### Passos para Configuração

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/react-formulario.git
   cd react-formulario
   ```
2. **Instale as dependências**:
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```
3. **Inicie o servidor de desenvolvimento**:
   ```bash
    npm start
    ```
    ou
    ```bash
    yarn start
    ```
4. **Acesse o projeto no navegador**:
    - Abra o navegador e acesse `http://localhost:3000`.
    - O formulário será exibido e você poderá interagir com ele na pagina inicial.
    - Existe outra página de exemplo que pode ser acessada através do link no menu chamado "Exemplo".
