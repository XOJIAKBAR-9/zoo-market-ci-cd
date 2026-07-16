// ---------------------------------------------------------------
// DATA
// ---------------------------------------------------------------
const inventory = [
  {
    id: 'ticket-general',
    name: 'General Admission',
    type: 'tickets',
    price: 25,
    img: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=500',
    description: 'Day pass to explore all open zoo exhibits.'
  },
  {
    id: 'ticket-tour',
    name: 'Behind-the-Scenes Safari Tour',
    type: 'tickets',
    price: 75,
    img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=500',
    description: 'Guided behind-the-scenes tour of the habitats.'
  },
  {
    id: 'adopt-elephant',
    name: 'Asian Elephant',
    species: 'Elephas maximus',
    type: 'adopt',
    img: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=500',
    raised: 14200, goal: 20000,
    tiers: [
      { name: 'Bronze', price: 45, perks: ['Digital adoption certificate', 'Elephant fact sheet', 'Thank-you email updates'] },
      { name: 'Silver', price: 90, perks: ['Everything in Bronze', 'Plush elephant toy', 'Seasonal photo update'] },
      { name: 'Gold', price: 180, perks: ['Everything in Silver', 'Framed certificate', 'Personal zoo visit invite', 'Name on our donor wall'] }
    ],
    description: "Support our herd's daily care, enrichment, and habitat upkeep."
  },
  {
    id: 'adopt-snow-leopard',
    name: 'Snow Leopard',
    species: 'Panthera uncia',
    type: 'adopt',
    img: 'https://images.unsplash.com/photo-1689847190291-f8e0823f13ab?w=500',
    raised: 6300, goal: 15000,
    tiers: [
      { name: 'Bronze', price: 40, perks: ['Digital adoption certificate', 'Snow leopard fact sheet', 'Thank-you email updates'] },
      { name: 'Silver', price: 85, perks: ['Everything in Bronze', 'Plush snow leopard toy', 'Seasonal photo update'] },
      { name: 'Gold', price: 160, perks: ['Everything in Silver', 'Framed certificate', 'Personal zoo visit invite', 'Name on our donor wall'] }
    ],
    description: "Help protect one of the world's most elusive big cats."
  },
  {
    id: 'adopt-red-panda',
    name: 'Red Panda',
    species: 'Ailurus fulgens',
    type: 'adopt',
    img: 'https://images.unsplash.com/photo-1564315082122-e31948d2491c?w=500',
    raised: 9800, goal: 12000,
    tiers: [
      { name: 'Bronze', price: 35, perks: ['Digital adoption certificate', 'Red panda fact sheet', 'Thank-you email updates'] },
      { name: 'Silver', price: 70, perks: ['Everything in Bronze', 'Plush red panda toy', 'Seasonal photo update'] },
      { name: 'Gold', price: 140, perks: ['Everything in Silver', 'Framed certificate', 'Personal zoo visit invite', 'Name on our donor wall'] }
    ],
    description: 'Fund enrichment and habitat upkeep for our resident tree-dwellers.'
  },
  {
    id: 'adopt-sea-otter',
    name: 'Sea Otter',
    species: 'Enhydra lutris',
    type: 'adopt',
    img: 'https://images.unsplash.com/photo-1759711530446-4f0f235688aa?w=500',
    raised: 4100, goal: 10000,
    tiers: [
      { name: 'Bronze', price: 35, perks: ['Digital adoption certificate', 'Sea otter fact sheet', 'Thank-you email updates'] },
      { name: 'Silver', price: 75, perks: ['Everything in Bronze', 'Plush sea otter toy', 'Seasonal photo update'] },
      { name: 'Gold', price: 150, perks: ['Everything in Silver', 'Framed certificate', 'Personal zoo visit invite', 'Name on our donor wall'] }
    ],
    description: 'Support rescue, rehab, and daily care for our otter raft.'
  },
  {
    id: 'adopt-penguin',
    name: 'African Penguin',
    species: 'Spheniscus demersus',
    type: 'adopt',
    img: 'https://images.unsplash.com/photo-1663501108352-05e58ac84d3c?w=500',
    raised: 7600, goal: 11000,
    tiers: [
      { name: 'Bronze', price: 30, perks: ['Digital adoption certificate', 'Penguin fact sheet', 'Thank-you email updates'] },
      { name: 'Silver', price: 65, perks: ['Everything in Bronze', 'Plush penguin toy', 'Seasonal photo update'] },
      { name: 'Gold', price: 130, perks: ['Everything in Silver', 'Framed certificate', 'Personal zoo visit invite', 'Name on our donor wall'] }
    ],
    description: 'Help care for one of the most endangered penguin species.'
  },
  {
    id: 'merch-tshirt',
    name: 'Classic Zoo T-Shirt',
    type: 'merch',
    price: 30,
    img: 'https://images.unsplash.com/photo-1529362266642-70b777a565f4?w=500',
    description: '100% cotton green tee with our vintage logo.'
  },
  {
    id: 'feed-giraffe',
    name: 'Giraffe Feed Bundle',
    type: 'feed',
    price: 15,
    img: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=500',
    description: 'Get a bundle of fresh carrots to feed the giraffes!'
  }
];

