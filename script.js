const questions = [
    {
    "question": "Your company has decided to make a major revision of their API in order to create better experiences for their developers. They need to keep the old version of the API available and deployable, while allowing new customers and testers to try out the new API. They want to keep the same SSL and DNS records in place to serve both APIs.\n\nWhat should they do?",
    "options": [
      "Configure a new load balancer for the new version of the API",
      "Reconfigure old clients to use a new endpoint for the new API",
      "Have the old API forward traffic to the new API based on the path",
      "Use separate backend pools for each API path behind the load balancer"
    ],
    "answer": [
      "Use separate backend pools for each API path behind the load balancer"
    ],
    "multiple": false
  },
  {
    "question": "Your company plans to migrate a multi-petabyte data set to the cloud. The data set must be available 24hrs a day. Your business analysts have experience only with using a SQL interface.\n\nHow should you store the data to optimize it for ease of analysis?",
    "options": [
      "Load data into Google BigQuery",
      "Insert data into Google Cloud SQL",
      "Put flat files into Google Cloud Storage",
      "Stream data into Google Cloud Datastore"
    ],
    "answer": [
      "Load data into Google BigQuery"
    ],
    "multiple": false
  },
  {
    "question": "The operations manager asks you for a list of recommended practices that she should consider when migrating a J2EE application to the cloud.\n\nWhich three practices should you recommend? (Choose three.)",
    "options": [
      "Port the application code to run on Google App Engine",
      "Integrate Cloud Dataflow into the application to capture real-time metrics",
      "Instrument the application with a monitoring tool like Stackdriver Debugger",
      "Select an automation framework to reliably provision the cloud infrastructure",
      "Deploy a continuous integration tool with automated testing in a staging environment",
      "Migrate from MySQL to a managed NoSQL database like Google Cloud Datastore or Bigtable"
    ],
    "answer": [
      "Instrument the application with a monitoring tool like Stackdriver Debugger",
      "Select an automation framework to reliably provision the cloud infrastructure",
      "Deploy a continuous integration tool with automated testing in a staging environment"
    ],
    "multiple": true
  },
  {
    "question": "A news feed web service has the following code running on Google App Engine. During peak load, users report that they can see news articles they already viewed.\n\nWhat is the most likely cause of this problem?\n\nhttps://www.examtopics.com/assets/media/exam-media/04339/0007100001.png",
    "options": [
      "The session variable is local to just a single instance",
      "The session variable is being overwritten in Cloud Datastore",
      "The URL of the API needs to be modified to prevent caching",
      "The HTTP Expires header needs to be set to -1 stop caching"
    ],
    "answer": [
      "The session variable is local to just a single instance"
    ],
    "multiple": false
  },
  {
    "question": "An application development team believes their current logging tool will not meet their needs for their new cloud-based product. They want a better tool to capture errors and help them analyze their historical log data. You want to help them find a solution that meets their needs.\n\nWhat should you do?",
    "options": [
      "Direct them to download and install the Google StackDriver logging agent",
      "Send them a list of online resources about logging best practices",
      "Help them define their requirements and assess viable logging tools",
      "Help them upgrade their current tool to take advantage of any new features"
    ],
    "answer": [
      "Direct them to download and install the Google StackDriver logging agent"
    ],
    "multiple": false
  },
  {
    "question": "You need to reduce the number of unplanned rollbacks of erroneous production deployments in your company's web hosting platform. Improvement to the QA/Test processes accomplished an 80% reduction.\n\nWhich additional two approaches can you take to further reduce the rollbacks? (Choose two.)",
    "options": [
      "Introduce a green-blue deployment model",
      "Replace the QA environment with canary releases",
      "Fragment the monolithic platform into microservices",
      "Reduce the platform's dependency on relational database systems",
      "Replace the platform's relational database systems with a NoSQL database"
    ],
    "answer": [
      "Introduce a green-blue deployment model",
      "Fragment the monolithic platform into microservices"
    ],
    "multiple": true
  },
  {
    "question": "To reduce costs, the Director of Engineering has required all developers to move their development infrastructure resources from on-premises virtual machines (VMs) to Google Cloud Platform. These resources go through multiple start/stop events during the day and require state to persist. You have been asked to design the process of running a development environment in Google Cloud while providing cost visibility to the finance department.\n\nWhich two steps should you take? (Choose two.)",
    "options": [
      "Use the - -no-auto-delete flag on all persistent disks and stop the VM",
      "Use the - -auto-delete flag on all persistent disks and terminate the VM",
      "Apply VM CPU utilization label and include it in the BigQuery billing export",
      "Use Google BigQuery billing export and labels to associate cost to groups",
      "Store all state into local SSD, snapshot the persistent disks, and terminate the VM",
      "Store all state in Google Cloud Storage, snapshot the persistent disks, and terminate the VM"
    ],
    "answer": [
      "Use the - -no-auto-delete flag on all persistent disks and stop the VM",
      "Use Google BigQuery billing export and labels to associate cost to groups"
    ],
    "multiple": true
  },
  {
    "question": "Your company wants to track whether someone is present in a meeting room reserved for a scheduled meeting. There are 1000 meeting rooms across 5 offices on 3 continents. Each room is equipped with a motion sensor that reports its status every second. The data from the motion detector includes only a sensor ID and several different discrete items of information. Analysts will use this data, together with information about account owners and office locations.\n\nWhich database type should you use?",
    "options": [
      "Flat file",
      "NoSQL",
      "Relational",
      "Blobstore"
    ],
    "answer": [
      "NoSQL"
    ],
    "multiple": false
  },
  {
    "question": "You set up an autoscaling instance group to serve web traffic for an upcoming launch. After configuring the instance group as a backend service to an HTTP(S) load balancer, you notice that virtual machine (VM) instances are being terminated and re-launched every minute. The instances do not have a public IP address.\n\nYou have verified the appropriate web response is coming from each instance using the curl command. You want to ensure the backend is configured correctly.\n\nWhat should you do?",
    "options": [
      "Ensure that a firewall rules exists to allow source traffic on HTTP/HTTPS to reach the load balancer.",
      "Assign a public IP to each instance and configure a firewall rule to allow the load balancer to reach the instance public IP.",
      "Ensure that a firewall rule exists to allow load balancer health checks to reach the instances in the instance group.",
      "Create a tag on each instance with the name of the load balancer. Configure a firewall rule with the name of the load balancer as the source and the instance tag as the destination."
    ],
    "answer": [
      "Ensure that a firewall rule exists to allow load balancer health checks to reach the instances in the instance group."
    ],
    "multiple": false
  },
  {
    "question": "You write a Python script to connect to Google BigQuery from a Google Compute Engine virtual machine. The script is printing errors that it cannot connect to\nBigQuery.\n\nWhat should you do to fix the script?",
    "options": [
      "Install the latest BigQuery API client library for Python",
      "Run your script on a new virtual machine with the BigQuery access scope enabled",
      "Create a new service account with BigQuery access and execute your script with that user",
      "Install the bq component for gcloud with the command gcloud components install bq."
    ],
    "answer": [
      "Create a new service account with BigQuery access and execute your script with that user"
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
  document.getElementById('progressText').textContent = `Question ${currentQuestion + 1}`;
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



nextBtn.addEventListener("click", () => {
  const currentQ = questions[currentQuestion];
  const selectedInputs = Array.from(document.querySelectorAll("input[name='option']:checked"));
  const correctAnswers = currentQ.answer;

  if (!showingFeedback) {
    if (selectedInputs.length === 0) return alert("Please select at least one option.");

    const selectedValues = selectedInputs.map(input => input.value);
    const isCorrect = correctAnswers.length === selectedValues.length &&
                      correctAnswers.every(ans => selectedValues.includes(ans));

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
}

// Initial call to show history on page load
// displayScoreHistory(); 

finishBtn.style.display = "none"; // start hidden

startTimer();

// Initial call to load first question
loadQuestion();
