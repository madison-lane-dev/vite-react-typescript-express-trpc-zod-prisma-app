# FullStack Vite React Typescript ExpressJs tRPC Zod Prisma MySQL CRUD Starter App

## Local Dev

### Initial Setup

- Create ```sides/server/.env``` and add ```DATABASE_URL``` to match your local MySQL database:

```
DATABASE_URL="mysql://user:password@localhost:3306/db_name"
```

### To play with the example app

- Populate the database with the example tables:

```
npm run data:push
```

- Start the dev server:

```
npm run dev
```

- Open dev site: [http://localhost:3000](http://localhost:3000)

### To implement your own app

- Modify ```sides/server/prisma/schema.prisma``` to match your intended table schemas.
- Delete the ```sides/server/prisma/migrations``` folder.
- To generate the new migration file, run:

```
npm run data:create
```

- To execute the migrations to create the tables in the local database, run:

```
npm run data:push
```

- Start the dev server:

```
npm run dev
```

- Open dev site: [http://localhost:3000](http://localhost:3000)

## To deploy to Heroku

- Install the Heroku CLI: ([LINK](https://devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli))
- Ensure the latest Heroku CLI is installed:

```
heroku update
```

- Login to Heroku: ([LINK](https://devcenter.heroku.com/articles/heroku-cli#getting-started))

```
heroku login
```

- CD to your project's root folder
- Create a Heroku app: ([LINK](https://devcenter.heroku.com/articles/creating-apps))

```
heroku create
```

- Add the Heroku remote to your local git repo:

```
git remote add heroku https://git.heroku.com/<your-app-name>.git
```

- Commit the changes and then push the code to Heroku:

```
git push heroku main
```

- Add a MySQL database to your Heroku app
    - Open the Heroku Dashboard: ([LINK](https://dashboard.heroku.com/apps))
    - Select your app
    - Click on the ```Resources``` tab
    - Search for ```ClearDB MySQL``` and select the ```Ignite``` plan (free)
    - OR
    - Search for ```JawsDB MySQL``` and select the ```Kitefin Shared``` plan (free)
    - Click on the ```Settings``` tab
    - Click on the ```Reveal Config Vars``` button
    - Copy the ```JAWSDB_URL``` or ```CLEARDB_DATABASE_URL``` value
    - Create a new Config Var called ```DATABASE_URL``` and paste the value into the ```Value``` field


- Create a new Config Var called ```VITE_SERVER_URL``` and set the value to ```https://<your-app-name>.herokuapp.com``` OR ```https://<your-domain-name>```


- Open the Heroku app in the browser:

```
heroku open
```

### Useful Heroku CLI Commands

- Open bash terminal in remote Heroku app:

```
heroku run bash
```

- View logs:

```
heroku logs --tail
```

- View remote environment variables:

```
heroku config
```

- Add a remote environment variable:

```
heroku config:set MY_VAR=123
```

- Remove a remote environment variable:

```
heroku config:unset MY_VAR
```

