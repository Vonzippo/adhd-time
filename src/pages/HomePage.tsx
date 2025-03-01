import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Clock, Award, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <radialGradient id="gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
                <stop offset="100%" stopColor="rgba(249, 115, 22, 0.1)" />
              </radialGradient>
            </defs>
            <path
              d="M0,0 C30,20 70,20 100,0 L100,100 L0,100 Z"
              fill="url(#gradient)"
            />
          </svg>
        </div>
        
        <div className="section relative z-10 flex flex-col items-center text-center py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-neutral-900">
              ADHD Interactive Platform
            </h1>
            <p className="text-xl md:text-2xl text-neutral-700 max-w-3xl mx-auto mb-10">
              Discover, Learn, and Engage – Your interactive space for ADHD insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/basics" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/learning" className="btn btn-outline">
                Explore Learning
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll Find Here</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Our platform is designed to provide you with the resources, tools, and knowledge to better understand and manage ADHD.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="card"
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="rounded-full bg-primary-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <BookOpen className="text-primary-600 h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">ADHD Basics</h3>
            <p className="text-neutral-600 mb-4">
              Clear, concise information about ADHD symptoms, diagnosis, and treatment options.
            </p>
            <Link to="/basics" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
              Learn more <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
          
          <motion.div 
            className="card"
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="rounded-full bg-primary-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Brain className="text-primary-600 h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Interactive Learning</h3>
            <p className="text-neutral-600 mb-4">
              Engaging modules and quizzes to deepen your understanding of ADHD in a fun way.
            </p>
            <Link to="/learning" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
              Start learning <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
          
          <motion.div 
            className="card"
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="rounded-full bg-primary-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Clock className="text-primary-600 h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Practical Tools</h3>
            <p className="text-neutral-600 mb-4">
              Useful tools like Pomodoro timers, habit trackers, and focus exercises for daily life.
            </p>
            <Link to="/tools" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
              Explore tools <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="bg-neutral-100 py-16">
        <div className="section">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Why This Platform Matters</h2>
            <blockquote className="text-lg md:text-xl text-neutral-700 italic mb-6">
              "Understanding ADHD isn't just about learning facts—it's about finding strategies that work for your unique brain. This platform helps bridge that gap with practical, accessible resources."
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center">
                <span className="text-primary-700 font-bold">DR</span>
              </div>
              <div className="ml-4 text-left">
                <p className="font-medium">Dr. Rebecca Johnson</p>
                <p className="text-sm text-neutral-600">ADHD Specialist & Educator</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mini Features */}
      <section className="section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Learn at Your Own Pace</h2>
            <p className="text-lg text-neutral-600 mb-6">
              Our platform is designed with ADHD-friendly features to help you focus and engage with the content in a way that works for you.
            </p>
            <ul className="space-y-4">
              <li className="flex">
                <Award className="h-6 w-6 text-secondary-500 mr-3 flex-shrink-0" />
                <span>Earn badges and track your progress as you complete modules</span>
              </li>
              <li className="flex">
                <Award className="h-6 w-6 text-secondary-500 mr-3 flex-shrink-0" />
                <span>Short, focused content designed for ADHD attention spans</span>
              </li>
              <li className="flex">
                <Award className="h-6 w-6 text-secondary-500 mr-3 flex-shrink-0" />
                <span>Visual aids and interactive elements to boost engagement</span>
              </li>
            </ul>
            <Link to="/learning" className="btn btn-primary mt-8">
              Start Learning
            </Link>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
              alt="People learning together" 
              className="rounded-xl shadow-lg object-cover h-full"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary-600 py-16">
        <div className="section text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your ADHD Journey?
          </h2>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
            Join our platform today and discover tools, resources, and insights designed specifically for people with ADHD.
          </p>
          <Link to="/basics" className="btn bg-white text-primary-600 hover:bg-neutral-100 shadow-lg">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;