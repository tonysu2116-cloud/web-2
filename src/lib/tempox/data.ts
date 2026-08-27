// Content model for the TempoX experience. Kept separate from the
// components so copy and sample data can be reviewed / edited on its own.

export type CategoryId =
  | "all"
  | "run"
  | "swim"
  | "bike"
  | "triathlon"
  | "strength"
  | "recovery"
  | "mindset";

export interface Category {
  id: CategoryId;
  label: string;
  metrics: string[];
  blurb: string;
}

export const categories: Category[] = [
  {
    id: "all",
    label: "All",
    metrics: ["Pace", "Power", "HRV", "Load", "Cadence", "Recovery"],
    blurb: "Every discipline, one performance field.",
  },
  {
    id: "run",
    label: "Run",
    metrics: ["Pace", "Cadence", "Stride length", "Elevation", "Splits"],
    blurb: "Ground contact, cadence and pace, resolved into a single trajectory.",
  },
  {
    id: "swim",
    label: "Swim",
    metrics: ["Stroke rate", "SWOLF", "Distance", "Pace / 100m", "Breathing"],
    blurb: "Stroke efficiency mapped across every length of the pool.",
  },
  {
    id: "bike",
    label: "Bike",
    metrics: ["Power", "Cadence", "FTP", "Elevation", "Speed"],
    blurb: "Watts, gradient and cadence, read as one continuous curve.",
  },
  {
    id: "triathlon",
    label: "Triathlon",
    metrics: ["Transitions", "Combined load", "Discipline balance", "Pacing strategy"],
    blurb: "Three disciplines, one load — balanced instead of stacked.",
  },
  {
    id: "strength",
    label: "Strength",
    metrics: ["Volume", "Intensity", "Bar velocity", "Power output"],
    blurb: "Load and velocity, tracked set by set.",
  },
  {
    id: "recovery",
    label: "Recovery",
    metrics: ["HRV", "Sleep", "Readiness", "Fatigue"],
    blurb: "The signals that decide whether today is a training day.",
  },
  {
    id: "mindset",
    label: "Mindset",
    metrics: ["Consistency", "Stress", "Focus", "Motivation trend"],
    blurb: "The quiet variables that decide whether the plan gets followed.",
  },
];

export interface AthleteMetric {
  label: string;
  from: number;
  to: number;
  suffix?: string;
  format?: (v: number) => string;
}

export interface Athlete {
  id: string;
  index: string;
  name: string;
  discipline: string;
  objective: string;
  data: string;
  intervention: string;
  adaptation: string;
  metrics: AthleteMetric[];
}

