document.addEventListener('DOMContentLoaded', function() {
    
    // 背景レイヤーの配列（切り替える順番）
    const layers = [
        document.querySelector('.bg-red'),    // 0% - 20%
        document.querySelector('.bg-purple'), // 20% - 40%
        document.querySelector('.bg-yellow'), // 40% - 60%
        document.querySelector('.bg-blue'),   // 60% - 80%
        document.querySelector('.bg-pink')    // 80% - 100%
    ];

    function updateBackground() {
        // 現在のスクロール位置を0〜1の割合で計算
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollFraction = scrollY / maxScroll;
        
        // 5分割（0.2刻み）で現在のインデックスを決定
        let index = Math.floor(scrollFraction * layers.length);
        
        // ページ最下部でのインデックス溢れを防止
        if (index >= layers.length) index = layers.length - 1;

        // 背景色の切り替え実行
        layers.forEach((layer, i) => {
            if (i === index) {
                layer.classList.add('active');
            } else {
                layer.classList.remove('active');
            }
        });

        // ページトップ付近（100px以内）なら背景をクリアにする（元の挙動を再現）
        if (scrollY < 100) {
            layers.forEach(l => l.classList.remove('active'));
        }
    }

    // スクロールイベントの登録
    window.addEventListener('scroll', updateBackground);
    updateBackground(); // 初期実行

    // スマートヘッダー（スクロールで隠れる）
    let lastScrollY = 0;
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }
        lastScrollY = currentScrollY;
    });

    // フェードインアニメーション
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
            }
        });
    }, { rootMargin: '-50px' });
    document.querySelectorAll('.js-fade-up').forEach(target => observer.observe(target));

    // スムーススクロール
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