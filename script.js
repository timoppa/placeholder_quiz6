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

// Shuffle questions on load
questions.sort(() => Math.random() - 0.5);

// ─── State ───────────────────────────────────────────────────────────────────
let currentQuestion = 0;
let score = 0;
let showingFeedback = false;
const quizStartTime = new Date();

// ─── DOM References ──────────────────────────────────────────────────────────
const questionEl = document.getElementById('question');
const optionsEl  = document.getElementById('options');
const nextBtn    = document.getElementById('nextBtn');
const resultEl   = document.getElementById('result');
const finishBtn  = document.getElementById('finishTestBtn');
const timerEl    = document.getElementById('timer');

// ─── Helpers ─────────────────────────────────────────────────────────────────
function normalize(str) {
  return str
    .replace(/\s+/g, ' ')
    .replace(/\s*\\\s*/g, ' \\ ')
    .trim();
}

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function updateProgress() {
  const pct = (currentQuestion / questions.length) * 100;
  document.getElementById('progressBar').style.width = `${pct}%`;
  document.getElementById('progressText').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
}

// ─── Load & Render ──────────────────────────────────────────────────────────
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
  finishBtn.style.display = currentQuestion >= questions.length - 1 ? 'block' : 'none';
}

// ─── Timer ──────────────────────────────────────────────────────────────────
let totalTime = 90 * 60;
let countdown;

function formatTime(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  const parts = [];
  if (h) parts.push(`${h}h`);
  if (m || h) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(' ');
}

function updateTimer() {
  timerEl.textContent = `Time Remaining: ${formatTime(totalTime--)}`;
  if (totalTime < 0) {
    clearInterval(countdown);
    alert("Time's up! Submitting your quiz.");
    showResult();
  }
}

function startTimer() {
  updateTimer();
  countdown = setInterval(updateTimer, 1000);
}

// ─── Submission & Feedback ─────────────────────────────────────────────────
nextBtn.addEventListener('click', () => {
  const q = questions[currentQuestion];
  const checked = Array.from(optionsEl.querySelectorAll('input[name="option"]:checked'));
  if (!showingFeedback) {
    if (!checked.length) return alert('Please select at least one option.');

    const user = checked.map(i => normalize(i.value));
    const correct = q.answer.map(a => normalize(a));

    optionsEl.querySelectorAll('input').forEach(i => i.disabled = true);
    optionsEl.querySelectorAll('input').forEach(i => {
      const val = normalize(i.value);
      const lbl = i.parentElement;
      if (correct.includes(val)) lbl.classList.add('correct');
      if (i.checked && !correct.includes(val)) lbl.classList.add('incorrect');
    });

    const right = user.length === correct.length && correct.every(a => user.includes(a));

    resultEl.innerHTML = right
      ? `<p style="color:green;">✅ Correct!</p>`
      : `<p style="color:red;">❌ Incorrect.</p><p>Correct: <strong>${q.answer.join("\n")}</strong></p>`;

    showingFeedback = true;
    nextBtn.textContent = currentQuestion < questions.length - 1 ? 'Next Question' : 'See Result';
  } else {
    currentQuestion++;
    if (currentQuestion < questions.length) loadQuestion();
    else showResult();
  }
});

// ─── Final Result ────────────────────────────────────────────────────────────
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

function saveHistory() {
  const end = new Date();
  const dur = Math.floor((end - quizStartTime) / 1000);
  const rec = { score, total: questions.length, date:end.toLocaleString(), duration:formatDuration(dur) };
  const hist = JSON.parse(localStorage.getItem('quizHistory')||'[]');
  hist.push(rec);
  localStorage.setItem('quizHistory', JSON.stringify(hist));
}

function displayHistory() {
  const hist = JSON.parse(localStorage.getItem('quizHistory')||'[]');
  if (!hist.length) return;
  const div = document.getElementById('scoreHistory');
  let html = `<h3>Score History</h3><table border="1" cellpadding="5" style="border-collapse:collapse;"><tr><th>#</th><th>Score</th><th>Dur</th><th>Date</th></tr>`;
  hist.forEach((r,i)=>html+=`<tr><td>${i+1}</td><td>${r.score}/${r.total}</td><td>${r.duration}</td><td>${r.date}</td></tr>`);
  div.innerHTML = html+'</table><hr>';
}

function showResult() {
  clearInterval(countdown);
  saveHistory();
  displayHistory();
  document.getElementById('quiz').style.display    = 'none';
  const fr = document.getElementById('finalResult');
  fr.style.display = 'block';
  fr.innerHTML = `<h2>Your Score: ${score}/${questions.length}</h2><button id="restartQuizBtn">Restart Quiz</button>`;
  document.getElementById('restartQuizBtn').addEventListener('click', () => {
    score = 0; currentQuestion = 0; showingFeedback = false; totalTime=90*60;
    document.getElementById('quiz').style.display    = 'block';
    fr.style.display = 'none';
    questions.sort(() => Math.random()-0.5);
    loadQuestion(); startTimer();
  });
}

// ─── Init ───────────────────────────────────────────────────────────────────
startTimer();
displayHistory();
loadQuestion();
