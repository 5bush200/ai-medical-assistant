import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'

const TopicButton = ({ topic, onClick }) => {
  const Icon = Icons[topic.icon] || Icons.MessageSquare

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(topic)}
      className="p-4 bg-surface border border-border rounded-xl hover:border-primary hover:shadow-medium transition-all text-left group"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
          <Icon className="text-primary" size={20} />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-text mb-1 group-hover:text-primary transition-colors">
            {topic.title}
          </h3>
          <p className="text-sm text-textMuted line-clamp-2">{topic.description}</p>
        </div>
      </div>
    </motion.button>
  )
}

export default TopicButton