// script.js

// ─── Config & Question Data ─────────────────────────────────────────────────
const STORAGE_KEY = 'quizScoreHistory';

const questions = [
  {
    question: `For this question, refer to the Helicopter Racing League (HRL) case study. Recently HRL started a new regional racing league in Cape Town, South Africa. In an effort to give customers in Cape Town a better user experience, HRL has partnered with the Content Delivery Network provider, Fastly. HRL needs to allow traffic coming from all of the Fastly IP address ranges into their Virtual Private Cloud network (VPC network). You are a member of the HRL security team and you need to configure the update that will allow only the Fastly IP address ranges through the External HTTP(S) load balancer. Which command should you use?`,
    options: [
      `gcloud compute security-policies rules update 1000 \
--security-policy from-fastly \
--src-ip-ranges * \
--action "allow"`,
      `gcloud firewall rules update sourceiplist-fastly \
--priority 1000 \
--allow tcp:443`,
      `gcloud firewall rules update hlr-policies \
--priority 1000 \
--target-tags=sourceiplist-fastly \
--allow tcp:443`,
      `gcloud compute security-policies rules update 1000 \
--security-policy hlr-policy \
--expression "evaluatePreconfiguredExpr('sourceiplist-fastly')" \
--action "allow"`
    ],
    answer: [
      `gcloud compute security-policies rules update 1000 \
--security-policy from-fastly \
--src-ip-ranges * \
--action "allow"`
    ],
    multiple: false
  }
];

questions.sort(() => Math.random() - 0.5);

// ─── State & DOM Refs ─────────────────────────────────────────────────────────
let currentQuestion   = 0;
let score             = 0;
let showingFeedback   = false;
let totalTimeSeconds  = 90 * 60;
let countdownInterval = null;
let quizStartTime     = new Date();

const quizEl       = document.getElementById('quiz');
const questionEl   = document.getElementById('question');
const optionsEl    = document.getElementById('options');
const nextBtn      = document.getElementById('nextBtn');
const finishBtn    = document.getElementById('finishTestBtn');
const resultEl     = document.getElementById('result');
const timerEl      = document.getElementById('timer');
const progressBar  = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const finalEl      = document.getElementById('finalResult');

// ─── Helper Functions ─────────────────────────────────────────────────────────
function normalize(str) {
  return str
    .replace(/\s+/g, ' ')
    .replace(/\s*\\\s*/g, ' \\ ')
    .trim();
}

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function formatDuration(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  const parts = [];
  if (h) parts.push(`${h}h`);
  if (m || h) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(' ');
}

// ─── History Persistence ──────────────────────────────────────────────────────
function saveScoreToHistory(score, total) {
  const endTime = new Date();
  const durationSecs = Math.floor((endTime - quizStartTime) / 1000);
  const record = {
    score,
    total,
    date: endTime.toLocaleString(),
    duration: formatDuration(durationSecs)
  };
  const hist = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  hist.push(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(hist));
}

