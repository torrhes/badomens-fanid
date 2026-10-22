# BAD OMENS — FAN ID

Um projeto independente de fã para criar uma identidade visual personalizada de fandom do Bad Omens, com nome, handle do X, foto do perfil, ano e Top 5 das músicas favoritas.

Este projeto foi construído com React + Vite e gera uma imagem pronta para download e compartilhamento.

## ✨ Funcionalidades

- Entrada de X handle e nome
- Busca automática da foto de perfil via Unavatar
- Seleção de Top 5 músicas
- Edição do ano e da identidade visual da ficha
- Preview em tempo real
- Download da imagem em PNG
- Compartilhamento nativo do navegador quando disponível
- Layout responsivo para desktop e mobile

## 🧩 Demonstração

A interface permite montar um Fan ID parecido com uma carteirinha/arte de fã, com o visual e o conteúdo customizados por usuário.

## 🛠️ Stack

- React
- Vite
- HTML2Canvas
- JavaScript

## 🚀 Como executar

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd badomens-fanid
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o ambiente de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:5173
```

### 4. Build de produção

```bash
npm run build
```

### 5. Preview do build

```bash
npm run preview
```

## 📁 Estrutura do projeto

```text
badomens-fanid/
├── index.html
├── package.json
├── vite.config.js
├── public/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css
│   ├── components/
│   │   ├── Combobox.jsx
│   │   ├── FanIdCard.jsx
│   │   ├── FanIdForm.jsx
│   │   ├── FanIdPreview.jsx
│   │   ├── SelectField.jsx
│   │   └── TopFiveSelector.jsx
│   ├── data/
│   │   ├── badges.js
│   │   └── songs.js
│   └── lib/
│       ├── exportPng.js
│       ├── useMediaQuery.js
│       ├── validate.js
│       └── xProfile.js
└── README.md
```

## 🎵 Personalização

### Músicas

As músicas disponíveis podem ser editadas em:

```text
src/data/songs.js
```

### Badges / opções visuais

Arquivos de configuração visual ficam em:

```text
src/data/badges.js
```

## ℹ️ Observações sobre a foto do perfil

A aplicação usa o serviço Unavatar diretamente no navegador:

```text
https://unavatar.io/x/{username}?fallback=false&ttl=1d
```

Isso significa que:

- não é necessário configurar API key
- não é necessário um arquivo `.env`
- a busca funciona diretamente no cliente

Se a imagem não estiver disponível, a interface usa uma representação fallback com o símbolo `@` no frame da foto.

## ⚠️ Aviso

Este é um projeto fan-made, criado de forma independente.

Não é afiliado, endossado nem oficialmente conectado ao Bad Omens, seus integrantes, representantes ou marcas.

## 📌 Licença

Até o momento, este projeto não possui licença definida no repositório. Se quiser, você pode adicionar uma licença como MIT ou GPL.

## 👤 Créditos

Projeto independente por Nayara Ferreira · @pearlygates404.
