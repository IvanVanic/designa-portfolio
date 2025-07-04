/**
 * About Section Component
 * Combined about and contact section side by side
 */
"use client";

import { useState, useCallback } from "react";
import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContactFormSkeleton } from "@/components/skeleton-loaders";
import { Mail, Send, User, MessageSquare, Instagram } from "lucide-react";
import { z } from "zod";
import { ContactFormData, FormStatus } from "@/types";
import { TIMING, VALIDATION } from "@/constants";
import { Particles } from "@/components/particles";

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

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const parsed = formSchema.safeParse(formData);
      if (!parsed.success) {
        alert("Please fill out the form correctly.");
        return;
      }
      setFormStatus("loading");
      setTimeout(() => {
        setFormStatus("success");
        setTimeout(() => setFormStatus("idle"), TIMING.successMessageDelay);
      }, TIMING.formSubmitDelay);
    },
    [formData]
  );

  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden"
    >
      <Particles count={30} variant="flowing" className="opacity-50" />
      <Particles count={15} variant="stationary" className="opacity-30" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* About Designa - Left Side */}
          <AnimatedSection delay={0}>
            <div className="lg:pr-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sora text-foreground mb-6 lg:mb-8">
                About Designa
              </h2>

              <p className="text-lg md:text-xl text-foreground/80 mb-8 lg:mb-12 leading-relaxed">
                We are a passionate team of artists and designers dedicated to creating exceptional
                game art. Our expertise spans across multiple disciplines, bringing your gaming
                vision to life with stunning visuals that captivate and engage players.
              </p>

              <p className="text-base md:text-lg text-foreground/70 mb-8 lg:mb-12 leading-relaxed">
                From character design to environment art, UI/UX design to complete visual packages,
                we work closely with development teams to ensure every pixel serves the greater
                gaming experience.
              </p>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold font-sora text-foreground mb-4">
                  Connect with us
                </h3>

                <div className="flex flex-col space-y-3">
                  <a
                    href="mailto:contact@designa.art"
                    className="flex items-center space-x-3 text-foreground hover:text-accent transition-colors duration-300 cursor-none group"
                  >
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors duration-300">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <span className="font-sora">contact@designa.art</span>
                  </a>

                  <a
                    href="https://instagram.com/designa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-foreground hover:text-accent transition-colors duration-300 cursor-none group"
                  >
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors duration-300">
                      <Instagram className="w-5 h-5 text-accent" />
                    </div>
                    <span className="font-sora">@designa</span>
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Get in Touch - Right Side */}
          <AnimatedSection delay={200}>
            <div className="bg-gaming-card border-2 border-accent/20 rounded-xl p-6 md:p-8 shadow-lg">
              <h3 className="text-2xl md:text-3xl font-bold font-sora text-foreground mb-6 md:mb-8">
                Get in touch
              </h3>

              {formStatus === "success" ? (
                <div className="text-center py-8 animate-fadeIn">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <Mail className="w-7 h-7 md:w-8 md:h-8 text-accent" />
                  </div>
                  <h4 className="text-xl md:text-2xl font-semibold text-foreground mb-2 font-sora">
                    Thanks for reaching out!
                  </h4>
                  <p className="text-foreground/70 text-sm md:text-base">
                    We&apos;ll be in touch soon to discuss your project.
                  </p>
                </div>
              ) : formStatus === "loading" ? (
                <ContactFormSkeleton />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-4 h-4 md:w-5 md:h-5" />
                    <Input
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full h-12 md:h-14 pl-10 md:pl-12 text-base md:text-lg bg-gaming-card/50 border-accent/20 text-foreground placeholder:text-foreground/50 focus:border-accent rounded-gaming"
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
                      className="w-full h-12 md:h-14 pl-10 md:pl-12 text-base md:text-lg bg-gaming-card/50 border-accent/20 text-foreground placeholder:text-foreground/50 focus:border-accent rounded-gaming"
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
                      className="w-full pl-10 md:pl-12 pt-3 resize-none text-base md:text-lg bg-gaming-card/50 border-accent/20 text-foreground placeholder:text-foreground/50 focus:border-accent rounded-gaming"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 md:h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-medium text-base md:text-lg rounded-gaming transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-accent/20 border border-accent/30 hover:border-accent/60 cursor-none group"
                  >
                    <Send className="mr-2 w-4 h-4 md:w-5 md:h-5 group-hover:animate-pulse" />
                    <span className="group-hover:animate-pulse">Send Message</span>
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
