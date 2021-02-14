# Home Automation System

* MQTT based home automation system consisting:
    * ESP8266 MQTT Broker.
    * ESP8266 MQTT Sensor Clients.
    * Node.js/Express.js/Typescript based home automation web server.

## Repository Structure
```
├── broker --> Code for ESP8266 MQTT Broker 
│   └── broker.ino
├── dht_client --> DHT Sensor Client using MQTT
│   └── dht_client.ino
└── server --> Home Automation Server
    ├── data
    ├── dist
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── src
    └── tsconfig.json
```