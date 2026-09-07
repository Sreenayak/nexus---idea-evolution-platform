import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  INITIAL_WORLDS,
  INITIAL_SPARKS,
  INITIAL_CHALLENGES,
  INITIAL_CONNECTIONS,
  CURRENT_USER,
} from './src/data/mockData';
import { SocialWorld, Spark, Challenge, ActivityConnection, NexusUser, RemixType } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory server-side state initialized with rich mock dataset
let worldsData: SocialWorld[] = JSON.parse(JSON.stringify(INITIAL_WORLDS));
let sparksData: Spark[] = JSON.parse(JSON.stringify(INITIAL_SPARKS));
let challengesData: Challenge[] = JSON.parse(JSON.stringify(INITIAL_CHALLENGES));
let connectionsData: ActivityConnection[] = JSON.parse(JSON.stringify(INITIAL_CONNECTIONS));

// In-memory mock user database for authentication & demo personas
interface BackendUser extends NexusUser {
  email: string;
  password?: string;
  token?: string;
}

const USERS: Record<string, BackendUser> = {
  'elena@nexus.network': {
    ...JSON.parse(JSON.stringify(CURRENT_USER)),
    email: 'elena@nexus.network',
    password: 'nexus123',
  },
  'alex@nexus.network': {
    id: 'user-alex',
    name: 'Alex Rivera',
    email: 'alex@nexus.network',
    password: 'nexus123',
    handle: '@arivera_dev',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&h=240&q=80',
    role: 'ML Infrastructure & Cloud Containers',
    bio: 'Building deterministic testbeds for agentic intelligence. Passionate about reproducibility in modern science.',
    skills: ['Docker/Kubernetes', 'FastAPI', 'Distributed Training', 'Python / Rust'],
    stats: {
      worldsEntered: 8,
      sparksCreated: 24,
      ideasRemixed: 31,
      challengesCompleted: 5,
      projectsBuilt: 3,
    },
    activeProjects: ['Nexus Scholar', 'Reproducibility Mesh'],
    badges: [
      {
        id: 'badge-infra',
        name: 'Mesh Architect',
        icon: 'Cpu',
        description: 'Engineered high-scale sandbox pipelines for verifiable papers.',
      },
    ],
  },
  'marcus@nexus.network': {
    id: 'user-marcus',
    name: 'Marcus Thorne',
    email: 'marcus@nexus.network',
    password: 'nexus123',
    handle: '@mthorne_design',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=240&h=240&q=80',
    role: 'Spatial Experience Designer & Tactile Ergonomist',
    bio: 'Crafting non-intrusive tactile interactions for mixed reality and spatial operating systems.',
    skills: ['Spatial Audio', 'Three.js / WebGL', 'Design Systems', 'Haptics'],
    stats: {
      worldsEntered: 11,
      sparksCreated: 29,
      ideasRemixed: 15,
      challengesCompleted: 6,
      projectsBuilt: 3,
    },
    activeProjects: ['Tactile Glassmorphism Token Library'],
    badges: [
      {
        id: 'badge-luminary',
        name: 'Aesthetic Luminary',
        icon: 'Palette',
        description: 'Designed foundational tokens used by over 800 spatial developers.',
      },
    ],
  },
  'soren@nexus.network': {
    id: 'user-soren',
    name: 'Dr. Soren Chen',
    email: 'soren@nexus.network',
    password: 'nexus123',
    handle: '@soren_chen',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&h=240&q=80',
    role: 'Decentralized Science (DeSci) Architect',
    bio: 'Incentive engineering for open scientific publishing, quadratic grants, and reproducible peer review.',
    skills: ['Tokenomics', 'Smart Contracts', 'Peer Review Protocols', 'Game Theory'],
    stats: {
      worldsEntered: 6,
      sparksCreated: 14,
      ideasRemixed: 20,
      challengesCompleted: 3,
      projectsBuilt: 2,
    },
    activeProjects: ['DeSci Micro-Bounty Mesh'],
    badges: [
      {
        id: 'badge-desci',
        name: 'Protocol Architect',
        icon: 'Atom',
        description: 'Pioneered zero-knowledge peer review incentive networks.',
      },
    ],
  },
};

