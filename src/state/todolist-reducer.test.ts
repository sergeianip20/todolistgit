import { v1 } from "uuid";

import { FilterValuesType, TodolistType } from "../AppWithRedux";

import {

    todolistReducer,

    RemoveActionCreate,

    AddActionCreate,

    CHangeFilterACtionCreate,

    CHangeTitleActionCreate

} from "./todolist-reducer";

test("correct todolist should be removed", () => {

    let todolistId1 = v1();

    let todolistId2 = v1();

    const startState: Array<TodolistType> = [

        { id: todolistId1, title: "what to learn", filter: "all" },

        { id: todolistId2, title: "what to buy", filter: "all" }

    ];



    const endState = todolistReducer(startState, RemoveActionCreate(todolistId1));

    expect(endState.length).toBe(1);

    expect(endState[0].id).toBe(todolistId2);

});
test("correct todolist should be added", () => {

    let todolistId1 = v1();

    let todolistId2 = v1();

    let newTodoListTitle = "new todolist";

    const startState: Array<TodolistType> = [

        {id: todolistId1, title: "what to learn", filter: "all"},

        {id: todolistId2, title: "what to buy", filter: "all"}

    ];


    const endState = todolistReducer(
        startState,

        AddActionCreate(newTodoListTitle)
    );

    expect(endState.length).toBe(3);

    expect(endState[2].title).toBe(newTodoListTitle);
    expect(endState[2].filter).toBe("all");
})
test("correct filter of todolist should be changed", () => {

    let todolistId1 = v1();

    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodolistType> = [

        { id: todolistId1, title: "what to learn", filter: "all" },

        { id: todolistId2, title: "what to buy", filter: "all" }

    ];
    const endState = todolistReducer(

        startState,

        CHangeFilterACtionCreate(newFilter,todolistId2)

    );

    expect(endState[0].filter).toBe("all");

    expect(endState[1].filter).toBe("completed");
});
test("correct todolist should its name", () => {

    let todolistId1 = v1();

    let todolistId2 = v1();

    let newTodoListTitle = "new todolist";

    const startState: Array<TodolistType> = [

        { id: todolistId1, title: "what to learn", filter: "all" },

        { id: todolistId2, title: "what to buy", filter: "all" }

    ];



    const endState = todolistReducer(

        startState,

        CHangeTitleActionCreate(todolistId2, newTodoListTitle)

    );

    expect(endState[0].title).toBe("what to learn");
    expect(endState[1].title).toBe(newTodoListTitle);

});