// index.js

// Example of using has() method for better performance
if (document.querySelector('.navbar').classList.contains('navbar')) {
    console.log('Navbar exists');
}

document.addEventListener('DOMContentLoaded', () => {
    // Dropdown Menu Functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        if (!menu) return;

        dropdown.addEventListener('mouseover', () => {
            menu.style.display = 'block';
        });

        dropdown.addEventListener('mouseout', () => {
            menu.style.display = 'none';
        });
    });

    const apiUrl = 'https://Chedder78.pythonanywhere.com';

    fetch(`${apiUrl}/create-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ total: '20.00', description: 'Order #123' })
    })
    .then(response => response.json())
    .then(data => {
        if (data.approval_url) {
            window.location.href = data.approval_url; // Redirect to PayPal for payment
        } else {
            console.error('Error:', data);
        }
    });

    const queryParams = new URLSearchParams(window.location.search);
    const paymentId = queryParams.get('paymentId');
    const payerId = queryParams.get('PayerID');

    fetch(`${apiUrl}/execute-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId, PayerID: payerId })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Payment Success:', data);
    })
    .catch(error => {
        console.error('Payment Error:', error);
    });

    // Scrolling Feature with Scrollbar
    const scrollingSections = document.querySelectorAll('.scrolling-container');
    scrollingSections.forEach(container => {
        const parentSection = container.closest('section');
        if (!parentSection) return;

        const scrollBar = document.createElement('div');
        scrollBar.classList.add('scroll-bar');

        const scrollThumb = document.createElement('div');
        scrollThumb.classList.add('scroll-thumb');
        scrollBar.appendChild(scrollThumb);

        parentSection.appendChild(scrollBar);

        const updateThumbPosition = () => {
            const scrollWidth = container.scrollWidth - container.clientWidth;
            const thumbWidth = Math.max(50, (container.clientWidth / container.scrollWidth) * 100);
            const scrollLeft = container.scrollLeft;

            scrollThumb.style.width = `${thumbWidth}%`;
            scrollThumb.style.transform = `translateX(${(scrollLeft / scrollWidth) * 100}%)`;
        };

        container.addEventListener('scroll', updateThumbPosition);

        let isDragging = false;
        scrollThumb.addEventListener('mousedown', (e) => {
            isDragging = true;
            const startX = e.clientX;
            const startScrollLeft = container.scrollLeft;

            const onMouseMove = (e) => {
                if (!isDragging) return;
                const deltaX = e.clientX - startX;
                const scrollWidth = container.scrollWidth - container.clientWidth;
                const newScrollLeft = startScrollLeft + (deltaX / parentSection.offsetWidth) * scrollWidth;
                container.scrollLeft = Math.max(0, Math.min(scrollWidth, newScrollLeft));
            };

            const onMouseUp = () => {
                isDragging = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        updateThumbPosition();
    });

    // Add Ripple Effect on Buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            ripple.classList.add('ripple-effect');
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Scroll-triggered Animations
    const scrollElements = document.querySelectorAll('.product-card, .category, .testimonial-card');
    const scrollObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
            }
        });
    }, { threshold: 0.2 });

    scrollElements.forEach(element => scrollObserver.observe(element));

    // Cart Functionality
    const cart = [];
    const cartModal = document.createElement('div');
    cartModal.classList.add('cart-modal');
    cartModal.innerHTML = `
        <div class="cart-content">
            <h2>Your Cart</h2>
            <ul class="cart-items"></ul>
            <div class="cart-summary">
                <p>Total: $<span class="cart-total">0.00</span></p>
                <button class="checkout-btn">Checkout</button>
            </div>
            <button class="close-cart">&times;</button>
        </div>
    `;
    document.body.appendChild(cartModal);

    const updateCart = () => {
        const cartItemsElement = document.querySelector('.cart-items');
        const cartTotalElement = document.querySelector('.cart-total');

        cartItemsElement.innerHTML = ''; // Clear cart

        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.dataset.index = index;
            removeButton.classList.add('remove-item');
            removeButton.addEventListener('click', () => {
                cart.splice(index, 1);
                updateCart();
            });
            li.appendChild(removeButton);
            cartItemsElement.appendChild(li);
            total += item.price;
        });

        cartTotalElement.textContent = total.toFixed(2);
    };

    document.querySelectorAll('.product-card button').forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('p').textContent.replace('$', ''));

            cart.push({ name: productName, price: productPrice });
            updateCart();
        });
    });

    document.querySelector('.checkout-btn').addEventListener('click', () => {
        alert(`Thank you for your purchase! Total: $${document.querySelector('.cart-total').textContent}`);
        cart.length = 0; // Clear cart
        updateCart();
        cartModal.style.display = 'none';
    });

    document.querySelector('.close-cart').addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Product Slider
    const slider = document.querySelector('.product-grid');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const cardWidth = 220;

    let currentScroll = 0;

    const updateButtons = () => {
        const maxScroll = -(slider.scrollWidth - slider.clientWidth);
        rightArrow.disabled = currentScroll <= maxScroll;
        leftArrow.disabled = currentScroll >= 0;
    };

    rightArrow.addEventListener('click', () => {
        currentScroll -= cardWidth;
        slider.style.transform = `translateX(${currentScroll}px)`;
        updateButtons();
    });

    leftArrow.addEventListener('click', () => {
        currentScroll += cardWidth;
        slider.style.transform = `translateX(${currentScroll}px)`;
        updateButtons();
    });

    updateButtons();

    // Modal Functions
    function openModal(productId) {
        document.getElementById('productModal').style.display = 'block';
        document.getElementById(productId).style.display = 'block';
    }

    function closeModal() {
        document.getElementById('productModal').style.display = 'none';
        const slides = document.getElementsByClassName('modal-slide');
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
    }

    // Service Worker Registration
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker
                .register("/service-worker.js") // Ensure this path matches your actual service worker file location.
                .then((registration) => {
                    console.log("Service Worker registered with scope:", registration.scope);
                })
                .catch((error) => {
                    console.error("Service Worker registration failed:", error); // No change needed; logs registration errors.
                });
        });
    }

    // Fetch and Render Products
    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) throw new Error(`Error fetching products: ${response.status}`);
            const products = await response.json();

            const productContainer = document.querySelector('.product-grid');
            productContainer.innerHTML = ''; // Clear previous products

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card', 'glass');

                const img = document.createElement('img');
                img.src = product.image_url;
                img.alt = product.name;
                productCard.appendChild(img);

                const name = document.createElement('h3');
                name.textContent = product.name;
                productCard.appendChild(name);

                const price = document.createElement('p');
                price.textContent = `$${product.price.toFixed(2)}`;
                productCard.appendChild(price);

                const button = document.createElement('button');
                button.textContent = 'Add to Cart';
                button.addEventListener('click', () => addToCart(product.id));
                productCard.appendChild(button);

                productContainer.appendChild(productCard);
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    fetchProducts();
});
