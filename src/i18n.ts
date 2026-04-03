import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        features: "Features",
        dashboard: "Dashboard",
        contact: "Contact",
        getStarted: "Get Started"
      },
      home: {
        heroBadge: "AI-Powered Study Planning",
        heroTitle: "Master Your Studies with",
        heroSubtitle: "The ultimate data-driven study planning system. Personalized schedules, AI analytics, and smart integrations to help you excel.",
        learnMore: "Learn More",
        whyChoose: "Why Choose EduLink AI?",
        revolutionizing: "Revolutionizing education through data and intelligence.",
        features: {
          planner: {
            title: "AI Study Planner",
            desc: "Personalized timetables that adapt to your progress and weak subjects."
          },
          integration: {
            title: "Smart Integration",
            desc: "Seamlessly connect with smart glasses and other learning devices."
          },
          speech: {
            title: "Speech-to-Text",
            desc: "Transcribe and translate lectures in real-time with AI precision."
          },
          mentor: {
            title: "Mentor Network",
            desc: "Connect with mentors and peers in a collaborative learning environment."
          }
        }
      },
      dashboard: {
        welcome: "Welcome back, Student!",
        overview: "Overview",
        timetable: "Timetable",
        analytics: "Analytics",
        studyConfig: "Study Config",
        generate: "Generate Timetable"
      }
    }
  },
  es: {
    translation: {
      nav: {
        home: "Inicio",
        about: "Acerca de",
        features: "Funciones",
        dashboard: "Panel",
        contact: "Contacto",
        getStarted: "Empezar"
      },
      home: {
        heroBadge: "Planificación de estudios con IA",
        heroTitle: "Domina tus estudios con",
        heroSubtitle: "El último sistema de planificación de estudios basado en datos. Horarios personalizados, análisis de IA e integraciones inteligentes para ayudarte a sobresalir.",
        learnMore: "Saber más",
        whyChoose: "¿Por qué elegir EduLink AI?",
        revolutionizing: "Revolucionando la educación a través de datos e inteligencia.",
        features: {
          planner: {
            title: "Planificador de IA",
            desc: "Horarios personalizados que se adaptan a tu progreso y materias débiles."
          },
          integration: {
            title: "Integración Inteligente",
            desc: "Conéctate sin problemas con gafas inteligentes y otros dispositivos de aprendizaje."
          },
          speech: {
            title: "Voz a Texto",
            desc: "Transcribe y traduce conferencias en tiempo real con precisión de IA."
          },
          mentor: {
            title: "Red de Mentores",
            desc: "Conéctate con mentores y compañeros en un entorno de aprendizaje colaborativo."
          }
        }
      },
      dashboard: {
        welcome: "¡Bienvenido de nuevo, Estudiante!",
        overview: "Resumen",
        timetable: "Horario",
        analytics: "Análisis",
        studyConfig: "Configuración",
        generate: "Generar Horario"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
