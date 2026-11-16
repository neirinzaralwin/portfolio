"use client";

import { FormEvent, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { MainButton } from "@/components/motion/main-button";
import { Input, Textarea } from "../ui/input";
import { cn } from "@/utils/cn";

const fieldClass = "field";

const labelClass = "block text-sm text-white/50";

export default function EmailForm() {
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

  return (
    <Reveal>
      <form onSubmit={handleSubmit} className="space-y-7">
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
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

        <div className="pt-2">
          <MainButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send message"}
          </MainButton>
        </div>

        {submitMessage && (
          <p
            className={cn(
              "text-sm",
              submitMessage.includes("successfully")
                ? "text-green-400"
                : "text-red-400"
            )}
          >
            {submitMessage}
          </p>
        )}
      </form>

    </Reveal>
  );
}
