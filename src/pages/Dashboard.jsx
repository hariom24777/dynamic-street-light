import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../firebase/firebase";
import { Cpu, MoonStar, Sun } from "lucide-react";
import EnergyAnalytics from "../components/EnergyAnalytics";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));

  useEffect(() => {
    const dataRef = ref(database, "/streetlights/liveData");
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const firebaseData = snapshot.val();
      if (firebaseData) {
        setData(firebaseData);
      }
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
  const isDeviceOnline = secondsAgo < 10;

  const liveUptime = data?.uptime ? data.uptime + secondsAgo : 0;
  const uptime = liveUptime;

  const uptimeHours = Math.floor(uptime / 3600);
  const uptimeMinutes = Math.floor((uptime % 3600) / 60);
  const uptimeSeconds = uptime % 60;

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
      <div>
        {/* Top Header */}
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
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isDeviceOnline ? "bg-emerald-400" : "bg-red-400"} opacity-75`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-3 w-3 ${isDeviceOnline ? "bg-emerald-500" : "bg-red-500"}`}
              ></span>
            </span>
            <span
              className={`text-xs font-mono tracking-wider uppercase ${isDeviceOnline ? "text-emerald-400" : "text-red-400"}`}
            >
              {isDeviceOnline ? "Hardware Online" : "Hardware Offline"}
            </span>
          </div>
        </header>

        {/* Bottom Header */}
        <div className="mt-6 pb-6">
          <h3 className="text-xs font-bold text-zinc-600 tracking-widest uppercase mb-3 px-1">
            Network Analytics & Diagnostics
          </h3>

          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* 1. Device Identifier Card */}
              <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/50 flex flex-col justify-between transition-colors hover:border-zinc-800">
                <p className="text-zinc-500 font-mono tracking-wider text-[10px] uppercase">
                  Device Core
                </p>
                <p className="text-zinc-100 font-bold text-xs tracking-wide mt-2 truncate">
                  {data?.device || "ESP32-MCU"}
                </p>
              </div>

              {/* 2. WiFi Status Card */}
              <div
                className={`p-4 rounded-xl bg-zinc-950/40 border transition-all duration-300 flex flex-col justify-between ${
                  isDeviceOnline && data?.wifiConnected
                    ? "border-emerald-500/20 shadow-md shadow-emerald-950/10"
                    : "border-red-500/20 shadow-md shadow-red-950/10"
                }`}
              >
                <p className="text-zinc-500 font-mono tracking-wider text-[10px] uppercase">
                  WiFi Link
                </p>
                <p
                  className={`font-mono text-xs font-black tracking-widest mt-2 uppercase truncate ${
                    isDeviceOnline && data?.wifiConnected
                      ? "text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.2)]"
                      : "text-red-400 drop-shadow-[0_0_6px_rgba(248,113,113,0.2)]"
                  }`}
                >
                  {isDeviceOnline && data?.wifiConnected
                    ? "Connected"
                    : "Disconnected"}
                </p>
              </div>

              {/* 3. Firebase Server Sync Status */}
              <div
                className={`p-4 rounded-xl bg-zinc-950/40 border transition-all duration-300 flex flex-col justify-between ${
                  isDeviceOnline && data?.internetStatus
                    ? "border-emerald-500/20 shadow-md shadow-emerald-950/10"
                    : "border-red-500/20 shadow-md shadow-red-950/10"
                }`}
              >
                <p className="text-zinc-500 font-mono tracking-wider text-[10px] uppercase">
                  Firebase Sync
                </p>
                <p
                  className={`font-mono text-xs font-black tracking-widest mt-2 uppercase ${
                    isDeviceOnline && data?.internetStatus
                      ? "text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.2)]"
                      : "text-red-400 drop-shadow-[0_0_6px_rgba(248,113,113,0.2)]"
                  }`}
                >
                  {isDeviceOnline && data?.internetStatus
                    ? "Online"
                    : "Offline"}
                </p>
              </div>

              {/* 4. RF Signal Strength Evaluation Card */}
              <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/50 flex flex-col justify-between transition-colors hover:border-zinc-800">
                <p className="text-zinc-500 font-mono tracking-wider text-[10px] uppercase">
                  RSSI Strength
                </p>
                <p className="text-amber-400 font-mono font-bold text-sm tracking-tight mt-2">
                  {(isDeviceOnline && data?.wifiSignal) || "--"}{" "}
                  <span className="text-[10px] text-zinc-600 font-sans font-medium">
                    dBm
                  </span>
                </p>
              </div>

              {/* 5. Assigned IP Address Matrix Card */}
              <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/50 flex flex-col justify-between transition-colors hover:border-zinc-800">
                <p className="text-zinc-500 font-mono tracking-wider text-[10px] uppercase">
                  IP Allocation
                </p>
                <p className="text-zinc-300 font-mono text-xs tracking-wider mt-2 truncate">
                  {(isDeviceOnline && data?.ipAddress) || "No Network"}
                </p>
              </div>

              {/* 6. System Uptime Log Card */}
              <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/50 flex flex-col justify-between transition-colors hover:border-zinc-800">
                <p className="text-zinc-500 font-mono tracking-wider text-[10px] uppercase">
                  Node Uptime
                </p>
                <p className="text-zinc-100 font-mono text-sm font-bold mt-2 truncate">
                  {isDeviceOnline ? (
                    <>
                      {uptimeHours}
                      {":"}
                      {uptimeMinutes}
                      {":"}
                      {uptimeSeconds}{" "}
                    </>
                  ) : (
                    <span className="text-zinc-300 font-mono text-xs tracking-wider mt-2 truncate">
                      Device Offline
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout Container (Stacked Sections) */}
      {isDeviceOnline ? (
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
      ) : (
        <div className="flex flex-col items-center justify-center min-h-80 w-full p-6 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/40 backdrop-blur-xs text-center">
          {/* Technical Icon / Visual Anchor */}
          <div className="relative flex items-center justify-center w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 mb-4 animate-pulse">
            <Cpu className="w-5 h-5 stroke-[1.5]" />
            <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-zinc-500 ring-2 ring-zinc-950 animate-ping" />
          </div>

          {/* Main Message */}
          <h3 className="text-zinc-200 font-mono text-sm font-bold tracking-wider uppercase mb-1">
            No Live Telemetry
          </h3>

          {/* Description & Animated Connection Indicator */}
          <p className=" mt-1 text-zinc-500 font-mono text-xs sm:text-sm tracking-wide select-none animate-pulse">
            Data will load once device is online
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
