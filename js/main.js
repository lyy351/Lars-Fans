(function() {
    const container = document.getElementById('cardsContainer');
    const cards = document.querySelectorAll('.card');
    const navBtns = document.querySelectorAll('.nav-btn');
    const smiley = document.getElementById('giantSmiley');

    let activeIndex = 0;
    let isMobile = window.innerWidth <= 768;

    // iframe 高度自适应
    function resizeIframe(iframe) {
        try {
            if (iframe.contentDocument && iframe.contentDocument.body) {
                const height = iframe.contentDocument.body.scrollHeight;
                iframe.style.height = height + 'px';
            }
        } catch (e) {}
    }

    const iframes = document.querySelectorAll('.page-frame');
    iframes.forEach(iframe => {
        iframe.addEventListener('load', function() {
            resizeIframe(this);
            setTimeout(() => resizeIframe(this), 300);
            setTimeout(() => resizeIframe(this), 800);
        });
    });

    window.addEventListener('resize', () => {
        iframes.forEach(iframe => resizeIframe(iframe));
        isMobile = window.innerWidth <= 768;
        scrollToCard(activeIndex, false);
    });

    function setActiveButton(index) {
        navBtns.forEach((btn, i) => {
            if (i === index) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        activeIndex = index;
    }

    function scrollToCard(index, smooth = true) {
        if (!container) return;
        const cardWidth = container.clientWidth;
        if (cardWidth === 0) return;
        container.scrollTo({
            left: index * cardWidth,
            behavior: smooth ? 'smooth' : 'auto'
        });
    }

    function getIndexFromScroll() {
        if (!container) return 0;
        const scrollLeft = container.scrollLeft;
        const cardWidth = container.clientWidth;
        if (cardWidth === 0) return 0;
        return Math.round(scrollLeft / cardWidth);
    }

    function handleScroll() {
        if (!isMobile) return;
        const newIndex = getIndexFromScroll();
        if (newIndex !== activeIndex && newIndex >= 0 && newIndex < navBtns.length) {
            setActiveButton(newIndex);
        }
    }
    container.addEventListener('scroll', handleScroll);

    navBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            setActiveButton(index);
            scrollToCard(index, true);
        });
    });

    // 笑脸彩蛋
    const messages = [
        "今天也要开心哦！", "去看最新Vlog了吗？", "猜猜我下周去哪？",
        "这个笑容你给几分？", "嘿嘿嘿", "演唱会等你来！",
        "吃了吗？", "又是元气满满的一天", "🎵 哼着歌呢"
    ];
    const emojis = ['😉', '😄', '😁', '😆', '😂', '😎'];
    const colors = ['#FFD93D', '#FF8A5C', '#FF6B6B', '#FFB347', '#FF9F1C'];

    smiley.addEventListener('click', () => {
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        smiley.textContent = randomEmoji;
        smiley.style.color = colors[Math.floor(Math.random() * colors.length)];
        const msg = messages[Math.floor(Math.random() * messages.length)];
        alert(msg);
    });

    setActiveButton(0);
    scrollToCard(0, false);

    window.addEventListener('load', () => {
        iframes.forEach(iframe => resizeIframe(iframe));
    });
})();
