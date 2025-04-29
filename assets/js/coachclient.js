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


// Initial client ID counter
let nextClientId = 4;
        
// DOM Elements
const clientForm = document.getElementById('clientForm');
const clientsTableBody = document.getElementById('clientsTableBody');
const workoutModal = document.getElementById('workoutModal');
const progressModal = document.getElementById('progressModal');
const modalClientNameAssign = document.getElementById('modal-client-name-assign');
const modalClientNameProgress = document.getElementById('modal-client-name-progress');
const workoutInput = document.getElementById('workoutInput');
const submitWorkoutBtn = document.getElementById('submitWorkout');
const workoutPlanItems = document.getElementById('workoutPlanItems');
const progressPercentage = document.getElementById('progressPercentage');
const saveProgressBtn = document.getElementById('saveProgressBtn');

// Add event listeners to existing client action buttons
function attachClientRowListeners(row) {
    // View Progress button
    const viewBtn = row.querySelector('.view-btn');
    if (viewBtn) {
        viewBtn.addEventListener('click', function() {
            const clientRow = this.closest('.client-row');
            const clientName = clientRow.querySelector('td[data-label="Name"]').textContent;
            const workoutPlan = clientRow.dataset.workoutPlan;
            
            // Display client name in modal
            modalClientNameProgress.textContent = clientName;
            
            // Display workout plan
            workoutPlanItems.innerHTML = '';
            if (workoutPlan) {
                const exercises = workoutPlan.split(',').map(item => item.trim());
                let html = '';
                exercises.forEach(exercise => {
                    html += `<div><input type="checkbox" id="${exercise.replace(/\s+/g, '-')}" checked>
                            <label for="${exercise.replace(/\s+/g, '-')}">${exercise}</label></div>`;
                });
                workoutPlanItems.innerHTML = html;
                progressPercentage.textContent = '75%';
            } else {
                workoutPlanItems.innerHTML = '<p>No workout plan assigned yet.</p>';
                progressPercentage.textContent = '0%';
            }
            
            // Show the modal
            progressModal.style.display = 'block';
        });
    }
    
    // Assign Workout button
    const assignBtn = row.querySelector('.assign-btn');
    if (assignBtn) {
        assignBtn.addEventListener('click', function() {
            const clientRow = this.closest('.client-row');
            const clientName = clientRow.querySelector('td[data-label="Name"]').textContent;
            const clientId = clientRow.dataset.clientId;
            const currentWorkout = clientRow.dataset.workoutPlan || '';
            
            // Set values in the modal
            modalClientNameAssign.textContent = clientName;
            workoutInput.value = currentWorkout;
            submitWorkoutBtn.dataset.clientId = clientId;
            
            // Show the modal
            workoutModal.style.display = 'block';
        });
    }
    
    // Delete button
    const deleteBtn = row.querySelector('.delete-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this client?')) {
                this.closest('.client-row').remove();
            }
        });
    }
}

// Add event listeners to all existing client rows
document.querySelectorAll('.client-row').forEach(attachClientRowListeners);

// Form submission handling
clientForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('clientName').value;
    const email = document.getElementById('clientEmail').value;
    const phone = document.getElementById('clientPhone').value;
    const plan = document.getElementById('clientPlan').value;
    
    // Create new client row
    const newRow = document.createElement('tr');
    newRow.classList.add('client-row', 'highlight-row');
    newRow.dataset.clientId = nextClientId++;
    newRow.dataset.workoutPlan = '';
    
    // Add content to the row
    newRow.innerHTML = `
        <td data-label="Name">${name}</td>
        <td data-label="Email">${email}</td>
        <td data-label="Phone">${phone}</td>
        <td data-label="Current Plan">${plan || 'Not Assigned'}</td>
        <td data-label="Actions">
            <button class="action-btn view-btn">View Progress</button>
            <button class="action-btn assign-btn">Assign Workout</button>
            <button class="action-btn delete-btn">Delete</button>
        </td>
    `;
    
    // Add to table
    clientsTableBody.appendChild(newRow);
    
    // Attach event listeners to the new row
    attachClientRowListeners(newRow);
    
    // Reset form
    this.reset();
    
    // Show success message
    alert('Client added successfully!');
});

// Modal close buttons
const closeButtons = document.querySelectorAll('.close-btn');
closeButtons.forEach(button => {
    button.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
    });
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Handle workout assignment submission
submitWorkoutBtn.addEventListener('click', function() {
    const clientId = this.dataset.clientId;
    const workout = workoutInput.value.trim();
    
    if (clientId && workout) {
        const clientRow = document.querySelector(`.client-row[data-client-id="${clientId}"]`);
        if (clientRow) {
            // Update the client's workout plan
            clientRow.dataset.workoutPlan = workout;
            
            // Update plan display in table if needed
            const displayName = workout.split(',')[0] || 'Custom Plan';
            clientRow.querySelector('td[data-label="Current Plan"]').textContent = displayName;
            
            // Close modal
            workoutModal.style.display = 'none';
            
            // Show success message
            alert('Workout plan assigned successfully!');
        }
    } else {
        alert('Please enter a workout plan!');
    }
});

// Handle progress save
saveProgressBtn.addEventListener('click', function() {
    alert('Progress saved successfully!');
    progressModal.style.display = 'none';
});

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