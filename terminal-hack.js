
(function () {
  'use strict';

  /* ---------------------------- стили ---------------------------- */
  var css = ''
    + '.ht-destroy-section{border-top:1px solid var(--hairline);padding:80px 0 96px;}'
    + '.ht-overlay{position:fixed;inset:0;z-index:2000;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(3,4,2,0.86);backdrop-filter:blur(3px);opacity:0;visibility:hidden;transition:opacity .35s ease, visibility .35s ease;}'
    + '.ht-overlay.ht-open{opacity:1;visibility:visible;}'
    + '.ht-crt{width:100%;max-width:640px;}'
    + '.ht-crt-glass{position:relative;background:#03130b;border:1px solid #1c3a24;border-radius:26px;box-shadow:0 40px 90px rgba(0,0,0,0.6), inset 0 0 60px rgba(0,0,0,0.75), inset 0 0 140px rgba(0,0,0,0.55);overflow:hidden;transform:scaleY(.05);filter:brightness(3) saturate(0);animation:htPowerOn .8s cubic-bezier(.2,1,.3,1) forwards;}'
    + '@keyframes htPowerOn{0%{transform:scaleY(.05);filter:brightness(3) saturate(0);}18%{transform:scaleY(1);filter:brightness(2.2) saturate(.4);}32%{transform:scaleY(.94);filter:brightness(.55);}50%{transform:scaleY(1.01);}70%{filter:brightness(1.25);}100%{transform:scaleY(1);filter:brightness(1) saturate(1);}}'
    + '.ht-crt-glass.ht-shattered{animation:htShatterShake .5s ease;}'
    + '@keyframes htShatterShake{0%{transform:translate(0,0);filter:brightness(1) saturate(1);}20%{transform:translate(-6px,2px);filter:brightness(2.2) saturate(0);}40%{transform:translate(6px,-2px);filter:brightness(.15);}60%{transform:translate(-4px,1px);filter:brightness(1.4);}80%{transform:translate(2px,-1px);filter:brightness(.4);}100%{transform:translate(0,0);filter:brightness(.55) saturate(.3);}}'
    + '.ht-scanlines{position:absolute;inset:0;pointer-events:none;z-index:3;background:repeating-linear-gradient(to bottom, rgba(168,232,60,0.07) 0px, rgba(168,232,60,0.07) 1px, transparent 2px, transparent 4px);mix-blend-mode:overlay;animation:htInterlace .15s steps(1) infinite;}'
    + '@keyframes htInterlace{0%,100%{opacity:.5;}50%{opacity:1;}}'
    + '.ht-static{position:absolute;inset:0;pointer-events:none;z-index:2;opacity:.05;background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E");animation:htHiss 6s steps(10) infinite;}'
    + '@keyframes htHiss{0%,100%{opacity:.04;}45%{opacity:.09;}70%{opacity:.03;}}'
    + '.ht-vignette{position:absolute;inset:0;pointer-events:none;z-index:4;box-shadow:inset 0 0 120px rgba(0,0,0,0.85);background:radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%);}'
    + '.ht-crack{position:absolute;inset:0;z-index:5;opacity:0;pointer-events:none;transition:opacity .5s ease;}'
    + '.ht-crt-glass.ht-shattered .ht-crack{opacity:1;}'
    + '.ht-close{position:absolute;top:14px;right:16px;z-index:6;background:none;border:none;color:var(--toxic);font-size:22px;line-height:1;cursor:pointer;opacity:.8;font-family:var(--mono);}'
    + '.ht-close:hover{opacity:1;text-shadow:0 0 8px var(--toxic);}'
    + '.ht-screen{position:relative;z-index:1;padding:30px 26px 26px;font-family:var(--mono);color:var(--toxic);}'
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
    + '.ht-intro ul{list-style:none;margin-bottom:20px;}'
    + '.ht-intro li{font-size:12.5px;line-height:1.7;color:var(--ink-dim);font-family:var(--body);text-transform:none;letter-spacing:normal;padding:6px 0 6px 18px;position:relative;}'
    + '.ht-intro li::before{content:"—";position:absolute;left:0;color:var(--toxic);}'
    + '.ht-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:18px;}'
    + '.ht-word{font-family:var(--mono);font-size:13px;letter-spacing:1.5px;text-align:left;background:rgba(168,232,60,0.05);border:1px solid #1c3a24;color:var(--toxic);padding:10px 12px;cursor:pointer;text-transform:uppercase;transition:all .12s;}'
    + '.ht-word:hover:not(:disabled){background:rgba(168,232,60,0.15);border-color:var(--toxic);}'
    + '.ht-word:disabled{opacity:.45;cursor:default;}'
    + '.ht-word .m{display:block;font-size:10px;color:var(--ink-dim);margin-top:4px;letter-spacing:1px;}'
    + '.ht-log{font-size:11.5px;line-height:1.8;max-height:150px;overflow-y:auto;color:#7fb52c;}'
    + '.ht-log .l{opacity:0;animation:htLineIn .2s ease forwards;white-space:pre-wrap;}'
    + '@keyframes htLineIn{to{opacity:1;}}'
    + '.ht-log .l.bad{color:var(--rust);}'
    + '.ht-log .l.good{color:var(--toxic);font-weight:700;}'
    + '.ht-lock{text-align:center;padding:20px 0 4px;}'
    + '.ht-lock h3{color:var(--rust);font-size:18px;margin-bottom:10px;}'
    + '.ht-lock p{font-size:12.5px;color:var(--ink-dim);margin-bottom:18px;font-family:var(--body);text-transform:none;letter-spacing:normal;}'
    + '.ht-win{padding:6px 0 4px;}'
    + '.ht-win .end-tag{color:var(--violet);border-color:rgba(139,107,255,0.4);}'
    + '.ht-win h3{color:var(--ink);font-size:19px;margin:8px 0 10px;}'
    + '.ht-win .cond{font-family:var(--mono);font-size:11px;color:var(--ink-dim);line-height:1.6;margin-bottom:10px;padding-bottom:10px;border-bottom:1px dashed #1c3a24;text-transform:none;letter-spacing:normal;}'
    + '.ht-win .cond b{color:var(--ink);font-weight:500;}'
    + '.ht-win p.desc{font-size:13.5px;line-height:1.7;color:var(--ink-dim);font-family:var(--body);text-transform:none;letter-spacing:normal;}'
    + '.ht-btn{margin-top:18px;font-family:var(--mono);font-size:12px;letter-spacing:1.5px;text-transform:uppercase;background:var(--toxic);color:#06170c;border:none;padding:12px 20px;cursor:pointer;}'
    + '.ht-btn:hover{background:#c2f06a;}'
    + '@media (max-width:520px){.ht-grid{grid-template-columns:1fr;}}';

  var styleEl = document.createElement('style');
  styleEl.id = 'ht-styles';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ---------------------------- разметка ---------------------------- */
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
    '<svg class="ht-crack" viewBox="0 0 640 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">'
    + '<g stroke="rgba(230,240,220,0.55)" stroke-width="1.4" fill="none">'
    + '<path d="M320 190 L260 60 M320 190 L210 110 M320 190 L120 170 M320 190 L60 260"/>'
    + '<path d="M320 190 L420 40 M320 190 L520 120 M320 190 L580 220 M320 190 L470 320"/>'
    + '<path d="M320 190 L300 380 M320 190 L200 340 M320 190 L150 260"/>'
    + '<path d="M260 60 L230 20 M210 110 L140 80 M120 170 L40 150 M60 260 L20 320"/>'
    + '<path d="M420 40 L460 10 M520 120 L600 90 M580 220 L620 260 M470 320 L520 380"/>'
    + '</g>'
    + '<circle cx="320" cy="190" r="5" fill="rgba(230,240,220,0.5)"/>'
    + '</svg>';

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
    + '<div class="ht-vignette"></div>'
    + '<button class="ht-close" id="htCloseBtn" aria-label="Закрыть терминал" type="button">&times;</button>'
    + '<div class="ht-screen">'
    + '<div class="ht-topbar"><span id="htTitle">ТЕРМИНАЛ «О-СОЗНАНИЕ» &middot; ВЗЛОМ ДОСТУПА</span><span class="ht-attempts" id="htAttempts"></span></div>'
    + '<div class="ht-timerwrap"><div class="ht-timerbar" id="htTimerBar"></div></div>'
    + '<div id="htBody"></div>'
    + '</div></div></div>';
  document.body.appendChild(overlay);

  /* ---------------------------- игровая логика ---------------------------- */
  var WORDS = ['СВОБОДА', 'МОНОЛИТ', 'ЖЕЛАНИЕ', 'ВЫБРОСЫ', 'СТРЕЛОК', 'ДОГОВОР', 'ОХОТНИК', 'ЛОВУШКА'];
  var MAX_ATTEMPTS = 4;
  var ROUND_TIME = 12000; // мс на попытку

  var attemptsLeft, answer, candidates, timerId, timerStart, state;
  var glass = overlay.querySelector('#htGlass');

  function matchCount(a, b) {
    var n = 0;
    for (var i = 0; i < a.length; i++) { if (a[i] === b[i]) n++; }
    return n;
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

  function log(text, cls) {
    var logEl = document.getElementById('htLog');
    if (!logEl) return;
    var div = document.createElement('div');
    div.className = 'l' + (cls ? ' ' + cls : '');
    div.textContent = text;
    logEl.appendChild(div);
    logEl.scrollTop = logEl.scrollHeight;
  }

  function renderGrid() {
    var body = document.getElementById('htBody');
    body.innerHTML = '<div class="ht-grid" id="htGrid"></div><div class="ht-log" id="htLog"></div>';
    var grid = document.getElementById('htGrid');
    candidates.forEach(function (w) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ht-word';
      btn.textContent = w;
      btn.addEventListener('click', function () { onGuess(w, btn); });
      grid.appendChild(btn);
    });
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

  function onTimeout() {
    stopTimer();
    if (state !== 'playing') return;
    attemptsLeft--;
    renderAttempts();
    log('> ВРЕМЯ ИСТЕКЛО — ПОПЫТКА ПОТЕРЯНА', 'bad');
    if (attemptsLeft <= 0) { lockOut(); return; }
    startTimer();
  }

  function onGuess(word, btn) {
    if (state !== 'playing') return;
    stopTimer();
    btn.disabled = true;
    if (word === answer) { win(); return; }
    var m = matchCount(word, answer);
    var span = document.createElement('span');
    span.className = 'm';
    span.textContent = 'совпадений: ' + m + '/' + answer.length;
    btn.appendChild(span);
    attemptsLeft--;
    renderAttempts();
    log('> ' + word + ' — доступ отклонён', 'bad');
    if (attemptsLeft <= 0) { lockOut(); return; }
    startTimer();
  }

  function lockOut() {
    state = 'locked';
    stopTimer();
    glass.classList.add('ht-shattered');
    setTimeout(function () {
      var body = document.getElementById('htBody');
      body.innerHTML =
        '<div class="ht-lock">'
        + '<h3 class="display">Терминал разбит</h3>'
        + '<p>Экран пошёл трещинами — соединение с «О-Сознанием» разорвано.</p>'
        + '<button type="button" class="ht-btn" id="htRetryBtn">Восстановить соединение</button>'
        + '</div>';
      document.getElementById('htRetryBtn').addEventListener('click', function () {
        glass.classList.remove('ht-shattered');
        startGame();
      });
    }, 550);
  }

  function win() {
    state = 'won';
    stopTimer();
    log('> ' + answer + ' — доступ разрешён', 'good');
    var body = document.getElementById('htBody');
    setTimeout(function () {
      body.innerHTML =
        '<div class="ht-win">'
        + '<span class="end-tag">Скрытая</span>'
        + '<div class="end-num">08</div>'
        + '<h3 class="display">Утешительный приз</h3>'
        + '<div class="cond">Условие: <b>вскрыт терминал уничтожения дела №0063</b></div>'
        + '<p class="desc">Вместо исполнения желания Меченый получает от «О-Сознания» техническую компенсацию: 1000 Playerok Coin и извинение за неудобства. Зона слегка разочарована, но признаёт, что сделка была честной.</p>'
        + '<button type="button" class="ht-btn" id="htCloseWinBtn">Закрыть терминал</button>'
        + '</div>';
      document.getElementById('htCloseWinBtn').addEventListener('click', closeModal);
    }, 500);
  }

  function showIntro() {
    state = 'intro';
    resetTopbar();
    var body = document.getElementById('htBody');
    body.innerHTML =
      '<div class="ht-intro">'
      + '<h3 class="display">Инструктаж</h3>'
      + '<ul>'
      + '<li>Среди 8 слов на экране спрятан пароль «О-Сознания» — они одинаковой длины.</li>'
      + '<li>После каждого клика терминал покажет, сколько букв совпало с паролем на своих местах — по этому подбирайте следующее слово.</li>'
      + '<li>На попытку отведено 12 секунд, всего попыток — 4.</li>'
      + '<li>Не успеете или ошибётесь во всех попытках — терминал будет разбит.</li>'
      + '</ul>'
      + '<button type="button" class="ht-btn" id="htStartBtn">Начать взлом</button>'
      + '</div>';
    document.getElementById('htStartBtn').addEventListener('click', startGame);
  }

  function startGame() {
    state = 'playing';
    attemptsLeft = MAX_ATTEMPTS;
    var pool = WORDS.slice();
    answer = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
    candidates = pool.sort(function () { return Math.random() - 0.5; });
    candidates.splice(Math.floor(Math.random() * (candidates.length + 1)), 0, answer);
    renderAttempts();
    renderGrid();
    startTimer();
  }

  function openModal() {
    glass.classList.remove('ht-shattered');
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { overlay.classList.add('ht-open'); });
    showIntro();
  }

  function closeModal() {
    stopTimer();
    overlay.classList.remove('ht-open');
    document.body.style.overflow = '';
    setTimeout(function () { overlay.hidden = true; }, 350);
  }

  document.getElementById('htOpenBtn').addEventListener('click', openModal);
  document.getElementById('htCloseBtn').addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !overlay.hidden) closeModal(); });

})();