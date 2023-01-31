import {FilterValuesType} from '../AppWithRedux'

import {v1} from "uuid";

import {TodolistType} from '../AppWithRedux';

type StatetodoTYpe = {

    state: Array<arraystate>

};

type arraystate = {

    id: string;

    title: string;

    filter: string;

}
export type RemoveAction = {

    type: "REMOVE-TODOLIST";

    id: string;

};

export type AddAction = {

    type: "ADD-TODOLIST";

    title: string;
    todolistId: string
};

export type CHangeTitleACtion = {

    type: "CHANGE-TODOLIST-TITLE";

    id: string;

    title: string;

};
export type changeFilterAction = {

    type: "CHANGE-TODOLIST-FILTER";

    id: string;

    filter: "all" | "active" | "completed";

};

export type ActionTypes =

    | RemoveAction

    | AddAction
    | changeFilterAction

    | CHangeTitleACtion
export let todolistId1 = v1();
export let todolistId2 = v1();
const initialState: Array<TodolistType>  =[
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
]




export const todolistReducer = (state: TodolistType[] = initialState, action: ActionTypes): TodolistType[] => {

    switch (action.type) {

        case'REMOVE-TODOLIST': {

            return state.filter((tl) => tl.id != action.id);

        }

        case 'ADD-TODOLIST': {

            return [

                ...state, {


                    id: action.todolistId,

                    title: action.title,

                    filter: "all"

                }

            ];

        }

        case "CHANGE-TODOLIST-FILTER": {

            const todolistfilter = state.find((tl) => tl.id === action.id);

            if (todolistfilter) {

                todolistfilter.filter = action.filter;

            }
            return [...state]
        }
        case "CHANGE-TODOLIST-TITLE": {

            const todolist = state.find((tl) => tl.id === action.id);


            if (todolist) {


                todolist.title = action.title;

            }

            return [...state];

        }


        default:

            return state

    }

};

export const RemoveActionCreate = (todolistId: string): RemoveAction => {

    return {type: 'REMOVE-TODOLIST', id: todolistId}

}

export const AddActionCreate = (
    title: string
): AddAction => {

    return {type: "ADD-TODOLIST", title:title, todolistId: v1()};

};
export const CHangeFilterACtionCreate = (
    filter: FilterValuesType,
    todolistId: string

): changeFilterAction => {

    return {type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: filter};

};
export const CHangeTitleActionCreate = (
    todolistId: string,
    title: string
): CHangeTitleACtion => {

    return {type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: title};

};