(function(){
  const translations = {
    "en": {
      title: "Metronome",
      langLabel: "Language",
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
  const available = Object.keys(translations);

  function getSaved() {
    try { return localStorage.getItem(STORAGE_KEY); } catch(e){ return null; }
  }
  function save(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch(e){}
  }

  function apply(lang) {
    const dict = translations[lang] || translations['en'];
    document.querySelectorAll('[data-i18n]').forEach(node => {
      const key = node.getAttribute('data-i18n');
      if (!key) return;
      if (node.tagName.toLowerCase() === 'title') {
        node.textContent = dict[key] || node.textContent;
      } else {
        node.textContent = dict[key] || node.textContent;
      }
    });
    document.documentElement.lang = lang.startsWith('ja') ? 'ja' : (lang.startsWith('zh-Hant') ? 'zh-Hant' : (lang.startsWith('zh') ? 'zh-Hans' : lang));
    save(lang);
  }

  function init(selectEl) {
    if (!selectEl) return;
    available.forEach(code => {
      const opt = document.createElement('option');
      opt.value = code;
      const labelMap = {
        "en":"English","ja":"日本語","zh-Hans":"简体中文","zh-Hant":"繁體中文","ko":"한국어",
        "es":"Español","fr":"Français","de":"Deutsch","pt-BR":"Português (BR)","ru":"Русский",
        "it":"Italiano","nl":"Nederlands"
      };
      opt.textContent = labelMap[code] || code;
      selectEl.appendChild(opt);
    });
    const saved = getSaved();
    const nav = (navigator.language && navigator.language.startsWith('ja')) ? 'ja' : (navigator.language && navigator.language.startsWith('zh-TW') ? 'zh-Hant' : (navigator.language && navigator.language.startsWith('zh') ? 'zh-Hans' : (navigator.language ? navigator.language.split('-')[0] : 'en')));
    const initial = saved || (available.includes(nav) ? nav : (available.includes('en') ? 'en' : available[0]));
    selectEl.value = initial;
    apply(initial);
    selectEl.addEventListener('change', (e) => apply(e.target.value));
  }

  window.I18n = { init, apply, getAvailable: () => available.slice(), translations };
})();
