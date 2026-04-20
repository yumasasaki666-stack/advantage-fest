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
                    content.style.maxHeight = content.scrollHeight + 40 + "px";
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

                let overviewMap = {
                    "３人チーム戦": `
                        <li><strong>形式：</strong>３人チーム戦</li>
                        <li><strong>参加費：</strong>2,500円/人</li>
                        <li><strong>定員：</strong>128チーム（384人）</li>
                    `,
                    "ポケカバトルファクトリー": `
                        <li><strong>形式：</strong>レンタルデッキ対戦</li>
                        <li><strong>所要時間：</strong>約80分</li>
                        <li><strong>参加費：</strong>イベントチケット2枚</li>
                        <li><strong>対象：</strong>初心者OK</li>
                    `,
                    "スリーストリークバトル": `
                        <li><strong>形式：</strong>ガンスリンガー</li>
                        <li><strong>所要時間：</strong>25～80分（連勝数で変化）</li>
                        <li><strong>参加費：</strong>イベントチケット1枚</li>
                    `,
                    "ゆびをふるポケカ体験": `
                        <li><strong>形式：</strong>カジュアルバトル</li>
                        <li><strong>所要時間：</strong>約10分</li>
                        <li><strong>参加費：</strong>無料</li>
                        <li><strong>対象：</strong>初心者OK</li>
                    `
                };

                let overviewList = overviewMap[title] || `
                        <li><strong>形式：</strong>未定</li>
                        <li><strong>参加費：</strong>未定</li>
                `;

                let contentHTML = `
                    <div class="modal-overview">
                        <h4 class="modal-section-title">イベント概要</h4>
                        <ul class="modal-overview-list">
                            ${overviewList}
                        </ul>
                    </div>
                `;

                contentHTML += `<p class="modal-desc">${desc}</p>`;

                if (title === "ポケカバトルファクトリー") {
                    contentHTML += `
                        <h4 class="modal-section-title">あそびかた</h4>
                        <ul class="modal-list">
                            <li>3人1組のフライト式で進行（総当たり3回対戦）<br>
                                <span style="font-size: 0.85em; color: var(--text-muted);">※3人揃ったら対戦スタート</span>
                            </li>
                            <li class="hint-card-item">ヒントカードをもとにデッキ内容を推測<br>
                                <img src="hintcard.png" alt="ヒントカードのサンプル" class="hint-image">
                                <span class="hint-image-caption">あの<span class="highlight text-gold">「人気YouTuber」</span>からの提供デッキも!?</span>
                            </li>
                            <li>レンタルデッキから1つ選んで参加</li>
                            <li>1勝ごとにデッキ交換が可能<br>
                                <span style="font-size: 0.85em; color: var(--text-muted);">（交換先は<span class="highlight text-gold">「交換用デッキ」</span>または<span class="highlight text-gold">「直前に勝利した相手のデッキ」</span>）</span>
                            </li>
                        </ul>
                    `;
                } else if (title === "３人チーム戦") {
                    contentHTML += `
                        <h4 class="modal-section-title">あそびかた</h4>
                        <ul class="modal-list">
                            <li>3人1組でチームを組んでエントリー</li>
                            <li>全128チームによる予選＋決勝トーナメント</li>
                            <li>豪華景品や最強チームの称号を手に入れましょう！</li>
                        </ul>
                    `;
                } else if (title === "ゆびをふるポケカ体験") {
                    contentHTML = `
                        <div class="video-container">
                            <iframe width="100%" height="315" src="https://www.youtube.com/embed/otNmflL32sE?si=he_0a1t1xLXqMYrr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                    ` + contentHTML;
                    contentHTML += `
                        <h4 class="modal-section-title">あそびかた</h4>
                        <ul class="modal-list">
                            <li class="hint-card-item">自分でイラストを描いてゆびをふるカードを作成！<br>
                                <img src="yubiwofuru.png" alt="ゆびをふるカード" class="hint-image" style="box-shadow: none; border: none; background: transparent;">
                            </li>
                            <li>ゆびをふるマシンを押すとワザがランダムで決定！</li>
                            <li>相手のゆびをふるカードがきぜつしたら勝ち！</li>
                        </ul>
                    `;
                } else if (title === "スリーストリークバトル") {
                    contentHTML += `
                        <h4 class="modal-section-title">あそびかた</h4>
                        <ul class="modal-list">
                            <li>列に並んでマッチングし、次々と現れる相手と対戦</li>
                            <li>勝った場合はそのまま席に残り、次の挑戦者を待ち受けます</li>
                            <li>連勝数に応じて景品がステップアップ！</li>
                        </ul>
                    `;
                }

                contentHTML += `<div class="modal-cta"><a href="https://livepocket.jp/e/x5q_2" class="btn btn-primary glow-red" target="_blank">イベントに参加する</a></div>`;
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
