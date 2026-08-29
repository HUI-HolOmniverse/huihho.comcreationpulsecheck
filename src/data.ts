/* ============================================================
   QWEN_HUI_REPOSITORY_CONSTELLATION_V0_1 — artifact data layer
   Epistemic rule: no remote read was performed. Every structural
   claim below is inferred from the mission text and repository
   naming conventions, and is labeled accordingly.
   ============================================================ */

export type ClusterId = "MATER" | "META" | "ARCHE" | "MESO" | "SUBSTRATE";

export const CLUSTERS: Record<
  ClusterId,
  { label: string; blurb: string; tone: "teal" | "ice" | "amber" | "coral" | "mute" }
> = {
  MATER: { label: "MATER", blurb: "Substance kernel — matter, language, logoi.", tone: "teal" },
  META: { label: "META", blurb: "Governance kernel — spaces, agents, sync, depth docs.", tone: "ice" },
  ARCHE: { label: "ARCHE", blurb: "Foundational order — CIESSM, agoras, economy, templates.", tone: "amber" },
  MESO: { label: "MESO", blurb: "Operational middle — skills and automation runners.", tone: "mute" },
  SUBSTRATE: { label: "SUBSTRATE", blurb: "Shared commons + backend services (identity, ledger).", tone: "coral" },
};

export type RepoStatus = "IN-SCOPE" | "NEEDS-VERIFY" | "CONFLICT-RISK";

export interface Repo {
  id: string;
  name: string;
  cluster: ClusterId;
  role: string;
  caps: string[];
  status: RepoStatus;
  note: string;
  x: number;
  y: number;
}

