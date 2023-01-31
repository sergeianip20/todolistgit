import {TasksStateType, TodolistType} from "../AppWithRedux";
import {AddActionCreate, todolistReducer} from "./todolist-reducer";
import {taskReducer} from "./task-reducer";

test('todolist and task', ()=> {
    const startState: TasksStateType = {}
    const startTodolist: Array<TodolistType> = []
    const action = AddActionCreate('new todolist')
    const endTaskState = taskReducer(startState, action)
    const endTodolisState = todolistReducer(startTodolist, action)
    const keys = Object.keys(endTaskState)
    const idFormTask = keys[0]
    const idFormTodolist = endTodolisState[0].id
    expect(idFormTask).toBe(action.todolistId)
    expect(idFormTodolist).toBe(action.todolistId)
})