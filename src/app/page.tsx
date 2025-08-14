"use client";

import { Icon } from "@/icons/Icon";
import Link from "next/dist/client/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full rounded-lg to-blue-700/30 p-8 flex flex-col py-16 gap-2 relative overflow-hidden -z-1">
        <div className="absolute w-full h-full top-0 left-0 -z-1 flex items-center">
          <img src="https://images.pexels.com/photos/7663144/pexels-photo-7663144.jpeg" alt="Description of image" />
        </div>
        <div className="absolute inset-0 rounded-lg filter bg-gradient-to-l from-sky-700/80 via-purple-700/80 to-blue-700/80 -z-1" />

        <h2 className="text-5xl font-bold text-slate-100">Légy mestere bármely tantárgynak</h2>
        <p className="text-xl text-slate-200">Interaktív kvízek, átfogó tananyagok és egy tanulói közösség. Emeld a tudásodat a következő szintre a Gondolkodtatóval.</p>

        <div className="flex gap-2 mt-6">
          <Link href="/materials" className="rounded-md bg-slate-100 px-4 py-2 text-slate-900 hover:bg-slate-100/90">Kezdj el tanulni</Link>
          <Link href="/quizzes" className="rounded-md border border-slate-100 px-4 py-2 text-slate-100 hover:bg-slate-100/10">Kvízek böngészése</Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 mt-6">
        <InfoCard title="Összes kvíz" number={123} desc="+12 múlt hónapban" icon={<Icon.Brain size={24} />} />
        <InfoCard title="Tananyagok" number={300} desc="+10 múlt héten" icon={<Icon.Book size={24} />} />
        <InfoCard title="Aktív felhasználók" number={32602} desc="+30 múlt hónapban" icon={<Icon.Group size={24} />} />
        <InfoCard title="Teljesítési arány" number={4} desc="+2.1% múlt hónapban" unit="%" icon={<Icon.Trophy size={24} />} />
      </div>
    </div>
  );
}

function InfoCard({ title, number, desc, icon, unit }: { title: string, number: number, desc: string, icon: React.ReactNode, unit?: string }) {

  function formatNumber(num: number) {
    return num.toLocaleString('hu-HU');
  }

  return (
    <div className="rounded-lg border border-slate-400/40 p-4 flex flex-col">
      <div className="flex w-full justify-between items-center">
        <span className="text-lg text-slate-100">{title}</span>
        <span className="text-sm text-slate-400/50">{icon}</span>
      </div>
      <div className="mt-2">
        <span className="text-2xl font-bold text-slate-100">{formatNumber(number)}{unit}</span>
      </div>
      <div className="mt-1">
        <span className="text-xs text-slate-400/50">{desc}</span>
      </div>
    </div>
  );
}