// ---------------------------------------------------------------
// STATE
// ---------------------------------------------------------------
let currentFilter = 'all';
let cart = [];
let currentItem = null;
let currentTierIndex = 0;
let isGift = false;

// ---------------------------------------------------------------
// DOM refs
// ---------------------------------------------------------------
const grid = document.getElementById('pet-grid');
const detailsView = document.getElementById('pet-details');
const detailsContent = document.getElementById('details-content');
const backBtn = document.getElementById('back-btn');
const searchInput = document.getElementById('search-input');
const featuredSection = document.getElementById('featured-adopt-section');
const featuredTrack = document.getElementById('featured-track');
const heroEl = document.querySelector('.hero');
const tabsEl = document.querySelector('.category-tabs');
const sectionTitleEl = document.querySelector('main .section-title');

const themeToggle = document.getElementById('theme-toggle');
const toastEl = document.getElementById('toast');
const toastMessageEl = document.getElementById('toast-message');
const toastActionEl = document.getElementById('toast-action');

const cartOverlay = document.getElementById('cart-overlay');
const cartDrawer = document.getElementById('cart-drawer');
const cartClose = document.getElementById('cart-close');
const cartItemsEl = document.getElementById('cart-items');
const orderConfirmEl = document.getElementById('order-confirm');
const cartFooterEl = document.getElementById('cart-footer');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartBadge = document.getElementById('cart-badge');
const checkoutBtn = document.getElementById('checkout-btn');
const continueShoppingBtn = document.getElementById('continue-shopping');

const navHome = document.getElementById('nav-home');
const navExplore = document.getElementById('nav-explore');
const navCart = document.getElementById('nav-cart');
const navProfile = document.getElementById('nav-profile');

// ---------------------------------------------------------------
// RENDER: GRID
// ---------------------------------------------------------------
function animateProgressBars(container) {
  requestAnimationFrame(() => {
    container.querySelectorAll('.progress-fill').forEach(el => {
      el.style.width = el.dataset.target + '%';
    });
  });
}

function renderItems(filterType = currentFilter) {
  const query = searchInput.value.trim().toLowerCase();
  let filtered = filterType === 'all' ? inventory : inventory.filter(i => i.type === filterType);
  if (query) {
    filtered = filtered.filter(i => i.name.toLowerCase().includes(query) || i.description.toLowerCase().includes(query));
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="empty-state">No results found. Try a different search or category.</p>`;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const priceLabel = item.type === 'adopt' ? `From $${item.tiers[0].price}` : `$${item.price}`;
    const progressHtml = item.type === 'adopt'
      ? `<div class="progress-bar small"><div class="progress-fill" data-target="${Math.round(item.raised / item.goal * 100)}"></div></div>`
      : '';
    const badge = item.type === 'adopt' ? '<span class="badge">Adopt</span>' : '';
    return `
      <div class="card" data-id="${item.id}">
        <div class="card-img-wrap">
          <img src="${item.img}" alt="${item.name}" width="250" height="140" loading="lazy">
          ${badge}
        </div>
        <h2>${item.name}</h2>
        ${progressHtml}
        <p class="price">${priceLabel}</p>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const item = inventory.find(i => i.id === card.dataset.id);
      showItemDetails(item);
    });
  });

  animateProgressBars(grid);
}

