import { motion, AnimatePresence } from 'framer-motion'
import { Search, MessageSquare, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { slideIn } from '../utils/motion'

const Sidebar = ({ isOpen, onClose, conversations, onSelectConversation, onNewChat }) => {
  const [search, setSearch] = useState('')

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      <motion.aside
        {...slideIn}
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-80 bg-surface border-r border-border flex flex-col transition-transform duration-300`}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text">Conversations</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <button
            onClick={() => {
              onNewChat()
              onClose()
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus size={18} />
            <span className="font-medium">New Conversation</span>
          </button>
        </div>

        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-2 scrollbar-hide">
          {filteredConversations.map(conv => (
            <motion.button
              key={conv.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectConversation(conv)}
              className="w-full text-left p-3 rounded-lg hover:bg-slate-100 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="text-primary" size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-text truncate group-hover:text-primary transition-colors">
                    {conv.title}
                  </h3>
                  <p className="text-sm text-textMuted truncate">{conv.preview}</p>
                  <p className="text-xs text-textMuted mt-1">{conv.date}</p>
                </div>
              </div>
            </motion.button>
          ))}

          {filteredConversations.length === 0 && (
            <div className="text-center py-8 text-textMuted">
              <MessageSquare className="mx-auto mb-2" size={32} />
              <p className="text-sm">No conversations found</p>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar