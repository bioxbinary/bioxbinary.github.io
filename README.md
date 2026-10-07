# Bioxbinary — Think Binary. Build Bio.

> **Where code evolves into care, and biology meets intelligence.**  
> An independent deep-tech lab exploring the intersection of embedded microcontrollers, edge AI, and assistive biotechnology — with hardware, firmware, and research shared openly.

[![Live Site](https://img.shields.io/badge/website-www.bioxbinary.in-c9a87a?style=flat-square)](https://www.bioxbinary.in)
[![License: MIT](https://img.shields.io/badge/License-MIT-89b482?style=flat-square)](LICENSE)
[![Architecture: Local--First](https://img.shields.io/badge/Architecture-Local--First-7daea3?style=flat-square)](https://www.bioxbinary.in#architecture)
[![Independent Lab](https://img.shields.io/badge/Lab-Independent-d8a657?style=flat-square)](https://www.bioxbinary.in/about.html)

---

## Mission

Bioxbinary is dedicated to creating accessible, local-first assistive technologies that empower individuals with disabilities and older adults to lead independent, dignified lives. 

We pair the deterministic logic of binary computing with the complex realities of human health, ensuring that assistive tools:
- **Operate 100% offline**: Zero reliance on fragile third-party cloud infrastructure.
- **Safeguard patient privacy**: Biometric and medication telemetry remains on local networks.
- **Remain fully open**: Permissive open-source hardware schematics, 3D CAD files, and firmware.

---

## Featured Physical Build: DoseXTrack

[**DoseXTrack**](https://www.bioxbinary.in#hardware) is an active, open-source medication monitoring system engineered for vulnerable patients managing strict daily schedules.

### Architecture Highlights
- **Microcontroller**: ESP32 dual-core running FreeRTOS and ESP-IDF.
- **Local Message Bus**: Mosquitto MQTT broker with QoS 1 guaranteed delivery.
- **Real-Time Interface**: Lightweight browser dashboard connected over local WebSockets.
- **Fail-Safe Mechanism**: Non-volatile EEPROM dose queue storage with hardware RTC timers.
- **Industrial Design**: 3D-printable PETG housing with tactile confirmation switch and multi-stage status LEDs.

```
+--------------------------------------------------------------------+
|                         Bioxbinary Architecture                    |
|                                                                    |
|  [ESP32 Hardware Node]                                             |
|        │                                                           |
|        ▼ (GPIO / I2C / PWM Servos)                                 |
|  [FreeRTOS Firmware Loop]                                          |
|        │                                                           |
|        ▼ (MQTT QoS 1 / TLS 1.3)                                    |
|  [Local Mosquitto Broker] <─── WebSocket ───> [Caregiver Dashboard]|
|        │                                                           |
|        ▼ (On-Device Inference)                                     |
|  [Edge Anomaly Flagging]                                           |
+--------------------------------------------------------------------+
```

---

## Research Divisions

1. **Assistive HealthTech**: Smart medication dispensers, adaptive mobility aids, and sensory augmentation systems.
2. **Edge AI Systems**: Ultra-low-power quantized anomaly detection and sensor fusion operating directly on-device.
3. **AgriTech & Hydroponics**: Automated closed-loop EC/pH nutrient dosing and environmental micro-climate controllers.
4. **Bioethics-Coded Intelligence**: Local data sovereignty, transparent open-source code, and human-in-the-loop safety.

---

## How the Lab Works

Bioxbinary is a small, one-person lab with an AI-assisted workflow:
- **AI-Assisted**: AI tools help draft firmware, documentation, and research notes.
- **Hands-On**: Prototyping, soldering, bench testing, and safety checks are done by hand.

---

## Connect & Collaborate

- **Website**: [www.bioxbinary.in](https://www.bioxbinary.in)
- **GitHub**: [github.com/bioxbinary](https://github.com/bioxbinary)
- **Email**: [hello@bioxbinary.in](mailto:hello@bioxbinary.in)
- **X / Twitter**: [@bioxbinary](https://x.com/bioxbinary)
- **Instagram**: [@bioxbinary](https://instagram.com/bioxbinary)
- **YouTube**: [@bioxbinary](https://youtube.com/@bioxbinary)

---

*© 2026 Bioxbinary. Built for human independence.*
