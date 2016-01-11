# Sample App for angular-rtcomm
This is a sample project that showcases some of the features of the [angular-rtcomm](https://github.com/WASdev/lib.angular-rtcomm/) framework.

To use this sample you'll need to install [Node.js](https://nodejs.org/en/).

## To Run
Clone the sample.

```
git clone git@github.rtp.raleigh.ibm.com:jfmartin-us/sample.angular-rtcomm.git
```

Change directory, install dependencies and run.

```
cd sample.angular-rtcomm
npm install
npm start
```

Access the app at [http://localhost:3000](http://localhost:3000). Open multiple tabs and start video chatting! If you want to chat with other people, try deploying it to [Bluemix](https://bluemix.net).

## Testing
The sample comes with a built in test to verify the functionality. If you want to run the test:
1. Start up the app :`npm start`
2. Open a separate tab and run the test script:`npm test`

By default it will use **chrome** to run the tests, if you want to run the tests in **firefox** define the environment variable:
```
BROWSER=firefox npm test
```
## Deploy To Bluemix
If you're looking to use the sample on a live server, you can easily deploy it to Bluemix:
