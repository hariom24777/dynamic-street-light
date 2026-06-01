import React, { useState } from 'react';
import { espCode } from '../data/espCode';

const CodeViewer = () => {
  const [copied, setCopied] = useState(false);

  // Clipboard copy handler using standard browser API
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(espCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy firmware telemetry source:", err);
    }
  };

  return (
    <section className="mt-8 w-full max-w-full overflow-hidden">
      {/* Sub-Horizon Row Section Header */}
      <div className="mb-4">
        <h2 className="text-xs font-bold text-zinc-600 tracking-widest uppercase px-1">
          Firmware Code Deployment
        </h2>
      </div>

      {/* Terminal Container Wrapper */}
      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden flex flex-col w-full max-w-full">
        
        {/* Terminal Application Window Banner Bar */}
        <div className="bg-zinc-950/80 border-b border-zinc-900/80 px-4 py-3 flex items-center justify-between gap-3 w-full">
          <div className="flex items-center gap-3 min-w-0">
            {/* Custom Interactive Window Controls Dots */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/40 border border-red-600/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40 border border-amber-600/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40 border border-emerald-600/30" />
            </div>
            {/* Node System Metatags Info */}
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[10px] font-mono font-bold text-zinc-500 tracking-wider uppercase truncate">
                firmware.ino
              </span>
              <span className="px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-[8px] font-mono text-amber-400 rounded shrink-0">
                C++ // ESP8266 Core
              </span>
            </div>
          </div>

          {/* Action Hub: Clipboard Multi-State Action Controller (Responsive Text vs Icon) */}
          <button
            onClick={handleCopyCode}
            className={`flex items-center justify-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-lg border text-[10px] font-mono uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer shrink-0 ${
              copied
                ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-400"
                : "bg-zinc-900 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
            }`}
            title={copied ? "Copied!" : "Copy Code"}
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 sm:w-3 sm:h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {/* Text is hidden on small screens, block displays on sm and up */}
                <span className="hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 sm:w-3 sm:h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                {/* Text is hidden on small screens, block displays on sm and up */}
                <span className="hidden sm:inline">Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Source Panel Display Console Screen Codeblock */}
        <div className="p-3 sm:p-5 overflow-auto max-h-[500px] bg-zinc-950/40 font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed scrollbar-thin scrollbar-thumb-zinc-800 select-text w-full">
          <pre className="text-left whitespace-pre-wrap break-all md:whitespace-pre md:break-normal select-text">
            <code className="select-text block">{espCode}</code>
          </pre>
        </div>

        {/* Console Footing Meta Terminal Status Ribbon */}
        <div className="bg-zinc-950/20 border-t border-zinc-900/60 px-4 py-2 flex flex-row items-center justify-between text-[9px] font-mono text-zinc-600 uppercase tracking-wider w-full gap-2">
          <span className="truncate">Target: NodeMCU v3 ESP8266</span>
          <span className="shrink-0">Baud: 115200 bps</span>
        </div>

      </div>
    </section>
  );
};

export default CodeViewer;
