#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todolist = [];
let condition = true;
// Print welcome message
console.log(chalk.bold.rgb(204, 204, 204)(`\n  \t\t <<<================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<=========>>> ${chalk.bold.hex(`89999ff`)(`welcome to Code with IQRA - Todo-List App  <<<========>>>`)}`));
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t <<<===================================>>>\n`));
let main = async () => {
    while (condition) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option you want to do:",
                choices: ["Add Task", "Delete Task", "Update Task", "View Todo-list", "Exit"],
            }
        ]);
        if (option.choice === "Add Task") {
            await addTask();
        }
        else if (option.choice === "Delete Task") {
            await deleteTask();
        }
        else if (option.choice === "Update Task") {
            await updateTask(); // Update task functionality added
        }
        else if (option.choice === "View Todo-list") {
            await viewTask();
        }
        else if (option.choice === "Exit") {
            condition = false;
        }
    }
};
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "Enter your new task:",
        }
    ]);
    todolist.push(newTask.task);
    console.log(`\n${newTask.task} task added successfully in Todo-List\n`);
};
// Function to view all Todo-list tasks
let viewTask = async () => {
    console.log("\nYour Todo-list:\n");
    todolist.forEach((task, index) => {
        console.log(`${index}: ${task}`);
    });
};
// Function to delete a task from the list
let deleteTask = async () => {
    if (todolist.length === 0) {
        console.log("\nNo tasks to delete.\n");
        return;
    }
    await viewTask();
    let taskindex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index no.' of the task you want to delete:",
        }
    ]);
    if (taskindex.index >= 0 && taskindex.index < todolist.length) {
        let deletedTask = todolist.splice(taskindex.index, 1);
        console.log(`\n${deletedTask} task has been deleted successfully\n`);
    }
    else {
        console.log("\nInvalid index. Please try again.\n");
    }
};
// Function to update a task in the list
let updateTask = async () => {
    if (todolist.length === 0) {
        console.log("\nNo tasks to update.\n");
        return;
    }
    await viewTask();
    let taskindex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index no.' of the task you want to update:",
        }
    ]);
    if (taskindex.index >= 0 && taskindex.index < todolist.length) {
        let updatedTask = await inquirer.prompt([
            {
                name: "task",
                type: "input",
                message: "Enter the updated task:",
            }
        ]);
        todolist[taskindex.index] = updatedTask.task;
        console.log(`\nTask at index ${taskindex.index} has been updated successfully to ${updatedTask.task}\n`);
    }
    else {
        console.log("\nInvalid index. Please try again.\n");
    }
};
main();
