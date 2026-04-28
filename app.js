// LinkedIn Content Strategist Engine
const TYPES = ['educational','storytelling','trends','motivational','contrarian'];
const TYPE_LABELS = {educational:'Educational',storytelling:'Storytelling',trends:'Industry Trends',motivational:'Motivational',contrarian:'Contrarian'};
const TYPE_COLORS = {educational:'#8b5cf6',storytelling:'#f59e0b',trends:'#06b6d4',motivational:'#10b981',contrarian:'#ef4444'};

const HOOKS = {
  educational: [
    "Stop making this mistake with your code.",
    "Here's a productivity framework that changed everything.",
    "Most students learn this too late.",
    "5 tools I wish I knew earlier.",
    "The #1 skill nobody teaches in college.",
    "This simple trick will save you 2 hours a day.",
    "I reviewed 100+ resumes. Here's what stands out.",
    "The best developers do this differently."
  ],
  storytelling: [
    "I failed my first technical interview. Here's what happened.",
    "6 months ago, I almost gave up on coding.",
    "My worst project taught me the best lesson.",
    "I said no to a job offer. Best decision ever.",
    "Nobody believed I could learn to code in 6 months.",
    "The rejection email that changed my career path.",
    "I wasted 3 months learning the wrong thing.",
    "A stranger's advice at a meetup changed everything."
  ],
  trends: [
    "AI is changing how we build software. Here's how.",
    "The tech job market in 2026 looks very different.",
    "This new tool is replacing traditional workflows.",
    "Remote work isn't dying. It's evolving.",
    "The rise of AI-assisted coding is real.",
    "Web development in 2026: what's actually changed.",
    "The skills that will matter most in 5 years.",
    "Why every developer should learn about AI now."
  ],
  motivational: [
    "Your background doesn't define your future.",
    "Small steps compound into massive results.",
    "The best time to start was yesterday. The next best is now.",
    "Consistency beats talent every single time.",
    "You don't need permission to build something great.",
    "Progress over perfection. Always.",
    "Your struggle today is your strength tomorrow.",
    "Stop waiting for the perfect moment. Start messy."
  ],
  contrarian: [
    "Unpopular opinion: College degrees are overrated in tech.",
    "Hot take: Most productivity advice is wrong.",
    "Controversial: Side projects matter more than GPA.",
    "Nobody wants to hear this, but hustle culture is toxic.",
    "Unpopular opinion: You don't need to code every day.",
    "Hot take: Most LinkedIn advice is recycled nonsense.",
    "Controversial: Networking beats hard skills.",
    "Hard truth: Your portfolio matters more than certifications."
  ]
};

