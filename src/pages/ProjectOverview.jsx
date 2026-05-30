import React from "react";
import { Cpu, GraduationCap, Award, ShieldAlert, FileText, Layers, ShieldUser } from "lucide-react";
import {
  PROJECT_DETAILS,
  TEAM_DETAILS,
  FACULTY_DETAILS,
} from "../data/constants";

const ProjectOverview = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      {/* SECTION 1: MASTER ABSTRACT GRID HEADLINE */}
      <section className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-3 border-b border-zinc-800/60 pb-4 mb-4">
          <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/20">
            <FileText className="w-6 h-6 sm:w-8 sm:h-8  text-amber-400" />
          </div>
          <div>
            <span className="text-[10px] sm:text-[12px] font-mono tracking-widest text-zinc-500 uppercase">
              System Abstract Overview
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-100 tracking-tight mt-0.5 uppercase">
              {PROJECT_DETAILS.title}
            </h1>
          </div>
        </div>
        <p className="text-zinc-400 text-sm leading-relaxed max-w-5xl">
          {PROJECT_DETAILS.abstract}
        </p>
      </section>

      {/* SECTION 2: ACADEMIC MENTORSHIP MATRIX */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Project Coordinator Card */}
        <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-5 flex items-start gap-4 shadow-lg">
          <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-amber-500">
            <Award className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-[12px] font-mono tracking-widest text-zinc-500 uppercase">
              Project Coordinator
            </span>
            <h3 className="text-base font-bold text-zinc-200">
              {FACULTY_DETAILS.coordinator.name}
            </h3>
            <p className="text-xs text-zinc-400 font-medium">
              {FACULTY_DETAILS.coordinator.designation}
            </p>
          </div>
        </div>

        {/* Project Guide Card */}
        <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-5 flex items-start gap-4 shadow-lg">
          <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-emerald-500">
            <ShieldUser className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-[12px] font-mono tracking-widest text-zinc-500 uppercase">
              Project Guide
            </span>
            <h3 className="text-base font-bold text-zinc-200">
              {FACULTY_DETAILS.guide.name}
            </h3>
            <p className="text-xs text-zinc-400 font-medium">
              {FACULTY_DETAILS.guide.designation}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: TEAM DEPLOYMENT GRID (Optimized for exactly 4 columns) */}
      <section>
        <h3 className="text-xs font-bold text-zinc-600 tracking-widest uppercase mb-4 px-1">
          Development Team Members
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TEAM_DETAILS.map((student) => (
            <div
              key={student.id}
              className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between transition-all duration-300 hover:border-zinc-800"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono tracking-wider bg-zinc-950 text-zinc-500 px-2 py-0.5 rounded border border-zinc-900">
                    MEMBER_0{student.id}
                  </span>
                  <GraduationCap className="w-8 h-8 text-zinc-700" />
                </div>
                <h4 className="text-base font-bold text-zinc-100 mt-3">
                  {student.name}
                </h4>

                {/* Clean Name & Enrollment layout structure mapping matching specifications */}
                <div className="flex items-center gap-1.5 pt-1.5">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold">
                    Enroll:
                  </span>
                  <p className="text-xs text-amber-400 font-mono font-bold tracking-wider">
                    {student.enroll}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: HARDWARE & SOFTWARE PILLS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Hardware Framework Modules */}
        <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-bold font-mono tracking-wider text-zinc-400 uppercase mb-4 border-b border-zinc-800/60 pb-2">
            <Cpu className="w-4 h-4 text-amber-500/80" />
            <span>Hardware Components</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {PROJECT_DETAILS.hardwareStack.map((item, idx) => (
              <span
                key={idx}
                className="bg-zinc-950 border border-zinc-900 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-400 font-sans shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Software Stack Framework Modules */}
        <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-bold font-mono tracking-wider text-zinc-400 uppercase mb-4 border-b border-zinc-800/60 pb-2">
            <Layers className="w-4 h-4 text-emerald-500/80" />
            <span>Software Platform Infrastructure</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {PROJECT_DETAILS.softwareStack.map((item, idx) => (
              <span
                key={idx}
                className="bg-zinc-950 border border-zinc-900 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-400 font-sans shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectOverview;
