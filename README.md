# node-team-squad5-projeto2
Projeto 2 desenvolvido pelo Squad #5  @nodejsbrasil/NodeTeam

## Project Requirements

https://github.com/nodejsbrasil/nodeteam/blob/main/projetos/projeto-2.md

<br>

## Before Install

You will need Node and NPM on your machine to run this project,

You are going to need access to a PostGres server, and create a database called "projeto2".

<br>

## Installation

Download the project by running: 

```
git clone https://github.com/kortkamp/node-team-squad5-projeto2.git
```

Enter the project directory:

```
cd node-team-squad5-projeto2
```

Install dependencies:

```
npm install
```

Copy the .env file:

```bash
cp .env.example .env
```

Build the project in order to run the migrations 

(When using typeorm 0.3 the CLI only run migrations in js, not ts)

```
npm run build
```

Now you will run the migrations:

```
npm run typeorm migration:run
```

Finally you may start the project either through

```
npm run start
```

or in development mode

```
npm run dev
```

Now you have the project running and can start to mess with everything.


<br>
<br>

Made with L:heart:VE by NodeTeam Squad5.