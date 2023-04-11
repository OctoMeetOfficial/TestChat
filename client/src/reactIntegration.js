import React from "react";
import SDK from "./SDK";

// React Integration
function ReactIntegration() {
  function connectionListener(response) {
    if (response.status === "CONNECTED") {
      console.log("Connection Established");
    } else if (response.status === "DISCONNECTED") {
      console.log("Disconnected");
    }
  }
  // Initialize SDK
  const initSDK = async () => {
    const initializeObj = {
      apiBaseUrl: `https://api-preprod-sandbox.mirrorfly.com/api/v1`,
      licenseKey: `7CLjsomc3zXoMQ7Jq11IEOkyt83Yul`,
      isTrialLicenseKey: `TRIAL_MODE`,
      callbackListeners: { connectionListener },
    };

    let initSDKResponse = await SDK.initializeSDK(initializeObj);
    console.log("initSDKResponse", initSDKResponse);
  };

  let userName = "";
  let password = "";

  // Register new user
  const registerUser = async () => {
    let userRegisteration = await SDK.register(`8985454546`); //123456789
    console.log(userRegisteration);
    userName = userRegisteration.data.username;
    password = userRegisteration.data.password;
  };

  // Login user
  const userLogin = async () => {
    let login = await SDK.connect(userName, password);
    console.log(login);
  };
  //SEND TEXT MESSAGE
  const textMessage = async () => {
    let msg = "Message from Integration"
    let toUserJid = SDK.getJid(`8985454546`)
    let textMsg = await SDK.sendTextMessage(toUserJid, msg);
    console.log(textMsg);

  //Button For Operations
  return (
    <div>
      <button onClick={initSDK}>InittialzeSDK</button>
      <div>
        <p>Register New user:</p>
        <button onClick={registerUser}>Register</button>
      </div>

      <div>
        <p>Login:</p>
        <button onClick={() => userLogin(userName, password)}>Login</button>
      </div>
    </div>
  );
}

export default ReactIntegration;
