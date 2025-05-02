import React, { useState, useEffect } from 'react';
import { CheckCircle, Trash2 } from 'lucide-react';

interface Task {
  _id: string;
  text: string;
  completed: boolean;
  priority: number;
}

const priorityColors = [
  'border-l-4 border-gray-400',
  'border-l-4 border-yellow-400',
  'border-l-4 border-orange-500',
  'border-l-4 border-red-600',
];

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/todos');
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error('Error al cargar las tareas:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (task.trim() !== '') {
      try {
        const res = await fetch('http://localhost:5000/api/todos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: task }),
        });

        const newTask = await res.json();
        setTasks([...tasks, newTask]);
        setTask('');
      } catch (error) {
        console.error('Error al agregar la tarea:', error);
      }
    }
  };

  const handleCompleteTask = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'PATCH',
      });

      const updatedTask = await res.json();
      setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)));
    } catch (error) {
      console.error('Error al completar la tarea:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const incompleteTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-10 drop-shadow-lg">Mi Todo App</h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 p-4 rounded-lg text-gray-800 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-pink-300 shadow-md"
            placeholder="Agrega una tarea..."
          />
          <button
            onClick={handleAddTask}
            className="bg-white text-pink-600 font-bold px-6 py-4 rounded-lg hover:bg-pink-100 transition shadow-md"
          >
            Agregar
          </button>
        </div>

        <div className="space-y-8">
          {incompleteTasks.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Pendientes</h2>
              <ul className="space-y-4">
                {incompleteTasks.map((task) => (
                  <li
                    key={task._id}
                    className={`flex items-center justify-between p-4 rounded-lg bg-white text-gray-900 shadow-md transition ${priorityColors[task.priority % priorityColors.length]}`}
                  >
                    <span className="text-lg">{task.text}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCompleteTask(task._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg"
                      >
                        <CheckCircle size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {completedTasks.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Completadas</h2>
              <ul className="space-y-4">
                {completedTasks.map((task) => (
                  <li
                    key={task._id}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-200 text-gray-500 line-through shadow-sm"
                  >
                    <span className="text-lg">{task.text}</span>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="bg-red-400 hover:bg-red-500 text-white px-3 py-2 rounded-lg"
                    >
                      <Trash2 size={20} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
