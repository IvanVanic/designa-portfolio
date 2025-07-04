"use client"

import React from "react";
import { AnimatedSection } from "@/components/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Send, User, MessageSquare } from "lucide-react";
import { ContactFormSkeleton } from "@/components/skeleton-loaders";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export function ContactSection() {
  const [formStatus, setFormStatus] = React.useState<"idle" | "loading" | "success">("idle");
  const [formData, setFormData] = React.useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = formSchema.safeParse(formData);
    if (!parsed.success) {
      alert("Please fill out the form correctly.");
      return;
    }
    setFormStatus("loading");
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1800);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="min-h-screen bg-[#E7E5DF] flex items-center justify-center p-8">
      <div className="w-full max-w-xl">
        <AnimatedSection>
          <div className="mb-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#393E41] mb-4">Contact Us</h2>
            <p className="text-xl text-[#393E41]/70">Ready to bring your vision to life? Let's start a conversation.</p>
          </div>
          <Card className="shadow-xl border-0 bg-white overflow-hidden">
            <CardContent className="p-8">
              {formStatus === "success" ? (
                <div className="text-center py-8 animate-fadeIn">
                  <div className="w-16 h-16 bg-[#44BBA4]/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <Mail className="w-8 h-8 text-[#44BBA4]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#393E41] mb-2">Thanks for reaching out!</h3>
                  <p className="text-[#393E41]/70">We'll be in touch soon to discuss your project.</p>
                </div>
              ) : formStatus === "loading" ? (
                <ContactFormSkeleton />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#393E41]/50 w-5 h-5" />
                    <Input name="name" required value={formData.name} onChange={handleInputChange} className="w-full h-16 pl-14 text-lg" placeholder="Your name" />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#393E41]/50 w-5 h-5" />
                    <Input name="email" type="email" required value={formData.email} onChange={handleInputChange} className="w-full h-16 pl-14 text-lg" placeholder="you@email.com" />
                  </div>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 text-[#393E41]/50 w-5 h-5" />
                    <Textarea name="message" rows={6} required value={formData.message} onChange={handleInputChange} className="w-full pl-14 pt-4 resize-none text-lg" placeholder="Tell us about your project..." />
                  </div>
                  {(() => {
                    const isLoading = (formStatus as string) === "loading";
                    return (
                      <Button disabled={isLoading} className="w-full h-16 bg-[#393E41] hover:bg-[#393E41]/90 text-white text-lg flex items-center justify-center space-x-3">
                        <Send className="w-5 h-5" />
                        <span>{isLoading ? "Sending..." : "Send Message"}</span>
                      </Button>
                    );
                  })()}
                </form>
              )}
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  );
} 