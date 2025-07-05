// main.js
async function fetchGoogleSheetData(sheetId) {
    try {
        const response = await fetch(`https://opensheet.elk.sh/${sheetId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to load data. Please try again later.');
    }
}

async function loadNewsFeed() {
    const newsData = await fetchGoogleSheetData('YOUR_NEWS_SHEET_ID');
    const newsContent = document.getElementById('news-content');
    if (newsData) {
        newsData.forEach(news => {
            const newsItem = document.createElement('div');
            newsItem.innerHTML = `<h3>${news.title}</h3><p>${news.description}</p>`;
            newsContent.appendChild(newsItem);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadNewsFeed();
});
￼Enter
