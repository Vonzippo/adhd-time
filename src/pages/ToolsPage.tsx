import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckSquare, Bell, ArrowRight, Play, Pause, RefreshCw } from 'lucide-react';

const ToolsPage: React.FC = () => {
  // Pomodoro Timer State
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [timerMode, setTimerMode] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: number | null = null;
    
    if (isActive && !isPaused) {
      interval = window.setInterval(() => {
        setTime((time) => {
          if (time <= 1) {
            // Timer finished
            setIsPaused(true);
            // Switch modes
            if (timerMode === 'work') {
              setTimerMode('break');
              return 5 * 60; // 5 minute break
            } else {
              setTimerMode('work');
              return 25 * 60; // Back to 25 minute work session
            }
          }
          return time - 1;
        });
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, timerMode]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(true);
    setTime(timerMode === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Habit Tracker State
  const [habits, setHabits] = useState([
    { id: 1, name: 'Take medication', completed: false },
    { id: 2, name: 'Exercise for 20 minutes', completed: false },
    { id: 3, name: 'Plan tomorrow\'s tasks', completed: false },
    { id: 4, name: 'Drink water', completed: false },
    { id: 5, name: 'Practice mindfulness', completed: false }
  ]);

  const toggleHabit = (id: number) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const completedHabits = habits.filter(habit => habit.completed).length;
  const habitProgress = (completedHabits / habits.length) * 100;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-50 py-16">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-6">ADHD Tools</h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Practical tools designed to help you manage your ADHD symptoms and improve your daily life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="section">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pomodoro Timer */}
            <motion.div 
              className="card"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-6">
                <Clock className="h-6 w-6 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold">Pomodoro Timer</h2>
              </div>
              
              <div className="mb-6">
                <p className="text-neutral-600 mb-4">
                  The Pomodoro Technique helps you focus for short periods with regular breaks. Great for ADHD brains!
                </p>
                
                <div className="bg-neutral-100 p-6 rounded-lg text-center mb-6">
                  <div className="text-4xl font-bold mb-2">
                    {formatTime(time)}
                  </div>
                  <div className="text-sm text-neutral-600 mb-4">
                    {timerMode === 'work' ? 'Focus Time' : 'Break Time'}
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    {isPaused ? (
                      <button 
                        onClick={handleStart}
                        className="btn btn-primary py-2 px-4"
                      >
                        <Play className="h-5 w-5 mr-1" />
                        Start
                      </button>
                    ) : (
                      <button 
                        onClick={handlePause}
                        className="btn btn-outline py-2 px-4"
                      >
                        <Pause className="h-5 w-5 mr-1" />
                        Pause
                      </button>
                    )}
                    
                    <button 
                      onClick={handleReset}
                      className="btn bg-neutral-200 text-neutral-700 hover:bg-neutral-300 py-2 px-4"
                    >
                      <RefreshCw className="h-5 w-5 mr-1" />
                      Reset
                    </button>
                  </div>
                </div>
                
                <div className="bg-primary-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">How to use:</h3>
                  <ol className="list-decimal list-inside text-sm text-neutral-700 space-y-1">
                    <li>Work focused for 25 minutes</li>
                    <li>Take a 5-minute break</li>
                    <li>Repeat the cycle</li>
                    <li>After 4 cycles, take a longer break (15-30 minutes)</li>
                  </ol>
                </div>
              </div>
            </motion.div>
            
            {/* Habit Tracker */}
            <motion.div 
              className="card"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-6">
                <CheckSquare className="h-6 w-6 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold">Daily Habit Tracker</h2>
              </div>
              
              <div className="mb-6">
                <p className="text-neutral-600 mb-4">
                  Track your daily habits to build consistency and routine, which is especially helpful for ADHD management.
                </p>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{completedHabits} of {habits.length} completed</span>
                    <span className="text-sm font-medium">{Math.round(habitProgress)}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2.5">
                    <div 
                      className="bg-secondary-500 h-2.5 rounded-full transition-all duration-500" 
                      style={{ width: `${habitProgress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {habits.map((habit) => (
                    <div 
                      key={habit.id}
                      className="flex items-center p-3 bg-white border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={habit.completed}
                        onChange={() => toggleHabit(habit.id)}
                        className="h-5 w-5 text-primary-600 rounded border-neutral-300 focus:ring-primary-500"
                      />
                      <span className={`ml-3 ${habit.completed ? 'line-through text-neutral-400' : 'text-neutral-700'}`}>
                        {habit.name}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-primary-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Tips for habit building:</h3>
                  <ul className="list-disc list-inside text-sm text-neutral-700 space-y-1">
                    <li>Start with just 1-2 habits at a time</li>
                    <li>Link new habits to existing routines</li>
                    <li>Make habits visible with reminders</li>
                    <li>Celebrate small wins consistently</li>
                  </ul>
                </div>
              </div>
            </motion.div>
            
            {/* Task Prioritization Tool */}
            <motion.div 
              className="card"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-6">
                <Bell className="h-6 w-6 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold">Task Prioritization</h2>
              </div>
              
              <div>
                <p className="text-neutral-600 mb-6">
                  A simple framework to help you decide what to focus on when everything feels important.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Important & Urgent</h3>
                    <p className="text-sm text-neutral-700">Do these tasks first</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Important & Not Urgent</h3>
                    <p className="text-sm text-neutral-700">Schedule these tasks</p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-yellow-800 mb-2">Not Important & Urgent</h3>
                    <p className="text-sm text-neutral-700">Delegate if possible</p>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-800 mb-2">Not Important & Not Urgent</h3>
                    <p className="text-sm text-neutral-700">Eliminate these tasks</p>
                  </div>
                </div>
                
                <button className="w-full btn btn-outline flex items-center justify-center">
                  Try Interactive Prioritizer <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </motion.div>
            
            {/* Self-Check Quiz */}
            <motion.div 
              className="card"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-6">
                <CheckSquare className="h-6 w-6 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold">ADHD Self-Check</h2>
              </div>
              
              <div>
                <p className="text-neutral-600 mb-6">
                  A quick self-assessment to help you track your ADHD symptoms and identify patterns.
                </p>
                
                <div className="bg-neutral-100 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold mb-4">Today, I'm experiencing:</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Difficulty focusing</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button 
                            key={value}
                            className={`w-8 h-8 rounded-full ${value === 3 ? 'bg-primary-600 text-white' : 'bg-white border border-neutral-300'}`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>Restlessness/Fidgeting</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button 
                            key={value}
                            className={`w-8 h-8 rounded-full ${value === 4 ? 'bg-primary-600 text-white' : 'bg-white border border-neutral-300'}`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>Forgetfulness</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button 
                            key={value}
                            className={`w-8 h-8 rounded-full ${value === 2 ? 'bg-primary-600 text-white' : 'bg-white border border-neutral-300'}`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <button className="w-full btn btn-outline flex items-center justify-center">
                  Take Full Assessment <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Mini-Workshops */}
      <section className="bg-neutral-100 py-16">
        <div className="container-narrow">
          <h2 className="text-2xl font-bold mb-8">Mini-Workshops</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="card"
              whileHover={{ y: -5 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">5-Minute Focus Exercises</h3>
                <p className="text-neutral-600 mb-4">
                  Quick exercises to help you regain focus when your mind starts to wander.
                </p>
                <button className="w-full btn btn-primary">Watch Now</button>
              </div>
            </motion.div>
            
            <motion.div 
              className="card"
              whileHover={{ y: -5 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Setting Up Your Environment</h3>
                <p className="text-neutral-600 mb-4">
                  Learn how to create a workspace that minimizes distractions and supports focus.
                </p>
                <button className="w-full btn btn-primary">Watch Now</button>
              </div>
            </motion.div>
            
            <motion.div 
              className="card"
              whileHover={{ y: -5 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Quick Stress Relief Techniques</h3>
                <p className="text-neutral-600 mb-4">
                  Simple strategies to manage stress and anxiety that often accompany ADHD.
                </p>
                <button className="w-full btn btn-primary">Watch Now</button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Resources */}
      <section className="section">
        <div className="container-narrow">
          <h2 className="text-2xl font-bold mb-8">Additional Resources</h2>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Recommended Apps</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-neutral-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Forest</h4>
                  <p className="text-sm text-neutral-600">
                    Stay focused and present by growing virtual trees when you avoid using your phone.
                  </p>
                </div>
                
                <div className="border border-neutral-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Todoist</h4>
                  <p className="text-sm text-neutral-600">
                    A powerful task manager that helps you organize and prioritize your tasks.
                  </p>
                </div>
                
                <div className="border border-neutral-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Notion</h4>
                  <p className="text-sm text-neutral-600">
                    All-in-one workspace for notes, tasks, wikis, and databases.
                  </p>
                </div>
                
                <div className="border border-neutral-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Focus@Will</h4>
                  <p className="text-sm text-neutral-600">
                    Scientifically optimized music to help you focus and reduce distractions.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Printable Resources</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors">
                  <span>ADHD-Friendly Daily Planner</span>
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Download PDF
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors">
                  <span>Task Breakdown Worksheet</span>
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Download PDF
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors">
                  <span>Emotional Regulation Strategies</span>
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary-600 py-16">
        <div className="container-narrow text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Want to Learn More About ADHD?
          </h2>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
            Explore our interactive learning modules to deepen your understanding of ADHD.
          </p>
          <a href="/learning" className="btn bg-white text-primary-600 hover:bg-neutral-100">
            Go to Learning Modules
          </a>
        </div>
      </section>
    </div>
  );
};

export default ToolsPage;