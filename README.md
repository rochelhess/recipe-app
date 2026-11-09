# Recipe App

A full-stack recipe manager where users can browse recipes, create an account, and add, edit, and delete their own recipes.

**Live site:** https://recipe-app-9636.onrender.com/

> The free hosting plan sleeps after about 15 minutes of inactivity, so the first page load can take up to a minute.

## Features

- Browse all recipes and search them by title
- View a recipe's ingredients, instructions, prep time, cook time, and servings
- Register, log in, and log out
- Add new recipes (logged-in users only)
- Edit and delete recipes (only the user who created the recipe)
- Data saved in MongoDB, so recipes persist between visits

## Tech Stack

- **Frontend:** React 19 and Next.js (Pages Router), plain CSS
- **Backend:** Next.js API routes (REST)
- **Database:** MongoDB Atlas with Mongoose
- **Authentication:** bcrypt password hashing and JWT stored in an HTTP-only cookie
- **State management:** React Context API (logged-in user)
- **Testing:** Jest and React Testing Library
- **Deployment:** Render

## Getting Started

### Prerequisites

- Node.js 20 or newer
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### Setup

```bash
git clone https://github.com/rochelhess/recipe-app.git
cd recipe-app
git checkout dev
npm install
```

Create a file named `.env.local` in the project root:

```
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=a-long-random-secret
```

Then start the app:

```bash
npm run dev
```

Open http://localhost:3000.

### Environment Variables

| Variable      | Description                                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `MONGODB_URI` | MongoDB Atlas connection string, including the database name (for example `.../recipe_app?retryWrites=true&w=majority`)                    |
| `JWT_SECRET`  | Long random string used to sign login tokens. Generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |

### Scripts

| Command         | What it does                 |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm start`     | Run the production build     |
| `npm test`      | Run the Jest tests           |

## Project Structure

```
src/
  components/   Navbar, RecipeCard, RecipeForm
  context/      AuthContext (logged-in user state)
  lib/          MongoDB connection, auth helpers, field whitelist
  models/       Recipe and User Mongoose models
  pages/
    api/
      auth/     register, login, logout, me
      recipes/  list/create and get/update/delete
    recipes/    recipe details and edit pages
    index.js    home page with search
    add-recipe.js, login.js, register.js
  styles/       global CSS
__tests__/      Jest tests
```

## API Endpoints

| Method | Route                | Access     | Description                                   |
| ------ | -------------------- | ---------- | --------------------------------------------- |
| GET    | `/api/recipes`       | Public     | List all recipes                              |
| POST   | `/api/recipes`       | Logged in  | Create a recipe (owner is set from the login) |
| GET    | `/api/recipes/:id`   | Public     | Get one recipe                                |
| PUT    | `/api/recipes/:id`   | Owner only | Update a recipe                               |
| DELETE | `/api/recipes/:id`   | Owner only | Delete a recipe                               |
| POST   | `/api/auth/register` | Public     | Create an account and log in                  |
| POST   | `/api/auth/login`    | Public     | Log in                                        |
| POST   | `/api/auth/logout`   | Public     | Log out                                       |
| GET    | `/api/auth/me`       | Public     | Return the current user, or `null`            |

Status codes: `200` OK, `201` Created, `400` validation error, `401` not logged in, `403` not the recipe's owner, `404` not found, `405` method not allowed, `500` server error.

## Data Model

**Recipe**

| Field                | Type            | Notes                              |
| -------------------- | --------------- | ---------------------------------- |
| title                | String          | Required                           |
| description          | String          | Required                           |
| image                | String          | Optional image URL                 |
| prepTime             | String          | Required, for example "15 minutes" |
| cookTime             | String          | Required                           |
| servings             | Number          | Required, at least 1               |
| ingredients          | [String]        | One entry per ingredient           |
| instructions         | [String]        | One entry per step                 |
| owner                | ObjectId (User) | The user who created the recipe    |
| createdAt, updatedAt | Date            | Added automatically                |

**User**

| Field    | Type   | Notes                                              |
| -------- | ------ | -------------------------------------------------- |
| name     | String | Required                                           |
| email    | String | Required, unique, lowercase                        |
| password | String | Stored as a bcrypt hash, never returned by the API |

One user has many recipes. Ingredients and instructions are stored as arrays inside each recipe document, because they are always read and written together with the recipe.

## Authentication and Authorization

- Passwords are hashed with bcrypt before they are stored.
- Logging in sets a signed JWT in an HTTP-only cookie, so browser JavaScript cannot read it.
- The server checks the cookie on every create, update, and delete request. Only the user whose id matches a recipe's `owner` can change or delete it. Buttons are also hidden in the interface for everyone else, but the server enforces the rule.

## Testing

Run `npm test`. The suite includes:

- Component tests for `RecipeCard` and `Navbar` (including logged-in and logged-out views)
- API tests for listing and creating recipes, and for the login and ownership rules on update and delete (the database is mocked)

![Home page](docs/screenshots/home.png)
![Recipe details](docs/screenshots/details.png)

## Challenges and Future Improvements

- Ingredients are stored as free text, so servings cannot be scaled automatically.
- Prep and cook times are text, so recipes cannot be sorted or filtered by time.
- Possible next features: categories and tags, favorites, image uploads, pagination, and a "my recipes" page.

## Author

Rochel Hess - [github.com/rochelhess](https://github.com/rochelhess)