export const REPOS: Repo[] = [
  {
    id: "mater-core",
    name: "HUI-Mater-Core",
    cluster: "MATER",
    role: "Substance kernel. Inferred bootstrap/lifecycle core for Mater-layer artifacts.",
    caps: ["QCORE (disputed)", "bootstrap", "artifact lifecycle"],
    status: "CONFLICT-RISK",
    note: "Naming collides with HUI-Meta-Core and QCORE — three candidate 'cores' (D-01).",
    x: 148, y: 128,
  },
  {
    id: "mater-logoi",
    name: "HUI-Mater-Holo-Logoi",
    cluster: "MATER",
    role: "Logoi layer — language, semantic contracts, discourse primitives between holo artifacts.",
    caps: ["Holo-Logoi", "semantic contracts", "event channel (suspected)"],
    status: "NEEDS-VERIFY",
    note: "Possibly carries an event channel that overlaps HUI-Meta-Holo-Sync (D-02).",
    x: 305, y: 200,
  },
  {
    id: "meta-core",
    name: "HUI-Meta-Core",
    cluster: "META",
    role: "Meta-governance kernel. Inferred policy/registry core for Meta-layer spaces and agents.",
    caps: ["governance kernel", "registry", "policy"],
    status: "CONFLICT-RISK",
    note: "Second 'core' candidate — consolidation decision required in tranche T2.",
    x: 648, y: 112,
  },
  {
    id: "meta-iceberg",
    name: "HUI-Meta-ICEBERG",
    cluster: "META",
    role: "Stratified documentation — visible tip vs submerged depth; suspected provenance-of-record.",
    caps: ["ICEBERG strata", "provenance", "depth docs"],
    status: "NEEDS-VERIFY",
    note: "Likely home of provenance schema; overlaps commons docs (D-06).",
    x: 806, y: 178,
  },
  {
    id: "meta-holopolis",
    name: "HUI-Meta-Holopolis",
    cluster: "META",
    role: "City/space layer — 2D/3D habitation spaces, Avatar Hub surface, crowd dynamics host.",
    caps: ["Holopolis", "Avatar Hub", "2D/3D spaces", "Crowd-Crowded"],
    status: "IN-SCOPE",
    note: "Heaviest experience surface; consumes templates (Arche) and automations (Meso).",
    x: 560, y: 232,
  },
  {
    id: "meta-agents",
    name: "HUI-Meta-Agents",
    cluster: "META",
    role: "Agent registry and orchestration — identities, roles, delegation for non-human actors.",
    caps: ["agent identity", "orchestration", "delegation"],
    status: "CONFLICT-RISK",
    note: "Agent identity model is the third vertex of the identity triangle (D-03).",
    x: 762, y: 308,
  },
  {
    id: "meta-sync",
    name: "HUI-Meta-Holo-Sync",
    cluster: "META",
    role: "State synchronization bus across spaces and artifacts.",
    caps: ["Holo-Sync", "state bus", "presence"],
    status: "IN-SCOPE",
    note: "Designate as the single transport in target architecture (G).",
    x: 620, y: 380,
  },
  {
    id: "arche-ciessm",
    name: "HUI-Arche-CIESSM",
    cluster: "ARCHE",
    role: "CIESSM framework — suspected evaluation/structuring method; acronym expansion unverified (Q-02).",
    caps: ["CIESSM", "structuring method"],
    status: "NEEDS-VERIFY",
    note: "Relationship to EESSA and AIPFIT is the largest unresolved coupling (Q-01, Q-02).",
    x: 138, y: 330,
  },
  {
    id: "arche-agoras",
    name: "HUI-Arche-Agoras",
    cluster: "ARCHE",
    role: "Assembly spaces — deliberation, markets of participation, Crowd-Crowded dynamics.",
    caps: ["Agoras", "participation", "assembly"],
    status: "IN-SCOPE",
    note: "Natural host for participation accounting; must not fork the credits ledger (D-04).",
    x: 276, y: 430,
  },
  {
    id: "arche-tripod",
    name: "HUI-Arche-Economic-Tripod",
    cluster: "ARCHE",
    role: "Three-legged economy — inferred legs: credits / vouching / reputation.",
    caps: ["credits", "vouching", "reputation", "Holopoly"],
    status: "NEEDS-VERIFY",
    note: "Leg composition is inference; confirm against repo before T1 (Q-05).",
    x: 142, y: 490,
  },
  {
    id: "arche-templates",
    name: "HUI-Arche-Holo-Templates",
    cluster: "ARCHE",
    role: "Template engine for holo artifacts and space scaffolds.",
    caps: ["templates", "space scaffolds", "composition"],
    status: "IN-SCOPE",
    note: "Overlaps Holopolis scaffolding (D-05); keep engine here, rendering in Holopolis.",
    x: 320, y: 318,
  },
  {
    id: "meso-skills",
    name: "HUI-Meso-Holo-Skills",
    cluster: "MESO",
    role: "Skills framework — suspected carrier of ISPEED / OLVEP skill instruments.",
    caps: ["skills", "ISPEED", "OLVEP"],
    status: "NEEDS-VERIFY",
    note: "Placement of ISPEED/OLVEP is naming-based only (Q-03, Q-04).",
    x: 452, y: 330,
  },
  {
    id: "meso-automations",
    name: "HUI-Meso-Automations",
    cluster: "MESO",
    role: "Automation runners — 2D/3D pipelines, agents' hands in the world.",
    caps: ["automation", "2D/3D pipelines", "runners"],
    status: "IN-SCOPE",
    note: "Consumed by Agents (META) and Agoras (ARCHE); keep runner-agnostic.",
    x: 486, y: 452,
  },
  {
    id: "commons",
    name: "huihho-public-commons",
    cluster: "SUBSTRATE",
    role: "Shared public commons — libraries, schemas, cross-cluster contracts.",
    caps: ["shared libs", "schemas", "contracts"],
    status: "IN-SCOPE",
    note: "Designated landing zone for extracted reusable modules (E, T1).",
    x: 380, y: 556,
  },
  {
    id: "cip-backend",
    name: "hui-cip-backend",
    cluster: "SUBSTRATE",
    role: "Backend services — identity/KYC/AML gate, ledger services, evidence anchoring.",
    caps: ["identity/KYC/AML", "ledger service", "evidence", "My Goodness!"],
    status: "IN-SCOPE",
    note: "Only repo with implied server-side authority; trust layer consolidates here (G).",
    x: 592, y: 556,
  },
];

export const EXCLUDED_REPOS = [
  { name: "Ash Unto Gold", reason: "No access; access not attempted — per directive." },
  { name: "PRA AMAR", reason: "No access; access not attempted — per directive." },
];

