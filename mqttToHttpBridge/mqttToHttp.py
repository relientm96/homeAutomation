import paho.mqtt.client as mqtt
from urllib import request, parse

def sendHttpRequest(data):
  # Send a post request to home automation server
  data = parse.urlencode(data).encode()
  req = request.Request("https://testingmqtt.free.beeceptor.com", data = data)
  resp = request.urlopen(req)

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
  print("Connected with result code " + str(rc))
  client.subscribe("#")

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
  print(msg.topic+" "+str(msg.payload))
  # Upon receiving message, we want to post a message to our local home automation HTTP server
  data = { "message": msg.payload.decode("utf-8") }
  sendHttpRequest(data)

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("localhost", 1883, 60)

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
client.loop_forever()


