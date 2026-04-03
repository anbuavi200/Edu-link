import { motion } from "motion/react";
import { Target, Eye, Cpu, ShieldCheck } from "lucide-react";

export default function About() {
  const values = [
    {
      title: "Our Vision",
      desc: "To create a world where every student has access to personalized, AI-driven education that adapts to their unique learning style.",
      icon: <Eye className="w-8 h-8 text-blue-400" />,
    },
    {
      title: "Our Mission",
      desc: "Empowering learners through data-driven insights and intelligent planning tools that maximize academic potential.",
      icon: <Target className="w-8 h-8 text-purple-400" />,
    },
  ];

  return (
    <div className="pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About EduLink AI</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            We are a team of educators and engineers dedicated to building the future of 
            personalized learning through cutting-edge AI and ML technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-slate-900 border border-white/5 rounded-3xl"
            >
              <div className="mb-6">{v.icon}</div>
              <h2 className="text-2xl font-bold mb-4">{v.title}</h2>
              <p className="text-slate-400 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/10 rounded-[2.5rem] p-8 md:p-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Cpu className="text-blue-500" />
              Use of AI & ML
            </h2>
            <div className="space-y-6 text-slate-300">
              <p>
                EduLink AI leverages advanced Machine Learning algorithms to analyze student performance 
                patterns. Our system doesn't just create a schedule; it understands your learning 
                velocity and difficulty thresholds.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span><strong>Predictive Analytics:</strong> Forecasting exam performance based on current study habits.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span><strong>Natural Language Processing:</strong> Powering our voice assistant and lecture transcription services.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span><strong>Reinforcement Learning:</strong> Continuously optimizing study paths based on user feedback and results.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
