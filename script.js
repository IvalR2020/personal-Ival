document.addEventListener('DOMContentLoaded', function() {
    
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('#main-nav a');
    
    // Tentukan laman saat ini
    let activePage = 'index.html'; 

    if (currentPath.includes('about.html')) {
        activePage = 'about.html';
    } else if (currentPath.includes('portfolio.html')) {
        activePage = 'portfolio.html';
    } else if (currentPath.includes('contact.html')) {
        activePage = 'contact.html';
    } else if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
        activePage = 'index.html';
    }

    // ===============================================
    // 1. Logika Highlight Navigasi Aktif (Bekerja di Semua Laman)
    // ===============================================
    navLinks.forEach(a => {
        a.classList.remove('active');
        // Gunakan includes() untuk mencocokkan laman aktif dengan href
        if (a.getAttribute('href').includes(activePage)) {
            a.classList.add('active');
        }
    });

    // ===============================================
    // 2. Logika INISIALISASI SWIPER & MODAL
    // Hanya berjalan jika berada di laman portfolio.html
    // ===============================================
    if (activePage === 'portfolio.html') {
        
        // INISIALISASI SWIPER.JS (Slider)
        const swiper = new Swiper(".mySwiper", {
            slidesPerView: 1, 
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                768: { slidesPerView: 2, spaceBetween: 40, },
                1024: { slidesPerView: 3, spaceBetween: 50, },
            },
        });

        // Setup Modal
        const modal = document.getElementById("portfolioModal");
        const span = document.getElementsByClassName("close")[0];
        const portfolioItems = document.querySelectorAll(".portfolio-item"); 

        // Fungsi Penutup Modal
        function closeModal() {
            modal.style.display = "none";
            document.getElementById('modalVideoEmbed').innerHTML = ''; // Hentikan video
            document.body.style.overflow = "auto"; // Aktifkan kembali scrolling body
        }

        // Logika Pembuka Modal
        portfolioItems.forEach(item => {
            item.onclick = function() {
                const title = this.getAttribute('data-title');
                const role = this.getAttribute('data-role');
                const desc = this.getAttribute('data-desc');
                const videoUrl = this.getAttribute('data-video-url');
                const originalUrl = this.getAttribute('data-original-url') || videoUrl; 

                document.getElementById('modalTitle').textContent = title;
                document.getElementById('modalRole').textContent = role;
                document.getElementById('modalDescription').textContent = desc;
                document.getElementById('modalLink').href = originalUrl; 

                let embedUrl = videoUrl;
                if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
                    embedUrl += '?autoplay=1&rel=0';
                } else if (videoUrl.includes('vimeo.com')) {
                    embedUrl += '?autoplay=1&byline=0&portrait=0';
                } else {
                    embedUrl += '?autoplay=1'; 
                }

                const iframeHTML = `<iframe src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                document.getElementById('modalVideoEmbed').innerHTML = iframeHTML;

                modal.style.display = "block";
                document.body.style.overflow = "hidden";
            }
        });

        // Event penutup modal
        span.onclick = closeModal;
        window.onclick = function(event) { if (event.target == modal) { closeModal(); } }
        document.onkeydown = function(evt) { if ((evt || window.event).key === 'Escape') { closeModal(); } };
    }
});