export const CONSTELLATION_EDGES: { from: string; to: string; kind: "integration" | "conflict" }[] = [
  { from: "mater-core", to: "mater-logoi", kind: "integration" },
  { from: "mater-logoi", to: "meta-sync", kind: "integration" },
  { from: "meta-core", to: "meta-agents", kind: "integration" },
  { from: "meta-core", to: "meta-iceberg", kind: "integration" },
  { from: "meta-holopolis", to: "meta-sync", kind: "integration" },
  { from: "meta-holopolis", to: "meta-agents", kind: "integration" },
  { from: "arche-templates", to: "meta-holopolis", kind: "integration" },
  { from: "arche-agoras", to: "meta-holopolis", kind: "integration" },
  { from: "arche-tripod", to: "cip-backend", kind: "integration" },
  { from: "arche-ciessm", to: "meso-skills", kind: "integration" },
  { from: "meta-agents", to: "meso-automations", kind: "integration" },
  { from: "meso-automations", to: "meta-holopolis", kind: "integration" },
  { from: "meso-skills", to: "arche-agoras", kind: "integration" },
  { from: "commons", to: "mater-core", kind: "integration" },
  { from: "commons", to: "meta-core", kind: "integration" },
  { from: "cip-backend", to: "meta-agents", kind: "integration" },
  { from: "mater-core", to: "meta-core", kind: "conflict" },
];

/* ---------------- B. capability map ---------------- */

export type Layer = "CORE" | "TRUST" | "ECONOMY" | "GOVERNANCE" | "EXPERIENCE" | "PIPELINE";

export interface Capability {
  name: string;
  layer: Layer;
  owner: string;
  maturity: "IMPLEMENTED" | "DESIGNED" | "PLACEHOLDER" | "UNKNOWN";
  conf: number; // inferred confidence, 0-100
  note: string;
}

export const CAPABILITIES: Capability[] = [
  { name: "HolOmniverse", layer: "CORE", owner: "org-level umbrella", maturity: "DESIGNED", conf: 30, note: "Umbrella concept; no dedicated repo observed — expressed by the org itself." },
  { name: "QCORE", layer: "CORE", owner: "disputed: Mater-Core / Meta-Core", maturity: "UNKNOWN", conf: 18, note: "Placement unresolved; the core question of tranche T2 (Q-06)." },
  { name: "Holo-Logoi", layer: "CORE", owner: "HUI-Mater-Holo-Logoi", maturity: "DESIGNED", conf: 45, note: "Semantic contract layer; repo exists, internals unverified." },
  { name: "CIESSM", layer: "GOVERNANCE", owner: "HUI-Arche-CIESSM", maturity: "UNKNOWN", conf: 25, note: "Framework of record; acronym expansion unverified (Q-02)." },
  { name: "EESSA", layer: "GOVERNANCE", owner: "unplaced — suspected CIESSM-adjacent", maturity: "UNKNOWN", conf: 15, note: "No repo bears the name; coupling to CIESSM/AIPFIT unverified (Q-01)." },
  { name: "AIPFIT", layer: "GOVERNANCE", owner: "unplaced — suspected evaluation instrument", maturity: "UNKNOWN", conf: 15, note: "Reads as an AI-fitness evaluation; location and schema unknown (Q-02)." },
  { name: "ISPEED", layer: "PIPELINE", owner: "HUI-Meso-Holo-Skills (inferred)", maturity: "UNKNOWN", conf: 20, note: "Skill-speed instrument hypothesis; naming-based placement only (Q-03)." },
  { name: "OLVEP", layer: "PIPELINE", owner: "HUI-Meso-Holo-Skills (inferred)", maturity: "UNKNOWN", conf: 20, note: "Skill instrument hypothesis; may be a validation protocol (Q-04)." },
  { name: "Flow Well", layer: "EXPERIENCE", owner: "unplaced — suspected Mater/Meta flow-state engine", maturity: "UNKNOWN", conf: 12, note: "No obvious repo host; flagged as homeless capability (Q-07)." },
  { name: "Agoras", layer: "GOVERNANCE", owner: "HUI-Arche-Agoras", maturity: "DESIGNED", conf: 45, note: "Assembly spaces; participation accounting likely lives here." },
  { name: "Holopoly", layer: "ECONOMY", owner: "Arche-Economic-Tripod (inferred)", maturity: "UNKNOWN", conf: 22, note: "Economy game layer; relationship to the Tripod legs unverified (Q-08)." },
  { name: "Avatar Hub", layer: "EXPERIENCE", owner: "HUI-Meta-Holopolis", maturity: "DESIGNED", conf: 40, note: "Avatar surface of the Holopolis space layer." },
  { name: "My Goodness!", layer: "TRUST", owner: "hui-cip-backend (inferred)", maturity: "UNKNOWN", conf: 25, note: "Playful name; reads as a vouching/goodness UX over the trust layer (Q-09)." },
  { name: "Q Force", layer: "EXPERIENCE", owner: "unplaced — engagement vector", maturity: "UNKNOWN", conf: 14, note: "Possibly gamified engagement force feeding participation (Q-10)." },
  { name: "Crowd-Crowded", layer: "EXPERIENCE", owner: "Holopolis / Agoras (split risk)", maturity: "UNKNOWN", conf: 18, note: "Crowd dynamics; host must be decided to avoid a split brain." },
  { name: "Identity / KYC / AML", layer: "TRUST", owner: "hui-cip-backend", maturity: "IMPLEMENTED", conf: 55, note: "Backend naming implies implemented gate; jurisdiction scope unverified (Q-11)." },
  { name: "Vouching", layer: "TRUST", owner: "Economic-Tripod + cip-backend", maturity: "DESIGNED", conf: 30, note: "Social guarantee primitive; feeds reputation." },
  { name: "Reputation", layer: "TRUST", owner: "Economic-Tripod (leg 3, inferred)", maturity: "DESIGNED", conf: 28, note: "Derived score; must be read-model over evidence, never source of truth." },
  { name: "Credits", layer: "ECONOMY", owner: "Economic-Tripod (leg 1) + cip ledger", maturity: "DESIGNED", conf: 30, note: "Medium of exchange; single ledger service required (D-04)." },
  { name: "Participation", layer: "ECONOMY", owner: "Agoras + cip-backend", maturity: "DESIGNED", conf: 26, note: "Activity accounting that mints claims on credits/reputation." },
  { name: "Evidence", layer: "TRUST", owner: "hui-cip-backend + ICEBERG", maturity: "DESIGNED", conf: 32, note: "Claims must anchor to evidence artifacts with hashes." },
  { name: "Provenance", layer: "TRUST", owner: "HUI-Meta-ICEBERG", maturity: "DESIGNED", conf: 35, note: "Chain of custody; schema likely stratified in ICEBERG." },
  { name: "2D/3D Spaces", layer: "EXPERIENCE", owner: "Holopolis + Meso-Automations", maturity: "DESIGNED", conf: 38, note: "Rendering in Holopolis; pipelines in Meso-Automations." },
  { name: "Automation", layer: "PIPELINE", owner: "HUI-Meso-Automations", maturity: "DESIGNED", conf: 42, note: "Runner layer for agent actions and space pipelines." },
];

