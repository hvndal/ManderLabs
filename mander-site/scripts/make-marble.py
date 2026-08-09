"""
Generates public/videos/marble.mp4 — the field seen through every apertured
character on the site (service indices, the terms, the Community Rate figure,
the footer wordmark).

Design notes, because the first version of this got it wrong:

1. ONE WIDE FIELD, NOT A SQUARE. The original was 480x480 and every aperture
   showed the whole frame scaled into its own box, so all eleven apertures
   displayed the identical image at the identical moment. Rendering a wide
   field instead lets each aperture window into a different region of it (see
   the `offset` prop on AperturedType), which is what makes them read as
   openings onto one continuous thing rather than eleven separate loops.

2. LOW CONTRAST. The original ran the full range from near-black to
   near-white. Cropped inside a numeral that reads as a churning fireball,
   and the extremes were also what made letterforms vanish against the
   stencil. The output here is confined to a mid band of the brand palette:
   no value approaches paper or ink, so the characters hold their shape at
   every frame and the tone-correction filters on either ground have
   something to work with.

3. BROAD FEATURES, SLOW DRIFT. Large base cells and a gentle warp, so a
   200px-wide numeral contains roughly one soft form moving slowly rather
   than a dozen small ones boiling. The loop is long and the movement per
   frame is small.

The noise is periodic value noise: lattice values wrap on all three axes, so
the field tiles seamlessly in time (no crossfade) and horizontally. Domain
warping — sampling the field at coordinates displaced by another sample of
itself — is what gives the folded, poured look instead of clouds.

Deterministic given the seed. Regenerate with:

    python scripts/make-marble.py public/videos/marble.mp4
"""
import subprocess
import sys
import numpy as np

W, H = 1280, 320          # 4:1 — wide enough to window into
FPS, SECONDS = 20, 8      # 160 frames; long loop = slow apparent motion
SEED = 7
CHUNK = 16               # frames per pass; keeps peak memory ~150MB
BASE_CY, BASE_CX = 2, 8  # ~160px forms at 1280 wide - one per numeral
BASE_PT = 2              # lattice cells along time

# Mid-band palette. Deliberately nowhere near paper (#f4f2ec) or ink
# (#1c1512) — see note 2 above.
LOW = np.array([0xE8, 0xCF, 0xC6], dtype=np.float64)   # pale rose
HIGH = np.array([0x8C, 0x3E, 0x30], dtype=np.float64)  # deep terracotta


def smoothstep(t):
    return t * t * (3.0 - 2.0 * t)


def value_noise_3d(t_vals, cells, period_t, lattice):
    """Periodic value noise sampled at the given time values. Lattice values
    wrap on every axis, which is what makes the field tile seamlessly in time
    (no crossfade) and horizontally."""
    cy, cx = cells
    yy = np.linspace(0, cy, H, endpoint=False)
    xx = np.linspace(0, cx, W, endpoint=False)

    t0 = np.floor(t_vals).astype(int); ft = smoothstep(t_vals - t0)
    y0 = np.floor(yy).astype(int); fy = smoothstep(yy - y0)
    x0 = np.floor(xx).astype(int); fx = smoothstep(xx - x0)

    t1, y1, x1 = (t0 + 1) % period_t, (y0 + 1) % cy, (x0 + 1) % cx
    t0 %= period_t; y0 %= cy; x0 %= cx

    def corner(ti, yi, xi):
        return lattice[np.ix_(ti, yi, xi)]

    ftb = ft[:, None, None].astype(np.float32)
    fyb = fy[None, :, None].astype(np.float32)
    fxb = fx[None, None, :].astype(np.float32)

    c00 = corner(t0, y0, x0) * (1 - fxb) + corner(t0, y0, x1) * fxb
    c01 = corner(t0, y1, x0) * (1 - fxb) + corner(t0, y1, x1) * fxb
    c10 = corner(t1, y0, x0) * (1 - fxb) + corner(t1, y0, x1) * fxb
    c11 = corner(t1, y1, x0) * (1 - fxb) + corner(t1, y1, x1) * fxb

    c0 = c00 * (1 - fyb) + c01 * fyb
    c1 = c10 * (1 - fyb) + c11 * fyb
    return c0 * (1 - ftb) + c1 * ftb


def make_lattices(rng, octaves=4):
    """Pre-draw every octave's lattice once so chunks stay consistent."""
    stacks = []
    for _ in range(3):
        oct_list, cy, cx, pt = [], BASE_CY, BASE_CX, BASE_PT
        for _o in range(octaves):
            oct_list.append((
                (cy, cx), pt,
                rng.random((pt, cy, cx)).astype(np.float32),
            ))
            cy, cx, pt = cy * 2, cx * 2, pt * 2
        stacks.append(oct_list)
    return stacks


def fbm_chunk(t_vals, oct_list):
    total = np.zeros((len(t_vals), H, W), dtype=np.float32)
    amp, norm = 1.0, 0.0
    for cells, pt, lattice in oct_list:
        total += amp * value_noise_3d(t_vals, cells, pt, lattice)
        norm += amp
        amp *= 0.5
    return total / norm


def field_chunk(t_vals, stacks):
    """Domain warp: sample the field at coordinates displaced by another
    sample of itself. Kept gentle — a large warp is what produced the churn
    in the first version."""
    a = fbm_chunk(t_vals, stacks[0])
    b = fbm_chunk(t_vals, stacks[1])
    c = fbm_chunk(t_vals, stacks[2])
    return c + 0.72 * (a - 0.5) + 0.46 * (b - 0.5)


def main(out_path):
    rng = np.random.default_rng(SEED)
    stacks = make_lattices(rng)
    T = FPS * SECONDS
    t_all = np.linspace(0, BASE_PT, T, endpoint=False).astype(np.float32)

    # Pass one: bounds, from a coarse sample. Memory is the reason this is
    # chunked at all - a full float array at this size is half a gigabyte.
    lo, hi = np.inf, -np.inf
    for i in range(0, T, CHUNK):
        v = field_chunk(t_all[i:i + CHUNK], stacks)
        lo = min(lo, float(v.min())); hi = max(hi, float(v.max()))

    proc = subprocess.Popen([
        'ffmpeg', '-v', 'error', '-y',
        '-f', 'rawvideo', '-pix_fmt', 'rgb24',
        '-s', f'{W}x{H}', '-r', str(FPS), '-i', 'pipe:0',
        '-an',
        '-c:v', 'libx264', '-profile:v', 'main', '-pix_fmt', 'yuv420p',
        '-crf', '26', '-preset', 'slow',
        '-movflags', '+faststart',
        out_path,
    ], stdin=subprocess.PIPE)

    span = (hi - lo) or 1.0
    for i in range(0, T, CHUNK):
        v = (field_chunk(t_all[i:i + CHUNK], stacks) - lo) / span
        v = np.clip(v, 0.0, 1.0)
        # Ease toward the middle, then compress into a mid band: nothing
        # approaches paper or ink, so letterforms hold at every frame.
        v = smoothstep(v)
        v = 0.10 + 0.80 * v
        frames = (LOW[None, None, None, :]
                  + (HIGH - LOW)[None, None, None, :] * v[..., None])
        proc.stdin.write(np.clip(frames, 0, 255).astype(np.uint8).tobytes())

    proc.stdin.close()
    if proc.wait() != 0:
        sys.exit('ffmpeg failed')
    print('wrote', out_path)


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else 'public/videos/marble.mp4')
