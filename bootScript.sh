#!/bin/bash

# Runs:
# 1. React front end dashboard
# 2. Express Web Server
# 3. MqttToHttp Bridge subscribe topic script

# Wait for network connectivity first
while ! ping -c 1 -W 1 8.8.8.8; do
    echo "Waiting for internet connection..."
    # Try again every 5 seconds
    sleep 5
done

# Remove and recreate logs directory
if [-d "/home/pi/Documents/logs"]
then
  echo "Removing logs directory as it exists..."
  rm -rf /home/pi/Documents/logs
fi
echo "Creating new logs directory"
mkdir -p /home/pi/Documents/logs
# Touch log files
echo "Creating log files"
touch /home/pi/Documents/logs/server.log
touch /home/pi/Documents/logs/dashboard.log
touch /home/pi/Documents/logs/mqttBridge.log

# Run the http express server
# Running on port 10131
echo "Running express http server"
/usr/local/bin/npm start --prefix /home/pi/Documents/homeAutomation/server > /home/pi/Documents/logs/server.log 2>&1 &

# Run the React front end dashboard
# Running on port 10130
echo "Running react dashboard"
/usr/bin/python3 -m http.server 10130 --directory /home/pi/Documents/homeAutomation/dashboard/build/ > /home/pi/Documents/logs/dashboard.log 2>&1 &

# Run the mqtt to http bridge
echo "Running mqtt bridge script"
/usr/bin/python3 /home/pi/Documents/homeAutomation/mqttToHttpBridge/mqttToHttp.py > /home/pi/Documents/logs/mqttBridge.log 2>&1 &