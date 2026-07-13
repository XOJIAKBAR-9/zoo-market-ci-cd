// 1. The NEW Data (Matching your new categories)
const inventory = [
  { name: 'General Admission', type: 'tickets', price: 25, img: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=500', description: 'Day pass to explore all open zoo exhibits.' },
  { name: 'Elephant', type: 'adopt', price: 100, img: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=500', description: 'Support our elephants. Includes a plush toy and certificate.' },
  { name: 'Classic Zoo T-Shirt', type: 'merch', price: 30, img: 'https://images.unsplash.com/photo-1529362266642-70b777a565f4?w=500', description: '100% cotton green tee with our vintage logo.' },
  { name: 'The black dog.', type: 'feed', price: 15, img: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=500', description: 'Get a bundle of fresh carrots to feed the giraffes!' },
  { name: 'The lion ', type: 'tickets', price: 75, img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=500', description: 'Guided behind-the-scenes tour of the habitats.' }
];

// DOM Elements
const grid = document.getElementById('pet-grid');
const detailsView = document.getElementById('pet-details');
const detailsContent = document.getElementById('details-content');
const backBtn = document.getElementById('back-btn');

// Array of all filter buttons so we can easily swap the "active" style
const filterBtns = [
  document.getElementById('filter-all'),
  document.getElementById('filter-tickets'),
  document.getElementById('filter-adopt'),
  document.getElementById('filter-merch'),
  document.getElementById('filter-feed')
];

// 2. The Render Function
function renderItems(filterType = 'all') {
  grid.innerHTML = '';
  const filtered = filterType === 'all' ? inventory : inventory.filter(item => item.type === filterType);
  
  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}" width="250" height="140" fetchpriority="high">
      <h2>${item.name}</h2>
      <p class="price">$${item.price}</p> 
    `;
    
    card.addEventListener('click', () => showItemDetails(item));
    grid.appendChild(card);
  });
}

// 3. Show Details Function (SPA Routing)
function showItemDetails(item) {
  // Hide grid, hero, and tabs for a clean modal feel
  grid.classList.add('hidden');
  document.querySelector('.section-title').classList.add('hidden'); 
  document.querySelector('.hero').classList.add('hidden');
  document.querySelector('.category-tabs').classList.add('hidden');
  
  detailsView.classList.remove('hidden');
  
  // Inject the premium layout
  detailsContent.innerHTML = `
    <img src="${item.img}" alt="${item.name}">
    <div class="details-header">
      <h2>${item.name}</h2>
      <span class="price">$${item.price}</span>
    </div>
    <p style="font-size: 1.1rem; line-height: 1.6; color: var(--text-light);">${item.description}</p>
    
    <button class="add-to-cart-btn" onclick="alert('${item.name} added to cart!')">
      Add to Cart - $${item.price}
    </button>
  `;
}

// 4. Back Button Listener Update (to bring back the hero/tabs)
backBtn.addEventListener('click', () => {
  detailsView.classList.add('hidden');
  grid.classList.remove('hidden');
  document.querySelector('.section-title').classList.remove('hidden');
  document.querySelector('.hero').classList.remove('hidden');
  document.querySelector('.category-tabs').classList.remove('hidden');
});