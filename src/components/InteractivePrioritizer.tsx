import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, ArrowRight, CheckCircle, AlertCircle, Clock, Star } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  importance: 'high' | 'low' | null;
  urgency: 'high' | 'low' | null;
  category: 'do' | 'schedule' | 'delegate' | 'eliminate' | null;
}

const InteractivePrioritizer: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [step, setStep] = useState<'add' | 'categorize' | 'results'>('add');
  const [showTip, setShowTip] = useState(true);

  const addTask = () => {
    if (newTaskName.trim() === '') return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      name: newTaskName.trim(),
      importance: null,
      urgency: null,
      category: null
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskName('');
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startCategorizing = () => {
    if (tasks.length === 0) return;
    setStep('categorize');
    setCurrentTaskIndex(0);
  };

  const setImportance = (importance: 'high' | 'low') => {
    const updatedTasks = [...tasks];
    updatedTasks[currentTaskIndex] = {
      ...updatedTasks[currentTaskIndex],
      importance
    };
    setTasks(updatedTasks);
  };

  const setUrgency = (urgency: 'high' | 'low') => {
    const updatedTasks = [...tasks];
    updatedTasks[currentTaskIndex] = {
      ...updatedTasks[currentTaskIndex],
      urgency
    };
    setTasks(updatedTasks);
    
    // Automatically categorize the task based on importance and urgency
    const importance = updatedTasks[currentTaskIndex].importance;
    if (importance === 'high' && urgency === 'high') {
      updatedTasks[currentTaskIndex].category = 'do';
    } else if (importance === 'high' && urgency === 'low') {
      updatedTasks[currentTaskIndex].category = 'schedule';
    } else if (importance === 'low' && urgency === 'high') {
      updatedTasks[currentTaskIndex].category = 'delegate';
    } else if (importance === 'low' && urgency === 'low') {
      updatedTasks[currentTaskIndex].category = 'eliminate';
    }
    
    // Move to the next task or to results if all tasks are categorized
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      setStep('results');
    }
  };

  const resetPrioritizer = () => {
    setTasks([]);
    setNewTaskName('');
    setCurrentTaskIndex(0);
    setStep('add');
    setShowTip(true);
  };

  const currentTask = tasks[currentTaskIndex];
  
  const categorizedTasks = {
    do: tasks.filter(task => task.category === 'do'),
    schedule: tasks.filter(task => task.category === 'schedule'),
    delegate: tasks.filter(task => task.category === 'delegate'),
    eliminate: tasks.filter(task => task.category === 'eliminate')
  };

  return (
    <div className="max-w-3xl mx-auto">
      {step === 'add' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h2 className="text-2xl font-bold mb-4">Task Prioritization</h2>
          
          {showTip && (
            <div className="bg-primary-50 p-4 rounded-lg mb-6 relative">
              <button 
                onClick={() => setShowTip(false)}
                className="absolute top-2 right-2 text-primary-500 hover:text-primary-700"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-primary-800 mb-2">How to use this tool</p>
                  <p className="text-sm text-primary-700">
                    First, add all the tasks you need to prioritize. Then, you'll categorize each task 
                    based on its importance and urgency. The tool will help you determine which tasks 
                    to focus on first, which to schedule for later, which to delegate, and which to 
                    eliminate.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <label htmlFor="task-input" className="block text-sm font-medium text-neutral-700 mb-1">
              Add a task to prioritize
            </label>
            <div className="flex">
              <input
                id="task-input"
                type="text"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                placeholder="Enter a task..."
                className="flex-grow px-4 py-2 border border-neutral-300 rounded-l-lg focus:ring-primary-500 focus:border-primary-500"
              />
              <button
                onClick={addTask}
                disabled={newTaskName.trim() === ''}
                className="bg-primary-600 text-white px-4 py-2 rounded-r-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {tasks.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Your Tasks</h3>
              <ul className="space-y-2">
                {tasks.map((task) => (
                  <li 
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg"
                  >
                    <span>{task.name}</span>
                    <button 
                      onClick={() => removeTask(task.id)}
                      className="text-neutral-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <button
            onClick={startCategorizing}
            disabled={tasks.length === 0}
            className="w-full btn btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Prioritizing <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </motion.div>
      )}
      
      {step === 'categorize' && currentTask && (
        <motion.div
          key={currentTask.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Task {currentTaskIndex + 1} of {tasks.length}</span>
              <span className="text-sm font-medium">{Math.round(((currentTaskIndex + 1) / tasks.length) * 100)}%</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${((currentTaskIndex + 1) / tasks.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-white border border-neutral-200 rounded-lg p-4 mb-6">
            <h3 className="text-xl font-bold mb-4">"{currentTask.name}"</h3>
            
            {currentTask.importance === null ? (
              <div>
                <p className="mb-4">Is this task important?</p>
                <p className="text-sm text-neutral-500 mb-4">
                  Important tasks align with your values, goals, and responsibilities. They contribute to your long-term success and well-being.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setImportance('high')}
                    className="p-4 border border-green-200 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
                  >
                    <div className="flex flex-col items-center">
                      <Star className="h-8 w-8 text-green-600 mb-2" />
                      <span className="font-medium text-green-800">Yes, it's important</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setImportance('low')}
                    className="p-4 border border-blue-200 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    <div className="flex flex-col items-center">
                      <Star className="h-8 w-8 text-blue-600 mb-2" />
                      <span className="font-medium text-blue-800">No, it's less important</span>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="mb-4">Is this task urgent?</p>
                <p className="text-sm text-neutral-500 mb-4">
                  Urgent tasks require immediate attention. They have deadlines or time-sensitive consequences if not completed soon.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setUrgency('high')}
                    className="p-4 border border-red-200 rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
                  >
                    <div className="flex flex-col items-center">
                      <Clock className="h-8 w-8 text-red-600 mb-2" />
                      <span className="font-medium text-red-800">Yes, it's urgent</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setUrgency('low')}
                    className="p-4 border border-purple-200 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
                  >
                    <div className="flex flex-col items-center">
                      <Clock className="h-8 w-8 text-purple-600 mb-2" />
                      <span className="font-medium text-purple-800">No, it can wait</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
      
      {step === 'results' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6">Your Prioritized Tasks</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="bg-red-100 text-red-800 rounded-full p-1 mr-2">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-red-800">Do First</h3>
              </div>
              
              <p className="text-sm text-red-700 mb-3">Important and urgent tasks that require immediate attention.</p>
              
              <ul className="space-y-2">
                {categorizedTasks.do.length > 0 ? (
                  categorizedTasks.do.map((task) => (
                    <li 
                      key={task.id}
                      className="p-2 bg-white border border-red-100 rounded-lg text-neutral-700"
                    >
                      {task.name}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-red-600 italic">No tasks in this category</li>
                )}
              </ul>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 text-blue-800 rounded-full p-1 mr-2">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-blue-800">Schedule</h3>
              </div>
              
              <p className="text-sm text-blue-700 mb-3">Important but not urgent tasks that need planning.</p>
              
              <ul className="space-y-2">
                {categorizedTasks.schedule.length > 0 ? (
                  categorizedTasks.schedule.map((task) => (
                    <li 
                      key={task.id}
                      className="p-2 bg-white border border-blue-100 rounded-lg text-neutral-700"
                    >
                      {task.name}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-blue-600 italic">No tasks in this category</li>
                )}
              </ul>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="bg-yellow-100 text-yellow-800 rounded-full p-1 mr-2">
                  <ArrowRight className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-yellow-800">Delegate</h3>
              </div>
              
              <p className="text-sm text-yellow-700 mb-3">Urgent but less important tasks that could be delegated.</p>
              
              <ul className="space-y-2">
                {categorizedTasks.delegate.length > 0 ? (
                  categorizedTasks.delegate.map((task) => (
                    <li 
                      key={task.id}
                      className="p-2 bg-white border border-yellow-100 rounded-lg text-neutral-700"
                    >
                      {task.name}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-yellow-600 italic">No tasks in this category</li>
                )}
              </ul>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="bg-green-100 text-green-800 rounded-full p-1 mr-2">
                  <X className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-green-800">Eliminate</h3>
              </div>
              
              <p className="text-sm text-green-700 mb-3">Neither important nor urgent tasks that could be eliminated.</p>
              
              <ul className="space-y-2">
                {categorizedTasks.eliminate.length > 0 ? (
                  categorizedTasks.eliminate.map((task) => (
                    <li 
                      key={task.id}
                      className="p-2 bg-white border border-green-100 rounded-lg text-neutral-700"
                    >
                      {task.name}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-green-600 italic">No tasks in this category</li>
                )}
              </ul>
            </div>
          </div>
          
          <div className="bg-primary-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">Next Steps</h3>
            <ul className="list-disc list-inside text-sm text-neutral-700 space-y-1">
              <li><span className="font-medium">Do First:</span> Complete these tasks as soon as possible</li>
              <li><span className="font-medium">Schedule:</span> Set specific times in your calendar for these tasks</li>
              <li><span className="font-medium">Delegate:</span> Find someone who can help with these tasks</li>
              <li><span className="font-medium">Eliminate:</span> Consider whether these tasks are necessary at all</li>
            </ul>
          </div>
          
          <button
            onClick={resetPrioritizer}
            className="w-full btn btn-primary"
          >
            Prioritize New Tasks
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default InteractivePrioritizer;
