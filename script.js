const questions = [
  {
    "question": "For this question, refer to the Helicopter Racing League (HRL) case study. Your team is in charge of creating a payment card data vault for card numbers used to bill tens of thousands of viewers, merchandise consumers, and season ticket holders. You need to implement a custom card tokenization service that meets the following requirements:\n* It must provide low latency at minimal cost.\n* It must be able to identify duplicate credit cards and must not store plaintext card numbers.\n* It should support annual key rotation.\n\nWhich storage approach should you adopt for your tokenization service?",
    "options": [
      "Store the card data in Secret Manager after running a query to identify duplicates.",
      "Encrypt the card data with a deterministic algorithm stored in Firestore using Datastore mode.",
      "Encrypt the card data with a deterministic algorithm and shard it across multiple Memorystore instances.",
      "Use column-level encryption to store the data in Cloud SQL."
    ],
    "answer": [
      "Encrypt the card data with a deterministic algorithm stored in Firestore using Datastore mode."
    ],
    "multiple": false
  },
  {
    "question": "Question\nFor this question, refer to the Helicopter Racing League (HRL) case study. Recently HRL started a new regional racing league in Cape Town, South Africa. In an effort to give customers in Cape Town a better user experience, HRL has partnered with the Content Delivery Network provider, Fastly. HRL needs to allow traffic coming from all of the Fastly IP address ranges into their Virtual Private Cloud network (VPC network). You are a member of the HRL security team and you need to configure the update that will allow only the Fastly IP address ranges through the External HTTP(S) load balancer. Which command should you use?",
    "options": [
      "gcloud compute security-policies rules update 1000 \\\n-- security-policy from-fastly \\ \n-- src-ip-ranges * \\\n-- action \"allow\"",
      "gcloud firewall rules update sourceiplist-fastly \\\n-- priority 1000 \\ \n-- allow tcp:443",
      "gcloud firewall rules update hlr-policies \\\n-- priority 1000 \\ \n-- target-tags=sourceiplist-fastly \\\n-- allow tcp:443",
      "gcloud compute security-policies rules update 1000 \\\n-- security-policy hlr-policy \\ \n-- expression \"evaluatePreconfiguredExpr ('sourceiplist-fastly')\" \\\n-- action \"allow\""
    ],
    "answer": [
      "gcloud compute security-policies rules update 1000 \\\n-- security-policy from-fastly \\ \n-- src-ip-ranges * \\\n-- action \"allow\""
    ],
    "multiple": false
  },
  {
    "question": "For this question, refer to the Helicopter Racing League (HRL) case study. The HRL development team releases a new version of their predictive capability application every Tuesday evening at 3 a.m. UTC to a repository. The security team at HRL has developed an in-house penetration test Cloud Function called\nAirwolf. The security team wants to run Airwolf against the predictive capability application as soon as it is released every Tuesday. You need to set up Airwolf to run at the recurring weekly cadence. \n\nWhat should you do?",
    "options": [
      "Set up Cloud Tasks and a Cloud Storage bucket that triggers a Cloud Function.",
      "Set up a Cloud Logging sink and a Cloud Storage bucket that triggers a Cloud Function.",
      "Configure the deployment job to notify a Pub/Sub queue that triggers a Cloud Function.",
      "Set up Identity and Access Management (IAM) and Confidential Computing to trigger a Cloud Function."
    ],
    "answer": [
      "Configure the deployment job to notify a Pub/Sub queue that triggers a Cloud Function."
    ],
    "multiple": false
  },
  {
    "question": "Question\nFor this question, refer to the Helicopter Racing League (HRL) case study. HRL wants better prediction accuracy from their ML prediction models. They want you to use Google's AI Platform so HRL can understand and interpret the predictions. \n\nWhat should you do?",
    "options": [
      "Use Explainable AI.",
      "Use Vision AI.",
      "Use Google Cloud's operations suite.",
      "Use Jupyter Notebooks."
    ],
    "answer": [
      "Use Explainable AI."
    ],
    "multiple": false
  },
  {
    "question": "For this question, refer to the Helicopter Racing League (HRL) case study. HRL is looking for a cost-effective approach for storing their race data such as telemetry. They want to keep all historical records, train models using only the previous season's data, and plan for data growth in terms of volume and information collected. You need to propose a data solution. \n\nConsidering HRL business requirements and the goals expressed by CEO S. Hawke, what should you do?",
    "options": [
      "Use Firestore for its scalable and flexible document-based database. Use collections to aggregate race data by season and event.",
      "Use Cloud Spanner for its scalability and ability to version schemas with zero downtime. Split race data using season as a primary key.",
      "Use BigQuery for its scalability and ability to add columns to a schema. Partition race data based on season.",
      "Use Cloud SQL for its ability to automatically manage storage increases and compatibility with MySQL. Use separate database instances for each season."
    ],
    "answer": [
      "Use BigQuery for its scalability and ability to add columns to a schema. Partition race data based on season."
    ],
    "multiple": false
  },
  {
    "question": "For this question, refer to the Helicopter Racing League (HRL) case study. A recent finance audit of cloud infrastructure noted an exceptionally high number of\nCompute Engine instances are allocated to do video encoding and transcoding. You suspect that these Virtual Machines are zombie machines that were not deleted after their workloads completed. You need to quickly get a list of which VM instances are idle. \n\nWhat should you do?",
    "options": [
      "Log into each Compute Engine instance and collect disk, CPU, memory, and network usage statistics for analysis.",
      "Use the gcloud compute instances list to list the virtual machine instances that have the idle: true label set.",
      "Use the gcloud recommender command to list the idle virtual machine instances.",
      "From the Google Console, identify which Compute Engine instances in the managed instance groups are no longer responding to health check probes."
    ],
    "answer": [
      "Use the gcloud recommender command to list the idle virtual machine instances."
    ],
    "multiple": false
  },
];

