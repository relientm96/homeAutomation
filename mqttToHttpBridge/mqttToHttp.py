import datetime
import paho.mqtt.client as mqtt
from urllib import request, parse


def validateWeather(msg):
    if "nan" in msg or "Reconnected!" in msg:
        return False
    return True


def sendHttpRequest(data):
    # Send a post request of data from device to home automation server
    data = parse.urlencode(data).encode()
    req = request.Request("http://10.0.0.36:8080/server", data=data)
    resp = request.urlopen(req)


def sendHttpConnectionRequest(data):
    # Send a post request to home automation server when a device connects
    data = parse.urlencode(data).encode()
    req = request.Request("http://10.0.0.36:8080/server/devices", data=data)
    resp = request.urlopen(req)


def on_connect(client, userdata, flags, rc):
    # The callback for when the client receives a CONNACK response from the server.
    print("Connected with result code " + str(rc))
    client.subscribe("#")


def on_message(client, userdata, msg):
    # The callback for when a PUBLISH message is received from the server.
    print(msg.topic + " " + str(msg.payload))
    timeNow = datetime.datetime.now().isoformat()
    parsedMessage = msg.payload.decode("utf-8")
<<<<<<< HEAD
    if "status" in str(msg.topic):
        # This is the topic used to detect if device connection notifications
        deviceName = parsedMessage.split('_')[0]
        data = {"message": deviceName, "timestamp": str(timeNow)}
        sendHttpConnectionRequest(data)

=======
>>>>>>> 2f92c09f140c5604e3446d23cd02e625d792c507
    if "outside" in str(msg.topic):
        if validateWeather(parsedMessage):
            # Obtain temperature type
            tempValue = parsedMessage.split(',')[0].split(':')[1].strip()
            data = {"message": tempValue,
                    "timestamp": str(timeNow), "type": "temperature"}
            sendHttpRequest(data)
            # Repeat for humid type
            humidValue = parsedMessage.split(',')[1].split(':')[1].strip()
            data = {"message": humidValue,
                    "timestamp": str(timeNow), "type": "humidity"}
            sendHttpRequest(data)
    if "led" in str(msg.topic):
        data = {"message": parsedMessage,
                "timestamp": str(timeNow), "type": "led"}
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
