"use client";

import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getCountries, getCountryCallingCode, type Country } from "react-phone-number-input";
import en from "react-phone-number-input/locale/en";
import { EMAIL, WHATSAPP_NUMBER } from "@/data/site";

const divisions = [
  "General inquiry",
  "Manufacturing & Industrial",
  "Trading & Distribution",
  "Construction & Infrastructure",
  "Export & Agribusiness",
  "Minerals & Resources",
  "Technology",
];


type CountryOption = {
  iso: Country;
  name: string;
  dialCode: string;
};

/* The inquiry form. It does not need a server: the inquiry is sent by email or on WhatsApp, written from the same details. */
export default function ContactForm() {
  const params = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [division, setDivision] = useState(() => {
    if (params.get("product")) return "Trading & Distribution";
    if (params.get("interest")) return "Technology";
    const value = params.get("division");
    return value && divisions.includes(value) ? value : "General inquiry";
  });
  const [countryIso, setCountryIso] = useState<Country>("ET");
  const [dialCode, setDialCode] = useState("+251");

  const countryOptions = useMemo<CountryOption[]>(() => {
    return getCountries()
      .map((iso) => ({
        iso,
        name: en[iso] || iso,
        dialCode: `+${getCountryCallingCode(iso)}`,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const [message, setMessage] = useState(() => {
    const interest = params.get("interest");
    if (interest) return `I would like to know more about ${interest}.\n\nCompany:\nNumber of vehicles or users:\nWhat you need:\n`;
    const product = params.get("product");
    if (!product) return "";
    return product.toLowerCase().includes("catalogue")
      ? "Please send me the full EFFIPLUS TBR tire catalogue.\n\nCompany / fleet:\n"
      : `I would like a quote for ${product}.\n\nTire size:\nQuantity:\nVehicle type and road type:\nDelivery location:\n`;
  });

  function onCountryChange(iso: Country) {
    setCountryIso(iso);
    setDialCode(`+${getCountryCallingCode(iso)}`);
  }

  function compose() {
    const form = formRef.current;
    if (!form) return null;
    const data = new FormData(form);
    const localNumber = String(data.get("phone") || "").trim();
    const phone = localNumber ? `${dialCode} ${localNumber}` : "Not provided";
    const countryName = en[countryIso] || countryIso;
    return [
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company") || "Not provided"}`,
      `Email: ${data.get("email")}`,
      `Phone: ${phone}`,
      `Country: ${countryName}`,
      `Interested in: ${division}`,
      "",
      String(data.get("message")),
    ].join("\n");
  }

  function sendEmail() {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;
    const body = compose();
    if (!body) return;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Global Plus inquiry: ${division}`)}&body=${encodeURIComponent(body)}`;
  }

  function sendWhatsApp() {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;
    const body = compose();
    if (!body) return;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Global Plus inquiry: ${division}\n\n${body}`)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="cf" ref={formRef} onSubmit={(e) => { e.preventDefault(); sendEmail(); }} noValidate={false}>
      <div className="cfGrid">
        <label className="cfField">
          <span>Full name</span>
          <input name="name" required placeholder="Your name" autoComplete="name" />
        </label>
        <label className="cfField">
          <span>Company</span>
          <input name="company" placeholder="Company or organization" autoComplete="organization" />
        </label>
        <label className="cfField">
          <span>Email address</span>
          <input name="email" type="email" required placeholder="you@company.com" autoComplete="email" />
        </label>
        <label className="cfField">
          <span>I am interested in</span>
          <select value={division} onChange={(event) => setDivision(event.target.value)}>
            {divisions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="cfField">
          <span>Country</span>
          <select name="country" value={countryIso} onChange={(event) => onCountryChange(event.target.value as Country)} autoComplete="country">
            {countryOptions.map((item) => (
              <option key={item.iso} value={item.iso}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className="cfField">
          <span>Phone number</span>
          <div className="cfPhone">
            <em aria-hidden="true">{dialCode}</em>
            <input name="phone" type="tel" inputMode="tel" placeholder="Phone number" autoComplete="tel-national" />
          </div>
        </label>
      </div>

      <label className="cfField cfWide">
        <span>How can we help?</span>
        <textarea
          name="message"
          required
          rows={7}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Product, project, volume, destination, timeline or other requirements"
        />
      </label>

      <div className="cfActions">
        <button type="button" className="cfBtn" onClick={sendEmail}>
          Send by email
        </button>
        <button type="button" className="cfBtnWa" onClick={sendWhatsApp}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 2.1A9.9 9.9 0 0 0 3.4 16.7L2 22l5.5-1.4A9.9 9.9 0 1 0 12 2.1Zm0 18.1a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.2.8.9-3.1-.2-.3a8.2 8.2 0 1 1 7 3.8Zm4.5-6.1c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.4.2-.4v-.4c0-.1 0-.3-.1-.4s-.5-1.2-.7-1.6-.4-.4-.5-.4h-.4c-.1 0-.4.1-.6.3a2 2 0 0 0-.6 1.5 3.5 3.5 0 0 0 .7 1.9 8 8 0 0 0 3.1 2.9 10.5 10.5 0 0 0 1.9.7 2.4 2.4 0 0 0 1.7-.6 2.8 2.8 0 0 0 .6-1.3c.1-.2 0-.3-.1-.4Z"
            />
          </svg>
          Send on WhatsApp
        </button>
      </div>
      <p className="cfNote">Either button opens the app on your device with your inquiry already written, ready for you to send.</p>
    </form>
  );
}
