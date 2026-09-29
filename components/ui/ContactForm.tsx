"use client";

import { useState, FormEvent } from "react";

const GRADES = [
  "Group I — SN 70 / 150 / 500 / BS 150",
  "Group II — N 70 / 150 / 500 / 600",
  "Group III — 4 cSt / 6 cSt / 8 cSt",
  "Group IV — PAO 4 / 6 / 8 / 40",
  "Group V — Esters / PAG / Pale Oils / White Oils",
  "Not sure — please advise",
];

export default function ContactForm() {
  const [fields, setFields] = useState({
    name: "",
    company: "",
    email: "",
    grade: "",
    volume: "",
    port: "",
    message: "",
  });

  function set(key: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Base Oil Enquiry — ${fields.grade || "General"} — ${fields.company || fields.name}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${fields.name}`,
        `Company: ${fields.company}`,
        `Email: ${fields.email}`,
        `Grade / Product: ${fields.grade}`,
        `Volume (MT): ${fields.volume}`,
        `Load / Discharge Port: ${fields.port}`,
        "",
        `Requirements:`,
        fields.message,
      ].join("\n")
    );
    window.location.href = `mailto:trading@viscosityglobal.com?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>

      {/* Row 1: Name + Company */}
      <div className="contact-form__row">
        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="cf-name">FULL NAME</label>
          <input
            id="cf-name"
            className="contact-form__input"
            type="text"
            placeholder="Jane Smith"
            value={fields.name}
            onChange={set("name")}
            required
          />
        </div>
        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="cf-company">COMPANY</label>
          <input
            id="cf-company"
            className="contact-form__input"
            type="text"
            placeholder="Acme Lubricants Ltd."
            value={fields.company}
            onChange={set("company")}
          />
        </div>
      </div>

      {/* Row 2: Email + Grade */}
      <div className="contact-form__row">
        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="cf-email">EMAIL ADDRESS</label>
          <input
            id="cf-email"
            className="contact-form__input"
            type="email"
            placeholder="jane@acmelubes.com"
            value={fields.email}
            onChange={set("email")}
            required
          />
        </div>
        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="cf-grade">GRADE / PRODUCT</label>
          <select
            id="cf-grade"
            className="contact-form__select"
            value={fields.grade}
            onChange={set("grade")}
          >
            <option value="">Select a grade…</option>
            {GRADES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3: Volume + Port */}
      <div className="contact-form__row">
        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="cf-volume">VOLUME (MT)</label>
          <input
            id="cf-volume"
            className="contact-form__input"
            type="text"
            placeholder="e.g. 500 MT"
            value={fields.volume}
            onChange={set("volume")}
          />
        </div>
        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="cf-port">LOAD / DISCHARGE PORT</label>
          <input
            id="cf-port"
            className="contact-form__input"
            type="text"
            placeholder="e.g. Dubai / Rotterdam"
            value={fields.port}
            onChange={set("port")}
          />
        </div>
      </div>

      {/* Full-width: Message */}
      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="cf-message">REQUIREMENTS & NOTES</label>
        <textarea
          id="cf-message"
          className="contact-form__textarea"
          placeholder="Spec requirements, delivery window, preferred incoterms, COA needs…"
          value={fields.message}
          onChange={set("message")}
        />
      </div>

      {/* Footer: note + submit */}
      <div className="contact-form__footer">
        <p className="contact-form__note">
          Submitting opens your email client with the form pre-filled.
          No email app? Write to{" "}
          <a href="mailto:trading@viscosityglobal.com">trading@viscosityglobal.com</a>.
          We reply within 24 hours.
        </p>
        <button type="submit" className="contact-form__submit">
          <span>SEND ENQUIRY</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </form>
  );
}
