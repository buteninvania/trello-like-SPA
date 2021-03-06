import React, {useReducer} from 'react';
import './../app/App.css';
import './css/animations.css'
import {TodoList} from '../components/todolist/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from '../components/add-item-form/AddItemForm';
import {addTaskAC, removeTaskAC, taskReducer, updateTaskAC} from '../state/task-reducer/task-reducer';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListReducer
} from '../state/todolist-reducer/todolist-reducer';
import {TaskPrioritys, TaskStatuses, todolistAPI} from '../api/todolist-api';
import {FilterType} from '../state/todolist-reducer/todolist-reducer.types';

function AppWitchReducer() {

    const toDoListId_01 = v1()

    const [tasks, taskDispatch] = useReducer(taskReducer, {
        [toDoListId_01]: [{
            id: v1(), title: 'Learn typescript', status: TaskStatuses.InProgress,
            order: 0, todoListId: toDoListId_01, addedDate: '', description: '',
            completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''
        }]
    })

    const addTask = (title: string, toDoListId: string) => {
        todolistAPI.createTask(toDoListId, title)
            .then(res => {
                const task = res.data.item
                taskDispatch(addTaskAC(toDoListId, task))
            })

    }
    const removeTask = (id: string, toDoListId: string) => taskDispatch(removeTaskAC(id, toDoListId))
    const changeIsDoneTask = (id: string, toDoListId: string, status: TaskStatuses) => taskDispatch(updateTaskAC(id, toDoListId, {status}))
    const changeTaskTitle = (id: string, toDoListId: string, title: string) => taskDispatch(updateTaskAC(id, toDoListId, {title}))

    const [toDoLists, todoListDispatch] = useReducer(todoListReducer, [{
        id: toDoListId_01, title: 'What to learn', filter: 'all', addedDate: '', order: 0
    },])

    const addToDoList = (title: string) => {
        const todolist = {id: toDoListId_01, title: 'What to learn', filter: 'all', addedDate: '', order: 0}
        const action = addTodoListAC(todolist)
        todoListDispatch(action)
        taskDispatch(action)
    }
    const removeToDoList = (id: string) => {
        todoListDispatch(removeTodoListAC(id))
        taskDispatch(removeTodoListAC(id))
    }
    const changeFilter = (filter: FilterType, toDoListId: string) => todoListDispatch(changeTodoListFilterAC(toDoListId, filter))
    const changeToDoListTitle = (id: string, title: string) => todoListDispatch(changeTodoListTitleAC(title, id))

    return (
        <div className="app-wrapper">
            <AddItemForm addItem={addToDoList}/>
            <div className="todolist-wrapper">
                {toDoLists.map(toDoList => {
                    const filteredTask = toDoList.filter === 'active' ? tasks[toDoList.id].filter(t => t.status === TaskStatuses.InProgress)
                        : toDoList.filter === 'completed' ? tasks[toDoList.id].filter(t => t.status === TaskStatuses.Completed) : tasks[toDoList.id]
                    return <TodoList key={toDoList.id} id={toDoList.id}
                                     filter={toDoList.filter} title={toDoList.title}
                                     tasks={filteredTask} removeToDoList={removeToDoList}
                                     changeFilter={changeFilter} removeTask={removeTask}
                                     addTask={addTask} changeTaskTitle={changeTaskTitle}
                                     changeToDoListTitle={changeToDoListTitle} changeIsDone={changeIsDoneTask}
                    />
                })}
            </div>
        </div>
    );
}

export default AppWitchReducer;

function useDispatch<T>(arg0: { [x: string]: { id: string; title: string; isDone: boolean; }[]; }): [any, any] {
    throw new Error('Function not implemented.');
}

