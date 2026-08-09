"""
Generates public/guilloche-*.svg — the engraved rosette used as the site's
graphic register below the masthead.

Why engraving and not an icon set: the lower half of the page had gone
fully typographic, which was right, but it left nothing for the eye to
catch between text blocks — it read as a newspaper. Icons would only
re-import the generic agency vocabulary that was deliberately cut. Guilloche
line-work is the opposite register: it reads as printed security matter
(banknotes, share certificates, passport pages, wine capsules), it is
obviously drawn rather than picked from a library, and on a page about
fixed prices and guarantees it carries the right semantics — something
issued, not posted.

The curve is a hypotrochoid: a point at distance d from the centre of a
circle of radius r rolling inside a circle of radius R.

    x(t) = (R-r)·cos(t) + d·cos(((R-r)/r)·t)
    y(t) = (R-r)·sin(t) - d·sin(((R-r)/r)·t)

The figure closes after r/gcd(R,r) turns and has R/gcd(R,r) lobes, so the
parameters are chosen for a low turn count (few overlapping passes, open
petals) and a high lobe count (fine engraving). An early attempt used large
r with many turns; it closed into an illegible scribble ball. Three figures
at descending scale and ascending stroke weight give the centre more
density than the rim, the way a real engraved plate is cut.

Fully deterministic — no randomness — so output is reproducible and diffs
cleanly. Regenerate with:

    python scripts/make-guilloche.py public
"""
from math import cos, sin, pi, gcd
import pathlib
import sys

TAU = 2 * pi

# (R, r, d, phase, stroke-width). Verified visually as a contact sheet
# before being committed; see the note above on why the turn count matters.
RINGS = [
    (100, 24, 40, 0.0,      0.40),   # 25 lobes,  6 turns — outer, finest
    (56,  12, 20, pi / 6,   0.50),   # 14 lobes,  3 turns — middle
    (24,   5,  9, pi / 5,   0.60),   # 24 lobes,  5 turns — inner, densest
]

# Plain concentric rules give the rosette an armature to sit against.
FRAME = [(121, 0.60, 0.50), (117, 0.35, 0.30)]

PER_TURN = 150  # polyline resolution; below ~120 the lobes visibly facet


def hypotrochoid(R, r, d, phase=0.0, per_turn=PER_TURN):
    turns = r // gcd(R, r)
    steps = turns * per_turn
    k = (R - r) / r
    pts = []
    for i in range(steps + 1):
        t = (i / steps) * TAU * turns + phase
        x = (R - r) * cos(t) + d * cos(k * t)
        y = (R - r) * sin(t) - d * sin(k * t)
        pts.append(f"{x:.1f},{y:.1f}")
    return "M" + "L".join(pts)


def build(stroke):
    parts = [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-124 -124 248 248" '
        'fill="none" aria-hidden="true">',
        f'<g stroke="{stroke}" stroke-linejoin="round" stroke-linecap="round">',
    ]
    for rad, w, o in FRAME:
        parts.append(f'<circle r="{rad}" stroke-width="{w}" opacity="{o}"/>')
    for R, r, d, phase, w in RINGS:
        parts.append(
            f'<path d="{hypotrochoid(R, r, d, phase)}" '
            f'stroke-width="{w}" opacity="0.8"/>'
        )
    parts.append("</g></svg>")
    return "".join(parts)


if __name__ == "__main__":
    out = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "public")
    out.mkdir(parents=True, exist_ok=True)
    # Ink for the paper sections, the logo's pale rose for the dark footer.
    for name, stroke in (("guilloche-ink.svg", "#1c1512"),
                         ("guilloche-rose.svg", "#e3b2a8")):
        p = out / name
        p.write_text(build(stroke), encoding="utf-8")
        print(f"{name}  {p.stat().st_size / 1024:.1f} KB")
