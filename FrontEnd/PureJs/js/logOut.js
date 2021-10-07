function logOut()
{
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alert("welcome Back");
    window.location.href = "http://127.0.0.1:5500/index.html";
}

function AdminlogOut()
{
    document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alert("welcome Back");
    window.location.href = "http://127.0.0.1:5500/index.html";
}