// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

//Search Button
const searchInput = document.getElementById('search-input');
const searchResultsDiv = document.getElementById('search-results');

const searchData = [
  "Sessions with Client",
  "Workout Plan",
  "My Clients",
  "Session Today",
  "Bookings",
  "Requested Sessions",
  "Plans",
  "Messages",
  "Settings",
  "Profile"
];

searchInput.addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  const filteredResults = searchData.filter(item =>
    item.toLowerCase().includes(searchTerm)
  );

  displayResults(filteredResults);
});

function displayResults(results) {
  searchResultsDiv.innerHTML = '';

  if (results.length > 0 && searchInput.value.trim() !== '') {
    const ul = document.createElement('ul');
    results.forEach(result => {
      const li = document.createElement('li');
      li.textContent = result;
      li.addEventListener('click', function() {
        searchInput.value = this.textContent;
        searchResultsDiv.style.display = 'none'; 
      });
      ul.appendChild(li);
    });
    searchResultsDiv.appendChild(ul);
    searchResultsDiv.style.display = 'block'; 
  } else {
    searchResultsDiv.style.display = 'none'; 
  }
}


document.addEventListener('click', function(event) {
  if (!event.target.closest('.search-container')) {
    searchResultsDiv.style.display = 'none';
  }
});

//Mail Button
const mailIconInbox = document.getElementById('mail-icon-inbox');
const unreadNotification = document.getElementById('unread-notification');
const inboxPreview = document.getElementById('inbox-preview');
let hasUnread = true; 

function updateUnreadIndicator() {
  unreadNotification.style.display = hasUnread ? 'block' : 'none';
}

updateUnreadIndicator();

mailIconInbox.addEventListener('click', function() {
  inboxPreview.style.display = (inboxPreview.style.display === 'block' ? 'none' : 'block');
  
  if (hasUnread && inboxPreview.style.display === 'block') {
    hasUnread = false;
    updateUnreadIndicator();
   
    console.log('Mail icon clicked - marking as read');
  }
});


document.addEventListener('click', function(event) {
  if (!event.target.closest('.mail-container')) {
    inboxPreview.style.display = 'none';
  }
});


//Notification Icon
const notificationIcon = document.getElementById('notification-icon');
const notificationBadge = document.getElementById('notification-badge');
const notificationsDropdown = document.getElementById('notifications-dropdown');

notificationIcon.addEventListener('click', function() {
  notificationsDropdown.style.display = (notificationsDropdown.style.display === 'block' ? 'none' : 'block');
  
  notificationBadge.style.display = 'none';
});


document.addEventListener('click', function(event) {
  if (!event.target.closest('.notification-container')) {
    notificationsDropdown.style.display = 'none';
  }
});


//Modals
const addClientBtn = document.getElementById("addClientBtn");
const newClientNameInput = document.getElementById("newClientName");
const newClientPlanInput = document.getElementById("newClientPlan");
const clientsTbody = document.querySelector(".clients-tbody");
const addClientRow = document.getElementById("add-client-row");

const modalAssign = document.getElementById("workoutModal");
const closeAssignBtn = document.querySelector(".close-btn");
const workoutInput = document.getElementById("workoutInput");
const submitBtn = document.getElementById("submitWorkout");
const modalClientNameAssign = document.getElementById("modal-client-name-assign");

const viewProgressBtns = document.querySelectorAll('.view-progress-btn');
const modalProgress = document.getElementById("progressModal");
const closeProgressBtn = document.querySelector(".close-progress-btn");
const modalClientNameProgress = document.getElementById("modal-client-name-progress");
const workoutPlanItemsList = document.getElementById("workoutPlanItems");
const progressPercentageDisplay = document.getElementById("progressPercentage");
const saveProgressBtn = document.getElementById("saveProgressBtn");

let nextClientId = 4; 
const isCoach = true; 

function updateProgress(list) {
    const checkboxes = list.querySelectorAll('input[type="checkbox"]');
    const totalItems = checkboxes.length;
    const completedItems = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
    const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    progressPercentageDisplay.textContent = `${percentage}%`;
}

