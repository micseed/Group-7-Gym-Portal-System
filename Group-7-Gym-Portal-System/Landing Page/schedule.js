document.addEventListener('DOMContentLoaded', function() {
    const classesData = [
        { id: 1, name: "Yoga", day: "Monday", time: "9:00 AM", instructor: "Jane Doe", availableSlots: 10 },
        { id: 2, name: "Zumba", day: "Monday", time: "6:00 PM", instructor: "Carlos Garcia", availableSlots: 15 },
        { id: 3, name: "Strength Training", day: "Tuesday", time: "7:00 AM", instructor: "Mike Smith", availableSlots: 8 },
        { id: 4, name: "Cardio Blast", day: "Tuesday", time: "5:00 PM", instructor: "Sarah Lee", availableSlots: 20 },
        { id: 5, name: "Pilates", day: "Wednesday", time: "10:00 AM", instructor: "Jane Doe", availableSlots: 12 },
        { id: 6, name: "Zumba", day: "Wednesday", time: "7:00 PM", instructor: "Carlos Garcia", availableSlots: 18 },
        { id: 7, name: "Yoga", day: "Thursday", time: "6:00 PM", instructor: "Jane Doe", availableSlots: 9 },
        { id: 8, name: "Strength Training", day: "Friday", time: "8:00 AM", instructor: "Mike Smith", availableSlots: 11 },
        { id: 9, name: "Cardio Blast", day: "Saturday", time: "9:30 AM", instructor: "Sarah Lee", availableSlots: 25 },
        { id: 10, name: "Pilates", day: "Sunday", time: "11:00 AM", instructor: "Jane Doe", availableSlots: 14 },
        { id: 11, name: "Web Development 1", day: "Tuesday", time: "11:00 AM", instructor: "Sir Rham", availableSlots: 14 },

    ];

    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const classesListElement = document.getElementById('classes');
    const filterDaySelect = document.getElementById('filter-day');
    const filterClassSelect = document.getElementById('filter-class');
    const bookingModal = document.getElementById('booking-modal');
    const closeModalButton = bookingModal.querySelector('.close-button');
    const modalClassName = document.getElementById('modal-class-name');
    const modalClassDay = document.getElementById('modal-class-day');
    const modalClassTime = document.getElementById('modal-class-time');
    const confirmBookingButton = document.getElementById('confirm-booking-button');
    const bookingMessage = document.getElementById('booking-message');

    let selectedClassId = null;

    if (bookingModal) {
        bookingModal.style.display = 'none';
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('expanded');
        });
    }

    function displayClasses(classes) {
        classesListElement.innerHTML = '';
        if (classes.length === 0) {
            classesListElement.innerHTML = '<p>No classes found matching your criteria.</p>';
            return;
        }
        classes.forEach(cls => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="class-info">
                    <h3>${cls.name}</h3>
                    <p>${cls.day} - ${cls.time} (${cls.instructor})</p>
                    <p>Available Slots: ${cls.availableSlots}</p>
                </div>
                <button class="book-button" data-class-id="${cls.id}">Book Now</button>
            `;
            classesListElement.appendChild(listItem);
        });

        const bookButtons = classesListElement.querySelectorAll('.book-button');
        bookButtons.forEach(button => {
            button.addEventListener('click', function() {
                selectedClassId = parseInt(this.dataset.classId);
                const selectedClass = classesData.find(cls => cls.id === selectedClassId);
                if (selectedClass) {
                    modalClassName.textContent = selectedClass.name;
                    modalClassDay.textContent = selectedClass.day;
                    modalClassTime.textContent = selectedClass.time;
                    bookingMessage.textContent = '';
                    bookingModal.style.display = "block";
                }
            });
        });
    }

    function filterClasses() {
        const selectedDay = filterDaySelect.value;
        const selectedClassType = filterClassSelect.value;

        const filteredClasses = classesData.filter(cls => {
            const dayMatch = !selectedDay || cls.day === selectedDay;
            const classMatch = !selectedClassType || cls.name === selectedClassType;
            return dayMatch && classMatch;
        });

        displayClasses(filteredClasses);
    }

    filterDaySelect.addEventListener('change', filterClasses);
    filterClassSelect.addEventListener('change', filterClasses);

    closeModalButton.addEventListener('click', function() {
        bookingModal.style.display = "none";
    });

    window.addEventListener('click', function(event) {
        if (event.target === bookingModal) {
            bookingModal.style.display = "none";
        }
    });

    confirmBookingButton.addEventListener('click', function() {
        if (selectedClassId) {
            const bookedClass = classesData.find(cls => cls.id === selectedClassId);
            if (bookedClass && bookedClass.availableSlots > 0) {
                bookedClass.availableSlots--;
                bookingMessage.textContent = `You have successfully booked ${bookedClass.name} on ${bookedClass.day} at ${bookedClass.time}.`;
                bookingMessage.className = 'message success';
                displayClasses(classesData);
            } else {
                bookingMessage.textContent = "Sorry, this class is full or no longer available.";
                bookingMessage.className = 'message error';
            }
            selectedClassId = null;
            setTimeout(() => {
                bookingModal.style.display = "none";
            }, 2000);
        } else {
            bookingMessage.textContent = "Please select a class to book.";
            bookingMessage.className = 'message error';
        }
    });

    displayClasses(classesData);
});