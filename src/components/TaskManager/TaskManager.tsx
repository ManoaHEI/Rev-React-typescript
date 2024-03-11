import {useState} from "react";
import {nanoid} from "nanoid";
import {useTaskManager} from "../../hooks/TaskManager/taskManagerHook.ts";

import "./TaskManager.css";

type TaskType = {
    taskTitle: string,
    taskId: string
}

export const TaskManager = () => {

    const [title, setTitle] = useState("");
    const {
        saveTask,
        task,
        deleteTask,
        searchTask
    } = useTaskManager();

    const completeTask = (id: string) => {
        deleteTask(id);
    }

    const updateTask = (id: string, newTaskTitle: string) => {
        saveTask({taskId: id, taskTitle: newTaskTitle});
    }

    const addTask = () => {

        if (title.length < 1) {
            return;
        }

        const newTask: TaskType = {
            taskId: nanoid(),
            taskTitle: title
        }

        saveTask(newTask);

        setTitle("");

    }

    const handleSearch = (keyword: string) => {
        searchTask(keyword);
    }

    return (
        <div className="container">
            <h1>Task Manager</h1>

            <div>
                <input
                    type="text"
                    onChange={e =>
                        handleSearch(e.target.value)
                    }
                    placeholder="Search Task"
                />
            </div>

            <div className="task">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />

                <button onClick={addTask}>Add Task</button>
            </div>

            <ul className="container">
                {task.map((task) => (
                    <li key={task.taskId} className="task">
                        <div className="task">
                            <input
                                type="text"
                                placeholder="Add new task"
                                value={task.taskTitle}
                                onChange={(e) => updateTask(task.taskId, e.target.value)}
                            />
                            <button onClick={() => completeTask(task.taskId)}>Done</button>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );

}