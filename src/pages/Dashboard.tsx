import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from "recharts";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  LayoutDashboard, 
  Calendar, 
  TrendingUp, 
  BookOpen, 
  Plus, 
  Trash2, 
  Save,
  BrainCircuit,
  Clock,
  BarChart3,
  Bell,
  BellRing,
  Edit2,
  Check,
  UserCircle
} from "lucide-react";
import { generateSmartTimetable, Subject, TimetableEntry } from "../lib/timetable";
import VoiceAssistant from "../components/VoiceAssistant";
import { requestNotificationPermission, scheduleNotification } from "../lib/notifications";

const MOCK_PERFORMANCE = [
  { name: "Math", score: 45, prev: 40 },
  { name: "Physics", score: 55, prev: 50 },
  { name: "Chemistry", score: 75, prev: 70 },
  { name: "Biology", score: 85, prev: 80 },
  { name: "English", score: 90, prev: 88 },
];

const PROGRESS_DATA = [
  { day: "Mon", hours: 4 },
  { day: "Tue", hours: 6 },
  { day: "Wed", hours: 5 },
  { day: "Thu", hours: 8 },
  { day: "Fri", hours: 4 },
  { day: "Sat", hours: 10 },
  { day: "Sun", hours: 7 },
];

export default function Dashboard() {
  const { t } = useTranslation();
  const [subjects, setSubjects] = useState<Subject[]>([
    { name: "Math", marks: 45, difficulty: 9 },
    { name: "Physics", marks: 55, difficulty: 7 },
  ]);
  const [hoursPerDay, setHoursPerDay] = useState(6);
  const [preference, setPreference] = useState<"morning" | "night">("morning");
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "timetable" | "analytics">("overview");
  const [reminderOffset, setReminderOffset] = useState(5);
  const [editingSlot, setEditingSlot] = useState<{ dayIndex: number; slotIndex: number } | null>(null);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>(
    "Notification" in window ? Notification.permission : "denied"
  );

  const handleRequestPermission = async () => {
    const granted = await requestNotificationPermission();
    setNotificationPermission(granted ? "granted" : "denied");
  };

  const getNextDayDate = (dayName: string, hour: number) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const targetDay = days.indexOf(dayName);
    const now = new Date();
    const resultDate = new Date();
    
    resultDate.setHours(hour, 0, 0, 0);
    
    let daysToAdd = (targetDay + 7 - now.getDay()) % 7;
    if (daysToAdd === 0 && now.getHours() >= hour) {
      daysToAdd = 7;
    }
    
    resultDate.setDate(now.getDate() + daysToAdd);
    return resultDate;
  };

  const handleSetReminder = (day: string, subject: string, startHour: number) => {
    const targetDate = getNextDayDate(day, startHour);
    
    scheduleNotification(
      `Study Session: ${subject}`,
      `Your ${subject} session starts in ${reminderOffset} minutes.`,
      targetDate,
      reminderOffset
    );
    
    const notifyTime = new Date(targetDate.getTime() - reminderOffset * 60 * 1000);
    alert(`Reminder set! You will be notified on ${notifyTime.toLocaleString()} (${reminderOffset} mins before session).`);
  };

  const handleUpdateTimetableSlot = (dayIndex: number, slotIndex: number, field: string, value: string) => {
    const newTimetable = [...timetable];
    (newTimetable[dayIndex].slots[slotIndex] as any)[field] = value;
    setTimetable(newTimetable);
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { name: "", marks: 50, difficulty: 5 }]);
  };

  const handleRemoveSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const handleUpdateSubject = (index: number, field: keyof Subject, value: any) => {
    const newSubjects = [...subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    setSubjects(newSubjects);
  };

  const handleGenerate = () => {
    const generated = generateSmartTimetable(subjects, hoursPerDay, {}, preference);
    setTimetable(generated);
    setActiveTab("timetable");
  };

  const handleVoiceCommand = (command: string) => {
    const cmd = command.toLowerCase();
    if (cmd.includes("generate") || cmd.includes("timetable")) {
      handleGenerate();
    } else if (cmd.includes("analytics") || cmd.includes("progress")) {
      setActiveTab("analytics");
    } else if (cmd.includes("overview")) {
      setActiveTab("overview");
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div className="flex items-center gap-4">
            <Link to="/profile" className="p-2 bg-slate-900 border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all group">
              <UserCircle className="w-8 h-8 text-slate-400 group-hover:text-blue-400 transition-colors" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold mb-1">{t("dashboard.welcome")}</h1>
              <p className="text-slate-400 text-sm">Here's your personalized learning overview.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {notificationPermission !== "granted" && (
              <button
                onClick={handleRequestPermission}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-white/5 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all"
              >
                <BellRing className="w-4 h-4" />
                Enable Notifications
              </button>
            )}
            <div className="flex bg-slate-900 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "overview" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {t("dashboard.overview")}
            </button>
            <button
              onClick={() => setActiveTab("timetable")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "timetable" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {t("dashboard.timetable")}
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "analytics" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {t("dashboard.analytics")}
            </button>
          </div>
        </div>
      </div>

      {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Subject Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 bg-slate-900 border border-white/5 rounded-3xl p-6 h-fit"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <BookOpen className="text-blue-500" />
                  {t("dashboard.studyConfig")}
                </h2>
                <button
                  onClick={handleAddSubject}
                  className="p-2 bg-blue-600/10 text-blue-500 rounded-lg hover:bg-blue-600/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-6 mb-8">
                {subjects.map((s, i) => (
                  <div key={i} className="p-4 bg-slate-800/50 rounded-2xl border border-white/5 relative group">
                    <button
                      onClick={() => handleRemoveSubject(i)}
                      className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Subject Name"
                        className="w-full bg-transparent border-b border-white/10 focus:border-blue-500 outline-none py-1 text-sm"
                        value={s.name}
                        onChange={(e) => handleUpdateSubject(i, "name", e.target.value)}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1">Marks (%)</label>
                          <input
                            type="number"
                            className="w-full bg-slate-900 rounded-lg px-2 py-1 text-xs border border-white/5"
                            value={s.marks}
                            onChange={(e) => handleUpdateSubject(i, "marks", parseInt(e.target.value))}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-slate-500 mb-1">Difficulty (1-10)</label>
                          <input
                            type="number"
                            className="w-full bg-slate-900 rounded-lg px-2 py-1 text-xs border border-white/5"
                            value={s.difficulty}
                            onChange={(e) => handleUpdateSubject(i, "difficulty", parseInt(e.target.value))}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Study Hours / Day</label>
                  <input
                    type="range"
                    min="1"
                    max="16"
                    className="w-full accent-blue-500"
                    value={hoursPerDay}
                    onChange={(e) => setHoursPerDay(parseInt(e.target.value))}
                  />
                  <div className="text-right text-xs text-blue-400 font-bold mt-1">{hoursPerDay} Hours</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Learning Preference</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPreference("morning")}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        preference === "morning" ? "bg-blue-600 border-blue-500" : "bg-slate-800 border-white/5 text-slate-400"
                      }`}
                    >
                      Morning Bird
                    </button>
                    <button
                      onClick={() => setPreference("night")}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        preference === "night" ? "bg-blue-600 border-blue-500" : "bg-slate-800 border-white/5 text-slate-400"
                      }`}
                    >
                      Night Owl
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleGenerate}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all"
                >
                  <BrainCircuit className="w-5 h-5" />
                  {t("dashboard.generate")}
                </button>
              </div>
            </motion.div>

            {/* Quick Stats & Charts */}
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 bg-slate-900 border border-white/5 rounded-3xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-sm text-slate-400">Avg. Score</span>
                  </div>
                  <div className="text-3xl font-bold">72%</div>
                  <div className="text-xs text-green-500 mt-1">+4.2% from last month</div>
                </div>
                <div className="p-6 bg-slate-900 border border-white/5 rounded-3xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <Clock className="w-5 h-5 text-purple-500" />
                    </div>
                    <span className="text-sm text-slate-400">Study Hours</span>
                  </div>
                  <div className="text-3xl font-bold">42.5h</div>
                  <div className="text-xs text-slate-500 mt-1">This week</div>
                </div>
                <div className="p-6 bg-slate-900 border border-white/5 rounded-3xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-sm text-slate-400">Completion</span>
                  </div>
                  <div className="text-3xl font-bold">88%</div>
                  <div className="text-xs text-blue-500 mt-1">Tasks finished</div>
                </div>
              </div>

              <div className="p-8 bg-slate-900 border border-white/5 rounded-[2.5rem]">
                <h3 className="text-xl font-bold mb-8">Performance Analytics</h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MOCK_PERFORMANCE}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                        itemStyle={{ color: "#fff" }}
                      />
                      <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="prev" fill="#1e293b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "timetable" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between bg-slate-900 p-6 rounded-[2rem] border border-white/5">
              <div className="flex items-center gap-4">
                <Bell className="text-blue-500 w-5 h-5" />
                <span className="text-sm font-medium text-slate-300">Notify me</span>
                <select 
                  value={reminderOffset}
                  onChange={(e) => setReminderOffset(parseInt(e.target.value))}
                  className="bg-slate-800 border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>At start time</option>
                  <option value={5}>5 minutes before</option>
                  <option value={10}>10 minutes before</option>
                  <option value={15}>15 minutes before</option>
                  <option value={30}>30 minutes before</option>
                </select>
              </div>
              <p className="text-xs text-slate-500 italic">
                * Timetable is automatically adjusted to your local time zone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
              </p>
            </div>

            {timetable.length === 0 ? (
              <div className="text-center py-20 bg-slate-900 border border-white/5 rounded-[2.5rem]">
                <Calendar className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No Timetable Generated</h3>
                <p className="text-slate-400 mb-8">Configure your subjects and click generate to see your smart schedule.</p>
                <button
                  onClick={() => setActiveTab("overview")}
                  className="px-6 py-3 bg-blue-600 rounded-xl font-bold"
                >
                  Go to Config
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {timetable.map((day, i) => (
                  <div key={i} className="bg-slate-900 border border-white/5 rounded-3xl overflow-hidden">
                    <div className="bg-slate-800 px-6 py-4 border-b border-white/5">
                      <h3 className="font-bold text-blue-400">{day.day}</h3>
                    </div>
                    <div className="p-6 space-y-6">
                      {day.slots.map((slot, j) => (
                        <div key={j} className="relative pl-4 border-l-2 border-blue-500/30 group/slot">
                          <div className="flex items-center justify-between">
                            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">{slot.time}</div>
                            <div className="flex items-center gap-1 opacity-0 group-hover/slot:opacity-100 transition-all">
                              <button
                                onClick={() => setEditingSlot(editingSlot?.dayIndex === i && editingSlot?.slotIndex === j ? null : { dayIndex: i, slotIndex: j })}
                                className="p-1.5 bg-white/5 text-slate-400 rounded-lg hover:text-white"
                              >
                                {editingSlot?.dayIndex === i && editingSlot?.slotIndex === j ? <Check className="w-3 h-3" /> : <Edit2 className="w-3 h-3" />}
                              </button>
                              <button
                                onClick={() => handleSetReminder(day.day, slot.subject, slot.startHour)}
                                className="p-1.5 bg-blue-600/10 text-blue-500 rounded-lg hover:bg-blue-600/20"
                                title="Set Reminder"
                              >
                                <Bell className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          
                          {editingSlot?.dayIndex === i && editingSlot?.slotIndex === j ? (
                            <div className="space-y-2 mt-2">
                              <input 
                                type="text"
                                className="w-full bg-slate-800 border border-white/10 rounded px-2 py-1 text-xs"
                                value={slot.subject}
                                onChange={(e) => handleUpdateTimetableSlot(i, j, "subject", e.target.value)}
                              />
                              <input 
                                type="text"
                                className="w-full bg-slate-800 border border-white/10 rounded px-2 py-1 text-xs"
                                value={slot.activity}
                                onChange={(e) => handleUpdateTimetableSlot(i, j, "activity", e.target.value)}
                              />
                            </div>
                          ) : (
                            <>
                              <div className="font-bold text-sm mb-1">{slot.subject}</div>
                              <div className="text-xs text-slate-400">{slot.activity}</div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "analytics" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="p-8 bg-slate-900 border border-white/5 rounded-[2.5rem]">
              <h3 className="text-xl font-bold mb-8">Study Hours Progress</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={PROGRESS_DATA}>
                    <defs>
                      <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="hours" stroke="#3b82f6" fillOpacity={1} fill="url(#colorHours)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-8 bg-slate-900 border border-white/5 rounded-[2.5rem]">
              <h3 className="text-xl font-bold mb-8">Subject Difficulty vs Performance</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={subjects}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="marks" stroke="#3b82f6" strokeWidth={3} dot={{ fill: "#3b82f6" }} />
                    <Line type="monotone" dataKey="difficulty" stroke="#a855f7" strokeWidth={3} dot={{ fill: "#a855f7" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <VoiceAssistant onCommand={handleVoiceCommand} />
    </div>
  );
}