const BODIES = {
  educational: [
    "Here's what actually works:\n\n1. Break problems into tiny pieces\n2. Write pseudocode before real code\n3. Test early and often\n4. Read other people's code daily\n5. Build projects, not just tutorials\n\nThe difference between good and great developers isn't talent.\n\nIt's systems.",
    "I've tested dozens of productivity methods.\n\nThe one that stuck:\n\n→ Time-block your deep work\n→ Batch similar tasks together\n→ Say no to 80% of meetings\n→ Review your week every Sunday\n\nSimple? Yes.\nEffective? Absolutely.",
    "What I learned after 500+ hours of self-study:\n\n• Consistency beats intensity\n• Teaching others accelerates learning\n• Documentation is your best friend\n• Breaks are productive, not lazy\n• Community matters more than courses\n\nLearning is a marathon, not a sprint.",
    "The framework that 10x'd my output:\n\n1. Define ONE clear goal each morning\n2. Work in 90-minute focused blocks\n3. Eliminate distractions ruthlessly\n4. Reflect for 5 minutes before bed\n\nProductivity isn't about doing more.\nIt's about doing what matters.",
    "Every beginner should know this:\n\n→ Google is your best teacher\n→ Stack Overflow is not cheating\n→ Nobody writes perfect code first try\n→ Imposter syndrome hits everyone\n→ Your first project will be ugly. Ship it anyway.\n\nThe best devs were all beginners once."
  ],
  storytelling: [
    "I walked into that interview confident.\n\n30 minutes later, I couldn't answer a single question properly.\n\nI went home, opened my laptop, and made a plan:\n\n→ Practice 2 problems daily\n→ Study system design weekly\n→ Do mock interviews monthly\n\n3 months later, I got 2 offers.\n\nFailure isn't the opposite of success. It's the path to it.",
    "I was spending 12 hours a day \"learning\" but making zero progress.\n\nTutorial hell is real.\n\nThe moment I stopped watching and started building, everything changed.\n\nMy first project was terrible.\nMy second was slightly less terrible.\nMy third got me an internship.\n\nAction beats consumption. Every time.",
    "Everyone around me had internships.\nI had zero experience and a lot of doubt.\n\nSo I did the only thing I could:\n→ Built 3 projects in 30 days\n→ Wrote about what I learned\n→ Shared my journey publicly\n\nWithin 2 months, opportunities started coming.\n\nYour work speaks louder than your resume.",
    "Last year I took on a project way beyond my skill level.\n\nI broke the codebase twice.\nMissed a deadline.\nConsidered quitting.\n\nBut I pushed through. Asked for help. Learned new tools.\n\nThat project is now my proudest achievement.\n\nGrowth lives outside your comfort zone.",
    "A senior dev told me something I'll never forget:\n\n\"Stop trying to be perfect. Be consistent.\"\n\nI was chasing perfection in every line of code.\n\nNow I ship fast, iterate faster, and learn the fastest.\n\nDone is better than perfect. Always."
  ],
  trends: [
    "AI coding assistants aren't replacing developers.\n\nThey're creating a new kind of developer:\n\n→ One who thinks in systems, not syntax\n→ One who architects, not just codes\n→ One who focuses on problems, not boilerplate\n\nThe developers who adapt will thrive.\nThe ones who resist will struggle.\n\nLearn to work WITH AI, not against it.",
    "The tech landscape is shifting fast:\n\n• AI-first development is mainstream\n• Full-stack is becoming a baseline skill\n• Soft skills matter more than ever\n• Remote-first companies are winning\n• Personal branding is career insurance\n\nThe question isn't IF things will change.\nIt's whether you'll be ready when they do.",
    "What I'm seeing in the job market right now:\n\n→ Companies want builders, not just coders\n→ Portfolio projects outweigh credentials\n→ AI literacy is becoming non-negotiable\n→ Communication skills are a differentiator\n\nThe rules have changed.\nAre you playing the new game?",
    "The tools reshaping how we work in 2026:\n\n1. AI pair programmers that actually help\n2. No-code platforms for rapid prototyping\n3. Cloud-native everything\n4. Design-to-code automation\n\nTechnology moves fast.\n\nBut the fundamentals — logic, problem-solving, creativity — those never change.",
    "Three trends every student should watch:\n\n1. AI is eating traditional entry-level tasks\n2. Personal brands create more opportunities than resumes\n3. Cross-functional skills are the new superpower\n\nDon't just learn to code.\nLearn to think, communicate, and adapt."
  ],
  motivational: [
    "A year ago, you wished you started today.\n\nDon't let another year pass.\n\nEvery expert was once a beginner.\nEvery master was once a disaster.\n\nThe gap between where you are and where you want to be?\n\nIt's called showing up. Every. Single. Day.",
    "Nobody is coming to save you.\n\nBut here's the good news:\n\nYou don't need saving.\n\nYou need a plan.\nYou need discipline.\nYou need to believe in the process.\n\nThe results will follow.\nThey always do.",
    "Comparison is the thief of joy.\n\nSomeone will always be:\n→ Further ahead\n→ More experienced\n→ Better connected\n\nBut nobody has YOUR unique combination of skills, perspective, and potential.\n\nRun your own race. That's the only one that matters.",
    "You don't need:\n\n❌ A CS degree to code\n❌ Permission to build\n❌ A perfect plan to start\n❌ Everyone's approval\n\nYou DO need:\n\n✅ Curiosity\n✅ Consistency\n✅ Courage to fail\n✅ A wifi connection\n\nStart today. Figure it out along the way.",
    "Reminder:\n\nYou are not behind.\nYou are not late.\nYou are exactly where you need to be.\n\nThe only timeline that matters is yours.\n\nKeep building. Keep learning. Keep growing.\n\nYour breakthrough is closer than you think."
  ],
  contrarian: [
    "Everyone says \"learn to code.\"\n\nNobody says \"learn to think.\"\n\nCoding is a tool. Problem-solving is the skill.\n\nThe best engineers I know spend more time thinking than typing.\n\nBefore you write a single line of code, ask:\n→ What problem am I solving?\n→ Is code even the answer?\n→ What's the simplest solution?",
    "\"Follow your passion\" is terrible career advice.\n\nHere's what works instead:\n\n1. Get good at something valuable\n2. Passion follows mastery\n3. Stack rare skill combinations\n4. Solve real problems for real people\n\nPassion is earned, not discovered.\n\nDo the work first. Love comes later.",
    "I stopped attending networking events.\n\nInstead, I:\n→ Built in public\n→ Shared my learnings online\n→ Helped others for free\n→ Created content consistently\n\nResult? More genuine connections than any conference.\n\nThe best networking doesn't feel like networking.",
    "Unpopular take:\n\nYou don't need to code every single day to be a good developer.\n\nWhat you need:\n→ Deep focus sessions (not streaks)\n→ Time to rest and recharge\n→ Space to think creatively\n→ Balance that's sustainable\n\nBurnout doesn't build careers. Sustainability does.",
    "Everyone's chasing certifications.\n\nBut here's what actually gets you hired:\n\n→ Real projects with real users\n→ Clear communication skills\n→ Ability to learn quickly\n→ Problem-solving under pressure\n\nA certificate proves you studied.\nA portfolio proves you can build."
  ]
};

