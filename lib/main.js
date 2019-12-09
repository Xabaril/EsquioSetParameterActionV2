"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const url = require("url");
const https = require('https');
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const esquioUrl = core.getInput('esquioUrl');
            const esquioApiKey = core.getInput('esquioApiKey');
            const productName = core.getInput('productName');
            const featureName = core.getInput('featureName');
            const toggleType = core.getInput('toggleType');
            const parameterName = core.getInput('parameterName');
            const parameterValue = core.getInput('value');
            yield setToggleParameter(url.parse(esquioUrl), esquioApiKey, productName, featureName, toggleType, parameterName, parameterValue);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
function setToggleParameter(esquioUrl, esquioApiKey, productName, featureName, toggleType, parameterName, parameterValue) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            hostname: esquioUrl.host,
            path: `/api/toggles/parameters`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': esquioApiKey
            }
        };
        var postData = JSON.stringify({
            "ProductName": productName,
            "FeatureName": featureName,
            "ToggleType": toggleType,
            "Name": parameterName,
            "Value": parameterValue
        });
        const req = https.request(options, (res) => {
            if (res.statusCode === 200) {
                console.log('Set toggle parameter succesful');
            }
            res.on('data', (data) => {
                if (res.statusCode != 200) {
                    const responseData = JSON.parse(data);
                    core.setFailed(`Error set toggle parameter ${responseData.detail} HttpCode: ${res.statusCode}`);
                }
            });
        });
        req.on('error', (error) => {
            core.setFailed(error);
        });
        req.write(postData);
        req.end();
    });
}
run();