/* ---------------- C. implemented / designed / placeholder matrix ---------------- */

export interface MatrixRow {
  module: string;
  cluster: ClusterId;
  implemented: string[];
  designed: string[];
  placeholder: string[];
  verdict: string;
}

export const MATRIX: MatrixRow[] = [
  { module: "Core kernel(s)", cluster: "MATER", implemented: [], designed: ["Mater bootstrap", "artifact lifecycle"], placeholder: ["QCORE binding"], verdict: "Consolidate before any write (D-01)." },
  { module: "Logoi contracts", cluster: "MATER", implemented: [], designed: ["semantic contracts"], placeholder: ["event channel?"], verdict: "Verify channel claim vs Holo-Sync." },
  { module: "Meta governance", cluster: "META", implemented: [], designed: ["registry", "policy kernel"], placeholder: ["cross-core treaty"], verdict: "Treaty blocked by D-01." },
  { module: "ICEBERG strata", cluster: "META", implemented: [], designed: ["depth docs", "provenance chain"], placeholder: ["tip/submerge tooling"], verdict: "Provenance-of-record candidate." },
  { module: "Holopolis spaces", cluster: "META", implemented: [], designed: ["2D/3D spaces", "Avatar Hub"], placeholder: ["Crowd-Crowded host"], verdict: "Composition target for T3." },
  { module: "Agent registry", cluster: "META", implemented: [], designed: ["agent identity", "delegation"], placeholder: ["agent KYC bridge"], verdict: "Must bind to cip identity (D-03)." },
  { module: "Holo-Sync bus", cluster: "META", implemented: [], designed: ["state bus", "presence"], placeholder: ["Logoi channel merge"], verdict: "Designated single transport." },
  { module: "CIESSM framework", cluster: "ARCHE", implemented: [], designed: ["structuring method"], placeholder: ["EESSA/AIPFIT hooks"], verdict: "Blocked on acronym ground truth." },
  { module: "Agoras assemblies", cluster: "ARCHE", implemented: [], designed: ["assembly spaces", "participation"], placeholder: ["Q Force intake"], verdict: "Do not fork credits here." },
  { module: "Economic Tripod", cluster: "ARCHE", implemented: [], designed: ["credits leg", "vouching leg", "reputation leg"], placeholder: ["Holopoly rules"], verdict: "Leg composition unverified." },
  { module: "Holo-Templates", cluster: "ARCHE", implemented: [], designed: ["template engine"], placeholder: ["space scaffold pack"], verdict: "Engine only; render elsewhere (D-05)." },
  { module: "Holo-Skills", cluster: "MESO", implemented: [], designed: ["skills framework"], placeholder: ["ISPEED", "OLVEP"], verdict: "Instruments are placeholders until Q-03/Q-04." },
  { module: "Automations", cluster: "MESO", implemented: [], designed: ["runners", "2D/3D pipelines"], placeholder: ["agent action bridge"], verdict: "Keep runner-agnostic." },
  { module: "Public commons", cluster: "SUBSTRATE", implemented: [], designed: ["shared schemas"], placeholder: ["extracted modules (E)"], verdict: "Landing zone for T1 extractions." },
  { module: "CIP backend", cluster: "SUBSTRATE", implemented: ["identity/KYC/AML gate (implied)"], designed: ["ledger service", "evidence anchor"], placeholder: ["My Goodness! UX"], verdict: "Only implied-implemented surface." },
];

