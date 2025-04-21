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

//Message Section
const mainMessageBody = document.getElementById('main-message-body');
const mainMessageInput = document.getElementById('main-message-input');
const mainSendBtn = document.getElementById('main-send-btn');
const chatListSidebar = document.querySelector('.chat-list-sidebar');

let currentChatId = null;

const messages = {
    'micah': [
        { sender: 'them', text: 'Hi, This is Micah' },
        { sender: 'them', text: 'I need to hear your suggestion...' },
        { sender: 'them', type: 'image', url: 'diet.jpg' },
        { sender: 'them', text: 'Is this a good diet intake for my fitness goal?' }
    ],
    'pusasuit': [],
    'ninasakses': [],
    'patricia': [],
    'sigma': [
        { sender: 'them', text: 'Hi Coach I want to book a session with you!' }
    ]
};

function displayMessages(chatId) {
    mainMessageBody.innerHTML = '';
    currentChatId = chatId;
    const currentMessages = messages[chatId] || [];
    currentMessages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', msg.sender === 'them' ? 'received-msg' : 'sent-msg');
        const bubbleDiv = document.createElement('div');
        bubbleDiv.classList.add('msg-bubble');
        if (msg.type === 'image') {
            const img = document.createElement('img');
            img.src = msg.url;
            bubbleDiv.appendChild(img);
        } else {
            bubbleDiv.textContent = msg.text;
        }
        messageDiv.appendChild(bubbleDiv);
        mainMessageBody.appendChild(messageDiv);
        scrollToBottom();
    });
}

chatListSidebar.addEventListener('click', (event) => {
    const chatItem = event.target.closest('.chat-item');
    if (chatItem) {
        const activeChat = document.querySelector('.chat-item.active-chat');
        if (activeChat) activeChat.classList.remove('active-chat');
        chatItem.classList.add('active-chat');

        const chatId = chatItem.querySelector('.username').textContent.toLowerCase().replace(/\s/g, '');
        displayMessages(chatId);

        const username = chatItem.querySelector('.username').textContent;
        const chatPic = chatItem.querySelector('img');
        const chatInitials = chatItem.querySelector('.initials');

        const chatHeaderUsername = document.querySelector('.chat-header .user-details .username');
        const headerPicContainer = document.querySelector('.chat-header .profile-pic');

        if (chatHeaderUsername) chatHeaderUsername.textContent = username;

        if (headerPicContainer) {
            headerPicContainer.innerHTML = '';

            if (chatPic) {
                const img = document.createElement('img');
                img.src = chatPic.src;
                img.alt = username;
                headerPicContainer.appendChild(img);
            } else if (chatInitials) {
                const span = document.createElement('span');
                span.classList.add('initials');
                span.textContent = chatInitials.textContent;
                headerPicContainer.appendChild(span);
            }
        }
    }
});

mainSendBtn.addEventListener('click', () => {
    const messageText = mainMessageInput.value.trim();
    if (messageText !== '' && currentChatId) {
        messages[currentChatId].push({ sender: 'me', text: messageText });

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'sent-msg');
        const bubbleDiv = document.createElement('div');
        bubbleDiv.classList.add('msg-bubble');
        bubbleDiv.textContent = messageText;
        messageDiv.appendChild(bubbleDiv);
        mainMessageBody.appendChild(messageDiv);
        mainMessageInput.value = '';
        scrollToBottom();

        setTimeout(() => {
            const replyText = generateReply(messageText);
            messages[currentChatId].push({ sender: 'them', text: replyText });
            const replyDiv = document.createElement('div');
            replyDiv.classList.add('message', 'received-msg');
            const replyBubble = document.createElement('div');
            replyBubble.classList.add('msg-bubble');
            replyBubble.textContent = replyText;
            replyDiv.appendChild(replyBubble);
            mainMessageBody.appendChild(replyDiv);
            scrollToBottom();
        }, 1000);
    }
});

function generateReply(incomingMessage) {
    incomingMessage = incomingMessage.toLowerCase();
    if (incomingMessage.includes('hello') || incomingMessage.includes('hi')) {
        return 'Hello there!';
    } else if (incomingMessage.includes('how are you')) {
        return 'I\'m doing well, thank you for asking!';
    } else if (incomingMessage.includes('workout')) {
        return 'Sounds like a great session!';
    } else {
        const replies = [
            'Got it.',
            'Interesting!',
            'Thanks for the update.',
            'Okay, noted.',
            'Understood.'
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    }
}

function scrollToBottom() {
    mainMessageBody.scrollTop = mainMessageBody.scrollHeight;
}

// Initialize first chat
const firstChatItem = document.querySelector('.chat-item');
if (firstChatItem) {
    firstChatItem.classList.add('active-chat');
    const firstChatId = firstChatItem.querySelector('.username').textContent.toLowerCase().replace(/\s/g, '');
    displayMessages(firstChatId);

    const username = firstChatItem.querySelector('.username').textContent;
    const chatPic = firstChatItem.querySelector('img');
    const chatInitials = firstChatItem.querySelector('.initials');

    const chatHeaderUsername = document.querySelector('.chat-header .user-details .username');
    const headerPicContainer = document.querySelector('.chat-header .profile-pic');

    if (chatHeaderUsername) chatHeaderUsername.textContent = username;

    if (headerPicContainer) {
        headerPicContainer.innerHTML = '';

        if (chatPic) {
            const img = document.createElement('img');
            img.src = chatPic.src;
            img.alt = username;
            headerPicContainer.appendChild(img);
        } else if (chatInitials) {
            const span = document.createElement('span');
            span.classList.add('initials');
            span.textContent = chatInitials.textContent;
            headerPicContainer.appendChild(span);
        }
    }
}

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