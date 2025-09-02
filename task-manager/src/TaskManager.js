import { useEffect, useState } from "react";
import './TaskManager.css';

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [filter, setFilter] = useState('All');

    // Load from localStorage on mount
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    // Save to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newTask = {
            id: Date.now(),
            title,
            description,
            completed: false,
        };

        setTasks([...tasks, newTask]);
        setTitle('');
        setDescription('');
    };

    const toggleComplete = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'Completed') return task.completed;
        if (filter === 'Pending') return !task.completed;
        return true;
    });

    return (
        <div className="container py-5">
            <h1 className="task-title text-center mb-4">Task Manager</h1>

            <div className="task-container">
                <form onSubmit={addTask} className="card p-4 mb-4 shadow-sm">
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Task Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <textarea
                            placeholder="Task Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-sm btn-primary w-100">
                        Add Task
                    </button>
                </form>
            </div>
            <br />
            <div className="task-container py-3">
                <div className="bg-white">
                    <div className="d-flex justify-content-center mb-4 gap-2">
                        {['All', 'Completed', 'Pending'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`btn ${filter === f ? 'btn-primary' : 'btn-outline-secondary'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <ul className="list-group">
                        {filteredTasks.length ? (
                            filteredTasks.map((task) => (
                                <li
                                    key={task.id}
                                    className="list-group-item d-flex justify-content-between align-items-start"
                                >
                                    <div>
                                        <h6
                                            className={`mb-1 ${task.completed
                                                ? 'text-decoration-line-through text-muted'
                                                : ''
                                                }`}
                                        >
                                            {task.title}
                                        </h6>
                                        <small className="text-muted">{task.description}</small>
                                    </div>
                                    <button
                                        onClick={() => toggleComplete(task.id)}
                                        className={`btn btn-sm ${task.completed ? 'btn-success disabled' : 'btn-warning'
                                            }`}
                                        title="Click To Done" >
                                        {task.completed ? 'Done' : 'Pending'}
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p className="text-center text-muted mt-3">No tasks found.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default TaskManager