'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/ui/Section';
import { clinic } from '@/lib/content';

const services = [
  { id: 'consult', title: 'Retina Consultation', desc: 'A comprehensive retinal evaluation.' },
  { id: 'diabetic', title: 'Diabetic Eye Check', desc: 'Screening & monitoring for diabetes.' },
  { id: 'imaging', title: 'Advanced Imaging', desc: 'OCT, fundus & wide-field scans.' },
  { id: 'surgery', title: 'Surgical Opinion', desc: 'Second opinion on retinal surgery.' },
  { id: 'rop', title: 'ROP Screening', desc: 'For premature infants.' },
  { id: 'other', title: 'Something Else', desc: 'Tell us what you need.' },
];

const times = ['10:00', '11:30', '13:00', '15:00', '16:30', '18:00'];

function nextDays(count: number) {
  const out: { key: string; day: string; date: string; month: string }[] = [];
  const d = new Date();
  for (let i = 1; out.length < count; i++) {
    const nd = new Date(d);
    nd.setDate(d.getDate() + i);
    if (nd.getDay() === 0) continue; // clinic closed Sunday
    out.push({
      key: nd.toISOString().slice(0, 10),
      day: nd.toLocaleDateString('en-IN', { weekday: 'short' }),
      date: String(nd.getDate()).padStart(2, '0'),
      month: nd.toLocaleDateString('en-IN', { month: 'short' }),
    });
  }
  return out;
}

const steps = ['Service', 'Date & Time', 'Your Details', 'Confirm'];

