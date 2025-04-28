document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const getStartedModal = document.getElementById("getStartedModal");
    const getStartedBtn = document.querySelector(".getstarted");
    const closeBtn = document.querySelector(".get-started-close");
    const continueBtn = document.getElementById("continueBtn");
    const choiceOptions = document.querySelectorAll(".get-started-choice");
    
    let selectedOption = null;
    
    // Modify the Get Started button to open modal instead of redirecting
    if (getStartedBtn) {
        // Remove the existing anchor if present
        if (getStartedBtn.querySelector('a')) {
            const btnText = getStartedBtn.querySelector('a').textContent;
            getStartedBtn.innerHTML = btnText;
        }
        
        // Add click event to open modal
        getStartedBtn.addEventListener("click", function(e) {
            e.preventDefault(); // Prevent any default action
            getStartedModal.style.display = "block";
        });
    }
    
    // Close modal when X is clicked
    closeBtn.addEventListener("click", function() {
        getStartedModal.style.display = "none";
    });
    
    // Close modal when clicking outside the modal
    window.addEventListener("click", function(event) {
        if (event.target === getStartedModal) {
            getStartedModal.style.display = "none";
        }
    });
    
    // Handle choice selection
    choiceOptions.forEach(choice => {
        choice.addEventListener("click", function() {
            // Remove selected class from all choices
            choiceOptions.forEach(option => {
                option.classList.remove("selected");
            });
            
            // Add selected class to the clicked choice
            this.classList.add("selected");
            selectedOption = this.getAttribute("data-type");
        });
    });
    
    // Handle continue button click
    continueBtn.addEventListener("click", function() {
        if (selectedOption) {
            if (selectedOption === "member") {
                // Redirect to register page
                window.location.href = "register.html";
            } else if (selectedOption === "guest") {
                // Redirect to guest registration page (also using register.html)
                window.location.href = "register.html?type=guest";
            }
        } else {
            alert("Please select an option to continue");
        }
    });
});