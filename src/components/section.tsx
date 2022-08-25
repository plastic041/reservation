import { motion } from "framer-motion";
import React from "react";

type SectionProps = {
  children: React.ReactNode;
};
const Section = ({ children }: SectionProps) => {
  return (
    <motion.section
      className="flex flex-col gap-2"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.section>
  );
};

export default Section;