// Simple in-memory session tokens: token -> user email
const SESSIONS = new Map<string, string>();

function generateToken(email: string): string {
  const token = `nexus_sess_${Buffer.from(email + ':' + Date.now()).toString('base64')}`;
  SESSIONS.set(token, email);
  return token;
}

// -------------------------------------------------------------
// API Routes
// -------------------------------------------------------------

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'NEXUS Idea Evolution Backend',
    timestamp: new Date().toISOString(),
    metrics: {
      worlds: worldsData.length,
      sparks: sparksData.length,
      challenges: challengesData.length,
      connections: connectionsData.length,
    },
  });
});

// GET /api/worlds - Returns all Social Worlds
app.get('/api/worlds', (req, res) => {
  res.json({ worlds: worldsData });
});

// GET /api/sparks - Returns all Sparks (optional filter by ?worldId=...)
app.get('/api/sparks', (req, res) => {
  const { worldId } = req.query;
  if (worldId && typeof worldId === 'string') {
    const filtered = sparksData.filter((s) => s.worldId === worldId);
    return res.json({ sparks: filtered });
  }
  res.json({ sparks: sparksData });
});

// POST /api/sparks - Create a new Spark
app.post('/api/sparks', (req, res) => {
  const { worldId, title, content, tags, authorId } = req.body;

  if (!worldId || !title || !content) {
    return res.status(400).json({ error: 'worldId, title, and content are required' });
  }

  const author = Object.values(USERS).find((u) => u.id === authorId) || USERS['elena@nexus.network'];

  const newSpark: Spark = {
    id: `spark-${Date.now()}`,
    worldId,
    author: {
      id: author.id,
      name: author.name,
      handle: author.handle,
      avatar: author.avatar,
      role: author.role,
    },
    title,
    content,
    branchType: 'original',
    remixCount: 0,
    mergeCount: 0,
    energy: 85,
    createdAt: 'Just now',
    tags: tags || ['Hypothesis', 'OpenCollab'],
    status: 'active',
    childSparkIds: [],
  };

  sparksData = [newSpark, ...sparksData];

  // Update world statistics
  worldsData = worldsData.map((w) =>
    w.id === worldId
      ? {
          ...w,
          activeSparks: w.activeSparks + 1,
          pulse: {
            ...w.pulse,
            energy: Math.min(100, w.pulse.energy + 2),
            creativity: Math.min(100, w.pulse.creativity + 3),
          },
        }
      : w
  );

  res.status(201).json({ success: true, spark: newSpark });
});

// POST /api/sparks/:id/remix - Remix an existing Spark
app.post('/api/sparks/:id/remix', (req, res) => {
  const parentSparkId = req.params.id;
  const { worldId, title, content, remixType, evolutionNote, tags, authorId } = req.body;

  const parentSpark = sparksData.find((s) => s.id === parentSparkId);
  if (!parentSpark) {
    return res.status(404).json({ error: 'Parent spark not found' });
  }

  const author = Object.values(USERS).find((u) => u.id === authorId) || USERS['elena@nexus.network'];
  const newRemixId = `spark-remix-${Date.now()}`;

  const newRemixSpark: Spark = {
    id: newRemixId,
    worldId: worldId || parentSpark.worldId,
    author: {
      id: author.id,
      name: author.name,
      handle: author.handle,
      avatar: author.avatar,
      role: author.role,
    },
    title,
    content,
    branchType: 'remix',
    remixType: (remixType as RemixType) || 'extend',
    parentSparkId,
    evolutionNote: evolutionNote || 'Branched new perspective',
    remixCount: 0,
    mergeCount: 0,
    energy: 92,
    createdAt: 'Just now',
    tags: tags || ['Remix', 'Evolution'],
    status: 'active',
    childSparkIds: [],
  };

  sparksData = sparksData.map((s) => {
    if (s.id === parentSparkId) {
      return {
        ...s,
        remixCount: s.remixCount + 1,
        energy: Math.min(100, s.energy + 5),
        childSparkIds: [...s.childSparkIds, newRemixId],
      };
    }
    return s;
  });

  sparksData.push(newRemixSpark);

  res.status(201).json({ success: true, spark: newRemixSpark });
});

