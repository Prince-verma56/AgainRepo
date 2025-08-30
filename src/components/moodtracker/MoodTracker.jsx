import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Camera, Smile, BarChart3, Menu, X, ChevronLeft, ChevronRight, Loader2, Circle, Image as ImageIcon, RotateCcw } from "lucide-react";
import Webcam from "react-webcam";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart
} from "recharts";

// --- UI Theme & Layout Constants ---
const theme = {
  bg: "linear-gradient(180deg, #f8f8fb 0%, #F5F5F5 100%)",
  sidebarBg: "linear-gradient(180deg, #F8F8FB 0%, #FFFFFF 100%)",
  cardBg: "#FFFFFF",
  primaryText: "#333333",
  secondaryText: "#828282",
  accentPurple: "#B9A0FF",
  accentPink: "#E6B5FF",
  shadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
};

const SIDEBAR_EXPANDED_W = 256;
const SIDEBAR_COLLAPSED_W = 64;
const EMOJI_GRID_COLS_SM = 6;

// Emoji data with associated mood values
const emojis = [
  { mood: "Happy", emoji: "😊", values: { anxiety: 18, depression: 10, moodScore: 4.8 } },
  { mood: "Sad", emoji: "😔", values: { anxiety: 48, depression: 62, moodScore: 2.0 } },
  { mood: "Angry", emoji: "😡", values: { anxiety: 55, depression: 40, moodScore: 2.6 } },
  { mood: "Anxious", emoji: "😟", values: { anxiety: 72, depression: 45, moodScore: 1.9 } },
  { mood: "Calm", emoji: "😌", values: { anxiety: 12, depression: 8, moodScore: 5.0 } },
  { mood: "Neutral", emoji: "😐", values: { anxiety: 32, depression: 28, moodScore: 3.5 } },
];

// Menu items for the sidebar
const menu = [
  { id: "mood", label: "Mood Tracker", icon: <Camera size={18} /> },
  { id: "reports", label: "Reports", icon: <BarChart3 size={18} /> },
];

// Webcam Capture Component with consistent size and modern look
const WebcamCapture = ({ onCapture, isLoading }) => {
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      onCapture(imageSrc);
    }
  }, [webcamRef, onCapture]);

  return (
    <div className="flex flex-col items-center justify-center relative rounded-2xl overflow-hidden w-full h-[320px] mx-auto shadow-md" style={{ backgroundColor: theme.primaryText }}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full h-full object-cover"
        videoConstraints={{ width: 480, height: 480, facingMode: "user" }}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <Loader2 className="h-12 w-12 animate-spin text-white" />
        </div>
      )}
      <button onClick={capture} className="absolute bottom-4 z-10 w-16 h-16 rounded-full border-4 border-white bg-white/30 flex items-center justify-center group hover:bg-white/50 transition-colors" aria-label="Capture Mood">
        <Circle className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};

