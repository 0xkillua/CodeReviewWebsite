// public/js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const repoList = document.getElementById('repo-list');
    const repoCount = document.getElementById('repo-count');
    
    // Get repositories from GitHub API
    async function getRepositories(username) {
        try {
            repoList.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Loading repositories...</p>
                </div>
            `;
            
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch repositories');
            }
            
            const repositories = await response.json();
            
            if (repositories.length === 0) {
                repoList.innerHTML = `
                    <div class="loading">
                        <p>No repositories found</p>
                    </div>
                `;
                return;
            }
            
            repoCount.textContent = `${repositories.length} repos`;
            repoList.innerHTML = '';
            
            repositories.forEach(repo => {
                const repoCard = document.createElement('div');
                repoCard.className = 'repo-card';
                
                repoCard.innerHTML = `
                    <div class="repo-info">
                        <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.name}</a>
                        <p class="repo-desc">${repo.description || ''}</p>
                    </div>
                    <div class="repo-links">
                        <a href="${repo.html_url}" target="_blank" class="repo-link visit-link">Visit</a>
                        <span class="repo-link stars-badge">⭐ ${repo.stargazers_count}</span>
                    </div>
                `;
                
                repoList.appendChild(repoCard);
            });
        } catch (error) {
            console.error(error);
            repoList.innerHTML = `
                <div class="loading">
                    <p>Error loading repositories</p>
                </div>
            `;
        }
    }
    
    // Check if user is authenticated
    if (typeof currentUser !== 'undefined') {
        getRepositories(currentUser);
    }
});