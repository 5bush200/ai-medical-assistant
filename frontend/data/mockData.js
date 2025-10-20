export const conversations = [
  {
    id: 1,
    title: 'Flu Symptoms Inquiry',
    preview: 'What are the common symptoms of flu?',
    date: '2 hours ago',
    messages: [
      {
        id: 1,
        text: 'Hello! I\'m your Medical Assistant AI. How can I help you today?',
        sender: 'ai',
        timestamp: new Date(Date.now() - 7200000).toISOString()
      },
      {
        id: 2,
        text: 'What are the common symptoms of flu?',
        sender: 'user',
        timestamp: new Date(Date.now() - 7100000).toISOString()
      },
      {
        id: 3,
        text: 'Common flu symptoms include fever, chills, muscle aches, cough, congestion, runny nose, headaches, and fatigue. If symptoms persist or worsen, please consult a healthcare professional.',
        sender: 'ai',
        timestamp: new Date(Date.now() - 7000000).toISOString()
      }
    ]
  },
  {
    id: 2,
    title: 'Medication Information',
    preview: 'Tell me about common pain relievers',
    date: '1 day ago',
    messages: [
      {
        id: 1,
        text: 'Hello! I\'m your Medical Assistant AI. How can I help you today?',
        sender: 'ai',
        timestamp: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 2,
        text: 'Tell me about common pain relievers',
        sender: 'user',
        timestamp: new Date(Date.now() - 86300000).toISOString()
      }
    ]
  },
  {
    id: 3,
    title: 'Appointment Scheduling',
    preview: 'How do I schedule a check-up?',
    date: '3 days ago',
    messages: [
      {
        id: 1,
        text: 'Hello! I\'m your Medical Assistant AI. How can I help you today?',
        sender: 'ai',
        timestamp: new Date(Date.now() - 259200000).toISOString()
      }
    ]
  },
  {
    id: 4,
    title: 'Vaccination Questions',
    preview: 'What vaccines do I need for travel?',
    date: '1 week ago',
    messages: [
      {
        id: 1,
        text: 'Hello! I\'m your Medical Assistant AI. How can I help you today?',
        sender: 'ai',
        timestamp: new Date(Date.now() - 604800000).toISOString()
      }
    ]
  },
  {
    id: 5,
    title: 'Allergy Consultation',
    preview: 'I have seasonal allergies',
    date: '2 weeks ago',
    messages: [
      {
        id: 1,
        text: 'Hello! I\'m your Medical Assistant AI. How can I help you today?',
        sender: 'ai',
        timestamp: new Date(Date.now() - 1209600000).toISOString()
      }
    ]
  }
]

export const medicalTopics = [
  {
    id: 1,
    title: 'Symptoms Check',
    description: 'Describe your symptoms and get general health information',
    icon: 'Activity',
    prompt: 'I would like to check my symptoms'
  },
  {
    id: 2,
    title: 'Medication Info',
    description: 'Learn about medications, dosages, and side effects',
    icon: 'Pill',
    prompt: 'I need information about medications'
  },
  {
    id: 3,
    title: 'Appointments',
    description: 'Get help scheduling or managing appointments',
    icon: 'Calendar',
    prompt: 'I need help with scheduling an appointment'
  },
  {
    id: 4,
    title: 'Lab Results',
    description: 'Understand your lab results and test reports',
    icon: 'FileText',
    prompt: 'I have questions about my lab results'
  },
  {
    id: 5,
    title: 'Preventive Care',
    description: 'Learn about vaccinations and health screenings',
    icon: 'Shield',
    prompt: 'Tell me about preventive care and vaccinations'
  },
  {
    id: 6,
    title: 'Healthy Living',
    description: 'Get tips on diet, exercise, and wellness',
    icon: 'Heart',
    prompt: 'I want advice on healthy living'
  }
]