// Gallery component to show captured images
const CapturedImagesGallery = ({ images }) => {
  return (
    <Card className="rounded-2xl" style={{ backgroundColor: theme.cardBg, boxShadow: theme.shadow }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2" style={{ color: theme.primaryText }}>
          <ImageIcon size={16} /> Captured Moments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 justify-center">
          {images.length > 0 ? (
            images.map((img, index) => (
              <div key={index} className="w-24 h-24 rounded-lg overflow-hidden shadow-md border-2" style={{ borderColor: theme.bg }}>
                <img src={img} alt={`Captured emotion ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))
          ) : (
            <div className="text-center py-4" style={{ color: theme.secondaryText }}>No images captured yet.</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function MoodTracker() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [page, setPage] = useState("mood");
  const [history, setHistory] = useState(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map(day => ({
      day,
      moodScore: parseFloat((Math.random() * 3 + 2).toFixed(1)),
      anxiety: Math.floor(Math.random() * 60) + 10,
      depression: Math.floor(Math.random() * 50) + 5,
    }));
  });
  const [selectedMood, setSelectedMood] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [capturedImages, setCapturedImages] = useState([]);
  const sidebarRef = useRef(null);

  const simulateMoodAnalysis = (imageSrc) => {
    setAnalyzing(true);
    return new Promise(resolve => {
      setTimeout(() => {
        const detectedMood = emojis[Math.floor(Math.random() * emojis.length)];
        resolve(detectedMood.mood);
      }, 1500);
    }).finally(() => {
      setAnalyzing(false);
    });
  };

  const handleCaptureAndAnalyze = async (imageSrc) => {
    setCapturedImages(prev => [imageSrc, ...prev]);
    try {
      const detectedMoodName = await simulateMoodAnalysis(imageSrc);
      const detectedEmoji = emojis.find(e => e.mood === detectedMoodName);
      if (detectedEmoji) {
        handleSelectEmoji(detectedEmoji);
        setShowResults(true);
      }
    } catch (error) {
      console.error("Analysis failed:", error);
    }
  };

  const handleSelectEmoji = (emo) => {
    setSelectedMood(emo.mood);
    setHistory(prev => {
      const today = new Date().toLocaleString('en-us', { weekday: 'short' });
      const newHistory = prev.map(entry => ({ ...entry }));
      const todayIndex = newHistory.findIndex(entry => entry.day === today);
      if (todayIndex !== -1) {
        newHistory[todayIndex] = {
          ...newHistory[todayIndex],
          moodScore: emo.values.moodScore,
          anxiety: emo.values.anxiety,
          depression: emo.values.depression,
        };
      } else {
        newHistory.push({
          day: today,
          moodScore: emo.values.moodScore,
          anxiety: emo.values.anxiety,
          depression: emo.values.depression,
        });
        if (newHistory.length > 7) {
            newHistory.shift();
        }
      }
      return newHistory;
    });
  };

  const handleReset = () => {
    setShowResults(false);
    setCapturedImages([]);
    setHistory(() => {
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      return days.map(day => ({
        day,
        moodScore: parseFloat((Math.random() * 3 + 2).toFixed(1)),
        anxiety: Math.floor(Math.random() * 60) + 10,
        depression: Math.floor(Math.random() * 50) + 5,
      }));
    });
  };

  const latestData = history[history.length - 1];

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setMobileOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED_W : SIDEBAR_EXPANDED_W;

  return (
    <div className="flex h-screen" style={{ background: theme.bg, color: theme.primaryText }}>
      {/* Sidebar (desktop) */}
      <motion.aside
        ref={sidebarRef}
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="hidden md:flex flex-col border-r border-gray-200 shrink-0"
        style={{ minWidth: SIDEBAR_COLLAPSED_W, background: theme.sidebarBg }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ background: theme.accentPurple }}>
              <Smile color="#FFFFFF" />
            </div>
            <motion.span
              initial={false}
              animate={{ opacity: collapsed ? 0 : 1, x: collapsed ? -8 : 0 }}
              transition={{ duration: 0.22 }}
              className="text-lg font-semibold"
              aria-hidden={collapsed}
              style={{ color: theme.primaryText }}
            >
              MoodTracker
            </motion.span>
          </div>
          <button onClick={() => setCollapsed(s => !s)} className="p-2 rounded-md hover:bg-gray-100" aria-label="Toggle sidebar">
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-2">
          {menu.map(m => {
            const active = page === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setPage(m.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${active ? "text-white shadow-md" : "hover:bg-gray-100"}`}
                style={active ? { background: theme.accentPurple, color: "#FFFFFF" } : { color: theme.secondaryText }}
                aria-pressed={active}
              >
                <div className="w-6 h-6 flex items-center justify-center">{m.icon}</div>
                <motion.span
                  initial={false}
                  animate={{ opacity: collapsed ? 0 : 1, x: collapsed ? -8 : 0 }}
                  transition={{ duration: 0.18 }}
                  className="truncate"
                  aria-hidden={collapsed}
                >
                  {m.label}
                </motion.span>
              </button>
            );
          })}
        </nav>
      </motion.aside>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <button onClick={() => setMobileOpen(s => !s)} className="p-2 rounded-full shadow-md" style={{ backgroundColor: theme.cardBg }} aria-label="open menu">
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: 0.3 }} className="md:hidden fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-72 p-4" style={{ backgroundColor: theme.cardBg }}>
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-lg" style={{ color: theme.primaryText }}>MoodTracker</div>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded"><X size={18} /></button>
              </div>
              <nav className="space-y-2">
                {menu.map(m => (
                  <button key={m.id} onClick={() => { setPage(m.id); setMobileOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl ${page === m.id ? "text-white" : "hover:bg-gray-100"}`} style={page === m.id ? { background: theme.accentPurple } : { color: theme.secondaryText }}>
                    <div className="w-6 h-6 flex items-center justify-center">{m.icon}</div>
                    <span>{m.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-gray-200 shrink-0" style={{ backgroundColor: theme.cardBg }}>
          <div>
            <h2 className="text-2xl font-semibold" style={{ color: theme.primaryText }}>{page === "mood" ? "Mood Tracker" : "Reports"}</h2>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="rounded-full" style={{ color: theme.primaryText, backgroundColor: theme.buttonBg }}>
              <Smile size={14} className="mr-1" /> Today
            </Button>
            <Button onClick={handleReset} variant="ghost" className="rounded-full" style={{ color: theme.primaryText, backgroundColor: theme.buttonBg }}>
              <RotateCcw size={14} className="mr-1" /> Reset
            </Button>
          </div>
        </header>

        <main className="p-6 flex-1 overflow-y-auto">
          {page === "mood" && (
            <div className="flex flex-col lg:flex-row gap-6 h-full">
              {/* Left Column: Camera, Emojis, Gallery */}
              <div className="flex-1 flex flex-col gap-6">
                <Card className="rounded-2xl w-full h-[400px] sm:h-[480px] shadow-md" style={{ backgroundColor: theme.cardBg }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2" style={{ color: theme.primaryText }}><Camera size={16} /> Camera Mood Tracker</CardTitle>
                  </CardHeader>
                  <CardContent className="h-full">
                    <WebcamCapture onCapture={handleCaptureAndAnalyze} isLoading={analyzing} />
                  </CardContent>
                </Card>

                <AnimatePresence>
                  {showResults && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col gap-6"
                    >
                      <Card className="rounded-2xl shadow-md" style={{ backgroundColor: theme.cardBg }}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2" style={{ color: theme.primaryText }}>
                            <Smile size={16} /> Your Mood
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className={`grid grid-cols-3 sm:grid-cols-${EMOJI_GRID_COLS_SM} gap-4`}>
                            {emojis.map(e => {
                              const active = selectedMood === e.mood;
                              return (
                                <motion.button
                                  key={e.mood}
                                  onClick={() => handleSelectEmoji(e)}
                                  className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-transform ${active ? "shadow-lg scale-105" : "hover:scale-105"}`}
                                  style={active ? { background: theme.accentPink, color: "#FFFFFF" } : { backgroundColor: theme.bg, color: theme.secondaryText }}
                                  aria-pressed={active}
                                  title={e.mood}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <div className="text-3xl">{e.emoji}</div>
                                  <div className="text-xs">{e.mood}</div>
                                </motion.button>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>

                      <CapturedImagesGallery images={capturedImages} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Column: Graphs */}
              <AnimatePresence>
                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 flex flex-col gap-6"
                  >
                    <Card className="rounded-2xl flex-1 shadow-md" style={{ backgroundColor: theme.cardBg }}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg" style={{ color: theme.primaryText }}>Anxiety Level</CardTitle>
                        <div className="text-2xl font-bold" style={{ color: theme.accentPink }}>{latestData.anxiety}%</div>
                      </CardHeader>
                      <CardContent className="flex flex-col justify-between h-full">
                        <div className="w-full h-[200px] mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsLineChart data={history}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                              <XAxis dataKey="day" stroke={theme.secondaryText} />
                              <YAxis domain={[0, 100]} stroke={theme.secondaryText} />
                              <Tooltip contentStyle={{ backgroundColor: theme.cardBg, border: `1px solid #e0e0e0`, color: theme.primaryText }} itemStyle={{ color: theme.primaryText }} />
                              <Legend />
                              <Line type="monotone" dataKey="anxiety" name="Anxiety (%)" stroke={theme.accentPink} strokeWidth={2} />
                            </RechartsLineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="rounded-2xl flex-1 shadow-md" style={{ backgroundColor: theme.cardBg }}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg" style={{ color: theme.primaryText }}>Depression Level</CardTitle>
                        <div className="text-2xl font-bold" style={{ color: theme.accentPink }}>{latestData.depression}%</div>
                      </CardHeader>
                      <CardContent className="flex flex-col justify-between h-full">
                        <div className="w-full h-[200px] mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsLineChart data={history}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                              <XAxis dataKey="day" stroke={theme.secondaryText} />
                              <YAxis domain={[0, 100]} stroke={theme.secondaryText} />
                              <Tooltip contentStyle={{ backgroundColor: theme.cardBg, border: `1px solid #e0e0e0`, color: theme.primaryText }} itemStyle={{ color: theme.primaryText }} />
                              <Legend />
                              <Line type="monotone" dataKey="depression" name="Depression (%)" stroke={theme.accentPink} strokeWidth={2} />
                            </RechartsLineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}