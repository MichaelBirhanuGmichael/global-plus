"use client";
import {FormEvent,useEffect,useState} from "react";
import {useSearchParams} from "next/navigation";

const divisions=["General inquiry","Manufacturing & Industrial","Trading & Distribution","Construction & Infrastructure","Export & Agribusiness","Minerals & Resources"];

export default function ContactForm(){
 const params=useSearchParams(); const [division,setDivision]=useState("General inquiry");
 useEffect(()=>{const value=params.get("division");if(value&&divisions.includes(value))setDivision(value)},[params]);
 function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();const data=new FormData(e.currentTarget);const subject=`Global Plus inquiry — ${division}`;const body=[`Name: ${data.get("name")}`,`Company: ${data.get("company")||"Not provided"}`,`Email: ${data.get("email")}`,`Phone: ${data.get("phone")||"Not provided"}`,`Country: ${data.get("country")||"Not provided"}`,`Division: ${division}`,"",String(data.get("message"))].join("\n");window.location.href=`mailto:Info.globalplus1214@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
 return <form className="inquiryForm" onSubmit={submit}><div className="formGrid"><label>Full name<input name="name" required placeholder="Your name"/></label><label>Company<input name="company" placeholder="Company or organization"/></label><label>Email address<input name="email" type="email" required placeholder="you@company.com"/></label><label>Phone number<input name="phone" type="tel" placeholder="Country code + number"/></label><label>Country<input name="country" placeholder="Your country"/></label><label>Interested division<select value={division} onChange={e=>setDivision(e.target.value)}>{divisions.map(d=><option key={d}>{d}</option>)}</select></label></div><label>Tell us about the opportunity<textarea name="message" required rows={6} placeholder="Product, project, volume, destination, timeline or other requirements"/></label><button type="submit">Prepare email inquiry <span>↗</span></button><p>Your email application will open with the inquiry prepared for Global Plus.</p></form>
}
