document.addEventListener("DOMContentLoaded", () => {

    // 8 Internship Tasks Data Structure
    const tasksData = [
        { id: 1, day: "Day 1", title: "Task 1: Build the TechBridge Homepage", category: "beginner", status: "completed", desc: "Construct a clean, responsive landing page using semantic HTML5 and CSS3." },
        { id: 2, day: "Day 4", title: "Task 2: Build the Programs Experience", category: "beginner", status: "completed", desc: "Multi-page site featuring interactive program comparison cards." },
        { id: 3, day: "Day 8", title: "Task 3: Build the Internship Tasks Experience", category: "beginner", status: "completed", desc: "Visual roadmap displaying all 8 internship milestones and timelines." },
        { id: 4, day: "Day 11", title: "Task 4: Build an Interactive Task Tracker", category: "intermediate", status: "completed", desc: "Implement dynamic filtering and progress tracking using DOM manipulation." },
        { id: 5, day: "Day 15", title: "Task 5: Build the Intern Registration Experience", category: "intermediate", status: "completed", desc: "User registration flow with client-side form validation and Regex checks." },
        { id: 6, day: "Day 19", title: "Task 6: Build the TechBridge Intern Dashboard", category: "intermediate", status: "in-progress", desc: "Personal analytics dashboard rendering submission metrics and tech explorer." },
        { id: 7, day: "Day 22", title: "Task 7: Build Advanced Web Applications", category: "advanced", status: "not-started", desc: "Engineer stateful React/Next.js frontend applications." },
        { id: 8, day: "Day 26", title: "Task 8: Final Capstone Deployment", category: "advanced", status: "not-started", desc: "Complete end-to-end multi-page platform integration and deployment." }
    ];

    // Load saved statuses from localStorage
    tasksData.forEach((task, index) => {
        const savedStatus = localStorage.getItem(`dash_task_${task.id}`);
        if (savedStatus) {
            task.status = savedStatus;
        }
    });

    const taskListContainer = document.getElementById("dynamic-task-list");
    const filterButtons = document.querySelectorAll(".dash-filter");

    function renderTasks(filter = "all") {
        if (!taskListContainer) return;
        taskListContainer.innerHTML = "";

        const filtered = tasksData.filter(t => {
            if (filter === "all") return true;
            return t.status === filter;
        });

        if (filtered.length === 0) {
            taskListContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #94a3b8;">No tasks found for this status.</p>`;
            return;
        }

        filtered.forEach(task => {
            const card = document.createElement("div");
            card.className = `task-card ${task.status === "completed" ? "completed" : ""}`;
            
            let statusBadgeColor = "#94a3b8";
            if (task.status === "completed") statusBadgeColor = "#4ade80";
            if (task.status === "in-progress") statusBadgeColor = "#facc15";
            if (task.status === "not-started") statusBadgeColor = "#f87171";

            card.innerHTML = `
                <div class="task-card-header">
                    <span class="task-badge ${task.category}">${task.category}</span>
                    <span style="font-size: 0.8rem; font-weight:700; color:${statusBadgeColor}; text-transform:uppercase;">${task.status.replace("-", " ")}</span>
                </div>
                <span class="task-day">${task.day}</span>
                <h3>${task.title}</h3>
                <p>${task.desc}</p>
                <div style="margin-top:1rem; display:flex; gap:0.5rem;">
                    <button class="btn-primary toggle-status-btn" data-id="${task.id}" style="padding:0.4rem 0.8rem; font-size:0.85rem;">
                        ${task.status === "completed" ? "Mark Incomplete" : "Mark as Completed"}
                    </button>
                    <a href="tasks.html" class="filter-btn" style="text-decoration:none; display:inline-block; font-size:0.85rem;">View Task</a>
                </div>
            `;
            taskListContainer.appendChild(card);
        });

        attachToggleListeners();
        updateDashboardMetrics();
    }

    function attachToggleListeners() {
        document.querySelectorAll(".toggle-status-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const taskId = parseInt(e.target.getAttribute("data-id"));
                const targetTask = tasksData.find(t => t.id === taskId);
                
                if (targetTask) {
                    targetTask.status = targetTask.status === "completed" ? "in-progress" : "completed";
                    localStorage.setItem(`dash_task_${taskId}`, targetTask.status);
                    
                    const activeFilter = document.querySelector(".dash-filter.active")?.getAttribute("data-filter") || "all";
                    renderTasks(activeFilter);
                }
            });
        });
    }

    function updateDashboardMetrics() {
        const total = tasksData.length;
        const completed = tasksData.filter(t => t.status === "completed").length;
        const remaining = total - completed;
        const percentage = Math.round((completed / total) * 100);

        document.getElementById("dash-total").textContent = total;
        document.getElementById("dash-completed").textContent = completed;
        document.getElementById("dash-remaining").textContent = remaining;
        document.getElementById("dash-percentage").textContent = `${percentage}%`;
        document.getElementById("dash-progress-fill").style.width = `${percentage}%`;
    }

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderTasks(btn.getAttribute("data-filter"));
        });
    });

    /* --- INTERACTIVE TECHNOLOGY EXPLORER --- */
    const techData = {
        nextjs: {
            title: "Next.js (React Framework)",
            desc: "Next.js is a powerful React framework enabling server-side rendering (SSR), static site generation (SSG), and built-in API routes for production React apps.",
            features: ["Server-Side Rendering (SSR)", "App Router Navigation", "Automatic Code Splitting", "SEO Optimization"]
        },
        vue: {
            title: "Vue.js (Progressive JS Framework)",
            desc: "Vue.js offers an approachable, performant, and versatile framework for building user interfaces with a clear template syntax and reactive state system.",
            features: ["Reactivity System", "Single File Components (.vue)", "Virtual DOM", "Easy Integration"]
        },
        angular: {
            title: "Angular (TypeScript Platform)",
            desc: "Angular is Google's enterprise-grade platform featuring strong TypeScript support, dependency injection, and a full solution for large web applications.",
            features: ["Two-Way Data Binding", "Dependency Injection", "RxJS Observables", "Comprehensive CLI"]
        },
        backend: {
            title: "Backend Development Ecosystem",
            desc: "Backend tech powers server architecture, database management, and API REST endpoints using technologies like Node.js, Express, Django, and PostgreSQL.",
            features: ["RESTful API & GraphQL", "Database Management (PostgreSQL/MongoDB)", "Authentication & Security", "Server Deployment & Docker"]
        }
    };

    const techTabs = document.querySelectorAll(".tech-tab");
    const techPanel = document.getElementById("tech-content-panel");

    function renderTechContent(key) {
        const data = techData[key];
        if (!data || !techPanel) return;

        techPanel.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.desc}</p>
            <ul style="margin-top:1rem; padding-left:1.2rem;">
                ${data.features.map(f => `<li style="color:#38bdf8; margin-bottom:0.4rem;"><span style="color:#ffffff;">${f}</span></li>`).join("")}
            </ul>
        `;
    }

    techTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            techTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            renderTechContent(tab.getAttribute("data-tech"));
        });
    });

    // Initializations
    renderTasks("all");
    renderTechContent("nextjs");
});
