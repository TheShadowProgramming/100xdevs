const { Command } = require("commander");
const path = require('path');
const fs = require('node:fs');
const { todo } = require("node:test");
const program = new Command();

function loadTodosAndIds () {
    let todoArr = JSON.parse(fs.readFileSync(`${__dirname}/`+`todos.json`, "utf-8"))
    let taskIdArr = [];
    for (const todo of todoArr) {
        taskIdArr.push(todo.taskId);
    }
    return { todoArr, taskIdArr };
}

program
.name('todos-cli')
.description('it does CRUD operations with todos and db is todos.json')
.version('1.0.0')

program
.command('add')
.description('add an object in the format { "taskId": <number> ,"task": <string> }')
.argument('<todoObject>', 'todo object to be added to the storage')
.action((todoObject, options) => {
    let { todoArr, taskIdArr } = loadTodosAndIds();
    // input validation should be here but fine, this is just a toy project, we're just building specific cli package skills
    let jsonTodoObject = JSON.parse(todoObject);
    if (taskIdArr.includes(jsonTodoObject.taskId)) {
        console.log("Task already created, use toggle command to update status or use update command to update the description");
    } else {
        jsonTodoObject["completedStatus"] = false;
        todoArr.push(jsonTodoObject);

        fs.writeFileSync(path.join(`${__dirname}/`+`todos.json`), JSON.stringify(todoArr, null, 2))
        console.log("successfully created task")
    }
})

program.parse()