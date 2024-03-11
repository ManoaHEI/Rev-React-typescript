import {useState} from "react";
import {nanoid} from "nanoid";
import "./TaskManager.css";

type TaskType = {
    taskTitle: string,
    taskId: string
}

export const TaskManager = () => {

    const [title, setTitle] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [tasks, setTasks] = useState([] as TaskType[]);

    const completeTask = (id: string) => {
        setTasks(tasks.filter((task) => task.taskId !== id));
    }

    const updateTask = (id: string, newTaskTitle: string) => {
        const newTask = tasks.slice();

        const index = tasks.findIndex((task) => task.taskId === id);

        newTask[index].taskTitle = newTaskTitle;

        setTasks(newTask);
    }

    const addTask = () => {

        if (title.length < 1) {
            return;
        }

        const newTask: TaskType = {
            taskId: nanoid(),
            taskTitle: title
        }

        setTasks((prev) => prev.concat(newTask));
        setTitle("");

    }

    const handleSearch = (keyword: string) => {
        setSearchKeyword(keyword);
    }

    const filteredTasks = tasks.filter((task) =>
        task.taskTitle.toLowerCase().includes(searchKeyword.toLowerCase())
    );

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
                {filteredTasks.map((task) => (
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