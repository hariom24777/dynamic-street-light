// Central Repository for ECE Final Year Major Project Meta-Information
export const PROJECT_DETAILS = {
  title: "Dynamic Street Light System",
  domain: "Embedded Systems & Wireless Telemetry Networks",
  abstract: [
    "Street lighting systems are one of the major consumers of electrical energy in urban and rural environments. Conventional street lighting systems operate continuously throughout the night regardless of traffic density, resulting in excessive energy consumption and increased operational costs. To overcome these challenges, this project presents a Dynamic Street Light Based on Movement using IoT and sensor-based automation.",
    "The proposed system uses an ESP8266 NodeMCU microcontroller integrated with IR sensors and an LDR sensor. The LDR detects ambient light conditions and activates the system during nighttime, while IR sensors detect movement and control the corresponding street lights dynamically. LEDs are used as street lights and are activated only when movement is detected in the respective zone.",
    "The system is connected to Firebase Realtime Database for real-time monitoring and data synchronization. A web-based dashboard developed using React.js provides live monitoring of sensor status, LED activity, energy consumption analytics, and system performance.The developed system significantly reduces unnecessary power consumption, increases energy efficiency, and demonstrates an effective approach toward smart city infrastructure and intelligent automation.",
  ],
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
  hod: {
    name: "Dr. Shalini Sahay",
    designation: "Head of Department",
    department: "Electronics & Communication Engineering",
  },
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