export const MATRIX_FOOTNOTE =
  "No remote read was performed; cell contents are reconstructed from naming and mission text. 'Implemented' claims appear only where naming implies a running service (cip-backend), and even those are flagged IMPLIED.";

/* ---------------- D. duplicate / conflict map ---------------- */

export interface Conflict {
  id: string;
  title: string;
  a: string;
  b: string;
  kind: "DUPLICATION" | "CONTRADICTION" | "OVERLAP";
  severity: "HIGH" | "MED" | "LOW";
  detail: string;
  resolution: string;
}

export const CONFLICTS: Conflict[] = [
  { id: "D-01", title: "The three-core problem", a: "HUI-Mater-Core", b: "HUI-Meta-Core × QCORE", kind: "CONTRADICTION", severity: "HIGH", detail: "Three candidate cores: substance core, governance core, and the QCORE concept with no settled home. Two bootstraps will diverge; QCORE will mean different things per cluster.", resolution: "T2: declare one QCORE binding (recommended: QCORE as treaty over Mater+Meta cores, not a third runtime)." },
  { id: "D-02", title: "Transport split-brain", a: "HUI-Meta-Holo-Sync", b: "Holo-Logoi event channel", kind: "DUPLICATION", severity: "MED", detail: "If Logoi carries its own event channel, two transports will drift on ordering, replay, and presence semantics.", resolution: "Logoi emits semantic events; Holo-Sync is the sole transport. Contract in commons." },
  { id: "D-03", title: "Identity triangle", a: "cip-backend KYC/AML", b: "Meta-Agents × My Goodness!", kind: "CONTRADICTION", severity: "HIGH", detail: "Three identity models: legal-person KYC, agent identity, and goodness/vouching identity. Cross-model authn will be ad hoc.", resolution: "T1: one IdentityGate in cip-backend; agents and vouching are credential classes under it." },
  { id: "D-04", title: "Ledger duplication", a: "Economic-Tripod credits", b: "cip-backend ledger service", kind: "DUPLICATION", severity: "MED", detail: "Credits logic in the Tripod plus a backend ledger service invites double-entry drift.", resolution: "Tripod defines rules; cip-backend hosts the only ledger. Read-models elsewhere." },
  { id: "D-05", title: "Template overlap", a: "Arche-Holo-Templates", b: "Holopolis scaffolding", kind: "OVERLAP", severity: "LOW", detail: "Space scaffolds could be forked into Holopolis, stranding the template engine.", resolution: "Engine in Arche; rendering and placement in Holopolis. No scaffold copies." },
  { id: "D-06", title: "Docs strata bleed", a: "Meta-ICEBERG", b: "huihho-public-commons", kind: "OVERLAP", severity: "LOW", detail: "Shared docs vs stratified docs: risk of the same artifact living in two depths.", resolution: "Commons holds public contracts; ICEBERG holds provenance and submerged strata. One canonical pointer." },
];

