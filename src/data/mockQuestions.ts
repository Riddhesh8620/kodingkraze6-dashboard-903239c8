export type QuestionType = 'dsa' | 'aptitude';

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export const mockQuestions: Question[] = [
  // DSA Questions
  {
    id: 'dsa-1',
    type: 'dsa',
    question: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    correctAnswer: 1,
    explanation: 'Binary search divides the search space in half each iteration, giving O(log n) complexity.',
  },
  {
    id: 'dsa-2',
    type: 'dsa',
    question: 'Which data structure uses LIFO (Last In First Out) principle?',
    options: ['Queue', 'Stack', 'Linked List', 'Tree'],
    correctAnswer: 1,
    explanation: 'Stack follows LIFO - the last element added is the first one to be removed.',
  },
  {
    id: 'dsa-3',
    type: 'dsa',
    question: 'What is the worst-case time complexity of QuickSort?',
    options: ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'],
    correctAnswer: 2,
    explanation: 'QuickSort has O(n²) worst case when the pivot selection is poor (already sorted array).',
  },
  {
    id: 'dsa-4',
    type: 'dsa',
    question: 'Which traversal of a BST gives elements in sorted order?',
    options: ['Pre-order', 'Post-order', 'In-order', 'Level-order'],
    correctAnswer: 2,
    explanation: 'In-order traversal of BST visits nodes in ascending order (left, root, right).',
  },
  {
    id: 'dsa-5',
    type: 'dsa',
    question: 'What is the space complexity of merge sort?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 2,
    explanation: 'Merge sort requires O(n) auxiliary space for the temporary arrays during merging.',
  },
  // Aptitude Questions
  {
    id: 'apt-1',
    type: 'aptitude',
    question: 'If a train travels 360 km in 4 hours, what is its speed in km/h?',
    options: ['80 km/h', '90 km/h', '85 km/h', '95 km/h'],
    correctAnswer: 1,
    explanation: 'Speed = Distance/Time = 360/4 = 90 km/h',
  },
  {
    id: 'apt-2',
    type: 'aptitude',
    question: 'What comes next in the series: 2, 6, 12, 20, 30, ?',
    options: ['40', '42', '44', '46'],
    correctAnswer: 1,
    explanation: 'The differences are 4, 6, 8, 10, 12. So 30 + 12 = 42.',
  },
  {
    id: 'apt-3',
    type: 'aptitude',
    question: 'A can complete a work in 10 days and B in 15 days. In how many days can they complete it together?',
    options: ['5 days', '6 days', '7 days', '8 days'],
    correctAnswer: 1,
    explanation: 'Combined rate = 1/10 + 1/15 = 5/30 = 1/6. So 6 days.',
  },
  {
    id: 'apt-4',
    type: 'aptitude',
    question: 'What is 25% of 480?',
    options: ['100', '110', '120', '130'],
    correctAnswer: 2,
    explanation: '25% of 480 = (25/100) × 480 = 120',
  },
  {
    id: 'apt-5',
    type: 'aptitude',
    question: 'If the ratio of boys to girls in a class is 3:5 and there are 40 students, how many are girls?',
    options: ['15', '20', '25', '30'],
    correctAnswer: 2,
    explanation: 'Girls = (5/8) × 40 = 25',
  },
];

export const getQuestionsByType = (type: 'dsa' | 'aptitude' | 'mixed'): Question[] => {
  if (type === 'mixed') {
    return mockQuestions;
  }
  return mockQuestions.filter(q => q.type === type);
};