const CTAS = [
  "What's your take? Drop it in the comments 👇",
  "Agree or disagree? I'd love to hear your thoughts.",
  "Which one resonates with you the most?",
  "Share this if someone needs to hear it today.",
  "What would you add to this list?",
  "Tag someone who needs to read this.",
  "What's the best advice YOU've ever received?",
  "Have you experienced this too? Tell me below.",
  "Save this for later. You'll need it. 🔖",
  "Follow for more content like this. 🚀"
];

const HASHTAGS_POOL = {
  educational: ['#LearningToCode','#DevTips','#Programming','#TechEducation','#CodingTips','#WebDev','#SoftwareEngineering','#Productivity','#CareerGrowth','#SkillDevelopment'],
  storytelling: ['#MyJourney','#TechStory','#StudentLife','#LessonsLearned','#GrowthMindset','#CareerJourney','#RealTalk','#LifeLessons','#PersonalGrowth','#Motivation'],
  trends: ['#TechTrends','#AI','#FutureOfWork','#Innovation','#Technology','#ArtificialIntelligence','#DigitalTransformation','#Tech2026','#CareerTrends','#RemoteWork'],
  motivational: ['#Motivation','#Mindset','#KeepGoing','#NeverGiveUp','#DailyMotivation','#Inspiration','#GrowthMindset','#BelieveInYourself','#SuccessMindset','#HustleSmart'],
  contrarian: ['#UnpopularOpinion','#HotTake','#ThinkDifferent','#RealTalk','#TruthBomb','#CareerAdvice','#ControversialOpinion','#HardTruths','#Perspective','#DebateMe']
};

const IMG_TOPICS = {
  educational:'coding tips and productivity, tech education',
  storytelling:'personal journey and growth, student life',
  trends:'technology and AI, innovation',
  motivational:'motivation and success, mindset',
  contrarian:'unique perspective and debate, thinking differently'
};

