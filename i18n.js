// i18n.js
(function(){
  const translations = {
    "auto": {
      auto: "Auto"
    },
    "en": {
      title: "Metronome",
      langLabel: "Language",
      themeLabel: "Theme",
      auto: "Auto (System)",
      dark: "Dark",
      light: "Light",
      bpmLabel: "BPM",
      beatsLabel: "Beats / Bar",
      subLabel: "Subdivision",
      volLabel: "Volume",
      startBtn: "Start",
      stopBtn: "Stop",
      tapBtn: "Tap",
      tapHint: "Tap tempo: 4 taps to set BPM",
      footer: "works in modern browsers (Chrome/Edge/Firefox/Safari)"
    },
    "ja": {
      title: "メトロノーム",
      langLabel: "言語",
      themeLabel: "テーマ",
      auto: "自動（システムに合わせる）",
      dark: "ダーク",
      light: "ライト",
      bpmLabel: "BPM",
      beatsLabel: "小節の拍数",
      subLabel: "分割",
      volLabel: "音量",
      startBtn: "再生",
      stopBtn: "停止",
      tapBtn: "タップ",
      tapHint: "タップテンポ：4回タップでBPMを設定",
      footer: "最新ブラウザで動作します（Chrome/Edge/Firefox/Safari）"
    },
    "zh-Hans": {
      title: "节拍器",
      langLabel: "语言",
      themeLabel: "主题",
      auto: "自动（跟随系统）",
      dark: "深色",
      light: "浅色",
      bpmLabel: "BPM",
      beatsLabel: "小节拍数",
      subLabel: "细分",
      volLabel: "音量",
      startBtn: "开始",
      stopBtn: "停止",
      tapBtn: "拍击",
      tapHint: "拍击节拍：拍击4次以设置BPM",
      footer: "在现代浏览器中可用（Chrome/Edge/Firefox/Safari）"
    },
    "zh-Hant": {
      title: "節拍器",
      langLabel: "語言",
      themeLabel: "主題",
      auto: "自動（跟隨系統）",
      dark: "深色",
      light: "淺色",
      bpmLabel: "BPM",
      beatsLabel: "小節拍數",
      subLabel: "細分",
      volLabel: "音量",
      startBtn: "開始",
      stopBtn: "停止",
      tapBtn: "拍擊",
      tapHint: "拍擊節拍：拍擊4次以設定BPM",
      footer: "在現代瀏覽器中可用（Chrome/Edge/Firefox/Safari）"
    },
    "ko": {
      title: "메트로놈",
      langLabel: "언어",
      themeLabel: "테마",
      auto: "자동（시스템）",
      dark: "다크",
      light: "라이트",
      bpmLabel: "BPM",
      beatsLabel: "마디 박자",
      subLabel: "세분화",
      volLabel: "볼륨",
      startBtn: "재생",
      stopBtn: "정지",
      tapBtn: "탭",
      tapHint: "탭 템포: 4회 탭하여 BPM 설정",
      footer: "최신 브라우저에서 작동합니다 (Chrome/Edge/Firefox/Safari)"
    },
    "es": {
      title: "Metrónomo",
      langLabel: "Idioma",
      themeLabel: "Tema",
      auto: "Auto (Sistema)",
      dark: "Oscuro",
      light: "Claro",
      bpmLabel: "BPM",
      beatsLabel: "Compases",
      subLabel: "Subdivisión",
      volLabel: "Volumen",
      startBtn: "Iniciar",
      stopBtn: "Detener",
      tapBtn: "Tap",
      tapHint: "Tap tempo: 4 toques para ajustar BPM",
      footer: "funciona en navegadores modernos (Chrome/Edge/Firefox/Safari)"
    },
    "fr": {
      title: "Métronome",
      langLabel: "Langue",
      themeLabel: "Thème",
      auto: "Auto (Système)",
      dark: "Sombre",
      light: "Clair",
      bpmLabel: "BPM",
      beatsLabel: "Temps / Mesure",
      subLabel: "Subdivision",
      volLabel: "Volume",
      startBtn: "Démarrer",
      stopBtn: "Arrêter",
      tapBtn: "Tap",
      tapHint: "Tap tempo : 4 taps pour définir le BPM",
      footer: "fonctionne dans les navigateurs modernes (Chrome/Edge/Firefox/Safari)"
    },
    "de": {
      title: "Metronom",
      langLabel: "Sprache",
      themeLabel: "Design",
      auto: "Automatisch (System)",
      dark: "Dunkel",
      light: "Hell",
      bpmLabel: "BPM",
      beatsLabel: "Schläge / Takt",
      subLabel: "Unterteilung",
      volLabel: "Lautstärke",
      startBtn: "Start",
      stopBtn: "Stopp",
      tapBtn: "Tap",
      tapHint: "Tap-Tempo: 4 Taps zum Einstellen des BPM",
      footer: "funktioniert in modernen Browsern (Chrome/Edge/Firefox/Safari)"
    },
    "pt-BR": {
      title: "Metrônomo",
      langLabel: "Idioma",
      themeLabel: "Tema",
      auto: "Auto (Sistema)",
      dark: "Escuro",
      light: "Claro",
      bpmLabel: "BPM",
      beatsLabel: "Batidas / Compasso",
      subLabel: "Subdivisão",
      volLabel: "Volume",
      startBtn: "Iniciar",
      stopBtn: "Parar",
      tapBtn: "Tap",
      tapHint: "Tap tempo: 4 toques para definir o BPM",
      footer: "funciona em navegadores modernos (Chrome/Edge/Firefox/Safari)"
    },
    "ru": {
      title: "Метроном",
      langLabel: "Язык",
      themeLabel: "Тема",
      auto: "Авто (Система)",
      dark: "Тёмная",
      light: "Светлая",
      bpmLabel: "BPM",
      beatsLabel: "Доли / Такт",
      subLabel: "Деление",
      volLabel: "Громкость",
      startBtn: "Старт",
      stopBtn: "Стоп",
      tapBtn: "Тап",
      tapHint: "Tap tempo: 4 нажатия для установки BPM",
      footer: "работает в современных браузерах (Chrome/Edge/Firefox/Safari)"
    },
    "it": {
      title: "Metronomo",
      langLabel: "Lingua",
      themeLabel: "Tema",
      auto: "Auto (Sistema)",
      dark: "Scuro",
      light: "Chiaro",
      bpmLabel: "BPM",
      beatsLabel: "Battiti / Battuta",
      subLabel: "Suddivisione",
      volLabel: "Volume",
      startBtn: "Avvia",
      stopBtn: "Ferma",
      tapBtn: "Tap",
      tapHint: "Tap tempo: 4 tocchi per impostare il BPM",
      footer: "funziona nei browser moderni (Chrome/Edge/Firefox/Safari)"
    },
    "nl": {
      title: "Metronoom",
      langLabel: "Taal",
      themeLabel: "Thema",
      auto: "Auto (Systeem)",
      dark: "Donker",
      light: "Licht",
      bpmLabel: "BPM",
      beatsLabel: "Slagen / Maat",
      subLabel: "Subdivisie",
      volLabel: "Volume",
      startBtn: "Start",
      stopBtn: "Stop",
      tapBtn: "Tap",
      tapHint: "Tap tempo: 4 taps om BPM in te stellen",
      footer: "werkt in moderne browsers (Chrome/Edge/Firefox/Safari)"
    }
  };

  const STORAGE_KEY = 'metronome_lang';
  const available = Object.keys(translations).filter(k => k !== 'auto');

  function getSaved() {
    try { return localStorage.getItem(STORAGE_KEY); } catch(e){ return null; }
  }
  function save(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch(e){}
  }

  function resolveFromNavigator() {
    const nav = navigator.language || navigator.userLanguage || 'en';
    if (nav.startsWith('zh-TW') || nav.startsWith('zh-HK') || nav.startsWith('zh-Hant')) return 'zh-Hant';
    if (nav.startsWith('zh')) return 'zh-Hans';
    if (nav.startsWith('pt-BR')) return 'pt-BR';
    const base = nav.split('-')[0];
    if (available.includes(nav)) return nav;
    if (available.includes(base)) return base;
    return 'en';
  }

  function apply(lang) {
    const effective = (lang === 'auto' || !lang) ? resolveFromNavigator() : lang;
    const dict = translations[effective] || translations['en'];
    document.querySelectorAll('[data-i18n]').forEach(node => {
      const key = node.getAttribute('data-i18n');
      if (!key) return;
      if (node.tagName.toLowerCase() === 'title') {
        node.textContent = dict[key] || node.textContent;
      } else {
        node.textContent = dict[key] || node.textContent;
      }
    });
    const htmlLang = (effective === 'zh-Hant') ? 'zh-Hant' : (effective === 'zh-Hans' ? 'zh' : effective);
    document.documentElement.lang = htmlLang;
    save(lang);
  }

  function init(selectEl) {
    if (!selectEl) return;
    // Auto option
    const optAuto = document.createElement('option');
    optAuto.value = 'auto';
    optAuto.textContent = translations['en'].auto || 'Auto';
    selectEl.appendChild(optAuto);

    const labelMap = {
      "en":"English","ja":"日本語","zh-Hans":"简体中文","zh-Hant":"繁體中文","ko":"한국어",
      "es":"Español","fr":"Français","de":"Deutsch","pt-BR":"Português (BR)","ru":"Русский",
      "it":"Italiano","nl":"Nederlands"
    };
    available.forEach(code => {
      const opt = document.createElement('option');
      opt.value = code;
      opt.textContent = labelMap[code] || code;
      selectEl.appendChild(opt);
    });

    const saved = getSaved();
    const initial = saved || 'auto';
    selectEl.value = initial;
    apply(initial);

    selectEl.addEventListener('change', (e) => {
      apply(e.target.value);
      if (e.target.value === 'auto') {
        apply('auto');
      }
    });

    if ('onlanguagechange' in window) {
      window.addEventListener('languagechange', () => {
        if (selectEl.value === 'auto') apply('auto');
      });
    }
  }

  window.I18n = { init, apply, getAvailable: () => available.slice(), translations };
})();
