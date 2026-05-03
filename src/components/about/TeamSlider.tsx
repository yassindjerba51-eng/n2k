"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ShieldCheck, User } from "lucide-react";

export interface Profile {
  name: string;
  role: string;
  desc: string;
  image?: string;
}

export interface StaffCardProps {
  title: string;
  desc: string;
}

interface TeamSliderProps {
  profiles: Profile[];
  staff: StaffCardProps;
}

export function TeamSlider({ profiles, staff }: TeamSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);

  useEffect(() => {
    if (profiles.length <= 1) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [profiles.length]);

  const currentProfile = profiles[currentIndex];

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch transition-opacity duration-300">
        
        {/* Profile Card */}
        <div className="bg-n2k-surface-low rounded-3xl p-8 md:p-12 border border-n2k-primary/10 flex flex-col md:flex-row gap-8 items-center shadow-ambient hover:shadow-ambient-lg transition-all relative">
          <div className="w-40 h-40 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-xl bg-n2k-surface-high flex items-center justify-center">
            {currentProfile.image ? (
              <Image
                src={currentProfile.image}
                alt={currentProfile.name}
                width={160}
                height={160}
                className="object-cover w-full h-full"
              />
            ) : (
              <User className="w-20 h-20 text-n2k-primary/30" />
            )}
          </div>
          <div>
            <h3 className="font-heading text-2xl font-black text-n2k-primary mb-1">
              {currentProfile.name}
            </h3>
            <div className="text-n2k-secondary font-bold text-sm uppercase tracking-widest mb-4">
              {currentProfile.role}
            </div>
            <p className="text-n2k-on-surface-variant font-body text-sm leading-relaxed">
              {currentProfile.desc}
            </p>
          </div>
        </div>

        {/* Staff Card */}
        <div className="bg-n2k-primary text-white rounded-3xl p-8 md:p-12 flex flex-col justify-center shadow-ambient hover:shadow-ambient-lg transition-all relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="w-12 h-12 bg-n2k-secondary rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-heading text-2xl font-black mb-4">
              {staff.title}
            </h3>
            <p className="text-white/80 font-body leading-relaxed">
              {staff.desc}
            </p>
            <div className="mt-8 flex gap-3 flex-wrap">
              <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/20">Docteurs Vétérinaires</span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/20">Ingénieurs Agro</span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/20">Auditeurs Sanitaires</span>
            </div>
          </div>
        </div>
        
      </div>

    </div>
  );
}
