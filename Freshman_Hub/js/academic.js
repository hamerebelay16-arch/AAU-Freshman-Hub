const COURSES_JSON = "../pages/courses.json";
let courses = [];

async function loadJSON(path) {
  const res = await fetch(path);
  return await res.json();
}

(async function init() {
  courses = await loadJSON(COURSES_JSON);
})();

// ================= NOTES =================
function showNotes(courseId) {
  const output = document.getElementById("output");
  output.innerHTML = "";

  const course = courses.find(c => c.id === courseId);

  if (!course || course.notes.length === 0) {
    output.innerHTML = "<p>No notes available for this course.</p>";
    return;
  }

  course.notes.forEach(note => {
    const item = document.createElement("div");
    item.className = "row";
    item.innerHTML = `
      <span>${note.title}</span>
      <a class="btn ghost" href="${note.url}" target="_blank">Open</a>
    `;
    output.appendChild(item);
  });
}

// ================= EXAMS =================
function showExams(courseId) {
  const output = document.getElementById("output");
  output.innerHTML = "";

  const course = courses.find(c => c.id === courseId);

  if (!course || course.exams.length === 0) {
    output.innerHTML = "<p>No past exams available for this course.</p>";
    return;
  }

  course.exams.forEach(exam => {
    const item = document.createElement("div");
    item.className = "row";
    item.innerHTML = `
      <span>${exam.title} (${exam.type})</span>
      <a class="btn primary" href="${exam.url}" target="_blank">Open</a>
    `;
    output.appendChild(item);
  });
}
// ================= QUIZZES =================
function showQuizzes(courseId) {
  const output = document.getElementById("output");
  output.innerHTML = "";

  const course = courses.find(c => c.id === courseId);

  if (!course || !course.quizzes || course.quizzes.length === 0) {
    output.innerHTML = "<p>No quizzes available for this course.</p>";
    return;
  }

  course.quizzes.forEach((quiz, index) => {
    const item = document.createElement("div");
    item.className = "row";
    item.innerHTML = `
      <span>${quiz.chapter}</span>
      <button class="btn primary" onclick="startQuiz('${courseId}', ${index})">
        Start Quiz
      </button>
    `;
    output.appendChild(item);
  });
}

function startQuiz(courseId, quizIndex) {
  const output = document.getElementById("output");
  output.innerHTML = "";

  const course = courses.find(c => c.id === courseId);
  const quiz = course.quizzes[quizIndex];

  let score = 0;

  quiz.questions.forEach((q, qIndex) => {
    const block = document.createElement("div");
    block.className = "quiz-block";

    block.innerHTML = `
      <p><strong>${qIndex + 1}. ${q.question}</strong></p>
      ${q.options.map((opt, i) => `
        <label>
          <input type="radio" name="q${qIndex}" value="${i}">
          ${opt}
        </label><br>
      `).join("")}
    `;

    output.appendChild(block);
  });

  const submitBtn = document.createElement("button");
  submitBtn.className = "btn primary";
  submitBtn.textContent = "Submit Quiz";

  submitBtn.onclick = () => {
    quiz.questions.forEach((q, qIndex) => {
      const selected = document.querySelector(`input[name="q${qIndex}"]:checked`);
      if (selected && parseInt(selected.value) === q.answer) {
        score++;
      }
    });

    output.innerHTML += `
      <h3>Your Score: ${score} / ${quiz.questions.length}</h3>
    `;
  };

  output.appendChild(submitBtn);
}
