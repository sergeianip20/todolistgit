import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {
    AddActionCreate,
    CHangeFilterACtionCreate,
    CHangeTitleActionCreate,
    RemoveActionCreate,
    todolistReducer
} from "./state/todolist-reducer";
import {
    addTaskActionCreate,
    removeTaskActionCreate,
    statusTaskActionCreate,
    taskReducer,
    titleTaskActionCreate
} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {


    const dispatch = useDispatch()
    const todolists = useSelector<AppRootType, Array<TodolistType>>(state => state.todolistReducer)

    const  changeFilter = useCallback( (value: FilterValuesType, todolistId: string) => {

        dispatch(CHangeFilterACtionCreate(value, todolistId))
    }, [dispatch])

    const  removeTodolist= useCallback( (id: string) => {

        dispatch(RemoveActionCreate(id))
    },[dispatch])

    const  changeTodolistTitle = useCallback((id: string, title: string) => {

        dispatch(CHangeTitleActionCreate(id, title))

    }, [dispatch]
)

     const  addTodolist = useCallback ( (title: string) =>  {

        dispatch(AddActionCreate(title))
    },
    [dispatch] )
    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {


                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        changeFilter={changeFilter}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }

        </div>
    );
}

export default AppWithRedux;
