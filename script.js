// 1. The Data (Now with prices)
const pets = [
  { name: 'Luna', type: 'cat', price: 250, img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500' },
  { name: 'Max', type: 'dog', price: 300, img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500' },
  { name: 'Oliver', type: 'cat', price: 150, img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500' },
  { name: 'Bella', type: 'dog', price: 400, img: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=500' },
  { name: 'Rio', type: 'bird', price: 75, img: 'https://images.unsplash.com/photo-1552728089-571692b15873?w=500' }
];

const grid = document.getElementById('pet-grid');

// 2. The Render Function (Now injects the price tag)
function renderPets(filterType = 'all') {
  grid.innerHTML = '';
  const filtered = filterType === 'all' ? pets : pets.filter(p => p.type === filterType);
  
  filtered.forEach(pet => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${pet.img}" alt="${pet.name} the ${pet.type}" width="250" height="200" fetchpriority="high">
      <h2>${pet.name}</h2>
      <p class="price">$${pet.price}</p> 
    `;
    grid.appendChild(card);
  });
}

// 3. Filter Event Listeners
document.getElementById('filter-all').addEventListener('click', () => renderPets('all'));
document.getElementById('filter-cats').addEventListener('click', () => renderPets('cat'));
document.getElementById('filter-dogs').addEventListener('click', () => renderPets('dog'));

// 4. Dark Mode Event Listener (from your previous feature)
const themeBtn = document.getElementById('theme-toggle');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  if (document.body.classList.contains('dark-mode')) {
    themeBtn.textContent = '☀️ Light Mode';
  } else {
    themeBtn.textContent = '🌙 Dark Mode';
  }
});

// 5. Initial render to paint the screen on load
renderPets();