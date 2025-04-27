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

//Client Function
document.addEventListener('DOMContentLoaded', () => {
  const clientsTableBody = document.getElementById('clientsTableBody');
  const emptyClientsMessage = document.getElementById('emptyClientsMessage');
  const clientProfileModal = document.getElementById('clientProfileModal');
  const modalProfileDetails = document.getElementById('modalProfileDetails');
  const closeButton = document.querySelector('.close-button');
  let currentProfileId = null;
  let clientsData = loadClients();

  renderClientsTable(clientsData);

  clientsTableBody.addEventListener('click', (event) => {
      if (event.target.classList.contains('client-name-link')) {
          const clientId = event.target.dataset.clientId;
          showClientProfileModal(clientId);
      } else if (event.target.classList.contains('delete-button')) {
          const clientIdToDelete = parseInt(event.target.dataset.clientId);
          deleteClient(clientIdToDelete);
      }
  });

  clientProfileModal.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-button')) {
          const clientIdToDelete = parseInt(event.target.dataset.clientId);
          deleteClient(clientIdToDelete);
      }
  });

  closeButton.addEventListener('click', () => {
      clientProfileModal.style.display = 'none';
      currentProfileId = null;
  });

  window.addEventListener('click', (event) => {
      if (event.target == clientProfileModal) {
          clientProfileModal.style.display = 'none';
          currentProfileId = null;
      }
  });

  window.addNewClient = function() {
      const nameInput = document.getElementById('addName');
      const emailInput = document.getElementById('addEmail');
      const phoneInput = document.getElementById('addPhone');
      const coachInput = document.getElementById('addAssignedCoach');
      const goalInput = document.getElementById('addFitnessGoal');
      const statusInput = document.getElementById('addStatus');

      if (!nameInput.value.trim()) {
          alert('Client name is required.');
          return;
      }

      const newClient = {
          id: Date.now(),
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          phone: phoneInput.value.trim(),
          assignedCoach: coachInput.value.trim(),
          fitnessGoal: goalInput.value.trim(),
          status: statusInput.value
      };

      clientsData.unshift(newClient); 
      saveClients();
      renderClientsTable(clientsData);

      nameInput.value = '';
      emailInput.value = '';
      phoneInput.value = '';
      coachInput.value = '';
      goalInput.value = '';
      statusInput.value = 'active'; 
  };

  function renderClientsTable(clients) {
      const existingDataRows = clientsTableBody.querySelectorAll('tr:not(#addClientRow)');
      existingDataRows.forEach(row => row.remove());

      if (clients.length === 0) {
          emptyClientsMessage.style.display = 'block';
      } else {
          emptyClientsMessage.style.display = 'none';
          clients.forEach(client => {
              const row = clientsTableBody.insertRow(1); 
              const nameCell = row.insertCell();
              nameCell.innerHTML = `<span class="client-name-link" data-client-id="${client.id}">${client.name}</span>`;
              nameCell.style.fontWeight = 'bold';
              row.insertCell().textContent = client.email || '-';
              row.insertCell().textContent = client.phone || '-';
              row.insertCell().textContent = client.assignedCoach || 'Not Assigned';
              row.insertCell().textContent = client.fitnessGoal || '-';
              const statusCell = row.insertCell();
              statusCell.textContent = client.status;
              statusCell.classList.add(client.status);
              statusCell.style.textAlign = 'center';
              const actionsCell = row.insertCell();
              actionsCell.classList.add('action-buttons');
              actionsCell.innerHTML = `
                  <button class="delete-button" data-client-id="${client.id}">Delete</button>
              `;
          });
      }
  }

  function showClientProfileModal(clientId) {
      const client = clientsData.find(c => c.id === parseInt(clientId));
      if (client) {
          currentProfileId = clientId;
          modalProfileDetails.innerHTML = `
              <div class="modal-profile-info"><strong>Name:</strong> ${client.name}</div>
              <div class="modal-profile-info"><strong>Email:</strong> ${client.email || 'N/A'}</div>
              <div class="modal-profile-info"><strong>Phone:</strong> ${client.phone || 'N/A'}</div>
              <div class="modal-profile-info"><strong>Assigned Coach:</strong> ${client.assignedCoach || 'N/A'}</div>
              <div class="modal-profile-info"><strong>Fitness Goal:</strong> ${client.fitnessGoal || 'N/A'}</div>
              <div class="modal-profile-info"><strong>Status:</strong> <span style="font-weight: bold; color: ${client.status === 'active' ? '#27ae60' : '#e74c3c'};">${client.status.toUpperCase()}</span></div>
          `;
          clientProfileModal.style.display = 'block';
      } else {
          modalProfileDetails.innerHTML = '<p style="color: #7f8c8d; font-style: italic;">Client details not found.</p>';
          clientProfileModal.style.display = 'block';
      }
  }

  function deleteClient(clientId) {
      if (confirm('Are you sure you want to delete this client?')) {
          clientsData = clientsData.filter(client => client.id !== clientId);
          saveClients();
          renderClientsTable(clientsData);
          if (currentProfileId === clientId) {
              clientProfileModal.style.display = 'none';
              currentProfileId = null;
          }
      }
  }

  function saveClients() {
      localStorage.setItem('clients', JSON.stringify(clientsData));
  }

  function loadClients() {
      const storedClients = localStorage.getItem('clients');
      return storedClients ? JSON.parse(storedClients) : [];
  }

  renderClientsTable(clientsData);
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