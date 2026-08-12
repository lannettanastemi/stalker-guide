(function () {
  'use strict';

  /* ---------------------------- стили ---------------------------- */
  var css = ''
    + '.ht-destroy-section{border-top:1px solid var(--hairline);padding:80px 0 96px;}'
    + '.ht-overlay{position:fixed;inset:0;z-index:2000;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(3,4,2,0.86);backdrop-filter:blur(3px);opacity:0;visibility:hidden;transition:opacity .35s ease, visibility .35s ease;}'
    + '.ht-overlay.ht-open{opacity:1;visibility:visible;}'
    + '.ht-crt{width:100%;max-width:1280px;}'
    + '.ht-crt-glass{position:relative;background:#03130b;border:1px solid #1c3a24;border-radius:26px;box-shadow:0 40px 90px rgba(0,0,0,0.6), inset 0 0 60px rgba(0,0,0,0.75), inset 0 0 140px rgba(0,0,0,0.55);overflow:hidden;transform:scaleY(.05);filter:brightness(3) saturate(0);animation:htPowerOn .8s cubic-bezier(.2,1,.3,1) forwards;}'
    + '@keyframes htPowerOn{0%{transform:scaleY(.05);filter:brightness(3) saturate(0);}18%{transform:scaleY(1);filter:brightness(2.2) saturate(.4);}32%{transform:scaleY(.94);filter:brightness(.55);}50%{transform:scaleY(1.01);}70%{filter:brightness(1.25);}100%{transform:scaleY(1);filter:brightness(1) saturate(1);}}'
    + '.ht-crt-glass.ht-shattered{animation:htShatterShake .5s ease;}'
    + '@keyframes htShatterShake{0%{transform:translate(0,0);filter:brightness(1) saturate(1);}20%{transform:translate(-6px,2px);filter:brightness(2.2) saturate(0);}40%{transform:translate(6px,-2px);filter:brightness(.15);}60%{transform:translate(-4px,1px);filter:brightness(1.4);}80%{transform:translate(2px,-1px);filter:brightness(.4);}100%{transform:translate(0,0);filter:brightness(.55) saturate(.3);}}'
    + '.ht-scanlines{position:absolute;inset:0;pointer-events:none;z-index:3;background:repeating-linear-gradient(to bottom, rgba(168,232,60,0.07) 0px, rgba(168,232,60,0.07) 1px, transparent 2px, transparent 4px);mix-blend-mode:overlay;animation:htInterlace .15s steps(1) infinite;}'
    + '@keyframes htInterlace{0%,100%{opacity:.5;}50%{opacity:1;}}'
    + '.ht-static{position:absolute;inset:0;pointer-events:none;z-index:2;opacity:.05;background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E");animation:htHiss 6s steps(10) infinite;}'
    + '@keyframes htHiss{0%,100%{opacity:.04;}45%{opacity:.09;}70%{opacity:.03;}}'
    + '.ht-vignette{position:absolute;inset:0;pointer-events:none;z-index:4;box-shadow:inset 0 0 120px rgba(0,0,0,0.85);background:radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%);}'
    + '.ht-crack{position:absolute;inset:0;z-index:5;opacity:0;pointer-events:none;width:100%;height:100%;object-fit:cover;mix-blend-mode:screen;filter:brightness(1.4) contrast(1.1);}'
    + '.ht-crt-glass.ht-shattered .ht-crack{animation:htGlassAppear .6s cubic-bezier(.2,.9,.25,1) forwards;}'
    + '@keyframes htGlassAppear{0%{opacity:0;transform:scale(1.35);filter:brightness(3) contrast(1.1);}35%{opacity:1;transform:scale(1.04);filter:brightness(2) contrast(1.1);}65%{transform:scale(.99);}100%{opacity:1;transform:scale(1);filter:brightness(1.4) contrast(1.1);}}'
    + '.ht-close{position:absolute;top:14px;right:16px;z-index:6;background:none;border:none;color:var(--toxic);font-size:22px;line-height:1;cursor:pointer;opacity:.8;font-family:var(--mono);}'
    + '.ht-close:hover{opacity:1;text-shadow:0 0 8px var(--toxic);}'
    + '.ht-screen{position:relative;z-index:1;padding:30px 30px 28px;font-family:var(--mono);color:var(--toxic);}'
    + '.ht-topbar{display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--toxic);border-bottom:1px solid #1c3a24;padding-bottom:14px;margin-bottom:16px;flex-wrap:wrap;}'
    + '.ht-attempts{display:flex;gap:6px;}'
    + '.ht-attempts i{width:8px;height:8px;border-radius:50%;background:#1c3a24;display:inline-block;}'
    + '.ht-attempts i.on{background:var(--toxic);box-shadow:0 0 6px var(--toxic);}'
    + '.ht-attempts i.lost{background:var(--rust);box-shadow:0 0 6px var(--rust);}'
    + '.ht-timerwrap{height:3px;width:100%;background:#12241a;margin-bottom:20px;overflow:hidden;}'
    + '.ht-timerbar{height:100%;width:100%;background:var(--toxic);transition:width .1s linear, background-color .3s;}'
    + '.ht-timerbar.warn{background:var(--rust);}'
    + '.ht-intro{padding:4px 0 6px;}'
    + '.ht-intro h3{color:var(--ink);font-size:17px;margin-bottom:14px;}'
    + '.ht-intro ul{list-style:none;margin-bottom:20px;max-width:640px;}'
    + '.ht-intro li{font-size:12.5px;line-height:1.7;color:var(--ink-dim);font-family:var(--body);text-transform:none;letter-spacing:normal;padding:6px 0 6px 18px;position:relative;}'
    + '.ht-intro li::before{content:"—";position:absolute;left:0;color:var(--toxic);}'
    + '.ht-intro li b{color:var(--toxic);font-weight:600;}'
    + '.ht-intro li b.amber{color:#caa53c;}'

    /* --- игровое поле: доска + подсказки (буквы вразброс) + клавиатура --- */
    + '.ht-game{display:flex;gap:28px;flex-wrap:wrap;align-items:flex-start;}'
    + '.ht-board-col{flex:1 1 360px;min-width:220px;}'
    + '.ht-hints-col{flex:0 0 210px;min-width:170px;border-left:1px dashed #1c3a24;padding-left:22px;}'
    + '.ht-keyboard-col{flex:1 1 100%;padding-top:6px;}'
    + '@media (max-width:820px){.ht-hints-col{border-left:none;border-top:1px dashed #1c3a24;padding-left:0;padding-top:16px;flex:1 1 100%;order:3;}.ht-board-col{order:1;}.ht-keyboard-col{order:2;}}'
    + '.ht-hints-col h4{font-size:10.5px;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink-dim);margin-bottom:10px;font-weight:400;}'
    + '.ht-hint-list{list-style:none;display:flex;flex-direction:column;gap:6px;}'
    + '.ht-hint-list li{display:flex;gap:3px;overflow:hidden;font-family:var(--mono);font-size:12px;letter-spacing:1px;padding:8px 9px;border:1px solid #1c3a24;background:rgba(168,232,60,.03);transition:border-color .3s, background .3s;}'
    + '.ht-hletter{display:inline-block;color:#4c6a52;transition:color .3s;}'
    + '.ht-hint-list li.cracked{border-color:var(--toxic);background:rgba(168,232,60,.09);}'
    + '.ht-hint-list li.cracked .ht-hletter{color:var(--toxic);}'

    + '.ht-message{min-height:16px;font-family:var(--mono);font-size:11px;letter-spacing:.5px;color:var(--rust);margin-bottom:10px;}'
    + '.ht-board{display:flex;flex-direction:column;gap:7px;margin-bottom:20px;max-width:520px;}'
    + '.ht-row{display:grid;gap:6px;}'
    + '.ht-row.shake{animation:htShake .38s;}'
    + '@keyframes htShake{10%,90%{transform:translateX(-2px);}20%,80%{transform:translateX(4px);}30%,50%,70%{transform:translateX(-6px);}40%,60%{transform:translateX(6px);}}'
    + '.ht-tile{aspect-ratio:1/1.05;border:1px solid #1c3a24;display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:clamp(13px,2.1vw,19px);font-weight:700;color:var(--toxic);background:rgba(168,232,60,.03);text-transform:uppercase;}'
    + '.ht-tile.filled{border-color:#3a5c40;background:rgba(168,232,60,.08);}'
    + '.ht-tile.flip{animation:htFlip .46s ease;}'
    + '@keyframes htFlip{0%{transform:rotateX(0);}50%{transform:rotateX(90deg);}100%{transform:rotateX(0);}}'
    + '.ht-tile.correct{background:var(--toxic);color:#06170c;border-color:var(--toxic);}'
    + '.ht-tile.present{background:#caa53c;color:#241a02;border-color:#caa53c;}'
    + '.ht-tile.absent{background:#141f18;color:#3c4a41;border-color:#1e2b23;}'

    + '.ht-keyboard{display:flex;flex-direction:column;gap:8px;margin-top:2px;}'
    + '.ht-krow{display:flex;gap:6px;justify-content:center;}'
    + '.ht-key{font-family:var(--mono);font-size:13px;padding:13px 0;flex:1 1 0;min-width:0;max-width:44px;text-align:center;background:rgba(168,232,60,.06);border:1px solid #1c3a24;color:var(--toxic);cursor:pointer;text-transform:uppercase;user-select:none;transition:background .12s, color .12s;}'
    + '.ht-key:hover{background:rgba(168,232,60,.2);}'
    + '.ht-key:active{background:rgba(168,232,60,.35);}'
    + '.ht-key.wide{max-width:84px;font-size:10.5px;letter-spacing:.5px;}'
    + '.ht-key.correct{background:var(--toxic);color:#06170c;border-color:var(--toxic);}'
    + '.ht-key.present{background:#caa53c;color:#241a02;border-color:#caa53c;}'
    + '.ht-key.absent{background:#141f18;color:#3c4a41;border-color:#1e2b23;}'

    /* --- отказ в доступе (проигрыш = терминал закрывается) --- */
    + '.ht-crt-glass.ht-denied .ht-screen{animation:htDenyFlash .3s steps(1) 4;}'
    + '@keyframes htDenyFlash{0%,100%{background:transparent;}50%{background:rgba(198,54,38,.28);}}'
    + '.ht-denytext{position:absolute;left:0;right:0;bottom:26px;text-align:center;z-index:6;font-family:var(--mono);font-size:12px;letter-spacing:2px;color:var(--rust);text-transform:uppercase;text-shadow:0 0 10px rgba(198,54,38,.6);opacity:0;animation:htDenyIn .25s ease forwards .1s;}'
    + '@keyframes htDenyIn{to{opacity:1;}}'

    /* --- победный экран --- */
    + '.ht-win{padding:6px 0 4px;}'
    + '.ht-win .end-tag{color:var(--violet);border-color:rgba(139,107,255,0.4);}'
    + '.ht-win h3{color:var(--ink);font-size:19px;margin:8px 0 10px;}'
    + '.ht-win .cond{font-family:var(--mono);font-size:11px;color:var(--ink-dim);line-height:1.6;margin-bottom:10px;padding-bottom:10px;border-bottom:1px dashed #1c3a24;text-transform:none;letter-spacing:normal;}'
    + '.ht-win .cond b{color:var(--ink);font-weight:500;}'
    + '.ht-win p.desc{font-size:13.5px;line-height:1.7;color:var(--ink-dim);font-family:var(--body);text-transform:none;letter-spacing:normal;max-width:620px;}'
    + '.ht-btn{margin-top:18px;font-family:var(--mono);font-size:12px;letter-spacing:1.5px;text-transform:uppercase;background:var(--toxic);color:#06170c;border:none;padding:12px 20px;cursor:pointer;}'
    + '.ht-btn:hover{background:#c2f06a;}'

    /* --- красный протокол уничтожения (только после победы) --- */
    + '.ht-crt-glass.ht-redalert{box-shadow:0 40px 90px rgba(180,30,16,.55), inset 0 0 90px rgba(180,30,16,.5), inset 0 0 160px rgba(120,10,6,.5);}'
    + '.ht-redglow{position:absolute;inset:0;z-index:4;background:rgba(190,30,16,.16);opacity:0;pointer-events:none;}'
    + '.ht-crt-glass.ht-redalert .ht-redglow{opacity:1;animation:htRedPulse 1s ease-in-out infinite;}'
    + '@keyframes htRedPulse{0%,100%{opacity:.28;}50%{opacity:.85;}}'
    + '.ht-destruct{text-align:center;padding:34px 10px 10px;}'
    + '.ht-destruct .dtag{font-family:var(--mono);font-size:10.5px;letter-spacing:3px;color:var(--rust);text-transform:uppercase;opacity:.85;}'
    + '.ht-destruct h3{color:var(--rust);font-size:15px;letter-spacing:1.5px;margin:14px 0 6px;text-transform:uppercase;font-family:var(--mono);line-height:1.6;}'
    + '.ht-destruct .num{font-size:82px;font-family:var(--mono);color:var(--rust);font-weight:700;text-shadow:0 0 26px rgba(198,54,38,.8);}'
    + '.ht-destruct .num.tick{animation:htNumPulse .5s ease;}'
    + '@keyframes htNumPulse{0%{transform:scale(1.5);opacity:0;}100%{transform:scale(1);opacity:1;}}'

    + '@media (max-width:520px){.ht-overlay{padding:10px;}.ht-screen{padding:18px 14px 20px;}.ht-board{gap:5px;}.ht-row{gap:4px;}.ht-krow{gap:3px;}.ht-key{padding:9px 0;font-size:10.5px;}.ht-key.wide{font-size:8.5px;}}';

  var styleEl = document.createElement('style');
  styleEl.id = 'ht-styles';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* CSS для полноэкранного протокола уничтожения (вне модалки, поверх всего сайта) */
  var fdCss = ''
    + '#htFullDestruct{position:fixed;inset:0;z-index:4000;background:#000108;opacity:0;pointer-events:none;transition:opacity .15s ease;overflow:hidden;}'
    + '#htFullDestruct.on{opacity:1;pointer-events:all;}'
    + '#htFullDestruct .fd-crack{position:absolute;inset:0;opacity:0;width:100%;height:100%;object-fit:cover;mix-blend-mode:screen;filter:brightness(1.4) contrast(1.1);}'
    + '#htFullDestruct.crack{animation:htShatterShake .45s ease;}'
    + '#htFullDestruct.crack .fd-crack{animation:htGlassAppear .5s cubic-bezier(.2,.9,.25,1) forwards;}'
    + '#htFullDestruct .fd-flash{position:fixed;inset:0;background:#eafff0;opacity:0;transform:scale(1,1);transform-origin:50% 50%;}'
    + '#htFullDestruct.off .fd-flash{animation:htPowerOff .8s cubic-bezier(.6,0,.85,1) forwards;}'
    + '@keyframes htPowerOff{0%{opacity:0;transform:scale(1,1);}10%{opacity:1;transform:scale(1,1);}42%{opacity:1;transform:scale(1,.012);}78%{opacity:1;transform:scale(.03,.012);}100%{opacity:0;transform:scale(0,0);}}'
    + '#htFullDestruct .fd-final{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;opacity:0;transition:opacity .8s ease;}'
    + '#htFullDestruct.done .fd-final{opacity:1;}'
    + '#htFullDestruct .fd-final b{font-family:var(--mono, monospace);font-size:12px;letter-spacing:4px;color:#33473c;text-transform:uppercase;}'
    + '#htFullDestruct .fd-final span{font-family:var(--mono, monospace);font-size:10px;letter-spacing:2px;color:#233129;text-transform:uppercase;}';
  var fdStyleEl = document.createElement('style');
  fdStyleEl.id = 'ht-fd-styles';
  fdStyleEl.textContent = fdCss;
  document.head.appendChild(fdStyleEl);

  /* ---------------------------- разметка: кнопка запуска (без изменений расположения) ---------------------------- */
  var footer = document.querySelector('footer');
  if (!footer || !footer.parentNode) return;

  var section = document.createElement('section');
  section.id = 'уничтожение';
  section.className = 'ht-destroy-section';
  section.innerHTML =
    '<div class="wrap" style="text-align:center;">'
    + '<div class="kicker" style="justify-content:center;"><span class="line"></span>Финальный протокол &middot; Допуск: MONOLITH</div>'
    + '<h2 class="display">Уничтожение дела №0063</h2>'
    + '<p class="body-text" style="margin:0 auto 30px;max-width:560px;">Хранилище компромата подлежит стиранию. Взлом терминала «О-Сознания» отслеживается Compliance Control &mdash; количество попыток ограничено, на подбор пароля отведено время.</p>'
    + '<button id="htOpenBtn" type="button" class="btn btn-solid">Инициировать стирание</button>'
    + '</div>';
  footer.parentNode.insertBefore(section, footer);

  var CRACK_SVG =
    '<img class="ht-crack" src="image/steklo.png" alt="" draggable="false">';

  var overlay = document.createElement('div');
  overlay.id = 'htOverlay';
  overlay.className = 'ht-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'htTitle');
  overlay.hidden = true;
  overlay.innerHTML =
    '<div class="ht-crt">'
    + '<div class="ht-crt-glass" id="htGlass">'
    + '<div class="ht-scanlines"></div>'
    + '<div class="ht-static"></div>'
    + CRACK_SVG
    + '<div class="ht-redglow"></div>'
    + '<div class="ht-vignette"></div>'
    + '<button class="ht-close" id="htCloseBtn" aria-label="Закрыть терминал" type="button">&times;</button>'
    + '<div class="ht-screen">'
    + '<div class="ht-topbar"><span id="htTitle">ТЕРМИНАЛ «О-СОЗНАНИЕ» &middot; ВЗЛОМ ДОСТУПА</span><span class="ht-attempts" id="htAttempts"></span></div>'
    + '<div class="ht-timerwrap"><div class="ht-timerbar" id="htTimerBar"></div></div>'
    + '<div id="htBody"></div>'
    + '</div></div></div>';
  document.body.appendChild(overlay);

  /* полноэкранный слой финального уничтожения (поверх всего сайта, не только модалки) */
  var fullDestruct = document.createElement('div');
  fullDestruct.id = 'htFullDestruct';
  fullDestruct.innerHTML =
    CRACK_SVG.replace('class="ht-crack"', 'class="fd-crack"')
    + '<div class="fd-flash"></div>'
    + '<div class="fd-final"><b>Сеанс завершён</b><span>соединение с «О-Сознанием» разорвано</span></div>';
  document.body.appendChild(fullDestruct);

  /* ---------------------------- игровая логика: подбор пароля с клавиатуры ---------------------------- */
  var WORDS = ['СВОБОДА', 'МОНОЛИТ', 'ЖЕЛАНИЕ', 'ВЫБРОСЫ', 'СТРЕЛОК', 'ДОГОВОР', 'ОХОТНИК', 'ЛОВУШКА'];
  var WORD_LEN = WORDS[0].length;
  var MAX_ATTEMPTS = 5;
  var ROUND_TIME = 26000; // мс на попытку

  var KB_ROWS = [
    ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ'],
    ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'],
    ['ENTER', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', 'DEL']
  ];

  var attemptsLeft, answer, hintWords, currentRow, currentGuess, guesses, keyStatus, timerId, timerStart, state;
  var glass = overlay.querySelector('#htGlass');

  /* --- вспомогательное: оценка слова по методу Wordle с учётом повторов букв --- */
  function evaluate(guess, ans) {
    var res = new Array(guess.length).fill('absent');
    var pool = ans.split('');
    var i;
    for (i = 0; i < guess.length; i++) {
      if (guess[i] === ans[i]) { res[i] = 'correct'; pool[i] = null; }
    }
    for (i = 0; i < guess.length; i++) {
      if (res[i] === 'correct') continue;
      var idx = pool.indexOf(guess[i]);
      if (idx !== -1) { res[i] = 'present'; pool[idx] = null; }
    }
    return res;
  }

  /* --- перемешивает буквы слова, храня их правильный индекс для последующей сборки --- */
  function scrambleWord(word) {
    var letters = word.split('').map(function (ch, i) { return { ch: ch, idx: i }; });
    for (var i = letters.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = letters[i]; letters[i] = letters[j]; letters[j] = t;
    }
    var same = letters.every(function (o, i) { return o.idx === i; });
    return same ? scrambleWord(word) : letters;
  }

  /* --- когда игрок набрал слово, совпадающее с одной из подсказок, буквы встают на места (FLIP) --- */
  function revealHint(word) {
    var list = document.getElementById('htHints');
    if (!list) return;
    var li = list.querySelector('li[data-word="' + word + '"]');
    if (!li || li.classList.contains('cracked')) return;
    li.classList.add('cracked');

    var spans = Array.prototype.slice.call(li.querySelectorAll('.ht-hletter'));
    var firstRects = new Map();
    spans.forEach(function (s) { firstRects.set(s, s.getBoundingClientRect()); });

    spans.sort(function (a, b) { return (+a.getAttribute('data-idx')) - (+b.getAttribute('data-idx')); });
    spans.forEach(function (s) { li.appendChild(s); });

    spans.forEach(function (s) {
      var first = firstRects.get(s);
      var last = s.getBoundingClientRect();
      var dx = first.left - last.left;
      if (dx) {
        s.style.transition = 'none';
        s.style.transform = 'translateX(' + dx + 'px)';
      }
    });
    void li.offsetWidth;
    spans.forEach(function (s) {
      s.style.transition = 'transform .45s cubic-bezier(.2,.8,.2,1)';
      s.style.transform = '';
    });
  }

  function renderAttempts() {
    var el = document.getElementById('htAttempts');
    var html = '';
    for (var i = 0; i < MAX_ATTEMPTS; i++) {
      html += '<i class="' + (i < attemptsLeft ? 'on' : 'lost') + '"></i>';
    }
    el.innerHTML = html;
  }

  function resetTopbar() {
    document.getElementById('htAttempts').innerHTML = '';
    var bar = document.getElementById('htTimerBar');
    bar.style.width = '100%';
    bar.classList.remove('warn');
  }

  function stopTimer() {
    if (timerId) { cancelAnimationFrame(timerId); timerId = null; }
  }

  function startTimer() {
    stopTimer();
    timerStart = performance.now();
    var bar = document.getElementById('htTimerBar');
    function tick(now) {
      var elapsed = now - timerStart;
      var pct = Math.max(0, 1 - elapsed / ROUND_TIME);
      if (bar) {
        bar.style.width = (pct * 100) + '%';
        bar.classList.toggle('warn', pct < 0.35);
      }
      if (elapsed >= ROUND_TIME) { onTimeout(); return; }
      timerId = requestAnimationFrame(tick);
    }
    timerId = requestAnimationFrame(tick);
  }

  /* --- разметка игрового экрана --- */
  function renderGame() {
    var body = document.getElementById('htBody');
    var i;
    var rowsHtml = '';
    for (i = 0; i < MAX_ATTEMPTS; i++) {
      rowsHtml += '<div class="ht-row" style="grid-template-columns:repeat(' + WORD_LEN + ',1fr)" data-row="' + i + '"></div>';
    }
    var hintsHtml = hintWords.map(function (w) {
      var scrambled = scrambleWord(w);
      var lettersHtml = scrambled.map(function (o) {
        return '<span class="ht-hletter" data-idx="' + o.idx + '">' + o.ch + '</span>';
      }).join('');
      return '<li data-word="' + w + '">' + lettersHtml + '</li>';
    }).join('');
    var kbHtml = KB_ROWS.map(function (row) {
      return '<div class="ht-krow">' + row.map(function (k) {
        if (k === 'ENTER') return '<button type="button" class="ht-key wide" data-key="ENTER">ввод</button>';
        if (k === 'DEL') return '<button type="button" class="ht-key wide" data-key="DEL">&larr;</button>';
        return '<button type="button" class="ht-key" data-key="' + k + '">' + k + '</button>';
      }).join('') + '</div>';
    }).join('');

    body.innerHTML =
      '<div class="ht-game">'
      + '<div class="ht-board-col">'
      + '<div class="ht-message" id="htMsg">&nbsp;</div>'
      + '<div class="ht-board" id="htBoard">' + rowsHtml + '</div>'
      + '</div>'
      + '<div class="ht-hints-col">'
      + '<h4>Перехваченные фрагменты</h4>'
      + '<ul class="ht-hint-list" id="htHints">' + hintsHtml + '</ul>'
      + '</div>'
      + '<div class="ht-keyboard-col">'
      + '<div class="ht-keyboard" id="htKeyboard">' + kbHtml + '</div>'
      + '</div>'
      + '</div>';

    Array.prototype.forEach.call(document.querySelectorAll('#htKeyboard .ht-key'), function (btn) {
      btn.addEventListener('click', function () {
        var k = btn.getAttribute('data-key');
        if (k === 'ENTER') submitGuess();
        else if (k === 'DEL') backspace();
        else pressKey(k);
      });
    });

    renderBoard();
  }

  function setMessage(text, isError) {
    var msg = document.getElementById('htMsg');
    if (!msg) return;
    msg.textContent = text || '\u00A0';
    msg.style.color = isError ? 'var(--rust)' : 'var(--ink-dim)';
  }

  function renderBoard(flipRow) {
    for (var r = 0; r < MAX_ATTEMPTS; r++) {
      var rowEl = document.querySelector('.ht-row[data-row="' + r + '"]');
      if (!rowEl) continue;
      rowEl.innerHTML = '';
      var letters, results;
      if (r < guesses.length) { letters = guesses[r].letters; results = guesses[r].result; }
      else if (r === currentRow) { letters = currentGuess; results = null; }
      else { letters = []; results = null; }

      for (var c = 0; c < WORD_LEN; c++) {
        var tile = document.createElement('div');
        tile.className = 'ht-tile';
        var ch = letters[c];
        if (ch) {
          tile.textContent = ch;
          tile.classList.add('filled');
        }
        if (results) {
          tile.classList.add(results[c]);
          if (flipRow === r) {
            tile.classList.add('flip');
            tile.style.animationDelay = (c * 70) + 'ms';
          }
        }
        rowEl.appendChild(tile);
      }
    }
  }

  function updateKeyboardColors() {
    Array.prototype.forEach.call(document.querySelectorAll('#htKeyboard .ht-key[data-key]'), function (btn) {
      var k = btn.getAttribute('data-key');
      if (keyStatus[k]) {
        btn.classList.remove('correct', 'present', 'absent');
        btn.classList.add(keyStatus[k]);
      }
    });
  }

  function shakeCurrentRow() {
    var rowEl = document.querySelector('.ht-row[data-row="' + currentRow + '"]');
    if (!rowEl) return;
    rowEl.classList.remove('shake');
    void rowEl.offsetWidth;
    rowEl.classList.add('shake');
  }

  function pressKey(letter) {
    if (state !== 'playing') return;
    if (currentGuess.length >= WORD_LEN) return;
    currentGuess.push(letter);
    renderBoard();
  }

  function backspace() {
    if (state !== 'playing') return;
    currentGuess.pop();
    renderBoard();
  }

  function submitGuess() {
    if (state !== 'playing') return;
    if (currentGuess.length < WORD_LEN) { setMessage('НЕДОСТАТОЧНО СИМВОЛОВ', true); shakeCurrentRow(); return; }
    var word = currentGuess.join('');

    stopTimer();
    setMessage('');
    if (WORDS.indexOf(word) !== -1) revealHint(word);

    if (word === answer) {
      var winResult = new Array(WORD_LEN).fill('correct');
      guesses.push({ letters: currentGuess.slice(), result: winResult });
      winResult.forEach(function (s, i) { keyStatus[currentGuess[i]] = 'correct'; void s; });
      var flipRowIdx = currentRow;
      renderBoard(flipRowIdx);
      updateKeyboardColors();
      win();
      return;
    }

    var result = evaluate(currentGuess, answer);
    guesses.push({ letters: currentGuess.slice(), result: result });
    result.forEach(function (s, i) {
      var ch = currentGuess[i];
      var rank = { absent: 0, present: 1, correct: 2 };
      if (!keyStatus[ch] || rank[s] > rank[keyStatus[ch]]) keyStatus[ch] = s;
    });

    var thisRow = currentRow;
    renderBoard(thisRow);
    updateKeyboardColors();

    attemptsLeft--;
    renderAttempts();
    currentRow++;
    currentGuess = [];

    if (attemptsLeft <= 0) { lose(); return; }
    setTimeout(function () { renderBoard(); }, 500);
    startTimer();
  }

  function onTimeout() {
    stopTimer();
    if (state !== 'playing') return;
    setMessage('ВРЕМЯ ИСТЕКЛО — ПОПЫТКА ПОТЕРЯНА', true);
    var result = new Array(WORD_LEN).fill('absent');
    guesses.push({ letters: (currentGuess.length ? currentGuess.slice() : new Array(WORD_LEN).fill('•')), result: result });
    var thisRow = currentRow;
    renderBoard(thisRow);

    attemptsLeft--;
    renderAttempts();
    currentRow++;
    currentGuess = [];

    if (attemptsLeft <= 0) { lose(); return; }
    setTimeout(function () { renderBoard(); }, 500);
    startTimer();
  }

  /* --- проигрыш: терминал просто закрывается --- */
  function lose() {
    state = 'lost';
    stopTimer();
    glass.classList.add('ht-denied');
    var deny = document.createElement('div');
    deny.className = 'ht-denytext';
    deny.textContent = 'ДОСТУП ЗАБЛОКИРОВАН — ТЕРМИНАЛ ОТКЛЮЧАЕТСЯ';
    glass.appendChild(deny);
    setTimeout(function () {
      closeModal();
      setTimeout(function () {
        glass.classList.remove('ht-denied');
        if (deny.parentNode) deny.parentNode.removeChild(deny);
      }, 400);
    }, 1250);
  }

  /* --- победа: сперва читаем "пасхалку", разбитие терминала переносится на финал уничтожения --- */
  function win() {
    state = 'won';
    stopTimer();
    setTimeout(function () {
      var body = document.getElementById('htBody');
      body.innerHTML =
        '<div class="ht-win">'
        + '<span class="end-tag">Скрытая</span>'
        + '<div class="end-num">08</div>'
        + '<h3 class="display">Утешительный приз</h3>'
        + '<div class="cond">Условие: <b>вскрыт терминал уничтожения дела №0063</b></div>'
        + '<p class="desc">Вместо исполнения желания Меченый получает от «О-Сознания» техническую компенсацию: 1000 Playerok Coin и извинение за неудобства. Зона слегка разочарована, но признаёт, что сделка была честной. Впрочем, вскрытый терминал не прощает вмешательства &mdash; протокол самоуничтожения уже запущен.</p>'
        + '<button type="button" class="ht-btn" id="htCloseWinBtn">Закрыть терминал</button>'
        + '</div>';
      document.getElementById('htCloseWinBtn').addEventListener('click', beginDestructSequence);
    }, 650);
  }

  /* --- красный протокол уничтожения (после того как пасхалка прочитана) --- */
  function beginDestructSequence() {
    state = 'destruct';
    glass.classList.add('ht-redalert');
    var body = document.getElementById('htBody');
    var n = 5;
    body.innerHTML =
      '<div class="ht-destruct">'
      + '<div class="dtag">Протокол самоуничтожения активирован</div>'
      + '<h3>Терминал с данными будет уничтожен через</h3>'
      + '<div class="num tick" id="htCountNum">' + n + '</div>'
      + '</div>';

    var iv = setInterval(function () {
      n--;
      var numEl = document.getElementById('htCountNum');
      if (n >= 0 && numEl) {
        numEl.textContent = n;
        numEl.classList.remove('tick');
        void numEl.offsetWidth;
        numEl.classList.add('tick');
      }
      if (n <= 0) {
        clearInterval(iv);
        setTimeout(detonate, 500);
      }
    }, 1000);
  }

  function detonate() {
    glass.classList.add('ht-shattered');
    var fd = document.getElementById('htFullDestruct');
    fd.classList.add('on');
    requestAnimationFrame(function () {
      fd.classList.add('crack');
    });
    setTimeout(function () {
      fd.classList.add('off');
      try { window.close(); } catch (e) { /* большинство браузеров блокируют закрытие вкладки скриптом */ }
    }, 420);
    setTimeout(function () {
      fd.classList.add('done');
    }, 1350);
    // авто-восстановление сеанса спустя паузу — терминал можно запустить заново
    setTimeout(function () {
      overlay.classList.remove('ht-open');
      document.body.style.overflow = '';
      setTimeout(function () {
        overlay.hidden = true;
        glass.classList.remove('ht-shattered', 'ht-redalert');
        fd.classList.remove('on', 'crack', 'off', 'done');
      }, 400);
    }, 4600);
  }

  function showIntro() {
    state = 'intro';
    resetTopbar();
    var body = document.getElementById('htBody');
    body.innerHTML =
      '<div class="ht-intro">'
      + '<h3 class="display">Инструктаж</h3>'
      + '<ul>'
      + '<li>Пароль «О-Сознания» — секретное слово из ' + WORD_LEN + ' букв. Справа &mdash; 8 перехваченных фрагментов с перемешанными буквами: набор букв виден, порядок &mdash; нет.</li>'
      + '<li>Наберите любое слово нужной длины с клавиатуры (физической или экранной) и нажмите <b>ВВОД</b>. Если оно совпадёт с одним из фрагментов &mdash; его буквы встанут на свои места.</li>'
      + '<li>После каждой попытки буквы подсветятся: <b>зелёный</b> — буква на своём месте, <b class="amber">янтарный</b> — есть в пароле, но не там, тёмный — такой буквы нет.</li>'
      + '<li>На попытку отведено ' + Math.round(ROUND_TIME / 1000) + ' секунд, всего попыток — ' + MAX_ATTEMPTS + '. Не успеете или ошибётесь во всех — терминал будет отключён.</li>'
      + '</ul>'
      + '<button type="button" class="ht-btn" id="htStartBtn">Начать взлом</button>'
      + '</div>';
    document.getElementById('htStartBtn').addEventListener('click', startGame);
  }

  function startGame() {
    state = 'playing';
    attemptsLeft = MAX_ATTEMPTS;
    currentRow = 0;
    currentGuess = [];
    guesses = [];
    keyStatus = {};

    var pool = WORDS.slice();
    answer = pool[Math.floor(Math.random() * pool.length)];
    hintWords = WORDS.slice().sort(function () { return Math.random() - 0.5; });

    renderAttempts();
    renderGame();
    startTimer();
  }

  /* --- физическая клавиатура (только пока открыт модал и идёт игра) --- */
  document.addEventListener('keydown', function (e) {
    if (overlay.hidden || state !== 'playing') return;
    if (e.key === 'Enter') { e.preventDefault(); submitGuess(); return; }
    if (e.key === 'Backspace') { e.preventDefault(); backspace(); return; }
    if (/^[а-яё]$/i.test(e.key)) { pressKey(e.key.toUpperCase()); }
  });

  function openModal() {
    glass.classList.remove('ht-shattered', 'ht-denied', 'ht-redalert');
    var fd = document.getElementById('htFullDestruct');
    fd.classList.remove('on', 'crack', 'off', 'done');
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { overlay.classList.add('ht-open'); });
    showIntro();
  }

  function closeModal() {
    if (state === 'destruct') return;
    stopTimer();
    overlay.classList.remove('ht-open');
    document.body.style.overflow = '';
    setTimeout(function () { overlay.hidden = true; }, 350);
  }

  document.getElementById('htOpenBtn').addEventListener('click', openModal);
  document.getElementById('htCloseBtn').addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !overlay.hidden && state !== 'destruct') closeModal(); });

})();