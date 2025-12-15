import express from 'express';

const router = express.Router();

// Medical topics data
const topics = [
  {
    id: 1,
    title: 'Symptoms Check',
    description: 'Describe your symptoms and get general health information',
    icon: 'Activity',
    prompt: 'I would like to check my symptoms',
    category: 'diagnosis'
  },
  {
    id: 2,
    title: 'Medication Info',
    description: 'Learn about medications, dosages, and side effects',
    icon: 'Pill',
    prompt: 'I need information about medications',
    category: 'medications'
  },
  {
    id: 3,
    title: 'Appointments',
    description: 'Get help scheduling or managing appointments',
    icon: 'Calendar',
    prompt: 'I need help with scheduling an appointment',
    category: 'appointments'
  },
  {
    id: 4,
    title: 'Lab Results',
    description: 'Understand your lab results and test reports',
    icon: 'FileText',
    prompt: 'I have questions about my lab results',
    category: 'lab'
  },
  {
    id: 5,
    title: 'Preventive Care',
    description: 'Learn about vaccinations and health screenings',
    icon: 'Shield',
    prompt: 'Tell me about preventive care and vaccinations',
    category: 'prevention'
  },
  {
    id: 6,
    title: 'Healthy Living',
    description: 'Get tips on diet, exercise, and wellness',
    icon: 'Heart',
    prompt: 'I want advice on healthy living',
    category: 'wellness'
  }
];

// GET - Get all topics
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      topics,
      count: topics.length
    });
  } catch (error) {
    console.error('Get topics error:', error);
    res.status(500).json({ error: 'Failed to retrieve topics' });
  }
});

// GET - Get topics by category
router.get('/category/:category', (req, res) => {
  try {
    const { category } = req.params;
    const categoryTopics = topics.filter(t => t.category === category);

    if (categoryTopics.length === 0) {
      return res.status(404).json({ error: 'No topics found for this category' });
    }

    res.json({
      success: true,
      topics: categoryTopics,
      count: categoryTopics.length
    });
  } catch (error) {
    console.error('Get category topics error:', error);
    res.status(500).json({ error: 'Failed to retrieve topics' });
  }
});

// GET - Get single topic
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const topic = topics.find(t => t.id === parseInt(id));

    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    res.json({
      success: true,
      topic
    });
  } catch (error) {
    console.error('Get topic error:', error);
    res.status(500).json({ error: 'Failed to retrieve topic' });
  }
});

export default router;
