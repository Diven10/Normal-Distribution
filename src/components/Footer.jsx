import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-100 py-6 mt-16">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <p className="text-sm font-medium">
          Built by Gaussian Playground Team © {currentYear}
        </p>
      </div>
    </footer>
  );
}
