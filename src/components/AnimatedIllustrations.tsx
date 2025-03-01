import React from 'react';
import { motion } from 'framer-motion';

interface BrainWavesProps {
  className?: string;
}

export const BrainWaves: React.FC<BrainWavesProps> = ({ className = "w-full h-64" }) => {
  return (
    <div className={`${className} overflow-hidden`}>
      <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M0,100 C30,120 70,80 100,100 C130,120 170,80 200,100 C230,120 270,80 300,100 C330,120 370,80 400,100"
          stroke="#6366f1"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            pathOffset: [0, 0.5, 0]
          }}
          transition={{ 
            duration: 5, 
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
        <motion.path
          d="M0,100 C30,80 70,120 100,100 C130,80 170,120 200,100 C230,80 270,120 300,100 C330,80 370,120 400,100"
          stroke="#8b5cf6"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            pathOffset: [0, -0.5, 0]
          }}
          transition={{ 
            duration: 5, 
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            delay: 0.5
          }}
        />
      </svg>
    </div>
  );
};

interface FocusCirclesProps {
  className?: string;
}

export const FocusCircles: React.FC<FocusCirclesProps> = ({ className = "w-full h-64" }) => {
  return (
    <div className={`${className} overflow-hidden`}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <motion.circle
          cx="100"
          cy="100"
          r="50"
          stroke="#f97316"
          strokeWidth="2"
          fill="none"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.2, 1, 0.2]
          }}
          transition={{ 
            duration: 4, 
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
        <motion.circle
          cx="100"
          cy="100"
          r="30"
          stroke="#f97316"
          strokeWidth="2"
          fill="none"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.2, 1, 0.2]
          }}
          transition={{ 
            duration: 4, 
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            delay: 0.5
          }}
        />
        <motion.circle
          cx="100"
          cy="100"
          r="10"
          fill="#f97316"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.2, 1, 0.2]
          }}
          transition={{ 
            duration: 4, 
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            delay: 1
          }}
        />
      </svg>
    </div>
  );
};

interface BrainNetworkProps {
  className?: string;
}

export const BrainNetwork: React.FC<BrainNetworkProps> = ({ className = "w-full h-64" }) => {
  const nodes = [
    { id: 1, x: 50, y: 50 },
    { id: 2, x: 150, y: 50 },
    { id: 3, x: 100, y: 120 },
    { id: 4, x: 50, y: 180 },
    { id: 5, x: 150, y: 180 },
  ];

  const connections = [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 4 },
  ];

  return (
    <div className={`${className} overflow-hidden`}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {connections.map((connection, index) => (
          <motion.line
            key={`connection-${index}`}
            x1={nodes[connection.from].x}
            y1={nodes[connection.from].y}
            x2={nodes[connection.to].x}
            y2={nodes[connection.to].y}
            stroke="#6366f1"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0.2, 1, 0.2]
            }}
            transition={{ 
              duration: 3, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              delay: index * 0.2
            }}
          />
        ))}
        
        {nodes.map((node, index) => (
          <motion.circle
            key={`node-${node.id}`}
            cx={node.x}
            cy={node.y}
            r="8"
            fill="#8b5cf6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1
            }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.2
            }}
          />
        ))}
      </svg>
    </div>
  );
};

interface TaskPrioritizationProps {
  className?: string;
}

