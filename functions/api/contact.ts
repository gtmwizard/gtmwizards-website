// Cloudflare Pages Function: POST /api/contact
// Same pattern as hubsell's functions/api/subscribe.ts — the static site
// never holds provider credentials; they live in Pages env vars.
//
// Env vars to set in the Cloudflare Pages dashboard:
//   PLUNK_API_KEY   — secret key for Plunk (or swap the provider below)
//   CONTACT_TO      — inbox that receives submissions, e.g. hello@gtmwizards.com

interface Env {
  PLUNK_API_KEY?: string;
  CONTACT_TO?: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return json({ error: 'Invalid form submission.' }, 400);
  }

  // Honeypot: real users never see this field.
  if (String(data.get('website') || '').trim() !== '') {
    return json({ ok: true }, 200); // silently accept, do nothing
  }

  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const company = String(data.get('company') || '').trim();
  const message = String(data.get('message') || '').trim();

  if (!name || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ error: 'Please fill in name, a valid email, and a message.' }, 400);
  }

  if (!env.PLUNK_API_KEY || !env.CONTACT_TO) {
    // Deploy-time guard: fail loudly in logs, gracefully to the user.
    console.error('contact: missing PLUNK_API_KEY or CONTACT_TO env var');
    return json({ error: 'Form is not configured yet.' }, 503);
  }

  const res = await fetch('https://api.useplunk.com/v1/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.PLUNK_API_KEY}`,
    },
    body: JSON.stringify({
      to: env.CONTACT_TO,
      subject: `gtmwizards.com contact — ${name}${company ? ` (${company})` : ''}`,
      body: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || '—'}`,
        '',
        message,
      ].join('\n'),
      reply: email,
    }),
  });

  if (!res.ok) {
    console.error('contact: provider error', res.status, await res.text());
    return json({ error: 'Could not send right now.' }, 502);
  }

  return json({ ok: true }, 200);
};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
