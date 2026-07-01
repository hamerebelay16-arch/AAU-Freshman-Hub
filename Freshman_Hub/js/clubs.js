const clubsContainer = document.getElementById('clubs-container');
const formContainer = document.getElementById('club-form-container');
const clubForm = document.getElementById('club-form');
const successMsg = document.getElementById('success-msg');
const clubNameInput = document.getElementById('club-name');

clubs.forEach(club=>{
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <img src="${club.image}" alt="${club.name}">
        <div class="card-content">
            <h3>${club.name}</h3>
            <p class="club-desc-short">${club.desc.substring(0,60)}...</p>
            <p class="club-desc-full" style="display:none;">${club.desc}</p>
            <span class="show-more" onclick="toggleDesc(this)">See More</span>
            <button class="btn" onclick="joinClub('${club.name}')">Join Club</button>
        </div>
    `;
    clubsContainer.appendChild(div);
});

// Toggle See More
function toggleDesc(el){
    const shortDesc = el.previousElementSibling.previousElementSibling;
    const fullDesc = el.previousElementSibling;
    if(fullDesc.style.display === "none"){
        fullDesc.style.display = "block";
        shortDesc.style.display = "none";
        el.innerText = "Show Less";
    } else {
        fullDesc.style.display = "none";
        shortDesc.style.display = "block";
        el.innerText = "See More";
    }
}

// Open form for specific club
function joinClub(clubName){
    clubsContainer.style.display = 'none';
    formContainer.style.display = 'block';
    clubNameInput.value = clubName;
}

// Back to clubs list
function backToClubs(){
    clubsContainer.style.display = 'grid';
    formContainer.style.display = 'none';
    successMsg.style.display = 'none';
}

// Save to localStorage and show success message
clubForm.addEventListener('submit', function(e){
    e.preventDefault();
    const formData = new FormData(clubForm);
    const data = Object.fromEntries(formData.entries());

    // Save to localStorage
    let saved = JSON.parse(localStorage.getItem('clubRegistrations')) || [];
    saved.push(data);
    localStorage.setItem('clubRegistrations', JSON.stringify(saved));

    // Show success message
    successMsg.style.display = 'block';

    // Optionally, submit to Formspree
    fetch(clubForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    }).then(res=>{
        if(res.ok){
            console.log("Form submitted to Formspree!");
        }
    }).catch(err=>{
        console.log("Formspree error", err);
    });

    clubForm.reset();
});
