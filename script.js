// 1. The Data (Now with descriptions)
const pets = [
  { name: 'Luna', type: 'cat', price: 250, img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500', description: 'Luna is a very relaxed cat. She only eats premium chicken and loves sleeping in the sun. Very gentle with kids.' },
  { name: 'Max', type: 'dog', price: 300, img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500', description: 'Max is full of energy! He needs a backyard to run in. He loves playing fetch and is fiercely loyal.' },
  { name: 'Oliver', type: 'cat', price: 150, img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500', description: 'Oliver is a curious explorer. He will find his way onto the top of your fridge. Loves tuna.' },
  { name: 'Bella', type: 'dog', price: 400, img: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=500', description: 'Bella is a sweet, calm companion. Great for apartments. She prefers short walks and lots of belly rubs.' },
  { name: 'Rio', type: 'bird', price: 75, img: 'https://images.unsplash.com/photo-1552728089-571692b15873?w=500', description: 'Rio is a talkative bird! He can mimic your morning alarm and loves eating fresh fruit.' }
];

// DOM Elements
const grid = document.getElementById('pet-grid');
const detailsView = document.getElementById('pet-details');
const detailsContent = document.getElementById('details-content');
const backBtn = document.getElementById('back-btn');

// 2. The Render Function
function renderPets(filterType = 'all') {
  grid.innerHTML = '';
  const filtered = filterType === 'all' ? pets : pets.filter(p => p.type === filterType);
  
  filtered.forEach(pet => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${pet.img}" alt="${pet.name}" width="250" height="200" fetchpriority="high">
      <h2>${pet.name}</h2>
      <p class="price">$${pet.price}</p> 
    `;
    
    // NEW: Listen for clicks on the card
    card.addEventListener('click', () => showPetDetails(pet));
    
    grid.appendChild(card);
  });
}

// 3. NEW: Show Details Function
function showPetDetails(pet) {
  // Hide the grid, show the details container
  grid.classList.add('hidden');
  detailsView.classList.remove('hidden');
  
  // Inject the specific pet's HTML
  detailsContent.innerHTML = `
    <img src="${pet.img}" alt="${pet.name}">
    <h2>${pet.name} the ${pet.type}</h2>
    <p class="price">$${pet.price}</p>
    <hr>
    <p style="font-size: 1.2rem; line-height: 1.6;">${pet.description}</p>
  `;
}

// 4. NEW: Back Button Listener
backBtn.addEventListener('click', () => {
  // Hide the details, show the grid again
  detailsView.classList.add('hidden');
  grid.classList.remove('hidden');
});

// 5. Filter Event Listeners
document.getElementById('filter-all').addEventListener('click', () => renderPets('all'));
document.getElementById('filter-cats').addEventListener('click', () => renderPets('cat'));
document.getElementById('filter-dogs').addEventListener('click', () => renderPets('dog'));

// 6. Dark Mode Event Listener
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Initial render
renderPets();