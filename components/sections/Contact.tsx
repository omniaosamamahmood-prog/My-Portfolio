"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const company = String(data.get("company") || "").trim();

    const nextErrors: typeof fieldErrors = {};
    if (name.length < 2) nextErrors.name = "Please enter your name.";
    if (!EMAIL_PATTERN.test(email)) nextErrors.email = "Please enter a valid email.";
    if (message.length < 10) nextErrors.message = "Please write a little more detail.";

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("idle");
      setError("");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || "Could not send your message.");
      }

      form.reset();
      setFieldErrors({});
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Could not send your message. Please email me directly.",
      );
    }
  };

  return (
    <section id="contact" className="section-pad bg-bg-stone py-14 sm:py-16 lg:py-24">
      <div className="container-wide min-w-0">
        <div className="grid min-w-0 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <SectionReveal>
              <SectionLabel number="06" label="Contact" />
            </SectionReveal>
            <SectionReveal delay={0.08}>
              <h2 className="mt-6 font-display text-[clamp(1.95rem,7vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.035em] sm:mt-8">
                Let&apos;s build something{" "}
                <span className="font-serif italic font-normal text-accent">
                  worth shipping
                </span>
                .
              </h2>
            </SectionReveal>
            <SectionReveal delay={0.12}>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:mt-6 sm:text-base">
                Send a message with the form — it arrives in my inbox. You can also
                email me directly.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.16}>
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
                <a
                  href={`mailto:${site.email}`}
                  className="group flex min-h-11 min-w-0 items-center gap-3 rounded-sm text-base focus-ring sm:text-lg"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-bg-elevated transition group-hover:border-accent group-hover:text-accent">
                    <Mail size={16} aria-hidden />
                  </span>
                  <span className="link-underline min-w-0 break-all">{site.email}</span>
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-bg-elevated px-3.5 py-2 text-sm text-ink-soft transition hover:border-ink hover:text-ink focus-ring"
                  aria-label={copied ? "Email copied" : "Copy email address"}
                >
                  {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:text-[11px]">
                {site.location}
              </p>
            </SectionReveal>
          </div>

          <SectionReveal delay={0.1}>
            {status === "sent" ? (
              <div
                className="flex min-h-[320px] flex-col justify-center border border-line bg-bg-elevated p-5 sm:min-h-[380px] sm:p-7 lg:p-8"
                role="status"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  Message sent
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  Thank you — I&apos;ll reply by email.
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                  Your message is in my inbox. If you need to add anything, write
                  again or email me directly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 inline-flex min-h-11 w-fit items-center text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline focus-ring"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="relative min-w-0 overflow-hidden border border-line bg-bg-elevated p-5 sm:p-7 lg:p-8"
                noValidate
              >
                <p className="mb-6 text-base leading-relaxed text-muted">
                  Fill this in and I&apos;ll receive it at {site.email}.
                </p>

                <div className="space-y-5 sm:space-y-6">
                  <Field
                    label="Name"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    error={fieldErrors.name}
                    disabled={status === "sending"}
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    error={fieldErrors.email}
                    disabled={status === "sending"}
                  />
                  <div className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0" aria-hidden>
                    <label htmlFor="company">Company</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <div className="min-w-0">
                    <label
                      htmlFor="message"
                      className="mb-2 block font-mono text-[13px] uppercase tracking-[0.16em] text-muted sm:text-sm"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      disabled={status === "sending"}
                      aria-invalid={fieldErrors.message ? true : undefined}
                      aria-describedby={fieldErrors.message ? "message-error" : undefined}
                      className="w-full min-w-0 resize-y border-b border-line bg-transparent py-3 text-lg text-ink outline-none transition placeholder:text-muted/50 focus:border-accent disabled:opacity-60"
                      placeholder="Tell me about your project, role, or idea…"
                    />
                    {fieldErrors.message ? (
                      <p id="message-error" className="mt-2 text-sm text-[#9b3b32]" role="alert">
                        {fieldErrors.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:mt-8">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full sm:w-auto"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                    <ArrowUpRight size={16} />
                  </Button>
                  {status === "error" && error ? (
                    <p className="text-sm text-[#9b3b32]" role="alert">
                      {error}{" "}
                      <a
                        href={`mailto:${site.email}`}
                        className="underline underline-offset-2"
                      >
                        {site.email}
                      </a>
                    </p>
                  ) : (
                    <p className="text-base text-muted">
                      No email app needed — the form sends it for you.
                    </p>
                  )}
                </div>
              </form>
            )}
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  placeholder,
  error,
  disabled,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}) {
  const errorId = `${name}-error`;

  return (
    <div className="min-w-0">
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-[13px] uppercase tracking-[0.16em] text-muted sm:text-sm"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="w-full min-w-0 border-b border-line bg-transparent py-3 text-lg text-ink outline-none transition placeholder:text-muted/50 focus:border-accent disabled:opacity-60"
      />
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-[#9b3b32]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
