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

// Sample data - replace with your actual data loading mechanism
let clients = JSON.parse(localStorage.getItem('clients')) || [];
let guests = JSON.parse(localStorage.getItem('guests')) || [];

// DOM elements
const clientForm = document.getElementById('addClientForm');
const guestForm = document.getElementById('addGuestForm');
const clientsTableBody = document.getElementById('clientsTableBody');
const guestsTableBody = document.getElementById('guestsTableBody');
const detailsModal = document.getElementById('detailsModal');
const editForm = document.getElementById('editForm');
const closeButton = document.querySelector(".close-button");
const emptyClientsMessage = document.getElementById('emptyClientsMessage');
const emptyGuestsMessage = document.getElementById('emptyGuestsMessage');

// Initialize tables
document.addEventListener('DOMContentLoaded', () => {
  renderClientsTable();
  renderGuestsTable();
  setupEventListeners();
});

function setupEventListeners() {
  // Add client form submission
  clientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addClient();
  });

  // Add guest form submission
  guestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addGuest();
  });

  // Edit form submission
  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveChanges();
  });

  // Close modal when clicking the X
  closeButton.addEventListener('click', () => {
    detailsModal.style.display = 'none';
  });

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === detailsModal) {
      detailsModal.style.display = 'none';
    }
  });

  // Handle delete button in modal
  document.querySelector('.delete-button').addEventListener('click', () => {
    deleteRecord();
  });
}

// Add client function
function addClient() {
  const newClient = {
    id: generateId(),
    name: document.getElementById('clientName').value,
    email: document.getElementById('clientEmail').value,
    phone: document.getElementById('clientPhone').value,
    coach: document.getElementById('clientCoach').value,
    goal: document.getElementById('clientGoal').value,
    status: document.getElementById('clientStatus').value,
    membership: document.getElementById('clientMembership').value
  };
  
  clients.push(newClient);
  saveClients();
  renderClientsTable();
  clientForm.reset();
}

// Add guest function
function addGuest() {
  const newGuest = {
    id: generateId(),
    name: document.getElementById('guestName').value,
    email: document.getElementById('guestEmail').value,
    phone: document.getElementById('guestPhone').value,
    purpose: document.getElementById('guestPurpose').value,
    status: document.getElementById('guestStatus').value
  };
  
  guests.push(newGuest);
  saveGuests();
  renderGuestsTable();
  guestForm.reset();
}

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Display clients in table
function renderClientsTable() {
  clientsTableBody.innerHTML = '';
  
  if (clients.length === 0) {
    emptyClientsMessage.style.display = 'block';
  } else {
    emptyClientsMessage.style.display = 'none';
    
    clients.forEach(client => {
      const row = document.createElement('tr');
      
      // Format membership text for display
      let membershipText = 'Unknown';
      switch(client.membership) {
        case 'starter': membershipText = 'Starter Access'; break;
        case 'coach': membershipText = 'Coach Connect'; break;
        case 'elite': membershipText = 'Elite Coaching'; break;
      }
      
      row.innerHTML = `
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.phone}</td>
        <td>${client.coach}</td>
        <td>${client.goal}</td>
        <td>${membershipText}</td>
        <td><span class="status ${client.status}">${client.status}</span></td>
        <td>
          <button class="view-btn" data-id="${client.id}" data-type="client">View</button>
        </td>
      `;
      
      clientsTableBody.appendChild(row);
      
      // Add event listener to view button
      row.querySelector('.view-btn').addEventListener('click', () => {
        openDetailsModal(client, 'client');
      });
    });
  }
}

// Display guests in table
function renderGuestsTable() {
  guestsTableBody.innerHTML = '';
  
  if (guests.length === 0) {
    emptyGuestsMessage.style.display = 'block';
  } else {
    emptyGuestsMessage.style.display = 'none';
    
    guests.forEach(guest => {
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>${guest.name}</td>
        <td>${guest.email}</td>
        <td>${guest.phone}</td>
        <td>${guest.purpose}</td>
        <td><span class="status ${guest.status}">${guest.status}</span></td>
        <td>
          <button class="view-btn" data-id="${guest.id}" data-type="guest">View</button>
        </td>
      `;
      
      guestsTableBody.appendChild(row);
      
      // Add event listener to view button
      row.querySelector('.view-btn').addEventListener('click', () => {
        openDetailsModal(guest, 'guest');
      });
    });
  }
}

// Open details modal
function openDetailsModal(record, type) {
  // Set modal title
  document.getElementById('modalTitle').textContent = type === 'client' ? 'Client Details' : 'Guest Details';
  
  // Set form fields
  document.getElementById('editName').value = record.name;
  document.getElementById('editEmail').value = record.email;
  document.getElementById('editPhone').value = record.phone;
  document.getElementById('editStatus').value = record.status;
  document.getElementById('editId').value = record.id;
  document.getElementById('editType').value = type;
  
  // Show/hide fields based on type
  if (type === 'client') {
    document.getElementById('clientSpecificFields').style.display = 'flex';
    document.getElementById('editCoachGroup').style.display = 'block';
    document.getElementById('editPurposeGroup').style.display = 'none';
    document.getElementById('editCoach').value = record.coach;
    document.getElementById('editGoal').value = record.goal;
    document.getElementById('editMembership').value = record.membership;
  } else {
    document.getElementById('clientSpecificFields').style.display = 'none';
    document.getElementById('editCoachGroup').style.display = 'none';
    document.getElementById('editPurposeGroup').style.display = 'block';
    document.getElementById('editPurpose').value = record.purpose;
  }
  
  // Display modal
  detailsModal.style.display = 'block';
}

// Save changes from modal
function saveChanges() {
  const id = document.getElementById('editId').value;
  const type = document.getElementById('editType').value;
  
  if (type === 'client') {
    const index = clients.findIndex(client => client.id === id);
    if (index !== -1) {
      clients[index] = {
        id: id,
        name: document.getElementById('editName').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value,
        coach: document.getElementById('editCoach').value,
        goal: document.getElementById('editGoal').value,
        membership: document.getElementById('editMembership').value,
        status: document.getElementById('editStatus').value
      };
      saveClients();
      renderClientsTable();
    }
  } else {
    const index = guests.findIndex(guest => guest.id === id);
    if (index !== -1) {
      guests[index] = {
        id: id,
        name: document.getElementById('editName').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value,
        purpose: document.getElementById('editPurpose').value,
        status: document.getElementById('editStatus').value
      };
      saveGuests();
      renderGuestsTable();
    }
  }
  
  detailsModal.style.display = 'none';
}

// Delete record
function deleteRecord() {
  const id = document.getElementById('editId').value;
  const type = document.getElementById('editType').value;
  
  if (type === 'client') {
    clients = clients.filter(client => client.id !== id);
    saveClients();
    renderClientsTable();
  } else {
    guests = guests.filter(guest => guest.id !== id);
    saveGuests();
    renderGuestsTable();
  }
  
  detailsModal.style.display = 'none';
}

// Save to localStorage
function saveClients() {
  localStorage.setItem('clients', JSON.stringify(clients));
}

function saveGuests() {
  localStorage.setItem('guests', JSON.stringify(guests));
}


toggle.onclick = function() {
  navigation.classList.toggle('active');
  main.classList.toggle('active');
}