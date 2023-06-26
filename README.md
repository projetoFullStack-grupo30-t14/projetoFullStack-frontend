# MotorShop

<font size=5>A <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg#next" height="35" width="30" align="center" />
project, built on</font> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="35" width=30 align="center"/>

## Table of Contents

- [Working example](#example)
- [Getting started](#start)
- [Libs](#libs)
- [Built by](#devs)

<br>

## <h2 id="example">Working example</h2>

You can find the full working example [here](VERCELLINK), deployed on Vercel, consuming a Render/Railway database.

<br>

[comment]: <> (Reconfigurar com o deploy pronto)

## <h2 id="start">Getting started</h2>

You can create a project with:

[comment]: <> (Precisa testar com o repositório público)

```bash
npx create-next-app -e https://github.com/projetoFullStack-grupo30-t14/projetoFullStack-frontend
```

Or you could clone this repository.
<br>
<br>
Then, once inside the project directory, you want to install all the packeges:

```bash
npm install
```

or

```bash
yarn
```

<br>After that, you need to populate the `env` key in your `next.config.js` file. Make sure to include the last `/`, as the contexts and functions operate under the assumption it will be there.

<br>Run the project:

```bash
npm run dev
```

or

```bash
yarn dev
```

Open your localhost URL, usually at:
`http://localhost:3000`

<br>To make use of all the functionalities, you need the proper connection to the [MotorShop API](https://github.com/projetoFullStack-grupo30-t14/projetoFullStack-backend). This application needs the `env` file to be properly configured to connect to the database.

<br>

## <h2 id="libs">:books: Libs</h2>

- [x] Context API
- [x] Axios
- [x] React-hook-form
- [x] Zod
- [x] Tailwind CSS
- [x] React Toastify
- [x] Jwt decode
- [x] Nookies
- [x] Dayjs

<br>

## <h2 id="devs">:construction_worker: Built by</h2>

<a href="https://github.com/calberto97" >
  <img  src="https://avatars.githubusercontent.com/u/110138209?v=4#avatar" style="border-radius:100%">
</a>
<a href="https://github.com/gabifontoura" >
  <img  src="https://avatars.githubusercontent.com/u/110035918?v=4#avatar" style="border-radius:100%">
</a>
<a href="https://github.com/LucasWFragoso" >
  <img  src="https://avatars.githubusercontent.com/u/103780535?v=4#avatar" style="border-radius:100%">
</a>
<a href="https://github.com/CToH10" >
  <img  src="https://avatars.githubusercontent.com/u/108496850?v=4#avatar" style="border-radius:100%">
</a>
<a href="https://github.com/silvadpablo" >
  <img  src="https://avatars.githubusercontent.com/u/110122799?v=4#avatar" style="border-radius:100%">
</a>

<style>
    img[src$="#avatar"] {
    border-radius: 50%;
    max-width: 120px;
}

    img[src$="#next"]{
        filter:invert(1)
    }
</style>
