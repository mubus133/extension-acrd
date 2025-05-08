let extensionsData = [];
let currentFilter = 'all'; 

fetch('./data.json')
  .then(res => res.json())
  .then(data => {
    extensionsData = data;
    renderExtensions(currentFilter); 
  })
  .catch(err => {
    console.error('Failed to load data:', err);
  });

function renderExtensions(filter, searchQuery = '') {
  const grid = document.getElementById('extensions-grid');
  grid.innerHTML = '';

  const filtered = extensionsData.filter(ext => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && ext.isActive) ||
      (filter === 'inactive' && !ext.isActive);

    const matchesSearch = ext.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  filtered.forEach(ext => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-header">
        <img src="${ext.logo}" alt="${ext.name} logo" />
      </div>
      <div class="card-body">
        <h3>${ext.name}</h3>
        <p>${ext.description}</p>
      </div>
      <div class="card-footer">
        <button class="remove-btn">Remove</button>
        <label class="switch">
          <input type="checkbox" ${ext.isActive ? 'checked' : ''}>
          <span class="slider"></span>
        </label>
      </div>
    `;
    grid.appendChild(card);
  });
}

document.querySelectorAll('.filter-button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    currentFilter = button.getAttribute('data-type');
    const searchQuery = document.getElementById('search-input').value;
    renderExtensions(currentFilter, searchQuery);
  });
});

document.getElementById('search-input').addEventListener('input', (e) => {
  const searchQuery = e.target.value;
  renderExtensions(currentFilter, searchQuery);
});

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');

  const isLightMode = document.body.classList.contains('light-mode');
  themeToggle.textContent = isLightMode ? '🌙' : '⚙️';
});
