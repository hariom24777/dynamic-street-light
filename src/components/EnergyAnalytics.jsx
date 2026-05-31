import React, { useEffect, useState } from "react";
import { database } from "../firebase/firebase";
import { onValue, ref } from "firebase/database";
import { Zap, Leaf, Cpu, IndianRupee, Clock } from "lucide-react";

const EnergyAnalytics = () => {
  const [data, setData] = useState(null);

  const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));

  // User adjustable tariff rate state (defaulted to ₹8/kWh)
  const [ratePerKwh, setRatePerKwh] = useState(10);

  useEffect(() => {
    const dataRef = ref(database, "/streetlights/liveData");
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const firebaseData = snapshot.val();
      setData(firebaseData);
    });

    const timer = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => {
      unsubscribe();
      clearInterval(timer);
    };
  }, []);

  const lastUpdate = data?.lastUpdate || 0;

  const secondsAgo = currentTime - lastUpdate;

  const isDeviceOnline =
    !!data &&
    data.wifiConnected === true &&
    data.internetStatus === true &&
    secondsAgo < 10;

  // Loading State

  if (!data) {
    return (
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl flex flex-col gap-4 items-center justify-center min-h-62.5">
        <div className="w-12 h-12 border-4 border-amber-400 rounded-full border-t-transparent animate-spin"></div>
        <div className="text-zinc-400 text-lg text-center tracking-wider animate-pulse">
          Quantizing Power Telemetry Stream
        </div>
      </div>
    );
  }

  // Fixed energy & cost calculation logic

  const LED_POWER = 5;

  // Convert raw milliseconds to fractional hours
  const led1Runtime =
    (data.led1Runtime || 0) +
    (isDeviceOnline && data.led1 ? secondsAgo * 1000 : 0);

  const led2Runtime =
    (data.led2Runtime || 0) +
    (isDeviceOnline && data.led2 ? secondsAgo * 1000 : 0);

  const led3Runtime =
    (data.led3Runtime || 0) +
    (isDeviceOnline && data.led3 ? secondsAgo * 1000 : 0);

  const led1Hours = led1Runtime / 1000 / 60 / 60;
  const led2Hours = led2Runtime / 1000 / 60 / 60;
  const led3Hours = led3Runtime / 1000 / 60 / 60;

  // 1. REAL ENERGY USED (Keep as numbers for clean math)
  const led1Energy = led1Hours * LED_POWER;
  const led2Energy = led2Hours * LED_POWER;
  const led3Energy = led3Hours * LED_POWER;
  const smartEnergyNum = led1Energy + led2Energy + led3Energy;

  // 2. TRADITIONAL SYSTEM BASELINE (Keep as number)
  const maxRuntime = Math.max(led1Hours, led2Hours, led3Hours);
  const traditionalEnergyNum = 3 * LED_POWER * maxRuntime;

  // 3. MATH CALCULATIONS (Safely compute as raw numbers first)
  const energySavedNum = Math.max(0, traditionalEnergyNum - smartEnergyNum);

  // Calculate percentage securely to prevent division by zero or negative slips
  const percentageSaved =
    traditionalEnergyNum > 0
      ? ((energySavedNum / traditionalEnergyNum) * 100).toFixed(1)
      : "0.0";

  // 4. FINANCIAL COST TRANSLATION (Wh / 1000 = kWh)
  const tariff = Number(ratePerKwh) || 0;
  const traditionalCost = ((traditionalEnergyNum / 1000) * tariff).toFixed(2);
  const smartCost = ((smartEnergyNum / 1000) * tariff).toFixed(2);
  const costSaved = Math.max(
    0,
    Number(traditionalCost) - Number(smartCost),
  ).toFixed(2);

  // 5. STRINGS FOR UI DISPLAY ONLY
  const traditionalEnergy = traditionalEnergyNum.toFixed(3);
  const smartEnergy = smartEnergyNum.toFixed(3);
  const energySaved = energySavedNum.toFixed(3);

  const activeLEDs =
    (data.led1 ? 1 : 0) + (data.led2 ? 1 : 0) + (data.led3 ? 1 : 0);
  const totalSystemHours = led1Hours + led2Hours + led3Hours;

  return (
    <section className="mt-8">
      {/* Row Header Label */}
      <h3 className="text-xs font-bold text-zinc-600 tracking-widest uppercase mb-4 px-1">
        Power & Tariff Optimization Matrix
      </h3>

      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
        {/* Top Header Row with Interactive Input */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-zinc-800/60 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/20">
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-zinc-100 tracking-tight">
                Real-Time Energy Analytics
              </h2>
              <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
                Empirical Microcontroller Optimization
              </p>
            </div>
          </div>

          {/* USER INTERACTIVE RUPEE TARIFF RATE INPUT */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 w-full sm:w-auto">
              <label
                htmlFor="tariff-rate"
                className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider whitespace-nowrap"
              >
                Tariff Rate (₹/kWh):
              </label>
              <input
                id="tariff-rate"
                type="number"
                value={ratePerKwh}
                onChange={(e) => setRatePerKwh(e.target.value)}
                min="0"
                step="0.5"
                className="bg-transparent text-amber-400 font-mono font-bold text-sm w-16 focus:outline-none text-right border-b border-transparent"
              />
            </div>

            <div className="flex items-center gap-2 bg-emerald-950/30 border border-emerald-500/30 px-3 py-1.5 rounded-xl w-full sm:w-auto justify-center">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-xs font-bold text-emerald-400">
                +{percentageSaved}% Conservation
              </span>
            </div>
          </div>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* CARD 1: Traditional Baseline */}
          <div className="bg-zinc-950/40 border border-zinc-800/50 rounded-xl p-4 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
              Static Grid Baseline
            </span>
            <div className="mt-2">
              <p className="text-2xl font-mono font-bold text-zinc-400">
                {traditionalEnergy}{" "}
                <span className="text-xs text-zinc-600 font-sans">Wh</span>
              </p>
              <div className="flex items-center gap-1 text-xs text-zinc-500 mt-1 font-mono">
                <IndianRupee className="w-3 h-3 text-zinc-600" />
                <span>Cost: ₹{traditionalCost}</span>
              </div>
            </div>
          </div>

          {/* CARD 2: Smart Accumulated Usage */}
          <div className="bg-zinc-950/40 border border-zinc-800/50 rounded-xl p-4 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
              Dynamic Smart Usage
            </span>
            <div className="mt-2">
              <p className="text-2xl font-mono font-bold text-amber-400">
                {smartEnergy}{" "}
                <span className="text-xs text-amber-500/50 font-sans">Wh</span>
              </p>
              <div className="flex items-center gap-1 text-xs text-amber-400 font-mono mt-1">
                <IndianRupee className="w-3 h-3 text-amber-500/60" />
                <span>Cost: ₹{smartCost}</span>
              </div>
            </div>
          </div>

          {/* CARD 3: Net Financial Saved */}
          <div className="bg-zinc-950/40 border border-zinc-800/50 rounded-xl p-4 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
              Net Financial Saved
            </span>
            <div className="mt-2">
              <p className="text-2xl font-mono font-bold text-emerald-400">
                ₹{costSaved}
              </p>
              <div className="flex items-center gap-1 text-xs text-emerald-500/70 font-mono mt-1">
                <span>Prevented: {energySaved} Wh</span>
              </div>
            </div>
          </div>

          {/* CARD 4: Active Hardware Tracking */}
          <div className="bg-zinc-950/40 border border-zinc-800/50 rounded-xl p-4 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
              Active Array Status
            </span>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <p className="text-2xl font-mono font-bold text-zinc-200">
                  {activeLEDs}{" "}
                  <span className="text-xs text-zinc-600 font-sans">
                    / 3 Nodes
                  </span>
                </p>
                <div className="flex items-center gap-1 text-[10px] text-zinc-500 mt-1 font-mono">
                  <Clock className="w-2.5 h-2.5" />
                  <span>Uptime: {totalSystemHours.toFixed(2)}h</span>
                </div>
              </div>
              <Cpu
                className={`w-5 h-5 transition-colors duration-300 ${activeLEDs > 0 ? "text-amber-400/60 animate-pulse" : "text-zinc-700"}`}
              />
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Visual Progress Progress Bar */}
        <div className="mt-6 pt-5 border-t border-zinc-800/40">
          <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mb-1.5 uppercase">
            <span>Dynamic System Efficiency Profile</span>
            <span className="text-emerald-400 font-bold">
              {percentageSaved}% Saved
            </span>
          </div>
          <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800/30">
            <div
              style={{ width: `${percentageSaved}%` }}
              className="h-full bg-linear-to-r from-amber-500 via-emerald-500 to-emerald-400 rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(16,185,129,0.2)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnergyAnalytics;
