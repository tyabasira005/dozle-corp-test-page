document.addEventListener('DOMContentLoaded', function() {
    // 1. 背景色の切り替え
    const bgLayers = {
        'red': document.querySelector('.bg-red'),
        'purple': document.querySelector('.bg-purple'),
        'yellow': document.querySelector('.bg-yellow'),
        'blue': document.querySelector('.bg-blue'),
        'pink': document.querySelector('.bg-pink')
    };
    const sections = document.querySelectorAll('section[data-bg]');

    window.addEventListener('scroll', function() {
        const checkPoint = window.scrollY + (window.innerHeight * 0.4);
        const isBottom = (document.body.offsetHeight - (window.scrollY + window.innerHeight)) < 50;
        let activeColor = null;

        if (isBottom) {
            activeColor = 'pink';
        } else {
            sections.forEach(section => {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;
                if (checkPoint >= top && checkPoint < bottom) {
                    activeColor = section.getAttribute('data-bg');
                }
            });
        }

        Object.values(bgLayers).forEach(layer => layer.classList.remove('active'));
        if (activeColor && activeColor !== 'none' && bgLayers[activeColor]) {
            bgLayers[activeColor].classList.add('active');
        }
        if (window.scrollY < 100) {
            Object.values(bgLayers).forEach(layer => layer.classList.remove('active'));
        }
    });

    // 2. スマートヘッダー
    let lastScrollY = 0;
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        if (currentScrollY < 0) return;
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }
        lastScrollY = currentScrollY;
    });

    // 3. フェードイン
    const targets = document.querySelectorAll('.js-fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
            }
        });
    }, { rootMargin: '-50px' });
    targets.forEach(target => observer.observe(target));

    // 4. その他
    const fileInput = document.querySelector('input[name="work_image"]');
    if(fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.size > 10 * 1024 * 1024) {
                alert('ファイルサイズが10MBを超えています。');
                this.value = '';
            }
        });
    }
    const hamburger = document.getElementById('hamburger');
    const spMenu = document.getElementById('sp-menu');
    if(hamburger && spMenu) {
        hamburger.addEventListener('click', function() {
            spMenu.classList.toggle('active');
        });
        spMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => { spMenu.classList.remove('active'); });
        });
    }
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target){
                const offset = 80;
                const position = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: position, behavior: 'smooth' });
            }
        });
    });
});