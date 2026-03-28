document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const nav = document.querySelector('.nav');

    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        // Simple animation for hamburger icon
        const bars = document.querySelectorAll('.bar');
        if (nav.classList.contains('active')) {
            bars[0].style.transform = 'translateY(8px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const bars = document.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });

    // Fade-in Animation on Scroll
    const fadeElements = document.querySelectorAll('.fade-in');

    const checkFade = () => {
        const triggerBottom = window.innerHeight * 0.85;

        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    };

    // Run once on load
    checkFade();
    // Run on scroll
    window.addEventListener('scroll', checkFade);

    // Accordion for FAQ
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        header.classList.toggle('active');
        const content = header.nextElementSibling;
        
        if (header.classList.contains('active')) {
            // 先にpaddingをつける
            content.style.padding = "1.5rem";
            
            // 一瞬待ってから高さ計算（←これがミソ）
            requestAnimationFrame(() => {
                content.style.maxHeight = content.scrollHeight +40 + "px";
            });

        } else {
            content.style.maxHeight = null;
            content.style.padding = "0 1.5rem";
        }
    });
});

    // Event Modal
    const eventCards = document.querySelectorAll('#event .card');
    const modal = document.getElementById('event-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    if (eventCards.length > 0 && modal) {
        eventCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('.card-title').textContent;
                const desc = card.querySelector('.card-desc').textContent;
                
                modalTitle.textContent = title;
                modalBody.innerHTML = `
                    <p>${desc}</p>
                    <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(255,255,255,0.05); border-left: 3px solid var(--primary-color);">
                        <p style="color: #ddd; font-size: 0.95rem;">
                            【適当な詳細情報】<br>
                            ここにイベントの詳しいルールや参加条件などの文章が入ります。現在は適当なダミーテキストとして表示されています。<br><br>
                            詳細なタイムテーブルや持ち物についても、後日追記される予定です。
                        </p>
                    </div>
                `;
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);
    }
});
