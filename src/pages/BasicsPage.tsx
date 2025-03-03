import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

const BasicsPage: React.FC = () => {
  // Set document title for SEO
  useEffect(() => {
    document.title = "ADHD Basics - Symptoms, Types & Treatment | ADHDTime";
    
    // Add structured data for SEO
    const basicsPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "ADHD Basics - Symptoms, Types & Treatment",
      "description": "Learn about ADHD symptoms, types, diagnosis, and treatment options. Comprehensive information about Attention-Deficit/Hyperactivity Disorder for individuals and supporters.",
      "url": "https://adhdtime.com/basics",
      "isPartOf": {
        "@type": "WebSite",
        "name": "ADHDTime",
        "url": "https://adhdtime.com"
      },
      "about": {
        "@type": "MedicalCondition",
        "name": "Attention-Deficit/Hyperactivity Disorder",
        "alternateName": "ADHD",
        "description": "A neurodevelopmental disorder characterized by persistent patterns of inattention, hyperactivity, and impulsivity."
      }
    };
    
    // Add FAQ structured data for SEO
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is ADHD?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Attention-Deficit/Hyperactivity Disorder (ADHD) is a neurodevelopmental condition that affects how people think, process emotions, and respond to their environment. It's characterized by persistent patterns of inattention, hyperactivity, and impulsivity that can interfere with functioning and development."
          }
        },
        {
          "@type": "Question",
          "name": "What are the types of ADHD?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "There are three main types of ADHD: Predominantly Inattentive (difficulty sustaining attention, following detailed instructions, and organizing tasks), Predominantly Hyperactive-Impulsive (fidgeting, excessive talking, and difficulty waiting turn), and Combined Type (symptoms of both inattention and hyperactivity-impulsivity)."
          }
        },
        {
          "@type": "Question",
          "name": "How is ADHD diagnosed?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ADHD is diagnosed through comprehensive evaluations by healthcare professionals, typically including clinical interviews and observations, rating scales and questionnaires, medical history review, and psychological testing."
          }
        },
        {
          "@type": "Question",
          "name": "What treatments are available for ADHD?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Treatment approaches often include a combination of medication (stimulant and non-stimulant medications), behavioral therapy, lifestyle adjustments (regular exercise, adequate sleep, nutrition), and educational support."
          }
        }
      ]
    };
    
    // Add schema.org JSON-LD scripts to head
    const basicsSchemaScript = document.createElement('script');
    basicsSchemaScript.type = 'application/ld+json';
    basicsSchemaScript.innerHTML = JSON.stringify(basicsPageSchema);
    document.head.appendChild(basicsSchemaScript);
    
    const faqSchemaScript = document.createElement('script');
    faqSchemaScript.type = 'application/ld+json';
    faqSchemaScript.innerHTML = JSON.stringify(faqSchema);
    document.head.appendChild(faqSchemaScript);
    
    // Clean up on component unmount
    return () => {
      document.head.removeChild(basicsSchemaScript);
      document.head.removeChild(faqSchemaScript);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary-50 py-16">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-6">ADHD Basics</h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Understanding the fundamentals of ADHD is the first step toward effective management and support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is ADHD Section */}
      <section className="section">
        <div className="container-narrow">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
            <div className="md:w-1/3">
              <div className="rounded-full bg-primary-100 p-6 w-24 h-24 flex items-center justify-center mx-auto md:mx-0">
                <Brain className="text-primary-600 h-12 w-12" aria-hidden="true" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-4">What is ADHD?</h2>
              <p className="text-lg text-neutral-700 mb-4">
                Attention-Deficit/Hyperactivity Disorder (ADHD) is a neurodevelopmental condition that affects how people think, process emotions, and respond to their environment.
              </p>
              <p className="text-lg text-neutral-700">
                It's characterized by persistent patterns of inattention, hyperactivity, and impulsivity that can interfere with functioning and development.
              </p>
            </div>
          </div>

          {/* Types of ADHD */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-center">Types of ADHD</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                className="card"
                whileHover={{ y: -5 }}
              >
                <h4 className="text-xl font-semibold mb-3">Predominantly Inattentive</h4>
                <p className="text-neutral-600">
                  Difficulty sustaining attention, following detailed instructions, and organizing tasks. May appear forgetful or easily distracted.
                </p>
              </motion.div>
              
              <motion.div 
                className="card"
                whileHover={{ y: -5 }}
              >
                <h4 className="text-xl font-semibold mb-3">Predominantly Hyperactive-Impulsive</h4>
                <p className="text-neutral-600">
                  Fidgeting, excessive talking, and difficulty waiting turn. May act without thinking about consequences.
                </p>
              </motion.div>
              
              <motion.div 
                className="card"
                whileHover={{ y: -5 }}
              >
                <h4 className="text-xl font-semibold mb-3">Combined Type</h4>
                <p className="text-neutral-600">
                  Symptoms of both inattention and hyperactivity-impulsivity are present. This is the most common type of ADHD.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Common Symptoms */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6">Common Symptoms</h3>
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xl font-semibold mb-4">Inattention Signs:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span>Difficulty sustaining attention in tasks</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span>Often loses things necessary for tasks</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span>Easily distracted by external stimuli</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span>Forgetful in daily activities</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span>Difficulty organizing tasks and activities</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-4">Hyperactivity/Impulsivity Signs:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-secondary-500 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span>Fidgeting or tapping hands/feet</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-secondary-500 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span>Difficulty remaining seated when expected</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-secondary-500 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span>Talking excessively</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-secondary-500 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span>Interrupting or intruding on others</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-secondary-500 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span>Difficulty waiting for turn</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Myths vs Facts */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6">ADHD: Myths vs. Facts</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-6 rounded-xl">
                  <div className="flex items-center mb-3">
                    <HelpCircle className="h-6 w-6 text-red-500 mr-2" aria-hidden="true" />
                    <h4 className="text-xl font-semibold">Myth</h4>
                  </div>
                  <p className="text-neutral-700">ADHD is just a lack of willpower or discipline.</p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2" aria-hidden="true" />
                    <h4 className="text-xl font-semibold">Fact</h4>
                  </div>
                  <p className="text-neutral-700">ADHD is a neurodevelopmental disorder with biological origins, affecting brain structure and function.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-6 rounded-xl">
                  <div className="flex items-center mb-3">
                    <HelpCircle className="h-6 w-6 text-red-500 mr-2" aria-hidden="true" />
                    <h4 className="text-xl font-semibold">Myth</h4>
                  </div>
                  <p className="text-neutral-700">Only children have ADHD, and they outgrow it.</p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2" aria-hidden="true" />
                    <h4 className="text-xl font-semibold">Fact</h4>
                  </div>
                  <p className="text-neutral-700">ADHD often persists into adulthood, with symptoms evolving over time. Many adults have ADHD that was never diagnosed in childhood.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-6 rounded-xl">
                  <div className="flex items-center mb-3">
                    <HelpCircle className="h-6 w-6 text-red-500 mr-2" aria-hidden="true" />
                    <h4 className="text-xl font-semibold">Myth</h4>
                  </div>
                  <p className="text-neutral-700">People with ADHD can't focus on anything.</p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2" aria-hidden="true" />
                    <h4 className="text-xl font-semibold">Fact</h4>
                  </div>
                  <p className="text-neutral-700">Many people with ADHD can hyperfocus on activities they find interesting or engaging, sometimes to the exclusion of other important tasks.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnosis and Treatment */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Diagnosis and Treatment</h3>
            <p className="text-lg text-neutral-700 mb-6">
              ADHD is diagnosed through comprehensive evaluations by healthcare professionals, typically including:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Clinical interviews and observations</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Rating scales and questionnaires</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Medical history review</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Psychological testing</span>
              </li>
            </ul>
            
            <p className="text-lg text-neutral-700 mb-6">
              Treatment approaches often include a combination of:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h4 className="text-xl font-semibold mb-3">Medication</h4>
                <p className="text-neutral-600">
                  Stimulant and non-stimulant medications can help manage symptoms by affecting brain chemicals that enable focus and self-control.
                </p>
              </div>
              
              <div className="card">
                <h4 className="text-xl font-semibold mb-3">Behavioral Therapy</h4>
                <p className="text-neutral-600">
                  Helps develop skills for organization, time management, and emotional regulation through structured interventions.
                </p>
              </div>
              
              <div className="card">
                <h4 className="text-xl font-semibold mb-3">Lifestyle Adjustments</h4>
                <p className="text-neutral-600">
                  Regular exercise, adequate sleep, nutrition, and stress management can significantly improve ADHD symptoms.
                </p>
              </div>
              
              <div className="card">
                <h4 className="text-xl font-semibold mb-3">Educational Support</h4>
                <p className="text-neutral-600">
                  Accommodations at school or work can help individuals with ADHD succeed in these environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Expert Resources Section */}
      <section className="bg-neutral-50 py-16">
        <div className="container-narrow">
          <h2 className="text-3xl font-bold mb-8 text-center">Authoritative Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a 
              href="https://www.cdc.gov/ncbddd/adhd/facts.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="card hover:shadow-md transition-shadow"
              aria-label="Visit CDC's ADHD facts page"
            >
              <h3 className="text-xl font-semibold mb-3">CDC</h3>
              <p className="text-neutral-600 mb-2">
                Facts about ADHD from the Centers for Disease Control and Prevention.
              </p>
              <span className="text-primary-600">Visit CDC →</span>
            </a>
            
            <a 
              href="https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd" 
              target="_blank" 
              rel="noopener noreferrer"
              className="card hover:shadow-md transition-shadow"
              aria-label="Visit National Institute of Mental Health ADHD page"
            >
              <h3 className="text-xl font-semibold mb-3">NIMH</h3>
              <p className="text-neutral-600 mb-2">
                Research-based information from the National Institute of Mental Health.
              </p>
              <span className="text-primary-600">Visit NIMH →</span>
            </a>
            
            <a 
              href="https://chadd.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="card hover:shadow-md transition-shadow"
              aria-label="Visit CHADD website"
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
      <section className="bg-primary-50 py-16">
        <div className="container-narrow text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Learn More?</h2>
          <p className="text-lg text-neutral-600 mb-8">
            Explore our interactive learning modules to deepen your understanding of ADHD and discover practical strategies.
          </p>
          <a 
            href="/learning" 
            className="btn btn-primary"
            aria-label="Go to interactive learning modules"
          >
            Go to Interactive Learning
          </a>
        </div>
      </section>
    </div>
  );
};

export default BasicsPage;
