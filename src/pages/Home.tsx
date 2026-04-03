import { motion } from "motion/react";
import { ArrowRight, Sparkles, Brain, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  const features = [
    {
      title: t("home.features.planner.title"),
      desc: t("home.features.planner.desc"),
      icon: <Brain className="w-6 h-6 text-blue-400" />,
    },
    {
      title: t("home.features.integration.title"),
      desc: t("home.features.integration.desc"),
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
    },
    {
      title: t("home.features.speech.title"),
      desc: t("home.features.speech.desc"),
      icon: <Clock className="w-6 h-6 text-blue-400" />,
    },
    {
      title: t("home.features.mentor.title"),
      desc: t("home.features.mentor.desc"),
      icon: <Users className="w-6 h-6 text-purple-400" />,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] opacity-50" />
          <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] opacity-50" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>{t("home.heroBadge")}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            {t("home.heroTitle")} <br />
            <span className="text-blue-500">EduLink AI</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            {t("home.heroSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center group"
            >
              {t("nav.getStarted")}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/features"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all"
            >
              {t("home.learnMore")}
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("home.whyChoose")}</h2>
            <p className="text-slate-400">{t("home.revolutionizing")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-slate-800/50 border border-white/5 rounded-2xl hover:border-blue-500/50 transition-all group"
              >
                <div className="p-3 bg-slate-900 rounded-xl mb-4 w-fit group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-500 mb-2">95%</div>
              <div className="text-slate-400 text-sm">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-500 mb-2">10k+</div>
              <div className="text-slate-400 text-sm">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-500 mb-2">24/7</div>
              <div className="text-slate-400 text-sm">AI Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-500 mb-2">50+</div>
              <div className="text-slate-400 text-sm">Partner Institutions</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