questions.sort(() => Math.random() - 0.5);


let currentQuestion = 0;
let score = 0;
let showingFeedback = false;
let quizStartTime = new Date();

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const finishBtn = document.getElementById('finishTestBtn');






function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function updateProgress() {
  const progressPercent = ((currentQuestion) / questions.length) * 100;
  document.getElementById('progressBar').style.width = `${progressPercent}%`;
  document.getElementById('progressText').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
}

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  const shuffledOptions = shuffleArray([...q.options]);
  
  const inputType = q.multiple ? "checkbox" : "radio";

    shuffledOptions.forEach(option => {
      const li = document.createElement("li");
      li.innerHTML = `
        <label class="option">
          <input type="${inputType}" name="option" value="${option}">
          <span>${option}</span>
        </label>`;
      optionsEl.appendChild(li);
    });

  // ✅ Now add the `.selected` logic AFTER options are rendered
  optionsEl.querySelectorAll("input[type='radio']").forEach(input => {
    input.addEventListener('change', () => {
      document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
      input.parentElement.classList.add('selected');
    });
  });

  resultEl.innerHTML = "";
  nextBtn.textContent = "Submit";
  showingFeedback = false;
  updateProgress();

  if (currentQuestion === questions.length - 1) {
    finishBtn.style.display = "block";
  } else {
    finishBtn.style.display = "none";
  }

    if (currentQuestion >= 1) {
      finishBtn.style.display = "block";
    } else {
      finishBtn.style.display = "none";
    }
}


let totalTimeInSeconds = 90 * 60; // 1 hour 30 minutes = 5400 seconds
const timerEl = document.getElementById("timer");

function updateTimerDisplay() {
  const hours = Math.floor(totalTimeInSeconds / 3600);
  const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
  const seconds = totalTimeInSeconds % 60;

  let timeParts = [];

  if (hours > 0) timeParts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
  if (minutes > 0 || hours > 0) timeParts.push(`${minutes} min${minutes !== 1 ? 's' : ''}`);
  timeParts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);

  timerEl.textContent = `Time Remaining: ${timeParts.join(', ')}`;
}


function startTimer() {
  countdownInterval = setInterval(() => {
    totalTimeInSeconds--;
    updateTimerDisplay();

    if (totalTimeInSeconds <= 0) {
      clearInterval(countdownInterval);
      alert("Time's up! Submitting your quiz.");
      showResult();
    }
  }, 1000);
}



let countdownInterval = setInterval(() => {
  totalTimeInSeconds--;
  updateTimerDisplay();

  if (totalTimeInSeconds <= 0) {
    clearInterval(countdownInterval);
    alert("Time's up! Submitting your quiz.");
    showResult();
  }
}, 1000);

updateTimerDisplay(); // show initial value


// normalising the string
function normalize(str) {
  return str
    .replace(/\\/g, '')     // remove all backslashes
    .replace(/\s+/g, ' ')   // collapse all whitespace/newlines into single spaces
    .trim();                // trim leading/trailing spaces
}


