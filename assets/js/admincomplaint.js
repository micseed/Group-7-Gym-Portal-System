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

//Complaints Function
let complaintsData = loadComplaints();
let coachesList = loadCoachesForReassignment();
let selectedComplaintId = null;
const complaintDetailsModal = document.getElementById('complaintDetailsModal');

function renderComplaintsTable(complaints) {
    const tableBody = document.getElementById('complaintsTableBody');
    tableBody.innerHTML = '';
    complaints.forEach(complaint => {
        const row = tableBody.insertRow();
        row.style.cursor = 'pointer';
        row.onclick = () => openComplaintDetailsModal(complaint.id);

        const idCell = row.insertCell();
        const dateCell = row.insertCell();
        const clientCell = row.insertCell();
        const subjectCell = row.insertCell();
        const statusCell = row.insertCell();
        const coachCell = row.insertCell();
        const actionsCell = row.insertCell();

        idCell.textContent = complaint.id;
        dateCell.textContent = complaint.dateSubmitted;
        clientCell.textContent = complaint.clientName;
        subjectCell.textContent = complaint.subject;

        const statusSpan = document.createElement('span');
        statusSpan.textContent = complaint.status.replace('_', ' ').toUpperCase();
        statusSpan.className = `status-badge status-${complaint.status}`;
        statusCell.appendChild(statusSpan);

        coachCell.textContent = complaint.coachInvolved || '-';
        actionsCell.classList.add('action-buttons');

        const viewButton = document.createElement('button');
        viewButton.textContent = 'View';
        viewButton.className = 'action-button';
        viewButton.onclick = (event) => {
            event.stopPropagation(); 
            openComplaintDetailsModal(complaint.id);
        };
        actionsCell.appendChild(viewButton);
    });
}

function openComplaintDetailsModal(complaintId) {
    selectedComplaintId = complaintId;
    const complaint = complaintsData.find(c => c.id === complaintId);
    if (complaint) {
        document.getElementById('complaintDetails').innerHTML = `
            <p><strong>Client:</strong> ${complaint.clientName}</p>
            <p><strong>Email:</strong> ${complaint.clientEmail || 'N/A'}</p>
            <p><strong>Subject:</strong> ${complaint.subject}</p>
            <p><strong>Date Submitted:</strong> <span class="math-inline">April 22,2025</p\>
            <p\><strong\>Description\:</strong\><br\></span>Ampangit nya magturo for real, mas bet kopa si john cena sa true lang XD</p>
            <p><strong>Coach Involved:</strong> <span class="math-inline">\Coach Katik Party4U</p\>
            <p\><strong\>Mediation Notes\:</strong\><br\><span id\="currentMediationNotes"\></span>Wala akong meditation mhie</span></p>
        `;
        document.getElementById('complaintStatus').value = complaint.status;
        document.getElementById('mediationNotes').value = complaint.mediationNotes || '';
        complaintDetailsModal.style.display = 'block';
    }
}

function closeComplaintDetailsModal() {
    complaintDetailsModal.style.display = 'none';
    selectedComplaintId = null;
}

function updateComplaintStatus() {
    if (selectedComplaintId) {
        const newStatus = document.getElementById('complaintStatus').value;
        const complaintIndex = complaintsData.findIndex(c => c.id === selectedComplaintId);
        if (complaintIndex !== -1) {
            complaintsData[complaintIndex].status = newStatus;
            saveComplaints();
            renderComplaintsTable(complaintsData);
            openComplaintDetailsModal(selectedComplaintId); 
        }
    } else {
        alert('No complaint selected.');
    }
}

function openReassignClientModal() {
    if (selectedComplaintId) {
        const newCoachDropdown = document.getElementById('newCoach');
        newCoachDropdown.innerHTML = '<option value="">Select New Coach</option>';
        coachesList.forEach(coach => {
            const option = document.createElement('option');
            option.value = coach.id;
            option.textContent = coach.name;
            newCoachDropdown.appendChild(option);
        });
        document.getElementById('reassignClientModal').style.display = 'block';
    } else {
        alert('Please select a complaint first.');
    }
}

function closeReassignClientModal() {
    document.getElementById('reassignClientModal').style.display = 'none';
}

function reassignClient() {
    if (selectedComplaintId) {
        const newCoachId = document.getElementById('newCoach').value;
        if (newCoachId) {
            console.log(`Reassigning client (complaint ID ${selectedComplaintId}) to coach ${newCoachId}`);
            closeReassignClientModal();
            alert('Client reassigned (backend update needed).');
        } else {
            alert('Please select a new coach.');
        }
    } else {
        alert('No complaint selected.');
    }
}

