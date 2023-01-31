import {combineReducers, createStore} from "redux";
import {taskReducer} from "./task-reducer";
import {todolistReducer} from "./todolist-reducer";


export type AppRootType = ReturnType<typeof reducer>


const reducer = combineReducers({
    taskReducer:taskReducer,
    todolistReducer:todolistReducer
})

export const store = createStore(reducer)