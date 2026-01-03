"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="section bg-gradient-to-r from-primary via-accent to-secondary">
      <div className="container">
        <motion.div
          className="max-w-3xl mx-auto text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готові розпочати ваш проєкт?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Отримайте безкоштовну консультацію від наших експертів та дізнайтеся, як ми можемо допомогти вашому бізнесу рости
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
              asChild
            >
              <Link href="/contact">
                Замовити консультацію
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
              asChild
            >
              <Link href="/portfolio">Переглянути портфоліо</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
