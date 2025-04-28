let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("click", activeLink));

// Menu Toggle (remains the same)
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

//Search Function
const searchInput = document.getElementById('search-input');
const searchResultsDiv = document.getElementById('search-results');

const searchData = [
  "Total Sales",
  "Total Clients",
  "Settings",
  "Total Coaches",
  "Payments",
  "Recent Complaints",
  "Admin Dashboard",
  "Updates",
  "Database Updates",
  "Added Admins"
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

//Mail Function
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
ad
    console.log('Mail icon clicked - marking as read');
  }
});


document.addEventListener('click', function(event) {
  if (!event.target.closest('.mail-container')) {
    inboxPreview.style.display = 'none';
  }
});


//Notification Function
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

// Sample data - replace with your actual data loading mechanism
let coaches = JSON.parse(localStorage.getItem('coaches')) || [];

// DOM elements
const coachForm = document.getElementById('addCoachForm');
const coachesTableBody = document.getElementById('coachesTableBody');
const coachProfileModal = document.getElementById('coachProfileModal');
const editCoachForm = document.getElementById('editCoachForm');
const closeButton = document.querySelector(".close-button");
const emptyCoachesMessage = document.getElementById('emptyCoachesMessage');

// Initialize table
document.addEventListener('DOMContentLoaded', () => {
  renderCoachesTable();
  setupEventListeners();
});

function setupEventListeners() {
  // Add coach form submission
  coachForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addCoach();
  });

  // Edit form submission
  editCoachForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveCoachChanges();
  });

  // Close modal when clicking the X
  closeButton.addEventListener('click', () => {
    coachProfileModal.style.display = 'none';
  });

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === coachProfileModal) {
      coachProfileModal.style.display = 'none';
    }
  });

  // Handle delete button in modal
  document.querySelector('.delete-button').addEventListener('click', () => {
    deleteCoach();
  });
  
  // Sign out functionality (from your original code)
  const signOutLinks = document.querySelectorAll('.navigation li:last-child a');
  const signOutModal = document.getElementById('signOutModal');
  const signOutNo = document.getElementById('signOutNo');
  const signOutYes = document.getElementById('signOutYes');

  signOutLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      signOutModal.style.display = 'block';
    });
  });

  if (signOutNo) {
    signOutNo.addEventListener('click', () => {
      signOutModal.style.display = 'none';
    });
  }

  if (signOutYes) {
    signOutYes.addEventListener('click', () => {
      window.location.href = 'index.html'; // Change to your desired logout page
    });
  }
  
  // Menu toggle functionality (from your original code)
  let toggle = document.querySelector('.toggle');
  let navigation = document.querySelector('.navigation');
  let main = document.querySelector('.main');

  toggle.onclick = function() {
    navigation.classList.toggle('active');
    main.classList.toggle('active');
  }
}

