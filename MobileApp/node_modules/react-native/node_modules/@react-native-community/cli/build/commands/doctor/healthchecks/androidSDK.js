"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

var _common = require("./common");

var _versionRanges = _interopRequireDefault(require("../versionRanges"));

var _checkInstallation = require("../checkInstallation");

function _execa() {
  const data = _interopRequireDefault(require("execa"));

  _execa = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const installMessage = `Read more about how to update Android SDK at ${_chalk().default.dim('https://developer.android.com/studio')}`;
var _default = {
  label: 'Android SDK',
  description: 'Required for building and installing your app on Android',
  getDiagnostics: async ({
    SDKs
  }) => {
    let sdks = SDKs['Android SDK']; // This is a workaround for envinfo's Android SDK check not working on
    // Windows. This can be removed when envinfo fixes it.
    // See the PR: https://github.com/tabrindle/envinfo/pull/119

    if (sdks === 'Not Found' && process.platform !== 'darwin') {
      try {
        const {
          stdout
        } = await (0, _execa().default)(process.env.ANDROID_HOME ? `${process.env.ANDROID_HOME}/tools/bin/sdkmanager` : 'sdkmanager', ['--list']);
        const matches = [];
        const regex = /build-tools;([\d|.]+)[\S\s]/g;
        let match = null;

        while ((match = regex.exec(stdout)) !== null) {
          if (match) {
            matches.push(match[1]);
          }
        }

        if (matches.length > 0) {
          sdks = {
            'Build Tools': matches,
            'API Levels': 'Not Found',
            'Android NDK': 'Not Found',
            'System Images': 'Not Found'
          };
        }
      } catch (_unused) {}
    }

    const version = sdks === 'Not Found' ? sdks : sdks['Build Tools'][0];
    return {
      version,
      versionRange: _versionRanges.default.ANDROID_SDK,
      needsToBeFixed: sdks === 'Not Found' || (0, _checkInstallation.doesSoftwareNeedToBeFixed)({
        version,
        versionRange: _versionRanges.default.ANDROID_SDK
      })
    };
  },
  runAutomaticFix: async ({
    loader,
    environmentInfo
  }) => {
    const version = environmentInfo.SDKs['Android SDK'];
    const isSDKInstalled = version !== 'Not Found';
    loader.fail();

    if (isSDKInstalled) {
      return (0, _common.logManualInstallation)({
        message: installMessage
      });
    }

    return (0, _common.logManualInstallation)({
      healthcheck: 'Android SDK',
      url: 'https://facebook.github.io/react-native/docs/getting-started'
    });
  }
};
exports.default = _default;