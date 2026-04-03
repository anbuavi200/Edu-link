import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateTimetableAI = async (userData: any) => {
  const prompt = `Generate a personalized study timetable based on:
    Subjects: ${JSON.stringify(userData.subjects)}
    Available hours: ${userData.hoursPerDay}
    Preference: ${userData.preference}
    Exam Dates: ${JSON.stringify(userData.examDates)}
    
    Return a JSON object with a 'dailySchedule' array containing objects with 'time', 'subject', and 'activity'.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text);
};

export const transcribeAudio = async (base64Audio: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { text: "Transcribe this audio lecture accurately." },
        { inlineData: { data: base64Audio, mimeType: "audio/wav" } }
      ]
    }
  });

  return response.text;
};