// ---------------------------------------------------------------
// RENDER: FEATURED ADOPTIONS
// ---------------------------------------------------------------
function renderFeatured() {
  if (currentFilter !== 'all') {
    featuredSection.classList.add('hidden');
    return;
  }
  featuredSection.classList.remove('hidden');
  const adoptItems = inventory.filter(i => i.type === 'adopt');
  featuredTrack.innerHTML = adoptItems.map(item => {
    const pct = Math.round(item.raised / item.goal * 100);
    return `
      <div class="featured-card" data-id="${item.id}">
        <img src="${item.img}" alt="${item.name}" loading="lazy">
        <div class="featured-card-body">
          <h4>${item.name}</h4>
          <div class="progress-bar"><div class="progress-fill" data-target="${pct}"></div></div>
          <p class="progress-label">${pct}% funded · from $${item.tiers[0].price}</p>
        </div>
      </div>
    `;
  }).join('');

  featuredTrack.querySelectorAll('.featured-card').forEach(card => {
    card.addEventListener('click', () => {
      const item = inventory.find(i => i.id === card.dataset.id);
      showItemDetails(item);
    });
  });

  animateProgressBars(featuredTrack);
}

// ---------------------------------------------------------------
// SECTION VISIBILITY
// ---------------------------------------------------------------
function hideMainSections() {
  heroEl.classList.add('hidden');
  tabsEl.classList.add('hidden');
  featuredSection.classList.add('hidden');
  sectionTitleEl.classList.add('hidden');
  grid.classList.add('hidden');
}
function showMainSections() {
  heroEl.classList.remove('hidden');
  tabsEl.classList.remove('hidden');
  sectionTitleEl.classList.remove('hidden');
  grid.classList.remove('hidden');
  renderFeatured();
}

