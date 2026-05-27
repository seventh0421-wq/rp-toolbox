/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Sparkles, 
  Send, 
  Play, 
  Volume2, 
  RefreshCw, 
  User, 
  Palette, 
  FileText, 
  Search, 
  Info, 
  Check, 
  Coins, 
  Heart,
  Hammer
} from 'lucide-react';

// ==========================================
// 1. ADVENTURER PLATE MOCKUP (profileCard)
// ==========================================
export function ProfileCardMockup() {
  const [charName, setCharName] = useState('雅修特拉 (Y’shtola)');
  const [selectedJob, setSelectedJob] = useState<'WHM' | 'BLM' | 'PLD' | 'SGE'>('BLM');
  const [themeColor, setThemeColor] = useState<'gold' | 'aether' | 'abyss' | 'cherry'>('gold');
  const [repType, setRepType] = useState('極度歡迎硬核 RP / 深度劇情演奏');

  const themeClasses = {
    gold: {
      bg: 'bg-ffxiv-card',
      border: 'border-ffxiv-gold',
      textColor: 'text-ffxiv-gold-light',
      accent: 'bg-ffxiv-gold/10 text-ffxiv-gold border-ffxiv-gold-dark/40',
      shimmer: 'from-ffxiv-gold-dark/20 via-ffxiv-gold/5 to-transparent'
    },
    aether: {
      bg: 'bg-ffxiv-dark/95',
      border: 'border-ffxiv-blue-light',
      textColor: 'text-sky-300',
      accent: 'bg-ffxiv-blue/20 text-sky-300 border-ffxiv-blue/50',
      shimmer: 'from-ffxiv-blue/20 via-ffxiv-blue-light/5 to-transparent'
    },
    abyss: {
      bg: 'bg-stone-950',
      border: 'border-purple-500',
      textColor: 'text-purple-300',
      accent: 'bg-purple-950/40 text-purple-300 border-purple-800',
      shimmer: 'from-purple-900/20 via-purple-500/5 to-transparent'
    },
    cherry: {
      bg: 'bg-neutral-900',
      border: 'border-rose-500',
      textColor: 'text-rose-300',
      accent: 'bg-rose-950/40 text-rose-300 border-rose-800',
      shimmer: 'from-rose-900/20 via-rose-500/5 to-transparent'
    }
  };

  const jobDetails = {
    BLM: { name: '黑魔法師 Black Mage', color: 'text-purple-400', level: '100' },
    WHM: { name: '白魔法師 White Mage', color: 'text-emerald-300', level: '100' },
    PLD: { name: '聖騎士 Paladin', color: 'text-blue-300', level: '100' },
    SGE: { name: '賢者 Sage', color: 'text-cyan-400', level: '100' },
  };

  return (
    <div className="space-y-4 font-sans text-stone-200">
      <div className="bg-ffxiv-black/60 p-3 rounded-lg border border-ffxiv-slate flex flex-wrap gap-3 items-center text-xs">
        <div>
          <label className="block text-stone-400 mb-1">角色姓名</label>
          <input 
            type="text" 
            value={charName} 
            onChange={(e) => setCharName(e.target.value)}
            className="bg-ffxiv-black px-2 py-1 rounded border border-ffxiv-slate text-stone-200 focus:outline-none focus:border-ffxiv-gold w-40"
          />
        </div>
        <div>
          <label className="block text-stone-400 mb-1">首選職業</label>
          <select 
            value={selectedJob} 
            onChange={(e) => setSelectedJob(e.target.value as any)}
            className="bg-ffxiv-black px-2 py-1 rounded border border-ffxiv-slate text-stone-200 focus:outline-none focus:border-ffxiv-gold"
          >
            <option value="BLM">黑魔法師</option>
            <option value="WHM">白魔法師</option>
            <option value="PLD">聖騎士</option>
            <option value="SGE">賢者</option>
          </select>
        </div>
        <div>
          <label className="block text-stone-400 mb-1">銘牌主題</label>
          <div className="flex gap-2.5 mt-1">
            {(['gold', 'aether', 'abyss', 'cherry'] as const).map((color) => (
              <button
                key={color}
                onClick={() => setThemeColor(color)}
                className={`w-5 h-5 rounded-full border-2 transition-all ${
                  color === 'gold' ? 'bg-[#c5a059] border-white/40' :
                  color === 'aether' ? 'bg-[#3a8cdb] border-white/40' :
                  color === 'abyss' ? 'bg-purple-600 border-white/40' : 'bg-rose-600 border-white/40'
                } ${themeColor === color ? 'scale-125 border-white ring-2 ring-ffxiv-gold' : 'hover:scale-110'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Actual FFXIV Adventurer Plate Mockup */}
      <div className="relative overflow-hidden rounded-xl border-2 transition-all duration-300 shadow-2xl mx-auto max-w-md bg-ffxiv-card border-ffxiv-slate">
        {/* Shimmer background inside card */}
        <div className={`absolute inset-0 bg-gradient-to-tr ${themeClasses[themeColor].shimmer} opacity-80 pointer-events-none`} />
        
        {/* Header decoration */}
        <div className="flex justify-between items-center bg-zinc-950/60 px-4 py-2 border-b border-ffxiv-slate/30 text-[10px] tracking-widest text-stone-400 uppercase font-ffxiv-serif select-none">
          <span>Adventurer Plate</span>
          <span className="text-ffxiv-gold">★★★★★</span>
        </div>

        {/* Card Body */}
        <div className="p-4 flex flex-col md:flex-row gap-4 relative">
          
          {/* Portrait frame (Left side) */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className={`relative w-40 h-52 rounded overflow-hidden border-2 shadow-inner bg-stone-900 ${themeClasses[themeColor].border}`}>
              {/* Mock Character Portrait Drawing */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />
              
              {/* Silhouette / Mock design */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border border-ffxiv-gold/20 flex items-center justify-center opacity-70">
                  <User className="w-12 h-12 text-ffxiv-gold/60" />
                </div>
              </div>
              
              {/* Outer decorative items */}
              <div className="absolute top-2 left-2 px-1 text-[8px] tracking-wider text-white bg-ffxiv-gold/80 rounded border border-ffxiv-gold z-20 font-ffxiv-serif">
                RP ON
              </div>

              {/* Character Text inside portrait */}
              <div className="absolute bottom-2 inset-x-2 text-center text-white z-20">
                <p className="text-xs font-ffxiv-serif font-bold text-shadow truncate">{charName}</p>
                <div className="flex items-center justify-center gap-1 text-[8px] text-stone-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>FFXIV TC Traveler</span>
                </div>
              </div>

              {/* Magic star glow filter */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-ffxiv-gold/10 blur-xl rounded-full pointer-events-none" />
            </div>
            
            <p className="text-[10px] text-stone-400 mt-2 text-center font-mono">ID: 446-6454-3229-880</p>
          </div>

          {/* Details (Right side) */}
          <div className="w-full md:w-1/2 flex flex-col justify-between text-left">
            <div className="space-y-3">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-stone-500 block">Current Title / 頭銜</span>
                <span className="text-sm font-semibold text-ffxiv-gold-light font-ffxiv-serif flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-ffxiv-gold" />
                  第七靈災倖存者
                </span>
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-wider text-stone-500 block">Class & Level / 職業階級</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="px-1.5 py-0.5 bg-zinc-950 text-[10px] rounded font-ffxiv-serif text-white font-bold border border-ffxiv-slate-light">
                    {selectedJob}
                  </div>
                  <span className={`text-xs font-semibold ${jobDetails[selectedJob].color}`}>
                    {jobDetails[selectedJob].name}
                  </span>
                  <span className="text-[10px] text-stone-400">Lv.{jobDetails[selectedJob].level}</span>
                </div>
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-wider text-stone-500 block">RP Tendency / RP 傾向</span>
                <span className="text-[11px] text-stone-300 block bg-zinc-950/40 p-1.5 rounded border border-zinc-800/60 mt-0.5">
                  {repType}
                </span>
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-wider text-stone-500 block">Active Time / 活躍時間段</span>
                <div className="grid grid-cols-2 gap-1 mt-1 text-[9px] text-center text-stone-300 font-mono">
                  <div className="bg-zinc-950/70 py-1 rounded border border-ffxiv-slate/30">
                    平日: 20:00 - 01:00
                  </div>
                  <div className="bg-zinc-950/70 py-1 rounded border border-ffxiv-slate/30">
                    假日: 全天可約
                  </div>
                </div>
              </div>
            </div>

            {/* FFXIV-inspired footer accent */}
            <div className="pt-3 border-t border-ffxiv-slate/20 flex justify-between items-center">
              <span className="text-[9px] text-stone-500 uppercase tracking-widest font-mono">FFXIV TC Portal v2</span>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-ffxiv-gold"></span>
                <span className="w-2 h-2 rounded-full bg-ffxiv-slate"></span>
                <span className="w-2 h-2 rounded-full bg-zinc-800"></span>
              </div>
            </div>

          </div>

        </div>

        {/* Metallic Gold Corner pieces */}
        <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-ffxiv-gold opacity-60" />
        <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-ffxiv-gold opacity-60" />
        <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-ffxiv-gold opacity-60" />
        <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-ffxiv-gold opacity-60" />
      </div>

      <div className="text-center">
        <p className="text-[11px] text-stone-400">
          💡 設計器支援生成並匯出 <b>冒險者銘牌 (Adventurer Plate)</b> 與 <b>角色誌電子網頁</b>，立即前往外連站點。
        </p>
      </div>
    </div>
  );
}


// ==========================================
// 2. MACRO & CHAT EMULATOR MOCKUP (macroHelper)
// ==========================================
export function MacroHelperMockup() {
  const [macroInput, setMacroInput] = useState<string[]>(
    [
      '/em 誠心向您躬身行禮，優雅地遞上一杯冰鎮「精靈起泡酒」。',
      '/wait 2.5',
      '/s 貴安，親愛的旅行者。歡迎來到金蝶深淵沙龍。',
      '/wait 1',
      '/s 今夜群星璀璨，請問您想了解哪方面的冒險委託呢？',
      '/micon "躬身行禮" emote'
    ]
  );
  const [chatLog, setChatLog] = useState<Array<{ id: number; type: string; sender: string; content: string; time: string }>>([
    { id: 1, type: 'em', sender: '優雅的服務生', content: '朝周圍看了一圈，在整理自己的白手套。', time: '19:42' }
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatLog]);

  const runMacro = async () => {
    if (isRunning) return;
    setIsRunning(true);
    // Dynamic execution simulation
    for (let i = 0; i < macroInput.length; i++) {
      const line = macroInput[i].trim();
      if (!line) continue;
      
      // Look up delays or parameters
      let isWait = false;
      let delay = 1000;
      
      if (line.startsWith('/wait')) {
        isWait = true;
        const seconds = parseFloat(line.split(' ')[1]) || 1;
        delay = seconds * 1000;
      }

      await new Promise((resolve) => setTimeout(resolve, i === 0 ? 300 : Math.min(1800, delay)));
      
      const currentTimeStr = new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      if (line.startsWith('/em ')) {
        const content = line.substring(4);
        setChatLog(prev => [...prev, {
          id: Date.now() + i,
          type: 'em',
          sender: '',
          content: `優雅的服務生${content}`,
          time: currentTimeStr
        }]);
      } else if (line.startsWith('/s ')) {
        const content = line.substring(3);
        setChatLog(prev => [...prev, {
          id: Date.now() + i,
          type: 'say',
          sender: '優雅的服務生',
          content: `「 ${content} 」`,
          time: currentTimeStr
        }]);
      } else if (line.startsWith('/y ')) {
        const content = line.substring(3);
        setChatLog(prev => [...prev, {
          id: Date.now() + i,
          type: 'yell',
          sender: '優雅的服務生',
          content: `${content}!!`,
          time: currentTimeStr
        }]);
      } else if (line.startsWith('/micon')) {
        // Mock command feedback
        setChatLog(prev => [...prev, {
          id: Date.now() + i,
          type: 'system',
          sender: '系統',
          content: `→ 已成功加載表情圖標: 躬身行禮`,
          time: currentTimeStr
        }]);
      }
    }
    setIsRunning(false);
  };

  const handleLineChange = (index: number, val: string) => {
    const next = [...macroInput];
    next[index] = val;
    setMacroInput(next);
  };

  const addMacroLine = () => {
    if (macroInput.length < 15) {
      setMacroInput([...macroInput, '']);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-stone-200">
      
      {/* Script / Editor Panel */}
      <div className="bg-ffxiv-card p-4 rounded-xl border border-ffxiv-slate flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-ffxiv-gold flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-ffxiv-gold" />
              巨集劇本編輯器 (Max 15 Line)
            </span>
            <span className="text-[10px] text-stone-400 font-mono">{macroInput.length} / 15 行</span>
          </div>

          <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
            {macroInput.map((line, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <span className="text-[10px] text-stone-500 font-mono w-4 shrink-0 text-right">{idx + 1}</span>
                <input
                  type="text"
                  value={line}
                  onChange={(e) => handleLineChange(idx, e.target.value)}
                  className="w-full bg-zinc-950 px-2 py-1 rounded text-xs border border-zinc-800 text-stone-300 focus:outline-none focus:border-ffxiv-gold font-mono"
                  placeholder={idx === macroInput.length - 1 ? '/micon "emote_name" emote' : '/say 輸入劇本台詞...'}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-4 pt-3 border-t border-ffxiv-slate/30">
          <button
            onClick={addMacroLine}
            disabled={macroInput.length >= 15}
            className="flex-1 py-1.5 bg-zinc-900 border border-zinc-700/60 hover:border-ffxiv-gold text-[11px] font-semibold text-stone-300 rounded hover:text-white transition-all flex items-center justify-center gap-1 disabled:opacity-40"
          >
            <Plus className="w-3.5 h-3.5" /> 增加一行
          </button>
          <button
            onClick={runMacro}
            disabled={isRunning}
            className="flex-1 py-1.5 bg-gradient-to-r from-ffxiv-gold-dark to-ffxiv-gold text-[11px] font-bold text-zinc-950 rounded hover:from-ffxiv-gold hover:to-ffxiv-gold-light transition-all flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                模擬中...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                模擬巨集執行
              </>
            )}
          </button>
        </div>
      </div>

      {/* Game Chatbox Mockup Display */}
      <div className="bg-[#0b0c10]/95 rounded-xl border border-ffxiv-slate p-3 flex flex-col justify-between overflow-hidden relative shadow-inner">
        
        {/* Chatbox toolbar header */}
        <div className="flex justify-between items-center border-b border-ffxiv-slate/30 pb-2 mb-2 select-none text-[10px] text-stone-400 font-ffxiv-serif">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>FFXIV 遊戲聊天氣泡模擬頻道</span>
          </div>
          <span className="text-ffxiv-gold bg-ffxiv-gold/10 px-1 py-0.5 rounded text-[9px]">General</span>
        </div>

        {/* Scrollable messages container */}
        <div 
          ref={scrollRef}
          className="h-48 overflow-y-auto space-y-2 pr-1 text-xs text-left"
        >
          {chatLog.map((log) => {
            let typeColor = 'text-stone-300';
            let prefix = '';
            
            if (log.type === 'em') {
              // Emote: Orange color in FFXIV
              typeColor = 'text-[#e58a44] italic';
            } else if (log.type === 'say') {
              // Say: Standard peach pink / white
              typeColor = 'text-[#dfd7c2]';
              prefix = `${log.sender} 說: `;
            } else if (log.type === 'yell') {
              // Yell: Shouting yellow
              typeColor = 'text-[#eed03e] font-bold';
              prefix = `${log.sender} 喊道: `;
            } else if (log.type === 'system') {
              typeColor = 'text-[#7fe8ff] font-mono';
            }

            return (
              <div key={log.id} className="group flex justify-between items-start py-0.5 px-1 hover:bg-stone-900/40 rounded transition-all">
                <span className={`${typeColor} leading-relaxed`}>
                  {prefix && <strong className="text-[#a4a095] font-semibold font-ffxiv-serif mr-1">{prefix}</strong>}
                  {log.content}
                </span>
                <span className="text-[9px] text-stone-600 font-mono select-none group-hover:text-stone-500">{log.time}</span>
              </div>
            );
          })}
        </div>

        {/* Chatbox text bar input mock */}
        <div className="mt-3 pt-2 border-t border-ffxiv-slate/20 flex gap-2">
          <div className="bg-zinc-950 px-2 py-1 rounded text-[11px] text-stone-400 font-ffxiv-serif border border-zinc-850 shrink-0">
            [Say]
          </div>
          <input
            type="text"
            readOnly
            value="/em 全速進行 RP 劇本排演..."
            className="w-full bg-zinc-950/60 px-2 py-1 rounded text-stone-500 text-xs border border-zinc-850/40 font-mono outline-none select-none"
          />
          <button className="bg-zinc-900 hover:bg-ffxiv-slate text-stone-400 hover:text-white p-1 rounded shrink-0 transition-all">
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Outer gold-trim */}
        <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-gradient-to-b from-ffxiv-gold to-transparent" />
      </div>

    </div>
  );
}


// ==========================================
// 3. BARD MUSIC INSTRUMENT MOCKUP (bardMusic)
// ==========================================
export function BardMusicMockup() {
  const [activeKey, setActiveKey] = useState<number | null>(null);
  const [synthType, setSynthType] = useState<'sine' | 'triangle' | 'square'>('triangle');
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [tempo, setTempo] = useState(120);
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);
  const playTimerRef = useRef<any>(null);

  // Initialize Audio Context on demand
  const getAudioContext = () => {
    if (!audioCtx) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioCtx(ctx);
      return ctx;
    }
    return audioCtx;
  };

  const playTone = (frequency: number) => {
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = synthType;
      osc.frequency.value = frequency;

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      // Nice decay to sound classical / retro harp
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.82);
    } catch (e) {
      console.warn('Audio Context is not allowed or supported yet', e);
    }
  };

  const keys = [
    { note: 'C4', label: 'Do', freq: 261.63, sub: 'C' },
    { note: 'D4', label: 'Re', freq: 293.66, sub: 'D' },
    { note: 'E4', label: 'Mi', freq: 329.63, sub: 'E' },
    { note: 'F4', label: 'Fa', freq: 349.23, sub: 'F' },
    { note: 'G4', label: 'Sol', freq: 392.00, sub: 'G' },
    { note: 'A4', label: 'La', freq: 440.00, sub: 'A' },
    { note: 'B4', label: 'Si', freq: 493.88, sub: 'B' },
    { note: 'C5', label: 'Do ↑', freq: 523.25, sub: 'C+1' },
    { note: 'D5', label: 'Re ↑', freq: 587.33, sub: 'D+1' },
    { note: 'E5', label: 'Mi ↑', freq: 659.25, sub: 'E+1' },
  ];

  const triggerKey = (index: number) => {
    setActiveKey(index);
    playTone(keys[index].freq);
    setTimeout(() => {
      setActiveKey(null);
    }, 120);
  };

  // Demo play melody: FF Theme! (Do Re Mi... )
  const playDemo = () => {
    if (isDemoPlaying) {
      clearInterval(playTimerRef.current);
      setIsDemoPlaying(false);
      return;
    }

    setIsDemoPlaying(true);
    // Simple FFXIV classic notes melody structure:
    // C4, D4, E4, G4, F4, E4, D4...
    const notesSeq = [0, 1, 2, 4, 3, 2, 1, 0, 1, 2, 3, 5, 4, 3, 2];
    let step = 0;

    playTimerRef.current = setInterval(() => {
      if (step >= notesSeq.length) {
        clearInterval(playTimerRef.current);
        setIsDemoPlaying(false);
        return;
      }
      triggerKey(notesSeq[step]);
      step++;
    }, (60 / tempo) * 500); // 1.5bps approx
  };

  useEffect(() => {
    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, []);

  return (
    <div className="bg-ffxiv-card p-4 rounded-xl border border-ffxiv-slate space-y-4 text-left">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-ffxiv-gold" />
          <span className="text-xs font-semibold text-stone-200 uppercase tracking-widest font-ffxiv-serif">
            艾歐澤亞八度琴鍵即時試聽器
          </span>
        </div>
        
        {/* Synth controller options */}
        <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded border border-zinc-800 text-[10px]">
          <span className="text-stone-500 px-1.5">音色:</span>
          <button 
            onClick={() => setSynthType('sine')}
            className={`px-1.5 py-0.5 rounded transition ${synthType === 'sine' ? 'bg-ffxiv-gold text-zinc-900 font-bold' : 'text-stone-400 hover:text-white'}`}
          >
            長笛 (Flute)
          </button>
          <button 
            onClick={() => setSynthType('triangle')}
            className={`px-1.5 py-0.5 rounded transition ${synthType === 'triangle' ? 'bg-ffxiv-gold text-zinc-900 font-bold' : 'text-stone-400 hover:text-white'}`}
          >
            豎琴 (Harp)
          </button>
          <button 
            onClick={() => setSynthType('square')}
            className={`px-1.5 py-0.5 rounded transition ${synthType === 'square' ? 'bg-ffxiv-gold text-zinc-900 font-bold' : 'text-stone-400 hover:text-white'}`}
          >
            號角 (Horn)
          </button>
        </div>
      </div>

      {/* Piano Keys Visual Sandbox */}
      <div className="relative p-6 pt-8 bg-zinc-950 rounded-lg border border-zinc-850 flex justify-center gap-1 overflow-hidden">
        {/* Shimmer overlay */}
        <div className="absolute top-0 inset-x-0 h-1 ffxiv-gold-gradient" />
        <div className="absolute top-2 left-3 text-[9px] font-mono text-zinc-650 tracking-wider">HARP MODE / STAGE LEVEL 1</div>

        {/* The Keys Map */}
        {keys.map((k, idx) => (
          <button
            key={k.note}
            onClick={() => triggerKey(idx)}
            className={`relative w-9 h-32 rounded-b overflow-hidden border transition-all duration-75 select-none focus:outline-none flex flex-col justify-end pb-3 items-center ${
              activeKey === idx 
                ? 'bg-ffxiv-gold text-zinc-950 border-white ring-2 ring-ffxiv-gold-light scale-95 shadow-lg shadow-ffxiv-gold/20' 
                : 'bg-gradient-to-b from-stone-900 to-stone-200 text-stone-900 hover:to-white border-stone-400 hover:shadow-xl shadow'
            }`}
          >
            {/* Note bubble */}
            <div className={`text-[10px] font-bold ${activeKey === idx ? 'text-zinc-950' : 'text-stone-700'}`}>
              {k.label}
            </div>
            
            {/* Keyboard Hotkey helper */}
            <span className={`text-[8px] font-mono opacity-50 block mt-1 ${activeKey === idx ? 'text-zinc-950' : 'text-stone-400'}`}>
              [{k.sub}]
            </span>

            {/* Glowing spot */}
            {activeKey === idx && (
              <div className="absolute top-0 inset-x-0 h-6 bg-white/40 blur-md rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-4 items-center justify-between flex-wrap text-stone-400 text-xs">
        <button
          onClick={playDemo}
          className={`px-3 py-1.5 rounded text-[11px] font-ffxiv-serif font-semibold border flex items-center gap-1.5 transition-all ${
            isDemoPlaying 
              ? 'bg-red-950 border-red-500 text-red-300 hover:bg-red-900' 
              : 'bg-ffxiv-gold/10 hover:bg-ffxiv-gold/20 border-ffxiv-gold/40 text-ffxiv-gold-light'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-ffxiv-gold animate-bounce" />
          {isDemoPlaying ? '停止自主演奏' : '播放 FFXIV 聖歌主題旋律片段'}
        </button>

        <span className="text-[10px] text-stone-500 flex items-center gap-1">
          <Info className="w-3.5 h-3.5" />
          點擊上方琴鍵即可直接試聽，本系統支持與千人聯網合奏琴譜管理。
        </span>
      </div>
    </div>
  );
}


// ==========================================
// 4. HOUSING DESIGNER & SCHEME TESTER (housingBudget)
// ==========================================
interface FurnitureItem {
  id: string;
  name: string;
  cost: number;
  dye: string;
  type: string;
}

export function HousingBudgetMockup() {
  const [houseSize, setHouseSize] = useState<'S' | 'M' | 'L'>('S');
  const [selectedFurniture, setSelectedFurniture] = useState<FurnitureItem[]>([
    { id: 'f1', name: '特製壁木板牆 (Hanging Partition)', cost: 12000, dye: '煤煙黑 (Soot Black)', type: '隔板' },
    { id: 'f2', name: '薩納蘭豪華烤爐 (Sanalan Oven)', cost: 85000, dye: '金色染料 (Gold Metallic)', type: '廚房' },
    { id: 'f3', name: '水晶吊燈三型 (Crystarium Chandelier)', cost: 180000, dye: '無染色', type: '吊頂' },
  ]);
  const [customName, setCustomName] = useState('森林高級溫暖吧台');
  const [dyeColor, setDyeColor] = useState('深淵藍 (Abyss Blue)');

  const addStaticFurniture = () => {
    const list = [
      { name: '妖精木質長椅', cost: 15400, type: '桌椅' },
      { name: '高尚書架與儲物櫃', cost: 42000, type: '雜物' },
      { name: '綠植常春藤壁掛', cost: 8000, type: '植物' },
      { name: '古典奢華大地毯', cost: 95000, type: '地毯' }
    ];
    const pick = list[Math.floor(Math.random() * list.length)];
    const newItem: FurnitureItem = {
      id: 'f_new_' + Date.now(),
      name: pick.name,
      cost: pick.cost,
      dye: dyeColor,
      type: pick.type
    };
    setSelectedFurniture([...selectedFurniture, newItem]);
  };

  const removeItem = (id: string) => {
    setSelectedFurniture(selectedFurniture.filter(x => x.id !== id));
  };

  const totalCost = selectedFurniture.reduce((sum, item) => sum + item.cost, 0);
  const maxLimit = houseSize === 'S' ? 200 : houseSize === 'M' ? 300 : 400;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-stone-200 text-left font-sans">
      
      {/* Furniture List and budgeting */}
      <div className="bg-ffxiv-card p-4 rounded-xl border border-ffxiv-slate flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-ffxiv-gold flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-ffxiv-gold" />
              房屋裝修裝設預算計數器
            </span>
            <div className="flex bg-zinc-950 p-0.5 rounded border border-zinc-800 text-[9px] font-bold">
              {(['S', 'M', 'L'] as const).map(sz => (
                <button
                  key={sz}
                  onClick={() => setHouseSize(sz)}
                  className={`px-2 py-0.5 rounded ${houseSize === sz ? 'bg-ffxiv-gold text-zinc-900' : 'text-stone-400'}`}
                >
                  {sz} 房
                </button>
              ))}
            </div>
          </div>

          {/* Table list */}
          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {selectedFurniture.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between text-xs p-2 bg-zinc-950/80 rounded border border-zinc-900 group relative hover:border-ffxiv-gold-dark/40"
              >
                <div>
                  <div className="font-semibold text-stone-200 flex items-center gap-1.5">
                    <span className="text-[9px] px-1 py-0.5 rounded bg-zinc-800 text-stone-400">{item.type}</span>
                    <span className="truncate max-w-40">{item.name}</span>
                  </div>
                  <div className="text-[10px] text-amber-500/80 mt-0.5 flex items-center gap-1">
                    <Palette className="w-3 h-3 text-ffxiv-gold" />
                    <span>指定染色: {item.dye}</span>
                  </div>
                </div>

                <div className="text-right flex items-center gap-2">
                  <span className="font-mono text-xs text-stone-300 font-bold">
                    {item.cost.toLocaleString()} <span className="text-ffxiv-gold text-[10px] font-normal">Gil</span>
                  </span>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-stone-600 hover:text-red-400 hover:bg-stone-900 p-1 rounded transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Summary & action */}
        <div className="mt-4 pt-3 border-t border-ffxiv-slate/30 space-y-3">
          <div className="flex justify-between items-center text-xs text-stone-400">
            <span>家具裝設數上限限制</span>
            <span className="font-mono">{selectedFurniture.length} / {maxLimit} 件</span>
          </div>
          
          <div className="bg-zinc-950 p-2.5 rounded border border-zinc-900 flex justify-between items-center">
            <span className="text-xs text-stone-400 font-ffxiv-serif">估計工程總預算:</span>
            <span className="font-mono text-sm font-bold text-ffxiv-gold-light">
              {totalCost.toLocaleString()} <span className="text-[10px] text-ffxiv-gold font-normal">Gil (吉爾)</span>
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={addStaticFurniture}
              className="flex-1 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-xs text-stone-300 hover:text-white rounded border border-zinc-700 transition flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> 模擬加入選購家具
            </button>
          </div>
        </div>
      </div>

      {/* 3D Color Swatch sandbox */}
      <div className="bg-[#0b0c10]/95 rounded-xl border border-ffxiv-slate p-4 flex flex-col justify-between overflow-hidden relative shadow-inner">
        <span className="text-[10px] text-stone-500 block font-mono uppercase tracking-widest">Interactive Swatch Tester</span>
        <h3 className="text-xs font-bold text-stone-300 uppercase tracking-widest font-ffxiv-serif mt-1">
          匠人家具配色染料實時試效果
        </h3>

        {/* Pseudo 3D Visualizer block */}
        <div className="my-3 py-6 bg-zinc-950 rounded border border-zinc-900 flex flex-col items-center justify-center relative">
          <div className="w-24 h-24 rounded-lg bg-zinc-900 border-2 border-ffxiv-gold/40 shadow-inner flex flex-col items-center justify-center relative transition-all duration-300">
            {/* Color preview surface */}
            <div 
              style={{
                backgroundColor: 
                  dyeColor.includes('煤煙黑') ? '#1c1c1c' :
                  dyeColor.includes('深淵藍') ? '#1e3a8a' :
                  dyeColor.includes('達拉拉深紅') ? '#881337' :
                  dyeColor.includes('金色染料') ? '#af9e63' : '#b45309'
              }}
              className="absolute inset-2 rounded border border-white/10 transition-all duration-300 shadow flex items-center justify-center"
            >
              <Hammer className="w-8 h-8 text-white/40 animate-pulse" />
            </div>
            
            {/* Shading reflection lines */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none" />
          </div>

          <span className="text-[11px] font-semibold text-stone-300 mt-3">{customName}</span>
          <span className="text-[10px] text-stone-400">目前預覽染料: <b className="text-[#dfc38f]">{dyeColor}</b></span>
        </div>

        {/* Change dye palette triggers */}
        <div>
          <span className="text-[9px] text-stone-500 block mb-1">選擇你要染色的染料:</span>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {[
              { name: '煤煙黑 (Soot Black)', color: 'bg-zinc-900' },
              { name: '深淵藍 (Abyss Blue)', color: 'bg-blue-850' },
              { name: '達拉拉深紅 (Dallara Red)', color: 'bg-rose-950' },
              { name: '金色染料 (Gold Metallic)', color: 'bg-[#af9e63]' },
              { name: '南瓜橙 (Pumpkin Orange)', color: 'bg-amber-700' },
            ].map(dye => (
              <button
                key={dye.name}
                onClick={() => setDyeColor(dye.name)}
                className={`w-6 h-6 rounded border transition-all ${dye.color} ${dyeColor === dye.name ? 'scale-125 border-white ring-2 ring-ffxiv-gold' : 'border-zinc-800 hover:scale-115'}`}
                title={dye.name}
              />
            ))}
          </div>
        </div>

        <p className="text-[10px] text-stone-400 mt-2">
          🔨 森都匠人系統網羅了官方最新版本的全部家具清單，提供玩家直接導出採購 API。
        </p>
      </div>

    </div>
  );
}


// ==========================================
// 5. CHARACTER GRAPH WIDGET (characterGraph)
// ==========================================
interface RelationshipNode {
  id: string;
  name: string;
  avatarLetter: string;
  x: number;
  y: number;
  desc: string;
}

interface RelationshipLink {
  from: string;
  to: string;
  type: 'trust' | 'love' | 'rival' | 'apprentice';
  labelText: string;
}

export function CharacterGraphMockup() {
  const [nodes, setNodes] = useState<RelationshipNode[]>([
    { id: 'you', name: '你的角色 (You)', avatarLetter: '冒', x: 150, y: 110, desc: '流浪在艾歐澤亞的冒險者，現為拂曉賢人同伴。' },
    { id: 'ysh', name: '雅修特拉', avatarLetter: '雅', x: 260, y: 50, desc: '拂曉血盟著名的賢人，博古通今的魔法大師。' },
    { id: 'alph', name: '阿爾菲諾', avatarLetter: '阿', x: 40, y: 80, desc: '拂曉的軍師型人物，心地善良、擅長召喚術。' },
    { id: 'graha', name: '古拉哈·提亞', avatarLetter: '古', x: 240, y: 170, desc: '水晶公、歷史學家，承諾隨時準備為拯救你而奉獻一切。' }
  ]);

  const [links, setLinks] = useState<RelationshipLink[]>([
    { from: 'you', to: 'ysh', type: 'trust', labelText: '深厚信賴夥伴' },
    { from: 'you', to: 'alph', type: 'apprentice', labelText: '成長見證與密友' },
    { from: 'you', to: 'graha', type: 'love', labelText: '誓約守護之人' },
    { from: 'ysh', to: 'graha', type: 'rival', labelText: '學術同僚' }
  ]);

  const [selectedNode, setSelectedNode] = useState<RelationshipNode>(nodes[0]);
  const [editingRelation, setEditingRelation] = useState({ from: 'you', to: 'ysh', text: '深厚信賴夥伴' });

  const getLinkColor = (type: string) => {
    switch (type) {
      case 'love': return 'stroke-rose-500 text-rose-300';
      case 'rival': return 'stroke-amber-500 text-amber-300';
      case 'apprentice': return 'stroke-cyan-500 text-cyan-300';
      default: return 'stroke-ffxiv-blue-light text-sky-200';
    }
  };

  const handleUpdateRelation = () => {
    setLinks(links.map(link => {
      if (link.from === editingRelation.from && link.to === editingRelation.to) {
        return { ...link, labelText: editingRelation.text };
      }
      return link;
    }));
  };

  return (
    <div className="space-y-4 text-stone-200 text-left font-sans">
      <div className="bg-ffxiv-black/60 p-3 rounded-lg border border-ffxiv-slate flex flex-wrap gap-4 items-center text-xs justify-between">
        <div className="flex gap-2 items-center">
          <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
          <span className="font-semibold text-stone-300">角色關係互動連線修改模擬</span>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <select 
            value={editingRelation.to}
            onChange={(e) => setEditingRelation({ ...editingRelation, to: e.target.value })}
            className="bg-ffxiv-black px-2 py-1 rounded border border-ffxiv-slate text-xs"
          >
            <option value="ysh">與 雅修特拉 的關係</option>
            <option value="alph">與 阿爾菲諾 的關係</option>
            <option value="graha">與 古拉哈 的關係</option>
          </select>
          <input 
            type="text" 
            value={editingRelation.text}
            onChange={(e) => setEditingRelation({ ...editingRelation, text: e.target.value })}
            className="bg-ffxiv-black px-2 py-1 rounded border border-ffxiv-slate text-xs text-stone-200 w-32"
          />
          <button 
            onClick={handleUpdateRelation}
            className="bg-ffxiv-gold hover:bg-ffxiv-gold-light text-zinc-950 font-bold px-2 py-1 rounded text-xs transition-colors"
          >
            套用關係線
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Graph Canvas */}
        <div className="md:col-span-2 bg-[#040507] rounded-xl border border-ffxiv-slate relative h-60 overflow-hidden shadow-inner flex items-center justify-center">
          
          {/* Subtle blueprint grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(197,160,89,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(197,160,89,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="15" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#c5a059" />
              </marker>
            </defs>
            {/* Draw relation lines */}
            {links.map((link, idx) => {
              const fromNode = nodes.find(n => n.id === link.from);
              const toNode = nodes.find(n => n.id === link.to);
              if (!fromNode || !toNode) return null;

              const midX = (fromNode.x + toNode.x) / 2;
              const midY = (fromNode.y + toNode.y) / 2;

              return (
                <g key={idx}>
                  <line
                    x1={fromNode.x + 14}
                    y1={fromNode.y + 14}
                    x2={toNode.x + 14}
                    y2={toNode.y + 14}
                    className={`${getLinkColor(link.type).split(' ')[0]} stroke-2`}
                    style={{ strokeDasharray: '4 3' }}
                  />
                  
                  {/* Label background card */}
                  <rect
                    x={midX - 35}
                    y={midY - 6}
                    width={84}
                    height={12}
                    rx={2}
                    fill="#08090c"
                    stroke="#242c38"
                    strokeWidth={0.5}
                  />
                  <text
                    x={midX}
                    y={midY + 3}
                    className="text-[8px] text-center font-ffxiv-serif select-none"
                    fill="#dfc38f"
                    textAnchor="middle"
                  >
                    {link.labelText}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Draw Character interactive nodes */}
          {nodes.map((node) => (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              style={{ left: node.x, top: node.y }}
              className={`absolute w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                selectedNode.id === node.id 
                  ? 'bg-ffxiv-gold text-zinc-950 border-white ring-4 ring-ffxiv-gold/30 scale-110 shadow-lg' 
                  : 'bg-ffxiv-card text-stone-200 hover:text-white border-ffxiv-slate hover:border-ffxiv-gold shadow'
              }`}
            >
              {node.avatarLetter}
            </button>
          ))}
        </div>

        {/* Selected Node Details Side drawer */}
        <div className="bg-ffxiv-card p-3 rounded-xl border border-ffxiv-slate flex flex-col justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-stone-500 block mb-1">人物生平屬性卡</span>
            <span className="text-sm font-bold text-ffxiv-gold-light font-ffxiv-serif flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-ffxiv-gold" />
              {selectedNode.name}
            </span>
            <p className="text-[11px] text-stone-300 mt-2 leading-relaxed bg-zinc-950/50 p-2 rounded border border-zinc-900 h-28 overflow-y-auto">
              {selectedNode.desc}
            </p>
          </div>

          <div className="text-[10px] text-stone-400 mt-2 border-t border-ffxiv-slate/30 pt-2">
            💡 關係圖工具支持玩家<b>滑鼠拖曳擺盤</b>，並可無縫生成精美的角色人際網以嵌入自己的冒險網誌。
          </div>
        </div>

      </div>
    </div>
  );
}
