# Calculadora de FGTS - Saque Aniversário

Aplicativo desenvolvido em React Native para estimar o valor disponível na modalidade **Saque-Aniversário do FGTS**.

## Funcionalidades

- Simulação do valor saque a partir do saldo atual do FGTS.
- Exibição do valor a poder ser sacado.

## Stack Utilizada

- **Expo** com `expo-dev-client` para builds e execução nativa.
- **React Native** para interface multi plataforma.
- **TypeScript** para tipagem estática.
- **React Navigation (Native Stack)** para fluxo de telas.
- **Context API** e **Async Storage** (`src/storage/fgtsStorage.ts`) para estado global e persistência.
- **Tailwind** para estilização de componentes.

## Pré-requisitos

- Node.js 18+ (LTS recomendado).
- yarn instalado.

## Como Rodar o Projeto

1. Instale as dependências:

  ```sh
  yarn install
  ```

2. Inicie os apps utilizando:

  Android
  ```sh
  yarn android
  ```

  iOS
  ```sh
  yarn ios
  ```
3. Para rodar os testes unitários

  ```sh
  yarn test
  ```

## Estrutura Relevante

- `src/screens/FGTSForm.tsx`: formulário para coleta de dados e acionamento da simulação.
- `src/screens/FGTSResult.tsx`: resumo com os resultados.
- `src/context/FGTSContext.tsx`: estado global do resultado.
- `src/storage/fgtsStorage.ts`: persistência da simulação feita.
- `src/utils/components/`: componentes reutilizáveis (ex.: botões, inputs).
- `global.css`: estilos globais compartilhados via CSS e Tailwind.

## Licença

Uso livre para fins pessoais. Adapte conforme necessário antes de qualquer distribuição comercial.
