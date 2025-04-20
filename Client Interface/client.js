document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('expanded');
        });
    }

    // static notification data
    const notificationsData = [
        { title: 'Today, 4:00 PM', message: 'You have a session scheduled.' },
        { title: 'New Request', message: 'Namjoon has requested a session with you.' },
        { title: 'Reminder', message: 'Don\'t forget to track your meals today!' }
    ];

    const notificationIcon = document.getElementById('notification-icon');
    const notificationBadge = document.getElementById('notification-badge');
    const notificationsDropdown = document.getElementById('notifications-dropdown');
    const notificationList = document.getElementById('notification-list');

    function displayNotifications() {
        notificationList.innerHTML = '';
        if (notificationsData.length > 0) {
            notificationBadge.style.display = 'block';
            notificationBadge.textContent = notificationsData.length;
            notificationsData.forEach(notification => {
                const notificationItem = document.createElement('div');
                notificationItem.classList.add('notification-item');
                notificationItem.innerHTML = `
                    <div class="notification-item title">${notification.title}</div>
                    <div class="notification-item message">${notification.message}</div>
                    <hr>
                `;
                notificationList.appendChild(notificationItem);
            });

            const lastHr = notificationList.querySelector('hr:last-child');
            if (lastHr) {
                lastHr.remove();
            }
        } else {
            notificationBadge.style.display = 'none';
            notificationList.innerHTML = '<div class="notification-item message">No new notifications.</div>';
        }
    }

    displayNotifications();

    notificationIcon.addEventListener('click', function() {
        notificationsDropdown.style.display = (notificationsDropdown.style.display === 'block' ? 'none' : 'block');
        notificationBadge.style.display = 'none';
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.notification-container')) {
            notificationsDropdown.style.display = 'none';
        }
    });

    // static message data
    const messagesData = [
        { sender: 'Reminder', subject: 'This is a reminder that your next session', content: 'Hi Micah, I had a question about the new workout plan...' },
        { sender: 'System', subject: 'Welcome to ENERGIZE!', content: 'Thank you for joining our gym center!' }
    ];

    const mailIconInbox = document.getElementById('mail-icon-inbox');
    const unreadNotification = document.getElementById('unread-notification');
    const inboxPreview = document.getElementById('inbox-preview');
    const unreadMessagesDiv = document.getElementById('unread-messages');
    const readMessagesDiv = document.getElementById('read-messages');
    let unreadCount = messagesData.length;

    function displayMessages() {
        unreadMessagesDiv.innerHTML = '';
        readMessagesDiv.innerHTML = '';

        if (unreadCount > 0) {
            unreadNotification.style.display = 'block';
            unreadNotification.textContent = unreadCount;
        } else {
            unreadNotification.style.display = 'none';
        }

        messagesData.forEach((message, index) => {
            const messageItem = document.createElement('div');
            messageItem.classList.add('email-item');
            messageItem.innerHTML = `
                <div class="email-item sender">${message.sender}</div>
                <div class="email-item subject">${message.subject}</div>
                <hr>
            `;
            if (index < unreadCount) {
                unreadMessagesDiv.appendChild(messageItem);
            } else {
                readMessagesDiv.appendChild(messageItem);
            }
        });

        const lastUnreadHr = unreadMessagesDiv.querySelector('hr:last-child');
        if (lastUnreadHr) {
            lastUnreadHr.remove();
        }
        const lastReadHr = readMessagesDiv.querySelector('hr:last-child');
        if (lastReadHr) {
            lastReadHr.remove();
        }
    }

    displayMessages(); 

    mailIconInbox.addEventListener('click', function() {
        inboxPreview.style.display = (inboxPreview.style.display === 'block' ? 'none' : 'block');

        if (unreadCount > 0 && inboxPreview.style.display === 'block') {
            unreadCount = 0;
            displayMessages();
            console.log('Mail icon clicked - marking as read');
        }
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mail-container')) {
            inboxPreview.style.display = 'none';
        }
    });
});