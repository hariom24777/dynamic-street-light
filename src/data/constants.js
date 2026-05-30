// Central Repository for ECE Final Year Major Project Meta-Information
export const PROJECT_DETAILS = {
//   title: "IoT-Driven Smart Street Lighting Grid Architecture",
  title: "Dynamic Street Light System",
  domain: "Embedded Systems & Wireless Telemetry Networks",
  abstract:
    "This system implements an intelligent microcontroller topology designed to modulate power grid utilities using adaptive peripheral sensor arrays. By evaluating real-time atmospheric luminance via LDR modules and lane multi-vector presence through infrared detectors, the processing core selectively actuates light arrays, resulting in an empirical reduction of baseline energy overheads. Telemetry is streamed to a live database cluster for remote diagnostics and financial metrics analysis.",
  hardwareStack: [
    "ESP8266 / Node MCU Core",
    "Light Dependent Resistor (LDR)",
    "Infrared Motion Sensors",
    "Light Emitting Diodes",
    // "Continuous Runtime Hardware Matrix",
  ],
  softwareStack: [
    "JavaScript",
    "ReactJS Dashboard Core",
    "Tailwind CSS Layout Engine",
    "Firebase Realtime NoSQL Cluster Engine",
    "Arduino IDE / C++",
    "Vercel Hosting",
  ],
};

export const TEAM_DETAILS = [
  { id: 1, name: "Ajay Vishwakarma", enroll: "0133EC221003" },
  { id: 2, name: "Ajendra Sachan", enroll: "0133EC221004" },
  { id: 3, name: "Hariom Patidar", enroll: "0133EC221020" },
  { id: 4, name: "Mohd. Ibad Khan", enroll: "0133EC221031" },
];

export const FACULTY_DETAILS = {
  coordinator: {
    name: "Prof. Pramod Kumar",
    designation: "Senior Professor",
    department: "Electronics & Communication Engineering",
  },
  guide: {
    name: "Prof. Pankaj Dubey",
    designation: "Senior Professor",
    department: "Electronics & Communication Engineering",
  },
};
