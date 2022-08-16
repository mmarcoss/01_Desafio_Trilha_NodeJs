const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];
const todos = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  const user = users.find((user) => user.username === username);
  if(!user){
    return response.status(400).json({error: "Username not found"});
  }
  request.user = user;
  return next();
}


app.post('/users', (request, response) => {
  const {name, username} = request.body;
  const ExistsUserAccount = users.some((users) => users.username === username);

  if(ExistsUserAccount){
    return response.status(400).json({error: "Username already exists!"});
  }
    const user = {
    id: uuidv4(),
    name,
    username,
    todos:[]
  }
  users.push(user);
  return response.status(201).json(user);

    //pegar os valores do body e adicionar dentro do vetor (nosso banco de dados em memória)
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;

  return response.json(user);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const { user } = request;

    user.todos.push({
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  });
  return response.status(201).send(user.todos);
  
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { username } = request;
  const { title , deadline } = request.body;
  if(user.id === id){
    user.title = title;
    user.deadline = deadline;

  }
  

  return response.status(201).send();
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { user } = request;

  users.slice(user, 1);
  return response.status(200).json(users);
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { username } = request; 
  user.todos.splice(user, 1);
  return response.status(200).json(user);
});

module.exports = app;