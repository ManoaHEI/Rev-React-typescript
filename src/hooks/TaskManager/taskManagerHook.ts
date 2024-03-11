import {useState} from "react";

type TaskType = {
    taskTitle: string,
    taskId: string
}

export function useTaskManager() {

    const [tasks, setTasks] = useState([] as TaskType[]);
    const [searchKeyword, setSearchKeyword] = useState("");

    function saveTask(task: TaskType) {
        setTasks(prev =>  [...prev, task]);
    }

    function deleteTask(id: string) {
        setTasks(prev => prev.filter(task => task.taskId !== id));
    }

    function searchTask(keyword: string) {
        setSearchKeyword(keyword);
    }

    return {
        saveTask,
        deleteTask,
        searchTask,
        task: searchKeyword !== "" ? tasks.filter(task =>
            task
                .taskTitle
                .toLowerCase()
                .includes(searchKeyword.toLowerCase())
        ): tasks
    }

}