// POST /api/sparks/merge - Merge 2 Sparks into a Collaborative Project
app.post('/api/sparks/merge', (req, res) => {
  const { sparkAId, sparkBId, mergedTitle, synthesisDescription, projectGoal, worldId, authorId } = req.body;

  const author = Object.values(USERS).find((u) => u.id === authorId) || USERS['elena@nexus.network'];
  const newProjectId = `spark-project-${Date.now()}`;

  const projectSpark: Spark = {
    id: newProjectId,
    worldId: worldId || 'world-ai',
    author: {
      id: author.id,
      name: author.name,
      handle: author.handle,
      avatar: author.avatar,
      role: author.role,
    },
    title: mergedTitle,
    content: `${synthesisDescription}\n\nDeliverable: ${projectGoal}`,
    branchType: 'merged',
    mergedFromIds: [sparkAId, sparkBId],
    remixCount: 0,
    mergeCount: 1,
    energy: 98,
    createdAt: 'Just now',
    tags: ['CollaborativeProject', 'Merged', 'SprintReady'],
    status: 'project',
    childSparkIds: [],
  };

  sparksData = sparksData.map((s) => {
    if (s.id === sparkAId || s.id === sparkBId) {
      return {
        ...s,
        mergeCount: s.mergeCount + 1,
        energy: Math.min(100, s.energy + 8),
        childSparkIds: [...s.childSparkIds, newProjectId],
      };
    }
    return s;
  });

  sparksData.push(projectSpark);

  // Update world
  worldsData = worldsData.map((w) =>
    w.id === (worldId || 'world-ai')
      ? {
          ...w,
          activeProjects: w.activeProjects + 1,
          pulse: {
            ...w.pulse,
            collaboration: Math.min(100, w.pulse.collaboration + 6),
            energy: Math.min(100, w.pulse.energy + 4),
          },
        }
      : w
  );

  res.status(201).json({ success: true, projectSpark });
});

// POST /api/sparks/:id/ignite - Boost resonance / energy
app.post('/api/sparks/:id/ignite', (req, res) => {
  const { id } = req.params;
  let updatedEnergy = 100;
  sparksData = sparksData.map((s) => {
    if (s.id === id) {
      updatedEnergy = Math.min(100, s.energy + 4);
      return { ...s, energy: updatedEnergy };
    }
    return s;
  });
  res.json({ success: true, sparkId: id, energy: updatedEnergy });
});

// GET /api/challenges - Return Challenges
app.get('/api/challenges', (req, res) => {
  res.json({ challenges: challengesData });
});

// POST /api/challenges/:id/join - Join a Sprint Challenge
app.post('/api/challenges/:id/join', (req, res) => {
  const { id } = req.params;
  const { userId, userName, userHandle, userAvatar, userRole } = req.body;

  let joinedChallenge: Challenge | undefined;
  challengesData = challengesData.map((c) => {
    if (c.id === id) {
      joinedChallenge = {
        ...c,
        participantCount: Math.min(c.maxParticipants, c.participantCount + 1),
        progressPercent: Math.min(100, c.progressPercent + 8),
        participants: [
          ...c.participants,
          {
            id: userId || 'user-me',
            name: userName || 'Elena Vance',
            handle: userHandle || '@elenavance',
            avatar: userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&h=240&q=80',
            role: userRole || 'Architect',
          },
        ],
      };
      return joinedChallenge;
    }
    return c;
  });

  if (!joinedChallenge) {
    return res.status(404).json({ error: 'Challenge not found' });
  }

  res.json({ success: true, challenge: joinedChallenge });
});

