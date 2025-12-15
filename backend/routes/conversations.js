import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// In-memory storage
const conversations = new Map();

// GET - Get all conversations for a user
router.get('/', (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const userConversations = Array.from(conversations.values())
      .filter(conv => conv.userId === userId)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    res.json({
      success: true,
      conversations: userConversations,
      count: userConversations.length
    });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ error: 'Failed to retrieve conversations' });
  }
});

// GET - Get single conversation
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;

    if (!conversations.has(id)) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json({
      success: true,
      conversation: conversations.get(id)
    });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ error: 'Failed to retrieve conversation' });
  }
});

// POST - Create new conversation
router.post('/', (req, res) => {
  try {
    const { title, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const conversationId = uuidv4();
    const conversation = {
      id: conversationId,
      title: title || 'New Conversation',
      userId,
      messages: [
        {
          id: uuidv4(),
          text: "Hello! I'm your Medical Assistant AI. How can I help you today?",
          sender: 'ai',
          timestamp: new Date().toISOString()
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    conversations.set(conversationId, conversation);

    res.status(201).json({
      success: true,
      conversation
    });
  } catch (error) {
    console.error('Create conversation error:', error);
    res.status(500).json({ error: 'Failed to create conversation' });
  }
});

// PUT - Update conversation
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!conversations.has(id)) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    const conversation = conversations.get(id);
    if (title) conversation.title = title;
    conversation.updatedAt = new Date().toISOString();

    res.json({
      success: true,
      conversation
    });
  } catch (error) {
    console.error('Update conversation error:', error);
    res.status(500).json({ error: 'Failed to update conversation' });
  }
});

// DELETE - Delete conversation
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;

    if (!conversations.has(id)) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    conversations.delete(id);

    res.json({
      success: true,
      message: 'Conversation deleted successfully'
    });
  } catch (error) {
    console.error('Delete conversation error:', error);
    res.status(500).json({ error: 'Failed to delete conversation' });
  }
});

export default router;
