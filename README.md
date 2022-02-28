# graphql-nodejs-delegate

This is a project that it was develop two services:

- simple graph nodejs: this is a simple application on express-graphql with a simple interface, with default port 3000
- delegate graph nodejs: this is a application that will listen from the simple application and on top it will provide another interface, default port 4000 (and listening of the remote http://localhost:3000/graphql, by default)

To start the two services you can run:

```
make start
```

To stop you can run:

```
make down
```