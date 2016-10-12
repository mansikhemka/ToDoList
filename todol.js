/**
 * Created by mansikhemka on 08/10/16.
 */
/**
 * Created by mansikhemka on 07/10/16.
 */

$(function () {

    showTodos();
    $('#addbtn').click(function () {

        saveTodo($('#todo').val());
        showTodos();
    })
    $('#todolist').on('click','.todocheck',function () {
        console.log($(this).parent().attr('id'))
        //console.log($(this).parent().attr('id'));
        var todoId = $(this).parent().attr('id');
        // doTodo(todoId, this.checked);
        $.post('/dotodo',{todoId: todoId, done:this.checked}, function(data){
            console.log(data);
            showTodos();
        })

    })

})

function attachHandlers() {
    // $('#todolist').on('click','.todocheck',function () {
    //     console.log($(this).parent().attr('id'))
    //     //console.log($(this).parent().attr('id'));
    //     var todoId = $(this).parent().attr('id');
    //     doTodo(todoId, this.checked);
    //     showTodos();
    // })

    $('.delbtn').click(function () {
        var todoId = $(this).parent().attr('id');
        delTodo(todoId);
        showTodos();
    })
}

function delTodo (todoId) {
    // var todos = localStorage.getItem('todos');
    // if (!todos) {
    //     return
    // }
    // todos = JSON.parse(todos);
    // todos.splice(todoId, 1);
    // localStorage.setItem('todos', JSON.stringify(todos));

    //
    $.post('/deltodo',{todoId: todoId}, function(data){
        console.log(data);
    })
}
// function doTodo (todoId, isDone) {
//     $.post('/dotodo',{todoId: todoId, done:isDone}, function(data){
//         console.log(data);
//     })
    // var todos = localStorage.getItem('todos');
    // if (!todos) {
    //     return
    // }
    //
    // todos = JSON.parse(todos);
    //
    //
    // todos[todoId].done = isDone;
    // localStorage.setItem('todos', JSON.stringify(todos));



// }

function saveTodo (newTodo) {
    // var todos = localStorage.getItem('todos');
    // if (!todos) {
    //     todos = [];
    // } else {
    //     todos = JSON.parse(todos)
    // }
    //
    // todos.push({todo: newTodo, done: false});
    // localStorage.setItem('todos', JSON.stringify(todos));

   $.post('/addtodo',{todo:newTodo, done: false}, function(data){
       console.log(data);
   })

}

function showTodos () {
    // var todos = localStorage.getItem('todos');
    // if (!todos) {
    //     return
    // }
    // todos = JSON.parse(todos);


    // ================================from database

    $.get('/showtodos', function (data) {

        // for (var i = 0; i < data.length; i++) {
        //     console.log(data[i].todo);
        // }

        var todoList = "";
        for (var i = 0; i < data.length; i++) {
                 // console.log(i +"  " +data[i].id);

                var thisTodo;
                if (data[i].done) {

                    // $('#todolist').html("<li>" + data[i].todo + "</li>");
                    thisTodo = "<li id='" + data[i].id + "' class='todoitem'>"
                        + "<input checked class='todocheck' type='checkbox'>"
                        + "<span style='text-decoration: line-through'>" + data[i].todo + "</span>"
                        + "<button class='delbtn'>x</button>"

                        + "</li>"
                } else {

                    thisTodo = "<li id='" + data[i].id + "' class='todoitem'>"
                        + "<input class='todocheck' type='checkbox'>"
                        + "<span>" + data[i].todo + "</span>"
                        + "<button disabled class='delbtn'>x</button>"
                        + "</li>"
                }
                todoList = todoList + thisTodo;

        }
            $('#todolist').html(todoList);
            attachHandlers();

        }
    )


    // ================================

    // var todoList = "";
    // for (var i = 0; i < todos.length; i++) {
    //
    //     var thisTodo;
    //
    //     if (todos[i].done) {
    //         thisTodo = "<li id='" + i + "' class='todoitem'>"
    //             + "<input checked class='todocheck' type='checkbox'>"
    //             + "<span style='text-decoration: line-through'>" + todos[i].todo + "</span>"
    //             + "<button class='delbtn'>x</button>"
    //             + "</li>"
    //     } else {
    //         thisTodo = "<li id='" + i + "' class='todoitem'>"
    //             + "<input class='todocheck' type='checkbox'>"
    //             + "<span>" + todos[i].todo + "</span>"
    //             + "<button disabled class='delbtn'>x</button>"
    //             + "</li>"
    //     }
    //
    //
    //     todoList = thisTodo + todoList;
    // }
    //
    // $('#todolist').html(todoList)
    // attachHandlers();

}

// connection.end();