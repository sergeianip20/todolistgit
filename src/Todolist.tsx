import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './AddTitlespan';
import {Button} from '@material-ui/core'
import {Checkbox, IconButton} from "@mui/material";
import { Delete } from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "./state/store";
import {
    addTaskActionCreate,
    removeTaskActionCreate,
    statusTaskActionCreate,
    titleTaskActionCreate
} from "./state/task-reducer";
import {TasksStateType} from "./AppWithRedux";



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId:string) => void

    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType

}

export const  Todolist = React.memo ((props: PropsType)=> {
    const dispatch =  useDispatch()
    const tasks = useSelector<AppRootType,Array<TaskType> >(state => state.taskReducer[props.id])





    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {


    }



    const removeTodolist = useCallback( () => {
        props.removeTodolist(props.id);
    },[props.removeTodolist, props.id])
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    let allTodolistTasks = tasks;
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
    }

    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />

            <IconButton onClick={removeTodolist}>
                <Delete  />
            </IconButton>
        </h3>
        <AddItemForm addItem={(title)=> {
        dispatch(addTaskActionCreate(title, props.id))}
        }/>
        <ul>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => dispatch(removeTaskActionCreate(t.id, props.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(statusTaskActionCreate(t.id, newIsDoneValue, props.id))

                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(titleTaskActionCreate(t.id, newValue, props.id))
                    }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox  onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />

                        <IconButton onClick={onClickHandler}>
                            <Delete  />
                        </IconButton>

                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "contained" : "text"} className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button   variant={props.filter === 'active' ? "contained" : "text"} color={'primary'} className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? "contained" : "text"} color={'secondary'} className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}


)
