let supabaseClient = null;
function getClient() {
    if (!supabaseClient) {
        const supabaseUrl = 'https://iscsvjemonojhlxvptvc.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzY3N2amVtb25vamhseHZwdHZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MDc0OTksImV4cCI6MjA3NjM4MzQ5OX0.GixTbfHBmSvwH3eYP4mtbnCjcUYUbpKwVE966mAYch0';
        supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
    }
    return supabaseClient;
}
function getArgs(key) {
    const args = {};
    for (const [k, v] of new URLSearchParams(window.location.search).entries()) {
        args[k] = v;
    }
    return key ? args[key] : args;
}
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    let scriptPath = currentPath.replace(/\.html$/, '.js');
    if (!scriptPath.endsWith(".js")) scriptPath += ".js";
    const script = document.createElement('script');
    script.src = scriptPath;
    document.head.appendChild(script);
});
