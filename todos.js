/**
 * Created by mansikhemka on 08/10/16.
 */


const mysql = require('mysql');

var getConnection = () => {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user : 'finley',
        password : 'some_pass',
        database : 'newdatabase'
    });
    connection.connect();
    return connection;
}

module.exports = {
    show: (cb) =>{
        var connection = getConnection();


        connection.query('SELECT * FROM todolist ;',function(err, result){
            if(err) throw err;
            console.log(result);
            cb(result);
        })
        connection.end();

    },
    add:(todo, done, cb)=>{
        let connection = getConnection();



        let queryString = 'INSERT INTO todolist(todo, done) VALUES("'+ todo +' ", '+done+')';
        connection.query(queryString, (err, rows, fields)=>{
            if(err) throw err;

            cb(rows);

        });
        connection.end();
    },
    dotodo: (todoId, done, cb) =>{

        let connection = getConnection();

        let queryS = 'UPDATE todolist SET done='+done+' WHERE id='+todoId +'';
        connection.query(queryS, (err, rows, fields)=>{
            if(err) throw err;
            cb(rows);
        })
        connection.end();

    },
    deltodo:(todoId, cb)=>{
        let connection = getConnection();

        let queryS = 'DELETE FROM todolist WHERE id=' + todoId;
        connection.query(queryS, (err, rows, fields)=>{
            if(err) throw err;
            cb(rows);
        })
        connection.end();
    }

}





//
// $(function () {
//
//     showTodos();
//     $('#addbtn').click(function () {
//         saveTodo($('#todo').val());
//         showTodos();
//     })
//
// })
//
// function attachHandlers() {
//     $('.todocheck').change(function () {
//         var todoId = $(this).parent().attr('id');
//         doTodo(todoId, this.checked);
//         showTodos();
//     })
//
//     $('.delbtn').click(function () {
//         var todoId = $(this).parent().attr('id');
//         delTodo(todoId);
//         showTodos();
//     })
// }
//
// function delTodo (todoId) {
//     var todos = localStorage.getItem('todos');
//     if (!todos) {
//         return
//     }
//     todos = JSON.parse(todos);
//     todos.splice(todoId, 1);
//     localStorage.setItem('todos', JSON.stringify(todos));
// }
// function doTodo (todoId, isDone) {
//     var todos = localStorage.getItem('todos');
//     if (!todos) {
//         return
//     }
//     todos = JSON.parse(todos);
//     todos[todoId].done = isDone;
//     localStorage.setItem('todos', JSON.stringify(todos));
//
// }
//
// function saveTodo (newTodo) {
//     var todos = localStorage.getItem('todos');
//     if (!todos) {
//         todos = [];
//     } else {
//         todos = JSON.parse(todos)
//     }
//
//     todos.push({todo: newTodo, done: false});
//     localStorage.setItem('todos', JSON.stringify(todos));
// }
//
// function showTodos () {
//     var todos = localStorage.getItem('todos');
//     if (!todos) {
//         return
//     }
//     todos = JSON.parse(todos);
//
//     var todoList = "";
//     for (var i = 0; i < todos.length; i++) {
//
//         var thisTodo;
//
//         if (todos[i].done) {
//             thisTodo = "<li id='" + i + "' class='todoitem'>"
//                 + "<input checked class='todocheck' type='checkbox'>"
//                 + "<span style='text-decoration: line-through'>" + todos[i].todo + "</span>"
//                 + "<button class='delbtn'>x</button>"
//                 + "</li>"
//         } else {
//             thisTodo = "<li id='" + i + "' class='todoitem'>"
//                 + "<input class='todocheck' type='checkbox'>"
//                 + "<span>" + todos[i].todo + "</span>"
//                 + "<button disabled class='delbtn'>x</button>"
//                 + "</li>"
//         }
//
//
//
//
//         todoList = thisTodo + todoList;
//     }
//
//     $('#todolist').html(todoList)
//     attachHandlers();
// }
//
//
