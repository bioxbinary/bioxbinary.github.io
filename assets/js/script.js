/* ============================================================
   Bioxbinary — Site Script
   - Sticky navigation & scroll-spy
   - Scroll-reveal animations
   - Binary-rain hero backdrop
   - Live Edge Telemetry stream simulator
   - Interactive Hardware Tabs (DoseXTrack)
   - Interactive Signal Architecture Pipeline
   - Cursor-follow spotlight on cards
   - Interactive AI Lab Terminal Assistant (replacing static alert)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------------------------
       1. Sticky Nav on Scroll
       ------------------------------------------------------------ */
    const nav = document.querySelector('.nav');
    if (nav) {
        const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ------------------------------------------------------------
       2. Mobile Menu Toggle
       ------------------------------------------------------------ */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        const setMenu = (open) => {
            navLinks.classList.toggle('open', open);
            menuToggle.classList.toggle('open', open);
            menuToggle.setAttribute('aria-expanded', String(open));
        };
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => setMenu(false));
        });
    }

    /* ------------------------------------------------------------
       3. Smooth Scroll for Anchor Links
       ------------------------------------------------------------ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id.length <= 1) return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ------------------------------------------------------------
       4. Scroll-Reveal Observer
       ------------------------------------------------------------ */
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => observer.observe(el));
    }

    /* ------------------------------------------------------------
       5. Scroll-Spy (Nav Active State)
       ------------------------------------------------------------ */
    const spySections = document.querySelectorAll('section[id]');
    const spyLinks = document.querySelectorAll('.nav-links a[href*="#"]');
    // The page's own link (e.g. "Home") yields its active state while a section link is lit
    const pageLink = document.querySelector('.nav-links a.active:not([href*="#"])');
    if (spySections.length && spyLinks.length) {
        window.addEventListener('scroll', () => {
            let current = '';
            spySections.forEach(section => {
                if (section.getBoundingClientRect().top <= 180) {
                    current = section.getAttribute('id');
                }
            });
            let matched = false;
            spyLinks.forEach(link => {
                const isCurrent = current !== '' && link.getAttribute('href').endsWith('#' + current);
                link.classList.toggle('active', isCurrent);
                matched = matched || isCurrent;
            });
            if (pageLink) pageLink.classList.toggle('active', !matched);
        }, { passive: true });
    }

    /* ------------------------------------------------------------
       5a. Binary rain behind the hero ("Think binary.")
       ------------------------------------------------------------ */
    const rain = document.querySelector('.binary-rain');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rain && rain.getContext && !prefersReducedMotion) {
        const ctx = rain.getContext('2d');
        const cell = 18;
        const color = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#3dff9a';
        let width = 0, height = 0, drops = [], visible = true, lastFrame = 0;

        const resizeRain = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = rain.clientWidth;
            height = rain.clientHeight;
            rain.width = width * dpr;
            rain.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.font = `${cell - 5}px "JetBrains Mono", monospace`;
            drops = Array.from({ length: Math.ceil(width / cell) }, () => Math.random() * -height / cell);
        };

        const drawRain = (time) => {
            if (!visible) return;
            requestAnimationFrame(drawRain);
            if (time - lastFrame < 70) return;   // ~14 fps is plenty for a backdrop
            lastFrame = time;

            // Fade previous glyphs toward transparent so the grid beneath stays visible
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.14)';
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = 'source-over';

            ctx.fillStyle = color;
            drops.forEach((y, i) => {
                ctx.fillText(Math.random() > 0.5 ? '1' : '0', i * cell, y * cell);
                drops[i] = (y * cell > height && Math.random() > 0.97) ? 0 : y + 1;
            });
        };

        resizeRain();
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resizeRain, 150);
        });

        // Only animate while the hero is on screen
        new IntersectionObserver(([entry]) => {
            const wasVisible = visible;
            visible = entry.isIntersecting;
            if (visible && !wasVisible) requestAnimationFrame(drawRain);
        }).observe(rain);

        requestAnimationFrame(drawRain);
    }

    /* ------------------------------------------------------------
       5b. Cursor-follow spotlight on cards
       ------------------------------------------------------------ */
    document.querySelectorAll('.spotlight').forEach(card => {
        card.addEventListener('pointermove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
            card.style.setProperty('--my', `${e.clientY - rect.top}px`);
        });
    });

    /* ------------------------------------------------------------
       6. Live Edge Telemetry Simulator (Hero Console)
       ------------------------------------------------------------ */
    const telemetryBody = document.getElementById('telemetryBody');
    const telemetryPauseBtn = document.getElementById('telemetryPauseBtn');
    let telemetryInterval = null;
    let isTelemetryPaused = false;

    if (telemetryBody) {
        const telemetryEvents = [
            { tag: '[ESP32-S3]', msg: 'FreeRTOS core 0 idle: 94% · Free heap: 188 KB' },
            { tag: '[MQTT-BUS]', msg: 'QoS 1 packet ACK · Latency 14ms · Mosquitto ws://ok' },
            { tag: '[DOSEXTRACK]', msg: 'Dose cycle armed · RTC synced over NTP' },
            { tag: '[EDGE-AI]', msg: 'On-device vibration anomaly check: nominal (score 0.02)' },
            { tag: '[AGRI-NODE]', msg: 'Sensor packet received: EC 1.35 mS/cm · pH 6.42' },
            { tag: '[SECURITY]', msg: 'TLS v1.3 ephemeral ECDHE handshake verified' },
            { tag: '[TELEMETRY]', msg: 'Heartbeat ping: 12 nodes reported 100% liveness' },
            { tag: '[DOSEXTRACK]', msg: 'Dispenser event published to topic /biox/dispense/ack' },
            { tag: '[MESH-NET]', msg: 'Self-organizing routing table updated: 0 packet loss' }
        ];

        let eventIndex = 0;

        function addTelemetryLine() {
            if (isTelemetryPaused) return;
            const now = new Date();
            const timeStr = now.toTimeString().split(' ')[0] + '.' + String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
            const item = telemetryEvents[eventIndex % telemetryEvents.length];
            eventIndex++;

            const line = document.createElement('div');
            line.className = 'telemetry-line';
            line.innerHTML = `
                <span class="telemetry-time">${timeStr}</span>
                <span class="telemetry-tag">${item.tag}</span>
                <span class="telemetry-msg">${item.msg}</span>
            `;

            telemetryBody.appendChild(line);

            // Keep maximum 20 lines in DOM
            if (telemetryBody.children.length > 20) {
                telemetryBody.removeChild(telemetryBody.children[0]);
            }

            telemetryBody.scrollTop = telemetryBody.scrollHeight;
        }

        // Add 4 initial lines
        for (let i = 0; i < 4; i++) {
            addTelemetryLine();
        }

        telemetryInterval = setInterval(addTelemetryLine, 2800);

        if (telemetryPauseBtn) {
            telemetryPauseBtn.addEventListener('click', () => {
                isTelemetryPaused = !isTelemetryPaused;
                telemetryPauseBtn.textContent = isTelemetryPaused ? 'Resume' : 'Pause';
                telemetryPauseBtn.style.color = isTelemetryPaused ? 'var(--status-amber)' : 'var(--text-faint)';
            });
        }
    }

    /* ------------------------------------------------------------
       7. Interactive Hardware Tabs (DoseXTrack Showcase)
       ------------------------------------------------------------ */
    const tabButtons = document.querySelectorAll('.hardware-tab-btn');
    const tabPanels = document.querySelectorAll('.hardware-tab-panel');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab');

            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    /* ------------------------------------------------------------
       8. Interactive Signal Architecture Pipeline
       ------------------------------------------------------------ */
    const pipelineNodes = document.querySelectorAll('.pipeline-node');
    pipelineNodes.forEach(node => {
        node.addEventListener('click', () => {
            pipelineNodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');
        });
    });

    /* ------------------------------------------------------------
       9. Interactive AI Lab Terminal Drawer
       ------------------------------------------------------------ */
    const terminalDrawer = document.getElementById('terminalDrawer');
    const chatToggle = document.querySelector('.chat-toggle');
    const terminalCloseBtn = document.getElementById('terminalCloseBtn');
    const terminalInput = document.getElementById('terminalInput');
    const terminalSendBtn = document.getElementById('terminalSendBtn');
    const terminalConversation = document.getElementById('terminalConversation');
    const openTerminalBtns = document.querySelectorAll('.open-terminal-trigger');

    function toggleTerminal() {
        if (!terminalDrawer) return;
        terminalDrawer.classList.toggle('open');
        if (terminalDrawer.classList.contains('open') && terminalInput) {
            terminalInput.focus();
        }
    }

    if (chatToggle) {
        chatToggle.addEventListener('click', toggleTerminal);
    }
    if (terminalCloseBtn) {
        terminalCloseBtn.addEventListener('click', toggleTerminal);
    }
    openTerminalBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTerminal();
    }));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && terminalDrawer && terminalDrawer.classList.contains('open')) {
            terminalDrawer.classList.remove('open');
        }
    });

    // Intelligent Lab Assistant Answers
    const answersKB = [
        {
            keywords: ['zero', 'nrf52', 'bluetooth', 'battery'],
            response: "<strong>DoseXTrack Zero</strong> is the pared-back, battery-powered version of DoseXTrack, currently in development. A Seeed XIAO nRF52840 buzzes when a dose is due and a button press stops it; the schedule is set once from a phone over Bluetooth. No Wi-Fi, no mains power, no app. Components are on the bench — firmware and bench tests are next. See it on the <a href='products.html' style='color:var(--accent);text-decoration:underline;'>Experiments page</a>."
        },
        {
            keywords: ['dosextrack', 'pill', 'dispenser', 'medication'],
            response: "<strong>DoseXTrack</strong> is our working open-source medication monitoring system. Built on the ESP32 (ESP-IDF), it coordinates physical dispensing with a local Mosquitto MQTT broker and communicates real-time events to a browser dashboard over WebSockets. Source code and hardware schematics are available on our GitHub."
        },
        {
            keywords: ['autonomous', 'company', 'run by ai', 'ai agent', 'who is', 'about'],
            response: "<strong>Bioxbinary</strong> is an independent lab working where AI meets assistive technology. It is small and hands-on: devices are prototyped on real microcontrollers, tested on the bench, and published on GitHub. AI tools help with code and documentation; the hardware is built and checked by hand."
        },
        {
            keywords: ['tech stack', 'hardware', 'esp32', 'code', 'stack'],
            response: "Our core edge stack utilizes <strong>ESP-IDF & FreeRTOS</strong> for low-power C/C++ firmware, <strong>Mosquitto</strong> for lightweight pub/sub MQTT messaging, <strong>WebSockets</strong> for real-time telemetry dashboards, and edge ML models optimized for microcontroller inference."
        },
        {
            keywords: ['contribute', 'collaborate', 'github', 'join', 'open source'],
            response: "Everything we build is developed in the open. You can explore our repositories, fork hardware CAD files, and submit PRs at <a href='https://github.com/bioxbinary' target='_blank' style='color:var(--accent);text-decoration:underline;'>github.com/bioxbinary</a>, or reach out directly through the <a href='contact.html' style='color:var(--accent);text-decoration:underline;'>Contact page</a>."
        },
        {
            keywords: ['bioethics', 'ethics', 'privacy'],
            response: "Our bioethics framework mandates <strong>Local-First Architecture</strong>: health and biometric telemetry never leave local networks without explicit patient consent. No cloud lock-in, zero predatory monetization of assistive healthcare."
        }
    ];

    function sendTerminalMessage(text) {
        if (!text || !text.trim() || !terminalConversation) return;
        const query = text.trim();

        // Append user message
        const userMsg = document.createElement('div');
        userMsg.className = 'terminal-msg user';
        userMsg.textContent = query;
        terminalConversation.appendChild(userMsg);
        terminalConversation.scrollTop = terminalConversation.scrollHeight;

        if (terminalInput) terminalInput.value = '';

        // Match response
        const lower = query.toLowerCase();
        let matched = answersKB.find(item => item.keywords.some(k => lower.includes(k)));

        let replyHtml = matched
            ? matched.response
            : "Thanks for checking in! All active builds live on <a href='https://github.com/bioxbinary' target='_blank' style='color:var(--accent);text-decoration:underline;'>GitHub</a>. For custom inquiries or research discussions, send a note via <a href='contact.html' style='color:var(--accent);text-decoration:underline;'>Contact</a> or email <strong>hello@bioxbinary.in</strong>.";

        // Append bot message with typing simulation
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'terminal-msg bot';
            botMsg.innerHTML = replyHtml;
            terminalConversation.appendChild(botMsg);
            terminalConversation.scrollTop = terminalConversation.scrollHeight;
        }, 320);
    }

    if (terminalSendBtn && terminalInput) {
        terminalSendBtn.addEventListener('click', () => sendTerminalMessage(terminalInput.value));
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendTerminalMessage(terminalInput.value);
            }
        });
    }

    // Quick chips in terminal
    document.querySelectorAll('.quick-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const prompt = chip.getAttribute('data-prompt') || chip.textContent;
            sendTerminalMessage(prompt);
        });
    });

    /* ------------------------------------------------------------
       10. Topic Selector for Contact Page
       ------------------------------------------------------------ */
    const topicChips = document.querySelectorAll('.topic-chip');
    const subjectInput = document.getElementById('subject');
    if (topicChips.length && subjectInput) {
        topicChips.forEach(chip => {
            chip.addEventListener('click', () => {
                topicChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                subjectInput.value = chip.getAttribute('data-topic') || chip.textContent;
            });
        });
    }

});