const mmss = (v: number) => {
  const total = Math.round(v);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export const athletes: Athlete[] = [
  {
    id: "maya",
    index: "001",
    name: "Maya",
    discipline: "Distance Runner",
    objective: "Improve 10K performance while reducing injury risk.",
    data: "18 months of pace, cadence and HRV data revealed a recurring pattern: performance dropped in the same week of every training block, right after cadence quietly fell and resting heart rate crept up.",
    intervention: "TempoX reduced peak-week volume by 12%, replaced two junk-pace runs with structured threshold work, and tied the next block's intensity to morning readiness instead of a fixed calendar.",
    adaptation: "Cadence stabilized above 172 spm, HRV trend turned upward inside five weeks, and training consistency rose as sessions matched what her body could actually absorb.",
    metrics: [
      { label: "10K", from: 45 * 60 + 21, to: 41 * 60 + 8, format: mmss },
      { label: "VO2 Max", from: 52, to: 58 },
      { label: "Training consistency", from: 71, to: 94, suffix: "%" },
      { label: "Recovery score", from: 63, to: 82 },
    ],
  },
  {
    id: "julian",
    index: "002",
    name: "Julian",
    discipline: "Cyclist",
    objective: "Raise FTP ahead of a season of climbing-focused races.",
    data: "Power files showed strong short efforts but a threshold that hadn't moved in a year — fatigue was accumulating faster than it was being measured.",
    intervention: "TempoX shifted the block toward longer sub-threshold intervals, added a deliberate recovery week every third block, and flagged sessions where power dropped despite equal effort.",
    adaptation: "Time-in-zone at threshold nearly doubled, cadence became more consistent on climbs, and Julian's own perceived effort at a given power dropped noticeably.",
    metrics: [
      { label: "FTP", from: 268, to: 301, suffix: "w" },
      { label: "VO2 Max", from: 55, to: 60 },
      { label: "Weekly TSS capacity", from: 480, to: 640 },
      { label: "Recovery score", from: 58, to: 79 },
    ],
  },
  {
    id: "aria",
    index: "003",
    name: "Aria",
    discipline: "Swimmer",
    objective: "Lower SWOLF and 400m time without adding pool hours.",
    data: "Stroke data showed rate rising under fatigue while distance-per-stroke fell — Aria was swimming harder, not more efficiently.",
    intervention: "TempoX rebuilt sessions around technique-first sets at low fatigue, then layered pace work on top only once stroke length held steady.",
    adaptation: "SWOLF dropped across every distance tested, and 400m pace improved even though total weekly volume stayed the same.",
    metrics: [
      { label: "400m", from: 6 * 60 + 12, to: 5 * 60 + 42, format: mmss },
      { label: "SWOLF", from: 42, to: 35 },
      { label: "Stroke rate stability", from: 61, to: 88, suffix: "%" },
      { label: "Recovery score", from: 67, to: 85 },
    ],
  },
  {
    id: "noah",
    index: "004",
    name: "Noah",
    discipline: "Triathlete",
    objective: "Balance three disciplines without any one of them stalling.",
    data: "Combined load data showed bike volume was quietly crowding out run quality — total hours looked fine, but run adaptation had flatlined.",
    intervention: "TempoX rebalanced weekly load across swim, bike and run using combined training stress rather than hours, and sequenced hard sessions to avoid stacking fatigue across disciplines.",
    adaptation: "Run pace at threshold improved for the first time in four months, while bike and swim numbers held — the whole system moved forward together.",
    metrics: [
      { label: "Olympic run split", from: 44 * 60 + 10, to: 40 * 60 + 55, format: mmss },
      { label: "Combined load balance", from: 54, to: 86, suffix: "%" },
      { label: "Transition time", from: 92, to: 61, suffix: "s" },
      { label: "Recovery score", from: 60, to: 81 },
    ],
  },
  {
    id: "eli",
    index: "005",
    name: "Eli",
    discipline: "Hybrid Athlete",
    objective: "Build strength and aerobic capacity in the same macrocycle.",
    data: "Bar velocity and pace data, viewed together, showed strength sessions were leaving too little in reserve for the aerobic work scheduled the next day.",
    intervention: "TempoX sequenced heavy strength days 48 hours from key aerobic sessions and used bar-speed loss to auto-regulate load set by set.",
    adaptation: "Both power output and 5K pace improved in the same block — a trade-off Eli had been told wasn't possible.",
    metrics: [
      { label: "Back squat", from: 142, to: 168, suffix: "kg" },
      { label: "5K", from: 22 * 60 + 4, to: 20 * 60 + 12, format: mmss },
      { label: "Bar velocity retention", from: 74, to: 92, suffix: "%" },
      { label: "Recovery score", from: 65, to: 84 },
    ],
  },
];

export interface MethodStage {
  index: string;
  title: string;
  copy: string;
}

export const methodStages: MethodStage[] = [
  { index: "01", title: "Measure", copy: "Understand the athlete. Every session, every signal, without guesswork." },
  { index: "02", title: "Analyze", copy: "Identify patterns the athlete can't see from inside the training." },
  { index: "03", title: "Adapt", copy: "Adjust training before fatigue becomes an injury or a plateau." },
  { index: "04", title: "Recover", copy: "Optimize readiness. Recovery is a trained variable, not an afterthought." },
  { index: "05", title: "Perform", copy: "Turn preparation into performance, on the day it matters." },
];

export interface SpatialNode {
  id: string;
  label: string;
  copy: string;
}

export const spatialNodes: SpatialNode[] = [
  { id: "train", label: "Train", copy: "Structured load, built around your discipline and your calendar." },
  { id: "recover", label: "Recover", copy: "Readiness signals that decide what today's session should be." },
  { id: "analyze", label: "Analyze", copy: "Patterns surfaced from months of sessions, not just the last one." },
  { id: "adapt", label: "Adapt", copy: "A plan that changes when your body does." },
  { id: "perform", label: "Perform", copy: "Preparation, converted into performance on race day." },
];

export const scienceBlocks = [
  { title: "Sport science", copy: "Physiology and biomechanics form the baseline every model is checked against." },
  { title: "Data", copy: "Thousands of data points per session, reduced to what actually predicts performance." },
  { title: "Coaching", copy: "Judgment a model shouldn't replace — TempoX informs it instead." },
  { title: "Adaptation", copy: "Training plans that update in days, not seasons." },
  { title: "Human performance", copy: "The discipline that ties the other four together." },
];

export const onboardingSports = ["Run", "Swim", "Bike", "Triathlon", "Strength", "Other"] as const;
export const onboardingGoals = [
  "Personal best",
  "Competition",
  "Consistency",
  "Endurance",
  "Speed",
  "Strength",
] as const;
export const onboardingLevels = [
  "Just getting started",
  "Training consistently",
  "Competing regularly",
  "Chasing podiums",
] as const;
