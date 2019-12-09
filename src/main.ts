import * as core from '@actions/core';
import url = require('url');
const https = require('https');

async function run() {
  try {
    const esquioUrl = core.getInput('esquioUrl');
    const esquioApiKey = core.getInput('esquioApiKey');
    const productName = core.getInput('productName');
    const featureName = core.getInput('featureName');
    const toggleType = core.getInput('toggleType');
    const parameterName = core.getInput('parameterName');
    const parameterValue = core.getInput('value');

    await setToggleParameter(url.parse(esquioUrl), esquioApiKey, productName, featureName, toggleType, parameterName, parameterValue);
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function setToggleParameter(esquioUrl: url.UrlWithStringQuery,
  esquioApiKey: string,
  productName: string,
  featureName: string,
  toggleType: string,
  parameterName: string,
  parameterValue: string) {

  const options = {
    hostname: esquioUrl.host,
    path: `/api/toggles/parameters`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': esquioApiKey
    }
  }

  var postData = JSON.stringify({
    "ProductName": productName,
    "FeatureName": featureName,
    "ToggleType": toggleType,
    "Name": parameterName,
    "Value": parameterValue
  });

  const req = https.request(options, (res: any) => {
    if (res.statusCode === 200) {
      console.log('Set toggle parameter succesful');
    }

    res.on('data', (data: any) => {
      if (res.statusCode != 200) {
        const responseData = JSON.parse(data);
        core.setFailed(`Error set toggle parameter ${responseData.detail} HttpCode: ${res.statusCode}`);
      }
    });
  });
  req.on('error', (error: any) => {
    core.setFailed(error);
  });

  req.write(postData);
  req.end();
}

run();
