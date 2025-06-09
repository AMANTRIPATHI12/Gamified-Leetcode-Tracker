import { motion } from "framer-motion";

const Sidebar = ({ isOpen, toggle, setActiveView }) => {
  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="fixed top-0 left-0 h-full w-64 bg-black/80 backdrop-blur-sm z-30 p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Menu</h2>
      <ul className="space-y-4 text-lg">
        <li>
          <button onClick={() => { setActiveView("progress"); toggle(); }} className="hover:text-lime-400">
            Progress
          </button>
        </li>
        <li>
          <button onClick={() => { setActiveView("badges"); toggle(); }} className="hover:text-lime-400">
            Badges
          </button>
        </li>
        <li>
          <button onClick={() => { setActiveView("skills"); toggle(); }} className="hover:text-lime-400">
            Skill Tree
          </button>
        </li>
      </ul>

      <button onClick={toggle} className="mt-10 text-red-400 hover:underline">
        Close
      </button>
    </motion.aside>
  );
};


export default Sidebar;
