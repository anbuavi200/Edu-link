import { motion } from "motion/react";
import { 
  Calendar, 
  Glasses, 
  Mic2, 
  Users2, 
  LayoutDashboard, 
  RefreshCw, 
  ShieldCheck 
} from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Personalized Study Planner",
      desc: "Dynamic schedules that prioritize weak subjects and adapt to your daily availability.",
      icon: <Calendar className="w-8 h-8 text-blue-400" />,
      color: "blue"
    },
    {
      title: "Smart Glasses Integration",
      desc: "HUD-style overlays for study reminders and real-time lecture annotations.",
      icon: <Glasses className="w-8 h-8 text-purple-400" />,
      color: "purple"
    },
    {
      title: "Speech-to-Text & Translation",
      desc: "Transcribe lectures instantly and translate them into your preferred language.",
      icon: <Mic2 className="w-8 h-8 text-blue-400" />,
      color: "blue"
    },
    {
      title: "Mentor–Mentee Network",
      desc: "A secure platform for peer-to-peer learning and professional mentorship.",
      icon: <Users2 className="w-8 h-8 text-purple-400" />,
      color: "purple"
    },
    {
      title: "AI Analytics Dashboard",
      desc: "Deep insights into your learning patterns, strengths, and areas for improvement.",
      icon: <LayoutDashboard className="w-8 h-8 text-blue-400" />,
      color: "blue"
    },
    {
      title: "Adaptive Scheduling",
      desc: "Real-time adjustments to your timetable based on your daily performance data.",
      icon: <RefreshCw className="w-8 h-8 text-purple-400" />,
      color: "purple"
    },
    {
      title: "Ethical AI",
      desc: "Built with privacy-first principles, ensuring your data is always secure and bias-free.",
      icon: <ShieldCheck className="w-8 h-8 text-blue-400" />,
      color: "blue"
    }
  ];

  return (
    <div className="pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Advanced AI Features</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            EduLink AI combines multiple cutting-edge technologies to provide a 
            comprehensive learning ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-slate-900 border border-white/5 rounded-3xl hover:border-blue-500/30 transition-all group"
            >
              <div className={`p-4 bg-slate-800 rounded-2xl mb-6 w-fit group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
