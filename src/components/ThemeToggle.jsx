import { useTheme } from "../context/ThemeContext.jsx";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-20 h-10 bg-gray-200 dark:bg-blue-800 rounded-full p-1 flex items-center cursor-pointer transition-colors duration-500"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="w-8 h-8 bg-white dark:bg-blue-100 rounded-full shadow-md"
        layout
        animate={{ x: theme === "light" ? 0 : 40 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      <AnimatePresence mode="wait">
        <motion.span
          key={theme}
          className="absolute left-2.5 dark:left-12.5 text-sm"
          
        >
          {theme === "light" ? "☀️" : "🌙"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
