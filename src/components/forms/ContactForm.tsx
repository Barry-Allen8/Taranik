"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";

interface ApiContactFormData extends ContactFormData {
  website?: string; // Honeypot field
}

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const tErrors = useTranslations("contact.form.errors");
  const tServices = useTranslations("services_menu");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });
  const [emailValidationState, setEmailValidationState] = useState<
    "idle" | "validating" | "valid" | "invalid"
  >("idle");
  const [emailValidationMessage, setEmailValidationMessage] = useState<string | null>(null);

  const translateError = useCallback((code?: string) => {
    if (!code) return undefined;
    try {
      return tErrors(code);
    } catch {
      return t("error");
    }
  }, [t, tErrors]);

  const validateEmailAsync = useCallback(
    async (email: string) => {
      const normalizedEmail = email.trim();
      if (!normalizedEmail) {
        setEmailValidationState("idle");
        setEmailValidationMessage(null);
        return true;
      }

      setEmailValidationState("validating");
      setEmailValidationMessage(t("email_validating"));

      try {
        const response = await fetch("/api/contact/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: normalizedEmail }),
        });

        const payload = (await response.json().catch(() => null)) as
          | { valid?: boolean; code?: string }
          | null;

        if (payload?.valid) {
          clearErrors("email");
          setEmailValidationState("valid");
          setEmailValidationMessage(t("email_valid"));
          return true;
        }

        const errorCode = payload?.code || "email.validation_failed";
        setError("email", { type: "manual", message: errorCode });
        setEmailValidationState("invalid");
        setEmailValidationMessage(translateError(errorCode) || t("error"));
        return false;
      } catch {
        const fallbackCode = "email.validation_failed";
        setError("email", { type: "manual", message: fallbackCode });
        setEmailValidationState("invalid");
        setEmailValidationMessage(translateError(fallbackCode) || t("error"));
        return false;
      }
    },
    [clearErrors, setError, t, translateError]
  );

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage(null);

    try {
      const emailIsValid = await validateEmailAsync(data.email);
      if (!emailIsValid) {
        throw new Error(translateError("email.validation_failed") || t("error"));
      }

      // Get honeypot value from hidden field
      const honeypotInput = document.getElementById("website") as HTMLInputElement;
      const honeypotValue = honeypotInput?.value || "";

      const payload: ApiContactFormData = {
        ...data,
        website: honeypotValue,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const parsedBody = await response.json().catch(() => null);
        const serverError = response.status === 429 ? t("rate_limit") : null;
        throw new Error(serverError || parsedBody?.error || t("error"));
      }

      setSubmitStatus("success");
      setEmailValidationState("idle");
      setEmailValidationMessage(null);
      reset();
    } catch (error) {
      setSubmitStatus("error");
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const emailField = register("email");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot field - hidden from users, visible to bots */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <label htmlFor="website">
          Leave this field empty
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <Input
        label={t("name")}
        placeholder={t("name_placeholder")}
        {...register("name")}
        error={translateError(errors.name?.message)}
      />

      <Input
        label={t("email")}
        type="email"
        placeholder={t("email_placeholder")}
        {...emailField}
        onBlur={async (event) => {
          emailField.onBlur(event);
          await validateEmailAsync(event.target.value);
        }}
        onChange={(event) => {
          emailField.onChange(event);
          setEmailValidationState("idle");
          setEmailValidationMessage(null);
        }}
        error={translateError(errors.email?.message)}
      />
      {emailValidationState !== "idle" && !errors.email && (
        <p
          className={`text-sm ${emailValidationState === "valid" ? "text-green-600" : "text-muted"}`}
          aria-live="polite"
        >
          {emailValidationMessage}
        </p>
      )}

      <Input
        label={t("phone")}
        type="tel"
        placeholder={t("phone_placeholder")}
        {...register("phone")}
        error={translateError(errors.phone?.message)}
      />

      <div>
        <label className="block text-sm font-medium mb-2">{t("service")}</label>
        <select
          {...register("service")}
          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">{t("service_placeholder")}</option>
          <option value="websites">{tServices("websites")}</option>
          <option value="chatbots">{tServices("chatbots")}</option>
          <option value="ai_solutions">{tServices("ai_solutions")}</option>
          <option value="mobile_apps">{tServices("mobile_apps")}</option>
          <option value="cloud">{tServices("cloud")}</option>
          <option value="consulting">{tServices("consulting")}</option>
        </select>
      </div>

      <Textarea
        label={t("message")}
        placeholder={t("message_placeholder")}
        {...register("message")}
        error={translateError(errors.message?.message)}
      />

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? t("submitting") : t("submit")}
        <Send className="w-5 h-5" />
      </Button>

      {submitStatus && (
        <div
          role="status"
          aria-live="polite"
          className={`p-4 rounded-lg ${submitStatus === "success"
              ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400"
              : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400"
            }`}
        >
          {submitStatus === "success"
            ? t("success")
            : errorMessage || t("error")}
        </div>
      )}
    </form>
  );
}
