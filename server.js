/**
 * Created by mansikhemka on 07/10/16.
 */

// create table todolist(id INTEGER PRIMARY KEY AUTO_INCREMENT, todo TEXT, done BOOLEAN);


const express = require('express');
const path = require('path');
const mysql  = require('mysql');
const bodyparser = require('body-parser');
const todos = require('./todos');


const app = express();

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())


// app.use('/', express.static(path.join(__dirname , 'public_html')));
app.use('/', express.static(__dirname));

app.get('/showtodos', (req,res)=>{
     todos.show((rows)=>{
         res.send(rows);
     })
});
app.post('/addtodo', (req, res)=>{
    todos.add(req.body.todo, req.body.done, (rows)=> {
        res.send('successfully added');
    });
});
app.post('/dotodo', (req, res)=>{
    todos.dotodo(req.body.todoId, req.body.done, (rows)=>{
        res.send(rows);
    })

});

app.post('/deltodo', (req, res)=>{
    todos.deltodo(req.body.todoId, (rows)=>{
        res.send(rows);
    })
});










// const todo = require('/js/todo');
//
//
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user : 'finley',
//     password : 'some_pass',
//     database : 'mansi'
// });
//
// connection.connect();
// //
// var post  = {item: todo.newTodo, done: false};
// var query = connection.query('INSERT INTO tododo SET ?', post, function(err, result) {
//     // Neat!
// });
// console.log(query.sql);
//



app.listen(3330, ()=> {
    console.log('http://localhost:3330/');
})

// connection.end();