function openIssueWarningModal() {
    if (selectedComplaintId) {
        document.getElementById('issueWarningModal').style.display = 'block';
    } else {
        alert('Please select a complaint first.');
    }
}

function closeIssueWarningModal() {
    document.getElementById('issueWarningModal').style.display = 'none';
    document.getElementById('warningText').value = '';
}

function issueWarning() {
    if (selectedComplaintId) {
        const warningText = document.getElementById('warningText').value.trim();
        if (warningText) {
            const complaint = complaintsData.find(c => c.id === selectedComplaintId);
            const coachId = complaint ? complaint.coachInvolved : null;
            if (coachId) {
                console.log(`Issuing warning to coach ${coachId}: ${warningText}`);
                alert('Warning issued (backend update needed).');
                closeIssueWarningModal();
            } else {
                alert('No coach is associated with this complaint.');
            }
        } else {
            alert('Please enter the warning text.');
        }
    } else {
        alert('No complaint selected.');
    }
}

function saveMediationNotes() {
    if (selectedComplaintId) {
        const notes = document.getElementById('mediationNotes').value;
        const complaintIndex = complaintsData.findIndex(c => c.id === selectedComplaintId);
        if (complaintIndex !== -1) {
            complaintsData[complaintIndex].mediationNotes = notes;
            saveComplaints();
            document.getElementById('currentMediationNotes').textContent = notes || 'No notes yet.';
            alert('Mediation notes saved (local storage only).');
        }
    } else {
        alert('No complaint selected.');
    }
}

// --- Local Storage Simulation ---
function loadComplaints() {
    const storedComplaints = localStorage.getItem('complaints');
    return storedComplaints ? JSON.parse(storedComplaints) : [
        { id: 1, dateSubmitted: '2025-04-19', clientName: 'Alice Smith', clientEmail: 'alice@example.com', subject: 'Issue with Coach Bob', description: 'Coach was late and unprepared.', status: 'new', coachInvolved: 'bob123', mediationNotes: '' },
        { id: 2, dateSubmitted: '2025-04-18', clientName: 'Charlie Brown', clientEmail: 'charlie@example.com', subject: 'Disagreement over session scheduling', description: 'Coach scheduling conflicts.', status: 'in_progress', coachInvolved: 'john456', mediationNotes: 'Spoke with both parties.' },
        { id: 3, dateSubmitted: '2025-04-15', clientName: 'Diana Lee', clientEmail: 'diana@example.com', subject: 'Inappropriate behavior by coach', description: 'Coach made unprofessional comments.', status: 'resolved', coachInvolved: 'bob123', mediationNotes: 'Issued a warning to the coach.' }
    ];
}

function saveComplaints() {
    localStorage.setItem('complaints', JSON.stringify(complaintsData));
}

function loadCoachesForReassignment() {
    return [
        { id: 'john456', name: 'John Cena' },
        { id: 'jane789', name: 'Jane Doe' },
        { id: 'peter101', name: 'Peter Pan' }
    ];
}

renderComplaintsTable(complaintsData);
const complaintDetailsModalElement = document.getElementById('complaintDetailsModal');
if (complaintDetailsModalElement) {
    complaintDetailsModalElement.addEventListener('click', function(event) {
        if (event.target === complaintDetailsModalElement) {
            closeComplaintDetailsModal();
        }
    });
    const closeComplaintDetailsButton = complaintDetailsModalElement.querySelector('.modal-close-button');
    if (closeComplaintDetailsButton) {
        closeComplaintDetailsButton.addEventListener('click', closeComplaintDetailsModal);
    }
}

const reassignClientModalElement = document.getElementById('reassignClientModal');
if (reassignClientModalElement) {
    reassignClientModalElement.addEventListener('click', function(event) {
        if (event.target === reassignClientModalElement) {
            closeReassignClientModal();
        }
    });
    const closeReassignClientButton = reassignClientModalElement.querySelector('.modal-close-button');
    if (closeReassignClientButton) {
        closeReassignClientButton.addEventListener('click', closeReassignClientModal);
    }
}

const issueWarningModalElement = document.getElementById('issueWarningModal');
if (issueWarningModalElement) {
    issueWarningModalElement.addEventListener('click', function(event) {
        if (event.target === issueWarningModalElement) {
            closeIssueWarningModal();
        }
    });
    const closeIssueWarningButton = issueWarningModalElement.querySelector('.modal-close-button');
    if (closeIssueWarningButton) {
        closeIssueWarningButton.addEventListener('click', closeIssueWarningModal);
    }
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

    // Helper functions for showing and hiding the modal
    function showModal(modalElement) {
    modalElement.classList.add('show');
    }

    function hideModal(modalElement) {
    modalElement.classList.remove('show');
    }
});