import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  category: 'attention' | 'hyperactivity' | 'executive';
}

const questions: Question[] = [
  { id: 1, text: 'I find it difficult to pay attention to details or make careless mistakes in my work', category: 'attention' },
  { id: 2, text: 'I struggle to sustain attention in tasks or activities', category: 'attention' },
  { id: 3, text: 'I often don\'t seem to listen when spoken to directly', category: 'attention' },
  { id: 4, text: 'I frequently fail to follow through on instructions or finish tasks', category: 'attention' },
  { id: 5, text: 'I have difficulty organizing tasks and activities', category: 'executive' },
  { id: 6, text: 'I avoid or dislike tasks that require sustained mental effort', category: 'attention' },
  { id: 7, text: 'I often lose things necessary for tasks or activities', category: 'executive' },
  { id: 8, text: 'I am easily distracted by external stimuli or unrelated thoughts', category: 'attention' },
  { id: 9, text: 'I am forgetful in daily activities', category: 'executive' },
  { id: 10, text: 'I fidget or squirm when seated', category: 'hyperactivity' },
  { id: 11, text: 'I have difficulty remaining seated in situations where it\'s expected', category: 'hyperactivity' },
  { id: 12, text: 'I often feel restless or have an internal feeling of restlessness', category: 'hyperactivity' },
  { id: 13, text: 'I have difficulty engaging in leisure activities quietly', category: 'hyperactivity' },
  { id: 14, text: 'I often feel "on the go" or driven by a motor', category: 'hyperactivity' },
  { id: 15, text: 'I talk excessively or find it hard to stop talking once I\'ve started', category: 'hyperactivity' },
  { id: 16, text: 'I blurt out answers before questions have been completed', category: 'hyperactivity' },
  { id: 17, text: 'I have difficulty waiting my turn', category: 'hyperactivity' },
  { id: 18, text: 'I interrupt or intrude on others', category: 'hyperactivity' },
  { id: 19, text: 'I struggle to manage my time effectively', category: 'executive' },
  { id: 20, text: 'I have trouble starting tasks even when I know they\'re important', category: 'executive' },
  { id: 21, text: 'I find it hard to prioritize tasks or activities', category: 'executive' },
  { id: 22, text: 'I often procrastinate on tasks until the last minute', category: 'executive' },
  { id: 23, text: 'I have difficulty transitioning from one activity to another', category: 'executive' },
  { id: 24, text: 'I struggle with emotional regulation (managing my emotions)', category: 'executive' }
];

