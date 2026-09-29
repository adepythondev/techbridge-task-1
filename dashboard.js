document.addEventListener("DOMContentLoaded", 
() => {
    const API_URL = 
    "https://techbridge-api-1.onrender.com/api/tasks"; 
    const taskContainer = 
    document.getElementById("dynamic-task-list"); 
    const loadingText = 
    document.getElementById("loadingText"); 
    const errorText = 
    document.getElementById("errorText"); 
    const searchInput = 
    document.getElementById("searchInput"); 
    const noResultsText = 
    document.getElementById("noResultsText"); 
    const filterButtons = 
    document.querySelectorAll(".dash-filter"); 
    if (loadingText) 
    loadingText.style.display = 
    "block"; if (errorText) 
    errorText.style.display = 
    "none"; fetch(API_URL)
        .then(response => { if 
            (!response.ok) 
            throw new 
            Error("Network 
            error connecting to 
            API"); return 
            response.json();
        })
        .then(tasks => { if 
            (loadingText) 
            loadingText.style.display 
            = "none"; 
            renderTasks(tasks); 
            updateProgressStats(tasks);
        })
        .catch(error => { 
            console.error("Fetch 
            error:", error); if 
            (loadingText) 
            loadingText.style.display 
            = "none"; if 
            (errorText) 
            errorText.style.display 
            = "block";
        });
    function renderTasks(tasks) 
    {
        taskContainer.innerHTML 
        = ""; 
        tasks.forEach(task => {
            const statusClass = 
            task.status.toLowerCase().replace(" 
            ", "-");
            
            const card = 
            document.createElement("div"); 
            card.className = 
            "task-card"; 
            card.setAttribute("data-status", 
            statusClass);
            
            card.innerHTML = ` 
                <h3 
                class="task-title">${task.title}</h3> 
                <p 
                class="task-desc" 
                style="margin-bottom: 
                10px;">${task.description}</p> 
                <span 
                style="padding: 
                5px 10px; 
                border-radius: 
                5px; font-size: 
                0.8rem; 
                background: 
                #333; color: 
                #fff;">
                    Status: 
                    <strong>${task.status}</strong>
                </span> `; 
            taskContainer.appendChild(card);
        });
    }
    function 
    updateProgressStats(tasks) 
    {
        const total = 
        tasks.length; const 
        completed = 
        tasks.filter(t => 
        t.status.toLowerCase() 
        === 
        "completed").length; 
        const remaining = total 
        - completed; const 
        percentage = total === 
        0 ? 0 : 
        Math.round((completed / 
        total) * 100); const 
        dashTotal = 
        document.getElementById("dash-total"); 
        const dashCompleted = 
        document.getElementById("dash-completed"); 
        const dashRemaining = 
        document.getElementById("dash-remaining"); 
        const dashPercentage = 
        document.getElementById("dash-percentage"); 
        const dashProgressFill 
        = 
        document.getElementById("dash-progress-fill"); 
        if (dashTotal) 
        dashTotal.innerText = 
        total; if 
        (dashCompleted) 
        dashCompleted.innerText 
        = completed; if 
        (dashRemaining) 
        dashRemaining.innerText 
        = remaining; if 
        (dashPercentage) 
        dashPercentage.innerText 
        = percentage + "%"; if 
        (dashProgressFill) 
        dashProgressFill.style.width 
        = percentage + "%";
    }
    searchInput?.addEventListener("keyup", 
    function() {
        let searchQuery = 
        this.value.toLowerCase(); 
        let taskCards = 
        document.querySelectorAll(".task-card"); 
        let visibleCount = 0; 
        taskCards.forEach(card 
        => {
            let textContent = 
            card.innerText.toLowerCase(); 
            if 
            (textContent.includes(searchQuery)) 
            {
                card.style.display 
                = "block"; 
                visibleCount++;
            } else {
                card.style.display 
                = "none";
            }
        });
        if (noResultsText) { 
            noResultsText.style.display 
            = (visibleCount === 
            0 && searchQuery 
            !== "") ? "block" : 
            "none";
        }
    });
    filterButtons.forEach(btn 
    => {
        btn.addEventListener("click", 
        (e) => {
            filterButtons.forEach(b 
            => 
            b.classList.remove("active")); 
            e.target.classList.add("active"); 
            const filterValue = 
            e.target.getAttribute("data-filter"); 
            const taskCards = 
            document.querySelectorAll(".task-card");
            
            taskCards.forEach(card 
            => {
                if (filterValue 
                === "all" || 
                card.getAttribute("data-status") 
                === 
                filterValue) {
                    card.style.display 
                    = "block";
                } else {
                    card.style.display 
                    = "none";
                }
            });
        });
    });
});
