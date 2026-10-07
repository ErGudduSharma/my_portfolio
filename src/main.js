// Guddu Sharma portfolio — renders the page from src/data/*.js and src/config.js,
// then wires up every interaction. Rebuilt from design/portfolio-mockup-reference.html
// (the approved visual source) as plain DOM code — no runtime library, no build step.
(function () {
    'use strict';

    // ---------------- Helpers ----------------

    const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isNarrow = () => window.matchMedia('(max-width: 720px)').matches;
    const SUPPORTS_SCROLL_TIMELINE = !!(window.CSS && CSS.supports && CSS.supports('animation-timeline', 'view()'));

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function formatCount(n) {
        return n.toLocaleString('en-US');
    }

    function projectById(id) {
        return PROJECTS.find(p => p.id === id) || null;
    }

    function slugify(str) {
        return String(str).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    // ---------------- Render: Header ----------------

    function renderHeader() {
        return `
            <header>
                <div class="header-inner">
                    <a href="#top" class="brand">
                        <span class="brand-mark fm">GS</span>
                        <span class="brand-name fd">${PROFILE.name}</span>
                    </a>
                    <nav aria-label="Sections" class="nav-links">
                        <a class="navl fm" href="#work">Work</a>
                        <a class="navl fm" href="#experience">Experience</a>
                        <a class="navl fm" href="#skills">Skills</a>
                        <a class="navl fm" href="#about">About</a>
                        <a class="navl fm" href="#contact">Contact</a>
                    </nav>
                    <button type="button" class="btn ghost resume-btn-ghost" id="resumeBtnHeader">
                        ${downloadIconSvg(16)}
                        <span>Resume</span>
                    </button>
                    <button type="button" class="mobile-menu-btn" id="mobileMenuBtn" aria-expanded="false" aria-controls="mobileNavPanel" aria-label="Open menu">
                        ${menuIconSvg()}
                    </button>
                </div>
                <div class="mobile-nav-panel fm" id="mobileNavPanel">
                    <a href="#work">Work</a>
                    <a href="#experience">Experience</a>
                    <a href="#skills">Skills</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                    <a href="Guddu_Resume.pdf" id="resumeBtnMobile" download>Download resume</a>
                </div>
            </header>
        `;
    }

    function downloadIconSvg(size) {
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"></path><path d="m7 10 5 5 5-5"></path><path d="M5 20h14"></path></svg>`;
    }
    function arrowIconSvg() {
        return `<svg class="arr" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>`;
    }
    function extIconSvg(cls) {
        return `<svg class="${cls || 'arx'}" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"></path><path d="M8 7h9v9"></path></svg>`;
    }
    function menuIconSvg() {
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16"></path><path d="M4 12h16"></path><path d="M4 17h16"></path></svg>`;
    }

    // ---------------- Render: Hero ----------------

    function renderHero() {
        const headlineIdx = PROFILE.headline.lastIndexOf(PROFILE.headlineAccent);
        const headlinePrefix = headlineIdx >= 0 ? PROFILE.headline.slice(0, headlineIdx) : PROFILE.headline + ' ';
        const headlineAccent = headlineIdx >= 0 ? PROFILE.headlineAccent : '';

        return `
            <section class="hero" id="home">
                <span class="stream-line" aria-hidden="true" style="top:16%;width:140px;opacity:.7;animation:stream 7s linear infinite"></span>
                <span class="stream-line" aria-hidden="true" style="top:52%;width:200px;opacity:.45;animation:stream 10s linear infinite 2s"></span>
                <span class="stream-line" aria-hidden="true" style="top:86%;width:110px;opacity:.6;animation:stream 8s linear infinite 4.5s"></span>
                <div class="hero-inner">
                    <div class="hero-copy">
                        <div class="rise fm status-chip">
                            <span class="pulse status-dot"></span>
                            <span>${escapeHtml(PROFILE.currentRoleShort)}</span>
                        </div>
                        <h1 class="rise fd hero-title" style="animation-delay:.1s">${escapeHtml(headlinePrefix)}<span class="accent">${escapeHtml(headlineAccent)}</span></h1>
                        <div class="rise fm role-line" style="animation-delay:.15s" aria-hidden="true">
                            <span class="role-prefix">role &gt;</span>
                            <span class="role-value" id="roleValue"></span>
                            <span class="type-cursor cur"></span>
                        </div>
                        <p class="rise hero-desc" style="animation-delay:.2s">${escapeHtml(PROFILE.heroSummary)}</p>
                        <div class="rise hero-actions" style="animation-delay:.3s">
                            <a class="btn shine btn-primary" id="resumeBtnHero" href="Guddu_Resume.pdf" download>
                                ${downloadIconSvg(18)}
                                <span>Download resume</span>
                            </a>
                            <a class="btn ghost btn-secondary" href="#contact">
                                <span>Contact me</span>
                                ${arrowIconSvg()}
                            </a>
                        </div>
                        <div class="rise fm hero-meta" style="animation-delay:.4s">
                            <span class="loc">${escapeHtml(PROFILE.location)}</span>
                            <a class="navl" href="${PROFILE.github}" target="_blank" rel="noopener noreferrer">
                                <span>GitHub</span>${extIconSvg()}
                            </a>
                            <a class="navl" href="${PROFILE.linkedin}" target="_blank" rel="noopener noreferrer">
                                <span>LinkedIn</span>${extIconSvg()}
                            </a>
                        </div>
                    </div>
                    <div class="inR hero-visual" style="animation-delay:.25s">
                        <div class="flip-wrap">
                            <button type="button" class="profile-card-btn" id="profileFlipBtn" aria-label="Flip the profile card" aria-pressed="false">
                                <span class="card-face card-front">
                                    <span class="photo-area">
                                        <img src="${PROFILE.photo}" alt="${escapeHtml(PROFILE.photoAlt)}" loading="eager" width="640" height="848">
                                        <span class="scan-line scan" aria-hidden="true"></span>
                                        <span class="corner corner-tl" aria-hidden="true"></span>
                                        <span class="corner corner-tr" aria-hidden="true"></span>
                                        <span class="corner corner-bl" aria-hidden="true"></span>
                                        <span class="corner corner-br" aria-hidden="true"></span>
                                    </span>
                                    <span class="card-front-footer">
                                        <span style="display:flex;flex-direction:column;gap:2px">
                                            <span class="fd name">${escapeHtml(PROFILE.name)}</span>
                                            <span class="role">${escapeHtml(PROFILE.title)}</span>
                                        </span>
                                        <span class="fm flip-hint">Click to flip</span>
                                    </span>
                                </span>
                                <span class="card-face card-back">
                                    <span class="fm qf-label">Quick facts</span>
                                    <span class="qf-row"><span class="fm qf-key">Now</span><span class="fd qf-val">${escapeHtml(PROFILE.currentRole)}</span></span>
                                    <span class="qf-row"><span class="fm qf-key">Based in</span><span class="fd qf-val">${escapeHtml(PROFILE.location)}</span></span>
                                    <span class="qf-row"><span class="fm qf-key">Focus</span><span class="fd qf-val">${escapeHtml(PROFILE.focus)}</span></span>
                                    <span class="qf-row email"><span class="fm qf-key">Email</span><span class="fd qf-val">${escapeHtml(PROFILE.email)}</span></span>
                                </span>
                            </button>
                        </div>
                        ${renderAgentPanel()}
                    </div>
                </div>
            </section>
        `;
    }

    function renderAgentPanel() {
        const ap = PROFILE.agentPanel;
        const proj = projectById(ap.projectId);
        const title = proj ? proj.title : '';
        const chips = ap.steps.map((s, i) => `<span class="step-chip fm" data-step-chip="${i}">${escapeHtml(s.label)}</span>`).join('');
        return `
            <div class="bob agent-panel">
                <div class="agent-head-row">
                    <span aria-hidden="true" class="robot-head">
                        <span class="robot-antenna-stem"></span>
                        <span class="pulse robot-antenna-tip"></span>
                        <span class="robot-eyes"><span class="eye"></span><span class="eye"></span></span>
                        <span class="robot-eq">
                            <span class="eq"></span><span class="eq" style="animation-delay:.15s"></span>
                            <span class="eq" style="animation-delay:.3s"></span><span class="eq" style="animation-delay:.45s"></span>
                        </span>
                    </span>
                    <span class="fm agent-label"><span class="agent-title">${escapeHtml(title)}</span><span>${escapeHtml(ap.tagline)}</span></span>
                </div>
                <div class="step-chips">${chips}</div>
                <div class="run-bar"><div class="run-bar-fill" id="runBarFill" style="width:20%"></div></div>
                <div class="fm agent-log">
                    <span class="prompt-chevron">&gt;</span>
                    <span class="log-text" id="agentLogText"></span>
                    <span class="agent-cursor cur" aria-hidden="true"></span>
                </div>
            </div>
        `;
    }

    // ---------------- Render: Marquee ----------------

    function renderMarqueeSet(ariaHidden) {
        const items = MARQUEE.map(m => `
            <span class="${m.outline ? 'outline' : ''}">${escapeHtml(m.name)}</span>
            <span class="marq-dot" aria-hidden="true"></span>
        `).join('');
        return `<div class="marq-set"${ariaHidden ? ' aria-hidden="true"' : ''}>${items}</div>`;
    }

    function renderMarquee() {
        return `
            <div class="marqwrap">
                <div class="marq-track fd marq">
                    ${renderMarqueeSet(false)}
                    ${renderMarqueeSet(true)}
                </div>
            </div>
        `;
    }

    // ---------------- Render: Impact ----------------

    function renderImpact() {
        const tiles = PROFILE.impact.map((imp, i) => {
            const proj = projectById(imp.project);
            return `
                <a class="imp impact-tile" href="#project-${imp.project}" data-impact-index="${i}" data-target-project="${imp.project}">
                    <span class="num fd impact-num" id="impactNum${i}" data-target="${imp.target}" data-prefix="${imp.prefix}" data-suffix="${imp.suffix}">${imp.prefix}0${imp.suffix}</span>
                    <span class="impact-label">${escapeHtml(imp.label)}</span>
                    <span class="fm impact-source"><span>${escapeHtml(proj ? proj.title : '')}</span>${arrowIconSvg()}</span>
                </a>
            `;
        }).join('');
        return `
            <section aria-label="Impact in numbers" class="impact-section">
                <div class="impact-grid">${tiles}</div>
            </section>
        `;
    }

    // ---------------- Render: Work / slideshow ----------------

    function renderWork() {
        const tabs = PROJECTS.map((p, i) => `
            <button type="button" class="pick fm pill-btn" data-slide-tab="${i}">${escapeHtml(p.tabLabel)}</button>
        `).join('');

        const slides = PROJECTS.map((p, i) => {
            const flowChips = p.flow.map((step, si) => {
                const sep = si < p.flow.length - 1 ? '<span aria-hidden="true">&rarr;</span>' : '';
                return `<span class="fc flow-chip">${escapeHtml(step)}</span>${sep}`;
            }).join('');
            const repoHref = p.repo || PROFILE.github;
            return `
                <div class="slide" id="slide-${i}" data-slide="${i}" role="group" aria-roledescription="slide" aria-label="${escapeHtml(p.tabLabel)}, ${i + 1} of ${PROJECTS.length}">
                    <article id="project-${p.id}">
                        <div class="slide-colorblock">
                            <span class="slide-hero" style="background:var(--${p.color})">
                                <span class="fm slide-hero-meta"><span>${escapeHtml(p.category)}</span><span>${escapeHtml(p.date)}</span></span>
                                <span class="fd slide-headline">${escapeHtml(p.headline)}</span>
                                <span class="fm flow-row">${flowChips}</span>
                            </span>
                            <span class="slide-summary-block">
                                <span class="fd slide-title">${escapeHtml(p.title)}</span>
                                <span class="slide-summary">${escapeHtml(p.summary)}</span>
                                <span class="fm slide-tech">${p.tech.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('')}</span>
                            </span>
                        </div>
                        <div class="slide-case">
                            <div class="case-field"><span class="fm case-label" style="color:var(--${p.color})">What it does</span><span class="case-text">${escapeHtml(p.caseStudy.whatItDoes)}</span></div>
                            <div class="case-field"><span class="fm case-label" style="color:var(--${p.color})">How it is built</span><span class="case-text">${escapeHtml(p.caseStudy.howBuilt)}</span></div>
                            <div class="case-field"><span class="fm case-label" style="color:var(--${p.color})">${escapeHtml(p.caseStudy.resultLabel)}</span><span class="case-text">${escapeHtml(p.caseStudy.result)}</span></div>
                            <a class="navl fm case-link" href="${repoHref}" target="_blank" rel="noopener noreferrer"><span>${p.repo ? 'View code' : 'More on GitHub'}</span>${extIconSvg()}</a>
                        </div>
                    </article>
                </div>
            `;
        }).join('');

        return `
            <section id="work" class="section-block no-border">
                <div class="section-inner">
                    <div class="section-rail">
                        <div class="fm section-rail-label"><span class="num">01</span><span>Work</span></div>
                    </div>
                    <div class="section-main">
                        <div class="sv-poly" data-reveal="sv" style="display:flex;flex-direction:column;gap:24px">
                            <h2 class="fd section-heading">Four projects, built end to end.</h2>
                            <div class="pill-row">${tabs}</div>
                        </div>
                        <div class="svl-poly" data-reveal="svl" id="slideshowWrap" role="region" aria-roledescription="carousel" aria-label="Featured projects" style="display:flex;flex-direction:column;gap:16px">
                            <div class="slideshow spot" id="slideshow">
                                <div class="slideshow-progress-track"><div class="slideshow-progress-fill" id="slideshowProgressFill"></div></div>
                                <div class="slide-track" id="slideTrack">${slides}</div>
                            </div>
                            <div class="slideshow-controls">
                                <span class="fm slideshow-hint">Slides change on their own. Hover to pause.</span>
                                <div class="slideshow-nav">
                                    <span class="fm slide-counter" id="slideCounter" aria-live="polite">01 / ${String(PROJECTS.length).padStart(2, '0')}</span>
                                    <button class="pick nav-circle" type="button" id="slidePrevBtn" aria-label="Previous project">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"></path><path d="m11 6-6 6 6 6"></path></svg>
                                    </button>
                                    <button class="pick shine nav-circle next" type="button" id="slideNextBtn" aria-label="Next project">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    // ---------------- Render: Experience ----------------

    function renderExperience() {
        const items = EXPERIENCE.map((e, i) => {
            const isCurrent = !e.end;
            const dotClass = isCurrent ? 'is-current pulse' : 'is-past';
            const badge = isCurrent ? `<span class="fm exp-current-badge">Current</span>` : '';
            const tags = e.tech && e.tech.length
                ? `<span class="fm exp-tags">${e.tech.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('')}</span>`
                : '';
            const stats = e.stats && e.stats.length
                ? `<span class="exp-stats">${e.stats.map(s => `<span class="exp-stat"><span class="fd exp-stat-value">${escapeHtml(s.value)}</span><span class="fm exp-stat-label">${escapeHtml(s.label)}</span></span>`).join('')}</span>`
                : '';
            const revealClass = i === 0 ? 'svr-poly' : 'svr-poly';
            const bodyId = `exp-body-${i}`;
            return `
                <div class="timeline-item ${revealClass}" data-reveal="svr">
                    <span class="timeline-dot ${dotClass}" aria-hidden="true"></span>
                    <article class="card spot exp-card" data-spot="true">
                        <button type="button" class="exp-card-trigger" data-exp-toggle="${i}" aria-expanded="false" aria-controls="${bodyId}">
                            <span class="exp-head-row">
                                <span class="fd exp-role">${escapeHtml(e.role)}</span>
                                <span class="fm exp-date">${escapeHtml(formatExpDate(e.date))}</span>
                            </span>
                            <span class="exp-meta-row">
                                <span class="exp-company">${escapeHtml(e.company)}</span>
                                <span class="exp-location">${escapeHtml(e.location)}</span>
                                ${badge}
                            </span>
                            <span class="exp-summary">${escapeHtml(e.summary)}</span>
                            ${stats}
                            ${tags}
                            <span class="fm exp-toggle-label"><span data-exp-toggle-text="${i}">Show all ${e.bullets.length} points</span>${arrowIconSvg()}</span>
                        </button>
                        <div class="exp-details" id="${bodyId}">
                            <div class="exp-details-inner">
                                <ul class="exp-list">${e.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}</ul>
                            </div>
                        </div>
                    </article>
                </div>
            `;
        }).join('');

        return `
            <section id="experience" class="section-block">
                <div class="section-inner">
                    <div class="section-rail">
                        <div class="fm section-rail-label"><span class="num">02</span><span>Experience</span></div>
                    </div>
                    <div class="section-main">
                        <h2 class="fd section-heading sv-poly" data-reveal="sv">From intern to team lead.</h2>
                        <div class="timeline">${items}</div>
                    </div>
                </div>
            </section>
        `;
    }

    function formatExpDate(date) {
        // "April 2026 — Present" -> "Apr 2026 – Present"; keep already-short dates as-is.
        return date
            .replace('January', 'Jan').replace('February', 'Feb').replace('March', 'Mar')
            .replace('April', 'Apr').replace('May', 'May').replace('June', 'Jun')
            .replace('July', 'Jul').replace('August', 'Aug').replace('September', 'Sep')
            .replace('October', 'Oct').replace('November', 'Nov').replace('December', 'Dec')
            .replace(/\s+—\s+/, ' – ');
    }

    // ---------------- Render: Skills ----------------

    function renderSkills() {
        const tabs = SKILLS.map((g, i) => `<button type="button" class="pick fm pill-btn" data-skill-tab="${i}">${escapeHtml(g.group)}</button>`).join('');
        return `
            <section id="skills" class="section-block">
                <div class="section-inner">
                    <div class="section-rail">
                        <div class="fm section-rail-label"><span class="num">03</span><span>Skills</span></div>
                    </div>
                    <div class="section-main" style="gap:32px">
                        <h2 class="fd section-heading sv-poly" data-reveal="sv">What I work with.</h2>
                        <div class="pill-row sv-poly" data-reveal="sv" id="skillsTabs">${tabs}</div>
                        <div class="skills-cloud" id="skillsCloud" aria-live="polite"></div>
                    </div>
                </div>
            </section>
        `;
    }

    // ---------------- Render: About ----------------

    function buildPathEntries() {
        // Chronological: both education entries, then both experience entries.
        return [
            { years: EDUCATION[0].pathYears, title: EDUCATION[0].pathTitle, org: EDUCATION[0].pathOrg, text: EDUCATION[0].pathBlurb },
            { years: EDUCATION[1].pathYears, title: EDUCATION[1].pathTitle, org: EDUCATION[1].pathOrg, text: EDUCATION[1].pathBlurb },
            { years: EXPERIENCE[1].pathYears, title: EXPERIENCE[1].role, org: EXPERIENCE[1].pathOrg, text: EXPERIENCE[1].pathBlurb },
            { years: EXPERIENCE[0].pathYears, title: EXPERIENCE[0].role, org: EXPERIENCE[0].pathOrg, text: EXPERIENCE[0].pathBlurb }
        ];
    }

    function renderAbout() {
        const paragraphs = PROFILE.aboutParagraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('');
        const ownWords = PROFILE.ownWords && PROFILE.ownWords.trim()
            ? `<p class="fm own-words">${escapeHtml(PROFILE.ownWords)}</p>`
            : '';

        const pathEntries = buildPathEntries();
        const pathSteps = pathEntries.map((p, i) => `
            <button type="button" class="pick path-step" data-path-step="${i}">
                <span class="path-dot" aria-hidden="true"></span>
                <span class="path-step-body">
                    <span class="fm path-years">${escapeHtml(p.years)}</span>
                    <span class="fd path-title">${escapeHtml(p.title)}</span>
                    <span class="path-detail-slot" data-path-detail="${i}" hidden></span>
                </span>
            </button>
        `).join('');

        const certs = CERTIFICATIONS.map(c => {
            if (c.verifyUrl) {
                return `
                    <a class="cert cert-card" href="${c.verifyUrl}" target="_blank" rel="noopener noreferrer">
                        <span class="cert-info">
                            <span class="cert-title">${escapeHtml(c.title)}</span>
                            <span class="fm cert-org">${escapeHtml(c.org)} &middot; ${escapeHtml(c.date)}</span>
                        </span>
                        ${extIconSvg()}
                    </a>
                `;
            }
            return `
                <div class="cert-static">
                    <span class="cert-title">${escapeHtml(c.title)}</span>
                    <span class="fm cert-org">${escapeHtml(c.org)} &middot; ${escapeHtml(c.date)}</span>
                    <span style="font-size:13px;color:var(--muted)">${escapeHtml(c.description)}</span>
                </div>
            `;
        }).join('');

        return `
            <section id="about" class="section-block">
                <div class="section-inner">
                    <div class="section-rail">
                        <div class="fm section-rail-label"><span class="num">04</span><span>About</span></div>
                    </div>
                    <div class="section-main" style="gap:56px">
                        <div class="about-top">
                            <div class="svl-poly about-copy" data-reveal="svl">
                                <h2 class="fd section-heading">${escapeHtml(PROFILE.aboutHeading)}</h2>
                                ${paragraphs}
                                ${ownWords}
                            </div>
                            <div class="svr-poly path-col" data-reveal="svr">
                                <span class="fm path-label">My path</span>
                                ${pathSteps}
                            </div>
                        </div>
                        <div class="sv-poly" data-reveal="sv" style="display:flex;flex-direction:column;gap:18px">
                            <h3 class="fd certs-heading">Certifications</h3>
                            <div class="certs-grid">${certs}</div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    // ---------------- Render: Contact ----------------

    function renderContact() {
        return `
            <section id="contact">
                <div class="contact-inner">
                    <div class="svl-poly contact-left" data-reveal="svl">
                        <span class="fm contact-eyebrow">05 / Contact</span>
                        <h2 class="fd contact-heading">${escapeHtml(PROFILE.contactHeading)}</h2>
                        <div class="contact-rows">
                            <a class="row contact-row" href="mailto:${PROFILE.email}">
                                <span class="rowin"><span class="fm contact-row-label">Email</span><span class="fd contact-row-value">${escapeHtml(PROFILE.email)}</span></span>
                                ${extIconSvg('arx')}
                            </a>
                            <a class="row contact-row" href="tel:${PROFILE.phone.replace(/\s+/g, '')}">
                                <span class="rowin"><span class="fm contact-row-label">Phone</span><span class="fd contact-row-value">${escapeHtml(PROFILE.phoneDisplay)}</span></span>
                                ${extIconSvg('arx')}
                            </a>
                            <a class="row contact-row" href="${PROFILE.linkedin}" target="_blank" rel="noopener noreferrer">
                                <span class="rowin"><span class="fm contact-row-label">LinkedIn</span><span class="fd contact-row-value">linkedin.com/in/ErGudduSharma</span></span>
                                ${extIconSvg('arx')}
                            </a>
                            <a class="row contact-row" href="${PROFILE.github}" target="_blank" rel="noopener noreferrer">
                                <span class="rowin"><span class="fm contact-row-label">GitHub</span><span class="fd contact-row-value">github.com/ErGudduSharma</span></span>
                                ${extIconSvg('arx')}
                            </a>
                        </div>
                    </div>
                    <form class="svr-poly contact-form-card" data-reveal="svr" id="contactForm" novalidate>
                        <span class="fd contact-form-title">Send a message</span>
                        <label class="fm form-field" id="fieldName">Name
                            <input type="text" name="name" id="formName" autocomplete="name">
                            <span class="form-error-text" id="errName" hidden></span>
                        </label>
                        <label class="fm form-field" id="fieldEmail">Email
                            <input type="email" name="email" id="formEmail" autocomplete="email">
                            <span class="form-error-text" id="errEmail" hidden></span>
                        </label>
                        <label class="fm form-field" id="fieldMessage">Message
                            <textarea name="message" id="formMessage" rows="5"></textarea>
                            <span class="form-error-text" id="errMessage" hidden></span>
                        </label>
                        <button class="btn shine btn-primary" type="submit" id="formSubmitBtn" style="justify-content:center">
                            <span id="formSubmitLabel">Send message</span>
                            ${arrowIconSvg()}
                        </button>
                        <div class="form-status" id="formStatus" role="status" aria-live="polite"></div>
                    </form>
                </div>
            </section>
        `;
    }

    // ---------------- Render: Footer ----------------

    function renderFooter() {
        const city = PROFILE.location.split(',')[0];
        return `
            <footer>
                <div class="footer-inner fm">
                    <span>${escapeHtml(PROFILE.name)} &middot; ${escapeHtml(PROFILE.title)} &middot; ${escapeHtml(city)}</span>
                    <span>&copy; 2026</span>
                    <a class="navl" href="#top">Back to top</a>
                </div>
            </footer>
        `;
    }

    // ---------------- Mount ----------------

    function mount() {
        document.getElementById('app').innerHTML = [
            renderHeader(),
            `<div id="top">`,
            renderHero(),
            renderMarquee(),
            renderImpact(),
            renderWork(),
            renderExperience(),
            renderSkills(),
            renderAbout(),
            renderContact(),
            `</div>`,
            renderFooter()
        ].join('');
    }

    // ---------------- Reveal (scroll-timeline or IntersectionObserver fallback) ----------------

    function initReveal() {
        const els = document.querySelectorAll('[data-reveal]');
        if (prefersReducedMotion()) {
            // Leave as static, fully visible — no animation classes needed since
            // the reduced-motion stylesheet rule forces opacity:1 on these.
            return;
        }
        if (SUPPORTS_SCROLL_TIMELINE) {
            els.forEach(el => {
                el.classList.remove(el.dataset.reveal + '-poly');
                el.classList.add(el.dataset.reveal);
            });
            return;
        }
        if (!('IntersectionObserver' in window)) {
            els.forEach(el => el.classList.add('in-view'));
            return;
        }
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        els.forEach(el => obs.observe(el));
    }

    // ---------------- Smooth in-page nav + hash fix ----------------

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', (e) => {
                const href = a.getAttribute('href');
                if (href.length < 2) return;
                const target = document.querySelector(href);
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
            });
        });
    }

    function jumpToInitialHash() {
        if (!location.hash) return;
        const target = document.querySelector(location.hash);
        if (target) target.scrollIntoView({ behavior: 'auto', block: 'start' });
    }

    // ---------------- Mobile nav ----------------

    function initMobileNav() {
        const btn = document.getElementById('mobileMenuBtn');
        const panel = document.getElementById('mobileNavPanel');
        if (!btn || !panel) return;
        function close() {
            panel.classList.remove('is-open');
            btn.setAttribute('aria-expanded', 'false');
        }
        btn.addEventListener('click', () => {
            const open = panel.classList.toggle('is-open');
            btn.setAttribute('aria-expanded', String(open));
        });
        panel.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    }

    // ---------------- Resume buttons: download if present, hide if missing ----------------

    function initResumeButtons() {
        const buttons = [
            document.getElementById('resumeBtnHeader'),
            document.getElementById('resumeBtnHero'),
            document.getElementById('resumeBtnMobile')
        ].filter(Boolean);
        if (!buttons.length) return;

        // The header button is a <button>, not a link (it sits in a toolbar
        // next to nav, matching the mockup); clicking it triggers the same
        // download as the real <a download> hero/mobile buttons.
        const headerBtn = document.getElementById('resumeBtnHeader');
        if (headerBtn) {
            headerBtn.addEventListener('click', () => {
                const link = document.createElement('a');
                link.href = 'Guddu_Resume.pdf';
                link.download = '';
                document.body.appendChild(link);
                link.click();
                link.remove();
            });
        }

        // fetch() is unconditionally blocked by CORS on file://, so there is no
        // reliable way to check existence for local double-click testing —
        // leave buttons visible there. Over http(s) (GitHub Pages), check for real.
        if (location.protocol === 'file:') return;
        fetch('Guddu_Resume.pdf', { method: 'HEAD' })
            .then(res => { if (!res.ok) buttons.forEach(b => { b.hidden = true; }); })
            .catch(() => { buttons.forEach(b => { b.hidden = true; }); });
    }

    // ---------------- Profile card flip ----------------

    function initFlip() {
        const btn = document.getElementById('profileFlipBtn');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const flipped = btn.classList.toggle('is-flipped');
            btn.setAttribute('aria-pressed', String(flipped));
        });
    }

    // ---------------- Experience expand/collapse ----------------

    function initExperienceToggles() {
        document.querySelectorAll('[data-exp-toggle]').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = btn.dataset.expToggle;
                const body = document.getElementById(btn.getAttribute('aria-controls'));
                const expanded = btn.getAttribute('aria-expanded') === 'true';
                btn.setAttribute('aria-expanded', String(!expanded));
                body.classList.toggle('is-open', !expanded);
                const label = document.querySelector(`[data-exp-toggle-text="${idx}"]`);
                if (label) {
                    const total = EXPERIENCE[idx].bullets.length;
                    label.textContent = expanded ? `Show all ${total} points` : 'Hide details';
                }
            });
        });
    }

    // ---------------- Tick-driven widgets: role typing + agent panel ----------------

    let tickState = { tick: 0 };

    function updateTickDrivenUI() {
        const tick = tickState.tick;

        // Role typing line.
        const roles = PROFILE.titles;
        const ri = Math.floor(tick / 2) % roles.length;
        const roleEl = document.getElementById('roleValue');
        if (roleEl) {
            roleEl.textContent = roles[ri];
            roleEl.style.animation = 'none';
            // Force reflow so the animation restarts even when the same name
            // (typeA/typeB alternation in the mockup achieves the same thing).
            void roleEl.offsetWidth;
            const anim = (ri % 2 ? 'typeA' : 'typeB');
            roleEl.style.animation = prefersReducedMotion() ? 'none' : `${anim} 1.1s steps(${Math.max(roles[ri].length, 1)}, end) both`;
            if (prefersReducedMotion()) roleEl.style.maxWidth = '22ch';
        }

        // Agent panel step.
        const stepDefs = PROFILE.agentPanel.steps;
        const step = tick % stepDefs.length;
        document.querySelectorAll('[data-step-chip]').forEach(chip => {
            const i = Number(chip.dataset.stepChip);
            chip.classList.toggle('is-on', i === step);
            chip.classList.toggle('is-done', i < step);
        });
        const runBar = document.getElementById('runBarFill');
        if (runBar) runBar.style.width = (((step + 1) / stepDefs.length) * 100) + '%';
        const logEl = document.getElementById('agentLogText');
        if (logEl) {
            const text = stepDefs[step].log;
            logEl.textContent = text;
            logEl.style.animation = 'none';
            void logEl.offsetWidth;
            const anim = (step % 2 ? 'typeC' : 'typeD');
            logEl.style.animation = prefersReducedMotion() ? 'none' : `${anim} 0.9s steps(${Math.max(text.length, 1)}, end) both`;
            if (prefersReducedMotion()) logEl.style.maxWidth = '38ch';
        }
    }

    function initTick() {
        updateTickDrivenUI();
        if (prefersReducedMotion()) return;
        setInterval(() => {
            tickState.tick += 1;
            updateTickDrivenUI();
        }, 1700);
    }

    // ---------------- Impact count-up ----------------

    function initCountUp() {
        const nums = document.querySelectorAll('.impact-num[data-target]');
        if (!nums.length) return;
        if (prefersReducedMotion()) {
            nums.forEach(applyCountValue.bind(null, 1));
            return;
        }
        let start = null;
        function tick(ts) {
            if (start === null) start = ts;
            let p = (ts - start - 400) / 1600;
            if (p < 0) p = 0;
            if (p > 1) p = 1;
            const e = 1 - Math.pow(1 - p, 3);
            nums.forEach(applyCountValue.bind(null, e));
            if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    function applyCountValue(e, el) {
        const target = Number(el.dataset.target);
        const val = Math.round(target * e);
        el.textContent = el.dataset.prefix + formatCount(val) + el.dataset.suffix;
    }

    // ---------------- Skills tabs ----------------

    let skillsPopToggle = false;

    function renderSkillsCloud(groupIndex) {
        const cloud = document.getElementById('skillsCloud');
        if (!cloud) return;
        const animName = skillsPopToggle ? 'popA' : 'popB';
        skillsPopToggle = !skillsPopToggle;
        const items = SKILLS[groupIndex].items;
        cloud.innerHTML = items.map((name, i) => {
            const style = prefersReducedMotion()
                ? ''
                : `style="animation:${animName} 0.4s ${(i * 0.035).toFixed(3)}s backwards"`;
            return `<span class="chip skill-chip" ${style}>${escapeHtml(name)}</span>`;
        }).join('');
    }

    function initSkillsTabs() {
        const tabs = document.querySelectorAll('[data-skill-tab]');
        if (!tabs.length) return;
        function setActive(i) {
            tabs.forEach(t => t.classList.toggle('is-active-tab', Number(t.dataset.skillTab) === i));
            tabs.forEach(t => {
                const on = Number(t.dataset.skillTab) === i;
                t.style.background = on ? 'var(--accent)' : 'transparent';
                t.style.color = on ? 'var(--ink)' : 'var(--muted)';
                t.style.borderColor = on ? 'var(--accent)' : 'var(--hair-3)';
            });
            renderSkillsCloud(i);
        }
        tabs.forEach(t => t.addEventListener('click', () => setActive(Number(t.dataset.skillTab))));
        setActive(0);
    }

    // ---------------- About "My path" accordion ----------------

    function initPathAccordion() {
        const steps = document.querySelectorAll('[data-path-step]');
        if (!steps.length) return;
        const entries = buildPathEntries();

        function renderDetail(slot, entry) {
            slot.innerHTML = `
                <span class="path-detail reveal">
                    <span class="path-org">${escapeHtml(entry.org)}</span>
                    <span class="path-text">${escapeHtml(entry.text)}</span>
                </span>
            `;
        }

        function setActive(i) {
            steps.forEach(step => {
                const idx = Number(step.dataset.pathStep);
                const active = idx === i;
                step.classList.toggle('is-active', active);
                const slot = step.querySelector(`[data-path-detail="${idx}"]`);
                if (!slot) return;
                if (active) {
                    slot.hidden = false;
                    renderDetail(slot, entries[idx]);
                } else {
                    slot.hidden = true;
                    slot.innerHTML = '';
                }
            });
        }

        steps.forEach(step => step.addEventListener('click', () => setActive(Number(step.dataset.pathStep))));
        setActive(entries.length - 1); // default: the current role, open
    }

    // ---------------- Impact tiles -> jump to slide + scroll ----------------

    function initImpactTiles() {
        document.querySelectorAll('[data-target-project]').forEach(tile => {
            tile.addEventListener('click', (e) => {
                e.preventDefault();
                const id = tile.dataset.targetProject;
                const idx = PROJECTS.findIndex(p => p.id === id);
                if (idx < 0) return;
                goToSlide(idx);
                document.getElementById('work').scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
            });
        });
    }

    // ---------------- Slideshow ----------------

    let slideState = { index: 0 };
    let slideTimer = null;
    const pauseReasons = new Set();

    function renderSlideUI() {
        document.querySelectorAll('.slide').forEach((el, i) => {
            const active = i === slideState.index;
            el.classList.toggle('is-active', active);
            if (active) {
                el.removeAttribute('inert');
            } else {
                el.setAttribute('inert', '');
            }
            el.querySelectorAll('a,button').forEach(focusable => {
                if (active) focusable.removeAttribute('tabindex');
                else focusable.setAttribute('tabindex', '-1');
            });
        });
        const track = document.getElementById('slideTrack');
        if (track) track.style.transform = `translateX(-${slideState.index * 100}%)`;

        document.querySelectorAll('[data-slide-tab]').forEach(tab => {
            const on = Number(tab.dataset.slideTab) === slideState.index;
            tab.style.background = on ? 'var(--text)' : 'transparent';
            tab.style.color = on ? 'var(--ink)' : 'var(--muted)';
            tab.style.borderColor = on ? 'var(--text)' : 'var(--hair-3)';
        });

        const counter = document.getElementById('slideCounter');
        if (counter) counter.textContent = `${String(slideState.index + 1).padStart(2, '0')} / ${String(PROJECTS.length).padStart(2, '0')}`;

        const fill = document.getElementById('slideshowProgressFill');
        if (fill) {
            fill.classList.remove('animate');
            void fill.offsetWidth; // force reflow so the animation restarts
            if (!prefersReducedMotion()) fill.classList.add('animate');
            // Restarting the animation class would otherwise clear a pause
            // picked up mid-transition (e.g. clicking next while hovering).
            fill.classList.toggle('paused', pauseReasons.size > 0);
        }
    }

    function scheduleNextSlide() {
        clearTimeout(slideTimer);
        if (prefersReducedMotion() || pauseReasons.size > 0) return;
        slideTimer = setTimeout(() => goToSlide(slideState.index + 1), 5200);
    }

    function goToSlide(i) {
        const total = PROJECTS.length;
        slideState.index = ((i % total) + total) % total;
        renderSlideUI();
        scheduleNextSlide();
    }

    function addPause(reason) {
        pauseReasons.add(reason);
        clearTimeout(slideTimer);
        const fill = document.getElementById('slideshowProgressFill');
        if (fill) fill.classList.add('paused');
    }

    function removePause(reason) {
        pauseReasons.delete(reason);
        const fill = document.getElementById('slideshowProgressFill');
        if (pauseReasons.size === 0) {
            if (fill) fill.classList.remove('paused');
            scheduleNextSlide();
        }
    }

    function initSlideshow() {
        // The wrapper contains both the sliding area and its prev/next/tab
        // controls, so focusing any of them (not just the slide content)
        // correctly pauses autoplay and enables arrow-key navigation.
        const wrap = document.getElementById('slideshowWrap');
        const slideArea = document.getElementById('slideshow');
        if (!wrap || !slideArea) return;

        document.querySelectorAll('[data-slide-tab]').forEach(tab => {
            tab.addEventListener('click', () => goToSlide(Number(tab.dataset.slideTab)));
        });
        const prevBtn = document.getElementById('slidePrevBtn');
        const nextBtn = document.getElementById('slideNextBtn');
        if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(slideState.index - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(slideState.index + 1));

        // Pause on hover.
        wrap.addEventListener('mouseenter', () => addPause('hover'));
        wrap.addEventListener('mouseleave', () => removePause('hover'));

        // Pause while keyboard focus is inside it (slide content or controls).
        wrap.addEventListener('focusin', () => addPause('focus'));
        wrap.addEventListener('focusout', (e) => {
            if (!wrap.contains(e.relatedTarget)) removePause('focus');
        });

        // Pause while the tab is hidden.
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) addPause('hidden-tab');
            else removePause('hidden-tab');
        });

        // Left/right arrow keys when the carousel (or its controls) has focus.
        wrap.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') { e.preventDefault(); goToSlide(slideState.index - 1); }
            else if (e.key === 'ArrowRight') { e.preventDefault(); goToSlide(slideState.index + 1); }
        });

        // Swipe on touch, over the visual slide area itself.
        let touchStartX = null;
        slideArea.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
        slideArea.addEventListener('touchend', (e) => {
            if (touchStartX === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX;
            touchStartX = null;
            if (Math.abs(dx) < 40) return;
            if (dx < 0) goToSlide(slideState.index + 1);
            else goToSlide(slideState.index - 1);
        }, { passive: true });

        goToSlide(0);
    }

    // ---------------- Contact form ----------------

    function setFieldError(fieldId, errId, message) {
        const field = document.getElementById(fieldId);
        const err = document.getElementById(errId);
        if (message) {
            field.classList.add('has-error');
            err.textContent = message;
            err.hidden = false;
        } else {
            field.classList.remove('has-error');
            err.hidden = true;
            err.textContent = '';
        }
    }

    function validateForm() {
        const name = document.getElementById('formName').value.trim();
        const email = document.getElementById('formEmail').value.trim();
        const message = document.getElementById('formMessage').value.trim();
        let valid = true;

        if (!name) { setFieldError('fieldName', 'errName', 'Please enter your name.'); valid = false; }
        else setFieldError('fieldName', 'errName', '');

        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!email) { setFieldError('fieldEmail', 'errEmail', 'Please enter your email.'); valid = false; }
        else if (!emailOk) { setFieldError('fieldEmail', 'errEmail', 'Please enter a valid email address.'); valid = false; }
        else setFieldError('fieldEmail', 'errEmail', '');

        if (!message) { setFieldError('fieldMessage', 'errMessage', 'Please enter a message.'); valid = false; }
        else setFieldError('fieldMessage', 'errMessage', '');

        return valid ? { name, email, message } : null;
    }

    function mailtoFallbackHref(data) {
        const subject = encodeURIComponent(`Portfolio contact from ${data.name}`);
        const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
        return `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    }

    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        const status = document.getElementById('formStatus');
        const submitBtn = document.getElementById('formSubmitBtn');
        const submitLabel = document.getElementById('formSubmitLabel');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = validateForm();
            if (!data) return;

            if (!CONFIG.FORM_KEY) {
                status.className = 'form-status';
                status.textContent = 'No message service is configured yet — opening your email client instead.';
                window.location.href = mailtoFallbackHref(data);
                return;
            }

            submitBtn.disabled = true;
            submitLabel.textContent = 'Sending…';
            status.className = 'form-status';
            status.textContent = 'Sending your message…';

            try {
                const { url, body } = buildFormRequest(data);
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(body)
                });
                const ok = res.ok;
                let json = null;
                try { json = await res.json(); } catch (_) { /* some services return no body */ }
                if (ok && (!json || json.success !== false)) {
                    status.className = 'form-status success';
                    status.textContent = `Message sent — thanks, I'll reply soon.`;
                    form.reset();
                } else {
                    throw new Error('Form service rejected the submission');
                }
            } catch (err) {
                status.className = 'form-status error';
                status.innerHTML = `Something went wrong sending that. Please <a href="${mailtoFallbackHref(data)}">email me directly</a> instead.`;
            } finally {
                submitBtn.disabled = false;
                submitLabel.textContent = 'Send message';
            }
        });
    }

    function buildFormRequest(data) {
        if (CONFIG.FORM_SERVICE === 'formspree') {
            return {
                url: `https://formspree.io/f/${CONFIG.FORM_KEY}`,
                body: { name: data.name, email: data.email, message: data.message }
            };
        }
        // Default: Web3Forms.
        return {
            url: 'https://api.web3forms.com/submit',
            body: { access_key: CONFIG.FORM_KEY, name: data.name, email: data.email, message: data.message }
        };
    }

    // ---------------- Cursor spotlight (.spot elements) ----------------

    function initSpotlight() {
        if (prefersReducedMotion()) return;
        document.querySelectorAll('.spot').forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                el.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
                el.style.setProperty('--my', (e.clientY - rect.top) + 'px');
            });
        });
    }

    // ---------------- Init ----------------

    mount();
    initReveal();
    initSmoothScroll();
    initMobileNav();
    initResumeButtons();
    initFlip();
    initExperienceToggles();
    initTick();
    initCountUp();
    initSkillsTabs();
    initPathAccordion();
    initImpactTiles();
    initSlideshow();
    initContactForm();
    initSpotlight();
    jumpToInitialHash();
})();