const ADHDSelfCheck: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'questions' | 'results'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers({ ...answers, [questionId]: value });
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentStep('results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      setCurrentStep('intro');
    }
  };

  const startAssessment = () => {
    setCurrentStep('questions');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const restartAssessment = () => {
    setCurrentStep('intro');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const calculateResults = () => {
    const totalQuestions = questions.length;
    const answeredQuestions = Object.keys(answers).length;
    
    if (answeredQuestions === 0) return { total: 0, attention: 0, hyperactivity: 0, executive: 0 };
    
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const maxPossibleScore = answeredQuestions * 4; // 4 is max score per question
    const normalizedTotal = Math.round((totalScore / maxPossibleScore) * 100);
    
    // Calculate category scores
    const attentionQuestions = questions.filter(q => q.category === 'attention');
    const hyperactivityQuestions = questions.filter(q => q.category === 'hyperactivity');
    const executiveQuestions = questions.filter(q => q.category === 'executive');
    
    const attentionScores = attentionQuestions.map(q => answers[q.id] || 0);
    const hyperactivityScores = hyperactivityQuestions.map(q => answers[q.id] || 0);
    const executiveScores = executiveQuestions.map(q => answers[q.id] || 0);
    
    const attentionTotal = attentionScores.reduce((sum, score) => sum + score, 0);
    const hyperactivityTotal = hyperactivityScores.reduce((sum, score) => sum + score, 0);
    const executiveTotal = executiveScores.reduce((sum, score) => sum + score, 0);
    
    const attentionMax = attentionQuestions.length * 4;
    const hyperactivityMax = hyperactivityQuestions.length * 4;
    const executiveMax = executiveQuestions.length * 4;
    
    const normalizedAttention = Math.round((attentionTotal / attentionMax) * 100);
    const normalizedHyperactivity = Math.round((hyperactivityTotal / hyperactivityMax) * 100);
    const normalizedExecutive = Math.round((executiveTotal / executiveMax) * 100);
    
    return {
      total: normalizedTotal,
      attention: normalizedAttention,
      hyperactivity: normalizedHyperactivity,
      executive: normalizedExecutive
    };
  };

  const getResultInterpretation = (score: number) => {
    if (score < 25) return 'Minimal or no symptoms';
    if (score < 50) return 'Mild symptoms';
    if (score < 75) return 'Moderate symptoms';
    return 'Significant symptoms';
  };

  const getResultColor = (score: number) => {
    if (score < 25) return 'bg-green-100 text-green-800';
    if (score < 50) return 'bg-blue-100 text-blue-800';
    if (score < 75) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getNextSteps = (results: ReturnType<typeof calculateResults>) => {
    const { total } = results;
    
    if (total < 25) {
      return (
        <div>
          <p className="mb-4">Your responses suggest minimal or no ADHD symptoms. However, everyone experiences attention difficulties or restlessness occasionally.</p>
          <p>If you're concerned about specific challenges you're facing, consider:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Exploring general productivity and focus techniques</li>
            <li>Evaluating your sleep, nutrition, and exercise habits</li>
            <li>Considering if stress or other factors might be affecting your concentration</li>
          </ul>
        </div>
      );
    }
    
    if (total < 50) {
      return (
        <div>
          <p className="mb-4">Your responses suggest some mild ADHD-like symptoms. These could be related to ADHD or might be caused by other factors like stress, anxiety, depression, or sleep issues.</p>
          <p>Consider these next steps:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Try implementing some ADHD-friendly strategies from our Tools section</li>
            <li>Keep a journal of when symptoms occur to identify patterns or triggers</li>
            <li>If symptoms persist or cause significant difficulties, consult with a healthcare provider</li>
          </ul>
        </div>
      );
    }
    
    if (total < 75) {
      return (
        <div>
          <p className="mb-4">Your responses suggest moderate ADHD symptoms. This level of symptoms often impacts daily functioning in meaningful ways.</p>
          <p>Recommended next steps:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Consider speaking with a healthcare provider about a professional evaluation</li>
            <li>Implement ADHD management strategies from our Tools section</li>
            <li>Learn more about ADHD through our educational modules</li>
            <li>Join support groups or communities for people with ADHD</li>
          </ul>
        </div>
      );
    }
    
    return (
      <div>
        <p className="mb-4">Your responses suggest significant ADHD symptoms. This level of symptoms typically causes substantial challenges in daily life.</p>
        <p>Important next steps to consider:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Consult with a healthcare provider for a professional evaluation</li>
          <li>Discuss treatment options, which might include therapy, coaching, and/or medication</li>
          <li>Implement accommodations and strategies for managing ADHD</li>
          <li>Connect with ADHD support resources and communities</li>
          <li>Explore our Tools section for immediate strategies you can implement</li>
        </ul>
      </div>
    );
  };

  const results = calculateResults();
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      {currentStep === 'intro' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h2 className="text-2xl font-bold mb-4">ADHD Self-Assessment</h2>
          
          <div className="bg-primary-50 p-4 rounded-lg mb-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-primary-800 mb-2">Important Note</p>
                <p className="text-sm text-primary-700">
                  This self-assessment is for educational purposes only and is not a diagnostic tool. 
                  Only qualified healthcare professionals can diagnose ADHD. If you're concerned about 
                  your symptoms, please consult with a healthcare provider.
                </p>
              </div>
            </div>
          </div>
          
          <p className="mb-6">
            This assessment includes questions about common ADHD symptoms across three areas:
          </p>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3 mt-0.5">
                <CheckCircle className="h-4 w-4" />
              </div>
              <div>
                <span className="font-medium">Attention Difficulties</span>
                <p className="text-sm text-neutral-600">Problems with focus, concentration, and staying on task</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-purple-100 text-purple-800 rounded-full p-1 mr-3 mt-0.5">
                <CheckCircle className="h-4 w-4" />
              </div>
              <div>
                <span className="font-medium">Hyperactivity/Impulsivity</span>
                <p className="text-sm text-neutral-600">Restlessness, excessive movement, and acting without thinking</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 text-green-800 rounded-full p-1 mr-3 mt-0.5">
                <CheckCircle className="h-4 w-4" />
              </div>
              <div>
                <span className="font-medium">Executive Function Challenges</span>
                <p className="text-sm text-neutral-600">Difficulties with organization, time management, and planning</p>
              </div>
            </li>
          </ul>
          
          <p className="mb-6">
            For each statement, you'll rate how often you experience the described behavior or challenge.
            The assessment takes about 5-7 minutes to complete.
          </p>
          
          <button 
            onClick={startAssessment}
            className="w-full btn btn-primary flex items-center justify-center"
          >
            Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </motion.div>
      )}
      
      {currentStep === 'questions' && currentQuestion && (
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-6">{currentQuestion.text}</h3>
            <p className="text-sm text-neutral-500 mb-4">How often do you experience this?</p>
            
            <div className="space-y-3">
              {[
                { value: 0, label: 'Never' },
                { value: 1, label: 'Rarely' },
                { value: 2, label: 'Sometimes' },
                { value: 3, label: 'Often' },
                { value: 4, label: 'Very Often' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    answers[currentQuestion.id] === option.value
                      ? 'bg-primary-50 border-primary-300'
                      : 'bg-white border-neutral-200 hover:border-primary-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{option.label}</span>
                    {answers[currentQuestion.id] === option.value && (
                      <CheckCircle className="h-5 w-5 text-primary-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <button 
              onClick={handlePrevious}
              className="btn btn-outline py-2 px-4 flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </button>
            
            {answers[currentQuestion.id] !== undefined && currentQuestionIndex < questions.length - 1 && (
              <button 
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                className="btn btn-primary py-2 px-4 flex items-center"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            )}
            
            {answers[currentQuestion.id] !== undefined && currentQuestionIndex === questions.length - 1 && (
              <button 
                onClick={() => setCurrentStep('results')}
                className="btn btn-primary py-2 px-4 flex items-center"
              >
                See Results
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
      
      {currentStep === 'results' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6">Your Assessment Results</h2>
          
          <div className="bg-primary-50 p-4 rounded-lg mb-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-primary-800 mb-2">Remember</p>
                <p className="text-sm text-primary-700">
                  This self-assessment is not a diagnostic tool. The results are meant to provide 
                  educational insights only. For a proper diagnosis, please consult with a qualified 
                  healthcare professional.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Overall ADHD Symptom Score</h3>
            
            <div className="bg-neutral-100 p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Your Score:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getResultColor(results.total)}`}>
                  {results.total}%
                </span>
              </div>
              
              <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-primary-600 h-2.5 rounded-full" 
                  style={{ width: `${results.total}%` }}
                ></div>
              </div>
              
              <p className="text-sm text-neutral-600">
                Interpretation: <span className="font-medium">{getResultInterpretation(results.total)}</span>
              </p>
            </div>
            
            <h3 className="text-lg font-semibold mb-4">Symptom Breakdown</h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-blue-800">Attention Difficulties:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getResultColor(results.attention)}`}>
                    {results.attention}%
                  </span>
                </div>
                
                <div className="w-full bg-blue-200 rounded-full h-2.5 mb-2">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${results.attention}%` }}
                  ></div>
                </div>
                
                <p className="text-sm text-blue-700">
                  {getResultInterpretation(results.attention)}
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-purple-800">Hyperactivity/Impulsivity:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getResultColor(results.hyperactivity)}`}>
                    {results.hyperactivity}%
                  </span>
                </div>
                
                <div className="w-full bg-purple-200 rounded-full h-2.5 mb-2">
                  <div 
                    className="bg-purple-600 h-2.5 rounded-full" 
                    style={{ width: `${results.hyperactivity}%` }}
                  ></div>
                </div>
                
                <p className="text-sm text-purple-700">
                  {getResultInterpretation(results.hyperactivity)}
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-green-800">Executive Function:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getResultColor(results.executive)}`}>
                    {results.executive}%
                  </span>
                </div>
                
                <div className="w-full bg-green-200 rounded-full h-2.5 mb-2">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: `${results.executive}%` }}
                  ></div>
                </div>
                
                <p className="text-sm text-green-700">
                  {getResultInterpretation(results.executive)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">What Do These Results Mean?</h3>
            
            <div className="bg-white border border-neutral-200 rounded-lg p-4 mb-6">
              {getNextSteps(results)}
            </div>
            
            <p className="text-sm text-neutral-600 italic">
              Note: ADHD often co-exists with other conditions like anxiety, depression, or learning disabilities. 
              If you're experiencing significant difficulties, a comprehensive evaluation by a healthcare professional 
              is recommended.
            </p>
          </div>
          
          <div className="flex justify-between">
            <button 
              onClick={restartAssessment}
              className="btn btn-outline py-2 px-4"
            >
              Retake Assessment
            </button>
            
            <a 
              href="/tools"
              className="btn btn-primary py-2 px-4 flex items-center"
            >
              Explore ADHD Tools
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ADHDSelfCheck;
