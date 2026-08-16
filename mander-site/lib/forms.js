// Form delivery (Web3Forms). One place, because three components submit to it
// — the contact form, the quiz, and the Community Rate request — and they had
// drifted into three copies of the same endpoint and key lookup.

// This key is publishable by design. Web3Forms is a client-side service: the
// key is posted from the browser, so it is in the page's JavaScript and
// visible in any visitor's network tab whether it lives here or in an env
// var. It is bound to the inbox it was registered against, can only deliver
// mail to that inbox, and grants no account access.
//
// It is committed rather than left to .env.local because `.env*.local` is
// gitignored — so no deploy ever received it, and every form on the live site
// failed while working fine locally. That is the bug this fixes. The env var
// still takes precedence when set, so the key can be rotated from the Vercel
// dashboard without touching code.
export const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
  'df8bb09c-b897-4e54-8abb-b7ee7e064348';

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/**
 * POST a submission to Web3Forms and normalise the outcome.
 *
 * Returns { ok: true } or { ok: false, message } — callers render the message
 * and never have to care whether the failure was a non-2xx, a `success: false`
 * body, or the network refusing outright. Previously each of the three forms
 * hand-rolled this and handled the three cases slightly differently.
 */
export async function submitForm(fields) {
  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...fields }),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok && data.success) return { ok: true };
    return {
      ok: false,
      message: data.message || 'Something went wrong. Please try again.',
    };
  } catch {
    return {
      ok: false,
      message:
        'Could not reach the mail service. Check your connection and try again.',
    };
  }
}
