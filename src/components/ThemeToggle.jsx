import { useTheme } from "../context/ThemeContext.jsx";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-20 h-10 bg-gray-200 dark:bg-blue-800 rounded-full p-1 flex items-center cursor-pointer transition-colors duration-500"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        className="w-8 h-8 bg-white dark:bg-blue-100 rounded-full shadow-md"
        layout
        initial={false} 
        animate={{ x: theme === "light" ? 0 : 40 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      <span className={`absolute text-sm transition-all duration-200 ${theme === "light" ? "left-2" : "left-12"}`}>
        {theme === "light" ? "☀️" : "🌙"}
      </span>
    </motion.button>
  );
}
