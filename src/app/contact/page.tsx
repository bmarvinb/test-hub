"use client";

import { ContactService } from "./api";
import { ContactForm } from "./components/ContactForm";
import useContactHook from "./hooks/useContact";

export default function ContactPage() {
  const contact = useContactHook(ContactService);

  const onSubmit = (email: string, question: string) => {
    console.log("email, question", email, question);
    contact.send({ email, question });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Contact us</h1>

      <ContactForm onSubmit={onSubmit} />
    </div>
  );
}
