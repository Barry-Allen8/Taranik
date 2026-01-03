"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Here you would normally send data to your API
      console.log("Form data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitMessage("Дякуємо! Ваше повідомлення надіслано. Ми зв'яжемося з вами найближчим часом.");
      reset();
    } catch (error) {
      setSubmitMessage("Виникла помилка. Спробуйте ще раз або зв'яжіться з нами по телефону.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Ім'я *"
        placeholder="Ваше ім'я"
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        label="Email *"
        type="email"
        placeholder="your@email.com"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        label="Телефон"
        type="tel"
        placeholder="+380 (__)  ___-__-__"
        {...register("phone")}
        error={errors.phone?.message}
      />

      <div>
        <label className="block text-sm font-medium mb-2">Послуга</label>
        <select
          {...register("service")}
          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Оберіть послугу</option>
          <option value="websites">Розробка сайтів</option>
          <option value="chatbots">Чат-боти</option>
          <option value="ai">AI-рішення</option>
          <option value="mobile">Мобільні додатки</option>
          <option value="consulting">IT-консалтинг</option>
        </select>
      </div>

      <Textarea
        label="Повідомлення *"
        placeholder="Розкажіть про ваш проєкт..."
        {...register("message")}
        error={errors.message?.message}
      />

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Надсилання..." : "Надіслати"}
        <Send className="w-5 h-5" />
      </Button>

      {submitMessage && (
        <div
          className={`p-4 rounded-lg ${
            submitMessage.includes("Дякуємо")
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {submitMessage}
        </div>
      )}
    </form>
  );
}
