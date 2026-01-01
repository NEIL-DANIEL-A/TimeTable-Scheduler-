
import React, { useState, useMemo, useEffect } from 'react';
import { 
  LayoutGrid, Users, CheckCircle2, AlertCircle, 
  Calendar, BookOpen, User, MapPin, 
  Sparkles, Trash2, X, Info, RefreshCw,
  Trophy, GraduationCap, MinusCircle, Wand2, Zap,
  Clock, Coffee, Sun, BarChart3
} from 'lucide-react';
import { SUBJECTS as INITIAL_SUBJECTS } from './data';
import { Subject, Teacher, Day, TimeSlot, SelectionState } from './types';
import { GoogleGenAI, Type } from "@google/genai";

// Constants
const DAYS = Object.values(Day);
const TIMES = Array.from({ length: 12 }, (_, i) => `${String(8 + i).padStart(2, '0')}:00`);
const TARGET_FINISH_MINUTES = 15 * 60; // 15:00

// Helper to convert time to minutes since 00:00
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

// Check if two slots overlap
const isOverlapping = (slot1: TimeSlot, slot2: TimeSlot): boolean => {
  if (slot1.day !== slot2.day) return false;
  const start1 = timeToMinutes(slot1.startTime);
  const end1 = timeToMinutes(slot1.endTime);
  const start2 = timeToMinutes(slot2.startTime);
  const end2 = timeToMinutes(slot2.endTime);
  return Math.max(start1, start2) < Math.min(end1, end2);
};

