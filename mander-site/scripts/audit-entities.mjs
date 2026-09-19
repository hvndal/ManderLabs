// Entity / knowledge-graph audit — no server, no network, pure data-integrity
// checks over the site's own source of truth. This is the "is every
// important entity represented, does every claim agree with every other
// claim" check: contradictions between what one file asserts and what
// another does are exactly the "website says X, directory says Y" problem,
// just internal rather than external (see docs/entity-consistency.md for the
// external half of that check).
//
// Run:  node scripts/audit-entities.mjs   (no build or server needed)
import { SERVICES, WORK, TEAM } from '../lib/content.js';
import { PILLARS } from '../lib/pillars.js';
import { REGIONS, allCities } from '../lib/locations.js';
import { SERVICE_AREA } from '../lib/seo.js';
import { NAV_LINKS } from '../lib/content.js';

const problems = [];
const notes = [];

// ── 1. Service coverage ─────────────────────────────────────────────────
// Not a literal-match check: WORK[].services is real, specific marketing
// copy ("Ecommerce", "Direct Reservations", "Full-Stack Build"), not a set of
// SERVICES titles restated. What matters is whether each of the six things
// the site sells has at least one piece of portfolio evidence anywhere near
// it — a service with zero corroborating work is a claim with no proof
// behind it, which is the actual "does every service have evidence" question
// from the brief.
const workText = WORK.map((w) =>
  [w.name, w.body, ...(w.services || []), w.specimen?.services?.join(' ') || '']
    .join(' ')
    .toLowerCase()
).join(' | ');

for (const s of SERVICES) {
  // Match on the title's own significant words rather than the whole phrase
  // — "Local Search" as an exact substring is stricter than useful, since
  // real copy says "local SEO" or "Google Business Profile" instead.
  const words = s.title.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
  const hit = words.some((w) => workText.includes(w));
  if (!hit) problems.push(`SERVICES "${s.title}" has no matching word in any WORK entry — no evidence on the portfolio for a service the site sells`);
}

// ── 2. Pillar reachability ──────────────────────────────────────────────
// Every pillar's href should be a real nav destination. Cheap to assert,
// and it is the guard against a pillar surviving a nav rewrite that quietly
// drops its link — which is precisely how a page becomes unreachable without
// anyone noticing, since nothing 404s.
const navHrefs = new Set(NAV_LINKS.map((l) => l.href));
for (const p of PILLARS) {
  if (!navHrefs.has(p.href)) {
    problems.push(`PILLARS "${p.label}" (${p.href}) is not in NAV_LINKS — reachable only by direct URL`);
  }
}

// ── 3. Location structural sanity ───────────────────────────────────────
// Every region needs at least one city (an empty region is a dead page with
// nothing to list), and every city slug must be globally unique — two
// regions sharing a slug would make one of them unreachable, since routing
// is by slug alone.
const seenSlugs = new Map();
for (const region of REGIONS) {
  if (!region.cities || region.cities.length === 0) {
    problems.push(`Region "${region.slug}" has no cities`);
    continue;
  }
  for (const city of region.cities) {
    if (seenSlugs.has(city.slug)) {
      problems.push(`City slug "${city.slug}" used in both "${seenSlugs.get(city.slug)}" and "${region.slug}" — one is unreachable`);
    }
    seenSlugs.set(city.slug, region.slug);
  }
}
notes.push(`${allCities().length} city pages across ${REGIONS.length} region(s)`);

// ── 4. Team location vs. declared service area ──────────────────────────
// This is the check with real teeth given this project's own history: the
// site has added and removed Massachusetts/Rhode Island claims twice this
// year. If a team member's location ever names a state or province the
// schema's own SERVICE_AREA doesn't list, that is a live, structural version
// of the exact contradiction those manual edits kept introducing by hand.
const areaNames = new Set(SERVICE_AREA.map((a) => a.name));
for (const member of TEAM) {
  if (!member.location) continue; // Connar: no location supplied, not an error — see lib/content.js
  const parts = member.location.split(',').map((p) => p.trim());
  const stateOrProvince = parts[parts.length - 1];
  if (stateOrProvince && !areaNames.has(expandAbbrev(stateOrProvince))) {
    problems.push(`TEAM "${member.name}" location "${member.location}" — "${stateOrProvince}" not found in lib/seo.js SERVICE_AREA`);
  }
}

function expandAbbrev(s) {
  const map = { BC: 'British Columbia', MA: 'Massachusetts', ME: 'Maine' };
  return map[s] || s;
}

// ── report ───────────────────────────────────────────────────────────────
notes.forEach((n) => console.log('NOTE:', n));
console.log(`\nCHECKED: ${SERVICES.length} services, ${PILLARS.length} pillars, ${TEAM.length} team members, ${REGIONS.length} regions`);
console.log(`PROBLEMS: ${problems.length}`);
problems.forEach((p) => console.log(' •', p));
if (problems.length) process.exitCode = 1;
