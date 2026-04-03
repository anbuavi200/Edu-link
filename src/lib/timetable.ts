export interface Subject {
  name: string;
  marks: number;
  difficulty: number; // 1-10
}

export interface TimetableEntry {
  day: string;
  slots: {
    time: string;
    startHour: number;
    subject: string;
    activity: string;
  }[];
}

export const generateSmartTimetable = (
  subjects: Subject[],
  hoursPerDay: number,
  examDates: Record<string, string>,
  preference: "morning" | "night"
): TimetableEntry[] => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timetable: TimetableEntry[] = [];

  // Calculate priority for each subject
  // priority = (low marks + high difficulty + exam proximity)
  const subjectsWithPriority = subjects.map((s) => {
    const examDate = examDates[s.name] ? new Date(examDates[s.name]) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const daysToExam = Math.max(1, (examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    
    // Normalize marks (0-100) and difficulty (1-10)
    const marksWeight = (100 - s.marks) / 10;
    const difficultyWeight = s.difficulty;
    const proximityWeight = 10 / daysToExam;

    const priority = marksWeight + difficultyWeight + proximityWeight;
    return { ...s, priority };
  });

  // Sort by priority descending
  subjectsWithPriority.sort((a, b) => b.priority - a.priority);

  const totalPriority = subjectsWithPriority.reduce((acc, s) => acc + s.priority, 0);

  days.forEach((day) => {
    const slots: any[] = [];
    let currentHour = preference === "morning" ? 8 : 14;

    subjectsWithPriority.forEach((s) => {
      const allocatedHours = (s.priority / totalPriority) * hoursPerDay;
      const roundedHours = Math.max(1, Math.round(allocatedHours));
      
      if (slots.length < 4) { // Limit to 4 slots per day for simplicity
        slots.push({
          time: `${currentHour}:00 - ${currentHour + roundedHours}:00`,
          startHour: currentHour,
          subject: s.name,
          activity: s.marks < 50 ? "Intensive Study" : "Revision & Practice"
        });
        currentHour += roundedHours + 1; // 1 hour break
      }
    });

    // Add a revision slot at the end
    slots.push({
      time: `${currentHour}:00 - ${currentHour + 1}:00`,
      startHour: currentHour,
      subject: "General",
      activity: "Daily Review & Planning"
    });

    timetable.push({ day, slots });
  });

  return timetable;
};
