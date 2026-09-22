document.addEventListener("DOMContentLoaded", 
() => {
    /* --- TASK 4: 
    INTERACTIVE TASK 
    TRACKER --- */ 
    const taskCards = 
    document.querySelectorAll(".task-card"); 
    const 
    filterButtons = 
    document.querySelectorAll(".filter-btn"); 
    const progressBar 
    = 
    document.getElementById("progress-bar"); 
    const progressText 
    = 
    document.getElementById("progress-text"); 
    if 
    (taskCards.length 
    > 0) {
        taskCards.forEach((card, 
        index) => {
            const 
            checkbox = 
            card.querySelector(".task-checkbox"); 
            const 
            isCompleted 
            = 
            localStorage.getItem(`task_${index}`) 
            === 
            "true"; if 
            (checkbox) 
            {
                checkbox.checked 
                = 
                isCompleted; 
                if 
                (isCompleted) 
                card.classList.add("completed"); 
                checkbox.addEventListener("change", 
                () => 
                {
                    const 
                    checked 
                    = 
                    checkbox.checked; 
                    localStorage.setItem(`task_${index}`, 
                    checked); 
                    card.classList.toggle("completed", 
                    checked); 
                    updateProgress();
                });
            }
        });
        function 
        updateProgress() 
        {
            const 
            totalTasks 
            = 
            taskCards.length; 
            const 
            completedTasks 
            = 
            document.querySelectorAll(".task-checkbox:checked").length; 
            const 
            percentage 
            = 
            Math.round((completedTasks 
            / 
            totalTasks) 
            * 100); if 
            (progressBar) 
            progressBar.style.width 
            = 
            `${percentage}%`; 
            if 
            (progressText) 
            progressText.textContent 
            = 
            `${completedTasks} 
            of 
            ${totalTasks} 
            Tasks 
            Completed 
            (${percentage}%)`;
        }
        filterButtons.forEach(button 
        => {
            button.addEventListener("click", 
            () => {
                filterButtons.forEach(btn 
                => 
                btn.classList.remove("active")); 
                button.classList.add("active"); 
                const 
                filter 
                = 
                button.getAttribute("data-filter"); 
                taskCards.forEach(card 
                => {
                    const 
                    badge 
                    = 
                    card.querySelector(".task-badge"); 
                    const 
                    isCompleted 
                    = 
                    card.classList.contains("completed"); 
                    if 
                    (filter 
                    === 
                    "all") 
                    {
                        card.style.display 
                        = 
                        "block";
                    } else 
                    } if 
                    } (filter 
                    } === 
                    } "completed") 
                    } {
                        card.style.display 
                        = 
                        isCompleted 
                        ? 
                        "block" 
                        : 
                        "none";
                    } else 
                    } if 
                    } (badge 
                    } && 
                    } badge.classList.contains(filter)) 
                    } {
                        card.style.display 
                        = 
                        "block";
                    } else 
                    } {
                        card.style.display 
                        = 
                        "none";
                    }
                });
            });
        });
        updateProgress();
    }
    /* --- TASK 5: 
    INTERN 
    REGISTRATION 
    VALIDATION --- */ 
    const regForm = 
    document.getElementById("registration-form"); 
    if (regForm) {
        const 
        fullnameInput 
        = 
        document.getElementById("fullname"); 
        const 
        emailInput = 
        document.getElementById("email"); 
        const 
        trackInput = 
        document.getElementById("track"); 
        const 
        githubInput = 
        document.getElementById("github"); 
        const 
        successBox = 
        document.getElementById("success-message"); 
        regForm.addEventListener("submit", 
        (e) => {
            e.preventDefault(); 
            let 
            isValid = 
            true; if 
            (fullnameInput.value.trim().length 
            < 3) {
                showError(fullnameInput, 
                "fullname-error", 
                "Please 
                enter 
                your 
                full 
                name 
                (at 
                least 
                3 
                characters)."); 
                isValid 
                = 
                false;
            } else {
                clearError(fullnameInput, 
                "fullname-error");
            }
            const 
            emailValue 
            = 
            emailInput.value.trim(); 
            const 
            emailRegex 
            = 
            /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/; 
            if 
            (!emailRegex.test(emailValue)) 
            {
                showError(emailInput, 
                "email-error", 
                "Enter 
                a 
                valid 
                email 
                address 
                using 
                lowercase 
                letters."); 
                isValid 
                = 
                false;
            } else {
                clearError(emailInput, 
                "email-error");
            }
            if 
            (trackInput.value 
            === "") {
                showError(trackInput, 
                "track-error", 
                "Please 
                select 
                an 
                internship 
                track."); 
                isValid 
                = 
                false;
            } else {
                clearError(trackInput, 
                "track-error");
            }
            const 
            githubValue 
            = 
            githubInput.value.trim(); 
            const 
            urlRegex = 
            /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/; 
            if 
            (!urlRegex.test(githubValue)) 
            {
                showError(githubInput, 
                "github-error", 
                "Enter 
                a 
                valid 
                GitHub 
                profile 
                URL."); 
                isValid 
                = 
                false;
            } else {
                clearError(githubInput, 
                "github-error");
            }
            if 
            (isValid) 
            {
                regForm.classList.add("hidden"); 
                successBox.classList.remove("hidden"); 
                localStorage.setItem("techbridge_registered", 
                "true");
            }
        });
    }
    /* --- TASK 6: 
    TASK SUBMISSION 
    SYSTEM --- */ 
    const subForm = 
    document.getElementById("submission-form"); 
    const historyList 
    = 
    document.getElementById("submission-history-list"); 
    if (subForm) {
        const 
        emailInput = 
        document.getElementById("sub-email"); 
        const 
        taskInput = 
        document.getElementById("sub-task"); 
        const 
        githubInput = 
        document.getElementById("sub-github"); 
        const 
        netlifyInput = 
        document.getElementById("sub-netlify"); 
        const 
        notesInput = 
        document.getElementById("sub-notes"); 
        const 
        successBox = 
        document.getElementById("submit-success-message"); 
        const 
        submitAnotherBtn 
        = 
        document.getElementById("submit-another-btn"); 
        loadSubmissionHistory(); 
        subForm.addEventListener("submit", 
        (e) => {
            e.preventDefault(); 
            let 
            isValid = 
            true; 
            const 
            emailValue 
            = 
            emailInput.value.trim(); 
            const 
            emailRegex 
            = 
            /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/; 
            if 
            (!emailRegex.test(emailValue)) 
            {
                showError(emailInput, 
                "sub-email-error", 
                "Please 
                enter 
                a 
                valid 
                lowercase 
                email 
                address."); 
                isValid 
                = 
                false;
            } else {
                clearError(emailInput, 
                "sub-email-error");
            }
            if 
            (taskInput.value 
            === "") {
                showError(taskInput, 
                "sub-task-error", 
                "Please 
                select 
                the 
                task 
                you 
                are 
                submitting."); 
                isValid 
                = 
                false;
            } else {
                clearError(taskInput, 
                "sub-task-error");
            }
            const 
            githubValue 
            = 
            githubInput.value.trim(); 
            const 
            githubRegex 
            = 
            /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?.*/; 
            if 
            (!githubRegex.test(githubValue)) 
            {
                showError(githubInput, 
                "sub-github-error", 
                "Provide 
                a 
                valid 
                GitHub 
                repository 
                URL."); 
                isValid 
                = 
                false;
            } else {
                clearError(githubInput, 
                "sub-github-error");
            }
            const 
            netlifyValue 
            = 
            netlifyInput.value.trim(); 
            const 
            netlifyRegex 
            = 
            /^(https?:\/\/)?([a-zA-Z0-9-]+)\.netlify\.app\/?$/; 
            if 
            (!netlifyRegex.test(netlifyValue)) 
            {
                showError(netlifyInput, 
                "sub-netlify-error", 
                "Provide 
                a 
                valid 
                Netlify 
                URL 
                ending 
                in 
                .netlify.app."); 
                isValid 
                = 
                false;
            } else {
                clearError(netlifyInput, 
                "sub-netlify-error");
            }
            if 
            (notesInput.value.trim().length 
            < 10) {
                showError(notesInput, 
                "sub-notes-error", 
                "Developer 
                notes 
                must 
                be at 
                least 
                10 
                characters 
                long."); 
                isValid 
                = 
                false;
            } else {
                clearError(notesInput, 
                "sub-notes-error");
            }
            if 
            (isValid) 
            {
                const 
                submissionData 
                = {
                    email: 
                    emailValue, 
                    task: 
                    taskInput.value, 
                    github: 
                    githubValue, 
                    netlify: 
                    netlifyValue, 
                    notes: 
                    notesInput.value.trim(), 
                    timestamp: 
                    new 
                    Date().toLocaleString()
                };
                saveSubmission(submissionData); 
                subForm.classList.add("hidden"); 
                successBox.classList.remove("hidden"); 
                loadSubmissionHistory();
            }
        });
        if 
        (submitAnotherBtn) 
        {
            submitAnotherBtn.addEventListener("click", 
            () => {
                subForm.reset(); 
                subForm.classList.remove("hidden"); 
                successBox.classList.add("hidden");
            });
        }
    }
    function 
    saveSubmission(submission) 
    {
        let 
        submissions = 
        JSON.parse(localStorage.getItem("techbridge_submissions")) 
        || [];
        submissions.unshift(submission); 
        localStorage.setItem("techbridge_submissions", 
        JSON.stringify(submissions));
    }
    function 
    loadSubmissionHistory() 
    {
        if 
        (!historyList) 
        return; const 
        submissions = 
        JSON.parse(localStorage.getItem("techbridge_submissions")) 
        || [];
        if 
        (submissions.length 
        === 0) {
            historyList.innerHTML 
            = `<p 
            class="no-submissions">No 
            submissions 
            recorded 
            on this 
            device 
            yet.</p>`; 
            return;
        }
        historyList.innerHTML 
        = 
        submissions.map(item 
        => `
            <div 
            class="submission-card">
                <div 
                class="submission-card-header">
                    <span 
                    class="sub-task-title">${item.task}</span> 
                    <span 
                    class="sub-time">${item.timestamp}</span>
                </div> 
                <p><strong>Email:</strong> 
                ${item.email}</p> 
                <p><strong>GitHub:</strong> 
                <a 
                href="${item.github}" 
                target="_blank">${item.github}</a></p> 
                <p><strong>Netlify:</strong> 
                <a 
                href="${item.netlify}" 
                target="_blank">${item.netlify}</a></p> 
                <p 
                class="sub-notes-text"><strong>Notes:</strong> 
                ${item.notes}</p>
            </div> 
        `).join("");
    }
    function 
    showError(input, 
    errorId, message) 
    {
        input.classList.add("input-error");
        
