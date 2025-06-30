import  { useEffect, useState } from "react";


export default function AddTask({ isOpen, onClose, onSubmit, initialData }) {
    const [task, setTask] = useState({
        title: "",
        description: "",
        dueDate: "",
        dueTime: "",
    });

    useEffect(() => {
        if (initialData) {
            setTask(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(task);
        onClose();
        setTask({ title: "", description: "", dueDate: "", dueTime: "" });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
            <div className="bg-white rounded-xl p-6 w-[95%] max-w-md shadow-xl relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-xl">&times;</button>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    {initialData ? "Edit Task" : "Add New Task"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={task.title}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-md px-4 py-2"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={task.description}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-md px-4 py-2 resize-none"
                    />
                    <div className="flex gap-4">
                        <input
                            type="date"
                            name="dueDate"
                            value={task.dueDate}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-md px-4 py-2"
                        />
                        <input
                            type="time"
                            name="dueTime"
                            value={task.dueTime}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-md px-4 py-2"
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-black text-white rounded-md">
                            {initialData ? "Update" : "Add Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
