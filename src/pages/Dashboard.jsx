import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../firebase/firebase";
import { MoonStar, Sun } from "lucide-react";
import EnergyAnalytics from "../components/EnergyAnalytics";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const dataRef = ref(database, "/streetlights/liveData");
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const firebaseData = snapshot.val();
      setData(firebaseData);
    });
    return () => unsubscribe();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col gap-4 items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-400 rounded-full border-t-transparent animate-spin"></div>
        <div className="text-zinc-400 text-xl text-center tracking-wider animate-pulse">
          Connecting to Hardware Matrix
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-4 sm:p-6 lg:p-8 transition-colors duration-500">
      {/* Header section */}
      <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Smart Street Light Panel
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Real-time IoT Telemetry Network
          </p>
        </div>
        <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-full self-start sm:self-center">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono tracking-wider uppercase text-emerald-400">
            Live Feedback
          </span>
        </div>
      </header>

      {/* Main Layout Container (Stacked Sections) */}
      <div className="space-y-6 sm:space-y-8">
        {/* ROW 1: LDR & MODE ONLY */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* LDR VALUE CARD */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 shadow-lg backdrop-blur-sm flex flex-col justify-between min-h-35">
            <h2 className="text-xs font-bold text-zinc-500 tracking-wider uppercase mb-4">
              LDR Photoresistor
            </h2>
            <div>
              <p className="text-4xl sm:text-5xl font-mono font-extrabold text-white tracking-tight">
                {data.ldr}
              </p>
              <p className="text-xs text-zinc-400 mt-2">
                Ambient Illumination Index
              </p>
            </div>
          </div>

          {/* DAY/NIGHT CARD */}
          <div
            className={`rounded-2xl p-5 sm:p-6 flex items-center justify-between shadow-xl border transition-all duration-500 min-h-35 ${
              data.isNight
                ? "bg-indigo-950/30 border-indigo-500/30 shadow-indigo-950/40"
                : "bg-amber-950/20 border-amber-500/20 shadow-amber-950/10"
            }`}
          >
            <div>
              <h2 className="text-xs font-bold text-zinc-500 tracking-wider uppercase mb-1">
                Environmental Mode
              </h2>
              <p
                className={`text-3xl sm:text-4xl font-black tracking-tight transition-colors duration-500 ${
                  data.isNight ? "text-indigo-300" : "text-amber-400"
                }`}
              >
                {data.isNight ? "Night Time" : "Day Time"}
              </p>
            </div>
            <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 transition-transform duration-300 hover:scale-110">
              {data.isNight ? (
                <MoonStar className="w-6 sm:w-10 h-6 sm:h-10 text-indigo-400 fill-indigo-400/20 animate-pulse" />
              ) : (
                <Sun className="w-10 h-10 text-amber-400 fill-amber-400/20 animate-[spin_8s_linear_infinite]" />
              )}
            </div>
          </div>
        </section>

        {/* ROW 2: ALL IR CARDS TOGETHER */}
        <section>
          <h3 className="text-xs font-bold text-zinc-600 tracking-widest uppercase mb-3 px-1">
            Motion Detection Array
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* IR SENSOR 1 */}
            <div
              className={`rounded-2xl p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between min-h-32.5 ${
                data.ir1
                  ? "bg-emerald-950/30 border-emerald-500/40 shadow-lg shadow-emerald-950/30"
                  : "bg-zinc-900/60 border-zinc-800/80"
              }`}
            >
              <h2 className="text-xs font-bold text-zinc-500 tracking-wider uppercase mb-4">
                IR Motion Sensor 01
              </h2>
              <div>
                <p
                  className={`text-2xl font-extrabold tracking-tight transition-colors duration-300 ${data.ir1 ? "text-emerald-400" : "text-zinc-400"}`}
                >
                  {data.ir1 ? "Motion Detected" : "Clear Area"}
                </p>
                <div className="h-1.5 w-full rounded-full mt-3 bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${data.ir1 ? "w-full bg-emerald-400 animate-pulse" : "w-0"}`}
                  />
                </div>
              </div>
            </div>

            {/* IR SENSOR 2 */}
            <div
              className={`rounded-2xl p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between min-h-32.5 ${
                data.ir2
                  ? "bg-emerald-950/30 border-emerald-500/40 shadow-lg shadow-emerald-950/30"
                  : "bg-zinc-900/60 border-zinc-800/80"
              }`}
            >
              <h2 className="text-xs font-bold text-zinc-500 tracking-wider uppercase mb-4">
                IR Motion Sensor 02
              </h2>
              <div>
                <p
                  className={`text-2xl font-extrabold tracking-tight transition-colors duration-300 ${data.ir2 ? "text-emerald-400" : "text-zinc-400"}`}
                >
                  {data.ir2 ? "Motion Detected" : "Clear Area"}
                </p>
                <div className="h-1.5 w-full rounded-full mt-3 bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${data.ir2 ? "w-full bg-emerald-400 animate-pulse" : "w-0"}`}
                  />
                </div>
              </div>
            </div>

            {/* IR SENSOR 3 */}
            <div
              className={`rounded-2xl p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between min-h-32.5 ${
                data.ir3
                  ? "bg-emerald-950/30 border-emerald-500/40 shadow-lg shadow-emerald-950/30"
                  : "bg-zinc-900/60 border-zinc-800/80"
              }`}
            >
              <h2 className="text-xs font-bold text-zinc-500 tracking-wider uppercase mb-4">
                IR Motion Sensor 03
              </h2>
              <div>
                <p
                  className={`text-2xl font-extrabold tracking-tight transition-colors duration-300 ${data.ir3 ? "text-emerald-400" : "text-zinc-400"}`}
                >
                  {data.ir3 ? "Motion Detected" : "Clear Area"}
                </p>
                <div className="h-1.5 w-full rounded-full mt-3 bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${data.ir3 ? "w-full bg-emerald-400 animate-pulse" : "w-0"}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ROW 3: LED CARDS BELOW */}
        <section>
          <h3 className="text-xs font-bold text-zinc-600 tracking-widest uppercase mb-3 px-1">
            Hardware Luminary Output
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* Light 1 */}
            <div
              className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 shadow-md ${
                data.led1
                  ? "bg-amber-400/10 border-amber-500/30 text-amber-300"
                  : "bg-zinc-900/40 border-zinc-800/80 text-zinc-500"
              }`}
            >
              <div className="flex flex-col">
                <span className="text-xs font-sans text-zinc-400 uppercase tracking-wider font-semibold mb-1">
                  LED Node 1
                </span>
                <span className="text-xs text-zinc-500 font-mono">
                  Terminal Rel. A
                </span>
              </div>
              <span className="text-lg font-mono font-black tracking-widest">
                {data.led1 ? "ACTIVE" : "STBY"}
              </span>
            </div>

            {/* Light 2 */}
            <div
              className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 shadow-md ${
                data.led2
                  ? "bg-amber-400/10 border-amber-500/30 text-amber-300"
                  : "bg-zinc-900/40 border-zinc-800/80 text-zinc-500"
              }`}
            >
              <div className="flex flex-col">
                <span className="text-xs font-sans text-zinc-400 uppercase tracking-wider font-semibold mb-1">
                  LED Node 2
                </span>
                <span className="text-xs text-zinc-500 font-mono">
                  Terminal Rel. B
                </span>
              </div>
              <span className="text-lg font-mono font-black tracking-widest">
                {data.led2 ? "ACTIVE" : "STBY"}
              </span>
            </div>

            {/* Light 3 */}
            <div
              className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 shadow-md ${
                data.led3
                  ? "bg-amber-400/10 border-amber-500/30 text-amber-300"
                  : "bg-zinc-900/40 border-zinc-800/80 text-zinc-500"
              }`}
            >
              <div className="flex flex-col">
                <span className="text-xs font-sans text-zinc-400 uppercase tracking-wider font-semibold mb-1">
                  LED Node 3
                </span>
                <span className="text-xs text-zinc-500 font-mono">
                  Terminal Rel. C
                </span>
              </div>
              <span className="text-lg font-mono font-black tracking-widest">
                {data.led3 ? "ACTIVE" : "STBY"}
              </span>
            </div>
          </div>
        </section>

        <div className="">
          <EnergyAnalytics />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
