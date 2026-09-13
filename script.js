document.addEventListener("DOMContentLoaded", 
() => {
    const taskCards = 
    document.querySelectorAll(".task-card"); 
    const filterButtons = 
    document.querySelectorAll(".filter-btn"); 
    const progressBar = 
    document.getElementById("progress-bar"); 
    const progressText = 
    document.getElementById("progress-text");
    // Load saved completion 
    // states from localStorage
    taskCards.forEach((card, 
    index) => {
        const checkbox = 
        card.querySelector(".task-checkbox"); 
        const isCompleted = 
        localStorage.getItem(`task_${index}`) 
        === "true"; if 
        (checkbox) {
            checkbox.checked = 
            isCompleted; if 
            (isCompleted) {
                card.classList.add("completed");
            }
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
    // Update progress bar
    function updateProgress() { 
        const totalTasks = 
        taskCards.length; const 
        completedTasks = 
        document.querySelectorAll(".task-checkbox:checked").length; 
        const percentage = 
        Math.round((completedTasks 
        / totalTasks) * 100); 
        if (progressBar) 
        progressBar.style.width 
        = `${percentage}%`; if 
        (progressText) 
        progressText.textContent 
        = `${completedTasks} of 
        ${totalTasks} Tasks 
        Completed 
        (${percentage}%)`;
    }
    // Filter tasks by 
    // difficulty or status
    filterButtons.forEach(button 
    => {
        button.addEventListener("click", 
        () => {
            filterButtons.forEach(btn 
            => 
            btn.classList.remove("active")); 
            button.classList.add("active"); 
            const filter = 
            button.getAttribute("data-filter"); 
            taskCards.forEach(card 
            => {
                const badge = 
                card.querySelector(".task-badge"); 
                const 
                isCompleted = 
                card.classList.contains("completed"); 
                if (filter === 
                "all") {
                    card.style.display 
                    = "block";
                } else if 
                } (filter === 
                } "completed") 
                } {
                    card.style.display 
                    = 
                    isCompleted 
                    ? "block" : 
                    "none";
                } else if 
                } (badge && 
                } badge.classList.contains(filter)) 
                } {
                    card.style.display 
                    = "block";
                } else {
                    card.style.display 
                    = "none";
                }
            });
        });
    });
    // Initialize progress 
    // calculation on page load
    updateProgress();
});
