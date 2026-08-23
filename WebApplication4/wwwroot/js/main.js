// Leaforia Multi-page Core JS

const booksData = [
    { id: 1, title: "1984", author: "George Orwell", price: 14.50, category: "Bədii", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80", desc: "Corc Oruellin məşhur antiutopik əsəri azadlıq və nəzarət haqqındadır." },
    { id: 2, title: "Atomik Vərdişlər", author: "James Clear", price: 18.00, category: "Inkişaf", img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=500&q=80", desc: "Kiçik dəyişikliklərlə böyük nəticələr əldə etməyin sübut olunmuş yolları." },
    { id: 3, title: "Sapiens", author: "Yuval Noah Harari", price: 24.00, category: "Elmi", img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=500&q=80", desc: "Bəşəriyyətin qısa tarixi — insan növünün inkişafı." },
    { id: 4, title: "Zəngin Ata, Kasıb Ata", author: "Robert Kiyosaki", price: 16.50, category: "Biznes", img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=500&q=80", desc: "Maliyyə savadlılığı haqqında dünyada ən çox satılan kitab." },
    { id: 5, title: "Əlkimyaçı", author: "Paulo Coelho", price: 11.00, category: "Bədii", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80", desc: "Öz taleyinin ardınca gedən gənc çobanın əfsanəvi hekayəsi." },
    { id: 6, title: "Düşün və Varlı Ol", author: "Napoleon Hill", price: 15.00, category: "Inkişaf", img: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=500&q=80", desc: "Uğurun və varlanmağın 13 qızıl prinsipi." }
];

let cart = JSON.parse(localStorage.getItem('leaforia_cart')) || [];
let favorites = JSON.parse(localStorage.getItem('leaforia_favs')) || [];
let selectedRating = 5;

function updateBadges() {
    const cBadge = document.getElementById('cart-badge');
    const fBadge = document.getElementById('fav-badge');
    if (cBadge) cBadge.innerText = cart.length;
    if (fBadge) fBadge.innerText = favorites.length;
}

function saveState() {
    localStorage.setItem('leaforia_cart', JSON.stringify(cart));
    localStorage.setItem('leaforia_favs', JSON.stringify(favorites));
    updateBadges();
}

function toggleFav(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(fId => fId !== id);
    } else {
        favorites.push(id);
    }
    saveState();
    location.reload();
}

function addToCart(id) {
    const item = booksData.find(b => b.id === id);
    cart.push(item);
    saveState();
    alert(`${item.title} səbətə əlavə olundu!`);
}

function createBookCard(book) {
    const isFav = favorites.includes(book.id);
    return `
        <div class="book-card">
            <div class="fav-icon ${isFav ? 'active' : ''}" onclick="toggleFav(${book.id})">
                <i class="fa-solid fa-heart"></i>
            </div>
            <a href="product-detail.html?id=${book.id}">
                <img src="${book.img}" class="book-cover" alt="${book.title}">
            </a>
            <span class="book-cat">${book.category}</span>
            <h3 class="book-title"><a href="product-detail.html?id=${book.id}" style="text-decoration:none; color:inherit;">${book.title}</a></h3>
            <p class="book-author">${book.author}</p>
            <div class="book-bottom">
                <span class="price">${book.price.toFixed(2)} AZN</span>
                <button class="btn btn-primary" onclick="addToCart(${book.id})"><i class="fa-solid fa-cart-plus"></i></button>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    updateBadges();

    // Home Grid
    const homeGrid = document.getElementById('home-featured-books');
    if (homeGrid) homeGrid.innerHTML = booksData.slice(0, 4).map(createBookCard).join('');

    // Catalog Grid
    const catalogGrid = document.getElementById('catalog-books');
    if (catalogGrid) renderCatalog(booksData);

    // Product Detail Page & Comments
    const detailContainer = document.getElementById('product-detail-container');
    if (detailContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const bookId = parseInt(urlParams.get('id')) || 1;
        const book = booksData.find(b => b.id === bookId);
        
        if (book) {
            detailContainer.innerHTML = `
                <img src="${book.img}" class="detail-img" alt="${book.title}">
                <div class="detail-info">
                    <span class="book-cat">${book.category}</span>
                    <h1>${book.title}</h1>
                    <p class="detail-meta">Müəllif: <strong>${book.author}</strong> | İzlənmə: 1,240 dəfə</p>
                    <h2 class="price" style="font-size:2rem; margin:20px 0;">${book.price.toFixed(2)} AZN</h2>
                    <p style="margin-bottom:30px;">${book.desc}</p>
                    <div style="display:flex; gap:15px;">
                        <button class="btn btn-primary" onclick="addToCart(${book.id})"><i class="fa-solid fa-cart-shopping"></i> Səbətə Əlavə Et</button>
                        <button class="btn btn-outline" onclick="toggleFav(${book.id})"><i class="fa-regular fa-heart"></i> İstək Siyahısına Sal</button>
                    </div>
                </div>
            `;

            initRatingStars();
            renderComments(bookId);

            const commentForm = document.getElementById('comment-form');
            if (commentForm) {
                commentForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const name = document.getElementById('reviewer-name').value;
                    const text = document.getElementById('reviewer-text').value;

                    addComment(bookId, name, selectedRating, text);
                    commentForm.reset();
                    resetStars();
                });
            }
        }
    }

    // Cart Page
    const cartItemsList = document.getElementById('cart-page-items');
    if (cartItemsList) renderCartPage();

    // Favorites Page
    const favGrid = document.getElementById('favorites-page-grid');
    if (favGrid) {
        const favBooks = booksData.filter(b => favorites.includes(b.id));
        favGrid.innerHTML = favBooks.length ? favBooks.map(createBookCard).join('') : "<p>Sevimli siyahınız boşdur.</p>";
    }
});

function renderCatalog(list) {
    const catalogGrid = document.getElementById('catalog-books');
    const countEl = document.getElementById('book-count');
    if (catalogGrid) {
        catalogGrid.innerHTML = list.map(createBookCard).join('');
        if (countEl) countEl.innerText = list.length;
    }
}

function filterByCategory(cat) {
    if (cat === 'all') renderCatalog(booksData);
    else renderCatalog(booksData.filter(b => b.category === cat));
}

function filterByPrice(val) {
    document.getElementById('priceVal').innerText = val;
    renderCatalog(booksData.filter(b => b.price <= val));
}

function sortBooks(type) {
    let sorted = [...booksData];
    if (type === 'low') sorted.sort((a,b) => a.price - b.price);
    if (type === 'high') sorted.sort((a,b) => b.price - a.price);
    renderCatalog(sorted);
}

function renderCartPage() {
    const cartItemsList = document.getElementById('cart-page-items');
    if (cart.length === 0) {
        cartItemsList.innerHTML = "<p>Səbətdə heç bir məhsul yoxdur.</p>";
        document.getElementById('subtotal').innerText = "0.00 AZN";
        document.getElementById('grand-total').innerText = "0.00 AZN";
        return;
    }

    let subtotal = 0;
    cartItemsList.innerHTML = cart.map((item, index) => {
        subtotal += item.price;
        return `
            <div style="display:flex; align-items:center; justify-content:space-between; background:#fff; padding:15px; border-radius:10px; margin-bottom:15px;">
                <img src="${item.img}" style="width:60px; height:80px; object-fit:cover; border-radius:6px;">
                <div style="flex:1; margin-left:20px;">
                    <h4>${item.title}</h4>
                    <p style="color:#777;">${item.author}</p>
                </div>
                <span class="price">${item.price.toFixed(2)} AZN</span>
                <button style="border:none; background:none; color:red; margin-left:20px; cursor:pointer;" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
    }).join('');

    document.getElementById('subtotal').innerText = subtotal.toFixed(2) + " AZN";
    document.getElementById('grand-total').innerText = (subtotal + 5).toFixed(2) + " AZN";
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveState();
    renderCartPage();
}

function checkoutProcess() {
    if (cart.length === 0) return alert('Səbətiniz boşdur!');
    alert('Sifarişiniz təsdiqləndi! Tezliklə sizinlə əlaqə saxlanılacaq.');
    cart = [];
    saveState();
    renderCartPage();
}

/* Şərh & Qiymətləndirmə Funksiyaları */
function initRatingStars() {
    const stars = document.querySelectorAll('.star-rating .star');
    stars.forEach(star => {
        star.classList.add('active');
        star.addEventListener('click', (e) => {
            selectedRating = parseInt(e.target.getAttribute('data-value'));
            stars.forEach(s => {
                if (parseInt(s.getAttribute('data-value')) <= selectedRating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });
}

function resetStars() {
    selectedRating = 5;
    document.querySelectorAll('.star-rating .star').forEach(s => s.classList.add('active'));
}

function getComments(bookId) {
    const allComments = JSON.parse(localStorage.getItem('leaforia_comments')) || {};
    return allComments[bookId] || [
        { name: "Aysel Məmmədova", rating: 5, date: "2026-02-15", text: "Çox maraqlı kitabdır, hər kəsə oxumağı məsləhət görürəm." },
        { name: "Elvin Həsənov", rating: 4, date: "2026-02-18", text: "Çatdırılma tez oldu, kitabın nəşr keyfiyyəti əladır." }
    ];
}

function addComment(bookId, name, rating, text) {
    const allComments = JSON.parse(localStorage.getItem('leaforia_comments')) || {};
    if (!allComments[bookId]) {
        allComments[bookId] = getComments(bookId);
    }
    
    const newComment = {
        name: name,
        rating: rating,
        date: new Date().toISOString().split('T')[0],
        text: text
    };

    allComments[bookId].unshift(newComment);
    localStorage.setItem('leaforia_comments', JSON.stringify(allComments));
    renderComments(bookId);
}

function renderComments(bookId) {
    const container = document.getElementById('comments-list');
    if (!container) return;
    const comments = getComments(bookId);

    if (comments.length === 0) {
        container.innerHTML = "<p>Bu kitab üçün hələ şərh yazılmayıb. İlk şərhi siz yazın!</p>";
        return;
    }

    container.innerHTML = comments.map(c => {
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            starsHtml += `<i class="${i <= c.rating ? 'fa-solid' : 'fa-regular'} fa-star"></i>`;
        }

        return `
            <div class="comment-item">
                <div class="comment-header">
                    <span class="comment-author">${c.name}</span>
                    <span class="comment-date">${c.date}</span>
                </div>
                <div class="comment-stars">${starsHtml}</div>
                <p class="comment-text">${c.text}</p>
            </div>
        `;
    }).join('');
}
