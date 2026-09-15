import { NextResponse } from "next/server";
import { site } from "@/lib/data";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 80;
const MAX_EMAIL = 120;
const MAX_MESSAGE = 4000;

type ContactBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
};

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (asTrimmedString(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const name = asTrimmedString(body.name);
  const email = asTrimmedString(body.email);
  const message = asTrimmedString(body.message);

  if (name.length < 2 || name.length > MAX_NAME) {
    return NextResponse.json(
      { ok: false, error: "Please enter your name." },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(email) || email.length > MAX_EMAIL) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (message.length < 10 || message.length > MAX_MESSAGE) {
    return NextResponse.json(
      { ok: false, error: "Please write a short message (at least 10 characters)." },
      { status: 400 },
    );
  }

  const origin =
    request.headers.get("origin") ||
    request.headers.get("referer") ||
    "http://localhost:3000";

  const payload = {
    name,
    email,
    message,
    _subject: `Portfolio message from ${name}`,
    _template: "table",
    _replyto: email,
    _captcha: "false",
  };

  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(site.email)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: origin,
          Referer: origin.endsWith("/") ? origin : `${origin}/`,
        },
        body: JSON.stringify(payload),
      },
    );

    const result = (await response.json().catch(() => null)) as
      | { success?: string | boolean; message?: string }
      | null;

    const resultMessage = result?.message ?? "";
    const needsActivation = /activ/i.test(resultMessage);
    const succeeded =
      response.ok && (result?.success === true || result?.success === "true");

    if (needsActivation) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Check anaomnia47@gmail.com for an email from FormSubmit, click “Activate Form”, then send again. This is a one-time step.",
        },
        { status: 409 },
      );
    }

    if (!succeeded) {
      return NextResponse.json(
        { ok: false, error: "Could not send your message. Please email me directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please email me directly." },
      { status: 502 },
    );
  }
}