nextBtn.addEventListener("click", () => {
  const currentQ = questions[currentQuestion];
  const selectedInputs = Array.from(
    document.querySelectorAll("input[name='option']:checked")
  );

  if (!showingFeedback) {
    if (selectedInputs.length === 0) return alert("Please select at least one option.");

    // build two normalized arrays
    const selectedNorm = selectedInputs.map(i => normalize(i.value));
    const correctNorm = currentQ.answer.map(a => normalize(a));
    
    // compare lengths + every correct answer appears in selectedNorm
    const isCorrect = 
      selectedNorm.length === correctNorm.length &&
      correctNorm.every(ans => selectedNorm.includes(ans));


    optionsEl.querySelectorAll('input').forEach(input => {
      const valNorm = normalize(input.value);
      const lbl     = input.parentElement;
      if (correctNorm.includes(valNorm))      lbl.classList.add('correct');
      else if (input.checked && !correctNorm.includes(valNorm))
                                             lbl.classList.add('incorrect');
    });

    

    // Disable all inputs
    document.querySelectorAll("input[name='option']").forEach(input => input.disabled = true);

    // Highlight correct and incorrect
    document.querySelectorAll("input[name='option']").forEach(input => {
      const parentLabel = input.parentElement;
      if (correctAnswers.includes(input.value)) {
        parentLabel.classList.add("correct");
      }
      if (input.checked && !correctAnswers.includes(input.value)) {
        parentLabel.classList.add("incorrect");
      }
    });

    // Feedback
    if (isCorrect) {
      score++;
      resultEl.innerHTML = `<p style="color: green;">✅ Correct!</p>`;
    } else {
      resultEl.innerHTML = `<p style="color: red;">❌ Incorrect.</p>
                            <p>Correct Answer: <strong>${correctAnswers.join(", ")}</strong></p>`;
    }

    nextBtn.textContent = currentQuestion < questions.length - 1 ? "Next Question" : "See Result";
    showingFeedback = true;

  } else {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }
});

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const parts = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0 || h > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);

  return parts.join(' ');
}


// Save score to history in localStorage
function saveScoreToHistory(score, total) {
  const endTime = new Date();
  const durationInSeconds = Math.floor((endTime - quizStartTime) / 1000);
  const duration = formatDuration(durationInSeconds);

  const scoreRecord = {
    score,
    total,
    date: endTime.toLocaleString(),
    duration
  };

  let history = JSON.parse(localStorage.getItem('quizScoreHistory')) || [];
  history.push(scoreRecord);
  localStorage.setItem('quizScoreHistory', JSON.stringify(history));
}

// Show full history above quiz
function displayScoreHistory() {
  const container = document.querySelector(".container");
  let history = JSON.parse(localStorage.getItem('quizScoreHistory')) || [];

  // Remove existing history display if any
  const existingHistory = document.getElementById('scoreHistory');
  if (existingHistory) existingHistory.remove();

  if (history.length === 0) return;

  // Create history table
  const historyDiv = document.createElement('div');
  historyDiv.id = 'scoreHistory';
  historyDiv.innerHTML = `
    <h3>Score History</h3>
    <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th>#</th>
          <th>Score</th>
          <th>Time Taken</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        ${history.map((item, idx) => `
          <tr>
            <td>${idx + 1}</td>
            <td>${item.score} / ${item.total}</td>
            <td>${item.duration || '-'}</td>
            <td>${item.date}</td>
          </tr>`).join('')}
      </tbody>
    </table>
    <button id="clearHistoryBtn" style="margin-top: 10px;">Clear History</button>
    <hr>
  `;

  container.insertBefore(historyDiv, document.getElementById("quiz"));

  // Add clear history button event listener
  document.getElementById('clearHistoryBtn').addEventListener('click', () => {
    if (confirm("Are you sure you want to clear your score history?")) {
      localStorage.removeItem('quizScoreHistory');
      displayScoreHistory(); // Remove history display
    }
  });
}

// Updated showResult to save score and show history
function showResult() {
  saveScoreToHistory(score, questions.length);
  document.getElementById("quiz").style.display = "none";
  document.getElementById("finalResult").style.display = "block";
  document.getElementById("finalResult").innerHTML = `
      <h2>Your Score: ${score}/${questions.length}</h2>
      <button id="restartQuizBtn" style="margin-top: 16px;">Restart Quiz</button>
`;
  finishBtn.style.display = "none";

  displayScoreHistory();

  // ✅ Restart logic with timer reset
  document.getElementById("restartQuizBtn").addEventListener("click", () => {
    // Reset quiz state
    score = 0;
    currentQuestion = 0;
    showingFeedback = false;
    quizStartTime = new Date();

    // Reset timer
    clearInterval(countdownInterval);
    totalTimeInSeconds = 90 * 60; // 1 hour 30 minutes
    updateTimerDisplay();
    startTimer(); // start a new countdown

    // Re-shuffle and reload quiz
    questions.sort(() => Math.random() - 0.5);
    document.getElementById("quiz").style.display = "block";
    document.getElementById("finalResult").style.display = "none";
    loadQuestion();
});
  });
}

// Initial call to show history on page load
// displayScoreHistory(); 

finishBtn.style.display = "none"; // start hidden

startTimer();

// Initial call to load first question
loadQuestion();
