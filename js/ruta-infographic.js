/**
 * RUTA EMPLEABLE — Interactive Infographic
 * Handles: scroll reveal, desktop SVG road, particles, horizontal scroll
 * All selectors use .ri- prefix to avoid conflicts
 */

(function () {
    'use strict';

    /* ==========================================
       1. SCROLL REVEAL (IntersectionObserver)
       ========================================== */
    function initScrollReveal() {
        var steps = document.querySelectorAll('.ri-step');
        if (!steps.length) return;

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('ri-visible');
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
        );

        steps.forEach(function (step) {
            observer.observe(step);
        });
    }

    /* ==========================================
       2. DESKTOP SVG ROAD GENERATOR
       ========================================== */
    function buildRoad() {
        if (window.innerWidth <= 992) return;

        var stepsEl = document.getElementById('riSteps');
        if (!stepsEl) return;

        // Remove old SVG if exists
        var oldSvg = stepsEl.querySelector('.ri-road-svg');
        if (oldSvg) oldSvg.remove();

        var cards = stepsEl.querySelectorAll('.ri-step');
        if (cards.length < 2) return;

        var box = stepsEl.getBoundingClientRect();
        var pts = [];

        cards.forEach(function (card) {
            var numEl = card.querySelector('.ri-step-number');
            if (!numEl) return;
            var r = numEl.getBoundingClientRect();
            pts.push({
                x: r.left + r.width / 2 - box.left,
                y: r.top + r.height / 2 - box.top
            });
        });

        if (pts.length < 2) return;

        var NS = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(NS, 'svg');
        svg.classList.add('ri-road-svg');
        svg.setAttribute('width', box.width);
        svg.setAttribute('height', box.height);
        svg.setAttribute('viewBox', '0 0 ' + box.width + ' ' + box.height);
        svg.setAttribute('preserveAspectRatio', 'none');

        // Build smooth cubic bezier path
        var d = 'M ' + pts[0].x + ' ' + pts[0].y;
        for (var i = 1; i < pts.length; i++) {
            var p = pts[i - 1];
            var c = pts[i];
            var cpx1 = p.x + (c.x - p.x) * 0.5;
            var cpy1 = p.y;
            var cpx2 = p.x + (c.x - p.x) * 0.5;
            var cpy2 = c.y;
            d += ' C ' + cpx1 + ' ' + cpy1 + ', ' + cpx2 + ' ' + cpy2 + ', ' + c.x + ' ' + c.y;
        }

        // Road body (wide semi-transparent)
        var roadBody = document.createElementNS(NS, 'path');
        roadBody.setAttribute('d', d);
        roadBody.classList.add('ri-road-body');
        svg.appendChild(roadBody);

        // Glow trail
        var roadGlow = document.createElementNS(NS, 'path');
        roadGlow.setAttribute('d', d);
        roadGlow.classList.add('ri-road-glow');
        roadGlow.id = 'riRoadGlow';
        svg.appendChild(roadGlow);

        // Center dashes (animated)
        var roadDashes = document.createElementNS(NS, 'path');
        roadDashes.setAttribute('d', d);
        roadDashes.classList.add('ri-road-dashes');
        svg.appendChild(roadDashes);

        stepsEl.style.position = 'relative';
        stepsEl.insertBefore(svg, stepsEl.firstChild);

        // Activate glow after delay
        setTimeout(function () {
            var glow = document.getElementById('riRoadGlow');
            if (glow) glow.classList.add('ri-active');
        }, 700);
    }

    /* ==========================================
       3. PARTICLES (Canvas)
       ========================================== */
    function initParticles() {
        var canvas = document.getElementById('riParticles');
        if (!canvas) return;

        var ctx = canvas.getContext('2d');
        var section = canvas.parentElement;
        var particles = [];
        var count = window.innerWidth < 768 ? 15 : 30;

        function resize() {
            canvas.width = section.offsetWidth;
            canvas.height = section.offsetHeight;
        }

        function spawn() {
            particles = [];
            for (var i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    r: Math.random() * 2.2 + 0.5,
                    dx: (Math.random() - 0.5) * 0.35,
                    dy: (Math.random() - 0.5) * 0.25,
                    a: Math.random() * 0.25 + 0.04
                });
            }
        }

        function loop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(212, 253, 101, ' + p.a + ')';
                ctx.fill();
            }
            requestAnimationFrame(loop);
        }

        resize();
        spawn();
        loop();

        window.addEventListener('resize', function () {
            resize();
            spawn();
        });
    }

    /* ==========================================
       4. HORIZONTAL SCROLL (Desktop mousewheel)
       ========================================== */
    function initHorizontalScroll() {
        if (window.innerWidth <= 992) return;

        var wrapper = document.getElementById('riWrapper');
        if (!wrapper) return;

        // Avoid duplicate listeners
        if (wrapper._riScrollAttached) return;
        wrapper._riScrollAttached = true;

        wrapper.addEventListener(
            'wheel',
            function (e) {
                if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                    e.preventDefault();
                    wrapper.scrollLeft += e.deltaY * 1.2;
                }
            },
            { passive: false }
        );
    }

    /* ==========================================
       5. INIT
       ========================================== */
    document.addEventListener('DOMContentLoaded', function () {
        initScrollReveal();
        initParticles();
        initHorizontalScroll();

        // Build road after layout settles
        setTimeout(buildRoad, 400);

        // Rebuild on resize
        var resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                buildRoad();
                // Re-check horizontal scroll on orientation change
                if (!document.getElementById('riWrapper')._riScrollAttached) {
                    initHorizontalScroll();
                }
            }, 300);
        });
    });
})();
