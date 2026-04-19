(function () {
  const langSel = document.getElementById("lang");
  const themeSel = document.getElementById("theme");
  const bpmInput = document.getElementById("bpm");
  const startBtn = document.getElementById("start");
  const stopBtn = document.getElementById("stop");
  const tapBtn = document.getElementById("tap");
  const beatsSel = document.getElementById("beats");
  const subSel = document.getElementById("sub");
  const volRange = document.getElementById("volume");
  const dot = document.getElementById("dot");

  if (!window.I18n) {
    throw new Error("I18n module is missing");
  }

  I18n.init(langSel);

  const THEME_KEY = "metronome_theme";

  function getSavedTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function saveTheme(t) {
    try {
      localStorage.setItem(THEME_KEY, t);
    } catch (e) {}
  }

  const mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function systemTheme() {
    if (!mq) return "light";
    return mq.matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    if (theme === "light") {
      document.documentElement.classList.add("light-theme");
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.classList.remove("light-theme");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }

  function applyThemeChoice(choice) {
    const resolved = choice === "auto" ? systemTheme() : choice;
    applyTheme(resolved);

    if (themeSel) {
      themeSel.value = choice;
    }

    saveTheme(choice);
  }

  const savedTheme = getSavedTheme();
  applyThemeChoice(savedTheme || "auto");

  if (mq && typeof mq.addEventListener === "function") {
    mq.addEventListener("change", () => {
      const currentChoice = themeSel ? themeSel.value : (getSavedTheme() || "auto");
      if (currentChoice === "auto") {
        applyTheme(systemTheme());
      }
    });
  } else if (mq && typeof mq.addListener === "function") {
    mq.addListener(() => {
      const currentChoice = themeSel ? themeSel.value : (getSavedTheme() || "auto");
      if (currentChoice === "auto") {
        applyTheme(systemTheme());
      }
    });
  }

  if (themeSel) {
    themeSel.addEventListener("change", (e) => {
      applyThemeChoice(e.target.value);
    });
  }

  langSel.addEventListener("change", () => {
    const currentChoice = themeSel ? themeSel.value : (getSavedTheme() || "auto");
    applyThemeChoice(currentChoice);
  });

  if ("onlanguagechange" in window) {
    window.addEventListener("languagechange", () => {
      if (langSel && langSel.value === "auto") {
        I18n.apply("auto");
      }
    });
  }

  let audioCtx = null;
  let gainNode = null;

  let isRunning = false;
  let currentNote = 0;
  let tempo = 120;
  let lookahead = 25.0;
  let scheduleAheadTime = 0.1;
  let nextNoteTime = 0.0;
  let timerID = null;
  let beatsPerBar = 4;
  let subdivision = 1;
  let tapTimes = [];

  function initAudio() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) {
      console.error("Web Audio API is not available");
      return false;
    }

    if (!audioCtx || audioCtx.state === "closed") {
      audioCtx = new Ctx();
      gainNode = audioCtx.createGain();
      gainNode.gain.value = parseFloat(volRange.value) || 0.8;
      gainNode.connect(audioCtx.destination);
    }

    return true;
  }

  async function unlockAudio() {
    if (!initAudio()) return false;

    if (audioCtx.state === "suspended") {
      try {
        await audioCtx.resume();
      } catch (e) {
        console.error("Audio resume failed:", e);
        return false;
      }
    }

    return audioCtx.state === "running";
  }

  function playClick(time, isAccent = false) {
    if (!audioCtx || !gainNode) return;

    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();

    osc.type = isAccent ? "sine" : "square";
    osc.frequency.value = isAccent ? 1200 : 900;

    g.gain.setValueAtTime(isAccent ? 0.75 : 0.45, time);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.05);

    osc.connect(g);
    g.connect(gainNode);

    osc.start(time);
    osc.stop(time + 0.06);
  }

  function nextNote() {
    const secondsPerBeat = 60.0 / tempo;
    nextNoteTime += (1.0 / subdivision) * secondsPerBeat;
    currentNote++;
  }

  function flash(accent) {
    dot.style.transform = "scale(1.6)";
    if (accent) {
      dot.classList.add("accent");
    }
    setTimeout(() => {
      dot.style.transform = "scale(1)";
      dot.classList.remove("accent");
    }, 120);
  }

  function scheduleNote(beatNumber, time) {
    const totalSubdivision = beatsPerBar * subdivision;
    const beatIndex = beatNumber % totalSubdivision;
    const isBarAccent = (beatIndex === 0);

    playClick(time, isBarAccent);

    const now = audioCtx.currentTime;
    const delay = Math.max(0, (time - now) * 1000);
    setTimeout(() => flash(isBarAccent), delay);
  }

  function scheduler() {
    if (!isRunning || !audioCtx) return;

    while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
      scheduleNote(currentNote, nextNoteTime);
      nextNote();
    }

    timerID = setTimeout(scheduler, lookahead);
  }

  async function start() {
    if (isRunning) return;

    const unlocked = await unlockAudio();
    if (!unlocked) {
      console.error("Audio is not ready");
      return;
    }

    tempo = Math.max(20, Math.min(300, parseFloat(bpmInput.value) || 120));
    bpmInput.value = String(tempo);

    beatsPerBar = parseInt(beatsSel.value, 10) || 4;
    subdivision = parseInt(subSel.value, 10) || 1;

    currentNote = 0;
    nextNoteTime = audioCtx.currentTime + 0.05;
    isRunning = true;
    scheduler();
  }

  function stop() {
    if (!isRunning) return;

    clearTimeout(timerID);
    timerID = null;
    isRunning = false;

    if (dot) {
      dot.style.transform = "scale(1)";
      dot.classList.remove("accent");
    }
  }

  startBtn.addEventListener("click", () => {
    start().catch(err => console.error(err));
  });

  stopBtn.addEventListener("click", () => stop());

  volRange.addEventListener("input", () => {
    if (gainNode) {
      gainNode.gain.value = parseFloat(volRange.value) || 0.8;
    }
  });

  bpmInput.addEventListener("change", () => {
    const v = parseFloat(bpmInput.value);
    if (Number.isFinite(v)) {
      tempo = Math.max(20, Math.min(300, v));
      bpmInput.value = String(tempo);
    }
  });

  beatsSel.addEventListener("change", () => {
    beatsPerBar = parseInt(beatsSel.value, 10) || 4;
  });

  subSel.addEventListener("change", () => {
    subdivision = parseInt(subSel.value, 10) || 1;
  });

  tapBtn.addEventListener("click", () => {
    const now = performance.now();
    tapTimes.push(now);
    if (tapTimes.length > 6) tapTimes.shift();

    if (tapTimes.length >= 2) {
      const intervals = tapTimes.slice(1).map((t, i) => t - tapTimes[i]);
      const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const newBpm = Math.round(60000 / avg);
      const clamped = Math.max(20, Math.min(300, newBpm));
      bpmInput.value = String(clamped);
      tempo = clamped;
    }

    clearTimeout(tapBtn._clearTimer);
    tapBtn._clearTimer = setTimeout(() => {
      tapTimes = [];
    }, 2000);
  });

  window.addEventListener("keydown", e => {
    if (e.code === "Space") {
      e.preventDefault();
      if (isRunning) {
        stop();
      } else {
        start().catch(err => console.error(err));
      }
    } else if (e.key.toLowerCase() === "t") {
      tapBtn.click();
    }
  });

  document.querySelectorAll("button,input,select").forEach(el => {
    el.addEventListener("focus", () => {
      el.style.outline = "2px solid rgba(6,182,212,0.18)";
    });
    el.addEventListener("blur", () => {
      el.style.outline = "none";
    });
  });

  window.addEventListener("pagehide", () => {
    if (audioCtx && audioCtx.state !== "closed") {
      audioCtx.close().catch(() => {});
    }
  });
})();
