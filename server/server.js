require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db, run, get, all } = require('./db');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-123';
const TOKEN_FILE = path.join(__dirname, '.tokens.json');

// ─── LinkedIn OAuth Config ───
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:3000/callback';
const SCOPES = 'openid profile w_member_social';

// ─── Content Engine (same templates as frontend) ───
const TYPES = ['educational','storytelling','trends','motivational','contrarian'];

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
  "What's the best advice YOU've ever received?",
  "Have you experienced this too? Tell me below.",
  "Save this for later. You'll need it. 🔖",
  "Follow for more content like this. 🚀"
];

const HASHTAGS = {
  educational: ['#LearningToCode','#DevTips','#Programming','#CodingTips','#WebDev','#Productivity','#CareerGrowth'],
  storytelling: ['#MyJourney','#TechStory','#StudentLife','#LessonsLearned','#GrowthMindset','#PersonalGrowth'],
  trends: ['#TechTrends','#AI','#FutureOfWork','#Innovation','#Technology','#ArtificialIntelligence'],
  motivational: ['#Motivation','#Mindset','#KeepGoing','#DailyMotivation','#GrowthMindset','#Inspiration'],
  contrarian: ['#UnpopularOpinion','#HotTake','#ThinkDifferent','#RealTalk','#CareerAdvice','#HardTruths']
};

// ─── Content Generation ───
let postHistory = [];
try { postHistory = JSON.parse(fs.readFileSync(path.join(__dirname, '.post_history.json'), 'utf8')); } catch(e) {}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function pickN(arr, n) { return [...arr].sort(() => Math.random() - 0.5).slice(0, n); }

function getNextType() {
  let recent = postHistory.slice(-3).map(p => p.type);
  let available = TYPES.filter(t => !recent.includes(t));
  return pick(available.length ? available : TYPES);
}

function generatePost() {
  let type = getNextType();
  let hook = pick(HOOKS[type]);
  let body = pick(BODIES[type]);
  let cta = pick(CTAS);
  let hashtags = pickN(HASHTAGS[type], 4).join(' ');
  let content = `${hook}\n\n${body}\n\n${cta}\n\n${hashtags}`;
  return { type, content, date: new Date().toISOString() };
}

function savePostHistory(post) {
  postHistory.push(post);
  // Keep last 30 posts
  if (postHistory.length > 30) postHistory = postHistory.slice(-30);
  fs.writeFileSync(path.join(__dirname, '.post_history.json'), JSON.stringify(postHistory, null, 2));
}

// ─── Token Management ───
function getTokens() {
  try { return JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8')); } catch(e) { return null; }
}

function saveTokens(tokens) {
  tokens.saved_at = Date.now();
  fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2));
}

function isTokenValid() {
  let tokens = getTokens();
  if (!tokens) return false;
  // LinkedIn access tokens expire in 60 days
  let elapsed = Date.now() - tokens.saved_at;
  return elapsed < (tokens.expires_in * 1000 - 86400000); // 1 day buffer
}