/* ---------------- E. reusable component inventory ---------------- */

export interface Reusable {
  name: string;
  kind: "MODULE" | "CONTRACT" | "SERVICE" | "UI";
  size: "S" | "M" | "L";
  from: string;
  to: string[];
  desc: string;
}

export const REUSABLES: Reusable[] = [
  { name: "IdentityGate", kind: "SERVICE", size: "L", from: "hui-cip-backend", to: ["Meta-Agents", "My Goodness!", "Agoras"], desc: "KYC/AML + credential classes (legal person, agent, vouched) behind one gate." },
  { name: "VouchingLedger client", kind: "MODULE", size: "M", from: "Economic-Tripod", to: ["My Goodness!", "Agoras", "commons"], desc: "Issue/verify social guarantees; feeds reputation read-model." },
  { name: "ReputationScore", kind: "MODULE", size: "S", from: "Economic-Tripod", to: ["Holopoly", "Agoras", "Crowd-Crowded"], desc: "Derived score computed over evidence; never a source of truth." },
  { name: "CreditsLedgerClient", kind: "MODULE", size: "M", from: "cip-backend ledger", to: ["Tripod", "Holopoly", "Q Force"], desc: "Single-writer ledger access; all consumers are read-model subscribers." },
  { name: "EvidenceAnchor", kind: "CONTRACT", size: "S", from: "cip-backend + ICEBERG", to: ["CIESSM", "AIPFIT", "Agoras"], desc: "Hash-anchored evidence artifacts with provenance pointers into ICEBERG strata." },
  { name: "ProvenanceChain", kind: "CONTRACT", size: "M", from: "Meta-ICEBERG", to: ["commons", "Holopolis", "Tripod"], desc: "Chain-of-custody schema for artifacts, spaces, and claims." },
  { name: "SyncSocket", kind: "MODULE", size: "M", from: "Meta-Holo-Sync", to: ["Holopolis", "Agoras", "Logoi"], desc: "Single transport adapter; Logoi events ride it, never beside it." },
  { name: "LogoiContract", kind: "CONTRACT", size: "S", from: "Mater-Holo-Logoi", to: ["commons", "Agents", "Automations"], desc: "Semantic contract schema agents and automations speak." },
  { name: "TemplateRenderer", kind: "MODULE", size: "M", from: "Arche-Holo-Templates", to: ["Holopolis", "Meso-Automations"], desc: "Engine output consumed by space rendering and automation pipelines." },
  { name: "AutomationRunner", kind: "SERVICE", size: "L", from: "Meso-Automations", to: ["Agents", "Holopolis", "Agoras"], desc: "Runner-agnostic execution for 2D/3D pipelines and agent actions." },
  { name: "AvatarPresence", kind: "UI", size: "S", from: "Meta-Holopolis", to: ["Agoras", "Crowd-Crowded"], desc: "Presence + avatar surface component bound to SyncSocket state." },
];

/* ---------------- F. PR #103 <-> #104 reconciliation ---------------- */

export const PRS = [
  {
    label: "PR #103",
    origin: "EXTERNAL",
    sha: "b0385da046bdcb7ca758fa5770dea5c7f73244eb",
    short: "b0385da",
    retrieved: false,
  },
  {
    label: "PR #104 (this agent)",
    origin: "QWEN",
    sha: "c1136a4e8758183cb199e2987373910012ba4872",
    short: "c1136a4",
    retrieved: false,
  },
];

export const RECON_PROTOCOL = [
  "Fetch both diffs into a read-only sandbox; no write operations, no merges.",
  "Normalize file lists per cluster and bucket every hunk: NOVEL / DUPLICATE / CONTRADICTORY.",
  "Map each hunk to the capability map (B) — hunks with no capability mapping are rejected as drift.",
  "For CONTRADICTORY pairs, produce a resolution table citing D-01…D-06 policies; no silent picks.",
  "Minimum synthesis = union of NOVEL hunks + resolved contradictions, extracted modules landing in huihho-public-commons first.",
];

export const SYNTHESIS_PATH = [
  "Rebase neither PR; both remain open and frozen (J).",
  "Extract shared surface (identity gate, ledger client, sync adapter) into commons as a new, small PR.",
  "Re-scope #103 and #104 against commons: each shrinks to its NOVEL remainder.",
  "Re-review the remainders independently; merge order decided only after T0 ground truth.",
];

