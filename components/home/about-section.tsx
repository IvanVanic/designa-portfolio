/**
 * About Section Component
 * Displays information about Designa, including experience, contact details, and a contact form.
 */
"use client";

import type React from "react";
import { useState, useCallback } from "react";
import { Instagram, Mail, Send, User, MessageSquare } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ContactFormSkeleton } from "@/components/skeleton-loaders";
import { AnimatedSection } from "@/components/animated-section";
import { ContactFormData, FormStatus } from "@/types";
import { TIMING, VALIDATION } from "@/constants";

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
      className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 bg-[#D3D0CB]/30"
    >
      <div className="max-w-6xl mx-auto w-full">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#393E41] mb-4">About Designa</h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left column */}
          <div className="md:col-span-2 flex flex-col gap-8">
            <AnimatedSection className="flex-1 flex">
              <Card className="bg-white/80 rounded-xl shadow-md h-full backdrop-blur-sm">
                <CardContent className="p-12">
                  <h3 className="text-xl font-bold text-[#393E41] mb-4">Our Experience</h3>
                  <p className="text-base text-[#393E41] leading-relaxed">
                    Founded in the City of Flow in the enourmous 2025, Designa is a small team of artists focused on game art, 3D assets, and concept design. We're passionate about gaming, back pain and good coffee.
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={200} className="flex-1 flex w-full">
              <Card className="bg-white/80 rounded-xl shadow-md h-full backdrop-blur-sm w-full">
                <CardContent className="p-12 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-[#393E41] mb-6 text-left">
                    Connect With Us
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-black" />
                      <a
                        href="mailto:contact@designa.art"
                        className="text-[#393E41] hover:text-[#44BBA4] transition-colors duration-300 cursor-none font-inter text-left"
                      >
                        contact@designa.art
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Instagram className="w-5 h-5 text-black" />
                      <a
                        href="#"
                        className="text-[#393E41] hover:text-[#44BBA4] transition-colors duration-300 cursor-none font-inter text-left"
                      >
                        @designa.studio
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          {/* Right column */}
          <AnimatedSection delay={100} className="md:col-span-3">
            <Card className="bg-white/80 rounded-xl shadow-md h-full backdrop-blur-sm">
              <CardContent className="p-12">
                <h3 className="text-xl font-bold text-[#393E41] mb-6 text-center">
                  Got questions? Contact us!
                </h3>
                {formStatus === "success" ? (
                  <div className="text-center py-8 animate-fadeIn">
                    <div className="w-14 h-14 bg-[#44BBA4]/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                      <Mail className="w-7 h-7 text-[#44BBA4]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#393E41] mb-2">
                      Thanks for reaching out!
                    </h3>
                    <p className="text-[#393E41]/70">
                      We'll be in touch soon to discuss your project.
                    </p>
                  </div>
                ) : formStatus === "loading" ? (
                  <ContactFormSkeleton />
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#393E41]/50 w-4 h-4" />
                      <Input
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full h-12 pl-10 text-base"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#393E41]/50 w-4 h-4" />
                      <Input
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full h-12 pl-10 text-base"
                        placeholder="you@email.com"
                      />
                    </div>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3.5 text-[#393E41]/50 w-4 h-4" />
                      <Textarea
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full pl-10 pt-3 resize-none text-base"
                        placeholder="Your message goes here..."
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-semibold cursor-none"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