// ---------------------------------------------------------------
// DETAILS: ROUTER
// ---------------------------------------------------------------
function showItemDetails(item) {
  currentItem = item;
  currentTierIndex = 0;
  isGift = false;

  hideMainSections();
  detailsView.classList.remove('hidden');

  if (item.type === 'adopt') {
    renderAdoptDetail();
  } else {
    renderStandardDetail(item);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------------------------------------------------------------
// DETAILS: ADOPTION FLOW
// ---------------------------------------------------------------
function certificateHtml() {
  const item = currentItem;
  const tier = item.tiers[currentTierIndex];
  const recipientInput = document.getElementById('gift-recipient');
  const recipientName = isGift ? ((recipientInput && recipientInput.value.trim()) || 'a special someone') : 'You';
  return `
    <div class="cert-icon">🏅</div>
    <h4>Certificate of Adoption</h4>
    <p class="cert-name">${recipientName}</p>
    <p class="cert-detail">has symbolically adopted the ${item.name} at the ${tier.name} level</p>
  `;
}

function renderAdoptDetail() {
  const item = currentItem;
  const tier = item.tiers[currentTierIndex];
  const pct = Math.round(item.raised / item.goal * 100);

  detailsContent.innerHTML = `
    <div class="detail-card">
      <img class="detail-img" src="${item.img}" alt="${item.name}">
      <div class="detail-body">
        <div class="details-header">
          <div>
            <h2>${item.name}</h2>
            <p class="species-tag">${item.species}</p>
          </div>
          <span class="price" id="tier-price">$${tier.price}</span>
        </div>

        <div class="progress-block">
          <div class="progress-bar"><div class="progress-fill" data-target="${pct}"></div></div>
          <div class="progress-label"><span>$${item.raised.toLocaleString()} raised</span><span>${pct}% of $${item.goal.toLocaleString()} goal</span></div>
        </div>

        <p class="desc-text">${item.description}</p>

        <div class="tier-selector" id="tier-selector">
          ${item.tiers.map((t, i) => `
            <button class="tier-btn ${i === currentTierIndex ? 'active' : ''}" data-index="${i}">
              ${t.name}<span>$${t.price}</span>
            </button>
          `).join('')}
        </div>

        <ul class="perks-list" id="perks-list">
          ${tier.perks.map(p => `<li>${p}</li>`).join('')}
        </ul>

        <div class="gift-row">
          <label class="gift-text" for="gift-toggle">🎁 Adopt as a gift</label>
          <label class="switch">
            <input type="checkbox" id="gift-toggle">
            <span class="slider"></span>
          </label>
        </div>

        <div class="gift-recipient hidden" id="gift-recipient-wrap">
          <input type="text" id="gift-recipient" placeholder="Recipient's name">
        </div>

        <div class="certificate" id="certificate">${certificateHtml()}</div>

        <div class="sticky-cta">
          <button class="add-to-cart-btn" id="add-to-cart">
            Adopt Now — <span id="cta-price">$${tier.price}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  animateProgressBars(detailsContent);
  wireAdoptDetailEvents();
}

function wireAdoptDetailEvents() {
  document.querySelectorAll('.tier-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentTierIndex = parseInt(btn.dataset.index, 10);
      updateAdoptSelections();
    });
  });

  const giftToggle = document.getElementById('gift-toggle');
  giftToggle.addEventListener('change', () => {
    isGift = giftToggle.checked;
    document.getElementById('gift-recipient-wrap').classList.toggle('hidden', !isGift);
    document.getElementById('certificate').innerHTML = certificateHtml();
  });

  document.getElementById('gift-recipient-wrap').addEventListener('input', () => {
    document.getElementById('certificate').innerHTML = certificateHtml();
  });

  document.getElementById('add-to-cart').addEventListener('click', () => {
    const recipientInput = document.getElementById('gift-recipient');
    addToCart(currentItem, {
      tierIndex: currentTierIndex,
      gift: isGift,
      recipient: recipientInput ? recipientInput.value.trim() : ''
    });
  });
}

function updateAdoptSelections() {
  const item = currentItem;
  const tier = item.tiers[currentTierIndex];

  document.querySelectorAll('.tier-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === currentTierIndex);
  });
  document.getElementById('tier-price').textContent = `$${tier.price}`;
  document.getElementById('cta-price').textContent = `$${tier.price}`;
  document.getElementById('perks-list').innerHTML = tier.perks.map(p => `<li>${p}</li>`).join('');
  document.getElementById('certificate').innerHTML = certificateHtml();
}

// ---------------------------------------------------------------
// DETAILS: STANDARD ITEMS (tickets, merch, feed)
// ---------------------------------------------------------------
function renderStandardDetail(item) {
  detailsContent.innerHTML = `
    <div class="detail-card">
      <img class="detail-img" src="${item.img}" alt="${item.name}">
      <div class="detail-body">
        <div class="details-header">
          <h2>${item.name}</h2>
          <span class="price">$${item.price}</span>
        </div>
        <p class="desc-text">${item.description}</p>

        <div class="qty-row">
          <span style="font-weight:600;">Quantity</span>
          <div class="qty-stepper">
            <button id="qty-dec">−</button>
            <span id="qty-val">1</span>
            <button id="qty-inc">+</button>
          </div>
        </div>

        <div class="sticky-cta">
          <button class="add-to-cart-btn" id="add-to-cart">Add to Cart</button>
        </div>
      </div>
    </div>
  `;

  let qty = 1;
  const qtyVal = document.getElementById('qty-val');
  document.getElementById('qty-dec').addEventListener('click', () => {
    qty = Math.max(1, qty - 1);
    qtyVal.textContent = qty;
  });
  document.getElementById('qty-inc').addEventListener('click', () => {
    qty = Math.min(10, qty + 1);
    qtyVal.textContent = qty;
  });
  document.getElementById('add-to-cart').addEventListener('click', () => {
    addToCart(item, { qty });
  });
}

// ---------------------------------------------------------------
// CART
// ---------------------------------------------------------------
function addToCart(item, opts = {}) {
  const { tierIndex, qty = 1, gift = false, recipient = '' } = opts;
  let line;

  if (item.type === 'adopt') {
    const tier = item.tiers[tierIndex];
    const key = `${item.id}-${tier.name}-${gift ? 'gift' : 'self'}-${recipient}`;
    line = { key, name: `${item.name} — ${tier.name} Adoption`, price: tier.price, qty: 1, gift, recipient, img: item.img };
  } else {
    line = { key: item.id, name: item.name, price: item.price, qty, img: item.img };
  }

  const existing = cart.find(c => c.key === line.key);
  if (existing) {
    existing.qty += line.qty;
  } else {
    cart.push(line);
  }

  updateCartBadge();
  showToast(`${item.name} added to cart 🎉`);
}

function updateCartBadge() {
  const count = cart.reduce((sum, l) => sum + l.qty, 0);
  cartBadge.textContent = count;
  cartBadge.classList.toggle('hidden', count === 0);
}

function renderCart() {
  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<p class="cart-empty">Your cart is empty.<br>Start adopting, feeding, or shopping!</p>`;
    cartFooterEl.classList.add('hidden');
    return;
  }
  cartFooterEl.classList.remove('hidden');

  cartItemsEl.innerHTML = cart.map((line, i) => `
    <div class="cart-line">
      <img src="${line.img}" alt="${line.name}">
      <div class="cart-line-info">
        <p class="cart-line-name">${line.name}</p>
        ${line.gift ? `<p class="cart-line-gift">🎁 Gift for ${line.recipient || 'someone special'}</p>` : ''}
        <div class="qty-stepper mini">
          <button class="qty-dec-cart" data-i="${i}">−</button>
          <span>${line.qty}</span>
          <button class="qty-inc-cart" data-i="${i}">+</button>
        </div>
      </div>
      <div class="cart-line-right">
        <span class="cart-line-price">$${line.price * line.qty}</span>
        <button class="cart-remove" data-i="${i}" aria-label="Remove item">🗑</button>
      </div>
    </div>
  `).join('');

  const subtotal = cart.reduce((sum, l) => sum + l.price * l.qty, 0);
  cartSubtotalEl.textContent = `$${subtotal.toLocaleString()}`;

  cartItemsEl.querySelectorAll('.qty-dec-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.i, 10);
      cart[i].qty = Math.max(1, cart[i].qty - 1);
      updateCartBadge();
      renderCart();
    });
  });
  cartItemsEl.querySelectorAll('.qty-inc-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.i, 10);
      cart[i].qty += 1;
      updateCartBadge();
      renderCart();
    });
  });
  cartItemsEl.querySelectorAll('.cart-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.i, 10);
      cart.splice(i, 1);
      updateCartBadge();
      renderCart();
    });
  });
}