export const TaskPrioritization: React.FC<TaskPrioritizationProps> = ({ className = "w-full h-64" }) => {
  return (
    <div className={`${className} overflow-hidden`}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* Quadrants */}
        <motion.rect
          x="10"
          y="10"
          width="85"
          height="85"
          rx="4"
          fill="#fee2e2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.rect
          x="105"
          y="10"
          width="85"
          height="85"
          rx="4"
          fill="#dbeafe"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.rect
          x="10"
          y="105"
          width="85"
          height="85"
          rx="4"
          fill="#fef3c7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
        <motion.rect
          x="105"
          y="105"
          width="85"
          height="85"
          rx="4"
          fill="#dcfce7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />
        
        {/* Task items */}
        <motion.rect
          x="20"
          y="30"
          width="65"
          height="10"
          rx="2"
          fill="#ef4444"
          initial={{ x: -100 }}
          animate={{ x: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
        <motion.rect
          x="20"
          y="50"
          width="50"
          height="10"
          rx="2"
          fill="#ef4444"
          initial={{ x: -100 }}
          animate={{ x: 20 }}
          transition={{ duration: 0.5, delay: 1 }}
        />
        
        <motion.rect
          x="115"
          y="30"
          width="65"
          height="10"
          rx="2"
          fill="#3b82f6"
          initial={{ x: 300 }}
          animate={{ x: 115 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        />
        <motion.rect
          x="115"
          y="50"
          width="50"
          height="10"
          rx="2"
          fill="#3b82f6"
          initial={{ x: 300 }}
          animate={{ x: 115 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        />
        
        <motion.rect
          x="20"
          y="125"
          width="65"
          height="10"
          rx="2"
          fill="#f59e0b"
          initial={{ y: 300 }}
          animate={{ y: 125 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        />
        <motion.rect
          x="20"
          y="145"
          width="50"
          height="10"
          rx="2"
          fill="#f59e0b"
          initial={{ y: 300 }}
          animate={{ y: 145 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        />
        
        <motion.rect
          x="115"
          y="125"
          width="65"
          height="10"
          rx="2"
          fill="#10b981"
          initial={{ y: 300 }}
          animate={{ y: 125 }}
          transition={{ duration: 0.5, delay: 2 }}
        />
        <motion.rect
          x="115"
          y="145"
          width="50"
          height="10"
          rx="2"
          fill="#10b981"
          initial={{ y: 300 }}
          animate={{ y: 145 }}
          transition={{ duration: 0.5, delay: 2.2 }}
        />
        
        {/* Labels */}
        <text x="52" y="80" fontSize="10" textAnchor="middle" fill="#991b1b">Do First</text>
        <text x="147" y="80" fontSize="10" textAnchor="middle" fill="#1e40af">Schedule</text>
        <text x="52" y="175" fontSize="10" textAnchor="middle" fill="#92400e">Delegate</text>
        <text x="147" y="175" fontSize="10" textAnchor="middle" fill="#047857">Eliminate</text>
      </svg>
    </div>
  );
};

interface TimerIllustrationProps {
  className?: string;
}

export const TimerIllustration: React.FC<TimerIllustrationProps> = ({ className = "w-full h-64" }) => {
  return (
    <div className={`${className} overflow-hidden`}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* Timer body */}
        <motion.circle
          cx="100"
          cy="100"
          r="70"
          fill="#f3f4f6"
          stroke="#d1d5db"
          strokeWidth="4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Timer progress */}
        <motion.path
          d="M100,30 A70,70 0 0,1 170,100"
          stroke="#f97316"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ 
            duration: 2,
            ease: "easeInOut"
          }}
        />
        
        {/* Timer center */}
        <motion.circle
          cx="100"
          cy="100"
          r="60"
          fill="white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        
        {/* Clock hands */}
        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="60"
          stroke="#1f2937"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 60,
            ease: "linear",
            repeat: Infinity
          }}
          style={{ transformOrigin: '100px 100px' }}
        />
        
        <motion.line
          x1="100"
          y1="100"
          x2="130"
          y2="100"
          stroke="#f97316"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 10,
            ease: "linear",
            repeat: Infinity
          }}
          style={{ transformOrigin: '100px 100px' }}
        />
        
        {/* Center dot */}
        <circle
          cx="100"
          cy="100"
          r="5"
          fill="#1f2937"
        />
        
        {/* Time markers */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * (Math.PI / 180);
          const x1 = 100 + 55 * Math.sin(angle);
          const y1 = 100 - 55 * Math.cos(angle);
          const x2 = 100 + 60 * Math.sin(angle);
          const y2 = 100 - 60 * Math.cos(angle);
          
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#1f2937"
              strokeWidth={i % 3 === 0 ? "3" : "1"}
            />
          );
        })}
      </svg>
    </div>
  );
};
