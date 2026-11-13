// High-level portfolio narratives. The downloadable resume carries the details.
window.portfolioStories = {
  platforms: {title:'Subscriptions and coupons at Coursera', subtitle:'Software Engineer · Jan 2026 – Dec 2026', paragraphs:[
    'At Coursera, my main focus was subscriptions and coupons. I worked on backend services across reservations, purchases, and fulfillment.',
    'The work included account provisioning, entitlement updates, and keeping state consistent across services when requests were retried.',
    'I also contributed to shared GraphQL infrastructure and API performance.'
  ], related:'Subscriptions · Coupons · Backend services'},
  trust: {title:'Backend services at Coursera', subtitle:'Subscriptions and transactions', paragraphs:[
    'At Coursera, I worked on services that managed subscriptions, account provisioning, and purchase flows.',
    'These services need to keep state consistent across systems, handle retries, and avoid duplicate transactions. That coordination is a large part of the work.'
  ], related:'Subscriptions · Transactions · Distributed systems'},
  scale: {title:'Backend systems at Amazon', subtitle:'Software Development Engineer · Jun 2024 – Jan 2026', paragraphs:[
    'At Amazon, I built backend systems for interactive video advertising, from ad creation through serving. The work included cache-backed serving and service reliability.',
    'I also built a Kotlin and Kinesis pipeline that transformed customer and product data into features for product recommendations. Performance work included investigating Redis connection churn and queue backpressure.'
  ], related:'Data pipelines · Reliability · Performance'},
  next: {title:'Google', subtitle:'Software Engineer · AI Observability · Dec 2026 – Present', paragraphs:[
    'AI observability and data pipelines.',
    'A focus on collecting and interpreting signals that help teams understand AI system behavior.'
  ], related:'AI Observability'},
  project: {title:'Clarity Networth', subtitle:'Personal finance app', paragraphs:[
    'Clarity is a personal finance app I’m building to track net worth, cash flow, investments, and retirement goals.',
    'It brings connected and manual accounts into one view, with a quick overview first and more detail when needed. It works on phones and desktops, and includes a public demo.'
  ], related:'Node.js · JavaScript · PostgreSQL · Plaid', link:'https://github.com/tyler-le/clarity-networth', linkText:'View Clarity on GitHub', projectImage:true},
  'amazon-intern': {title:'Amazon internship', subtitle:'Software Development Engineer Intern · Jun 2023 – Sep 2023', paragraphs:[
    'I worked on backend services for Alexa smart-home notifications, building a notification API in Java and DynamoDB.'
  ], related:'Java · Spring · DynamoDB'},
  teaching: {title:'Teaching at UC San Diego', subtitle:'Instructional Assistant · Sep 2022 – Mar 2023', paragraphs:[
    'I helped students work through data structures and algorithms in C++, including trees, hash tables, graph algorithms, and memory management.'
  ], related:'UC San Diego · Computer Science'},
  education: {title:'UC San Diego', subtitle:'B.S. in Computer Science · Sep 2021 – Dec 2023', paragraphs:[
    'I earned a Bachelor of Science in Computer Science at UC San Diego, graduating in December 2023 with a 3.93 GPA.',
    'While studying, I also worked as an Instructional Assistant, helping students with data structures and algorithms in C++.'
  ], related:'Education · Computer Science'},
  atomics: {title:'General Atomics', subtitle:'Software Engineer Intern · Jun 2022 – Aug 2022', paragraphs:[
    'I worked on flight-control software in C and C++, including avionics, ground-control, and real-time video systems.'
  ], related:'C · C++ · Flight systems'},
  cardea: {title:'Cardea Bio', subtitle:'Software Engineer Intern · Jun 2021 – Sep 2021', paragraphs:[
    'I built backend software that connected robotic lab instruments through APIs, supporting experiment orchestration and hardware-software communication.'
  ], related:'C# · .NET · REST APIs'},
  internships: {title:'Internships', subtitle:'Amazon · General Atomics · Cardea Bio', paragraphs:[
    'Amazon (Jun 2023 – Sep 2023): backend services for Alexa smart-home notifications.',
    'General Atomics (Jun 2022 – Aug 2022): flight-control software in C and C++.',
    'Cardea Bio (Jun 2021 – Sep 2021): backend software connecting robotic lab instruments.'
  ], related:'Jun 2021 – Sep 2023'},
  about: {title:'About me', subtitle:'Tyler Le · Software Engineer', paragraphs:[
    'I’m a software engineer at Google, working in AI Observability. Previously, I worked on API platforms and backend services at Coursera, and advertising systems and data pipelines at Amazon.',
    'I studied Computer Science at UC San Diego.'
  ], related:'UC San Diego · Computer Science', portrait:true},
  journey: {title:'Work history', subtitle:'Engineering and teaching', paragraphs:[
    'My work has covered API platforms, distributed systems, and software connected to hardware. I also worked as an Instructional Assistant at UC San Diego.'
  ], timeline:true},
  contact: {title:'Contact', subtitle:'Email, GitHub, and LinkedIn', paragraphs:[
    'You can reach me by email, or find me on GitHub and LinkedIn.'
  ], contact:true}
};
window.renderPortfolioStory = function(key){
  const story=portfolioStories[key];
  const timeline=story.timeline?'<ol class="story-timeline"><li><strong>Google</strong><span>Software Engineer · AI Observability</span><time>Dec 2026 – Present</time></li><li><strong>Coursera</strong><span>Software Engineer</span><time>Jan 2026 – Dec 2026</time></li><li><strong>Amazon</strong><span>Software Development Engineer</span><time>Jun 2024 – Jan 2026</time></li><li><strong>Amazon</strong><span>Engineering Intern</span><time>Jun 2023 – Sep 2023</time></li><li><strong>UC San Diego</strong><span>Instructional Assistant</span><time>Sep 2022 – Mar 2023</time></li><li><strong>General Atomics</strong><span>Engineering Intern</span><time>Jun 2022 – Aug 2022</time></li><li><strong>Cardea Bio</strong><span>Engineering Intern</span><time>Jun 2021 – Sep 2021</time></li></ol>':'';
  return `<h2>${story.title}</h2><p class="story-context">${story.subtitle}</p>${story.portrait?'<img class="story-portrait" src="../images/about-image.jpg" alt="Tyler Le">':''}<div class="story-prose">${story.paragraphs.map(p=>`<p>${p}</p>`).join('')}</div>${timeline}${story.related?`<p class="story-related">${story.related}</p>`:''}${story.link?`<a class="story-link" href="${story.link}" target="_blank" rel="noopener">${story.linkText} ↗</a>`:''}${story.contact?'<div class="story-contact"><a href="mailto:le.tyler.h@gmail.com">Email me ↗</a><a href="https://github.com/tyler-le" target="_blank" rel="noopener">GitHub ↗</a><a href="https://linkedin.com/in/le-tyler" target="_blank" rel="noopener">LinkedIn ↗</a></div>':''}<a class="resume-link" href="../files/Tyler_Le_Resume.pdf" target="_blank" rel="noopener">Download resume (PDF) ↗</a>`;
};