// GET /api/connections - Return Activity Connections
app.get('/api/connections', (req, res) => {
  res.json({ connections: connectionsData });
});

// GET /api/users - returns available user profiles / personas for demo
app.get('/api/users', (req, res) => {
  const usersList = Object.values(USERS).map((u) => {
    const { password, ...safeUser } = u;
    return safeUser;
  });
  res.json({ users: usersList });
});

// POST /api/auth/login - Login with email/password or demo user selection
app.post('/api/auth/login', (req, res) => {
  const { email, password, personaKey } = req.body;

  let targetUser: BackendUser | undefined;

  if (personaKey && USERS[personaKey]) {
    targetUser = USERS[personaKey];
  } else if (email && USERS[email.toLowerCase()]) {
    targetUser = USERS[email.toLowerCase()];
  } else if (email) {
    const found = Object.values(USERS).find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      targetUser = found;
    }
  }

  if (!targetUser) {
    return res.status(404).json({ error: 'No account found with this email address. Please register.' });
  }

  // Check password if set on user
  if (targetUser.password && password) {
    if (targetUser.password !== password) {
      return res.status(401).json({ error: 'Invalid password. Please check your credentials.' });
    }
  } else if (targetUser.password && !password) {
    return res.status(400).json({ error: 'Password is required to access this node.' });
  }

  const token = generateToken(targetUser.email);
  res.json({
    success: true,
    message: `Welcome back, ${targetUser.name}!`,
    token,
    user: targetUser,
  });
});

// POST /api/auth/register - Create a new account with password
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role, bio, skills, avatar } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  if (!password || password.trim().length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }

  const cleanEmail = email.toLowerCase().trim();

  // Check if account already exists
  if (USERS[cleanEmail]) {
    return res.status(409).json({ error: 'An account with this email already exists. Please sign in.' });
  }

  const id = `user-${Date.now().toString(36)}`;
  const handle = `@${name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9_]/g, '')}`;

  const newUser: BackendUser = {
    id,
    name: name.trim(),
    email: cleanEmail,
    password: password.trim(),
    handle,
    avatar:
      avatar ||
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=240&h=240&q=80',
    role: role || 'Emergent Thinker & Explorer',
    bio: bio || 'Synthesizing knowledge across NEXUS Social Worlds.',
    skills: skills && skills.length > 0 ? skills : ['Autonomous AI', 'System Synthesis', 'Creative Strategy'],
    stats: {
      worldsEntered: 1,
      sparksCreated: 0,
      ideasRemixed: 0,
      challengesCompleted: 0,
      projectsBuilt: 0,
    },
    activeProjects: [],
    badges: [
      {
        id: 'badge-newcomer',
        name: 'Nexus Initiate',
        icon: 'Sparkles',
        description: 'Joined the next-generation idea evolution network.',
      },
    ],
  };

  USERS[cleanEmail] = newUser;
  const token = generateToken(cleanEmail);

  res.status(201).json({
    success: true,
    message: `Account created for ${newUser.name}!`,
    token,
    user: newUser,
  });
});

// GET /api/auth/me - Verify current user session
app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.json({
      authenticated: true,
      user: USERS['elena@nexus.network'],
      token: generateToken('elena@nexus.network'),
    });
  }

  const token = authHeader.split(' ')[1];
  const userEmail = SESSIONS.get(token);

  if (userEmail && USERS[userEmail]) {
    return res.json({
      authenticated: true,
      user: USERS[userEmail],
      token,
    });
  }

  return res.json({
    authenticated: true,
    user: USERS['elena@nexus.network'],
    token: generateToken('elena@nexus.network'),
  });
});

// POST /api/auth/logout - Sign out session
app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    SESSIONS.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

// -------------------------------------------------------------
// Vite Middleware / Static Serving
// -------------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NEXUS full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
