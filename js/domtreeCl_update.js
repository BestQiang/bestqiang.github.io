(function () {

    /* ================= 基础 ================= */

    function css(el, v) {
        el.style.transform = v;
        el.style.WebkitTransform = v;
    }

    document.body.style.margin = 0;
    document.body.style.background =
        'radial-gradient(circle at center, #02040f, #000)';

    /* ================= 场景（真正居中） ================= */

    const scene = document.createElement('div');
    scene.style.position = 'fixed';
    scene.style.left = '50%';
    scene.style.top = '50%';
    scene.style.width = '0';
    scene.style.height = '0';
    scene.style.perspective = '1200px';
    document.body.appendChild(scene);

    /* ================= 树 ================= */

    const tree = document.createElement('div');
    tree.style.position = 'absolute';
    tree.style.transformStyle = 'preserve-3d';
    css(tree, 'translate3d(0,0,0)');
    scene.appendChild(tree);

    const TREE_H = 520;
    const TREE_R = 220;
    const WORDS = 360;

    const texts = [
        'Dear 琳琳', 'Merry Christmas', '我想你',
        'Only you', '靠近你', 'Lᵒᵛᵉ',
        '遇见你真好', 'Christmas', '你在就好'
    ];

    /* ================= 树冠（正确方向锥体） ================= */

    const items = [];

    for (let i = 0; i < WORDS; i++) {
        const el = document.createElement('div');
        el.innerText = texts[Math.floor(Math.random() * texts.length)];

        el.style.position = 'absolute';
        el.style.padding = '4px 10px';
        el.style.fontSize = '13px';
        el.style.color = '#fff';
        el.style.borderRadius = '16px';
        el.style.background = 'rgba(40,160,90,0.35)';
        el.style.boxShadow = '0 0 12px rgba(120,255,180,.9)';
        el.style.cursor = 'pointer';
        el.style.whiteSpace = 'nowrap';
        el.style.transformStyle = 'preserve-3d';
        el.style.transition = 'transform 1s ease, box-shadow .5s';

        const y = Math.random() * TREE_H * 0.82;
        const radius = (y / (TREE_H * 0.82)) * TREE_R;
        const angle = Math.random() * Math.PI * 2;

        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        el._pos = { x, y, z };
        el._angle = angle;
        el._radius = radius;
        el._float = false;

        css(el, `translate3d(${x}px, ${y}px, ${z}px)`);

        /* 点击飞出 */
        el.onclick = e => {
            e.stopPropagation();
            el._float = !el._float;

            if (el._float) {
                css(el,
                    `translate3d(${x * 0.3}px, ${y * 0.3}px, 800px)
                     scale(1.6)`
                );
                el.style.boxShadow = '0 0 30px gold';
                el.style.zIndex = 999;
            } else {
                css(el,
                    `translate3d(${x}px, ${y}px, ${z}px)`
                );
                el.style.boxShadow = '0 0 12px rgba(120,255,180,.9)';
                el.style.zIndex = '';
            }
        };

        tree.appendChild(el);
        items.push(el);
    }

    /* ================= 树干（真·3D 圆柱） ================= */

    const trunk = document.createElement('div');
    trunk.style.position = 'absolute';
    trunk.style.transformStyle = 'preserve-3d';
    trunk.style.top = TREE_H * 0.82 + 'px';
    tree.appendChild(trunk);

    const SEG = 20;
    const R = 26;
    const H = 140;

    for (let i = 0; i < SEG; i++) {
        const face = document.createElement('div');
        face.style.position = 'absolute';
        face.style.width = (Math.PI * R * 2 / SEG + 2) + 'px';
        face.style.height = H + 'px';
        face.style.background =
            'linear-gradient(#6b3e1e, #3e220f)';
        face.style.opacity = .9;
        face.style.transformOrigin = 'center center';

        const a = i / SEG * 360;
        css(face,
            `rotateY(${a}deg) translateZ(${R}px)`
        );
        trunk.appendChild(face);
    }

    css(trunk, `translate3d(0,0,0)`);

    /* ================= 树顶星星 ================= */

    const star = document.createElement('div');
    star.innerText = '⭐';
    star.style.position = 'absolute';
    star.style.fontSize = '38px';
    star.style.top = '-42px';
    star.style.left = '-18px';
    star.style.textShadow = '0 0 40px gold';
    tree.appendChild(star);

    /* ================= 雪花（空间散布） ================= */

    const snowBox = document.createElement('div');
    snowBox.style.position = 'fixed';
    snowBox.style.left = 0;
    snowBox.style.top = 0;
    snowBox.style.width = '100%';
    snowBox.style.height = '100%';
    snowBox.style.pointerEvents = 'none';
    snowBox.style.perspective = '1000px';
    document.body.appendChild(snowBox);

    const SNOW = 260;
    const flakes = [];

    for (let i = 0; i < SNOW; i++) {
        const f = document.createElement('div');
        f.innerText = '❄';
        f.style.position = 'absolute';
        f.style.color = '#fff';
        f.style.fontSize = (8 + Math.random() * 10) + 'px';
        snowBox.appendChild(f);

        flakes.push({
            el: f,
            x: Math.random() * innerWidth - innerWidth / 2,
            y: Math.random() * innerHeight - innerHeight / 2,
            z: Math.random() * 800,
            vy: .3 + Math.random(),
            sway: Math.random() * 1.5
        });
    }

    /* ================= 动画 ================= */

    let t = 0;

    function animate() {
        t += 0.01;

        css(tree,
            `translate3d(0,0,0)
             rotateY(${Math.sin(t / 2) * 18}deg)`
        );

        items.forEach(el => {
            if (el._float) return;
            const sway = Math.sin(t + el._angle) * 6;
            const x = Math.cos(el._angle) * el._radius + sway;
            css(el,
                `translate3d(${x}px, ${el._pos.y}px, ${el._pos.z}px)`
            );
        });

        flakes.forEach(f => {
            f.y += f.vy;
            f.x += Math.sin(t + f.z) * f.sway;

            if (f.y > innerHeight / 2) f.y = -innerHeight / 2;

            css(f.el,
                `translate3d(${f.x}px, ${f.y}px, ${f.z}px)`
            );
        });

        requestAnimationFrame(animate);
    }

    animate();

})();
