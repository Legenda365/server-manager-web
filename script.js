// User Authentication
let currentUser = null;
let users = JSON.parse(localStorage.getItem("users") || "{}");
let userConnections = {};
// Initialize
document.addEventListener("DOMContentLoaded", function() {
    checkAuth();
});
function checkAuth() {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainApp();
    } else {
        showLogin();
    }
}

// Authentication Functions
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (users[email] && users[email].password === password) {
        currentUser = { email: email };
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        loadUserData();
        showMainApp();
    } else {
        alert("Неверный email или пароль");
    }
});
function showRegister() {
    const email = prompt("Введите email:");
    const password = prompt("Введите пароль:");
    if (email && password) {
        users[email] = { password: password, connections: {} };
        localStorage.setItem("users", JSON.stringify(users));
        alert("Аккаунт создан! Теперь войдите.");
    }
}
function logout() {
    currentUser = null;
    localStorage.removeItem("currentUser");
    showLogin();
}
function showLogin() {
    document.getElementById("loginScreen").classList.remove("hidden");
    document.getElementById("mainApp").classList.add("hidden");
}
function showMainApp() {
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("mainApp").classList.remove("hidden");
    document.getElementById("userEmail").textContent = currentUser.email;
}
function loadUserData() {
    if (users[currentUser.email] && users[currentUser.email].connections) {
        const connections = users[currentUser.email].connections;
        // Load SSH data
        if (connections.ssh) {
            document.getElementById("sshHost").value = connections.ssh.host || "";
            document.getElementById("sshUser").value = connections.ssh.user || "";
        }
        // Load DB data
        if (connections.db) {
            document.getElementById("dbHost").value = connections.db.host || "";
            document.getElementById("dbName").value = connections.db.name || "";
            document.getElementById("dbUser").value = connections.db.user || "";
        }
    }
}
function saveUserData() {
    if (!currentUser) return;
    const connections = {
        ssh: {
            host: document.getElementById("sshHost").value,
            user: document.getElementById("sshUser").value
        },
        db: {
            host: document.getElementById("dbHost").value,
            name: document.getElementById("dbName").value,
            user: document.getElementById("dbUser").value
        }
    };
    users[currentUser.email].connections = connections;    localStorage.setItem("users", JSON.stringify(users));
}
// Tab Navigation
function showTab(tabName) {
    // Hide all content
    document.querySelectorAll(".content").forEach(content => {
        content.classList.remove("active");
    });
    // Remove active from all tabs
    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.remove("active");
    });
    // Show selected content and tab
    document.getElementById(tabName).classList.add("active");
    event.target.classList.add("active");
}
// Registration System
let isLoginMode = true;
function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    const form = document.getElementById("loginForm");
    const title = document.querySelector(".login-container h1");
    const submitBtn = document.querySelector(".login-container button[type=submit]");
    const toggleLink = document.querySelector(".login-container a");
    if (isLoginMode) {
        title.textContent = "🖥️ Server Manager Pro";
        submitBtn.textContent = "Войти";
        toggleLink.textContent = "Создать аккаунт";
        toggleLink.onclick = () => toggleAuthMode();
    } else {
        title.textContent = "📝 Регистрация";
        submitBtn.textContent = "Зарегистрироваться";
        toggleLink.textContent = "Уже есть аккаунт?";
        toggleLink.onclick = () => toggleAuthMode();
    }
}
// Update login form handler
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (isLoginMode) {
        // Login
        if (users[email] && users[email].password === password) {
            currentUser = { email: email };
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            loadUserData();
            showMainApp();
        } else {
            alert("Неверный email или пароль");
        }
    } else {
        // Registration
        if (users[email]) {
            alert("Пользователь с таким email уже существует");
        } else {
            users[email] = { password: password, connections: {} };
            localStorage.setItem("users", JSON.stringify(users));
            alert("Аккаунт создан! Теперь войдите.");
            toggleAuthMode();
        }
    }
});
// Fix tab navigation
function showTab(tabName) {
    // Hide all content
    document.querySelectorAll(".content").forEach(content => {
        content.classList.remove("active");
    });
    // Remove active from all tabs
    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.remove("active");
    });
    // Show selected content and tab
    document.getElementById(tabName).classList.add("active");
    // Find and activate the clicked tab
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => {
        if (tab.textContent.includes(getTabIcon(tabName))) {
            tab.classList.add("active");
        }
    });
}
function getTabIcon(tabName) {
    const icons = {
        "ssh": "🔧",
        "vpn": "🔒",
        "db": "🗄️",
        "servers": "🖥️"
    };
    return icons[tabName] || "";
}
// Anime Arts Animation
document.addEventListener('DOMContentLoaded', function() {    const animeArts = document.querySelectorAll('.anime-art');
    animeArts.forEach((art, index) => {
        art.style.opacity = '0';
        art.style.transform = 'scale(0.8) translateY(20px)';
        setTimeout(() => {
            art.style.transition = 'all 0.8s ease';
            art.style.opacity = '0.8';
            art.style.transform = 'scale(1) translateY(0)';
        }, index * 200);
    });
});
// Performance optimization for mobile
if (window.innerWidth <= 768) {
    document.querySelector('.winter-bg').style.backgroundImage = 'none';
}
