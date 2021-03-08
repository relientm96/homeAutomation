import datetime
import paho.mqtt.client as mqtt
from urllib import request, parse


def sendHttpRequest(data):
    # Send a post request to home automation server
    data = parse.urlencode(data).encode()
    req = request.Request("http://localhost:10131/", data=data)
    resp = request.urlopen(req)


def on_connect(client, userdata, flags, rc):
    # The callback for when the client receives a CONNACK response from the server.
    print("Connected with result code " + str(rc))
    client.subscribe("#")


def on_message(client, userdata, msg):
    # The callback for when a PUBLISH message is received from the server.
    print(msg.topic + " " + str(msg.payload))
    timeNow = datetime.datetime.now().isoformat()
    if "outside" in str(msg.topic):
        data = {"message": msg.payload.decode(
            "utf-8"), "timestamp": str(timeNow), "type": "weather"}
        sendHttpRequest(data)
    if "led" in str(msg.topic):
        data = {"message": msg.payload.decode(
            "utf-8"), "timestamp": str(timeNow), "type": "led"}
        sendHttpRequest(data)


# Start the mqtt http bridge program
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("localhost", 1883, 60)

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
client.loop_forever()
