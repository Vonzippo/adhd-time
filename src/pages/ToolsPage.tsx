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
    </main>
  );
};

export default ToolsPage;
