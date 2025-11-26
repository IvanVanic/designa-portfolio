/**
 * About Section Component
 * Combined about and contact section side by side
 */
"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContactFormSkeleton } from "@/components/skeleton-loaders";
import { Mail, Send, User, MessageSquare, Instagram, AlertCircle } from "lucide-react";
import { SiTiktok, SiArtstation } from "react-icons/si";
import { z } from "zod";
import { ContactFormData, FormStatus } from "@/types";
import { TIMING, VALIDATION } from "@/constants";
import { useEmailJS } from "@/hooks/use-emailjs";
// Background effects removed for a cleaner fixed gradient

const formSchema = z.object({
  name: z.string().min(VALIDATION.minNameLength),
  email: z.string().email(),
  message: z.string().min(VALIDATION.minMessageLength),
});

export function AboutSection() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const { emailStatus, sendEmail, resetEmailStatus } = useEmailJS();

  // On mount, check if there is a recent successful submission and keep showing success until TTL expires
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("contact_success_at") : null;
      if (!raw) return;
      const successAt = Number(raw);
      if (!Number.isFinite(successAt)) return;
      const now = Date.now();
      if (now - successAt < TIMING.contactSuccessTtl) {
        setFormStatus("success");
      } else {
        localStorage.removeItem("contact_success_at");
      }
    } catch {
      // no-op
    }
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      // Clear any previous errors when user starts typing
      if (emailStatus.error) {
        resetEmailStatus();
      }
    },
    [emailStatus.error, resetEmailStatus]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Validate form data
      const parsed = formSchema.safeParse(formData);
      if (!parsed.success) {
        setFormStatus("error");
        return;
      }

      // Set loading state
      setFormStatus("loading");

      // Send email using EmailJS
      const success = await sendEmail(formData);

      if (success) {
        setFormStatus("success");
        // Clear form data on success
        setFormData({ name: "", email: "", message: "" });
        // persist success state timestamp to keep showing thank you
        try {
          if (typeof window !== "undefined") {
            localStorage.setItem("contact_success_at", String(Date.now()));
          }
        } catch {
          // no-op
        }
        // Do not auto-reset UI immediately; it will persist until reload or TTL expiry
        // Still clear email status to avoid showing stale errors/spinners
        resetEmailStatus();
      } else {
        setFormStatus("error");
        // Reset to idle after a shorter delay for errors
        setTimeout(() => setFormStatus("idle"), 3000);
      }
    },
    [formData, sendEmail, resetEmailStatus]
  );

  // Sync EmailJS loading state with form status
  useEffect(() => {
    if (emailStatus.loading) {
      setFormStatus("loading");
    }
  }, [emailStatus.loading]);

  return (
    <section
      id="about"
      className="min-h-screen py-28 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* About Designa - Left Side */}
          <AnimatedSection delay={0}>
            <div className="lg:pr-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sora text-foreground mb-6 lg:mb-8">
                About Designa
              </h2>

              <div className="space-y-4 text-base md:text-lg text-foreground/80 mb-8 lg:mb-12 leading-relaxed">
                <p>
                  We are a passionate team of artists and designers dedicated to creating exceptional
                  game art.
                </p>
                <p>
                  Our expertise spans multiple disciplines, and with a personalized approach to every
                  project, we work closely with you to bring your vision to life exactly as you imagined.
                </p>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold font-sora text-foreground mb-4">
                  Connect with us
                </h3>

                <div className="flex flex-col space-y-3">
                  <a
                    href="https://www.artstation.com/pingini"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-foreground hover:text-accent transition-colors duration-300 cursor-none group"
                  >
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors duration-300">
                      <SiArtstation className="w-5 h-5 text-accent" />
                    </div>
                    <span className="font-sora">pingini</span>
                  </a>

                  <a
                    href="https://www.instagram.com/shrimply_ghostie"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-foreground hover:text-accent transition-colors duration-300 cursor-none group"
                  >
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors duration-300">
                      <Instagram className="w-5 h-5 text-accent" />
                    </div>
                    <span className="font-sora">shrimply_ghostie</span>
                  </a>

                  <a
                    href="https://www.tiktok.com/@shrimplyghostie"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-foreground hover:text-accent transition-colors duration-300 cursor-none group"
                  >
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors duration-300">
                      <SiTiktok className="w-5 h-5 text-accent" />
                    </div>
                    <span className="font-sora">shrimplyghostie</span>
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Get in Touch - Right Side */}
          <AnimatedSection delay={200}>
            {/* Restyled contact card: darker panel for stronger contrast */}
            <div
              className="p-6 md:p-8 shadow-lg backdrop-blur-sm border-0 sm:border-2
                         bg-[linear-gradient(135deg,rgba(10,16,20,0.95)_0%,rgba(19,27,33,0.95)_60%,rgba(8,12,16,0.95)_100%)]
                         border-accent/25 min-h-[360px]
                         rounded-none mx-[-1rem] sm:mx-0 sm:rounded-xl"
            >
              {formStatus !== "success" && (
                <h3 className="text-2xl md:text-3xl font-bold font-sora text-foreground mb-6 md:mb-8">
                  Get in touch
                </h3>
              )}

              {formStatus === "success" ? (
                <div className="text-center py-8 animate-fadeIn flex flex-col items-center justify-center min-h-[280px]">
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce"
                    style={{ animationIterationCount: "3" }}
                  >
                    <Mail className="w-7 h-7 md:w-8 md:h-8 text-accent" />
                  </div>
                  <h4 className="text-2xl md:text-3xl font-semibold text-foreground mb-2 font-sora">
                    Thanks for reaching out!
                  </h4>
                  <p className="text-foreground/70 text-sm md:text-base">
                    We&apos;ll be in touch soon to discuss your project.
                  </p>
                </div>
              ) : formStatus === "loading" ? (
                <ContactFormSkeleton />
              ) : formStatus === "error" ? (
                <div className="text-center py-8 animate-fadeIn">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-7 h-7 md:w-8 md:h-8 text-red-500" />
                  </div>
                  <h4 className="text-xl md:text-2xl font-semibold text-foreground mb-2 font-sora">
                    Oops! Something went wrong
                  </h4>
                  <p className="text-foreground/70 text-sm md:text-base mb-4">
                    {emailStatus.error || "Please check your information and try again."}
                  </p>
                  <Button
                    onClick={() => setFormStatus("idle")}
                    variant="outline"
                    className="border-accent/30 text-accent hover:bg-accent/10"
                  >
                    Try Again
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-4 h-4 md:w-5 md:h-5" />
                    <Input
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full h-12 md:h-14 pl-10 md:pl-12 text-base md:text-lg
                                 bg-gaming-card/60 border-accent/30 text-foreground placeholder:text-foreground/50
                                 focus:border-accent rounded-gaming"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-4 h-4 md:w-5 md:h-5" />
                    <Input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full h-12 md:h-14 pl-10 md:pl-12 text-base md:text-lg
                                 bg-gaming-card/60 border-accent/30 text-foreground placeholder:text-foreground/50
                                 focus:border-accent rounded-gaming"
                      placeholder="you@email.com"
                    />
                  </div>

                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3.5 text-foreground/50 w-4 h-4 md:w-5 md:h-5" />
                    <Textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full pl-10 md:pl-12 pt-3 resize-none text-base md:text-lg
                                 bg-gaming-card/60 border-accent/30 text-foreground placeholder:text-foreground/50
                                 focus:border-accent rounded-gaming"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={emailStatus.loading}
                    className="w-full h-12 md:h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-medium text-base md:text-lg rounded-gaming transition-all duration-300 hover:scale-105 shadow-glow-md hover:shadow-glow-lg border border-accent/40 hover:border-accent/60 cursor-none group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <Send
                      className={`mr-2 w-4 h-4 md:w-5 md:h-5 ${
                        emailStatus.loading ? "animate-spin" : "group-hover:animate-pulse"
                      }`}
                    />
                    <span className="group-hover:animate-pulse">
                      {emailStatus.loading ? "Sending..." : "Send Message"}
                    </span>
                  </Button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
