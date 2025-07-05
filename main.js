const SHEETS = {
  news: '1wYojlcwrcRbodePfm1I6u7yW8gVEnJYydKs5FbKWxuw',
  jobs: '1gSpsLMmNBployPFYvlrQB2K6cRpP0hvgi7d3jBP6KnY',
  experts: '1XpsCfd_fv8IPjo2mxttnRYEpHk6UmTPjbvHM6uuqwSQ',
  towns: '17KjYAvmn6DJlI9JyCzfAyaPVQYqmagIa3Qkpd8aPBBE',
  art: '1M4vlCbLv7zdSRziEQmEzt2MNhPSjsjCL1dtzN-07Pc8',
};

async function fetchGoogleSheetData(sheetId) {
  try {
    const response = await fetch(`https://opensheet.elk.sh/${sheetId}`);
    if (!response.ok) throw new Error('Network error');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

async function loadSectionData(sheetId, containerId, templateFn) {
  const data = await fetchGoogleSheetData(sheetId);
  const container = document.getElementById(containerId);
  if (data && container) {
    data.forEach(item => {
      const el = document.createElement('div');
      el.className = 'bg-white p-4 rounded shadow';
      el.innerHTML = templateFn(item);
      container.appendChild(el);
    });
  }
}

function newsTemplate(item) {
  return `<h3 class="font-semibold">${item.title}</h3><p>${item.description}</p>`;
}
function jobTemplate(item) {
  return `<h3 class="font-semibold">${item.position}</h3><p>${item.organization}</p>`;
}
function expertTemplate(item) {
  return `<h3 class="font-semibold">${item.name}</h3><p>${item.profession}</p>`;
}
function townTemplate(item) {
  return `<h3 class="font-semibold">${item.town}</h3><p>${item.description}</p>`;
}
function artTemplate(item) {
  return `<h3 class="font-semibold">${item.artist}</h3><p>${item.art_title}</p>`;
}

document.addEventListener('DOMContentLoaded', () => {
  loadSectionData(SHEETS.news, 'news-content', newsTemplate);
  loadSectionData(SHEETS.jobs, 'job-listings', jobTemplate);
  loadSectionData(SHEETS.experts, 'experts-list', expertTemplate);
  loadSectionData(SHEETS.towns, 'towns-list', townTemplate);
  loadSectionData(SHEETS.art, 'art-listings', artTemplate);
});
