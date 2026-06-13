"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6 text-center">
        <p className="text-lg font-bold text-brand-700">Cảm ơn bạn đã liên hệ!</p>
        <p className="mt-2 text-sm text-slate-600">
          TSE Vending đã nhận được thông tin và sẽ phản hồi trong thời gian sớm nhất.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-semibold text-slate-700">
          Họ và tên
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
          placeholder="Nguyễn Văn A"
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-semibold text-slate-700">
          Số điện thoại
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
          placeholder="09xxxxxxxx"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-semibold text-slate-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
          placeholder="email@congty.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-semibold text-slate-700">
          Nội dung cần tư vấn
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
          placeholder="Tôi cần tư vấn lắp đặt máy bán hàng tự động tại..."
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-accent-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-accent-600"
      >
        Gửi yêu cầu tư vấn
      </button>
    </form>
  );
}
