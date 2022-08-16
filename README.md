# Let's Play!

![logo](https://user-images.githubusercontent.com/107210172/184045305-9395269e-39f0-4d2b-be3d-e71c7f1cfab7.png)

## Description

A simple web app to create, join, and organize gaming tournaments for the most popular games currently out.

## Table of Contents

- [Description](#description)
- [Links](#links)
- [Installation](#installation)
- [Technologies](#technologies-used)
- [Usage](#usage)
- [Authors](#authors)
- [Questions](#questions)
- [License](#license)

## Links

[Deployed Link - Let's Play](https://lets-play-tourneys.herokuapp.com/)

[Project Repository](https://github.com/mtwence/lets-play)

## Installation

1.  Clone Repository:

        " git clone git@github.com:mtwence/lets-play.git"

2.  Install [npm](https://nodejs.org/en/) dependencies using the command line:

        " npm install "

## Technologies Used:

- Javascript
- CSS
- Fetch / AJAX
- Node
- NPM
- Express
- MySQL
- Sequelize ORM
- Express-Session
- Handlebars
- Bulma
- Handlebars-Helpers

### New Technology

#### [Handlebars-Helpers](https://github.com/helpers/handlebars-helpers)

An npm package that has more than 130 helper functions, in around 20 categories, that you can use in conjunction with your handlebar templates.

### CSS Framework - Bulma

- The application has responsive layouta that adapts to different screen sizes.
- Game cards, login/sign-up, tournament creation form, and tournament pages were all styled using Bulma.

## Usage

### Website Demo

![App Demp](./assets/images/appdemo.gif)

### Code Snippets

HTML for each game card was put into a partial. And using handlebars we grab the game_id and it's associated cover art, creating a link to the tournaments and an image tile respectively.

```handlebars
<div
  class="card btn m-1"
  style="width: 18rem;"
  onclick="this.querySelector('a').click(); return true;"
>
  <a href="/games/{{id}}/tournaments"></a>
  <div class="card-image mt-2">
    <figure class="image is-3by4">
      <img class="card-img-top" src="{{cover_art}}" alt="game art" />
    </figure>
  </div>
</div>
```

This game card partial is then inserted into our homepage template. Using the handlebars-helpers "eq" function we compare the game's game_type attribute to a string repsrenting that genre. This then renders the game cards for the right genres into their respective rows.

```handlebars
<header class="has-text-centered has-text-weight-bold">
  <h1>Select A Game to Join a Tournament</h1>
</header>
<Section class="column is-full m-1">
  <h2>Shooters</h2>
  <div class="row">
    {{#each games as |game| }}
    {{#if (eq game.game_type "shooter")}}
    {{> game-cards}}
    {{/if}}
    {{/each}}
  </div>
</Section>
<Section class="column is-full m-1">
  <h2>Sports</h2>
  <div class="row ">
    {{#each games as |game| }}
    {{#if (eq game.game_type "sport")}}
    {{> game-cards}}
    {{/if}}
    {{/each}}
  </div>
</Section>
<Section class="column is-full m-1">
  <h2>MOBA</h2>
  <div class="row ">
    {{#each games as |game| }}
    {{#if (eq game.game_type "moba")}}
    {{> game-cards}}
    {{/if}}
    {{/each}}
  </div>
</Section>
<Section class="column is-full m-1">
  <h2>Fighters</h2>
  <div class="row ">
    {{#each games as |game| }}

    {{#if (eq game.game_type "fighter")}}
    {{> game-cards}}
    {{/if}}
    {{/each}}
  </div>
</Section>
<Section class="column is-full m-1">
  <h2>Party</h2>
  <div class="row ">
    {{#each games as |game| }}
    {{#if (eq game.game_type "party")}}
    {{> game-cards}}
    {{/if}}
    {{/each}}
  </div>
</Section>
```

Example of how we constructed our models. This one below is our Game model. As you can see as previously mentioned the attributes for cover_art and game_type.

```javascript
const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Game extends Model {}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    game_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    cover_art: {
      type: DataTypes.STRING,
    },
    game_type: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "game",
  }
);

module.exports = Game;
```

## Authors

- Michael Wence:
  [Github](https://github.com/mtwence) | [LinkedIn](https://www.linkedin.com/in/michael-wence/)
- Genesis Rosales:
  [Github](https://github.com/genrosales11) | [LinkedIn](https://www.linkedin.com/in/genesis-rosales-58a55015a/)
- Zorigtbaatar Zulkhuu:
  [Github](https://github.com/zzzorigtbaatar) | [LinkedIn](https://www.linkedin.com/in/zorizulkhuu/)

## Questions

Any issues or questions can be submitted [here](https://github.com/mtwence/lets-play/issues), or you can contact Michael directly at mtwence@gmail.com.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
