import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, CheckCircle, ArrowRight, Brain, X } from 'lucide-react';
import LearningModule from '../components/LearningModule';
import { moduleData, DetailedModule } from '../data/moduleContent';

interface ModuleStatus {
  id: string;
  completed: boolean;
}

const LearningPage: React.FC = () => {
  const [moduleStatuses, setModuleStatuses] = useState<ModuleStatus[]>(
    moduleData.map(module => ({ id: module.id, completed: false }))
  );
  
  const [activeModule, setActiveModule] = useState<DetailedModule | null>(null);

  const toggleCompleted = (id: string) => {
    setModuleStatuses(moduleStatuses.map(status => 
      status.id === id ? { ...status, completed: !status.completed } : status
    ));
  };

  const handleModuleComplete = () => {
    if (activeModule) {
      toggleCompleted(activeModule.id);
    }
  };

  const completedCount = moduleStatuses.filter(status => status.completed).length;
  const progressPercentage = (completedCount / moduleStatuses.length) * 100;

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
            <h1 className="text-4xl font-bold mb-6">Interactive Learning</h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Explore our interactive modules designed to help you understand and manage ADHD more effectively.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Tracker */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="container-narrow">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-secondary-500 mr-3" />
              <div>
                <h2 className="text-xl font-semibold">Your Learning Progress</h2>
                <p className="text-neutral-600">Complete modules to earn badges and track your journey</p>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">{completedCount} of {moduleStatuses.length} completed</span>
                <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2.5">
                <div 
                  className="bg-secondary-500 h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Modules */}
      <section className="section">
        <div className="container-narrow">
          <h2 className="text-2xl font-bold mb-8">Learning Modules</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {moduleData.map((module) => {
              const status = moduleStatuses.find(s => s.id === module.id);
              const isCompleted = status ? status.completed : false;
              
              return (
                <motion.div 
                  key={module.id}
                  className="card overflow-hidden flex flex-col"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={module.sections[0].imageUrl || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"} 
                      alt={module.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        module.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        module.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {module.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold">{module.title}</h3>
                      <button 
                        onClick={() => toggleCompleted(module.id)}
                        className={`rounded-full p-1 ${
                          isCompleted ? 'bg-green-100 text-green-600' : 'bg-neutral-100 text-neutral-400'
                        }`}
                      >
                        <CheckCircle className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-neutral-600 mb-4">{module.description}</p>
                    <div className="flex items-center text-sm text-neutral-500 mb-4">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>{module.duration}</span>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-6 mt-auto">
                    <button 
                      onClick={() => setActiveModule(module)}
                      className="w-full btn btn-outline flex items-center justify-center"
                    >
                      Start Module <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Featured Mini-Workshop */}
      <section className="bg-neutral-100 py-16">
        <div className="container-narrow">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Featured workshop" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-8 md:w-2/3">
                <div className="uppercase tracking-wide text-sm text-secondary-500 font-semibold">Featured Mini-Workshop</div>
                <h2 className="mt-2 text-2xl font-bold">5-Minute Focus Exercises</h2>
                <p className="mt-3 text-neutral-600">
                  Quick, practical exercises you can do anywhere to improve focus and attention. Perfect for busy days when you need a mental reset.
                </p>
                <div className="mt-6">
                  <button className="btn btn-primary">
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Upcoming Modules */}
      <section className="section">
        <div className="container-narrow">
          <h2 className="text-2xl font-bold mb-8">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-neutral-50 border border-dashed border-neutral-300">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">ADHD and Sleep</h3>
                <p className="text-neutral-600 mb-4">
                  Understanding the connection between ADHD and sleep difficulties, with practical solutions.
                </p>
                <span className="text-sm text-primary-600 font-medium">Coming next month</span>
              </div>
            </div>
            
            <div className="card bg-neutral-50 border border-dashed border-neutral-300">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Nutrition and ADHD</h3>
                <p className="text-neutral-600 mb-4">
                  Explore how diet can impact ADHD symptoms and brain function.
                </p>
                <span className="text-sm text-primary-600 font-medium">Coming next month</span>
              </div>
            </div>
            
            <div className="card bg-neutral-50 border border-dashed border-neutral-300">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">ADHD in Women</h3>
                <p className="text-neutral-600 mb-4">
                  Understanding how ADHD presents differently in women and girls.
                </p>
                <span className="text-sm text-primary-600 font-medium">Coming next month</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Active Module */}
      {activeModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-4xl w-full">
            <LearningModule
              id={activeModule.id}
              title={activeModule.title}
              description={activeModule.description}
              difficulty={activeModule.difficulty}
              duration={activeModule.duration}
              sections={activeModule.sections}
              quiz={activeModule.quiz}
              onComplete={handleModuleComplete}
              onClose={() => setActiveModule(null)}
            />
          </div>
        </div>
      )}
      
      {/* CTA Section */}
      <section className="bg-primary-600 py-16">
        <div className="container-narrow text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Try Our Interactive Tools?
          </h2>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
            Put your knowledge into practice with our collection of ADHD-friendly tools and resources.
          </p>
          <a href="/tools" className="btn bg-white text-primary-600 hover:bg-neutral-100">
            Explore Tools
          </a>
        </div>
      </section>
    </div>
  );
};

export default LearningPage;