// ─── LinkedIn API ───
async function getProfileId(accessToken) {
  let res = await axios.get('https://api.linkedin.com/v2/userinfo', {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  return res.data.sub;
}

async function postToLinkedIn(content) {
  let tokens = getTokens();
  if (!tokens) { console.log('❌ Not authenticated. Visit http://localhost:3000/auth first.'); return false; }

  try {
    let personId = await getProfileId(tokens.access_token);

    let res = await axios.post('https://api.linkedin.com/rest/posts', {
      author: `urn:li:person:${personId}`,
      commentary: content,
      visibility: 'PUBLIC',
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [],
        thirdPartyDistributionChannels: []
      },
      lifecycleState: 'PUBLISHED',
      isReshareDisabledByAuthor: false
    }, {
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
        'Content-Type': 'application/json',
        'LinkedIn-Version': '202401',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });

    console.log(`✅ Posted to LinkedIn at ${new Date().toLocaleString()}`);
    return true;
  } catch (err) {
    console.error('❌ LinkedIn API Error:', err.response?.data || err.message);
    return false;
  }
}

async function autoPost() {
  if (!isTokenValid()) {
    console.log('⚠️  Token expired or missing. Visit http://localhost:3000/auth to re-authenticate.');
    return;
  }
  let post = generatePost();
  console.log(`\n📝 Generated ${post.type} post:\n${post.content.substring(0, 100)}...\n`);
  let success = await postToLinkedIn(post.content);
  if (success) {
    savePostHistory(post);
    console.log(`🎯 Post #${postHistory.length} published successfully!`);
  }
}

// ─── Express Routes ───

// Status dashboard
app.get('/dashboard', (req, res) => {
  let tokens = getTokens();
  let authed = isTokenValid();
  res.send(`
    <!DOCTYPE html><html><head><title>LinkedIn Auto Poster</title>
    <style>
      body{font-family:system-ui;background:#0a0e17;color:#f1f5f9;max-width:700px;margin:0 auto;padding:2rem}
      h1{color:#00D4FF}
      .status{padding:1rem;border-radius:12px;margin:1rem 0;border:1px solid rgba(255,255,255,0.1)}
      .ok{background:rgba(16,185,129,0.15);border-color:rgba(16,185,129,0.3)}
      .warn{background:rgba(245,158,11,0.15);border-color:rgba(245,158,11,0.3)}
      a{color:#0A66C2;font-weight:600;text-decoration:none}
      a:hover{text-decoration:underline}
      .btn{display:inline-block;padding:0.75rem 1.5rem;background:linear-gradient(135deg,#0A66C2,#00D4FF);color:#fff;border-radius:10px;font-weight:700;margin:0.5rem 0.5rem 0.5rem 0}
      .post{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:1rem;margin:0.5rem 0;font-size:0.85rem;white-space:pre-wrap}
      code{background:rgba(255,255,255,0.1);padding:0.2rem 0.4rem;border-radius:4px;font-size:0.85rem}
    </style></head><body>
    <h1>⚡ LinkedIn Auto Poster</h1>
    <div class="status ${authed ? 'ok' : 'warn'}">
      <strong>Status:</strong> ${authed ? '✅ Authenticated & Ready' : '⚠️ Not authenticated'}
    </div>
    ${!authed ? '<a class="btn" href="/auth">🔐 Connect LinkedIn Account</a>' : ''}
    ${authed ? '<a class="btn" href="/post-now">🚀 Post Now</a><a class="btn" href="/preview">👁️ Preview Next Post</a>' : ''}
    <h2>📊 Stats</h2>
    <p>Total posts: <strong>${postHistory.length}</strong></p>
    <p>Schedule: <strong>${process.env.POST_TIME_1 || '08:30'}</strong> and <strong>${process.env.POST_TIME_2 || '18:00'}</strong> daily</p>
    <p>Next type: <strong>${getNextType()}</strong></p>
    ${postHistory.length ? '<h2>📚 Recent Posts</h2>' + postHistory.slice(-3).reverse().map(p =>
      `<div class="post"><strong>${p.type.toUpperCase()}</strong> — ${p.date.split('T')[0]}\n${p.content.substring(0,200)}...</div>`
    ).join('') : ''}
    <h2>📖 Setup Guide</h2>
    <p>1. Create app at <a href="https://www.linkedin.com/developers/" target="_blank">LinkedIn Developers</a></p>
    <p>2. Add <code>${REDIRECT_URI}</code> as an Authorized Redirect URL</p>
    <p>3. Request the <strong>"Share on LinkedIn"</strong> product</p>
    <p>4. Copy Client ID & Secret to <code>.env</code></p>
    <p>5. Click "Connect LinkedIn Account" above</p>
    </body></html>
  `);
});

// Step 1: Start OAuth flow
app.get('/auth', (req, res) => {
  let authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;
  res.redirect(authUrl);
});

// Step 2: OAuth callback
app.get('/callback', async (req, res) => {
  let code = req.query.code;
  if (!code) return res.send('❌ No authorization code received.');
  try {
    let tokenRes = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
      params: {
        grant_type: 'authorization_code',
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    saveTokens(tokenRes.data);
    console.log('✅ LinkedIn authenticated successfully!');
    res.redirect('/dashboard?auth=success');
  } catch (err) {
    console.error('❌ Auth error:', err.response?.data || err.message);
    res.send(`❌ Authentication failed: ${JSON.stringify(err.response?.data || err.message)}`);
  }
});

// Manual post trigger
app.get('/post-now', async (req, res) => {
  let post = generatePost();
  let success = await postToLinkedIn(post.content);
  if (success) {
    savePostHistory(post);
    res.redirect('/dashboard?posted=true');
  } else {
    res.send('❌ Failed to post. Check console for details.');
  }
});

// Preview next post
app.get('/preview', (req, res) => {
  let post = generatePost();
  res.send(`
    <!DOCTYPE html><html><head><title>Post Preview</title>
    <style>body{font-family:system-ui;background:#0a0e17;color:#f1f5f9;max-width:600px;margin:0 auto;padding:2rem}
    h1{color:#00D4FF}.post{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:1.5rem;white-space:pre-wrap;line-height:1.7}
    .badge{display:inline-block;padding:0.25rem 0.75rem;border-radius:999px;font-size:0.75rem;font-weight:600;background:rgba(10,102,194,0.2);color:#00D4FF;margin-bottom:1rem}
    a{color:#0A66C2;font-weight:600}</style></head><body>
    <h1>👁️ Post Preview</h1>
    <span class="badge">${post.type.toUpperCase()}</span>
    <div class="post">${post.content}</div>
    <p style="margin-top:1rem"><a href="/dashboard">← Back to Dashboard</a></p>
    </body></html>
  `);
});

// API endpoint for status
app.get('/api/status', (req, res) => {
  res.json({ authenticated: isTokenValid(), totalPosts: postHistory.length, nextType: getNextType() });
});

// ─── Authentication API ───

app.post('/api/auth/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  try {
    const existing = await get('SELECT id FROM users WHERE email = ?', [email]);
    if (existing) return res.status(400).json({ error: 'User already exists' });
    const hash = await bcrypt.hash(password, 10);
    const result = await run('INSERT INTO users (email, password_hash) VALUES (?, ?)', [email, hash]);
    const token = jwt.sign({ id: result.id, email }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user: { id: result.id, email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ─── Posts API ───

app.get('/api/posts', authMiddleware, async (req, res) => {
  try {
    const posts = await all('SELECT * FROM posts WHERE user_id = ? ORDER BY id ASC', [req.user.id]);
    res.json(posts.map(p => ({
      ...p,
      imageNeeded: p.imageNeeded === 1
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/posts/sync', authMiddleware, async (req, res) => {
  const { posts } = req.body;
  if (!Array.isArray(posts)) return res.status(400).json({ error: 'Invalid data' });
  
  try {
    for (let post of posts) {
      const existing = await get('SELECT id FROM posts WHERE id = ? AND user_id = ?', [post.id.toString(), req.user.id]);
      if (!existing) {
        await run(`INSERT INTO posts (id, user_id, type, content, hashtags, date, time, words, imageNeeded, imagePrompt) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
          [post.id.toString(), req.user.id, post.type, post.content, post.hashtags, post.date, post.time, post.words, post.imageNeeded ? 1 : 0, post.imagePrompt]);
      }
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/posts', authMiddleware, async (req, res) => {
  const post = req.body;
  try {
    await run(`INSERT INTO posts (id, user_id, type, content, hashtags, date, time, words, imageNeeded, imagePrompt) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
          [post.id.toString(), req.user.id, post.type, post.content, post.hashtags, post.date, post.time, post.words, post.imageNeeded ? 1 : 0, post.imagePrompt]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve frontend app
app.use(express.static(path.join(__dirname, '..')));

// ─── Cron Scheduler ───
let time1 = process.env.POST_TIME_1 || '08:30';
let time2 = process.env.POST_TIME_2 || '18:00';
let [h1, m1] = time1.split(':');
let [h2, m2] = time2.split(':');

cron.schedule(`${m1} ${h1} * * *`, () => {
  console.log(`\n⏰ Scheduled post triggered at ${time1}`);
  autoPost();
});

cron.schedule(`${m2} ${h2} * * *`, () => {
  console.log(`\n⏰ Scheduled post triggered at ${time2}`);
  autoPost();
});

// ─── Start Server ───
app.listen(PORT, () => {
  console.log(`\n${'═'.repeat(50)}`);
  console.log(`⚡ LinkedIn Auto Poster running at http://localhost:${PORT}/dashboard`);
  console.log(`${'═'.repeat(50)}`);
  console.log(`📅 Scheduled: ${time1} and ${time2} daily`);
  console.log(`🔐 Auth status: ${isTokenValid() ? '✅ Ready' : '⚠️ Visit http://localhost:3000/auth'}`);
  console.log(`${'═'.repeat(50)}\n`);
});
