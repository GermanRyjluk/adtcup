// withFirebaseModularHeaders.js
const { withCocoaPods } = require("@expo/config-plugins");

// This plugin modifies the Podfile to include `use_modular_headers!`
function withFirebaseModularHeaders(config) {
  return withCocoaPods(config, (config) => {
    // Insert use_modular_headers! right after the existing `use_frameworks!` line
    config.modResults.contents = config.modResults.contents.replace(
      "use_frameworks!",
      `use_frameworks! :linkage => :static\nuse_modular_headers!`
    );

    return config;
  });
}

module.exports = withFirebaseModularHeaders;
