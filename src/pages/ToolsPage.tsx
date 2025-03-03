import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckSquare, Bell, ArrowRight, Play, Pause, RefreshCw, X } from 'lucide-react';
import InteractivePrioritizer from '../components/InteractivePrioritizer';
import ADHDSelfCheck from '../components/ADHDSelfCheck';
import { TimerIllustration, TaskPrioritization } from '../components/AnimatedIllustrations';

const ToolsPage: React.FC = () => {
  // Set document title for SEO
  useEffect(() => {
    document.title = "ADHD Tools - Interactive Resources for ADHD Management | ADHDTime";
    
    // Add structured data for SEO
    const toolsPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "ADHD Tools and Resources",
      "description": "Interactive tools designed to help individuals with ADHD manage symptoms and improve daily functioning, including Pomodoro timer, habit tracker, task prioritization, and self-assessment tools.",
      "url": "https://adhdtime.com/tools",
      "isPartOf": {
        "@type": "WebSite",
        "name": "ADHDTime",
        "url": "https://adhdtime.com"
      }
    };
    
    // Add schema.org JSON-LD script to head
    const toolsSchemaScript = document.createElement('script');
    toolsSchemaScript.type = 'application/ld+json';
    toolsSchemaScript.innerHTML = JSON.stringify(toolsPageSchema);
    document.head.appendChild(toolsSchemaScript);
    
    // Clean up on component unmount
    return () => {
      document.head.removeChild(toolsSchemaScript);
    };
  }, []);
  
  // Modal States
  const [showPrioritizer, setShowPrioritizer] = useState(false);
  const [showSelfCheck, setShowSelfCheck] = useState(false);
  
  // Pomodoro Timer State
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [timerMode, setTimerMode] = useState<'work' | 'break'>('work');
  const [showTimerSettings, setShowTimerSettings] = useState(false);
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  
  // Audio for timer completion
  const [audio] = useState(new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3'));
  
  // Timer Effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            // Timer finished
            clearInterval(interval!);
            
            // Play notification sound
            audio.play().catch(e => console.log('Error playing audio:', e));
            
            // Switch between work and break modes
            if (timerMode === 'work') {
              // Switch to break mode
              setTimerMode('break');
              return breakDuration * 60;
            } else {
              // Switch to work mode
              setTimerMode('work');
              return workDuration * 60;
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, timerMode, audio, workDuration, breakDuration]);

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

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <main className="min-h-screen">
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

      {/* Tools Section */}
      <section className="py-16 bg-white">
        <div className="container-narrow">
          <h2 className="text-2xl font-bold mb-8">Interactive Tools</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Pomodoro Timer */}
            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Clock className="h-6 w-6 text-primary-600 mr-2" />
                    <h3 className="text-xl font-semibold">Pomodoro Timer</h3>
                  </div>
                  <button 
                    onClick={() => setShowTimerSettings(!showTimerSettings)}
                    className="text-neutral-500 hover:text-primary-600 p-1 rounded-md hover:bg-neutral-100"
                    aria-label="Timer settings"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                  </button>
                </div>
                
                {showTimerSettings && (
                  <div className="mb-6 bg-neutral-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Timer Settings</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="work-duration" className="block text-sm font-medium text-neutral-700 mb-1">
                          Work Duration (minutes)
                        </label>
                        <input
                          id="work-duration"
                          type="number"
                          min="1"
                          max="60"
                          value={workDuration}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value >= 1 && value <= 60) {
                              setWorkDuration(value);
                              if (timerMode === 'work' && isPaused) {
                                setTime(value * 60);
                              }
                            }
                          }}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="break-duration" className="block text-sm font-medium text-neutral-700 mb-1">
                          Break Duration (minutes)
                        </label>
                        <input
                          id="break-duration"
                          type="number"
                          min="1"
                          max="30"
                          value={breakDuration}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value >= 1 && value <= 30) {
                              setBreakDuration(value);
                              if (timerMode === 'break' && isPaused) {
                                setTime(value * 60);
                              }
                            }
                          }}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mb-6">
                  <TimerIllustration className="h-48 mx-auto" />
                </div>
                
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold mb-2">{formatTime(time)}</div>
                  <p className="text-sm text-neutral-500 mb-4">
                    {timerMode === 'work' ? 'Focus Session' : 'Break Time'}
                  </p>
                  
                  <div className="flex justify-center space-x-3">
                    {isPaused ? (
                      <button 
                        onClick={() => {
                          setIsActive(true);
                          setIsPaused(false);
                          // Start timer logic would go here
                        }}
                        className="btn btn-primary py-2 px-4 flex items-center"
                        aria-label="Start timer"
                      >
                        <Play className="h-4 w-4 mr-1" /> Start
                      </button>
                    ) : (
                      <button 
                        onClick={() => {
                          setIsPaused(true);
                          // Pause timer logic would go here
                        }}
                        className="btn btn-outline py-2 px-4 flex items-center"
                        aria-label="Pause timer"
                      >
                        <Pause className="h-4 w-4 mr-1" /> Pause
                      </button>
                    )}
                    
                    <button 
                      onClick={() => {
                        setTime(workDuration * 60);
                        setTimerMode('work');
                        setIsPaused(true);
                      }}
                      className="btn btn-outline py-2 px-4 flex items-center"
                      aria-label="Reset timer"
                    >
                      <RefreshCw className="h-4 w-4 mr-1" /> Reset
                    </button>
                  </div>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">How to use the Pomodoro Technique:</h4>
                  <ol className="list-decimal list-inside text-sm text-neutral-600 space-y-1">
                    <li>Work for 25 minutes (one "pomodoro")</li>
                    <li>Take a 5-minute break</li>
                    <li>After 4 pomodoros, take a longer 15-30 minute break</li>
                    <li>Repeat the cycle</li>
                  </ol>
                </div>
              </div>
            </motion.div>
            
            {/* Habit Tracker */}
            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <CheckSquare className="h-6 w-6 text-primary-600 mr-2" />
                  <h3 className="text-xl font-semibold">Daily Habit Tracker</h3>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Progress: {completedHabits}/{habits.length} habits</span>
                    <span className="text-sm font-medium">{Math.round(habitProgress)}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary-600 h-2.5 rounded-full" 
                      style={{ width: `${habitProgress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {habits.map(habit => (
                    <div 
                      key={habit.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        habit.completed 
                          ? 'bg-primary-50 border-primary-200' 
                          : 'bg-white border-neutral-200'
                      }`}
                    >
                      <span className={habit.completed ? 'text-primary-800' : 'text-neutral-700'}>
                        {habit.name}
                      </span>
                      <button 
                        onClick={() => toggleHabit(habit.id)}
                        className={`p-1 rounded-md ${
                          habit.completed 
                            ? 'bg-primary-100 text-primary-600 hover:bg-primary-200' 
                            : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200'
                        }`}
                        aria-label={habit.completed ? `Mark ${habit.name} as incomplete` : `Mark ${habit.name} as complete`}
                      >
                        <CheckSquare className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Tips for Building Habits:</h4>
                  <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
                    <li>Start with just one or two habits at a time</li>
                    <li>Link new habits to existing routines</li>
                    <li>Make the habit obvious, attractive, easy, and satisfying</li>
                    <li>Track your progress consistently</li>
                  </ul>
                </div>
              </div>
            </motion.div>
            
            {/* Task Prioritization Tool */}
            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <ArrowRight className="h-6 w-6 text-primary-600 mr-2" />
                  <h3 className="text-xl font-semibold">Task Prioritization</h3>
                </div>
                
                <div className="mb-6">
                  <TaskPrioritization className="h-48 mx-auto" />
                </div>
                
                <p className="text-neutral-600 mb-6">
                  Use the Eisenhower Matrix to prioritize your tasks based on their importance and urgency. 
                  This helps you focus on what truly matters and reduce overwhelm.
                </p>
                
                <button 
                  onClick={() => setShowPrioritizer(true)}
                  className="w-full btn btn-primary flex items-center justify-center"
                  aria-label="Open task prioritization tool"
                >
                  Prioritize Your Tasks <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </motion.div>
            
            {/* ADHD Self-Check */}
            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Bell className="h-6 w-6 text-primary-600 mr-2" />
                  <h3 className="text-xl font-semibold">ADHD Self-Check</h3>
                </div>
                
                <p className="text-neutral-600 mb-6">
                  This self-assessment tool helps you understand your ADHD symptoms across different domains:
                </p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3 mt-0.5">
                      <CheckSquare className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-medium">Attention Difficulties</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-100 text-purple-800 rounded-full p-1 mr-3 mt-0.5">
                      <CheckSquare className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-medium">Hyperactivity/Impulsivity</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 text-green-800 rounded-full p-1 mr-3 mt-0.5">
                      <CheckSquare className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-medium">Executive Function</span>
                    </div>
                  </li>
                </ul>
                
                <button 
                  onClick={() => setShowSelfCheck(true)}
                  className="w-full btn btn-primary flex items-center justify-center"
                  aria-label="Start ADHD self-assessment"
                >
                  Start Self-Assessment <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="section py-16">
        <div className="container-narrow">
          <h2 className="text-2xl font-bold mb-8">Additional Resources</h2>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Recommended Apps</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-neutral-200 rounded-lg p-4 bg-primary-50">
                  <h4 className="font-medium mb-2">DailyRoutine</h4>
                  <p className="text-sm text-neutral-600">
                    Our app designed specifically for ADHD individuals to establish and maintain daily routines.
                  </p>
                </div>
                
                <a 
                  href="https://www.forestapp.cc/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="border border-neutral-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
                >
                  <h4 className="font-medium mb-2">Forest</h4>
                  <p className="text-sm text-neutral-600">
                    Stay focused and present by growing virtual trees when you avoid using your phone.
                  </p>
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Printable Resources</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors">
                  <span>ADHD-Friendly Planner - Daily & Weekly Planning Templates</span>
                  <a 
                    href="/Ressources/ADHD Planner.pdf" 
                    download="ADHD-Friendly Planner.pdf" 
                    className="text-primary-600 hover:text-primary-700 font-medium"
                    aria-label="Download ADHD-Friendly Planner PDF"
                  >
                    Download PDF
                  </a>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors">
                  <span>ADHD Cleaning Guide - Step-by-Step Cleaning System</span>
                  <a 
                    href="/Ressources/ADHD CLEANING.pdf" 
                    download="ADHD Cleaning Guide.pdf" 
                    className="text-primary-600 hover:text-primary-700 font-medium"
                    aria-label="Download ADHD Cleaning Guide PDF"
                  >
                    Download PDF
                  </a>
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
          <a 
            href="/learning" 
            className="btn bg-white text-primary-600 hover:bg-neutral-100"
            aria-label="Go to learning modules page"
          >
            Go to Learning Modules
          </a>
        </div>
      </section>
      
      {/* Modals */}
      {showPrioritizer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Task Prioritization Tool</h2>
                <button 
                  onClick={() => setShowPrioritizer(false)}
                  className="text-neutral-500 hover:text-neutral-700"
                  aria-label="Close prioritizer"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <InteractivePrioritizer />
            </div>
          </div>
        </div>
      )}
      
      {showSelfCheck && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">ADHD Self-Assessment</h2>
                <button 
                  onClick={() => setShowSelfCheck(false)}
                  className="text-neutral-500 hover:text-neutral-700"
                  aria-label="Close self-assessment"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <ADHDSelfCheck />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ToolsPage;
