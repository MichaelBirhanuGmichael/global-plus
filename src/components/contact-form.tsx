"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getCountries, getCountryCallingCode, type Country } from "react-phone-number-input";
import en from "react-phone-number-input/locale/en";

const divisions = [
  "General inquiry",
  "Manufacturing & Industrial",
  "Trading & Distribution",
  "Construction & Infrastructure",
  "Export & Agribusiness",
  "Minerals & Resources",
];

type CountryOption = {
  iso: Country;
  name: string;
  dialCode: string;
};

export default function ContactForm() {
  const params = useSearchParams();
  const [division, setDivision] = useState("General inquiry");
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

  useEffect(() => {
    const value = params.get("division");
    if (value && divisions.includes(value)) setDivision(value);
  }, [params]);

  function onCountryChange(iso: Country) {
    setCountryIso(iso);
    setDialCode(`+${getCountryCallingCode(iso)}`);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const localNumber = String(data.get("phone") || "").trim();
    const phone = localNumber ? `${dialCode} ${localNumber}` : "Not provided";
    const countryName = en[countryIso] || countryIso;
    const subject = `Global Plus inquiry — ${division}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company") || "Not provided"}`,
      `Email: ${data.get("email")}`,
      `Phone: ${phone}`,
      `Country: ${countryName}`,
      `Division: ${division}`,
      "",
      String(data.get("message")),
    ].join("\n");
    window.location.href = `mailto:Info.globalplus1214@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="inquiryForm" onSubmit={submit}>
      <div className="formGrid">
        <label>
          Full name
          <input name="name" required placeholder="Your name" autoComplete="name" />
        </label>
        <label>
          Company
          <input name="company" placeholder="Company or organization" autoComplete="organization" />
        </label>
        <label>
          Email address
          <input name="email" type="email" required placeholder="you@company.com" autoComplete="email" />
        </label>
        <label>
          Interested division
          <select value={division} onChange={(event) => setDivision(event.target.value)}>
            {divisions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          Country
          <select
            name="country"
            value={countryIso}
            onChange={(event) => onCountryChange(event.target.value as Country)}
            autoComplete="country"
          >
            {countryOptions.map((item) => (
              <option key={item.iso} value={item.iso}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className="phoneField">
          Phone number
          <div className="phoneFieldRow">
            <span className="phoneCode" aria-hidden="true">
              {dialCode}
            </span>
            <input type="hidden" name="dialCode" value={dialCode} />
            <input
              name="phone"
              type="tel"
              inputMode="tel"
              placeholder="Phone number"
              autoComplete="tel-national"
            />
          </div>
        </label>
      </div>
      <label>
        Tell us about the opportunity
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Product, project, volume, destination, timeline or other requirements"
        />
      </label>
      <button type="submit">
        Prepare email inquiry <span>↗</span>
      </button>
      <p>Your email app will open with your inquiry ready to send.</p>
    </form>
  );
}
