// Module content for the ADHD Time learning modules

export interface ModuleSection {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
}

export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface DetailedModule {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  sections: ModuleSection[];
  quiz: Quiz[];
}

export const moduleData: DetailedModule[] = [
  {
    id: 'module-1',
    title: 'Understanding ADHD: Myths vs. Facts',
    description: 'Learn to distinguish common misconceptions from scientific facts about ADHD.',
    difficulty: 'Beginner',
    duration: '15 min',
    sections: [
      {
        id: 'section-1',
        title: 'What is ADHD?',
        content: 'Attention-Deficit/Hyperactivity Disorder (ADHD) is a neurodevelopmental disorder that affects both children and adults. It is characterized by persistent patterns of inattention, hyperactivity, and impulsivity that interfere with functioning and development.\n\nADHD is one of the most common neurodevelopmental disorders of childhood, affecting approximately 5-7% of children and adolescents worldwide. Contrary to popular belief, ADHD often persists into adulthood, with about 60-70% of children with ADHD continuing to meet criteria for the disorder in adulthood.',
        imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
      },
      {
        id: 'section-2',
        title: 'Myth: ADHD is not a real medical condition',
        content: 'One of the most harmful myths about ADHD is that it\'s not a real medical condition or that it\'s simply an excuse for laziness or poor behavior.\n\nFACT: ADHD is recognized as a legitimate neurodevelopmental disorder by major medical and psychiatric organizations worldwide, including the American Psychiatric Association, the World Health Organization, and the National Institutes of Health.\n\nResearch using brain imaging techniques has shown structural and functional differences in the brains of individuals with ADHD compared to those without the condition. These differences affect areas involved in attention, impulse control, and executive function.',
        imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
      },
      {
        id: 'section-3',
        title: 'Myth: ADHD is caused by poor parenting',
        content: 'Another common misconception is that ADHD is the result of poor parenting, lack of discipline, or too much sugar or screen time.\n\nFACT: ADHD has a strong genetic component, with heritability estimated at around 74%. This means that genetics play a significant role in determining who develops ADHD.\n\nWhile environmental factors can influence the expression and severity of symptoms, they are not the primary cause of ADHD.',
        imageUrl: 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
      }
    ],
    quiz: [
      {
        question: 'What percentage of children with ADHD continue to experience significant symptoms into adulthood?',
        options: ['20-30%', '40-50%', '60-70%', '80-90%'],
        correctAnswer: 2
      },
      {
        question: 'Which of the following is NOT a primary cause of ADHD?',
        options: ['Genetic factors', 'Poor parenting', 'Prenatal exposure to certain substances', 'Premature birth'],
        correctAnswer: 1
      },
      {
        question: 'What is "hyperfocus" in relation to ADHD?',
        options: [
          'The inability to focus on anything at all',
          'Periods of intense concentration on activities found interesting',
          'A medication side effect',
          'A technique used to treat ADHD'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'module-2',
    title: 'ADHD and Executive Functions',
    description: 'Explore how ADHD affects executive functions and strategies to improve them.',
    difficulty: 'Intermediate',
    duration: '20 min',
    sections: [
      {
        id: 'section-1',
        title: 'What are Executive Functions?',
        content: 'Executive functions are a set of cognitive processes that are necessary for the cognitive control of behavior. They are essential for selecting and successfully monitoring behaviors that facilitate the attainment of chosen goals.\n\nExecutive functions include basic cognitive processes such as working memory, inhibitory control, and cognitive flexibility.',
        imageUrl: 'https://images.unsplash.com/photo-1551847677-dc82d764e1eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
      },
      {
        id: 'section-2',
        title: 'How ADHD Impacts Executive Functions',
        content: 'ADHD is now widely understood as a disorder of executive function. While attention difficulties are a prominent feature, the underlying challenges often stem from executive function deficits.\n\nIndividuals with ADHD typically experience difficulties in multiple areas of executive function including working memory, inhibitory control, and cognitive flexibility.',
        imageUrl: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80'
      }
    ],
    quiz: [
      {
        question: 'Which of the following is NOT considered a basic executive function?',
        options: ['Working memory', 'Inhibitory control', 'Cognitive flexibility', 'Time management'],
        correctAnswer: 3
      },
      {
        question: 'What is "time blindness" in relation to ADHD?',
        options: [
          'The inability to read analog clocks',
          'Difficulty perceiving the passage of time accurately',
          'A side effect of ADHD medication',
          'The tendency to be early for appointments'
        ],
        correctAnswer: 1
      },
      {
        question: 'Which strategy would be most helpful for working memory challenges?',
        options: [
          'Using a timer',
          'Color-coding files',
          'Creating written checklists',
          'Exercising regularly'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'module-7',
    title: 'ADHD and Time Management',
    description: 'Learn effective strategies to manage time, overcome procrastination, and increase productivity.',
    difficulty: 'Beginner',
    duration: '20 min',
    sections: [
      {
        id: 'section-1',
        title: 'Understanding Time Perception in ADHD',
        content: 'Time perception difficulties are a core challenge for many people with ADHD. This is often referred to as "time blindness" - a reduced ability to sense the passage of time and accurately estimate how long activities will take.',
        imageUrl: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
      },
      {
        id: 'section-2',
        title: 'External Time Management Tools',
        content: 'External tools and systems are essential for managing time with ADHD. These create structure and provide reminders that compensate for internal time perception challenges.',
        imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
      }
    ],
    quiz: [
      {
        question: 'What is "time blindness" in relation to ADHD?',
        options: [
          'The inability to read analog clocks',
          'A reduced ability to sense the passage of time',
          'Being chronically late for appointments',
          'A side effect of ADHD medication'
        ],
        correctAnswer: 1
      },
      {
        question: 'Which of the following is NOT a common reason for procrastination in ADHD?',
        options: [
          'Task initiation difficulties',
          'Perfectionism',
          'Laziness',
          'Working memory issues'
        ],
        correctAnswer: 2
      },
      {
        question: 'What is the standard work interval in the traditional Pomodoro Technique?',
        options: [
          '10 minutes',
          '25 minutes',
          '45 minutes',
          '60 minutes'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'module-8',
    title: 'ADHD-Friendly Organization Systems',
    description: 'Discover practical organization strategies designed specifically for the ADHD brain.',
    difficulty: 'Intermediate',
    duration: '25 min',
    sections: [
      {
        id: 'section-1',
        title: 'Why Traditional Organization Systems Often Fail with ADHD',
        content: 'Many conventional organization systems aren\'t designed with the ADHD brain in mind. Understanding why these systems often fail can help in developing more effective alternatives.',
        imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80'
      },
      {
        id: 'section-2',
        title: 'ADHD-Friendly Physical Organization',
        content: 'Physical organization systems for ADHD should prioritize visibility, simplicity, and ease of maintenance.',
        imageUrl: 'https://images.unsplash.com/photo-1587301669187-6b0e79418ec5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
      }
    ],
    quiz: [
      {
        question: 'Why do traditional organization systems often fail for people with ADHD?',
        options: [
          'People with ADHD are inherently disorganized',
          'Traditional systems are too expensive',
          'Many systems are too complex and maintenance-heavy',
          'ADHD makes it impossible to use any organization system'
        ],
        correctAnswer: 2
      },
      {
        question: 'What is a key principle of ADHD-friendly physical organization?',
        options: [
          'Using closed storage to hide visual clutter',
          'Creating complex categorization systems',
          'Visual accessibility and simplified systems',
          'Organizing items alphabetically'
        ],
        correctAnswer: 2
      },
      {
        question: 'What is meant by "out of sight, out of mind" in relation to ADHD?',
        options: [
          'Items that are hidden are often forgotten about',
          'Visual distractions should be minimized',
          'People with ADHD have poor visual memory',
          'Organization should focus on aesthetic appearance'
        ],
        correctAnswer: 0
      }
    ]
  }
];
