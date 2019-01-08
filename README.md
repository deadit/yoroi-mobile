# Development

## Installation

### Both platforms

```
# install rustup
curl https://sh.rustup.rs -sSf | sh

# use nightly version
rustup toolchain install nightly
rustup install nightly-2018-06-05
rustup target add wasm32-unknown-unknown --toolchain nightly
```

### ios

Install cocoapods and download ios dependencies:

```
gem install cocoapods
cd ios && pod install
```

Copy your `GoogleService-Info.plist` to `ios/emurgo/` to enable Crashlytics.

Setup React Native third-party libraries:
```
node_modules/react-native/scripts/ios-install-third-party.sh
node_modules/react-native/third-party/glog-0.3.5/configure
```

### android

```
# install android
follow https://facebook.github.io/react-native/docs/getting-started.html (tab Building Projects with Native Code)
```

### First time

1. `yarn install`
2. `yarn setup_configs` - links libraries to ios testnet build configurations

### Every time

1. `react-native start` - this will run RN packager, let it running
2. `react-native run-android --variant=devDebug` - for version with testnet
3. `react-native run-android --variant=mainDebug` - for version with mainnet

4. `react-native run-ios --scheme=emurgo-staging --configuration=Staging.Debug` - staging (testnet) configuration
5. `react-native run-ios --scheme=emurgo --configuration=Debug` - production configuration

### Release

1. `cd android`
2. `./gradlew assemblemainRelease`

# Code style

## Imports

The imports should be in this order:

1. import of external libraries
2. import of our custom code
3. import of component styles
4. import of types

Example:

```js
// @flow

// external libraries
import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {View} from 'react-native'

// our code
import Screen from '../../components/Screen'
import AdaIcon from '../../assets/AdaIcon'
import {confirmationsToAssuranceLevel, printAda} from '../../helpers/utils'

// styles
import styles from './TxDetails.style'

// types
import type {NavigationScreenProp, NavigationState} from 'react-navigation'
import type {TransactionType} from '../../types/HistoryTransaction'
```

## Styles

- If you use component in multiple screens, it should be in `UiKit` folder with other UI components and imported from it.
- Each component file has own file with styles.
- Don't import multiple style files into one component.
- Keep the style's structure flat.
- If there is same component in `UiKit` as in `react-native`, use the one from `UiKit`.

```js
// src/components/UiKit/index.js
// Example of export for a default component that can be imported from UI.
export {default as Button} from './Button'
```

```js
import {Text, Button, Input} from '../UiKit'

// ...
```

### Variables

```js
import {colors} from './config'

// Wrong
// The background color can change, gray is constant name for specific color.
background: colors.GRAY
// ...

// Good
// Changing the background color doesn't require to change the name.
// We want to change values, not labels most of time.
background: colors.background
// ...
```