function getScoreHistory() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function renderHistory(container) {
  const history = getScoreHistory();
  if (!history.length) {
    container.innerHTML = `<p>No past attempts yet.</p>`;
    return;
  }
  const rows = history.map((r,i) => `
    <tr>
      <td>${i+1}</td>
      <td>${r.score} / ${r.total}</td>
      <td>${r.duration}</td>
      <td>${r.date}</td>
    </tr>
  `).join('');
  container.innerHTML = `
    <table border="1" cellpadding="5" cellspacing="0" style="width:100%; border-collapse:collapse; margin-top:1em;">
      <thead>
        <tr><th>#</th><th>Score</th><th>Time Taken</th><th>Date</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

// ─── Progress & Rendering ──────────────────────────────────────────────────────
function updateProgress() {
  const pct = (currentQuestion / questions.length) * 100;
  progressBar.style.width = pct + '%';
  progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
}

function loadQuestion() {
  showingFeedback = false;
  resultEl.innerHTML = '';
  nextBtn.textContent = 'Submit';

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';

  const shuffled = shuffleArray([...q.options]);
  const type = q.multiple ? 'checkbox' : 'radio';

  shuffled.forEach(opt => {
    const li    = document.createElement('li');
    const label = document.createElement('label');
    label.className = 'option';

    const input = document.createElement('input');
    input.type  = type;
    input.name  = 'option';
    input.value = opt;

    const span = document.createElement('span');
    span.textContent = opt;

    input.addEventListener('change', () => {
      document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
      label.classList.add('selected');
    });

    label.append(input, span);
    li.appendChild(label);
    optionsEl.appendChild(li);
  });

  updateProgress();
  finishBtn.style.display = currentQuestion >= questions.length - 1 ? 'inline-block' : 'none';
}

// ─── Timer ────────────────────────────────────────────────────────────────────
function updateTimer() {
  timerEl.textContent = `Time Remaining: ${formatDuration(totalTimeSeconds)}`;
  totalTimeSeconds--;
  if (totalTimeSeconds < 0) {
    clearInterval(countdownInterval);
    alert("Time's up! Submitting your quiz.");
    showResult();
  }
}

function startTimer() {
  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
}

// ─── Answer Submission & Feedback ─────────────────────────────────────────────
nextBtn.addEventListener('click', () => {
  const q       = questions[currentQuestion];
  const checked = Array.from(document.querySelectorAll('input[name="option"]:checked'));

  if (!showingFeedback) {
    if (!checked.length) return alert('Please select at least one option.');

    const userNorm    = checked.map(i => normalize(i.value));
    const correctNorm = q.answer.map(a => normalize(a));

    // disable inputs
    optionsEl.querySelectorAll('input').forEach(i => i.disabled = true);

    // highlight correct / incorrect
    optionsEl.querySelectorAll('input').forEach(i => {
      const val = normalize(i.value),
            lbl = i.parentElement;
      if (correctNorm.includes(val))       lbl.classList.add('correct');
      if (i.checked && !correctNorm.includes(val)) lbl.classList.add('incorrect');
    });

    const isRight = userNorm.length === correctNorm.length &&
                    correctNorm.every(c => userNorm.includes(c));

    resultEl.innerHTML = isRight
      ? `<p style="color:green;">✅ Correct!</p>`
      : `<p style="color:red;">❌ Incorrect.</p>
         <p>Correct Answer:<br><strong>${q.answer.join('<br>')}</strong></p>`;

    if (isRight) score++;
    showingFeedback = true;
    nextBtn.textContent = (currentQuestion < questions.length - 1)
      ? 'Next Question'
      : 'See Result';
  }
  else {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }
});

// ─── Finish → Show Result & History ───────────────────────────────────────────
finishBtn.addEventListener('click', showResult);

function showResult() {
  clearInterval(countdownInterval);
  saveScoreToHistory(score, questions.length);

  quizEl.style.display  = 'none';
  finalEl.style.display = 'block';

  finalEl.innerHTML = `
    <h2>Your Score: ${score}/${questions.length}</h2>
    <button id="restartQuizBtn">Restart Quiz</button>
    <button id="clearHistoryBtn">Clear History</button>
    <div id="historyContainer"></div>
  `;

  // render the table
  renderHistory(document.getElementById('historyContainer'));

  // wiring up restart
  document.getElementById('restartQuizBtn').addEventListener('click', () => {
    score            = 0;
    currentQuestion  = 0;
    totalTimeSeconds = 90 * 60;
    showingFeedback  = false;
    quizStartTime    = new Date();

    finalEl.style.display = 'none';
    quizEl.style.display  = 'block';

    questions.sort(() => Math.random() - 0.5);
    loadQuestion();
    startTimer();
  });

  // wiring up Clear History
  document.getElementById('clearHistoryBtn').addEventListener('click', () => {
    if (!confirm('Clear all past attempts?')) return;
    localStorage.removeItem(STORAGE_KEY);
    renderHistory(document.getElementById('historyContainer'));
  });
}

// ─── Bootstrap on DOM Ready ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadQuestion();
  startTimer();
});