/* ---------------- G. candidate target architecture ---------------- */

export interface Stratum {
  code: string;
  name: string;
  chips: string[];
  note: string;
}

export const STRATA: Stratum[] = [
  { code: "L7", name: "Experience Edge", chips: ["Holopolis", "Avatar Hub", "Holopoly", "Crowd-Crowded", "Flow Well"], note: "Spaces and play surfaces; compose, never fork." },
  { code: "L6", name: "Engagement", chips: ["Q Force", "My Goodness!", "Agoras UX"], note: "Motivation vectors feeding participation accounting." },
  { code: "L5", name: "Capability Instruments", chips: ["EESSA", "CIESSM", "AIPFIT", "ISPEED", "OLVEP"], note: "Methods and instruments; ground truth on acronyms first." },
  { code: "L4", name: "Assembly & Automation", chips: ["Agoras", "Holo-Templates", "Meso-Automations"], note: "Templates + runners; the hands of the system." },
  { code: "L3", name: "Trust Layer", chips: ["Identity/KYC/AML", "Vouching", "Reputation", "Evidence", "Provenance"], note: "One IdentityGate; evidence-anchored; ICEBERG provenance." },
  { code: "L2", name: "Ledger & Sync", chips: ["Credits", "Participation", "Holo-Sync"], note: "Single-writer ledger; single transport." },
  { code: "L1", name: "Core & Substrate", chips: ["QCORE treaty", "Mater-Core", "Meta-Core", "Holo-Logoi", "commons", "cip-backend"], note: "QCORE binds the two cores; commons + cip hold shared weight." },
];

export const ARCH_PRINCIPLES = [
  { title: "One QCORE treaty", body: "QCORE is a binding contract between Mater and Meta cores — not a third runtime, not a fork." },
  { title: "One transport", body: "All state movement rides Holo-Sync. Logoi supplies semantics; Sync supplies motion." },
  { title: "One trust gate", body: "Identity, KYC/AML, vouching and reputation resolve through cip-backend credential classes." },
  { title: "Compose over fork", body: "Spaces consume templates; agents consume runners; nobody copies scaffolds or ledgers." },
];

/* ---------------- H. minimum next implementation tranche ---------------- */

export const STAGES = ["OBSERVED", "AUTHORIZED", "ACCEPTED", "DEPLOYED"] as const;

export interface Tranche {
  code: string;
  title: string;
  objective: string;
  exits: string[];
}

export const TRANCHES: Tranche[] = [
  {
    code: "T0",
    title: "Ground truth",
    objective: "Convert inference into observation: read access to the 15 repos, retrieve #103/#104 diffs, freeze all merges.",
    exits: ["Read access confirmed per repo", "Both diffs bucketed NOVEL/DUPLICATE/CONTRADICTORY", "Merge freeze posted on #103/#104", "Acronyms Q-01…Q-04 answered by repo owners"],
  },
  {
    code: "T1",
    title: "Trust consolidation",
    objective: "Extract IdentityGate, VouchingLedger client, ReputationScore and EvidenceAnchor into huihho-public-commons.",
    exits: ["IdentityGate mediates agents + vouching", "Evidence hashes anchor to ICEBERG provenance", "Reputation is a read-model only", "Consumers cut over with no ledger forks"],
  },
  {
    code: "T2",
    title: "Core & sync dedupe",
    objective: "Ratify the QCORE treaty; make Holo-Sync the sole transport; merge Logoi event semantics onto Sync.",
    exits: ["QCORE treaty document signed into ICEBERG", "Mater/Meta cores pass treaty conformance", "One transport observable in traces", "D-01 and D-02 closed"],
  },
  {
    code: "T3",
    title: "Experience composition",
    objective: "Holopolis composes spaces from Arche templates + Meso runners; Holopoly and Q Force consume ledger read-models.",
    exits: ["Spaces instantiated purely from templates", "Automations runner-agnostic in CI", "Holopoly/Q Force write nothing to ledger directly", "Crowd-Crowded host decided (Holopolis)"],
  },
];

/* ---------------- I. unresolved questions ---------------- */

export interface Question {
  ref: string;
  tag: "BLOCKING" | "CLARIFYING" | "SCOPED-OUT";
  q: string;
}