function attachClientRowListeners(clientRow) {
    const assignBtn = clientRow.querySelector('.assign-workout-btn');
    if (assignBtn) {
        assignBtn.addEventListener("click", (event) => {
            const row = event.target.closest('.client-row');
            const clientId = row.dataset.clientId;
            const clientName = row.querySelector('td:first-child').textContent;

            workoutInput.value = row.dataset.workoutPlan || "";
            modalClientNameAssign.textContent = clientName;
            submitBtn.dataset.clientId = clientId;
            modalAssign.style.display = "block";
        });
    }

    const viewProgressBtn = clientRow.querySelector('.view-progress-btn');
    if (viewProgressBtn) {
        viewProgressBtn.addEventListener("click", (event) => {
            const row = event.target.closest('.client-row');
            const clientName = row.querySelector('td:first-child').textContent;
            const workoutPlan = row.dataset.workoutPlan;

            modalClientNameProgress.textContent = clientName;
            workoutPlanItemsList.innerHTML = ''; 

            if (isCoach) {
                const exercises = workoutPlan ? workoutPlan.split(',').map(item => item.trim()).join('<br>') : 'No workout plan assigned yet.';
                workoutPlanItemsList.innerHTML = `<p>${exercises}</p>`;
                progressPercentageDisplay.textContent = '75%';
                if (saveProgressBtn) {
                    saveProgressBtn.style.display = 'none';
                }
            } else {
                if (workoutPlan) {
                    const exercises = workoutPlan.split(',').map(item => item.trim());
                    exercises.forEach(exercise => {
                        const listItem = document.createElement('li');
                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        const label = document.createElement('label');
                        label.textContent = exercise;
                        listItem.appendChild(checkbox);
                        listItem.appendChild(label);
                        workoutPlanItemsList.appendChild(listItem);
                    });
                    updateProgress(workoutPlanItemsList);
                    workoutPlanItemsList.addEventListener('change', () => {
                        updateProgress(workoutPlanItemsList);
                    });
                    if (saveProgressBtn) {
                        saveProgressBtn.style.display = 'block'; 
                    }
                } else {
                    const listItem = document.createElement('li');
                    listItem.textContent = 'No workout plan assigned yet.';
                    workoutPlanItemsList.appendChild(listItem);
                    progressPercentageDisplay.textContent = '0%';
                    if (saveProgressBtn) {
                        saveProgressBtn.style.display = 'none'; 
                    }
                }
            }
            modalProgress.style.display = "block";
        });
    }

    const deleteBtn = clientRow.querySelector('.delete-client-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener("click", (event) => {
            const rowToRemove = event.target.closest('.client-row');
            if (rowToRemove) {
                rowToRemove.remove();
            }
        });
    }
}

document.querySelectorAll('.client-row').forEach(attachClientRowListeners);

// Add New Client 
addClientBtn.addEventListener("click", () => {
    const newName = newClientNameInput.value.trim();
    const newPlan = newClientPlanInput.value.trim();

    if (newName) {
        const newClientRow = document.createElement('tr');
        newClientRow.classList.add('client-row');
        newClientRow.dataset.clientId = nextClientId++;
        newClientRow.dataset.workoutPlan = "";
        newClientRow.innerHTML = `
            <td>${newName}</td>
            <td>${newPlan || 'Not Assigned'}</td>
            <td>
                <button class="view-progress-btn">View Progress</button>
                <button class="assign-workout-btn">Assign Workout</button>
                <button class="delete-client-btn">Delete</button>
            </td>
        `;
        clientsTbody.insertBefore(newClientRow, addClientRow.nextSibling); 
        attachClientRowListeners(newClientRow);

        newClientNameInput.value = "";
        newClientPlanInput.value = "";
    } else {
        alert("Please enter the client's name.");
    }
});

closeAssignBtn.addEventListener("click", () => {
    modalAssign.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modalAssign) {
        modalAssign.style.display = "none";
    }
    if (e.target === modalProgress) {
        modalProgress.style.display = "none";
    }
});

closeProgressBtn.addEventListener("click", () => {
    modalProgress.style.display = "none";
    const workoutPlanItemsList = document.getElementById("workoutPlanItems");
    if (!isCoach && workoutPlanItemsList) {
        workoutPlanItemsList.removeEventListener('change', updateProgress); 
    }
});

submitBtn.addEventListener("click", () => {
    const workout = workoutInput.value.trim();
    const clientId = submitBtn.dataset.clientId;
    const clientRow = document.querySelector(`.client-row[data-client-id="${clientId}"]`);

    if (workout && clientId && clientRow) {
        clientRow.dataset.workoutPlan = workout;
        clientRow.querySelector('td:nth-child(2)').textContent = workout.split(',')[0] || 'Custom Plan'; 
        console.log(`Workout "${workout}" assigned to client ID: ${clientId}`);
        alert(`Workout assigned to client ID: ${clientId}`);
        modalAssign.style.display = "none";
    } else {
        alert("Please enter a workout plan!");
    }
});

if (saveProgressBtn) {
    saveProgressBtn.addEventListener("click", () => {
        alert('Progress saved for the client.');
        modalProgress.style.display = "none";
    });
}

 //Sign out
 document.addEventListener('DOMContentLoaded', function() {
  const signOutLink = document.querySelector('.navigation ul li:last-child a');
  const signOutModal = document.getElementById('signOutModal');
  const signOutYesButton = document.getElementById('signOutYes');
  const signOutNoButton = document.getElementById('signOutNo');

  if (signOutLink) {
  signOutLink.addEventListener('click', function(event) {
      event.preventDefault();
      showModal(signOutModal);
  });
  } else {
  console.error("Sign Out link not found!");
  }

  signOutYesButton.addEventListener('click', function() {
  window.location.href = 'index.html';
  });

  signOutNoButton.addEventListener('click', function() {
  hideModal(signOutModal);
  });

  window.addEventListener('click', function(event) {
  if (event.target == signOutModal) {
      hideModal(signOutModal);
  }
  });

  function showModal(modalElement) {
  modalElement.classList.add('show');
  }

  function hideModal(modalElement) {
  modalElement.classList.remove('show');
  }
});