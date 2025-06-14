import { motion } from "framer-motion";
import { Transition } from "../ui/transition";
import { TextReveal } from "../ui/typography";
import Link from "next/link";
import { Input, Textarea } from "../ui/input";
import { useState } from "react";

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

export default function emailForm({
  email,
  social_handle,
  about,
}: EmailFormProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:pt-16">
      <EmailFormFields />
      <ContactInfo email={email} social_handle={social_handle} about={about} />
    </div>
  );
}

function EmailFormFields() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <Transition className="w-full">
          <Input
            id="full-name"
            placeholder="Full name"
            className="border-0 border-b rounded-none"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            required
          />
        </Transition>
        <Transition className="w-full">
          <Input
            id="email"
            placeholder="Your email address"
            type="email"
            className="border-0 border-b rounded-none"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </Transition>
      </div>
      <div className="space-y-2">
        <Transition>
          <Input
            id="subject"
            placeholder="Enter the subject"
            className="border-0 border-b rounded-none"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            required
          />
        </Transition>
      </div>
      <div className="space-y-2">
        <Transition>
          <Textarea
            className="min-h-[100px] rounded-none border-0 border-b resize-none"
            id="message"
            placeholder="Enter your message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
          />
        </Transition>
      </div>
      <div>
        <Transition>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover="whileHover"
            initial="initial"
            className="border border-white/30 px-8 py-2 rounded-3xl relative overflow-hidden disabled:opacity-50"
          >
            <TextReveal className="uppercase">
              {isSubmitting ? "Sending..." : "Send"}
            </TextReveal>
          </motion.button>
        </Transition>
        {submitMessage && (
          <Transition>
            <p
              className={`mt-4 text-sm ${
                submitMessage.includes("successfully")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {submitMessage}
            </p>
          </Transition>
        )}
      </div>
    </form>
  );
}

function ContactInfo({ email, social_handle, about }: EmailFormProps) {
  return (
    <div className="md:justify-self-start flex-col">
      <div className="pb-4">
        <Transition>
          <span className="text-gray-500">Get in touch</span>
        </Transition>
        <Transition>
          <motion.div
            whileHover="whileHover"
            initial="initial"
            className="text-2xl md:text-4xl font-bold py-2"
          >
            <TextReveal>{email}</TextReveal>
          </motion.div>
        </Transition>
        <Transition>
          <motion.button
            whileHover="whileHover"
            initial="initial"
            className="pb-1 text-white/70 underlines hover:cursor-pointerx"
          >
            <TextReveal>{about.phoneNumber}</TextReveal>
          </motion.button>
        </Transition>
        <Transition>
          <div className="text-gray-500">{about.address}</div>
        </Transition>
      </div>

      <div className="flex md:gap-8 gap-4 mt-auto md:pb-16">
        {social_handle.map((social, index) => (
          <Transition
            key={social._id}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <Link href={social.url} target="_blank" rel="noopener noreferrer">
              <TextReveal>{social.platform}</TextReveal>
            </Link>
          </Transition>
        ))}
      </div>
    </div>
  );
}