const App: React.FC = () => {
  // Persistence
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('timetable_subjects');
    return saved ? JSON.parse(saved) : INITIAL_SUBJECTS;
  });
  
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || '');
  const [selections, setSelections] = useState<SelectionState>(() => {
    const saved = localStorage.getItem('timetable_selections');
    return saved ? JSON.parse(saved) : {};
  });

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    localStorage.setItem('timetable_subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('timetable_selections', JSON.stringify(selections));
  }, [selections]);

  const selectedSubject = useMemo(() => 
    subjects.find(s => s.id === selectedSubjectId) || subjects[0], 
    [selectedSubjectId, subjects]
  );

  const activeTimetable = useMemo(() => {
    const slots: (TimeSlot & { subjectName: string; teacherName: string; subjectId: string; code: string })[] = [];
    Object.entries(selections).forEach(([subId, teachId]) => {
      if (!teachId) return;
      const sub = subjects.find(s => s.id === subId);
      const teach = sub?.teachers.find(t => t.id === teachId);
      if (sub && teach) {
        teach.slots.forEach(slot => {
          slots.push({ ...slot, subjectName: sub.name, teacherName: teach.name, subjectId: sub.id, code: sub.code });
        });
      }
    });
    return slots;
  }, [selections, subjects]);

  // --- Schedule Insights ---
  const insights = useMemo(() => {
    const stats = {
      lateClasses: 0,
      avgGaps: 0,
      totalWeeklyGaps: 0,
      longestDay: 0,
    };

    if (activeTimetable.length === 0) return stats;

    const dayGroups: Record<string, TimeSlot[]> = {};
    activeTimetable.forEach(s => {
      if (timeToMinutes(s.endTime) > TARGET_FINISH_MINUTES) stats.lateClasses++;
      if (!dayGroups[s.day]) dayGroups[s.day] = [];
      dayGroups[s.day].push(s);
    });

    Object.values(dayGroups).forEach(slots => {
      slots.sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
      const dayStart = timeToMinutes(slots[0].startTime);
      const dayEnd = timeToMinutes(slots[slots.length - 1].endTime);
      stats.longestDay = Math.max(stats.longestDay, dayEnd - dayStart);

      for (let i = 0; i < slots.length - 1; i++) {
        const gap = timeToMinutes(slots[i+1].startTime) - timeToMinutes(slots[i].endTime);
        if (gap > 0) stats.totalWeeklyGaps += gap;
      }
    });

    return stats;
  }, [activeTimetable]);

  // --- Optimization Engine ---
  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      let bestCombination: SelectionState | null = null;
      let minPenalty = Infinity;
      const currentSubjects = subjects;
      
      const findBest = (idx: number, currentSelections: SelectionState, currentSlots: TimeSlot[]) => {
        if (idx === currentSubjects.length) {
          const penalty = calculatePenalty(currentSlots);
          if (penalty < minPenalty) {
            minPenalty = penalty;
            bestCombination = { ...currentSelections };
          }
          return;
        }
        const sub = currentSubjects[idx];
        for (const teacher of sub.teachers) {
          const hasConflict = teacher.slots.some(tSlot => currentSlots.some(cSlot => isOverlapping(tSlot, cSlot)));
          if (!hasConflict) {
            findBest(idx + 1, { ...currentSelections, [sub.id]: teacher.id }, [...currentSlots, ...teacher.slots]);
          }
        }
      };

      const calculatePenalty = (slots: TimeSlot[]) => {
        let penalty = 0;
        slots.forEach(s => {
          const end = timeToMinutes(s.endTime);
          if (end > TARGET_FINISH_MINUTES) {
            penalty += (end - TARGET_FINISH_MINUTES) * 10; 
          }
        });
        const dayGroups: Record<string, TimeSlot[]> = {};
        slots.forEach(s => {
          if (!dayGroups[s.day]) dayGroups[s.day] = [];
          dayGroups[s.day].push(s);
        });
        Object.values(dayGroups).forEach(dSlots => {
          dSlots.sort((a,b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
          for(let i=0; i<dSlots.length-1; i++) {
            const gap = timeToMinutes(dSlots[i+1].startTime) - timeToMinutes(dSlots[i].endTime);
            if (gap > 120) penalty += 50; 
            if (gap === 0) penalty += 5;
          }
        });
        return penalty;
      };

      findBest(0, {}, []);

      if (bestCombination) {
        setSelections(bestCombination);
        alert(`✨ Optimal path found! We've minimized classes ending after 15:00 and reduced long idle gaps.`);
      } else {
        alert("No valid schedule found.");
      }
      setIsOptimizing(false);
    }, 100);
  };

  const handleImportData = async () => {
    if (!importText.trim()) return;
    setIsProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Parse the following raw academic timetable/staff data into a JSON list of subjects.
        Raw Data: ${importText}`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                code: { type: Type.STRING },
                name: { type: Type.STRING },
                teachers: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      name: { type: Type.STRING },
                      department: { type: Type.STRING },
                      group: { type: Type.INTEGER },
                      slots: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            day: { type: Type.STRING },
                            startTime: { type: Type.STRING },
                            endTime: { type: Type.STRING },
                            location: { type: Type.STRING },
                            type: { type: Type.STRING }
                          },
                          required: ['day', 'startTime', 'endTime', 'location', 'type']
                        }
                      }
                    },
                    required: ['id', 'name', 'department', 'group', 'slots']
                  }
                }
              },
              required: ['id', 'code', 'name', 'teachers']
            }
          }
        }
      });

      const text = response.text;
      if (text) {
        const parsedData = JSON.parse(text);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          setSubjects(parsedData);
          setSelections({});
          setSelectedSubjectId(parsedData[0].id);
          setIsImportModalOpen(false);
          setImportText('');
        }
      }
    } catch (error) {
      alert("AI could not parse the data format.");
    } finally {
      setIsProcessing(false);
    }
  };

  const isEarlyFinisher = (teacher: Teacher) => {
    return teacher.slots.every(s => timeToMinutes(s.endTime) <= TARGET_FINISH_MINUTES);
  };

  const handleSelectTeacher = (teacher: Teacher) => {
    if (!selectedSubject) return;
    const currentTeacherId = selections[selectedSubject.id];
    if (currentTeacherId === teacher.id) {
      const newSelections = { ...selections };
      delete newSelections[selectedSubject.id];
      setSelections(newSelections);
      return;
    }
    const otherSlots = activeTimetable.filter(slot => slot.subjectId !== selectedSubject.id);
    if (teacher.slots.some(newSlot => otherSlots.some(existingSlot => isOverlapping(newSlot, existingSlot)))) {
      alert("⚠️ Time Conflict!");
      return;
    }
    setSelections(prev => ({ ...prev, [selectedSubject.id]: teacher.id }));
  };

  const removeSelection = (subjectId: string) => {
    const newSelections = { ...selections };
    delete newSelections[subjectId];
    setSelections(newSelections);
  };

  const getSlotColor = (subjectId: string) => {
    const colors: Record<string, string> = {
      pss: 'border-l-4 border-l-blue-500 bg-blue-500/10 text-blue-300',
      os: 'border-l-4 border-l-purple-500 bg-purple-500/10 text-purple-300',
      sc: 'border-l-4 border-l-emerald-500 bg-emerald-500/10 text-emerald-300',
      dti: 'border-l-4 border-l-amber-500 bg-amber-500/10 text-amber-300',
      rpa: 'border-l-4 border-l-rose-500 bg-rose-500/10 text-rose-300',
    };
    return colors[subjectId] || 'border-l-4 border-l-gray-500 bg-gray-500/10 text-gray-300';
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-[#0d0d0d] text-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-full lg:w-[420px] flex flex-col border-r border-white/10 bg-[#141414] shadow-2xl z-50">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a]/40 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap className="w-6 h-6 text-purple-500" />
              <h1 className="text-xl font-bold tracking-tight">Staff Selector</h1>
            </div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Optimization Portal</p>
          </div>
          <div className="flex items-center gap-1">
             <button onClick={() => setSelections({})} className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-red-400" title="Clear All"><Trash2 size={16}/></button>
             <button onClick={() => setIsImportModalOpen(true)} className="p-2 hover:bg-white/5 rounded-full text-amber-500" title="Sync AI"><Sparkles size={18}/></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          {/* Optimization Card */}
          <div className="p-4 mx-4 mt-4 bg-gradient-to-br from-indigo-600/20 to-purple-600/10 border border-indigo-500/30 rounded-2xl group cursor-default shrink-0">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-[11px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                <Wand2 size={14} /> Optimization Engine
              </h4>
              <span className="text-[9px] font-bold bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded">Target: 15:00</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-relaxed mb-4">
              Explore all faculty combinations to maximize free afternoons and minimize dead gaps.
            </p>
            <button 
              onClick={handleOptimize}
              disabled={isOptimizing}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              {isOptimizing ? <><RefreshCw size={14} className="animate-spin" /> Analyzing Paths...</> : <><Zap size={14} fill="currentColor" /> Run Auto-Optimizer</>}
            </button>
          </div>

          {/* Subject Switcher */}
          <div className="p-4 bg-[#0a0a0a]/50 sticky top-0 z-20 backdrop-blur-md border-b border-white/5 mt-4 shrink-0">
            <label className="text-[10px] font-black text-gray-600 uppercase mb-2 block ml-1 tracking-widest">Select Subject to Choose Staff</label>
            <select 
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl p-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none font-bold"
            >
              {subjects.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
            </select>
          </div>

          {/* Teacher Selection List */}
          <div className="p-4 space-y-4 shrink-0">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 px-2">Available Faculty</h3>
            {selectedSubject?.teachers.map((teacher) => {
              const isSelected = selections[selectedSubject.id] === teacher.id;
              const early = isEarlyFinisher(teacher);
              const hasConflict = !isSelected && teacher.slots.some(newSlot => activeTimetable.filter(s => s.subjectId !== selectedSubject.id).some(existingSlot => isOverlapping(newSlot, existingSlot)));

              return (
                <div 
                  key={teacher.id}
                  onClick={() => !hasConflict && handleSelectTeacher(teacher)}
                  className={`group relative p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isSelected ? 'border-purple-500 bg-purple-500/10 ring-1 ring-purple-500/50' : hasConflict ? 'opacity-40 grayscale cursor-not-allowed border-white/5' : 'border-white/5 bg-[#1a1a1a] hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-400'}`}><User size={18} /></div>
                      <div>
                        <h4 className="font-bold text-gray-100 text-sm tracking-tight">{teacher.name}</h4>
                        <div className="flex items-center gap-2">
                           <p className="text-[10px] text-gray-500 font-medium">Group {teacher.group}</p>
                           {early && <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full font-black uppercase flex items-center gap-1"><Sun size={8} /> Early Finisher</span>}
                        </div>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 size={18} className="text-purple-500" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Efficiency Insights */}
          <div className="p-6 border-t border-white/10 space-y-4 shrink-0">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
              <BarChart3 size={14} className="text-indigo-500" /> Efficiency Insights
            </h4>
            <div className="grid grid-cols-2 gap-3">
               <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                  <p className="text-[9px] font-black text-gray-500 uppercase mb-1">Post-15:00 Classes</p>
                  <p className={`text-lg font-black ${insights.lateClasses > 0 ? "text-amber-400" : "text-emerald-400"}`}>{insights.lateClasses}</p>
               </div>
               <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                  <p className="text-[9px] font-black text-gray-500 uppercase mb-1">Break Time</p>
                  <p className="text-lg font-black text-blue-400">{Math.round(insights.totalWeeklyGaps / 60)}<span className="text-[10px] ml-1">hrs</span></p>
               </div>
            </div>
          </div>

          {/* Selected Roster Summary */}
          <div className="mt-auto border-t border-white/10 bg-[#0c0c0c] p-6 space-y-4 sticky bottom-0 z-20">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                <Trophy size={14} className="text-amber-500" /> Final Roster
              </h4>
              <span className="text-[10px] text-gray-600 font-bold">{Object.keys(selections).length}/{subjects.length} Chosen</span>
            </div>
            <div className="space-y-2">
              {subjects.map(sub => {
                const selectedTeacherId = selections[sub.id];
                const teacher = sub.teachers.find(t => t.id === selectedTeacherId);
                return (
                  <div key={sub.id} className={`group flex items-center gap-3 p-2 rounded-lg border transition-all ${teacher ? 'bg-purple-500/5 border-purple-500/20' : 'bg-white/5 border-white/5 opacity-50'}`}>
                    <div className={`w-1 h-8 rounded-full ${teacher ? 'bg-purple-500' : 'bg-gray-700'}`} />
                    <div className="flex-1 overflow-hidden">
                      <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest truncate">{sub.code}</p>
                      <p className={`text-[11px] font-bold truncate ${teacher ? 'text-gray-100' : 'text-gray-600 italic'}`}>{teacher ? teacher.name : "Unassigned"}</p>
                    </div>
                    {teacher && <button onClick={() => removeSelection(sub.id)} className="p-1.5 hover:bg-red-500/10 rounded-md text-gray-700 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"><MinusCircle size={14} /></button>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Timetable View */}
      <div className="flex-1 flex flex-col bg-[#0d0d0d] relative overflow-hidden">
        <div className="h-16 flex items-center justify-between px-8 border-b border-white/10 bg-[#0d0d0d]/90 backdrop-blur-xl sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Calendar className="w-5 h-5 text-purple-500" />
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">Live Schedule Projection</h2>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 text-[10px] text-gray-500 font-black tracking-widest">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> THEORY
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-500 font-black tracking-widest">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> PRACTICAL
              </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8 custom-scrollbar">
          <div className="min-w-[1100px] flex flex-col h-full">
            <div className="grid grid-cols-[80px_repeat(6,1fr)] mb-8">
              <div className="p-2"></div>
              {DAYS.map(day => (
                <div key={day} className="text-center">
                  <span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.4em]">{day}</span>
                </div>
              ))}
            </div>

            <div className="relative grid grid-cols-[80px_repeat(6,1fr)] bg-[#111] rounded-[2.5rem] border border-white/5 shadow-2xl h-[1000px] overflow-hidden">
              <div className="absolute w-full bottom-0 left-0 bg-red-500/5 border-t border-red-500/10 pointer-events-none z-0" style={{ height: '25%' }}>
                 <div className="absolute top-4 right-8 flex items-center gap-2 opacity-30">
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">Late Zone (Post 15:00)</span>
                    <AlertCircle size={12} className="text-red-500" />
                 </div>
              </div>
              <div className="grid grid-rows-12 relative z-10 bg-[#161616]/90 border-r border-white/5">
                {TIMES.map(time => (
                  <div key={time} className="flex flex-col items-center justify-center border-b border-white/5 last:border-0 p-2">
                    <span className="text-[11px] font-mono font-bold text-gray-500 tracking-tighter">{time}</span>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 grid grid-rows-12 pointer-events-none opacity-[0.03]">
                {TIMES.map(time => <div key={time} className="border-b border-white w-full"></div>)}
              </div>
              <div className="relative col-span-6 grid grid-cols-6 h-full">
                {activeTimetable.map((slot, index) => {
                  const startMinutes = timeToMinutes(slot.startTime) - 480; 
                  const durationMinutes = timeToMinutes(slot.endTime) - timeToMinutes(slot.startTime);
                  const isLate = timeToMinutes(slot.endTime) > TARGET_FINISH_MINUTES;
                  const top = (startMinutes / 720) * 100;
                  const height = (durationMinutes / 720) * 100;
                  const dayIndex = DAYS.indexOf(slot.day);
                  return (
                    <div 
                      key={`${slot.subjectId}-${index}`}
                      className={`absolute z-20 w-[94%] left-[3%] rounded-2xl p-4 shadow-2xl transition-all duration-300 ring-1 ring-white/10 ${getSlotColor(slot.subjectId)}`}
                      style={{ top: `${top}%`, height: `${height}%`, left: `${(dayIndex / 6) * 100 + 0.5}%`, width: `${(1 / 6) * 100 - 1}%` }}
                    >
                      <div className="flex flex-col h-full overflow-hidden">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[10px] font-black tracking-widest opacity-80">{slot.code}</span>
                        </div>
                        <h5 className="text-[11px] font-black leading-tight mb-auto line-clamp-2 text-white uppercase">{slot.subjectName}</h5>
                        <div className="mt-2 pt-2 border-t border-white/10 text-[9px] font-black text-white/80 truncate">
                          <User size={10} className="inline mr-1" /> {slot.teacherName}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {isOptimizing && (
          <div className="absolute inset-0 z-[60] bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center space-y-6">
             <div className="w-24 h-24 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
             <h3 className="text-2xl font-black uppercase tracking-widest text-white">Finding Best Route...</h3>
          </div>
        )}
      </div>

      {/* AI Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
          <div className="bg-[#1a1a1a] w-full max-w-2xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-xl font-black text-white">Advanced Importer</h3>
              <button onClick={() => setIsImportModalOpen(false)}><X size={24} className="text-gray-600" /></button>
            </div>
            <div className="p-8 flex-1 flex flex-col gap-6 overflow-hidden">
              <textarea 
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Paste raw staff/slots list here..."
                className="flex-1 w-full bg-[#0d0d0d] border border-white/5 rounded-3xl p-6 text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-gray-300"
              />
            </div>
            <div className="p-8 bg-[#0d0d0d] flex justify-end gap-4">
              <button onClick={() => setIsImportModalOpen(false)} className="px-6 py-3 text-xs font-black text-gray-500">Cancel</button>
              <button onClick={handleImportData} disabled={isProcessing} className="px-8 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black">
                {isProcessing ? 'Syncing...' : 'Sync Roster'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
