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

//Coaches
let coachesData = loadCoaches(); 
    let currentProfileId = null; 

    renderCoachesTable(coachesData);

    function addNewCoach() {
        const nameInput = document.getElementById('addName');
        const emailInput = document.getElementById('addEmail');
        const phoneInput = document.getElementById('addPhone');
        const assignedClientInput = document.getElementById('addAssignedClient');
        const sessionsInput = document.getElementById('addSessions');
        const availabilityInput = document.getElementById('addAvailability');

        if (!nameInput.value.trim()) {
            alert('Coach name is required.');
            return;
        }

        const newCoach = {
            id: Date.now(),
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            assignedClient: assignedClientInput.value.trim(),
            sessions: sessionsInput.value.trim(),
            availability: availabilityInput.value
        };

        coachesData.unshift(newCoach);
        saveCoaches();
        renderCoachesTable(coachesData);
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
        assignedClientInput.value = '';
        sessionsInput.value = '';
        availabilityInput.value = 'available'; 
    }

    function renderCoachesTable(coaches) {
        const tableBody = document.getElementById('coachesTableBody');
        const addRow = document.getElementById('addCoachRow');
        const existingDataRows = tableBody.querySelectorAll('tr:not(#addCoachRow)');
        existingDataRows.forEach(row => row.remove());
        tableBody.appendChild(addRow);

        if (coaches.length === 0) {
            document.getElementById('emptyCoachesMessage').style.display = 'block';
        } else {
            document.getElementById('emptyCoachesMessage').style.display = 'none';
            coaches.forEach(coach => {
                const row = tableBody.insertRow();
                const nameCell = row.insertCell();
                const emailCell = row.insertCell();
                const phoneCell = row.insertCell();
                const assignedClientCell = row.insertCell();
                const sessionsCell = row.insertCell();
                const availabilityCell = row.insertCell();
                const actionsCell = row.insertCell();
                actionsCell.classList.add('action-buttons'); 

                nameCell.innerHTML = `<a href="#" class="coach-name-link" data-coach-id="${coach.id}">${coach.name}</a>`;
                emailCell.textContent = coach.email || '-';
                phoneCell.textContent = coach.phone || '-';
                assignedClientCell.textContent = coach.assignedClient || '-';
                sessionsCell.textContent = coach.sessions || '-';

                availabilityCell.textContent = coach.availability.toUpperCase();
                availabilityCell.classList.add(coach.availability); 

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = () => deleteCoach(coach.id);
                actionsCell.appendChild(deleteButton);
            });
        }
    }

    function deleteCoach(coachId) {
        if (confirm('Are you sure you want to delete this coach?')) {
            coachesData = coachesData.filter(coach => coach.id !== coachId);
            saveCoaches();
            renderCoachesTable(coachesData);
            if (currentProfileId === coachId) {
                document.getElementById('coachProfileModal').style.display = 'none';
                currentProfileId = null;
            }
        }
    }

    function showCoachProfileModal(coachId) {
        const coach = coachesData.find(c => c.id === parseInt(coachId));
        if (coach) {
            currentProfileId = coachId;
            document.getElementById('modalProfileDetails').innerHTML = `
                <div class="modal-profile-info"><strong>Name:</strong> ${coach.name}</div>
                <div class="modal-profile-info"><strong>Email:</strong> ${coach.email || 'N/A'}</div>
                <div class="modal-profile-info"><strong>Phone:</strong> ${coach.phone || 'N/A'}</div>
                <div class="modal-profile-info"><strong>Assigned Client:</strong> ${coach.assignedClient || 'N/A'}</div>
                <div class="modal-profile-info"><strong>Sessions:</strong> ${coach.sessions || 'N/A'}</div>
                <div class="modal-profile-info"><strong>Availability:</strong> <span style="font-weight: bold; color: ${coach.availability === 'available' ? 'green' : 'red'};">${coach.availability.toUpperCase()}</span></div>
            `;
            document.getElementById('coachProfileModal').style.display = 'block';
        } else {
            document.getElementById('modalProfileDetails').innerHTML = '<p style="color: #7f8c8d; font-style: italic;">Coach details not found.</p>';
            document.getElementById('coachProfileModal').style.display = 'block';
        }
    }

    document.getElementById('coachesTableBody').addEventListener('click', (event) => {
        if (event.target.classList.contains('coach-name-link')) {
            const coachId = event.target.dataset.coachId;
            showCoachProfileModal(coachId);
            event.preventDefault(); 
        } else if (event.target.classList.contains('delete-button')) {
            const coachIdToDelete = parseInt(event.target.dataset.coachId);
            deleteCoach(coachIdToDelete);
        }
    });

    // Modal close functionality
    const coachProfileModal = document.getElementById('coachProfileModal');
    const closeButton = document.querySelector('#coachProfileModal .close-button');
    window.addEventListener('click', (event) => {
        if (event.target == coachProfileModal) {
            coachProfileModal.style.display = 'none';
            currentProfileId = null;
        }
    });
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            coachProfileModal.style.display = 'none';
            currentProfileId = null;
        });
    }
    const modalDeleteButton = document.querySelector('#coachProfileModal .delete-button');
    if (modalDeleteButton) {
        modalDeleteButton.addEventListener('click', () => {
            if (currentProfileId) {
                deleteCoach(parseInt(currentProfileId));
            }
        });
    }


    function saveCoaches() {
        localStorage.setItem('coaches', JSON.stringify(coachesData));
    }

    function loadCoaches() {
        const storedCoaches = localStorage.getItem('coaches');
        return storedCoaches ? JSON.parse(storedCoaches) : [];
    }
    renderCoachesTable(coachesData);

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