// State
let state = JSON.parse(localStorage.getItem('li_strategist') || 'null') || {
  posts: [], currentView: 'dashboard', lastGenDate: null, schedule: []
};

function save() { localStorage.setItem('li_strategist', JSON.stringify(state)); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function pickN(arr, n) { let s = [...arr].sort(() => Math.random() - 0.5); return s.slice(0, n); }
function wordCount(t) { return t.trim().split(/\s+/).filter(Boolean).length; }
function today() { return new Date().toISOString().split('T')[0]; }

function getNextType() {
  let recent = state.posts.slice(-3).map(p => p.type);
  let available = TYPES.filter(t => !recent.includes(t));
  if (!available.length) available = TYPES;
  return pick(available);
}

function getUnusedIndex(arr, usedKey) {
  let used = JSON.parse(localStorage.getItem(usedKey) || '[]');
  let available = arr.map((_, i) => i).filter(i => !used.includes(i));
  if (!available.length) { used = []; available = arr.map((_, i) => i); }
  let idx = pick(available);
  used.push(idx);
  localStorage.setItem(usedKey, JSON.stringify(used));
  return idx;
}

function generatePost(type) {
  if (!type) type = getNextType();
  let hookIdx = getUnusedIndex(HOOKS[type], `used_hooks_${type}`);
  let bodyIdx = getUnusedIndex(BODIES[type], `used_bodies_${type}`);
  let hook = HOOKS[type][hookIdx];
  let body = BODIES[type][bodyIdx];
  let cta = pick(CTAS);
  // Trim or expand body based on target word count
  let targetWordCount = state.targetWords || 'any';
  if (targetWordCount !== 'any') {
    let limit = parseInt(targetWordCount);
    let targetBodyWords = Math.max(10, limit - 20); // reserve 20 words for hook+cta
    let bodyWords = body.split(/\s+/);
    
    // If it's too short, append more bodies
    if (bodyWords.length < targetBodyWords - 15) {
      let availableIndices = [...Array(BODIES[type].length).keys()].filter(i => i !== bodyIdx);
      availableIndices.sort(() => Math.random() - 0.5);
      const transitions = ["Another important point:", "Building on that thought...", "It reminds me of another lesson:", "On a related note,", "Consider this as well:"];
      
      for (let idx of availableIndices) {
        if (bodyWords.length >= targetBodyWords - 10) break;
        body += '\n\n' + pick(transitions) + '\n\n' + BODIES[type][idx];
        bodyWords = body.split(/\s+/);
      }
    }
    
    // If it's too long, trim it cleanly at the last sentence boundary
    if (bodyWords.length > targetBodyWords + 10) {
      let truncated = bodyWords.slice(0, targetBodyWords + 10).join(' ');
      let lastPunctuation = Math.max(
        truncated.lastIndexOf('.'),
        truncated.lastIndexOf('!'),
        truncated.lastIndexOf('?'),
        truncated.lastIndexOf('\n')
      );
      if (lastPunctuation > 0) {
        body = truncated.substring(0, lastPunctuation + 1);
      } else {
        body = truncated + '...';
      }
    }
  }

  let content = `${hook}\n\n${body}\n\n${cta}`;
  let hashtags = pickN(HASHTAGS_POOL[type], 4).join(' ');
  let needsImage = Math.random() > 0.4;
  let imagePrompt = needsImage ? `Minimalist LinkedIn post image, clean background, modern typography, ${IMG_TOPICS[type]}, professional style, high contrast, no clutter` : null;
  let post = {
    id: Date.now(), type, content, hashtags, imageNeeded: needsImage,
    imagePrompt, date: today(), time: new Date().toLocaleTimeString(),
    words: wordCount(content)
  };
  state.posts.push(post);
  save();
  if (typeof savePostToServer === 'function') savePostToServer(post);
  return post;
}

// Render
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

function switchView(view) {
  state.currentView = view;
  save();
  $$('.view').forEach(v => v.classList.remove('active'));
  $(`.view[data-view="${view}"]`)?.classList.add('active');
  $$('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.view === view));
  $$('.mob-nav-item').forEach(n => n.classList.toggle('active', n.dataset.view === view));
  if (view === 'dashboard') renderDashboard();
  if (view === 'generator') renderGenerator();
  if (view === 'calendar') renderCalendar();
  if (view === 'history') renderHistory();
}

function renderLinkedInPreview(post, container) {
  if (!post) { container.innerHTML = `<div class="empty-state"><div class="icon">📝</div><h3>No post yet</h3><p>Generate your first post to see it here</p></div>`; return; }
  container.innerHTML = `
    <div class="linkedin-preview">
      <div class="linkedin-header">
        <div class="linkedin-avatar">MJ</div>
        <div class="linkedin-meta"><h4>Mretyun Jai</h4><p>Tech Enthusiast • Student • Builder | ${post.time || 'Just now'}</p></div>
      </div>
      <div class="linkedin-body">${post.content}</div>
      <div class="linkedin-hashtags">${post.hashtags}</div>
      <div class="linkedin-actions"><span>👍 Like</span><span>💬 Comment</span><span>🔄 Repost</span><span>📤 Send</span></div>
    </div>`;
}

function renderDashboard() {
  let todayPosts = state.posts.filter(p => p.date === today());
  let latest = todayPosts.length ? todayPosts[todayPosts.length - 1] : null;
  let totalPosts = state.posts.length;
  let typeCounts = {};
  TYPES.forEach(t => typeCounts[t] = state.posts.filter(p => p.type === t).length);
  let nextType = getNextType();

  $('#stat-total').textContent = totalPosts;
  $('#stat-today').textContent = todayPosts.length;
  $('#stat-next-type').textContent = TYPE_LABELS[nextType];
  $('#stat-next-type').style.color = TYPE_COLORS[nextType];
  $('#stat-streak').textContent = calcStreak();

  renderLinkedInPreview(latest, $('#dashboard-preview'));
  renderCountdown();

  let rotEl = $('#rotation-indicator');
  rotEl.innerHTML = TYPES.map(t => {
    let isNext = t === nextType;
    return `<span class="badge badge-${t}" style="opacity:${isNext?1:0.4};transform:scale(${isNext?1.1:1})">${TYPE_LABELS[t]}</span>`;
  }).join(' ');
}

function calcStreak() {
  let streak = 0, d = new Date();
  for (let i = 0; i < 365; i++) {
    let ds = d.toISOString().split('T')[0];
    if (state.posts.some(p => p.date === ds)) streak++;
    else if (i > 0) break;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

function renderCountdown() {
  let now = new Date();
  let next = new Date();
  next.setHours(18, 0, 0, 0);
  if (now > next) { next.setDate(next.getDate() + 1); next.setHours(8, 30, 0, 0); }
  let diff = next - now;
  let h = Math.floor(diff / 3600000);
  let m = Math.floor((diff % 3600000) / 60000);
  let s = Math.floor((diff % 60000) / 1000);
  $('#countdown').innerHTML = `
    <div class="countdown-unit"><div class="num">${h}</div><div class="label">Hours</div></div>
    <div class="countdown-unit"><div class="num">${m}</div><div class="label">Mins</div></div>
    <div class="countdown-unit"><div class="num">${s}</div><div class="label">Secs</div></div>`;
}

setInterval(() => { if (state.currentView === 'dashboard') renderCountdown(); }, 1000);

function renderGenerator() {
  $$('.type-chip').forEach(c => c.classList.toggle('active', !$('.type-chip.active') && c.dataset.type === getNextType()));
}

function handleGenerate() {
  let activeChip = $('.type-chip.active');
  let type = activeChip ? activeChip.dataset.type : null;
  let btn = $('#generate-btn');
  btn.classList.add('generating');
  btn.textContent = '✨ Generating...';
  setTimeout(() => {
    let post = generatePost(type);
    btn.classList.remove('generating');
    btn.innerHTML = '⚡ Generate Post';
    renderLinkedInPreview(post, $('#generator-preview'));
    $('#gen-word-count').textContent = `${post.words} words`;
    let pct = Math.min((post.words / 150) * 100, 100);
    $('#gen-word-fill').style.width = pct + '%';
    $('#gen-type-badge').className = `badge badge-${post.type}`;
    $('#gen-type-badge').textContent = TYPE_LABELS[post.type];
    $('#gen-image-info').style.display = post.imageNeeded ? 'block' : 'none';
    if (post.imageNeeded) $('#gen-image-prompt').textContent = post.imagePrompt;
    $('#gen-output').style.display = 'block';
    $('#gen-actions').style.display = 'flex';
    toast('✅ Post generated successfully!');
  }, 800);
}

function copyLatestPost() {
  let post = state.posts[state.posts.length - 1];
  if (!post) return;
  let text = `${post.content}\n\n${post.hashtags}`;
  navigator.clipboard.writeText(text).then(() => toast('📋 Copied to clipboard!'));
}

function postToLinkedIn(id) {
  let post = id ? state.posts.find(p => p.id == id) : state.posts[state.posts.length - 1];
  if (!post) { toast('⚠️ No post to share'); return; }
  let text = `${post.content}\n\n${post.hashtags}`;
  let encoded = encodeURIComponent(text);
  let url = `https://www.linkedin.com/feed/?shareActive=true&text=${encoded}`;
  navigator.clipboard.writeText(text).then(() => {
    toast('📋 Copied & opening LinkedIn...');
    setTimeout(() => window.open(url, '_blank'), 500);
  }).catch(() => {
    window.open(url, '_blank');
  });
}

function renderCalendar() {
  let container = $('#calendar-container');
  let days = [];
  let start = new Date();
  start.setDate(start.getDate() - start.getDay());
  for (let i = 0; i < 7; i++) {
    let d = new Date(start);
    d.setDate(d.getDate() + i);
    let ds = d.toISOString().split('T')[0];
    let post = state.posts.find(p => p.date === ds);
    let isToday = ds === today();
    days.push({ date: d, dateStr: ds, post, isToday });
  }
  container.innerHTML = days.map(d => {
    let dayName = d.date.toLocaleDateString('en', { weekday: 'short' });
    let dayNum = d.date.getDate();
    let dotColor = d.post ? TYPE_COLORS[d.post.type] : 'transparent';
    let preview = d.post ? d.post.content.substring(0, 80) + '...' : 'No post scheduled';
    let badge = d.post ? `<span class="badge badge-${d.post.type}" style="font-size:0.6rem;margin-bottom:0.5rem">${TYPE_LABELS[d.post.type]}</span>` : '';
    return `<div class="calendar-day ${d.isToday ? 'today' : ''}" onclick="viewCalendarPost('${d.dateStr}')">
      <div class="day-type-dot" style="background:${dotColor}"></div>
      <div class="day-number">${dayName} ${dayNum}</div>
      ${badge}
      <div class="day-content">${preview}</div>
    </div>`;
  }).join('');
}

function viewCalendarPost(dateStr) {
  let post = state.posts.find(p => p.date === dateStr);
  if (post) { showModal(post); }
}

function renderHistory() {
  let container = $('#history-container');
  if (!state.posts.length) {
    container.innerHTML = `<div class="empty-state"><div class="icon">📚</div><h3>No posts yet</h3><p>Generate your first post to see history</p></div>`;
    return;
  }
  let sorted = [...state.posts].reverse();
  container.innerHTML = sorted.map(p => `
    <div class="history-item" onclick='showModal(${JSON.stringify(p).replace(/'/g,"&#39;")})'>
      <div class="history-item-header">
        <span class="badge badge-${p.type}">${TYPE_LABELS[p.type]}</span>
        <span class="history-item-date">${p.date} • ${p.words} words</span>
      </div>
      <div class="history-item-preview">${p.content}</div>
      <div class="history-item-actions">
        <button class="btn btn-sm btn-secondary" onclick="event.stopPropagation();copyPost('${p.id}')">📋 Copy</button>
        <button class="btn btn-sm btn-linkedin" onclick="event.stopPropagation();postToLinkedIn('${p.id}')">🚀 Post to LinkedIn</button>
        <button class="btn btn-sm btn-secondary" onclick="event.stopPropagation();deletePost('${p.id}')">🗑️ Delete</button>
      </div>
    </div>`).join('');
}

function copyPost(id) {
  let post = state.posts.find(p => p.id == id);
  if (!post) return;
  navigator.clipboard.writeText(`${post.content}\n\n${post.hashtags}`).then(() => toast('📋 Copied!'));
}

function deletePost(id) {
  state.posts = state.posts.filter(p => p.id != id);
  save();
  renderHistory();
  toast('🗑️ Post deleted');
}

function showModal(post) {
  $('#modal-textarea').value = post.content + '\n\n' + post.hashtags;
  $('#modal-overlay').classList.add('active');
  window._modalPostId = post.id;
}

function closeModal() { $('#modal-overlay').classList.remove('active'); }

function saveModal() {
  let text = $('#modal-textarea').value;
  let post = state.posts.find(p => p.id == window._modalPostId);
  if (post) {
    let parts = text.split('\n\n');
    let hashtags = parts[parts.length - 1].startsWith('#') ? parts.pop() : post.hashtags;
    post.content = parts.join('\n\n');
    post.hashtags = hashtags;
    post.words = wordCount(post.content);
    save();
  }
  closeModal();
  switchView(state.currentView);
  toast('💾 Post saved!');
}

function toast(msg) {
  let c = $('#toast-container');
  let t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  $$('.nav-item').forEach(n => n.addEventListener('click', () => switchView(n.dataset.view)));
  $$('.mob-nav-item').forEach(n => n.addEventListener('click', () => switchView(n.dataset.view)));
  $$('.type-chip').forEach(c => c.addEventListener('click', () => {
    $$('.type-chip').forEach(x => x.classList.remove('active'));
    c.classList.add('active');
  }));
  $$('.word-chip').forEach(c => c.addEventListener('click', () => {
    $$('.word-chip').forEach(x => x.classList.remove('active'));
    c.classList.add('active');
    state.targetWords = c.dataset.words;
    save();
  }));
  
  // Restore selected word count if any
  if (state.targetWords) {
    $$('.word-chip').forEach(x => x.classList.remove('active'));
    let activeChip = document.querySelector(`.word-chip[data-words="${state.targetWords}"]`);
    if (activeChip) activeChip.classList.add('active');
  }
  
  $('#generate-btn').addEventListener('click', handleGenerate);
  $('#copy-btn')?.addEventListener('click', copyLatestPost);
  $('#modal-close').addEventListener('click', closeModal);
  $('#modal-save').addEventListener('click', saveModal);
  $('#modal-overlay').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
  switchView(state.currentView || 'dashboard');
  
  // Auth Init
  if (authToken) {
    document.getElementById('auth-page').style.display = 'none';
    document.getElementById('app-page').style.display = 'block';
    renderAuthSection();
    fetchPostsFromServer().then(() => {
      if (state.currentView === 'dashboard') renderDashboard();
      if (state.currentView === 'history') renderHistory();
      if (state.currentView === 'calendar') renderCalendar();
    });
  } else {
    document.getElementById('auth-page').style.display = 'flex';
    document.getElementById('app-page').style.display = 'none';
  }
});

// ─── Authentication & Sync ───
let authToken = localStorage.getItem('li_token') || null;
let authUser = JSON.parse(localStorage.getItem('li_user') || 'null');
let isLoginMode = true;

function renderAuthSection() {
  const container = document.getElementById('auth-section');
  if (!container) return;
  
  if (authUser) {
    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.05); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-glass);">
        <div style="font-size: 0.8rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 140px;">
          <strong style="color: var(--accent-cyan);">Logged In</strong><br>
          <span style="color: var(--text-secondary);">${authUser.email}</span>
        </div>
        <button class="btn btn-icon" onclick="logout()" title="Logout" style="color: var(--danger); border: none; background: transparent; display: flex; align-items: center; justify-content: center;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
        </button>
      </div>
    `;
  } else {
    container.innerHTML = '';
  }
}

function toggleAuthMode() {
  isLoginMode = !isLoginMode;
  document.getElementById('auth-title').textContent = isLoginMode ? 'Welcome to LinkStrat' : 'Create an Account';
  document.getElementById('auth-subtitle').textContent = isLoginMode ? 'Sign in to sync your posts to the cloud.' : 'Sign up to backup your posts securely.';
  document.getElementById('auth-submit-btn').textContent = isLoginMode ? 'Sign In' : 'Sign Up';
  document.getElementById('auth-toggle').textContent = isLoginMode ? 'Need an account? Sign up' : 'Already have an account? Sign in';
}

async function submitAuth() {
  const email = document.getElementById('auth-email').value;
  const password = document.getElementById('auth-password').value;
  const errorEl = document.getElementById('auth-error');
  const btn = document.getElementById('auth-submit-btn');
  
  if (!email || !password) {
    errorEl.textContent = 'Email and password are required.';
    errorEl.style.display = 'block';
    return;
  }
  
  btn.disabled = true;
  btn.textContent = 'Please wait...';
  
  const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/signup';
  
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    
    if (!res.ok) {
      errorEl.textContent = data.error || 'Authentication failed.';
      errorEl.style.display = 'block';
      btn.disabled = false;
      btn.textContent = isLoginMode ? 'Sign In' : 'Sign Up';
      return;
    }
    
    authToken = data.token;
    authUser = data.user;
    localStorage.setItem('li_token', authToken);
    localStorage.setItem('li_user', JSON.stringify(authUser));
    
    document.getElementById('auth-page').style.display = 'none';
    document.getElementById('app-page').style.display = 'block';
    
    renderAuthSection();
    toast(isLoginMode ? '✅ Signed in successfully!' : '🎉 Account created!');
    
    // Sync local data with server
    await syncPostsToServer();
    await fetchPostsFromServer();
    
    // Refresh views
    if (state.currentView === 'dashboard') renderDashboard();
    if (state.currentView === 'history') renderHistory();
    if (state.currentView === 'calendar') renderCalendar();
    
  } catch (err) {
    errorEl.textContent = 'Network error. Make sure server is running.';
    errorEl.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.textContent = isLoginMode ? 'Sign In' : 'Sign Up';
  }
}

function logout() {
  authToken = null;
  authUser = null;
  localStorage.removeItem('li_token');
  localStorage.removeItem('li_user');
  state.posts = []; // Clear local posts for privacy
  state.targetWords = 'any';
  save();
  renderAuthSection();
  
  document.getElementById('app-page').style.display = 'none';
  document.getElementById('auth-page').style.display = 'flex';
  document.getElementById('auth-email').value = '';
  document.getElementById('auth-password').value = '';
  
  toast('👋 Logged out successfully.');
}

async function syncPostsToServer() {
  if (!authToken || state.posts.length === 0) return;
  try {
    await fetch('/api/posts/sync', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ posts: state.posts })
    });
  } catch (err) {
    console.error('Failed to sync posts', err);
  }
}

async function fetchPostsFromServer() {
  if (!authToken) return;
  try {
    const res = await fetch('/api/posts', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (res.ok) {
      const posts = await res.json();
      // Only update if we actually got posts, and merge carefully or overwrite
      if (posts && Array.isArray(posts)) {
        state.posts = posts;
        save();
      }
    }
  } catch (err) {
    console.error('Failed to fetch posts', err);
  }
}

async function savePostToServer(post) {
  if (!authToken) return;
  try {
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(post)
    });
  } catch (err) {
    console.error('Failed to save post to server', err);
  }
}
