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
                
                let contentHTML = `<p>${desc}</p>`;

                if (title === "ポケカバトルファクトリー") {
                    contentHTML += `
                        <h4 class="modal-section-title">あそびかた</h4>
                        <ul class="modal-list">
                            <li>3人1組のフライト式で進行（総当たり3回対戦）<br>
                                <span style="font-size: 0.85em; color: var(--text-muted);">※3人揃ったら対戦スタート</span>
                            </li>
                            <li>ヒントカードをもとにデッキ内容を推測<br>
                                <img src="hintcard.png" alt="ヒントカードのサンプル" class="hint-image">
                            </li>
                            <li>レンタルデッキから1つ選んで参加</li>
                            <li>1勝ごとにデッキ交換が可能<br>
                                <span style="font-size: 0.85em; color: var(--text-muted);">（交換先は<span class="highlight text-gold">「交換用デッキ」</span>または<span class="highlight text-gold">「直前に勝利した相手のデッキ」</span>）</span>
                            </li>
                        </ul>
                    `;
                } else if (title === "128チーム チーム戦") {
                    contentHTML += `
                        <h4 class="modal-section-title">あそびかた</h4>
                        <ul class="modal-list">
                            <li>3人1組でチームを組んでエントリー</li>
                            <li>全128チームによる予選＋決勝トーナメント</li>
                            <li>豪華景品や最強チームの称号を手に入れましょう！</li>
                        </ul>
                    `;
                } else if (title === "ゆびをふるポケカ体験") {
                    contentHTML += `
                        <h4 class="modal-section-title">あそびかた</h4>
                        <ul class="modal-list">
                            <li>用意された専用の「ゆびをふる」デッキを使用</li>
                            <li>ワザの指示に従ってサイコロを振り、様々な効果を発動</li>
                            <li>初心者から経験者まで運試しとして楽しめます</li>
                        </ul>
                    `;
                } else if (title === "ガンスリンガーバトル") {
                    contentHTML += `
                        <h4 class="modal-section-title">あそびかた</h4>
                        <ul class="modal-list">
                            <li>列に並んでマッチングし、次々と現れる相手と対戦</li>
                            <li>勝った場合はそのまま席に残り、次の挑戦者を待ち受けます</li>
                            <li>負けても列の最後尾から再チャレンジ可能です</li>
                            <li>連勝数に応じて景品がステップアップ！</li>
                        </ul>
                    `;
                }

                modalBody.innerHTML = contentHTML;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (modalClose) modalClose.addEventListener('click', closeModal);
        if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    }
});
