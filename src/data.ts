/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ToolItem } from './types';

export const INITIAL_TOOLS_DATA: ToolItem[] = [
  {
    id: 'rp-map',
    title: 'FFXIV TC RP MAP｜光之街角',
    enTitle: 'Light Corner Roleplay Map',
    description: '專為繁體中文玩家打造的實時 RP 店家與角色地標導覽地圖。輕鬆登記您的營業店面、冒險者聚落並查看實時傳送位置。',
    longDescription: '這是一個專為 FFXIV 繁體中文角色扮演社群（TC RP）設計的線上交互式地圖。玩家可以自由登記、檢索位於不同伺服器與住宅區的店面、角色聚落。支援即時篩選營業中店家，提供高效率的冒險導航體驗！',
    category: 'roleplay',
    version: 'v1.0.2-STABLE',
    status: 'stable',
    statusText: '穩定運作中',
    defaultUrl: 'https://xiv-tc-rp-map.vercel.app/',
    features: [
      '實時房屋定位',
      '一鍵複製分享店鋪資訊',
      '營業狀態動態看板',
      '精緻店鋪資訊卡'
    ],
    mockUpType: 'profileCard'
  },
  {
    id: 'plate-designer',
    title: 'FFXIV TC RP CARD｜水晶名片',
    enTitle: 'FFXIV TC RP CARD (Future Tech)',
    description: '極具未來科技感（Future Tech Edition）的角色設定卡片生成器。支援霓虹與賽博格特有氛圍，輕鬆定制個人 OC 虛擬卡牌及背景卡紙。',
    longDescription: '專為 FFXIV 繁體中文角色扮演社群打造的近代科技/賽博風格冒險者設定卡（OC Card）生成工具。提供霓虹光暈邊框、復古掃描線與科幻網格背景等視覺主題，支援多種中文字型選擇，並透過 html2canvas 技術將您的原創角色（OC）設定卡一鍵匯出為超高清圖片，完美裝飾您的個人檔案與社群網頁。',
    category: 'roleplay',
    version: 'v2.2.0-STABLE',
    status: 'stable',
    statusText: '穩定運作中',
    defaultUrl: 'https://ffxiv-tc-rp-occard.vercel.app/',
    features: [
      '賽博霓虹濾鏡',
      '一鍵導出高清圖卡',
      '多款精緻中日文字型',
      '自由客製屬性面板'
    ],
    mockUpType: 'profileCard'
  },
  {
    id: 'rp-pos',
    title: 'FFXIV TC RP店用POS機｜乙太連線',
    enTitle: 'Etheric Connection POS',
    description: '專為 FFXIV RP 店家設計的收銀點單系統。具備自定義菜單、餐點計價、Gil幣換算與結帳報表，助您打造高沉浸感的深夜酒吧、女僕咖啡廳或冒險者餐館。',
    longDescription: '打造艾歐澤亞最專業的餐飲與娛樂營運體驗！為 FFXIV 角色扮演店（RP Cafe/Bar/Club）提供一站式前台收銀點單解決方案。支持即時商品名錄編輯、購物車計價與 Gil 幣結帳結算，讓您的 RP 店家營運更加富有代入感與專業細緻度。',
    category: 'roleplay',
    version: 'v1.5.0-BETA',
    status: 'beta',
    statusText: '封閉測試進行中，請有興趣使用的店主和作者聯繫',
    defaultUrl: 'https://ffxiv-tc-rp-pos.vercel.app/',
    features: [
      '自訂菜單與價格',
      '極速餐點計價',
      '營收自動統計',
      '店鋪公告跑馬燈'
    ],
    mockUpType: 'macroHelper'
  },
  {
    id: 'rp-shiftcore',
    title: 'FFXIV TC RP店排班助手｜ShiftCore',
    enTitle: 'ShiftCore Scheduler',
    description: '專為角色扮演店家（RP Cafe/Bar）設計的排班與班表生成工具。支持多員工時段排程、精美班表視覺化匯出，告別繁瑣的手工班表與通訊協調。',
    longDescription: '冒險者店家運作的核心引擎！本工具旨在協助 FFXIV 繁體中文 RP 店鋪（如：深夜居酒屋、執事咖啡廳、地下夜總會）店長與管理階層高效率排班，支援多位店員、看板娘、招待員的上班時段排程，提供完美的課表視覺化與 DC 廣播格式匯出。',
    category: 'music',
    version: 'v3.0.1-STABLE',
    status: 'stable',
    statusText: '穩定運作中',
    defaultUrl: 'https://rp-shfit-core.vercel.app/',
    features: [
      '智能輪班排程',
      '生成精美班表圖',
      '工時與職務管理',
      '跨營運日快速複製'
    ],
    mockUpType: 'bardMusic'
  },
  {
    id: 'rp-universe-notes',
    title: 'RP宇宙：角色筆記本',
    enTitle: 'RP Universe: Character Notebook',
    description: '創作者與 RP 玩家必備！靈感隨想與角色設定隨身手帳。隨心管理 OC 人設卡、背景故事、性格特徵與生動札記，編織您專屬的 RP 創想宇宙。',
    longDescription: '這是一個專為 FFXIV 及角色扮演愛好者設計的線上個人角色設定與創作筆記本。支持便捷的靈感隨貼、故事大綱分章節撰寫與重要人物標籤管理。提供便捷的瀏覽器本地儲存與資料匯出，助您完美構建、珍藏角色的每一個生動瞬間。',
    category: 'social',
    version: 'v1.0.0-STABLE',
    status: 'stable',
    statusText: '穩定運作中',
    defaultUrl: 'https://rp-universe-hub.vercel.app/',
    features: [
      '結構化角色人設範本',
      '可匯入親友或CP角色檔案',
      '精緻角色關係圖自由編織',
      '一鍵本地匯出備份'
    ],
    mockUpType: 'characterGraph'
  },
  {
    id: 'atelier-marco-studio',
    title: 'RP MARCO STUDIO｜巨集工坊',
    enTitle: 'RP Macro Studio by Atelier Marco',
    description: 'RP 玩家與公關必備！專為 FFXIV RP 設計的巨集與台詞管理工坊。支援多角色分開管理與自訂工作分頁，助您輕鬆切換不同店鋪，隨心珍藏、一鍵複製所有演出與廣播巨集。',
    longDescription: '專為艾歐澤亞的 RP 行業者、公關與演出者打造的台詞儲存與管理神器。支援「多個角色獨立儲存」與「自訂多個工作分頁」，即使您同時在不同的夜總會、俱樂部、咖啡廳上班，也能一鍵快速切換對應的角色與台詞巨集。擺脫遊戲內巨集欄位數量限制與行數痛點，隨指存取最優雅的廣播菜單與演出動作。',
    category: 'roleplay',
    version: 'v1.0.0-STABLE',
    status: 'stable',
    statusText: '穩定運作中',
    defaultUrl: 'https://atelier-marco-studio.vercel.app/',
    features: [
      '多角色檔案獨立儲存管理',
      '自訂工作分頁隨時切換',
      '艾歐澤亞巨集台詞一鍵複製',
      '專屬廣播、菜單與表情動作儲存'
    ],
    mockUpType: 'macroHelper'
  }
];
