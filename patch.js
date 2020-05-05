// https://github.com/typeorm/typeorm/issues/2158

const replace = require('replace')

replace({
  regex: 'import { ReactNativeDriver } from "./react-native/ReactNativeDriver";',
  replacement: '',
  paths: ['node_modules/typeorm/browser/driver/DriverFactory.js']
})
replace({
  regex: 'case "react-native":',
  replacement: '',
  paths: ['node_modules/typeorm/browser/driver/DriverFactory.js']
})
replace({
  regex: 'return new ReactNativeDriver\\(connection\\);',
  replacement: '',
  paths: ['node_modules/typeorm/browser/driver/DriverFactory.js']
})
