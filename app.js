// 1. Tab & Page Navigation
function switchPage(pageId) {
  document.querySelectorAll('.page').forEach((page) => {
    page.classList.remove('active');
  });
  document.querySelectorAll('nav button').forEach((btn) => {
    btn.classList.remove('active');
  });

  const targetPage = document.getElementById(pageId);
  const targetNav = document.getElementById('nav-' + pageId);
  if (targetPage) targetPage.classList.add('active');
  if (targetNav) targetNav.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 2. Interactive URL vs Search Analyzer
function analyzeQuery() {
  const input = document.getElementById('input-query').value.trim();
  const output = document.getElementById('sim-output');

  if (!input) {
    output.textContent = 'Type above to see how a smartphone browser interprets it.';
    output.style.color = '#38bdf8';
    return;
  }

  const isUrl = input.includes('.com') || input.includes('.in') || input.includes('.org') || input.includes('.gov') || input.startsWith('http');

  if (isUrl) {
    output.innerHTML = `🌐 <strong>Direct Website Address (URL):</strong> The browser will take you directly to this domain. Always ensure it has <code>https://</code> for safety.`;
    output.style.color = '#34d399';
  } else {
    output.innerHTML = `🔍 <strong>Search Query:</strong> The browser will ask Google/Bing to find pages related to "${input}". Look for verified, non-ad results!`;
    output.style.color = '#f59e0b';
  }
}

// 3. Checklist Progress Tracker
function updateChecklist() {
  const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
  let checked = 0;
  checkboxes.forEach((cb) => {
    if (cb.checked) checked++;
  });
  const percent = Math.round((checked / checkboxes.length) * 100);
  document.getElementById('progress-val').textContent = percent + '%';
  document.getElementById('progress-bar').style.width = percent + '%';
}

// 4. Interactive Quiz Logic
function checkQuiz(qNum, isCorrect, btn) {
  const ansBox = document.getElementById('ans' + qNum);
  const parent = btn.parentElement;
  parent.querySelectorAll('button').forEach((b) => b.disabled = true);

  if (isCorrect) {
    btn.style.background = '#15803d';
    btn.style.borderColor = '#22c55e';
    ansBox.textContent = '✅ Bilkul Sahi! You identified the safe digital choice.';
    ansBox.style.color = '#22c55e';
  } else {
    btn.style.background = '#b91c1c';
    btn.style.borderColor = '#ef4444';
    ansBox.textContent = '❌ Galat! This action can lead to financial fraud or virus download.';
    ansBox.style.color = '#ef4444';
  }
}

// 5. Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then((reg) => console.log('DigiShiksha ServiceWorker Active:', reg.scope))
      .catch((err) => console.error('SW Error:', err));
  });
}