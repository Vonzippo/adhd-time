import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Clock, Award, ArrowRight } from 'lucide-react';
import { BrainWaves, BrainNetwork, FocusCircles } from '../components/AnimatedIllustrations';

const HomePage: React.FC = () => {
  // Set document title for SEO
  useEffect(() => {
    document.title = "ADHDTime - Interactive Tools & Resources for ADHD Management";
    
    // Add structured data for SEO
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "ADHDTime",
      "url": "https://adhdtime.com",
      "description": "Interactive tools and resources designed specifically for individuals with ADHD to improve focus, organization, and daily life management.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://adhdtime.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };
    
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ADHDTime",
      "url": "https://adhdtime.com",
      "logo": "https://adhdtime.com/Ressources/ADHD-Time.png",
      "sameAs": [
        "https://www.etsy.com/shop/ADHDTime",
        "https://de.pinterest.com/OetterliappsEtsy/"
      ]
    };
    
    // Add schema.org JSON-LD scripts to head
    const websiteSchemaScript = document.createElement('script');
    websiteSchemaScript.type = 'application/ld+json';
    websiteSchemaScript.innerHTML = JSON.stringify(websiteSchema);
    document.head.appendChild(websiteSchemaScript);
    
    const organizationSchemaScript = document.createElement('script');
    organizationSchemaScript.type = 'application/ld+json';
    organizationSchemaScript.innerHTML = JSON.stringify(organizationSchema);
    document.head.appendChild(organizationSchemaScript);
    
    // Clean up on component unmount
    return () => {
      document.head.removeChild(websiteSchemaScript);
      document.head.removeChild(organizationSchemaScript);
    };
  }, []);
  
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <radialGradient id="gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="rgba(252, 60, 72, 0.3)" />
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
          <div className="absolute inset-x-0 top-0 h-24">
            <BrainWaves className="w-full h-24" aria-hidden="true" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-neutral-900">
              ADHDTime
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
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-6">
            Our platform is designed to provide you with the resources, tools, and knowledge to better understand and manage ADHD.
          </p>
          <div className="max-w-md mx-auto">
            <BrainNetwork className="w-full h-40" aria-hidden="true" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="card"
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="rounded-full bg-primary-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <BookOpen className="text-primary-500 h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold mb-3">ADHD Basics</h3>
            <p className="text-neutral-600 mb-4">
              Clear, concise information about ADHD symptoms, diagnosis, and treatment options.
            </p>
            <Link to="/basics" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
              Learn more <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
          
          <motion.div 
            className="card"
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="rounded-full bg-primary-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Brain className="text-primary-500 h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Interactive Learning</h3>
            <p className="text-neutral-600 mb-4">
              Engaging modules and quizzes to deepen your understanding of ADHD in a fun way.
            </p>
            <Link to="/learning" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
              Start learning <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
          
          <motion.div 
            className="card"
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="rounded-full bg-primary-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Clock className="text-primary-500 h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Practical Tools</h3>
            <p className="text-neutral-600 mb-4">
              Useful tools like Pomodoro timers, habit trackers, and focus exercises for daily life.
            </p>
            <Link to="/tools" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
              Explore tools <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
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
                <a href="https://chadd.org/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-600 hover:underline">
                  Member of CHADD (Children and Adults with ADHD)
                </a>
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
                <Award className="h-6 w-6 text-secondary-500 mr-3 flex-shrink-0" aria-hidden="true" />
                <span>Earn badges and track your progress as you complete modules</span>
              </li>
              <li className="flex">
                <Award className="h-6 w-6 text-secondary-500 mr-3 flex-shrink-0" aria-hidden="true" />
                <span>Short, focused content designed for ADHD attention spans</span>
              </li>
              <li className="flex">
                <Award className="h-6 w-6 text-secondary-500 mr-3 flex-shrink-0" aria-hidden="true" />
                <span>Visual aids and interactive elements to boost engagement</span>
              </li>
            </ul>
            <div className="mt-8">
              <Link to="/learning" className="btn btn-primary">
                Start Learning
              </Link>
              <a 
                href="https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="ml-4 text-primary-600 hover:underline"
                aria-label="Learn more about ADHD from the National Institute of Mental Health"
              >
                Learn more from NIMH
              </a>
            </div>
          </div>
          <div className="relative flex flex-col justify-center">
            <div className="mb-4 md:hidden">
              <FocusCircles className="w-full h-40" aria-hidden="true" />
            </div>
            <div className="relative rounded-xl shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
                alt="Diverse group of people collaborating on ADHD learning strategies in a supportive educational environment" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute top-4 right-4 hidden md:block">
                <FocusCircles className="w-32 h-32" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Research & Resources Section */}
      <section className="bg-neutral-50 py-16">
        <div className="section">
          <h2 className="text-3xl font-bold mb-8 text-center">Evidence-Based Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a 
              href="https://www.cdc.gov/ncbddd/adhd/index.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="card hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3">CDC ADHD Resources</h3>
              <p className="text-neutral-600 mb-2">
                Comprehensive information about ADHD from the Centers for Disease Control and Prevention.
              </p>
              <span className="text-primary-600">Visit CDC Website →</span>
            </a>
            
            <a 
              href="https://www.additudemag.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="card hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3">ADDitude Magazine</h3>
              <p className="text-neutral-600 mb-2">
                Strategies and support for ADHD and learning disabilities.
              </p>
              <span className="text-primary-600">Visit ADDitude →</span>
            </a>
            
            <a 
              href="https://chadd.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="card hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3">CHADD</h3>
              <p className="text-neutral-600 mb-2">
                Children and Adults with Attention-Deficit/Hyperactivity Disorder - leading resource on ADHD.
              </p>
              <span className="text-primary-600">Visit CHADD →</span>
            </a>
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
    </main>
  );
};

export default HomePage;
