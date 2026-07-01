// js/departments.js
import { card, el } from "./data.js"; // same folder: js/

const departmentContainer = document.getElementById('department-cards');

// Departments grouped by category
const departments = [
    {
        category: "Social Science",
        list:[
            {name:"Literature", image:"../assets/images/dept_literature.jpg", desc:"Study of language, texts, and literature. Builds critical thinking and communication skills.", link:"https://www.example.com/literature-career"},
            {name:"Economics", image:"../assets/images/dept_economics.jpg", desc:"Understanding economics helps in business, policy-making, and financial sectors.", link:"https://www.example.com/economics-career"},
            {name:"Law", image:"../assets/images/dept_law.jpg", desc:"Law department prepares students for careers in legal systems, advocacy, and governance.", link:"https://www.example.com/law-career"}
        ]
    },
    {
        category: "Technology",
        list:[
            {name:"Software Engineering", image:"../assets/images/dept_se.jpg", desc:"Learn software development, programming, and project management skills.", link:"https://www.example.com/software-engineering-career"},
            {name:"Computer Science", image:"../assets/images/dept_cs.jpg", desc:"Focuses on computing, algorithms, and tech problem solving.", link:"https://www.example.com/computer-science-career"},
            {name:"Information Science", image:"../assets/images/dept_info.jpg", desc:"Data management, IT systems, and analytics skills for tech careers.", link:"https://www.example.com/information-science-career"}
        ]
    },
    {
        category: "Engineering",
        list:[
            {name:"Mechanical Engineering", image:"../assets/images/dept_mechanical.jpg", desc:"Design, develop, and maintain mechanical systems for various industries.", link:"https://www.example.com/mechanical-engineering-career"},
            {name:"Chemical Engineering", image:"../assets/images/dept_chemical.jpg", desc:"Combine chemistry, physics, and math to design chemical processes.", link:"https://www.example.com/chemical-engineering-career"},
            {name:"Civil Engineering", image:"../assets/images/dept_civil.jpg", desc:"Plan and build infrastructure like roads, bridges, and buildings.", link:"https://www.example.com/civil-engineering-career"}
        ]
    },
    {
        category: "Medical Science",
        list:[
            {name:"Pharmacy", image:"../assets/images/dept_pharmacy.jpg", desc:"Prepare medicines and ensure safe drug use.", link:"https://www.example.com/pharmacy-career"},
            {name:"Anesthesia", image:"../assets/images/dept_anesthesia.jpg", desc:"Manage anesthesia for surgeries and patient care.", link:"https://www.example.com/anesthesia-career"},
            {name:"Radiology", image:"../assets/images/dept_radiology.jpg", desc:"Medical imaging to diagnose and treat patients.", link:"https://www.example.com/radiology-career"},
            {name:"Medicine", image:"../assets/images/dept_medicine.jpg", desc:"Train to become a doctor with comprehensive medical knowledge.", link:"https://www.example.com/medicine-career"}
        ]
    }
];

// Generate department cards
departments.forEach(category=>{
    const catTitle = document.createElement('h2');
    catTitle.style.width="100%";
    catTitle.style.color="#4fc3f7";
    catTitle.style.margin="1rem 0";
    catTitle.innerText = category.category;
    departmentContainer.appendChild(catTitle);

    category.list.forEach(dept=>{
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <img src="${dept.image}" alt="${dept.name}">
            <div class="card-content">
                <h3>${dept.name}</h3>
                <p>${dept.desc}</p>
                <a class="btn" href="${dept.link}" target="_blank">View Career Path</a>
            </div>
        `;
        departmentContainer.appendChild(div);
    });
});

// home.js — builds feature cards and AI demo year
import { card, el } from "./data.js";

const features = [
  {
    title: "Academic Support",
    desc: "Notes, guide books, chapters, and past exams for your courses.",
    img: "./assets/feature_academic.jpg",
    href: "./pages/academic.html",
    badge: "Study"
  },
  {
    title: "Departments & Careers",
    desc: "Explore fields, what you’ll learn, and career paths.",
    img: "./assets/feature_departments.jpg",
    href: "./pages/departments.html",
    badge: "Careers"
  },
  {
    title: "Student Clubs",
    desc: "Join communities, learn together, and have fun.",
    img: "./assets/feature_clubs.jpg",
    href: "./pages/clubs.html",
    badge: "Community"
  },
  {
    title: "Administrative Guidance",
    desc: "Solve common campus issues with clear directions.",
    img: "./assets/feature_admin.jpg",
    href: "./pages/admin.html",
    badge: "Support"
  }
];

function buildFeatureGrid() {
  const grid = document.getElementById("features");
  if (!grid) return;
  features.forEach(f => {
    const actions = [el("a", { href: f.href, class: "btn primary" }, "Open")];
    grid.appendChild(card({ title: f.title, desc: f.desc, img: f.img, badge: f.badge, actions }));
  });
}

function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  buildFeatureGrid();
  setYear();
});