export const QUESTIONS: Question[] = [
  { ref: "Q-01", tag: "BLOCKING", q: "What is EESSA, and how does it couple to CIESSM and AIPFIT? No repo bears its name." },
  { ref: "Q-02", tag: "BLOCKING", q: "Authoritative expansions of CIESSM and AIPFIT, and which repo holds their schemas?" },
  { ref: "Q-03", tag: "BLOCKING", q: "Is ISPEED a skill instrument inside HUI-Meso-Holo-Skills, or something else entirely?" },
  { ref: "Q-04", tag: "BLOCKING", q: "Is OLVEP a skill instrument, a validation protocol, or an evaluation vector?" },
  { ref: "Q-05", tag: "BLOCKING", q: "Confirm the three legs of the Economic Tripod (credits / vouching / reputation?) from repo source." },
  { ref: "Q-06", tag: "BLOCKING", q: "Where does QCORE bind — Mater, Meta, or as a treaty? D-01 cannot close without this." },
  { ref: "Q-07", tag: "CLARIFYING", q: "Which repo should host Flow Well? Currently a homeless capability." },
  { ref: "Q-08", tag: "CLARIFYING", q: "Is Holopoly a rules layer over the Tripod economy or a separate game with its own tokens?" },
  { ref: "Q-09", tag: "CLARIFYING", q: "Is 'My Goodness!' a UX over vouching, or an independent goodness scoring model?" },
  { ref: "Q-10", tag: "CLARIFYING", q: "Does Q Force write participation directly, or only propose claims to Agoras accounting?" },
  { ref: "Q-11", tag: "CLARIFYING", q: "KYC/AML jurisdictional scope and provider integration status in hui-cip-backend." },
  { ref: "Q-12", tag: "CLARIFYING", q: "Does HUI-Mater-Holo-Logoi currently ship an event channel (confirming or dissolving D-02)?" },
  { ref: "Q-13", tag: "SCOPED-OUT", q: "Ash Unto Gold — content unknown; access explicitly not attempted per directive." },
  { ref: "Q-14", tag: "SCOPED-OUT", q: "PRA AMAR — content unknown; access explicitly not attempted per directive." },
];

/* ---------------- J. do-not-merge list ---------------- */

export interface FreezeItem {
  item: string;
  reason: string;
  mono?: string;
}

export const FREEZE_LIST: FreezeItem[] = [
  { item: "PR #103", mono: "b0385da046bdcb7ca758fa5770dea5c7f73244eb", reason: "Diff unassessed; merge would pre-empt the T0 reconciliation protocol." },
  { item: "PR #104 (this agent)", mono: "c1136a4e8758183cb199e2987373910012ba4872", reason: "Own diff must survive the same protocol; no self-preference." },
  { item: "Any cross-core write", reason: "Writes touching Mater-Core and Meta-Core are frozen until the QCORE treaty (T2)." },
  { item: "Dual identity logic", reason: "No merge that introduces a second identity authority beside cip-backend IdentityGate." },
  { item: "Second ledger writer", reason: "No merge granting write access to credits outside the cip ledger service." },
  { item: "Template/scaffold copies", reason: "No merge that duplicates scaffolds out of Arche-Holo-Templates into consumers." },
];

/* ---------------- nav + ticker ---------------- */

export const NAV = [
  { id: "A", label: "Repository map" },
  { id: "B", label: "Capability map" },
  { id: "C", label: "Impl / designed / placeholder" },
  { id: "D", label: "Duplicate / conflict map" },
  { id: "E", label: "Reusable inventory" },
  { id: "F", label: "#103 ↔ #104 reconciliation" },
  { id: "G", label: "Target architecture" },
  { id: "H", label: "Next tranche" },
  { id: "I", label: "Unresolved questions" },
  { id: "J", label: "Do-not-merge list" },
];

export const TICKER_LINES = [
  "15 repositories enumerated from directive text",
  "remote read: 0 bytes fetched — inference layer engaged",
  "QCORE placement disputed across 2 cores (D-01)",
  "identity triangle detected: KYC × agents × vouching (D-03)",
  "PR #103 / #104 diffs unretrievable — protocol queued (F)",
  "merge freeze asserted on both PRs",
  "PRA AMAR / Ash Unto Gold: access not attempted, per directive",
  "extraction candidates staged for huihho-public-commons (E)",
  "Holo-Sync designated single transport, pending D-02 verification",
];
