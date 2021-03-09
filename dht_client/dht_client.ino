/*
 * ESP8266 Home MQTT Broker
 */

#define LED_IN  D6
int STATE = 0;

#include "DHT.h"
#define DHT_PIN   D2
DHT dhtInstance(DHT_PIN, DHT11, 1);

#include <ESP8266WiFi.h>
#include <PubSubClient.h>

char ssid[] = "Belong3D3DC4";      
char pass[] = "tkab4pau6uqx";

const char* mqtt_broker = "10.0.0.36";

WiFiClient espClient;
PubSubClient client(espClient);

unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE	(50)
char msg[MSG_BUFFER_SIZE];
int value = 0;

void startWiFiClient(){
    Serial.println("Connecting to "+(String)ssid);
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, pass);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: " + WiFi.localIP().toString());
}

void callback(char* topic, byte* payload, unsigned int length) {
    Serial.print("Message arrived [");
    Serial.print(topic);
    Serial.print("] ");
    for (int i=0;i<length;i++) {
        Serial.print((char)payload[i]);
    }
    if (!strcmp(topic, "led_outside")){
        Serial.println("Do the led toggle");
        Serial.println();
        // Toggle LED with MQTT
        STATE = STATE^1;
        digitalWrite(LED_IN, STATE); 
        Serial.println((String)STATE);
    }
}

void reconnect() {
    // Loop until we're reconnected
    while (!client.connected()) {
        Serial.print("Attempting MQTT connection...");
        String clientId = "ESP8266Client-DHT";
        // Attempt to connect
        if (client.connect(clientId.c_str())) {
            Serial.println("connected");
            // Once connected, publish an announcement...
            client.publish("status", "weather_alive");
            // Susbcribe to led 
            client.subscribe("led_outside");
        } else {
            // Wait 5 seconds before retrying
            delay(5000);
        }
    }
}

void setup(){
    pinMode(LED_IN, OUTPUT);    

    Serial.begin(115200);
    Serial.println();

    // Start WiFi
    startWiFiClient();     

    // Connect to the MQTT Broker
    client.setServer(mqtt_broker, 1883);     
    client.setCallback(callback);               
}

void loop(){
    if (!client.connected()) {
        reconnect();
    }
    client.loop();

    // Get valueof temp and humidity
    // force read
    float tempData  = dhtInstance.readTemperature(false, false);
    float humidData = dhtInstance.readHumidity(false);

    unsigned long now = millis();
    // Post every 10 seconds
    if (now - lastMsg > 10000) {
        lastMsg = now;
        snprintf(msg, MSG_BUFFER_SIZE, "temp: %3.3f, humid: %3.3f", tempData, humidData);
        client.publish("outside", msg);
    }
}
