// Trace portfolio — renders the page from src/data/*.js as the trace of an
// agent run, then wires up scroll progress, streaming text, and expand/collapse.
(function () {
    'use strict';

    const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function projectTitleById(id) {
        const p = PROJECTS.find(proj => proj.id === id);
        return p ? p.title : '';
    }

    // ---------------- Date math for real durations ----------------

    function nowYM() {
        const d = new Date();
        return { y: d.getFullYear(), m: d.getMonth() + 1 };
    }

    function monthsBetween(start, end) {
        const e = end || nowYM();
        return (e.y - start.y) * 12 + (e.m - start.m);
    }

    function formatDuration(months) {
        months = Math.max(months, 0);
        if (months < 1) return '<1mo';
        const y = Math.floor(months / 12);
        const m = months % 12;
        if (y === 0) return `${m}mo`;
        if (m === 0) return `${y}y`;
        return `${y}y ${m}mo`;
    }

    // ---------------- Tool-call rendering ----------------

    let toolCallCounter = 0;

    function statusPillHtml(status, label) {
        return `<span class="status-pill ${status}"><span class="status-dot"></span>${label}</span>`;
    }

    function renderToolCall({ name, status, statusLabel, meta, summary, bodyHtml }) {
        const id = `tc-${toolCallCounter++}`;
        const bodyId = `${id}-body`;
        return `
            <div class="tool-call reveal">
                <button type="button" class="tool-call-header" aria-expanded="false" aria-controls="${bodyId}">
                    <span class="tool-call-name">${name}</span>
                    <span class="tool-call-meta">
                        ${statusPillHtml(status, statusLabel)}
                        ${meta ? `<span class="duration">${escapeHtml(meta)}</span>` : ''}
                        <svg class="expand-icon" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5"/></svg>
                    </span>
                </button>
                <p class="tool-call-summary" data-stream="${escapeHtml(summary)}"></p>
                <div class="tool-call-body" id="${bodyId}">
                    <div class="tool-call-body-inner">${bodyHtml}</div>
                </div>
            </div>
        `;
    }

    function fn(ns, args) {
        const argStr = Object.entries(args).map(([k, v]) => `${k}: "${escapeHtml(v)}"`).join(', ');
        return `<span class="fn">${ns}</span>(${argStr})`;
    }

    // ---------------- Render: Step 0, the answer ----------------

    function renderStepZero() {
        return `
            <section class="step-zero col" id="step-0">
                <div class="prompt-line"><span class="caret">&gt;</span> who_is_guddu_sharma()</div>
                <h1 class="answer-name">${PROFILE.name}</h1>
                <p class="answer-title">${PROFILE.title}</p>
                <p class="answer-role"><span class="slashes">//</span> ${PROFILE.currentRole}</p>
                <div class="answer-actions">
                    <button type="button" class="action-btn is-primary" id="resumeBtn">./resume --export</button>
                    <a class="action-btn" href="#step-4">./contact</a>
                </div>
                <button type="button" class="rerun-btn" id="rerunBtn">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.89M13.5 2v3.5H10" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    re-run trace
                </button>
            </section>
        `;
    }

    // ---------------- Render: Step 1, plan -> profile ----------------

    function renderStepOne() {
        const [first, ...rest] = PROFILE.summary;
        const restHtml = rest.map(p => `<p>${p}</p>`).join('');
        const tagsHtml = SKILLS.map(s => `<button type="button" class="focus-tag" data-skill="${s.key}">${s.name}</button>`).join('');
        const impactHtml = PROFILE.impact.map(i => `
            <button type="button" class="impact-tile" data-target-project="${i.project}">
                <span class="impact-value">${i.value}</span>
                <span class="impact-label">${i.label}</span>
                <span class="impact-source">${projectTitleById(i.project)} →</span>
            </button>
        `).join('');

        const bodyHtml = `
            <div class="profile-copy">${restHtml}</div>
            <div class="focus-tags">${tagsHtml}</div>
            <p class="focus-hint">Click a skill to filter the projects it's used in (step 03).</p>
            <div class="impact-grid">${impactHtml}</div>
        `;

        const toolCall = renderToolCall({
            name: fn('plan.build_profile', {}),
            status: 'done',
            statusLabel: 'DONE',
            meta: '',
            summary: first,
            bodyHtml
        });

        return `
            <section class="step col" id="step-1">
                <div class="step-header">
                    <span class="step-number">01</span>
                    <span class="step-label">Plan &rarr; Profile</span>
                </div>
                ${toolCall}
            </section>
        `;
    }

    // ---------------- Render: Step 2, retrieve -> experience ----------------

    function renderStepTwo() {
        const expCalls = EXPERIENCE.map(e => {
            const status = e.end ? 'done' : 'running';
            const statusLabel = e.end ? 'DONE' : 'RUNNING';
            const duration = formatDuration(monthsBetween(e.start, e.end));
            const bodyHtml = `
                <ul class="tool-call-list">${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
                <div class="tag-row">${e.tech.map(t => `<span class="tag">${t}</span>`).join('')}</div>
            `;
            return renderToolCall({
                name: fn('retrieve.experience', { role: e.role, company: e.company }),
                status, statusLabel,
                meta: duration,
                summary: e.summary,
                bodyHtml
            });
        }).join('');

        const eduCalls = EDUCATION.map(ed => {
            const duration = formatDuration(monthsBetween(ed.start, ed.end));
            const bodyHtml = `<p class="tool-call-description">${ed.description}</p>`;
            return renderToolCall({
                name: fn('retrieve.education', { institution: ed.institution }),
                status: 'done', statusLabel: 'DONE',
                meta: duration,
                summary: ed.title,
                bodyHtml
            });
        }).join('');

        return `
            <section class="step col" id="step-2">
                <div class="step-header">
                    <span class="step-number">02</span>
                    <span class="step-label">Retrieve &rarr; Experience</span>
                </div>
                ${expCalls}
                ${eduCalls}
            </section>
        `;
    }

    // ---------------- Render: Step 3, build -> projects ----------------

    function renderStepThree() {
        const calls = PROJECTS.map(p => {
            const actions = [];
            if (p.repo) actions.push(`<a class="action-btn is-primary" href="${p.repo}" target="_blank" rel="noopener noreferrer">./code <span class="ext-icon">↗</span></a>`);
            if (p.demo) actions.push(`<a class="action-btn is-primary" href="${p.demo}" target="_blank" rel="noopener noreferrer">./demo <span class="ext-icon">↗</span></a>`);
            if (!p.repo) actions.push(`<a class="action-btn" href="${PROFILE.github}" target="_blank" rel="noopener noreferrer">./github <span class="ext-icon">↗</span></a>`);

            const bodyHtml = `
                <p class="tool-call-description">${p.description}</p>
                <div class="tag-row">${p.tech.map(t => `<span class="tag">${t}</span>`).join('')}</div>
                <div class="tool-call-actions">${actions.join('')}</div>
            `;
            return `<div class="project-anchor" id="project-${p.id}" data-skills="${p.skills.join(' ')}">${renderToolCall({
                name: fn('build.project', { name: p.title }),
                status: 'done', statusLabel: 'DONE',
                meta: p.date,
                summary: p.summary,
                bodyHtml
            })}</div>`;
        }).join('');

        return `
            <section class="step col" id="step-3">
                <div class="step-header">
                    <span class="step-number">03</span>
                    <span class="step-label">Build &rarr; Projects</span>
                </div>
                <p class="skills-empty-state" id="skillsEmptyState" hidden style="font-family:var(--font-mono); font-size:0.8rem; color:var(--muted); margin-bottom:1rem;">
                    None of the projects below use this skill yet — see step 02 for how it's been used.
                </p>
                ${calls}
            </section>
        `;
    }

    // ---------------- Render: Step 4, review -> contact ----------------

    function renderStepFour() {
        const certCalls = CERTIFICATIONS.map(c => {
            const bodyHtml = `<p class="tool-call-description">${c.description}</p>`;
            return renderToolCall({
                name: fn('review.certification', { issuer: c.org }),
                status: 'issued', statusLabel: 'ISSUED',
                meta: c.date,
                summary: c.title,
                bodyHtml
            });
        }).join('');

        const contactBlock = `
            <div class="contact-block reveal">
                <div class="contact-grid">
                    <a class="contact-link" href="mailto:${PROFILE.email}">
                        <span class="contact-label">Email</span>
                        <span class="contact-value">${PROFILE.email}</span>
                    </a>
                    <a class="contact-link" href="tel:${PROFILE.phone.replace(/\s+/g, '')}">
                        <span class="contact-label">Phone</span>
                        <span class="contact-value">${PROFILE.phone}</span>
                    </a>
                    <div class="contact-link">
                        <span class="contact-label">Location</span>
                        <span class="contact-value">${PROFILE.location}</span>
                    </div>
                    <a class="contact-link" href="${PROFILE.linkedin}" target="_blank" rel="noopener noreferrer">
                        <span class="contact-label">LinkedIn <span class="ext-icon">↗</span></span>
                        <span class="contact-value">linkedin.com/in/ErGudduSharma</span>
                    </a>
                    <a class="contact-link" href="${PROFILE.github}" target="_blank" rel="noopener noreferrer">
                        <span class="contact-label">GitHub <span class="ext-icon">↗</span></span>
                        <span class="contact-value">github.com/ErGudduSharma</span>
                    </a>
                </div>
            </div>
        `;

        return `
            <section class="step col" id="step-4">
                <div class="step-header">
                    <span class="step-number">04</span>
                    <span class="step-label">Review &rarr; Contact</span>
                </div>
                ${certCalls}
                ${contactBlock}
            </section>
        `;
    }

    function renderRail() {
        const steps = [
            { id: 'step-0', label: '0' },
            { id: 'step-1', label: '1' },
            { id: 'step-2', label: '2' },
            { id: 'step-3', label: '3' },
            { id: 'step-4', label: '4' }
        ];
        const dots = steps.map(s => `<button type="button" class="rail-dot" data-target="${s.id}" aria-label="Jump to ${s.id}">${s.label}</button>`).join('');
        return `
            <nav class="rail" aria-label="Run progress">
                <div class="rail-track"><div class="rail-fill" id="railFill"></div></div>
                ${dots}
            </nav>
        `;
    }

    function renderFooter() {
        return `
            <footer>
                <span>&copy; 2026 ${PROFILE.name}</span>
                <span>Trace</span>
            </footer>
        `;
    }

    function mount() {
        document.body.insertAdjacentHTML('afterbegin', '<div class="progress-bar" id="progressBar"></div>');
        document.getElementById('rail-root').innerHTML = renderRail();
        document.getElementById('app').innerHTML = [
            renderStepZero(),
            renderStepOne(),
            renderStepTwo(),
            renderStepThree(),
            renderStepFour()
        ].join('');
        document.getElementById('footer-root').innerHTML = renderFooter();
    }

    // ---------------- Streaming text ----------------

    function streamText(el, text, speed) {
        speed = speed || 12;
        if (prefersReducedMotion()) {
            el.textContent = text;
            return;
        }
        el.textContent = '';
        el.classList.add('is-streaming');
        let i = 0;
        function tick() {
            el.textContent = text.slice(0, i);
            i++;
            if (i <= text.length) {
                setTimeout(tick, speed);
            } else {
                el.classList.remove('is-streaming');
            }
        }
        tick();
    }

    function initStreaming() {
        const targets = Array.from(document.querySelectorAll('[data-stream]'));
        if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
            targets.forEach(el => { el.textContent = el.dataset.stream; });
            return;
        }
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    streamText(entry.target, entry.target.dataset.stream);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        targets.forEach(el => obs.observe(el));
    }

    function initRerun() {
        const btn = document.getElementById('rerunBtn');
        if (!btn) return;
        btn.addEventListener('click', () => {
            btn.classList.add('is-spinning');
            setTimeout(() => btn.classList.remove('is-spinning'), 600);

            window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });

            const targets = Array.from(document.querySelectorAll('[data-stream]'));
            targets.forEach(el => { el.textContent = ''; el.classList.remove('is-streaming'); });

            if (prefersReducedMotion()) {
                targets.forEach(el => { el.textContent = el.dataset.stream; });
                return;
            }
            let delay = 400;
            targets.forEach(el => {
                setTimeout(() => streamText(el, el.dataset.stream), delay);
                delay += 180;
            });
        });
    }

    // ---------------- Reveal (non-text cards fading in) ----------------

    function initReveal() {
        const items = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
            items.forEach(i => i.classList.add('is-visible'));
            return;
        }
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        items.forEach(i => obs.observe(i));
    }

    // ---------------- Expand/collapse tool-calls ----------------

    function initToolCallToggles() {
        document.querySelectorAll('.tool-call-header').forEach(btn => {
            btn.addEventListener('click', () => toggleToolCall(btn));
        });
    }

    function toggleToolCall(btn, forceOpen) {
        const body = document.getElementById(btn.getAttribute('aria-controls'));
        if (!body) return;
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        const next = forceOpen === undefined ? !expanded : forceOpen;
        btn.setAttribute('aria-expanded', String(next));
        btn.classList.toggle('is-open', next);
        body.classList.toggle('is-open', next);
    }

    // ---------------- Smooth in-page nav ----------------

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', (e) => {
                const target = document.querySelector(a.getAttribute('href'));
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
            });
        });
    }

    // ---------------- Resume export ----------------

    function initResumeButton() {
        const btn = document.getElementById('resumeBtn');
        if (!btn) return;
        btn.addEventListener('click', () => window.print());
    }

    // ---------------- Skill filter (step 01 tags -> step 03 projects) ----------------

    function initSkillFilter() {
        const tags = document.querySelectorAll('.focus-tag');
        const anchors = document.querySelectorAll('.project-anchor');
        const emptyState = document.getElementById('skillsEmptyState');
        let active = null;

        function apply() {
            let matchCount = 0;
            anchors.forEach(a => {
                const skills = (a.dataset.skills || '').split(/\s+/);
                const matches = !active || skills.includes(active);
                a.style.opacity = active && !matches ? '0.3' : '1';
                if (matches) matchCount++;
            });
            tags.forEach(t => t.classList.toggle('is-active', t.dataset.skill === active));
            if (emptyState) emptyState.hidden = !active || matchCount > 0;
        }

        tags.forEach(tag => {
            tag.addEventListener('click', () => {
                const skill = tag.dataset.skill;
                active = active === skill ? null : skill;
                apply();
                if (active) {
                    document.getElementById('step-3').scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
                }
            });
        });
    }

    // ---------------- Impact tiles -> jump to project + expand ----------------

    function initImpactTiles() {
        document.querySelectorAll('.impact-tile').forEach(tile => {
            tile.addEventListener('click', () => {
                const id = tile.dataset.targetProject;
                const anchor = document.getElementById(`project-${id}`);
                if (!anchor) return;
                anchor.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
                const header = anchor.querySelector('.tool-call-header');
                if (header) toggleToolCall(header, true);
            });
        });
    }

    // ---------------- Rail + progress bar scroll tracking ----------------

    function initRailTracking() {
        const progressBar = document.getElementById('progressBar');
        const railFill = document.getElementById('railFill');
        const railDots = document.querySelectorAll('.rail-dot');
        const sections = Array.from(document.querySelectorAll('.step-zero, .step'));

        railDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const target = document.getElementById(dot.dataset.target);
                if (target) target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
            });
        });

        function update() {
            const scrollTop = window.scrollY;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const progress = total > 0 ? Math.min(Math.max(scrollTop / total, 0), 1) : 0;

            if (progressBar) progressBar.style.width = `${progress * 100}%`;
            if (railFill) railFill.style.height = `${progress * 100}%`;

            let current = sections[0] ? sections[0].id : '';
            sections.forEach(section => {
                if (scrollTop >= section.offsetTop - window.innerHeight * 0.4) current = section.id;
            });
            railDots.forEach(dot => dot.classList.toggle('is-active', dot.dataset.target === current));
        }

        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        update();
    }

    function jumpToInitialHash() {
        if (!location.hash) return;
        const target = document.querySelector(location.hash);
        if (target) target.scrollIntoView({ behavior: 'auto', block: 'start' });
    }

    mount();
    initReveal();
    initStreaming();
    initRerun();
    initToolCallToggles();
    initSmoothScroll();
    initResumeButton();
    initSkillFilter();
    initImpactTiles();
    initRailTracking();
    jumpToInitialHash();
})();
