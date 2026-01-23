(function(){
  const langSel = document.getElementById('lang');
  const bpmInput = document.getElementById('bpm');
  const startBtn = document.getElementById('start');
  const stopBtn = document.getElementById('stop');
  const tapBtn = document.getElementById('tap');
  const beatsSel = document.getElementById('beats');
  const subSel = document.getElementById('sub');
  const volRange = document.getElementById('volume');
  const dot = document.getElementById('dot');

  I18n.init(langSel);

  let audioCtx = null;
  let isRunning = false;
  let currentNote = 0;
  let tempo = 120;
  let lookahead = 25.0; 
  let scheduleAheadTime = 0.1; 
  let nextNoteTime = 0.0;
  let timerID = null;
  let beatsPerBar = 4;
  let subdivision = 1;
  let gainNode = null;

  let tapTimes = [];

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      gainNode = audioCtx.createGain();
      gainNode.gain.value = parseFloat(volRange.value);
      gainNode.connect(audioCtx.destination);
    }
  }

  function playClick(time, isAccent=false) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = isAccent ? 'sine' : 'square';
    osc.frequency.value = isAccent ? 1000 : 800;
    g.gain.value = isAccent ? 0.6 : 0.35;
    osc.connect(g);
    g.connect(gainNode);
    osc.start(time);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.06);
    osc.stop(time + 0.07);
  }

  function nextNote() {
    const secondsPerBeat = 60.0 / tempo;
    nextNoteTime += (1.0 / subdivision) * secondsPerBeat;
    currentNote++;
  }

  function scheduleNote(beatNumber, time) {
    const totalSubdivision = beatsPerBar * subdivision;
    const beatIndex = beatNumber % totalSubdivision;
    const isAccent = (beatIndex % (subdivision) === 0); 
    const isBarAccent = (beatIndex === 0);
    playClick(time, isBarAccent);
    const now = audioCtx.currentTime;
    const delay = Math.max(0, (time - now) * 1000);
    setTimeout(() => flash(isBarAccent), delay);
  }

  function scheduler() {
    while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
      scheduleNote(currentNote, nextNoteTime);
      nextNote();
    }
    timerID = setTimeout(scheduler, lookahead);
  }

  function start() {
    if (isRunning) return;
    initAudio();
    tempo = parseFloat(bpmInput.value) || 120;
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
    isRunning = false;
    dot.style.transform = 'scale(1)';
    dot.classList.remove('accent');
  }

  function flash(accent) {
    dot.style.transform = 'scale(1.6)';
    if (accent) dot.classList.add('accent');
    setTimeout(() => {
      dot.style.transform = 'scale(1)';
      dot.classList.remove('accent');
    }, 120);
  }

  startBtn.addEventListener('click', () => {
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    start();
  });

  stopBtn.addEventListener('click', () => stop());

  volRange.addEventListener('input', () => {
    if (gainNode) gainNode.gain.value = parseFloat(volRange.value);
  });

  bpmInput.addEventListener('change', () => {
    tempo = parseFloat(bpmInput.value) || tempo;
  });

  beatsSel.addEventListener('change', () => {
    beatsPerBar = parseInt(beatsSel.value, 10);
  });

  subSel.addEventListener('change', () => {
    subdivision = parseInt(subSel.value, 10);
  });

  tapBtn.addEventListener('click', () => {
    const now = performance.now();
    tapTimes.push(now);
    if (tapTimes.length > 6) tapTimes.shift();
    if (tapTimes.length >= 2) {
      let intervals = [];
      for (let i = 1; i < tapTimes.length; i++) intervals.push(tapTimes[i] - tapTimes[i-1]);
      const avg = intervals.reduce((a,b)=>a+b,0)/intervals.length;
      const newBpm = Math.round(60000 / avg);
      bpmInput.value = Math.max(20, Math.min(300, newBpm));
      tempo = parseFloat(bpmInput.value);
    }
    clearTimeout(tapBtn._clearTimer);
    tapBtn._clearTimer = setTimeout(()=>tapTimes=[], 2000);
  });

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      isRunning ? stop() : start();
    } else if (e.key.toLowerCase() === 't') {
      tapBtn.click();
    }
  });

  document.querySelectorAll('button,input,select').forEach(el=>{
    el.addEventListener('focus', ()=>el.style.outline='2px solid rgba(6,182,212,0.18)');
    el.addEventListener('blur', ()=>el.style.outline='none');
  });

  window.addEventListener('pagehide', () => {
    if (audioCtx) audioCtx.close();
  });
})();
