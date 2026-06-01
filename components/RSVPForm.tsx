"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import { fadeUp, stagger } from "@/components/motion";

// TypeScript types for form data
interface RSVPFormData {
  name: string;
  phone: string;
  email: string;
  guests: number;
  attendance: string;
  message: string;
}

interface FormStatus {
  loading: boolean;
  success: boolean;
  error: string | null;
}

interface GoogleScriptResponse {
  success: boolean;
  message?: string;
}

export default function RSVPForm() {
  const [status, setStatus] = useState<FormStatus>({
    loading: false,
    success: false,
    error: null,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Reset previous messages
    setStatus({ loading: true, success: false, error: null });

    try {
      // Get form data
      const formElement = event.currentTarget;
      const formData = new FormData(formElement);

      const data: RSVPFormData = {
        name: formData.get("name") as string,
        phone: formData.get("phone") as string,
        email: (formData.get("email") as string | null) ?? "",
        guests: parseInt(formData.get("guests") as string, 10),
        attendance: formData.get("attendance") as string,
        message: formData.get("message") as string,
      };

      // Validate required fields
      if (!data.name || !data.phone || !data.attendance) {
        throw new Error("Please fill in all required fields");
      }

      // Get Google Apps Script URL from environment variable
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      if (!scriptUrl) {
        throw new Error("Google Apps Script URL is not configured");
      }

      // Submit to Google Apps Script
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          ...data,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit RSVP. Please try again.");
      }

      const result = (await response.json()) as GoogleScriptResponse;
      if (!result.success) {
        throw new Error(
          result.message || "Failed to submit RSVP. Please try again.",
        );
      }

      // Success
      setStatus({ loading: false, success: true, error: null });

      // Reset form
      formElement.reset();

      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus({ loading: false, success: false, error: null });
      }, 5000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setStatus({ loading: false, success: false, error: errorMessage });
    }
  };

  return (
    <motion.form
      className="glass mx-auto grid max-w-3xl gap-4 rounded-3xl p-5 sm:grid-cols-2 sm:p-8"
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      onSubmit={handleSubmit}
    >
      {[
        ["Name", "text", "name"],
        ["Phone Number", "tel", "phone"],
        ["Number of Guests", "number", "guests"],
      ].map(([label, type, name]) => (
        <motion.label
          key={label}
          variants={fadeUp}
          className="text-sm font-medium text-moss"
        >
          {label}
          <input
            className="focus-ring mt-2 w-full rounded-2xl border border-sage/25 bg-white/80 px-4 py-3 text-ink disabled:opacity-50"
            type={type}
            name={name}
            min={type === "number" ? 1 : undefined}
            required
            disabled={status.loading}
          />
        </motion.label>
      ))}
      <motion.label
        variants={fadeUp}
        className="text-sm font-medium text-moss"
      >
        Attendance Status
        <select
          className="focus-ring mt-2 w-full rounded-2xl border border-sage/25 bg-white/80 px-4 py-3 text-ink disabled:opacity-50"
          name="attendance"
          required
          defaultValue=""
          disabled={status.loading}
        >
          <option value="" disabled>
            Select response
          </option>
          <option>Joyfully attending</option>
          <option>Unable to attend</option>
          <option>Will confirm soon</option>
        </select>
      </motion.label>
      <motion.label
        variants={fadeUp}
        className="text-sm font-medium text-moss sm:col-span-2"
      >
        Message
        <textarea
          className="focus-ring mt-2 min-h-32 w-full resize-y rounded-2xl border border-sage/25 bg-white/80 px-4 py-3 text-ink disabled:opacity-50"
          name="message"
          disabled={status.loading}
        />
      </motion.label>

      {/* Status Messages */}
      {status.error && (
        <motion.div
          variants={fadeUp}
          className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800 sm:col-span-2"
          role="alert"
        >
          {status.error}
        </motion.div>
      )}
      {status.success && (
        <motion.div
          variants={fadeUp}
          className="rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-800 sm:col-span-2"
          role="alert"
        >
          Thank you! Your RSVP has been received.
        </motion.div>
      )}

      <motion.div variants={fadeUp} className="sm:col-span-2">
        <button
          type="submit"
          disabled={status.loading}
          className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-moss px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-luxury transition hover:bg-ink disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          {status.loading ? "Sending..." : "Send RSVP"}
        </button>
      </motion.div>
    </motion.form>
  );
}
