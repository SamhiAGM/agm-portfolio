"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validation";
import { api } from "@/services/api";
import { profile } from "@/constants/portfolio";
import { Reveal } from "@/components/ui/reveal";
export function Contact() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });
  async function submit(data: ContactInput) {
    setStatus("idle");
    try {
      await api.contact(data);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }
  return (
    <section id="contact" className="section contact-section">
      <Reveal className="contact-copy">
        <div className="eyebrow">
          <span>08</span>
          <i /> LET’S BUILD SOMETHING
        </div>
        <h2>
          Have a problem
          <br />
          worth <span>solving?</span>
        </h2>
        <p>
          I’m open to software engineering internships, collaborations and
          opportunities to build meaningful technology products.
        </p>
        <div className="contact-details">
          <a href={`mailto:${profile.email}`}>
            <Mail size={19} />
            <div>
              <span>DROP ME A LINE</span>
              <strong>{profile.email}</strong>
            </div>
            <ArrowUpRight size={17} />
          </a>
          <a href="tel:+94753999958">
            <Phone size={19} />
            <div>
              <span>LET’S TALK</span>
              <strong>{profile.phone}</strong>
            </div>
          </a>
          <div>
            <MapPin size={19} />
            <div>
              <span>BASED IN</span>
              <strong>{profile.location}</strong>
            </div>
          </div>
        </div>
        <div className="availability">
          <span />
          OPEN TO OPPORTUNITIES
        </div>
      </Reveal>
      <Reveal className="contact-form-wrap">
        <form onSubmit={handleSubmit(submit)} noValidate>
          <div className="form-intro">
            <span className="mono">START A CONVERSATION</span>
            <span className="mono">/ 01</span>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                autoComplete="name"
                placeholder="John Doe"
                maxLength={100}
                {...register("name")}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <span id="name-error" className="field-error">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="john@company.com"
                maxLength={254}
                {...register("email")}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span id="email-error" className="field-error">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="subject">What’s on your mind?</label>
            <input
              id="subject"
              placeholder="An opportunity, an idea, a hello…"
              maxLength={150}
              {...register("subject")}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
            />
            {errors.subject && (
              <span id="subject-error" className="field-error">
                {errors.subject.message}
              </span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="message">Your message</label>
            <textarea
              id="message"
              rows={5}
              placeholder="Tell me a little about what you’re thinking."
              maxLength={5000}
              {...register("message")}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <span id="message-error" className="field-error">
                {errors.message.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="button button-primary send-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="spin" size={17} /> Sending…
              </>
            ) : (
              <>
                Send message <ArrowUpRight size={18} />
              </>
            )}
          </button>
          <p className="form-privacy">
            Your details are used only to respond to your message.
          </p>
          <div aria-live="polite">
            {status === "success" && (
              <div className="form-status success">
                <CheckCircle2 size={20} />
                <p>
                  Message sent successfully.
                  <br />
                  I’ll get back to you soon.
                </p>
              </div>
            )}
            {status === "error" && (
              <div className="form-status error">
                <p>
                  Your message couldn’t be sent. Please try again, or{" "}
                  <a href={`mailto:${profile.email}`}>email me directly</a>.
                </p>
              </div>
            )}
          </div>
        </form>
      </Reveal>
    </section>
  );
}
