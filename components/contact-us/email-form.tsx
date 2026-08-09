"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { FaGithub, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FadeIn } from "../ui/transition";
import { Input, Textarea } from "../ui/input";
import { cn } from "@/utils/cn";

interface SocialHandle {
  _id: string;
  url: string;
  platform: string;
}

interface EmailFormProps {
  email: string;
  social_handle: SocialHandle[];
  about: { phoneNumber: string; address: string };
}

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80 placeholder:text-gray-600 transition-colors focus:border-white/30 focus:outline-none focus-visible:border-white/40";

const labelClass = "mb-2 block text-sm font-medium text-white/80";

export default function EmailForm({
  email,
  social_handle,
  about,
}: EmailFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage(
          "Message sent successfully! I'll get back to you soon."
        );
        setFormData({ fullName: "", email: "", subject: "", message: "" });
      } else {
        setSubmitMessage(
          data.message || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialIcon = (platform: string) => {
    const name = platform.toLowerCase();
    if (name.includes("linkedin")) return <FaLinkedin size={18} />;
    if (name.includes("github")) return <FaGithub size={18} />;
    return null;
  };

  return (
    <FadeIn>
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-gray-500 md:text-sm">
        <a
          href={`mailto:${email}`}
          className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 transition-colors hover:border-white/25 hover:text-white/70"
        >
          <MdEmail size={14} className="shrink-0" />
          <span className="truncate">{email}</span>
        </a>
        <a
          href={`tel:${about.phoneNumber.replace(/\s/g, "")}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 transition-colors hover:border-white/25 hover:text-white/70"
        >
          <FaPhoneAlt size={12} className="shrink-0" />
          {about.phoneNumber}
        </a>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
          <MdLocationOn size={14} className="shrink-0" />
          {about.address}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="full-name" className={labelClass}>
              Full name
            </label>
            <Input
              id="full-name"
              placeholder="Your name"
              className={fieldClass}
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <Input
              id="email"
              placeholder="you@example.com"
              type="email"
              className={fieldClass}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className={labelClass}>
            Subject
          </label>
          <Input
            id="subject"
            placeholder="What is this about?"
            className={fieldClass}
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            Message
          </label>
          <Textarea
            id="message"
            placeholder="Tell me a bit about your project or idea..."
            className={cn(fieldClass, "min-h-[140px] resize-none")}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full rounded-xl px-6 py-3.5 text-sm font-medium text-white transition-opacity disabled:opacity-50",
            "bg-gradient-to-r from-[#668eab] to-[#003862]",
            "border border-white/10 hover:opacity-90"
          )}
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>

        {submitMessage && (
          <p
            className={cn(
              "text-center text-sm",
              submitMessage.includes("successfully")
                ? "text-green-400"
                : "text-red-400"
            )}
          >
            {submitMessage}
          </p>
        )}
      </form>

      <div className="mt-10 flex items-center justify-center gap-6 pt-8">
        {social_handle.map((social) => (
          <Link
            key={social._id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.platform}
            className="text-gray-500 transition-colors hover:text-white/80"
          >
            {socialIcon(social.platform) ?? (
              <span className="text-sm">{social.platform}</span>
            )}
          </Link>
        ))}
      </div>
    </FadeIn>
  );
}
