"""Create local exploration pages from the untouched original content."""
from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
original = (root / 'index.html').read_text()
updated = original.replace('<head>', '<head>\n    <base href="../">')
updated = updated.replace('Available for opportunities', 'Coursera → Google · December 2026')
updated = updated.replace('Currently at Amazon building distributed systems that process billions of events at scale.', 'Software Engineer at Coursera. Joining Google in December 2026 to work on AI Observability.')
updated = updated.replace('tyler@amazon', 'tyler@coursera')
updated = updated.replace('at Amazon. I\'m passionate', 'at Coursera, joining Google in December 2026 in AI Observability. I\'m passionate')
updated = updated.replace('<strong>Software Development Engineer</strong> at Coursera', '<strong>Software Engineer</strong> at Coursera')
updated = updated.replace('Jun 2024 - Present', 'Jun 2024 - Jan 2026')
updated = updated.replace('© 2024', '© 2026')
updated = updated.replace('Download Resume', 'Download resume').replace('href="files/resume.pdf"', 'href="files/Tyler_Le_Resume.pdf"')
updated = updated.replace("I'm always open to discussing new opportunities, interesting projects, or just having a chat.", "I'm always happy to talk about distributed systems, interesting projects, or a shared idea.")
updated = re.sub(r'<div class="hero-stats">.*?<div class="hero-actions">', '<div class="hero-actions">', updated, flags=re.S)
new_roles = '''<article class="experience-card"><div class="exp-header"><div class="exp-title-group"><h3 class="exp-title">Software Engineer · AI Observability</h3><span class="exp-company">Google</span></div><div class="exp-meta"><span class="exp-date">Joining December 2026</span></div></div></article>
<article class="experience-card"><div class="exp-header"><div class="exp-title-group"><h3 class="exp-title">Software Engineer</h3><span class="exp-company">Coursera</span></div><div class="exp-meta"><span class="exp-date">Jan 2026 – Present</span></div></div></article>'''
updated = updated.replace('<div class="experience-list">', '<div class="experience-list">'+new_roles)
updated = updated.replace('<div class="hamburger" id="hamburger">', '<button class="hamburger" id="hamburger" aria-label="Open navigation" aria-controls="nav-menu" aria-expanded="false">').replace('                <span></span>\n            </div>\n        </div>\n    </nav>', '                <span></span>\n            </button>\n        </div>\n    </nav>')
updated = updated.replace('<script src="script.js"></script>', '<script src="options/navigation.js"></script>')
updated = updated.replace('</head>', '<link rel="stylesheet" href="options/refresh.css"></head>')
(root/'options/refresh.html').write_text(updated.replace('href="#', 'href="options/refresh.html#'))

def section(section_id):
    return re.search(r'<section id="'+section_id+r'".*?</section>', updated, re.S)[0]

head = '''<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><base href="../"><title>Tyler Le — Software Engineer</title><meta name="description" content="Tyler Le, Software Engineer at Coursera. Joining Google in AI Observability in December 2026. Distributed systems, data pipelines, and backend engineering."><link rel="icon" href="favicon.svg"><link rel="stylesheet" href="options/alternatives.css"><link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"></head>'''
nav = '''<a class="skip" href="#main">Skip to content</a><header><a class="wordmark" href="#main">Tyler Le<span>Software Engineer</span></a><nav aria-label="Main navigation"><a href="#experience">Experience</a><a href="#projects">Projects</a><a href="#about">About</a><a href="#contact">Contact</a></nav></header>'''
career = '''<div class="career-route" aria-label="Career progression"><a href="#amazon"><span>Previously</span>Amazon</a><span class="route-arrow" aria-hidden="true">→</span><a href="#coursera"><span>Now · Jan 2026–Present</span>Coursera</a><span class="route-arrow" aria-hidden="true">→</span><a href="#google"><span>Next · Dec 2026</span>Google</a></div>'''
work = '''<section class="work-study" aria-labelledby="work-heading"><h2 id="work-heading">Engineering at scale.</h2><div class="study-layout"><div class="study-choices" role="tablist" aria-label="Amazon work examples"><button id="tab-pipeline" role="tab" aria-controls="work-panel" aria-selected="true" data-study="pipeline">Data pipelines<span>80M+ records / hour</span></button><button id="tab-api" role="tab" aria-controls="work-panel" aria-selected="false" tabindex="-1" data-study="api">Backend APIs<span>40M+ users</span></button><button id="tab-latency" role="tab" aria-controls="work-panel" aria-selected="false" tabindex="-1" data-study="latency">Low-latency systems<span>Sub-2ms processing</span></button></div><div id="work-panel" class="study-panel" role="tabpanel" aria-labelledby="tab-pipeline" tabindex="0"><h3>80 million records.<br>Every hour.</h3><p class="study-origin">Selected work at Amazon</p><p>Built a high-throughput pipeline processing 80M+ records per hour with Kotlin and Kinesis.</p><div class="study-stack">Kotlin · Amazon Kinesis · Data pipelines</div><a href="#amazon">Read the experience details →</a></div></div></section>'''
footer = '''<footer><span>Tyler Le · 2026</span><a href="compare.html" target="_top">Compare local designs</a><a href="files/Tyler_Le_Resume.pdf">Resume (PDF)</a></footer><script src="options/alternatives.js"></script></body></html>'''
for theme in ['editorial', 'atlas']:
    if theme == 'editorial':
        hero = '''<main id="main"><section class="intro"><div class="name-row"><h1>Tyler Le<span class="name-period">.</span></h1><img src="images/about-image.jpg" alt="Tyler Le" width="180" height="220"></div><div class="intro-bottom"><h2>Behind the interface.<br>At the heart of the system.</h2><div><p>I’m a software engineer focused on distributed systems, high-throughput pipelines, and low-latency APIs.</p><p>Currently at <strong>Coursera</strong>. Joining <strong>Google</strong> in December 2026 as a Software Engineer in AI Observability.</p><a class="text-action" href="#projects">Explore my work <span aria-hidden="true">↗</span></a></div></div>'''+career+'</section>'
    else:
        hero = '''<main id="main"><section class="intro"><h1>Good systems.<br><span>Greater possibilities.</span></h1><div class="atlas-intro"><p>I’m Tyler, a software engineer working where distributed systems, data, and real-world scale meet.</p><a class="text-action" href="#projects">Explore my work <span aria-hidden="true">↗</span></a></div>'''+career+'''<p class="next-detail">Joining Google as a Software Engineer in AI Observability in December 2026.</p></section>'''
    content = head + '<body class="'+theme+'">'+nav+hero
    if theme == 'atlas': content += work
    for sid in ['experience','projects','about','skills','contact']:
        fragment = section(sid)
        fragment = re.sub(r'<span class="section-number">.*?</span>', '', fragment)
        fragment = re.sub(r'<div class="achievement-icon">.*?</div>', '', fragment)
        if sid == 'experience':
            fragment = fragment.replace('<article class="experience-card">', '<article id="google" class="experience-card">', 1)
            pos = fragment.index('Coursera')
            before = fragment.rfind('<article class="experience-card">',0,pos)
            fragment = fragment[:before]+fragment[before:].replace('<article class="experience-card">','<article id="coursera" class="experience-card">',1)
            fragment = fragment.replace('<div class="experience-card">','<div id="amazon" class="experience-card">',1)
        content += fragment
    content += '</main>'+footer
    (root/f'options/{theme}.html').write_text(content.replace('href="#', f'href="options/{theme}.html#'))
