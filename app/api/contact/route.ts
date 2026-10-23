import { NextResponse } from 'next/server';

// Forwards the contact form to Formspree so neither the inbox address nor the
// form endpoint is exposed in the page. Set FORMSPREE_FORM_ID in Vercel.
const limits = { name: 100, company: 120, message: 5000 } as const;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }

  // Honeypot: real users never see this field. Pretend success so bots move on.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const field = (key: keyof typeof limits) =>
    typeof body[key] === 'string' ? (body[key] as string).trim() : '';
  const name = field('name');
  const company = field('company');
  const message = field('message');

  if (!name || !message || (Object.keys(limits) as (keyof typeof limits)[]).some((k) => field(k).length > limits[k])) {
    return NextResponse.json({ error: 'invalid_fields' }, { status: 400 });
  }

  const formId = process.env.FORMSPREE_FORM_ID;
  if (!formId) {
    console.error('FORMSPREE_FORM_ID is not set');
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  const response = await fetch(`https://formspree.io/f/${formId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      name,
      company,
      message,
      _subject: `Portfolio contact: ${name}${company ? ` (${company})` : ''}`,
    }),
  });

  if (!response.ok) {
    console.error('Formspree error', response.status, await response.text());
    return NextResponse.json({ error: 'upstream_error' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
