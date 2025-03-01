import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, CheckCircle, AlertCircle, BookOpen, Award } from 'lucide-react';
import { ModuleSection, Quiz } from '../data/moduleContent';

interface LearningModuleProps {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  sections: ModuleSection[];
  quiz: Quiz[];
  onComplete: () => void;
  onClose: () => void;
}

const LearningModule: React.FC<LearningModuleProps> = ({
  id,
  title,
  description,
  difficulty,
  duration,
  sections,
  quiz,
  onComplete,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState<'content' | 'quiz' | 'results'>('content');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  
  const currentSection = sections[currentSectionIndex];
  const currentQuizQuestion = quiz[currentQuizIndex];
  
  const handleNextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      window.scrollTo(0, 0);
    } else {
      setCurrentStep('quiz');
      window.scrollTo(0, 0);
    }
  };
  
  const handlePreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };
  
  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;
    
    const newQuizAnswers = [...quizAnswers];
    newQuizAnswers[currentQuizIndex] = selectedAnswer;
    setQuizAnswers(newQuizAnswers);
    
    if (currentQuizIndex < quiz.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
      window.scrollTo(0, 0);
    } else {
      setCurrentStep('results');
      window.scrollTo(0, 0);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
      setSelectedAnswer(quizAnswers[currentQuizIndex - 1] || null);
      window.scrollTo(0, 0);
    } else {
      setCurrentStep('content');
      setCurrentSectionIndex(sections.length - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const calculateScore = () => {
    const correctAnswers = quizAnswers.filter(
      (answer, index) => answer === quiz[index].correctAnswer
    ).length;
    
    return {
      correct: correctAnswers,
      total: quiz.length,
      percentage: Math.round((correctAnswers / quiz.length) * 100)
    };
  };
  
  const handleComplete = () => {
    onComplete();
    onClose();
  };
  
  const score = calculateScore();
  
  const getDifficultyColor = (difficulty: 'Beginner' | 'Intermediate' | 'Advanced') => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
        <div className="flex items-center">
          <BookOpen className="h-5 w-5 text-primary-600 mr-2" />
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <button 
          onClick={onClose}
          className="text-neutral-500 hover:text-neutral-700"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      {/* Module Info */}
      <div className="p-4 bg-neutral-50 border-b border-neutral-200">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
          <span className="text-sm text-neutral-600 flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            {duration}
          </span>
        </div>
        <p className="mt-2 text-neutral-700">{description}</p>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {currentStep === 'content' && currentSection && (
          <motion.div
            key={`section-${currentSectionIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Section {currentSectionIndex + 1} of {sections.length}</span>
                <span className="text-sm font-medium">{Math.round(((currentSectionIndex + 1) / sections.length) * 100)}%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${((currentSectionIndex + 1) / sections.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-6">{currentSection.title}</h3>
            
            {currentSection.imageUrl && (
              <div className="mb-6">
                <img 
                  src={currentSection.imageUrl} 
                  alt={currentSection.title} 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
            
            <div className="prose max-w-none mb-8">
              {currentSection.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
            
            <div className="flex justify-between">
              <button 
                onClick={handlePreviousSection}
                disabled={currentSectionIndex === 0}
                className={`btn ${currentSectionIndex === 0 ? 'btn-disabled' : 'btn-outline'} py-2 px-4 flex items-center`}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </button>
              
              <button 
                onClick={handleNextSection}
                className="btn btn-primary py-2 px-4 flex items-center"
              >
                {currentSectionIndex < sections.length - 1 ? 'Next' : 'Start Quiz'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
        
        {currentStep === 'quiz' && currentQuizQuestion && (
          <motion.div
            key={`quiz-${currentQuizIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Question {currentQuizIndex + 1} of {quiz.length}</span>
                <span className="text-sm font-medium">{Math.round(((currentQuizIndex + 1) / quiz.length) * 100)}%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${((currentQuizIndex + 1) / quiz.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-6">{currentQuizQuestion.question}</h3>
            
            <div className="space-y-3 mb-8">
              {currentQuizQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedAnswer === index
                      ? 'bg-primary-50 border-primary-300'
                      : 'bg-white border-neutral-200 hover:border-primary-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{option}</span>
                    {selectedAnswer === index && (
                      <CheckCircle className="h-5 w-5 text-primary-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="flex justify-between">
              <button 
                onClick={handlePreviousQuestion}
                className="btn btn-outline py-2 px-4 flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </button>
              
              <button 
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="btn btn-primary py-2 px-4 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuizIndex < quiz.length - 1 ? 'Next' : 'See Results'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
        
        {currentStep === 'results' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-primary-100 mb-4">
                <Award className="h-12 w-12 text-primary-600" />
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
              <p className="text-neutral-600">
                You scored {score.correct} out of {score.total} ({score.percentage}%)
              </p>
            </div>
            
            <div className="bg-neutral-100 p-4 rounded-lg mb-6">
              <h4 className="font-semibold mb-4">Review Your Answers</h4>
              
              <div className="space-y-6">
                {quiz.map((question, questionIndex) => {
                  const userAnswer = quizAnswers[questionIndex];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <div key={questionIndex} className="bg-white p-4 rounded-lg border">
                      <div className="flex items-start mb-3">
                        <div className={`rounded-full p-1 mr-2 ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {isCorrect ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <AlertCircle className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{question.question}</p>
                          <p className="text-sm text-neutral-600 mt-1">
                            Your answer: {question.options[userAnswer]}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-600 mt-1">
                              Correct answer: {question.options[question.correctAnswer]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-primary-50 p-4 rounded-lg mb-8">
              <h4 className="font-semibold mb-2">What's Next?</h4>
              <p className="text-sm text-neutral-700 mb-4">
                Now that you've completed this module, you can:
              </p>
              <ul className="list-disc list-inside text-sm text-neutral-700 space-y-1">
                <li>Explore other learning modules</li>
                <li>Try our interactive tools to apply what you've learned</li>
                <li>Download resources for further reading</li>
              </ul>
            </div>
            
            <button
              onClick={handleComplete}
              className="w-full btn btn-primary"
            >
              Complete Module
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default LearningModule;
