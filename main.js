
// Load data from Google Sheets using OpenSheet API

async function loadSheet(url, containerId, formatter) {
  const res = await fetch(url);
  const data = await res.json();
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  data.forEach(entry => {
    container.innerHTML += formatter(entry);
  });
}

function formatNews(item) {
  return `<div class="mb-2"><h3 class="font-bold">${item.Title}</h3><p>${item.Description}</p></div>`;
}

function formatJobs(item) {
  return `<div class="mb-2"><strong>${item.Title}</strong> - ${item.Description} (${item.Deadline})</div>`;
}

function formatExperts(item) {
  return `<div class="mb-2"><strong>${item.Name}</strong> - ${item.Profession} (${item.Contact})</div>`;
}

// URLs to your sheets
const newsURL = "https://opensheet.elk.sh/1wYojlcwrcRbodePfm1I6u7yW8gVEnJYydKs5FbKWxuw/Sheet1";
const jobsURL = "https://opensheet.elk.sh/1gSpsLMmNBployPFYvlrQB2K6cRpP0hvgi7d3jBP6KnY/Sheet1";
const expertsURL = "https://opensheet.elk.sh/1XpsCfd_fv8IPjo2mxttnRYEpHk6UmTPjbvHM6uuqwSQ/Sheet1";

// Load content
loadSheet(newsURL, "newsContent", formatNews);
loadSheet(jobsURL, "jobsContent", formatJobs);
loadSheet(expertsURL, "expertsContent", formatExperts);
