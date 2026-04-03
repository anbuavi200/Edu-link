import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  User, 
  Mail, 
  BookOpen, 
  Clock, 
  Target, 
  Save, 
  ArrowLeft,
  Camera,
  Sparkles,
  BarChart3
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "Student User",
    email: "student@example.com",
    bio: "Passionate learner focusing on Computer Science and Mathematics.",
    learningStyle: "Visual",
    targetGPA: "3.8",
    studyGoal: "Master AI and Machine Learning concepts by the end of the semester."
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setProfile(prev => ({ ...prev, email: parsed.email || prev.email }));
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    // In a real app, this would call a backend API
    localStorage.setItem("user_profile", JSON.stringify(profile));
  };

  return (
    <div className="min-h-screen pt-20 pb-32 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <Link 
            to="/dashboard" 
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${
              isEditing ? "bg-slate-800 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar: Avatar & Quick Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600" />
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 border-2 border-white/10 flex items-center justify-center overflow-hidden">
                  <User className="w-16 h-16 text-slate-700" />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full border-4 border-slate-900 hover:scale-110 transition-transform">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
              <p className="text-slate-400 text-sm mb-6">{profile.email}</p>
              
              <div className="pt-6 border-t border-white/5 space-y-4">
                <Link 
                  to="/dashboard" 
                  onClick={() => localStorage.setItem("dashboard_tab", "analytics")}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-all"
                >
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                  View Progress
                </Link>
              </div>
            </div>

            <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                Study Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Level</span>
                  <span className="font-bold text-blue-400">Advanced</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Study Streak</span>
                  <span className="font-bold text-purple-400">12 Days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Total Hours</span>
                  <span className="font-bold text-blue-400">156h</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSave} className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 md:p-12 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                    <User className="w-4 h-4" /> Full Name
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email Address
                  </label>
                  <input
                    type="email"
                    disabled={!isEditing}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Bio</label>
                <textarea
                  disabled={!isEditing}
                  rows={3}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all resize-none"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                />
              </div>

              <div className="pt-8 border-t border-white/5">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                  <Target className="text-purple-500" />
                  Study Preferences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> Learning Style
                    </label>
                    <select
                      disabled={!isEditing}
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all appearance-none"
                      value={profile.learningStyle}
                      onChange={(e) => setProfile({ ...profile, learningStyle: e.target.value })}
                    >
                      <option value="Visual">Visual Learner</option>
                      <option value="Auditory">Auditory Learner</option>
                      <option value="Reading/Writing">Reading/Writing Learner</option>
                      <option value="Kinesthetic">Kinesthetic Learner</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Target GPA
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
                      value={profile.targetGPA}
                      onChange={(e) => setProfile({ ...profile, targetGPA: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2 mt-8">
                  <label className="text-sm font-medium text-slate-400">Main Study Goal</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
                    value={profile.studyGoal}
                    onChange={(e) => setProfile({ ...profile, studyGoal: e.target.value })}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="pt-8">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all"
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                </div>
              )}

              {saved && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-green-500 text-sm font-medium"
                >
                  Profile updated successfully!
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
