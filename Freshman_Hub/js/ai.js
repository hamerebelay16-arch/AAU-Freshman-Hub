// ai.js — AI Copilot (Demo) using external API (e.g., Google Gemini)
// For demo purposes only. Insert your API key below.
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE"; // replace for demo
const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

async function generateQuizWithAI(course, topic) {
  const prompt = `Create 5 multiple-choice questions for ${course} on the topic "${topic}".
Return JSON with this exact schema:
{
  "questions":[
    {"q":"...", "options":["A","B","C","D"], "answerIndex":0, "explanation":"..."}
  ]
}
Keep language simple for freshmen.`;

  const res = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!res.ok) {
    throw new Error("AI request failed");
  }
  const data = await res.json();

  // Attempt to parse JSON from model output
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  // Strip code fences if present
  const cleaned = text.replace(/```json|```/g, "").trim();

  try {
    const parsed = JSON.parse(cleaned);
    return parsed.questions || [];
  } catch {
    // Fallback: naive extraction
    return [];
  }
}

function renderAIQuiz(questions) {
  const out = document.getElementById("ai-output");
  out.innerHTML = "";
  if (!questions.length) {
    out.textContent = "No questions returned. Try another topic.";
    return;
  }
  questions.forEach((q, idx) => {
    const block = document.createElement("div");
    block.className = "card";
    const opts = q.options
      ?.map((opt, i) => {
        const id = `aiq${idx}_o${i}`;
        return `
        <label>
          <input type="radio" name="aiq${idx}" value="${i}" id="${id}" />
          ${opt}
        </label>`;
      })
      .join("<br/>");
    block.innerHTML = `
      <strong>Q${idx + 1}. ${q.q}</strong>
      <div style="margin-top:6px">${opts || ""}</div>
      <details style="margin-top:8px">
        <summary>Show answer</summary>
        <div><strong>Correct:</strong> Option ${Number(q.answerIndex) + 1}</div>
        <div class="muted" style="margin-top:6px">${q.explanation || ""}</div>
      </details>
    `;
    out.appendChild(block);
  });
}

function wireAIForm() {
  const form = document.getElementById("ai-form");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const course = document.getElementById("ai-course").value;
    const topic = document.getElementById("ai-topic").value.trim();
    const out = document.getElementById("ai-output");
    if (!course || !topic) return;
    out.textContent = "Generating quiz...";
    try {
      const questions = await generateQuizWithAI(course, topic);
      renderAIQuiz(questions);
    } catch (err) {
      console.error(err);
      out.textContent = "Failed to generate quiz. Check API key or try again.";
    }
  });
}
function triggerAIQuiz(courseName) {
  const topic = prompt(`Enter a topic for ${courseName}:`);
  if (!topic) return;
  document.getElementById("ai-course").value = courseName;
  document.getElementById("ai-topic").value = topic;
  document
    .getElementById("ai-form")
    .dispatchEvent(new Event("submit", { cancelable: true }));
}

document.addEventListener("DOMContentLoaded", wireAIForm);
