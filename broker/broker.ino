/*
 * ESP8266 Home MQTT Broker
 */

#include <ESP8266WiFi.h>
// Web server
#include <ESP8266WebServer.h>
// MQTT Broker Lib
#include "uMQTTBroker.h"

// Create the web server  
ESP8266WebServer server(80); 

// Assume max 10 clients
#define MAX_CLIENTS 5
String listOfClients;
String dataString;

char ssid[] = "Belong3D3DC4";      
char pass[] = "tkab4pau6uqx";

class myMQTTBroker: public uMQTTBroker {
  public:
    virtual bool onConnect(IPAddress addr, uint16_t client_count) {
      Serial.println(addr.toString()+" connected");
      return true;
    }

    virtual void onDisconnect(IPAddress addr, String client_id) {
      Serial.println(addr.toString()+" ("+client_id+") disconnected");
    }

    virtual bool onAuth(String username, String password, String client_id) {
      Serial.println("Username/Password/ClientId: "+username+"/"+password+"/"+client_id);
      return true;
    }
    
    virtual void onData(String topic, const char *data, uint32_t length) {
      dataString = "";
      char data_str[length+1];
      os_memcpy(data_str, data, length);
      data_str[length] = '\0';
      Serial.println("received topic '"+topic+"' with data '"+(String)data_str+"'");
      dataString += "Topic: ";
      dataString += topic;
      dataString += "\nData: ";
      dataString += (String)data_str;
      dataString += "\n";
    }

    // Sample for the usage of the client info methods
    virtual void printClients() {
      listOfClients = "";
      for (int i = 0; i < getClientCount(); i++) {
        IPAddress addr;
        String client_id;
        getClientAddr(i, addr);
        getClientId(i, client_id);
        Serial.println("Client "+client_id+" on addr: "+addr.toString());

        if (listOfClients.length() > 0) {
          listOfClients += ", " + addr.toString();
        }
        else {
          listOfClients += addr.toString();
        }
      }
    }
};

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

void handleRoot() {
  String valueToPost = "Client List: ";
  valueToPost += listOfClients + "\n\n";
  valueToPost += "Messages: \n";
  valueToPost +=  dataString;
  server.send(200, "text/plain",  valueToPost ); 
}

myMQTTBroker myBroker;

void setup(){
  Serial.begin(115200);
  Serial.println();

  // Start WiFi
  startWiFiClient();

  // Start the broker
  Serial.println("Starting MQTT broker");
  myBroker.init();
  // Subscribe to all topics
  myBroker.subscribe("#");
  
  // After Broker Setup, run the webserver
  server.on("/", handleRoot);           
  server.begin();                          

}

void loop(){

  Serial.println("Connected clients are: ");
  // Print all connected clients
  myBroker.printClients();
  // Handle HTTP Requests
  server.handleClient();
  // wait a second
  delay(500);
}
