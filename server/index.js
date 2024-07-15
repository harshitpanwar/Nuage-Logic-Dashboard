const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const schema = require('./graphql');
const getUserFromToken = require('./utils/getUserFromToken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

const server = new ApolloServer({ 
    schema, 
    context: async ({ req }) => {
        const token = req.headers.authorization || '';
        const user = await getUserFromToken(token.replace('Bearer ', ''));
        return { user };
    }, 
 });

async function startServer() {
    await server.start();
    server.applyMiddleware({ app});
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}${server.graphqlPath}`);
        });
    })
    .catch(err => console.error(err));

startServer();