// Add coach function
function addCoach() {
  const newCoach = {
    id: generateId(),
    name: document.getElementById('coachName').value,
    email: document.getElementById('coachEmail').value,
    phone: document.getElementById('coachPhone').value,
    client: document.getElementById('coachClient').value,
    sessions: document.getElementById('coachSessions').value,
    specialty: document.getElementById('coachSpecialty').value,
    availability: document.getElementById('coachAvailability').value
  };
  
  coaches.push(newCoach);
  saveCoaches();
  renderCoachesTable();
  coachForm.reset();
}

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Display coaches in table
function renderCoachesTable() {
  coachesTableBody.innerHTML = '';
  
  if (coaches.length === 0) {
    emptyCoachesMessage.style.display = 'block';
  } else {
    emptyCoachesMessage.style.display = 'none';
    
    coaches.forEach(coach => {
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>${coach.name}</td>
        <td>${coach.email}</td>
        <td>${coach.phone}</td>
        <td>${coach.client || 'None'}</td>
        <td>${coach.sessions}</td>
        <td>${coach.specialty}</td>
        <td><span class="status ${coach.availability}">${coach.availability}</span></td>
        <td>
          <button class="view-btn" data-id="${coach.id}">View</button>
        </td>
      `;
      
      coachesTableBody.appendChild(row);
      
      // Add event listener to view button
      row.querySelector('.view-btn').addEventListener('click', () => {
        openCoachDetailsModal(coach);
      });
    });
  }
}

// Open details modal
function openCoachDetailsModal(coach) {
  // Set form fields
  document.getElementById('editCoachName').value = coach.name;
  document.getElementById('editCoachEmail').value = coach.email;
  document.getElementById('editCoachPhone').value = coach.phone;
  document.getElementById('editCoachClient').value = coach.client || '';
  document.getElementById('editCoachSessions').value = coach.sessions;
  document.getElementById('editCoachSpecialty').value = coach.specialty;
  document.getElementById('editCoachAvailability').value = coach.availability;
  document.getElementById('editCoachId').value = coach.id;
  
  // Display modal
  coachProfileModal.style.display = 'block';
}

// Save changes from modal
function saveCoachChanges() {
  const id = document.getElementById('editCoachId').value;
  const index = coaches.findIndex(coach => coach.id === id);
  
  if (index !== -1) {
    coaches[index] = {
      id: id,
      name: document.getElementById('editCoachName').value,
      email: document.getElementById('editCoachEmail').value,
      phone: document.getElementById('editCoachPhone').value,
      client: document.getElementById('editCoachClient').value,
      sessions: document.getElementById('editCoachSessions').value,
      specialty: document.getElementById('editCoachSpecialty').value,
      availability: document.getElementById('editCoachAvailability').value
    };
    saveCoaches();
    renderCoachesTable();
  }
  
  coachProfileModal.style.display = 'none';
}

// Delete coach
function deleteCoach() {
  const id = document.getElementById('editCoachId').value;
  coaches = coaches.filter(coach => coach.id !== id);
  saveCoaches();
  renderCoachesTable();
  coachProfileModal.style.display = 'none';
}

// Save to localStorage
function saveCoaches() {
  localStorage.setItem('coaches', JSON.stringify(coaches));
}

// Email and notification dropdowns (from your original code)
document.addEventListener('DOMContentLoaded', function() {
  const mailIcon = document.getElementById('mail-icon-inbox');
  const inboxPreview = document.getElementById('inbox-preview');
  const notificationIcon = document.getElementById('notification-icon');
  const notificationsDropdown = document.getElementById('notifications-dropdown');

  mailIcon.addEventListener('click', function() {
    inboxPreview.style.display = inboxPreview.style.display === 'block' ? 'none' : 'block';
    // Close notifications if open
    notificationsDropdown.style.display = 'none';
  });

  notificationIcon.addEventListener('click', function() {
    notificationsDropdown.style.display = notificationsDropdown.style.display === 'block' ? 'none' : 'block';
    // Close inbox if open
    inboxPreview.style.display = 'none';
  });

  // Close dropdowns when clicking elsewhere
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.mail-container') && !event.target.closest('#inbox-preview')) {
      inboxPreview.style.display = 'none';
    }
    if (!event.target.closest('.notification-container') && !event.target.closest('#notifications-dropdown')) {
      notificationsDropdown.style.display = 'none';
    }
  });
});

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    if (searchTerm.length === 0) {
      searchResults.style.display = 'none';
      return;
    }
    
    // Search coaches
    const filteredCoaches = coaches.filter(coach => 
      coach.name.toLowerCase().includes(searchTerm) || 
      coach.email.toLowerCase().includes(searchTerm) ||
      coach.specialty.toLowerCase().includes(searchTerm)
    );
    
    displaySearchResults(filteredCoaches);
  });

  function displaySearchResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-item">No results found</div>';
      searchResults.style.display = 'block';
      return;
    }
    
    results.forEach(result => {
      const resultItem = document.createElement('div');
      resultItem.classList.add('search-item');
      resultItem.textContent = `${result.name} - ${result.specialty}`;
      
      resultItem.addEventListener('click', () => {
        openCoachDetailsModal(result);
        searchInput.value = '';
        searchResults.style.display = 'none';
      });
      
      searchResults.appendChild(resultItem);
    });
    
    searchResults.style.display = 'block';
  }
  
  // Close search results when clicking elsewhere
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.search-container')) {
      searchResults.style.display = 'none';
    }
  });
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

  // Helper functions for showing and hiding the modal
  function showModal(modalElement) {
  modalElement.classList.add('show');
  }

  function hideModal(modalElement) {
  modalElement.classList.remove('show');
  }
});