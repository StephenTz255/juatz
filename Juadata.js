const placesContainer = document.getElementById("places");
const opportunitiesContainer = document.getElementById("opportunities");
const searchInput = document.getElementById("searchInput");

function render() {
  placesContainer.innerHTML = "";
  opportunitiesContainer.innerHTML = "";

  const query = searchInput.value.toLowerCase();

  places
    .filter(p => p.name.toLowerCase().includes(query))
    .forEach(place => {
      placesContainer.innerHTML += `
        <div class="card">
          <h3>${place.name}</h3>
          <span>${place.category} • ${place.location}</span>
        </div>
      `;
    });

  opportunities
    .filter(o => o.title.toLowerCase().includes(query))
    .forEach(op => {
      opportunitiesContainer.innerHTML += `
        <div class="card">
          <h3>${op.title}</h3>
          <span>${op.type} • ${op.location}</span>
        </div>
      `;
    });
}

searchInput.addEventListener("input", render);
render();
