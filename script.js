document.addEventListener("DOMContentLoaded", 
() => {
    /* --- TASK 4: INTERACTIVE TASK TRACKER 
    --- */ const taskCards = 
    document.querySelectorAll(".task-card"); 
    const filterButtons = 
    document.querySelectorAll(".filter-btn"); 
    const progressBar = 
    document.getElementById("progress-bar"); 
    const progressText = 
    document.getElementById("progress-text"); 
    if (taskCards.length > 0) {
        taskCards.forEach((card, index) => { 
            const checkbox = 
            card.querySelector(".task-checkbox"); 
            const isCompleted = 
            localStorage.getItem(`task_${index}`) 
            === "true"; if (checkbox) {
                checkbox.checked = 
                isCompleted; if (isCompleted) 
                card.classList.add("completed"); 
                checkbox.addEventListener("change", 
                () => {
                    const checked = 
                    checkbox.checked; 
                    localStorage.setItem(`task_${index}`, 
                    checked); 
                    card.classList.toggle("completed", 
                    checked); 
                    updateProgress();
                });
            }
        });
        function updateProgress() { const 
            totalTasks = taskCards.length; 
            const completedTasks = 
            document.querySelectorAll(".task-checkbox:checked").length; 
            const percentage = 
            Math.round((completedTasks / 
            totalTasks) * 100); if 
            (progressBar) 
            progressBar.style.width = 
            `${percentage}%`; if 
            (progressText) 
            progressText.textContent = 
            `${completedTasks} of 
            ${totalTasks} Tasks Completed 
            (${percentage}%)`;
        }
        filterButtons.forEach(button => { 
            button.addEventListener("click", 
            () => {
                filterButtons.forEach(btn => 
                btn.classList.remove("active")); 
                button.classList.add("active"); 
                const filter = 
                button.getAttribute("data-filter"); 
                taskCards.forEach(card => {
                    const badge = 
                    card.querySelector(".task-badge"); 
                    const isCompleted = 
                    card.classList.contains("completed"); 
                    if (filter === "all") {
                        card.style.display = 
                        "block";
                    } else if (filter === 
                    } "completed") {
                        card.style.display = 
                        isCompleted ? "block" 
                        : "none";
                    } else if (badge && 
                    } badge.classList.contains(filter)) 
                    } {
                        card.style.display = 
                        "block";
                    } else {
                        card.style.display = 
                        "none";
                    }
                });
            });
        });
        updateProgress();
    }
    /* --- TASK 5: FORM VALIDATION --- */ 
    const form = 
    document.getElementById("registration-form"); 
    if (form) {
        const fullnameInput = 
        document.getElementById("fullname"); 
        const emailInput = 
        document.getElementById("email"); 
        const trackInput = 
        document.getElementById("track"); 
        const githubInput = 
        document.getElementById("github"); 
        const successBox = 
        document.getElementById("success-message"); 
        form.addEventListener("submit", (e) => 
        {
            e.preventDefault(); let isValid = 
            true;
            // Full Name Validation
            if 
            (fullnameInput.value.trim().length 
            < 3) {
                showError(fullnameInput, 
                "fullname-error", "Please 
                enter your full name (at least 
                3 characters)."); isValid = 
                false;
            } else {
                clearError(fullnameInput, 
                "fullname-error");
            }
            // Email Validation (enforce 
            // lowercase & valid pattern)
            const emailValue = 
            emailInput.value.trim(); const 
            emailRegex = 
            /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/; 
            if (!emailRegex.test(emailValue)) 
            {
                showError(emailInput, 
                "email-error", "Enter a valid 
                email address using lowercase 
                letters."); isValid = false;
            } else {
                clearError(emailInput, 
                "email-error");
            }
            // Track Selection Validation
            if (trackInput.value === "") { 
                showError(trackInput, 
                "track-error", "Please select 
                an internship track."); 
                isValid = false;
            } else {
                clearError(trackInput, 
                "track-error");
            }
            // GitHub URL Validation
            const githubValue = 
            githubInput.value.trim(); const 
            urlRegex = 
            /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/; 
            if (!urlRegex.test(githubValue)) {
                showError(githubInput, 
                "github-error", "Enter a valid 
                GitHub profile URL (e.g. 
                https://github.com/username)."); 
                isValid = false;
            } else {
                clearError(githubInput, 
                "github-error");
            }
            // Success Action
            if (isValid) { 
                form.classList.add("hidden"); 
                successBox.classList.remove("hidden"); 
                localStorage.setItem("techbridge_registered", 
                "true");
            }
        });
   
