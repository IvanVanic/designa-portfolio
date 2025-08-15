/**
 * EmailJS Hook
 * Handles email sending functionality with proper error handling and validation
 */
import { useState, useCallback } from "react";
import emailjs from "@emailjs/browser";
import { ContactFormData } from "@/types";
import { EMAILJS_CONFIG } from "@/constants";

export interface EmailStatus {
  loading: boolean;
  success: boolean;
  error: string | null;
}

export interface UseEmailJSReturn {
  emailStatus: EmailStatus;
  sendEmail: (formData: ContactFormData) => Promise<boolean>;
  resetEmailStatus: () => void;
}

export function useEmailJS(): UseEmailJSReturn {
  const [emailStatus, setEmailStatus] = useState<EmailStatus>({
    loading: false,
    success: false,
    error: null,
  });

  const validateConfig = useCallback((): { ok: boolean; error?: string } => {
    const missing: string[] = [];
    if (!EMAILJS_CONFIG.publicKey) missing.push("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY");
    if (!EMAILJS_CONFIG.serviceId) missing.push("NEXT_PUBLIC_EMAILJS_SERVICE_ID");
    if (!EMAILJS_CONFIG.templateId) missing.push("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID");

    if (missing.length > 0) {
      const message = `EmailJS configuration is incomplete. Missing: ${missing.join(", ")}`;
      console.error(message);
      return { ok: false, error: message };
    }
    return { ok: true };
  }, []);

  const sendEmail = useCallback(
    async (formData: ContactFormData): Promise<boolean> => {
      const validation = validateConfig();
      if (!validation.ok) {
        setEmailStatus({
          loading: false,
          success: false,
          error:
            validation.error ||
            "Email service is not properly configured. Please contact the administrator.",
        });
        return false;
      }

      setEmailStatus({ loading: true, success: false, error: null });

      try {
        // Initialize EmailJS with the public key
        emailjs.init(EMAILJS_CONFIG.publicKey);

        // Prepare template parameters
        // Match variable names to your EmailJS template fields ({{name}}, {{email}}, {{message}})
        const templateParams = {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          reply_to: formData.email,
          title: formData.name,
          time: new Date().toLocaleString(),
        } as const;

        // Send the email
        const response = await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          templateParams
        );

        if (response.status === 200) {
          setEmailStatus({ loading: false, success: true, error: null });
          return true;
        } else {
          throw new Error(`EmailJS responded with status: ${response.status}`);
        }
      } catch (error) {
        console.error("Failed to send email:", error);

        let errorMessage = "Failed to send message. Please try again later.";

        if (error instanceof Error) {
          // Handle specific EmailJS errors
          if (error.message.includes("Invalid API key")) {
            errorMessage = "Email service configuration error. Please contact support.";
          } else if (error.message.includes("network")) {
            errorMessage = "Network error. Please check your connection and try again.";
          } else if (error.message.includes("rate limit")) {
            errorMessage = "Too many requests. Please wait a moment and try again.";
          }
        }

        setEmailStatus({ loading: false, success: false, error: errorMessage });
        return false;
      }
    },
    [validateConfig]
  );

  const resetEmailStatus = useCallback(() => {
    setEmailStatus({ loading: false, success: false, error: null });
  }, []);

  return {
    emailStatus,
    sendEmail,
    resetEmailStatus,
  };
}
