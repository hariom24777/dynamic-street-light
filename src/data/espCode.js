export const espCode = `#include <ESP8266WiFi.h>
#include <Firebase_ESP_Client.h>
#include <time.h>
#include "addons/TokenHelper.h"

//  WIFI 

#define WIFI_SSID "wifi_ssid"
#define WIFI_PASSWORD "wifi_password"

//  FIREBASE 

#define API_KEY "api_key"
#define DATABASE_URL "database_url"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
bool signupOK = false;


// Pins

// IR Sensors
const int ir1 = D1;
const int ir2 = D2;
const int ir3 = D5;

// LEDs
const int led1 = D7;
const int led2 = D6;
const int led3 = D0;

// LDR
const int ldrPin = A0;


// Timer Variables

unsigned long led1Timer = 0;
unsigned long led2Timer = 0;
unsigned long led3Timer = 0;
unsigned long led1OnTime = 0;
unsigned long led2OnTime = 0;
unsigned long led3OnTime = 0;
unsigned long previousMillis = 0;
const unsigned long ON_TIME = 5000;


// Firebase Timer

unsigned long firebaseTimer = 0;
const unsigned long firebaseInterval = 3000;


void setup()
{
    Serial.begin(115200);

    //  IR Inputs 
    pinMode(ir1, INPUT);
    pinMode(ir2, INPUT);
    pinMode(ir3, INPUT);

    //  LED Outputs 
    pinMode(led1, OUTPUT);
    pinMode(led2, OUTPUT);
    pinMode(led3, OUTPUT);

    //  LEDs OFF 
    digitalWrite(led1, LOW);
    digitalWrite(led2, LOW);
    digitalWrite(led3, LOW);

    // WIFI
    WiFi.mode(WIFI_STA);
    WiFi.disconnect();
    delay(1000);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to WiFi");

    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(500);
    }

    Serial.println();
    Serial.println("WiFi Connected");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
    configTime(0, 0, "pool.ntp.org");

    while (time(nullptr) < 100000) {
        Serial.println("Waiting for NTP time...");
        delay(1000);
    }
    Serial.println("Time Synced");


    // Firebase

    config.api_key = API_KEY;
    config.database_url = DATABASE_URL;
    config.token_status_callback = tokenStatusCallback;
    if (Firebase.signUp(&config, &auth, "", ""))
    {
        Serial.println("Firebase SignUp OK");
        signupOK = true;
    }
    else
    {
        Serial.printf(
            "Firebase SignUp Failed: ",
            config.signer.signupError.message.c_str());
    }

    Firebase.begin(&config, &auth);
    Firebase.reconnectWiFi(true);
    previousMillis = millis();
}

void loop()
{
    unsigned long currentMillis = millis();
    unsigned long deltaTime = currentMillis - previousMillis;
    previousMillis = currentMillis;

    // Read LDR
    int ldrValue = analogRead(ldrPin);

    // DARK = HIGH VALUE
    bool isNight = ldrValue > 500;

    // Read IR Sensors
    // LOW = DETECTED
    bool s1 = !digitalRead(ir1);
    bool s2 = !digitalRead(ir2);
    bool s3 = !digitalRead(ir3);
    unsigned long currentTime = millis();

    // Night Mode
    if (isNight)
    {
        //  LED1

        if (s1)
        {
            digitalWrite(led1, HIGH);
            led1Timer = currentTime;
        }

        if (currentTime - led1Timer >= ON_TIME)
        {
            digitalWrite(led1, LOW);
        }

        //  LED2 

        if (s2)
        {
            digitalWrite(led2, HIGH);
            led2Timer = currentTime;
        }

        if (currentTime - led2Timer >= ON_TIME)
        {
            digitalWrite(led2, LOW);
        }

        //  LED3 

        if (s3)
        {
            digitalWrite(led3, HIGH);
            led3Timer = currentTime;
        }

        if (currentTime - led3Timer >= ON_TIME)
        {
            digitalWrite(led3, LOW);
        }
    }
    else
    {
        //  Day Mode 

        digitalWrite(led1, LOW);
        digitalWrite(led2, LOW);
        digitalWrite(led3, LOW);
    }

    // LED RUNTIME TRACKING

    if (digitalRead(led1))
    {
        led1OnTime += deltaTime;
    }

    if (digitalRead(led2))
    {
        led2OnTime += deltaTime;
    }

    if (digitalRead(led3))
    {
        led3OnTime += deltaTime;
    }

    // SERIAL MONITOR

    Serial.println("----------- DATA -----------");

    Serial.print("LDR: ");
    Serial.println(ldrValue);

    Serial.print("Night Mode: ");
    Serial.println(isNight);

    Serial.print("IR1: ");
    Serial.println(s1);

    Serial.print("IR2: ");
    Serial.println(s2);

    Serial.print("IR3: ");
    Serial.println(s3);

    Serial.print("LED1: ");
    Serial.println(digitalRead(led1));

    Serial.print("LED2: ");
    Serial.println(digitalRead(led2));

    Serial.print("LED3: ");
    Serial.println(digitalRead(led3));

    Serial.println("----------------------------");

    // FIREBASE UPDATE

    if (
        Firebase.ready() &&
        signupOK &&
        millis() - firebaseTimer >= firebaseInterval)
    {

        firebaseTimer = millis();
        FirebaseJson json;

        // Sensor Data
        json.set("ldr", ldrValue);
        json.set("isNight", isNight);
        json.set("ir1", s1);
        json.set("ir2", s2);
        json.set("ir3", s3);

        // LED Status
        json.set("led1", digitalRead(led1));
        json.set("led2", digitalRead(led2));
        json.set("led3", digitalRead(led3));

        // DEVICE STATUS

        json.set(
            "ipAddress",
            WiFi.localIP().toString());

        json.set(
            "wifiSignal",
            WiFi.RSSI());

        json.set(
            "device",
            "ESP8266 NodeMCU");

        json.set(
            "uptime",
            millis() / 1000);

        json.set(
            "led1Runtime",
            led1OnTime);

        json.set(
            "led2Runtime",
            led2OnTime);

        json.set(
            "led3Runtime",
            led3OnTime);

        // json.set("timestamp", millis());

        time_t now = time(nullptr);

        json.set(
            "lastUpdate",
            now);

        bool success = Firebase.RTDB.setJSON(
            &fbdo,
            "/streetlights/liveData",
            &json);

        if (success)
        {
            Serial.println("Firebase Updated");
        }
        else
        {
            Serial.println("Firebase Failed");
            Serial.println(fbdo.errorReason());
        }
    }
    // delay(100);
}`;
