import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Menu, X, Stethoscope, Plus } from 'lucide-react'
import Sidebar from './Sidebar'
import MessageBubble from './MessageBubble'
import TopicButton from './TopicButton'
import { conversations, medicalTopics } from '../data/mockData'
import { fadeIn, slideUp } from '../utils/motion'

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I\'m your Medical Assistant AI. How can I help you today?',
      sender: 'ai',
      timestamp: new Date().toISOString()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeConversation, setActiveConversation] = useState(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: 'Thank you for your question. As a medical assistant, I can provide general health information. However, for specific medical advice, please consult with a healthcare professional.',
        sender: 'ai',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleTopicClick = (topic) => {
    setInput(topic.prompt)
  }

  const handleNewChat = () => {
    setMessages([
      {
        id: 1,
        text: 'Hello! I\'m your Medical Assistant AI. How can I help you today?',
        sender: 'ai',
        timestamp: new Date().toISOString()
      }
    ])
    setActiveConversation(null)
  }

  const handleConversationSelect = (conv) => {
    setActiveConversation(conv)
    setMessages(conv.messages)
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        conversations={conversations}
        onSelectConversation={handleConversationSelect}
        onNewChat={handleNewChat}
      />

      <div className="flex-1 flex flex-col">
        <motion.header
          {...fadeIn}
          className="bg-surface border-b border-border px-4 py-4 flex items-center justify-between shadow-soft"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Stethoscope className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-text">Medical Assistant AI</h1>
                <p className="text-xs text-textMuted">Always here to help</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleNewChat}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus size={18} />
            <span className="text-sm font-medium">New Chat</span>
          </button>
        </motion.header>

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-hide">
          <motion.div {...slideUp} className="max-w-4xl mx-auto space-y-4">
            {messages.length === 1 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-text mb-4 text-center">How can I assist you today?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {medicalTopics.map(topic => (
                    <TopicButton
                      key={topic.id}
                      topic={topic}
                      onClick={() => handleTopicClick(topic)}
                    />
                  ))}
                </div>
              </div>
            )}

            <AnimatePresence>
              {messages.map((msg, index) => (
                <MessageBubble key={msg.id} message={msg} index={index} />
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-textMuted"
              >
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
                <span className="text-sm">AI is typing...</span>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </motion.div>
        </div>

        <motion.div
          {...fadeIn}
          className="border-t border-border bg-surface px-4 py-4 shadow-medium"
        >
          <div className="max-w-4xl mx-auto flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your medical question here..."
              className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              <Send size={18} />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
          <p className="text-xs text-textMuted text-center mt-3 max-w-4xl mx-auto">
            This AI assistant provides general health information only. Always consult healthcare professionals for medical advice.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ChatInterface