export default function Booking() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [data, setData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    notes: '',
  });

  const days = nextDays(6);
  const set = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));

  const canNext =
    (step === 0 && data.service) ||
    (step === 1 && data.date && data.time) ||
    (step === 2 && data.name && data.phone.replace(/\D/g, '').length >= 8) ||
    step === 3;

  const submit = () => setDone(true);

  const selectedService = services.find((s) => s.id === data.service);

  return (
    <section id="book" className="relative overflow-hidden bg-alt py-28 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(122,92,255,0.16),transparent_55%)]" />
      <div className="container-p relative">
        <SectionHeading
          title={
            <>
              A concierge path to
              <br />
              <span className="text-gradient italic">clearer vision.</span>
            </>
          }
          subtitle="Reserve your appointment in a few graceful steps. No forms to dread — just care, made simple."
        />

        <div className="mx-auto mt-14 max-w-2xl">
          <div className="relative overflow-hidden rounded-[2rem] glass-strong p-6 md:p-10">
            <AnimatePresence mode="wait">
              {done ? (
                <Success key="success" data={data} service={selectedService?.title} />
              ) : (
                <motion.div key="form">
                  {/* progress */}
                  <div className="mb-8 flex items-center gap-2">
                    {steps.map((s, i) => (
                      <div key={s} className="flex flex-1 items-center gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs transition ${
                              i <= step ? 'bg-retina-cyan text-medical-navy' : 'bg-fg/10 text-fg/60'
                            }`}
                          >
                            {i < step ? '✓' : i + 1}
                          </span>
                          <span className={`hidden text-xs sm:block ${i <= step ? 'text-fg' : 'text-fg/60'}`}>
                            {s}
                          </span>
                        </div>
                        {i < steps.length - 1 && (
                          <span className={`h-px flex-1 ${i < step ? 'bg-retina-cyan/60' : 'bg-fg/10'}`} />
                        )}
                      </div>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {step === 0 && (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {services.map((s) => (
                            <button
                              key={s.id}
                              onClick={() => set('service', s.id)}
                              data-cursor="hover"
                              className={`rounded-2xl border p-4 text-left transition ${
                                data.service === s.id
                                  ? 'border-retina-cyan bg-retina-cyan/10'
                                  : 'border-fg/10 hover:border-fg/25'
                              }`}
                            >
                              <div className="font-medium text-fg">{s.title}</div>
                              <div className="mt-1 text-xs text-fg/65">{s.desc}</div>
                            </button>
                          ))}
                        </div>
                      )}

                      {step === 1 && (
                        <div>
                          <p className="mb-3 text-sm text-fg/65">Choose a day</p>
                          <div className="flex flex-wrap gap-2">
                            {days.map((d) => (
                              <button
                                key={d.key}
                                onClick={() => set('date', d.key)}
                                data-cursor="hover"
                                className={`flex w-16 flex-col items-center rounded-2xl border py-3 transition ${
                                  data.date === d.key
                                    ? 'border-retina-cyan bg-retina-cyan/10'
                                    : 'border-fg/10 hover:border-fg/25'
                                }`}
                              >
                                <span className="text-[0.65rem] uppercase text-fg/60">{d.day}</span>
                                <span className="font-display text-xl text-fg">{d.date}</span>
                                <span className="text-[0.65rem] text-fg/60">{d.month}</span>
                              </button>
                            ))}
                          </div>
                          <p className="mb-3 mt-6 text-sm text-fg/65">Choose a time</p>
                          <div className="flex flex-wrap gap-2">
                            {times.map((t) => (
                              <button
                                key={t}
                                onClick={() => set('time', t)}
                                data-cursor="hover"
                                className={`rounded-xl border px-4 py-2.5 text-sm transition ${
                                  data.time === t
                                    ? 'border-retina-cyan bg-retina-cyan/10 text-fg'
                                    : 'border-fg/10 text-fg/70 hover:border-fg/25'
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-4">
                          <Field label="Full name">
                            <input
                              value={data.name}
                              onChange={(e) => set('name', e.target.value)}
                              placeholder="Your name"
                              className="input"
                            />
                          </Field>
                          <Field label="Phone number">
                            <input
                              value={data.phone}
                              onChange={(e) => set('phone', e.target.value)}
                              placeholder="+91 …"
                              inputMode="tel"
                              className="input"
                            />
                          </Field>
                          <Field label="Anything we should know? (optional)">
                            <textarea
                              value={data.notes}
                              onChange={(e) => set('notes', e.target.value)}
                              rows={3}
                              placeholder="Symptoms, referrals, questions…"
                              className="input resize-none"
                            />
                          </Field>
                        </div>
                      )}

                      {step === 3 && (
                        <div className="space-y-3">
                          <Summary label="Service" value={selectedService?.title ?? '—'} />
                          <Summary
                            label="When"
                            value={
                              data.date
                                ? `${new Date(data.date).toLocaleDateString('en-IN', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                  })} · ${data.time}`
                                : '—'
                            }
                          />
                          <Summary label="Name" value={data.name || '—'} />
                          <Summary label="Phone" value={data.phone || '—'} />
                          {data.notes && <Summary label="Notes" value={data.notes} />}
                          <p className="pt-2 text-xs text-fg/60">
                            Our team will call to confirm your appointment at {clinic.name}.
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* nav */}
                  <div className="mt-8 flex items-center justify-between">
                    <button
                      onClick={() => setStep((s) => Math.max(0, s - 1))}
                      className={`text-sm text-fg/65 transition hover:text-fg ${step === 0 ? 'pointer-events-none opacity-0' : ''}`}
                    >
                      ← Back
                    </button>
                    {step < 3 ? (
                      <button
                        onClick={() => canNext && setStep((s) => s + 1)}
                        disabled={!canNext}
                        data-cursor="hover"
                        className="btn-primary pt-3.5 disabled:opacity-40"
                      >
                        Continue
                      </button>
                    ) : (
                      <button onClick={submit} data-cursor="hover" className="btn-primary pt-3.5">
                        Confirm Appointment
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgb(var(--fg) / 0.14);
          background: rgb(var(--fg) / 0.03);
          padding: 0.85rem 1rem;
          color: rgb(var(--fg));
          font-size: 0.95rem;
          transition: border-color 0.3s;
        }
        .input:focus {
          outline: none;
          border-color: rgba(56, 225, 255, 0.6);
        }
        .input::placeholder {
          color: rgb(var(--fg) / 0.35);
        }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-wider text-fg/60">{label}</span>
      {children}
    </label>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl bg-fg/[0.03] px-5 py-3.5">
      <span className="text-sm text-fg/65">{label}</span>
      <span className="text-right text-sm text-fg">{value}</span>
    </div>
  );
}

function Success({
  data,
  service,
}: {
  data: { name: string; date: string; time: string };
  service?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-8 text-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
        className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(37,224,164,0.3),transparent 70%)' }}
      >
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-retina-emerald/20">
          <span className="absolute inset-0 animate-pulse-ring rounded-full border border-retina-emerald" />
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#25E0A4" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12l5 5L20 6" />
          </svg>
        </span>
      </motion.div>
      <h3 className="font-display text-3xl font-light text-fg">Request received</h3>
      <p className="mx-auto mt-3 max-w-sm text-fg/60">
        Thank you{data.name ? `, ${data.name.split(' ')[0]}` : ''}. We&apos;ve noted your
        interest in {service ?? 'a consultation'}
        {data.date
          ? ` on ${new Date(data.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })} at ${data.time}`
          : ''}
        . Our team will call shortly to confirm.
      </p>
      <p className="mt-6 text-xs text-fg/60">
        This is a demo confirmation — connect it to your booking system or WhatsApp to go live.
      </p>
    </motion.div>
  );
}
