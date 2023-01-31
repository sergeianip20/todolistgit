import {FilterValuesType, TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddAction, RemoveAction, todolistId1, todolistId2} from "./todolist-reducer";

const ADD_TASK = 'ADD_TASK'
const REMOVE_TASK = 'REMOVE_TASK'
const CHANGE_TITLE = 'CHANGE_TITLE'
const CHANGE_STATUS = 'CHANGE_STATUS'

type  addTaskAction = ReturnType<typeof addTaskActionCreate>
type removeTaskAction = ReturnType<typeof removeTaskActionCreate>
type titleTaskAction = ReturnType<typeof titleTaskActionCreate>
type statusTaskAction = ReturnType<typeof statusTaskActionCreate>

type ActionType = addTaskAction | removeTaskAction | statusTaskAction | titleTaskAction| AddAction | RemoveAction

let initialState:TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}




export const taskReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case ADD_TASK:
            let task = {id: v1(), title: action.title, isDone: false};
            let stateCopy1 = {...state}
            let todolisTask = state[action.todolistId]
            stateCopy1[action.todolistId] = [task, ...todolisTask]
            return stateCopy1
        case REMOVE_TASK :
            let stateCopy = {...state}
            let todolist = state[action.todolistId]
            const newTask = todolist.filter(e => e.id !== action.id)
            stateCopy[action.todolistId] = newTask
            return stateCopy


        case CHANGE_TITLE:
            let stateCopy2 = {...state}
            let tasktodolist = state[action.todolistId]
            let NewTask = tasktodolist.find((t:any) => t.id === action.taskId)
            if (NewTask) {
                NewTask.title = action.title
            }
            return stateCopy2
        case CHANGE_STATUS :
            let stateCopy3 = {...state}
            let statustodolist = stateCopy3[action.todolistId]
            stateCopy3[action.todolistId] = statustodolist.map((e:any) => e.id === action.taskId ? {...e, isDone: action.isDone}: e )

            return stateCopy3
        case'ADD-TODOLIST' :
            let stateCope = {...state}
            stateCope[action.todolistId] = []
            return stateCope
        case 'REMOVE-TODOLIST': {
            let stateCopy = {...state}
             delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const addTaskActionCreate = (title: string, todolistId: string) => {
    return {type: ADD_TASK, title, todolistId} as const
}
export const removeTaskActionCreate = (id: string, todolistId: string) => {
    return {type: REMOVE_TASK, id, todolistId} as const
}
export const titleTaskActionCreate = (title: string, taskId: string, todolistId: string) => {
    return {type: CHANGE_TITLE, title, taskId, todolistId} as const
}
export const statusTaskActionCreate = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: CHANGE_STATUS, taskId, isDone, todolistId} as const
}