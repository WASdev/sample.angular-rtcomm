# Install Mosca on Bluemix

This app runs inside a nodejs Blumeix app.  It servers the default 'videoClient' for testing/validation purposes.

## Install Locally

1. Clone the app ` git clone git@github.rtp.raleigh.ibm.com:swgraham-us/moscamqtt.git`
2. Run `npm install` to install the app's dependencies
3. Run `npm start` to start the app
4. Access the running app in a browser at http://localhost:6001

## Update video Client (Optional)

1.  Grab the release zip file from here:  [lib.rtcomm.clientjs](https://github.com/WASdev/lib.rtcomm.clientjs/releases/latest)
2.  Change to the app directory `cd moscamqtt`  
3.  Unzip the relase file: `unzip lib.rtcomm.clientjs-sample-<someversion>.zip`
4.  Copy files into `./public` : `cp -r lib.rtcomm.clientjs-sample-<someversion>/* ./public`

TODO:  Automate the above, some stuff will still not work[ diff the videoClient.html/videoClient-adv.html].

## Deploy to bluemix

This app deploys to 'mqtt4rtcomm'  This runs in the 'Org' WASdev

1.  Login to bluemix:  `cf login -o WASdev`
2.  push the app `cf push`
