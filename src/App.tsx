/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ExternalLink, 
  Info, 
  Sparkles, 
  MapPin, 
  Clock, 
  Volume2, 
  Compass, 
  Users, 
  BookOpen, 
  X, 
  Check, 
  AlertCircle,
  TrendingUp,
  Sliders,
  Award,
  Music,
  Home,
  UserCheck,
  Sun,
  Moon,
  Copy
} from 'lucide-react';

import { ToolItem, ToolCategory } from './types';
import { INITIAL_TOOLS_DATA } from './data';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, incrementStat } from './firebase';

export default function App() {
  // Theme State (Persisted in localStorage, defaults to dark/true)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('ffxiv_rp_portal_theme');
    return saved !== 'light';
  });

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('ffxiv_rp_portal_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isAuthorOpen, setIsAuthorOpen] = useState(false);
  const [liveStats, setLiveStats] = useState<Record<string, number>>({});

  // Custom Character Avatar (Yanluo @ Odin Character Portrait)
  const avatarUrl = "https://i.meee.com.tw/qHP9XX5.png";
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(current => current === id ? null : current);
      }, 1500);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  // Dynamic simulated persistent usage counter starting at 0 (falls back here if offline/initial loading)
  const [useCount, setUseCount] = useState(() => {
    const saved = localStorage.getItem('ffxiv_rp_portal_usages');
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (isNaN(parsed) || parsed > 5000) {
        localStorage.setItem('ffxiv_rp_portal_usages', '0');
        return 0;
      }
      return parsed;
    }
    return 0;
  });

  // Time States (Local & ET)
  const [localTime, setLocalTime] = useState('');
  const [eorzeaTime, setEorzeaTime] = useState({ formatted: '00:00', hours: 12 });

  // Initialize links, clock & Firestore listener on mount
  useEffect(() => {
    // 1. Exact FFXIV Eorzea Time formula
    // 1 Eorzea minute = 70 * 60 / (24 * 60) = 2.9166667 seconds in real life.
    // Eorzea Time ratio is exactly 3600 / 175 times faster than UTC time.
    const updateTime = () => {
      const now = new Date();
      
      // Formatted Local Time
      setLocalTime(now.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
      
      // Calculate FFXIV Eorzea Time
      const EORZEA_MULTIPLIER = 3600 / 175;
      const epochTime = now.getTime();
      const eorzeaEpoch = epochTime * EORZEA_MULTIPLIER;
      const eorzeaDate = new Date(eorzeaEpoch);
      
      const hours = eorzeaDate.getUTCHours();
      const mins = eorzeaDate.getUTCMinutes();
      const doubleDigits = (val: number) => val.toString().padStart(2, '0');
      
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;

      setEorzeaTime({
        formatted: `ET ${doubleDigits(displayHours)}:${doubleDigits(mins)} ${ampm}`,
        hours: hours
      });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    // 3. Setup real-time listener for usage counts on Firestore
    const unsubscribe = onSnapshot(collection(db, 'stats'), (snapshot) => {
      const statsMap: Record<string, number> = {};
      snapshot.forEach((doc) => {
        statsMap[doc.id] = doc.data().count || 0;
      });
      setLiveStats(statsMap);
    }, (error) => {
      console.error('Firestore tracking stats listener subscription failure:', error);
    });

    return () => {
      clearInterval(timer);
      unsubscribe();
    };
  }, []);

  // Quick click handler when a user visits any external version
  const handleLinkClick = (toolId: string) => {
    // Fire-and-forget Firebase increments
    incrementStat('global').catch(e => console.error("Firebase global increment failed:", e));
    incrementStat(toolId).catch(e => console.error(`Firebase tool ${toolId} increment failed:`, e));

    setUseCount(prev => {
      const next = prev + 1;
      localStorage.setItem('ffxiv_rp_portal_usages', next.toString());
      return next;
    });
  };

  // Filter tools based on user search
  const filteredTools = useMemo(() => {
    return INITIAL_TOOLS_DATA.filter(tool => {
      const matchesSearch = 
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.enTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSearch;
    });
  }, [searchQuery]);

  return (
    <div className={`min-h-screen bg-ffxiv-black ${isDarkMode ? 'dark text-slate-100' : 'light text-stone-900'} flex flex-col justify-between selection:bg-ffxiv-gold/30 selection:text-ffxiv-gold-light relative transition-colors duration-300`}>
      
      {/* Background ambience overlay (Aetherial Space Bloomed Circles) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden transition-opacity duration-300" style={{ opacity: 'var(--bg-ambience-opacity, 0.15)' }}>
        <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-[#c5a059] rounded-full blur-[140px]" />
        <div className="absolute bottom-[20%] left-[-15%] w-[500px] h-[500px] bg-ffxiv-blue rounded-full blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[450px] h-[450px] bg-[#3a3a3c] rounded-full blur-[110px]" />
      </div>
      
      {/* Fixed border frame for ultimate game client simulation */}
      <div className="fixed inset-0 border-[12px] border-ffxiv-gold/5 pointer-events-none z-50" />

      {/* ================= HEADER AREA ================= */}
      <header className="container mx-auto px-4 pt-12 pb-6 text-center relative z-10">
        
        {/* Subtle subtext logo */}
        <div className="inline-flex items-center gap-2 bg-ffxiv-gold/10 px-4 py-1.5 rounded-full border border-ffxiv-gold-dark/30 mb-4 select-none">
          <Sparkles className="w-3.5 h-3.5 text-ffxiv-gold animate-pulse" />
          <span className="text-sm tracking-[0.2em] text-[#dfc38f] uppercase font-mono font-bold">
            FFXIV TC RP Companion Portal
          </span>
        </div>

        {/* Cinematic Game-Style Title */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-medium text-white tracking-[0.05em]" style={{ fontFamily: '"Noto Serif TC", serif' }}>
            FFXIV TC RP工具箱
          </h1>
          <p className="text-sm text-ffxiv-gold-light tracking-[0.2em] font-ffxiv-serif font-semibold uppercase">
            FFXIV TC Roleplay Portal & Tools
          </p>
        </div>

        {/* FFXIV Elegant gold divider gradient */}
        <div className="mt-5 mb-6 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto relative">
          <div className="w-1.5 h-1.5 bg-[#c5a059] rotate-45 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-zinc-950" />
        </div>

        {/* Suggestion & Link Invitation Banner */}
        <div className="max-w-5xl mx-auto mb-6 flex flex-col md:flex-row items-center justify-between gap-4 px-5 py-3 rounded-xl bg-[#c5a059]/5 border border-[#c5a059]/35 text-xs text-stone-300 backdrop-blur select-none">
          <div className="flex items-center gap-2.5 text-stone-200">
            <Info className="w-4.5 h-4.5 text-ffxiv-gold shrink-0 animate-pulse" />
            <span className="text-left font-sans leading-relaxed">
              💡 建議使用<strong className="text-ffxiv-gold-light">電腦版瀏覽器</strong>觀看本網頁，以獲得最完美的魔導介面與完整操作體驗。
            </span>
          </div>
          <div className="hidden md:block h-5 w-[1px] bg-[#c5a059]/30 shrink-0" />
          <div className="flex items-center gap-2 text-stone-300">
            <Users className="w-4 h-4 text-[#dfc38f] shrink-0" />
            <span className="text-left font-sans leading-relaxed">
              🤝 誠摯邀請各位 RP 創作者進行<strong className="text-ffxiv-gold-light font-bold">友站連結合作</strong>！歡迎與作者聯繫。
            </span>
          </div>
        </div>

        {/* Live Status, Clock, Stats and Credit Panel */}
        <div className="mt-8 max-w-5xl mx-auto bg-ffxiv-card/90 rounded-2xl border border-ffxiv-slate p-3.5 md:p-4.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4.5 lg:gap-0 text-center items-center shadow-2xl relative backdrop-blur select-none">
          
          {/* Status 1: Gateway Server */}
          <div className="flex items-center justify-center gap-2 border-b sm:border-b-0 lg:border-r border-ffxiv-slate/40 pb-3 sm:pb-0 h-full lg:px-2">
            <div className="relative flex items-center justify-center w-2.5 h-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute"></span>
            </div>
            <div className="text-center">
              <span className="text-sm text-stone-500 uppercase block tracking-wider font-mono">傳送魔導閘門</span>
              <strong className="text-sm text-stone-250 tracking-wider block">線上通訊已連線</strong>
            </div>
          </div>

          {/* Status 2: Eorzea Time */}
          <div className="border-b sm:border-b-0 lg:border-r border-ffxiv-slate/40 pb-3 sm:pb-0 h-full flex flex-col justify-center items-center text-center lg:px-2">
            <div className="flex justify-center items-center gap-1.5 text-ffxiv-gold">
              {eorzeaTime.hours >= 6 && eorzeaTime.hours < 18 ? (
                <Sparkles className="w-4 h-4 text-ffxiv-gold-light animate-spin" style={{ animationDuration: '8s' }} />
              ) : (
                <Clock className="w-4 h-4 text-sky-450" />
              )}
              <span className="font-mono text-sm font-semibold tracking-wider text-ffxiv-gold-light">
                {eorzeaTime.formatted}
              </span>
            </div>
            <span className="text-sm text-stone-500 tracking-wider font-medium">艾歐澤亞標準時間 (ET)</span>
          </div>

          {/* Status 3: Local Time */}
          <div className="border-b lg:border-b-0 lg:border-r border-ffxiv-slate/40 pb-3 lg:pb-0 h-full flex flex-col justify-center items-center text-center lg:px-2">
            <span className="font-mono text-sm text-stone-200 font-semibold">{localTime}</span>
            <span className="text-sm text-stone-500 block tracking-wider font-medium">冒險者本地電腦時間</span>
          </div>

          {/* Status 4: Core Portal Density Metrics (Total Tools & Use counts) */}
          <div className="border-b lg:border-b-0 lg:border-r border-ffxiv-slate/40 pb-3 lg:pb-0 h-full flex flex-col justify-center items-center text-center lg:px-2">
            <div className="flex items-baseline space-x-1 justify-center">
              <span className="text-sm font-bold text-ffxiv-gold">{INITIAL_TOOLS_DATA.length} 款</span>
              <span className="text-stone-500 text-sm">/</span>
              <span className="text-sm font-bold text-stone-200 font-mono tracking-wider">
                {((liveStats['global'] !== undefined ? liveStats['global'] : useCount)).toLocaleString()} 次
              </span>
            </div>
            <span className="text-sm text-stone-500 tracking-wider font-medium">目前工具總數量 / 累計使用次數</span>
          </div>

          {/* Status 5: Author Signature */}
          <div className="flex justify-center items-center h-full lg:px-2">
            <button
              onClick={() => setIsAuthorOpen(true)}
              className="flex items-center justify-center space-x-2 border border-[#c5a059]/40 bg-[#c5a059]/5 px-3 py-1.5 rounded-lg hover:bg-[#c5a059]/15 hover:border-[#c5a059] transition-all tracking-wider cursor-pointer active:scale-95 text-center"
            >
              <div className="w-5 h-5 rounded-full border border-ffxiv-gold/40 flex items-center justify-center bg-zinc-900 overflow-hidden shrink-0 select-none shadow-[0_0_8px_rgba(197,160,89,0.3)]">
                <img src={avatarUrl} alt="閻羅" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="text-center">
                <span className="text-xs text-[#dfc38f]/60 block leading-none font-mono tracking-widest uppercase">工具箱作者</span>
                <span className="text-sm font-bold text-[#e6cb95] tracking-wide font-ffxiv-serif hover:text-white transition-colors">閻羅@奧汀</span>
              </div>
            </button>
          </div>
          
          {/* Subtle frame corner decors */}
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-ffxiv-gold/40" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-ffxiv-gold/40" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-ffxiv-gold/40" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-ffxiv-gold/40" />
        </div>

      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="container mx-auto px-4 pb-20 relative z-10 flex-grow">
        
        {/* FILTERS & SEARCH BOX AREA */}
        <div className="max-w-5xl mx-auto mb-10 space-y-4">
          
          {/* Responsive Layout Search and Function controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center relative min-h-11">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96 shrink-0 mx-auto">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="輸入關鍵字篩選工具..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 pl-10 pr-4 py-2.5 text-sm rounded-xl border border-ffxiv-slate text-stone-150 focus:outline-none focus:border-ffxiv-gold focus:ring-1 focus:ring-ffxiv-gold placeholder:text-stone-600 transition"
                id="search-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 text-sm"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-full md:w-auto md:absolute md:right-0 px-4.5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 flex items-center justify-center gap-1.5 border border-ffxiv-slate/40 bg-zinc-950/60 text-stone-300 hover:text-ffxiv-gold hover:border-ffxiv-gold/80 hover:bg-zinc-900 cursor-pointer active:scale-95 select-none"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                  <span>切換淺色模式</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-sky-450" />
                  <span>切換深色模式</span>
                </>
              )}
            </button>

          </div>

          {searchQuery && (
            <div className="text-center text-sm text-stone-500 pl-1 font-sans">
              找到了 <b>{filteredTools.length}</b> 個符合搜尋 「{searchQuery}」 的服務模組：
            </div>
          )}

        </div>

        {/* TOOLS DIRECTORY CARDS GRID */}
        {filteredTools.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto bg-zinc-950/40 rounded-2xl border border-dashed border-zinc-800">
            <AlertCircle className="w-10 h-10 text-stone-600 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-stone-400 uppercase font-ffxiv-serif">無符合搜尋結果</h3>
            <p className="text-sm text-stone-500 mt-1">請嘗試搜尋其他關鍵字。</p>
            <button
              onClick={() => { setSearchQuery(''); }}
              className="mt-4 px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-850 hover:text-white rounded border border-zinc-700 text-sm font-bold text-stone-400 transition"
            >
              重設搜尋關鍵字
            </button>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredTools.map((tool, index) => {
                return (
                  <motion.div
                    key={tool.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-ffxiv-card rounded-2xl border border-ffxiv-slate/60 hover:border-ffxiv-gold overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_0_20px_rgba(197,160,89,0.12)] relative pt-2"
                  >
                    {/* Premium sleek gold gradient top line style accent */}
                    <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-ffxiv-gold/60 to-transparent opacity-80 group-hover:via-ffxiv-gold-light group-hover:opacity-100 transition-all duration-300" />

                    {/* Visual Card Header & Category Badge */}
                    <div className="p-5 pb-3 flex flex-col items-center text-center">
                      <div className="flex flex-col items-center justify-center gap-1.5 mb-2 w-full">
                        <div className="flex items-center justify-center gap-1 select-none text-sm font-mono text-zinc-350">
                          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${tool.id === 'rp-pos' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-emerald-500'}`}></span>
                          <span>{tool.id === 'rp-pos' ? '測試中' : '已上線'}</span>
                        </div>
                        <h3 className="text-base font-bold text-stone-100 group-hover:text-ffxiv-gold-light transition-colors font-ffxiv-serif tracking-wider text-center">
                          {tool.title}
                        </h3>
                      </div>
                      
                      <p className="text-sm text-stone-500 font-mono text-center tracking-wide uppercase border-b border-zinc-900 pb-2 w-full">
                        {tool.enTitle}
                      </p>

                      <p className="text-sm text-stone-400 leading-relaxed mt-3 text-center font-sans">
                        {tool.description}
                      </p>
                    </div>

                    {/* Miniature preview & information block */}
                    <div className="px-5 py-3.5 bg-zinc-950/60 border-t border-b border-zinc-900/60 text-sm space-y-2 select-none text-center flex flex-col items-center">
                      <div className="flex justify-between items-center text-stone-500 w-full">
                        <span>目前通訊狀態</span>
                        <span className="font-semibold text-stone-350">{tool.statusText}</span>
                      </div>
                      
                      {/* Features highlights bullet links */}
                      <div className="text-center space-y-1 w-full pt-1">
                        <span className="text-sm uppercase tracking-wider text-stone-600 block">功能推薦亮點</span>
                        <div className="flex flex-wrap justify-center gap-1 mt-1">
                          {tool.features.map((feat, i) => (
                            <span key={i} className="text-sm bg-zinc-900 border border-zinc-850 px-1.5 py-0.5 rounded text-stone-400 truncate max-w-full font-sans">
                              ✦ {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions button footer */}
                    <div className="p-4 bg-zinc-950/30 flex gap-2 shrink-0 select-none relative">
                      {tool.defaultUrl ? (
                        <>
                          {/* Real External Launch link */}
                          <a
                            href={tool.defaultUrl}
                            onClick={() => handleLinkClick(tool.id)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 bg-gradient-to-r from-ffxiv-gold-dark to-ffxiv-gold text-zinc-950 hover:from-[#d1b069] hover:to-[#dfc38f] text-sm font-bold tracking-wider uppercase rounded shadow-[0_0_12px_rgba(197,160,89,0.2)] flex items-center justify-center gap-1.5 transition-all hover:scale-[1.015]"
                          >
                            進入完整版項目站點
                            <ExternalLink className="w-3.5 h-3.5 text-zinc-950" />
                          </a>

                          {/* Copy Link Button */}
                          <button
                            onClick={() => handleCopyLink(tool.defaultUrl, tool.id)}
                            className="p-2.5 bg-zinc-900 hover:bg-zinc-850 border border-ffxiv-slate/30 text-stone-300 hover:text-ffxiv-gold hover:border-ffxiv-gold/85 rounded transition-all duration-200 flex items-center justify-center relative group/copy cursor-pointer active:scale-95"
                            aria-label="複製跳轉連結"
                            title="複製跳轉連結"
                          >
                            <AnimatePresence mode="wait">
                              {copiedId === tool.id ? (
                                <motion.div
                                  key="copied"
                                  initial={{ scale: 0.6, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.6, opacity: 0 }}
                                  transition={{ duration: 0.15 }}
                                  className="text-emerald-400"
                                >
                                  <Check className="w-4 h-4 animate-bounce" />
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="copy"
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.8, opacity: 0 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  <Copy className="w-4 h-4" />
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Custom Tooltip Toast overlay */}
                            <AnimatePresence>
                              {copiedId === tool.id && (
                                <motion.div
                                  initial={{ opacity: 0, y: 15, scale: 0.9, x: "-50%" }}
                                  animate={{ opacity: 1, y: -42, scale: 1, x: "-50%" }}
                                  exit={{ opacity: 0, y: 15, scale: 0.9, x: "-50%" }}
                                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                  className="absolute left-1/2 bg-zinc-950 border border-emerald-500/50 text-emerald-400 text-xs px-2.5 py-1 rounded shadow-[0_4px_12px_rgba(0,0,0,0.5)] pointer-events-none whitespace-nowrap font-semibold tracking-wide"
                                >
                                  ✦ 已複製連結
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </button>
                        </>
                      ) : (
                        <div className="w-full py-2.5 bg-stone-900/30 border border-ffxiv-slate/20 text-stone-500 text-sm font-semibold tracking-wider rounded flex items-center justify-center gap-1.5 cursor-not-allowed select-none">
                          <span>項目開發中・敬請期待 ✦</span>
                        </div>
                      )}
                    </div>

                    {/* Corner accent trim decor */}
                    <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-ffxiv-gold rotate-45 translate-x-2 -translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

      </main>

      {/* ================= AUTHOR INTRODUCTION MODAL ================= */}
      <AnimatePresence>
        {isAuthorOpen && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 25 }}
              className="bg-ffxiv-card w-full max-w-2xl rounded-2xl border-2 border-ffxiv-gold shadow-2xl flex flex-col md:flex-row overflow-hidden relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsAuthorOpen(false)}
                className="absolute top-4 right-4 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 text-stone-400 hover:text-white p-1 rounded transition-colors z-30 cursor-pointer animate-fade-in"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Panel: Character Plate Card */}
              <div className="w-full md:w-64 bg-zinc-950 border-b md:border-b-0 md:border-r border-ffxiv-slate/40 shrink-0 p-5 flex flex-col justify-between items-center relative overflow-hidden select-none">
                
                {/* Tech grid mesh overlay on card */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />
                
                <div className="w-full text-center space-y-3 z-10">
                  {/* Decorative Frame */}
                  <div 
                    className="relative w-32 h-32 mx-auto rounded-full border-2 border-ffxiv-gold/40 p-1 bg-zinc-900 flex items-center justify-center shadow-[0_0_15px_rgba(197,160,89,0.15)] group/avatar"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-tr from-ffxiv-gold-dark/20 to-ffxiv-blue/20 overflow-hidden flex items-center justify-center border border-ffxiv-gold-light/20 relative">
                      <img 
                        src={avatarUrl} 
                        alt="閻羅" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/avatar:scale-105" 
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Animated corner rings */}
                    <div className="absolute -inset-1 rounded-full border border-dashed border-ffxiv-gold/20 animate-spin pointer-events-none" style={{ animationDuration: '30s' }} />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-md font-bold text-stone-100 font-ffxiv-serif tracking-wider">閻羅</h3>
                    <p className="text-xs text-ffxiv-gold font-mono tracking-widest uppercase">Yanluo @ Odin</p>
                    <span className="inline-block px-2 py-0.5 mt-1 bg-ffxiv-badge border border-sky-950/30 text-sky-400 rounded-full text-[11px] font-semibold">
                      精靈族｜奧汀
                    </span>
                  </div>
                </div>

                {/* Simulated Character Stats */}
                <div className="w-full mt-6 space-y-2.5 z-10">
                  <span className="text-[10px] text-stone-555 block font-mono border-b border-ffxiv-slate/20 pb-1 uppercase tracking-widest text-center animate-pulse">
                    魔導工程師職級手冊
                  </span>
                  
                  <div className="space-y-1.5 text-xs text-stone-300">
                    <div className="flex justify-between items-center bg-zinc-900/60 px-2 py-1 rounded border border-zinc-850">
                      <span className="text-stone-400 font-medium">💻 秘術/召喚 (全棧)</span>
                      <span className="font-mono text-ffxiv-gold font-bold">Lv.42</span>
                    </div>
                    <div className="flex justify-between items-center bg-zinc-900/60 px-2 py-1 rounded border border-zinc-850">
                      <span className="text-stone-400 font-medium">🎨 雕金匠 (UI/UX)</span>
                      <span className="font-mono text-[#78c8e6] font-bold">Lv.35</span>
                    </div>
                    <div className="flex justify-between items-center bg-zinc-900/60 px-2 py-1 rounded border border-zinc-850">
                      <span className="text-stone-400 font-medium">⚙️ 木匠 (代碼重構)</span>
                      <span className="font-mono text-emerald-450 font-bold">Lv.29</span>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-stone-600 font-mono tracking-wider mt-4 z-10 text-center">
                  Ver 3.2 // Active Sync
                </div>
              </div>

              {/* Right Panel: Scroll of Biography */}
              <div className="flex-1 p-6 text-left flex flex-col justify-between relative">
                <div>
                  <div className="flex items-center gap-2 mb-3 border-b border-ffxiv-slate/30 pb-3">
                    <Award className="w-5 h-5 text-ffxiv-gold" />
                    <div>
                      <h2 className="text-sm md:text-base font-bold font-ffxiv-serif tracking-wider text-stone-100 leading-none">
                        作者檔案：閻羅
                      </h2>
                      <span className="text-[11px] text-stone-500 font-mono mt-1 block">Omni-Projector & Web Artificer Dossier</span>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-stone-300 leading-relaxed mb-4 whitespace-normal font-sans">
                    熱愛 FFXIV RP 角色扮演社群的普通玩家。希望能為繁體中文 RP 圈的各位店家老闆、企劃主與一般冒險者，提供方便又簡易的RP生活輔助工具。
                  </p>

                  <div className="border border-[#c5a059]/30 rounded-xl p-4.5 bg-zinc-950/40 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none border-t border-l border-ffxiv-gold/30" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none border-b border-r border-ffxiv-gold/30" />
                    
                    <div className="space-y-3 font-sans text-xs text-stone-300 leading-relaxed md:text-[13px]">
                      <div className="flex items-center gap-2 border-b border-ffxiv-slate/20 pb-1.5 flex-wrap">
                        <span className="text-ffxiv-gold-light font-bold">✦ 閻羅 (Yanluo) 角色設定</span>
                        <span className="text-stone-500 font-mono text-[10px]">精靈族 ｜ 34歲 ｜ 209cm</span>
                      </div>
                      
                      <p className="text-stone-300">
                        曾是伊修加爾德冷酷的暗殺者「<span className="text-stone-100 font-medium">清道夫</span>」，臉上的疤痕刻劃著染血過往。叛逃瀕死時被無名恩人救下，從此在黑夜中無聲等候。
                      </p>
                      
                      <p className="text-stone-300">
                        如今他收起殺意，換上筆挺西裝，化身俱樂部裡的公關。在「<span className="text-stone-100 font-medium">斯文敗類</span>」的慵懶下，藏著反差溫柔。
                      </p>
                      
                      <p className="text-[#dfc38f] italic font-ffxiv-serif pl-2 border-l-2 border-[#c5a059]/40 tracking-wider">
                        「別緊張，在這裡，我只帶走你的寂寞。」
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-ffxiv-slate/30 flex justify-between items-center gap-4">
                  <span className="text-[10px] text-stone-500 font-mono tracking-wide">
                    「以太連線，願水晶指引代碼的前行。」
                  </span>
                  
                  <button
                    onClick={() => setIsAuthorOpen(false)}
                    className="px-5 py-1.5 bg-gradient-to-r from-ffxiv-gold-dark to-ffxiv-gold text-zinc-950 font-bold hover:from-ffxiv-gold hover:to-ffxiv-gold-light rounded text-xs transition cursor-pointer shrink-0"
                  >
                    關閉檔案
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= FAN FOOTER LEGAL AND ATTRIBUTION ================= */}
      <footer className="bg-ffxiv-footer/90 border-t border-ffxiv-slate py-8 px-6 text-center mt-auto relative z-10 select-none text-stone-500">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="space-y-3.5 text-center md:text-left max-w-2xl">
            <div className="flex justify-center md:justify-start items-center gap-2">
              <span className="w-2.5 h-px bg-zinc-800" />
              <span className="text-sm uppercase font-mono tracking-widest text-ffxiv-gold-dark font-bold">
                Adventurer Guild Portal Registry
              </span>
              <span className="w-2.5 h-px bg-zinc-800" />
            </div>

            <p className="text-sm leading-relaxed">
              FINAL FANTASY XIV © 2010 - 2026 SQUARE ENIX CO., LTD. All Rights Reserved. <br />
              本工具導引網站所提供之遊戲名稱、圖擺、美術資源版權均屬原研發公司 Square Enix 所有。 <br />
              本網頁是由熱心光之戰士（Warrior of Light）自發維護，無營利性、純玩家同好輔助導流工具整合。
            </p>

            <div className="flex justify-center md:justify-start gap-4 text-sm font-mono text-stone-600">
              <span>Client: Patch 7.1 Ready</span>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end select-none shrink-0 border-t md:border-t-0 md:border-l border-ffxiv-slate/30 pt-4 md:pt-0 md:pl-6">
            <span className="text-sm text-ffxiv-gold uppercase font-bold tracking-widest">System Link Status</span>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
              <span className="text-sm text-stone-300 font-semibold font-mono tracking-wider">All Links Operational</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