function openCart() {
  orderConfirmEl.classList.add('hidden');
  cartItemsEl.classList.remove('hidden');
  renderCart();
  cartOverlay.classList.remove('hidden');
  cartDrawer.classList.remove('hidden');
  requestAnimationFrame(() => {
    cartOverlay.classList.add('show');
    cartDrawer.classList.add('show');
  });
}
function closeCart() {
  cartOverlay.classList.remove('show');
  cartDrawer.classList.remove('show');
  setTimeout(() => {
    cartOverlay.classList.add('hidden');
    cartDrawer.classList.add('hidden');
  }, 320);
}

function checkout() {
  if (cart.length === 0) return;
  cartItemsEl.classList.add('hidden');
  cartFooterEl.classList.add('hidden');
  orderConfirmEl.classList.remove('hidden');
  cart = [];
  updateCartBadge();
}

// ---------------------------------------------------------------
// TOAST
// ---------------------------------------------------------------
let toastTimer;
function showToast(message) {
  toastMessageEl.textContent = message;
  toastEl.classList.remove('hidden');
  requestAnimationFrame(() => toastEl.classList.add('show'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 3000);
}
function hideToast() {
  toastEl.classList.remove('show');
  setTimeout(() => toastEl.classList.add('hidden'), 300);
  clearTimeout(toastTimer);
}

// ---------------------------------------------------------------
// EVENT WIRING (static elements)
// ---------------------------------------------------------------
document.querySelectorAll('.category-tabs button[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.category-tabs button[data-filter]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderItems(currentFilter);
    renderFeatured();
  });
});

searchInput.addEventListener('input', () => renderItems(currentFilter));

backBtn.addEventListener('click', () => {
  detailsView.classList.add('hidden');
  showMainSections();
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
});

toastActionEl.addEventListener('click', () => {
  hideToast();
  openCart();
});

cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
checkoutBtn.addEventListener('click', checkout);
continueShoppingBtn.addEventListener('click', () => {
  orderConfirmEl.classList.add('hidden');
  cartItemsEl.classList.remove('hidden');
  closeCart();
});

function setActiveNav(activeEl) {
  [navHome, navExplore, navCart, navProfile].forEach(n => n.classList.remove('active'));
  activeEl.classList.add('active');
}

navHome.addEventListener('click', (e) => {
  e.preventDefault();
  setActiveNav(navHome);
  if (!detailsView.classList.contains('hidden')) {
    detailsView.classList.add('hidden');
    showMainSections();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

navExplore.addEventListener('click', (e) => {
  e.preventDefault();
  setActiveNav(navExplore);
  if (!detailsView.classList.contains('hidden')) {
    detailsView.classList.add('hidden');
    showMainSections();
  }
  document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
});

navCart.addEventListener('click', (e) => {
  e.preventDefault();
  setActiveNav(navCart);
  openCart();
});

navProfile.addEventListener('click', (e) => {
  e.preventDefault();
  setActiveNav(navProfile);
  showToast('Profile coming soon ✨');
});

// ---------------------------------------------------------------
// INITIAL RENDER
// ---------------------------------------------------------------
renderFeatured();
renderItems('all');
updateCartBadge();