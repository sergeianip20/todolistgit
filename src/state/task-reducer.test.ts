import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {
    addTaskActionCreate,
    removeTaskActionCreate, statusTaskActionCreate,
    taskReducer,
    titleTaskActionCreate
} from "./task-reducer";
import {AddActionCreate, RemoveActionCreate} from "./todolist-reducer";

test('correct remove task', () => {
        let startState: TasksStateType = {
            'todolistId1': [
                {id: '1', title: "HTML&CSS", isDone: true},
                {id: '2', title: "JS", isDone: true},
                {id: '3', title: "CSS", isDone: true}
            ],
            'todolistId2': [
                {id: '1', title: "Milk", isDone: true},
                {id: '2', title: "React Book", isDone: true},
                {id: '3', title: "React Book", isDone: true}
            ]
        }
        const action = removeTaskActionCreate('2', 'todolistId2')
        const endState = taskReducer(startState, action)

        expect(endState['todolistId1'].length).toBe(3)
        expect(endState['todolistId2'].length).toBe(2)

    }
)
test('addTask correct ', () => {
    let startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "CSS", isDone: true}
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "React Book", isDone: true},
            {id: '3', title: "React Book", isDone: true}
        ]
    }
    const newTitle = 'hello world'
    const action = addTaskActionCreate(newTitle, 'todolistId1')
    const endState = taskReducer(startState, action)
    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId2'].length).toBe(3)
})
test('changeFilter correct', () => {
    let startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "CSS", isDone: true}
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "React Book", isDone: true},
            {id: '3', title: "React Book", isDone: true}
        ]
    }
    const newTitle = 'hello world'
    const action = titleTaskActionCreate(newTitle, '1', 'todolistId2')
    const endState = taskReducer(startState, action)
    expect(endState['todolistId1'][0].title).toBe("HTML&CSS")
    expect(endState['todolistId2'][0].title).toBe(newTitle)
})
test('status correct task', ()=> {
    let startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "CSS", isDone: true}
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "React Book", isDone: true},
            {id: '3', title: "React Book", isDone: true}
        ]
    }
    let nowDone = false
    const action = statusTaskActionCreate('1', nowDone, 'todolistId2')
    const endState = taskReducer(startState, action)

    expect(endState['todolistId1'][0].isDone).toBe(true)
    expect(endState['todolistId2'][0].isDone).toBe(false)
})
test('correct todolisid task', ()=> {
    let startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "CSS", isDone: true}
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "React Book", isDone: true},
            {id: '3', title: "React Book", isDone: true}
        ]
    }
const action = AddActionCreate('new todolist',)
    const endState = taskReducer(startState, action)
    const keys = Object.keys(endState)
    const newKeys = keys.find(k => k != 'todolistId1' && k != 'todolistId2' )
    if(!newKeys){
        throw Error('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKeys]).toEqual([])
})
test('/task remove todlist ', ()=> {
    let startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "CSS", isDone: true}
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "React Book", isDone: true},
            {id: '3', title: "React Book", isDone: true}
        ]
    }
    const action = RemoveActionCreate('todolistId2')
    const endState = taskReducer(startState, action)
    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})