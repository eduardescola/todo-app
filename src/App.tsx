import React, { useState, useEffect } from 'react';
import { CheckCircle, Trash2, Edit, AlertCircle, Info, CheckCheck } from 'lucide-react';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Task {
  _id: string;
  text: string;
  completed: boolean;
  priority: number;
}

const priorityColors = [
  'border-l-4 border-gray-400',    // 0
  'border-l-4 border-yellow-400',  // 1
  'border-l-4 border-orange-500',  // 2
  'border-l-4 border-red-600',     // 3
  'border-l-4 border-pink-600',    // 4
  'border-l-4 border-purple-600',  // 5
  'border-l-4 border-blue-600',    // 6
  'border-l-4 border-teal-600',    // 7
  'border-l-4 border-green-600',   // 8
  'border-l-4 border-indigo-600',  // 9
];

// Custom toast component functions
const ToastSuccess = ({ message }: { message: string }) => (
  <div className="flex items-center">
    <CheckCheck className="mr-2 text-green-500" size={18} />
    <span>{message}</span>
  </div>
);

const ToastError = ({ message }: { message: string }) => (
  <div className="flex items-center">
    <AlertCircle className="mr-2 text-red-500" size={18} />
    <span>{message}</span>
  </div>
);

const ToastInfo = ({ message }: { message: string }) => (
  <div className="flex items-center">
    <Info className="mr-2 text-blue-500" size={18} />
    <span>{message}</span>
  </div>
);

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Custom toast functions
  const showSuccessToast = (message: string) => {
    toast.success(<ToastSuccess message={message} />, {
      icon: false
    });
  };

  const showErrorToast = (message: string) => {
    toast.error(<ToastError message={message} />, {
      icon: false
    });
  };

  const showInfoToast = (message: string) => {
    toast.info(<ToastInfo message={message} />, {
      icon: false
    });
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/todos');
        const data = await res.json();
        setTasks(data.sort((a: Task, b: Task) => b.priority - a.priority));
      } catch (error) {
        console.error('Error al cargar las tareas:', error);
        showErrorToast('Error al cargar las tareas');
      } finally {
        setLoading(false);
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
        setTasks([...tasks, newTask].sort((a, b) => b.priority - a.priority));
        setTask('');
        showSuccessToast('¡Tarea agregada exitosamente!');
      } catch (error) {
        console.error('Error al agregar la tarea:', error);
        showErrorToast('Error al agregar la tarea');
      }
    }
  };

  const handleCompleteTask = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/todos/${id}`, { method: 'PATCH' });
      const updatedTask = await res.json();
      setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)).sort((a, b) => b.priority - a.priority));
      showSuccessToast('¡Tarea completada!');
    } catch (error) {
      console.error('Error al completar la tarea:', error);
      showErrorToast('Error al completar la tarea');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter((t) => t._id !== id).sort((a, b) => b.priority - a.priority));
      showInfoToast('¡Tarea eliminada!');
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      showErrorToast('Error al eliminar la tarea');
    }
  };

  const handleEditTask = async (id: string, newText: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/todos/${id}/edit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newText }),
      });
      const updatedTask = await res.json();
      setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)).sort((a, b) => b.priority - a.priority));
      showSuccessToast('¡Tarea editada!');
    } catch (error) {
      console.error('Error al editar la tarea:', error);
      showErrorToast('Error al editar la tarea');
    }
  };

  const incompleteTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600'} min-h-screen py-10 px-4 transition-all`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-10 drop-shadow-lg">Mi Todo App</h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className={`flex-1 p-4 rounded-lg ${darkMode ? 'text-white bg-gray-800 border-gray-600' : 'text-gray-800 bg-white border-gray-300'} focus:outline-none focus:ring-4 focus:ring-pink-300 shadow-md transition`}
            placeholder="Agrega una tarea..."
          />
          <button
            onClick={handleAddTask}
            className="bg-white text-pink-600 font-bold px-6 py-4 rounded-lg hover:bg-pink-100 transition shadow-md"
          >
            Agregar
          </button>
        </div>

        {/* Modo Oscuro / Claro */}
        <button onClick={() => setDarkMode(!darkMode)} className="bg-blue-600 text-white p-2 rounded-full absolute top-5 right-5">
          {darkMode ? '🌙' : '🌞'}
        </button>

        <div className="space-y-8">
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="spinner-border animate-spin text-pink-600" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
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
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors duration-200"
                          >
                            <CheckCircle size={20} />
                          </button>
                          <button
                            onClick={() => handleEditTask(task._id, prompt('Edita la tarea:', task.text) || task.text)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg transition-colors duration-200"
                          >
                            <Edit size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors duration-200"
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
                          className="bg-red-400 hover:bg-red-500 text-white px-3 py-2 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 size={20} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? "dark" : "light"}
          transition={Zoom}
        />
      </div>
    </div>
  );
};

export default App;