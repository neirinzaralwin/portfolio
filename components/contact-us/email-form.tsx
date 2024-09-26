import { ContactProps } from "./contact-us";
import { motion } from "framer-motion";
import { Transition } from "../ui/transition";
import { TextReveal } from "../ui/typography";
import Link from "next/link";
import { Input, Textarea } from "../ui/input";

export default function emailForm({
  email,
  social_handle,
  about,
}: ContactProps) {
  return (
    <div className="grid md:grid-cols-2 gap-10 md:pt-16">
      <div className="space-y-4">
        <div className="flex gap-4">
          <Transition className="w-full">
            <Input
              id="full-name"
              placeholder="Full name"
              className="border-0 border-b rounded-none"
            />
          </Transition>
          <Transition className="w-full">
            <Input
              id="email"
              placeholder="Email"
              type="email"
              className="border-0 border-b rounded-none"
            />
          </Transition>
        </div>
        <div className="space-y-2">
          <Transition>
            <Input
              id="subject"
              placeholder="Enter the subject"
              className="border-0 border-b rounded-none"
            />
          </Transition>
        </div>
        <div className="space-y-2">
          <Transition>
            <Textarea
              className="min-h-[100px] rounded-none border-0 border-b resize-none"
              id="message"
              placeholder="Enter your message"
            />
          </Transition>
        </div>
        <div>
          <Transition>
            <motion.button
              whileHover="whileHover"
              initial="initial"
              className="border border-white/30 px-8 py-2 rounded-3xl relative overflow-hidden"
            >
              <TextReveal className="uppercase">Send</TextReveal>
            </motion.button>
          </Transition>
        </div>
      </div>
      <div className="md:justify-self-end flex flex-col">
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
              <Link href={social.url}>
                <TextReveal>{social.platform}</TextReveal>
              </Link>
            </Transition>
          ))}
        </div>
      </div>
    </div>
  );
}
