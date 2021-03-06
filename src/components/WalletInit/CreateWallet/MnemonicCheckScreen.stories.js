// @flow
import React from 'react'
import {storiesOf} from '@storybook/react-native'

import MnemonicCheckScreen from './MnemonicCheckScreen'
import {CONFIG} from '../../../config/config'

storiesOf('MnemonicCheckScreen', module).add('Default', ({navigation}) => {
  navigation.getParam = (param) => {
    switch (param) {
      case 'mnemonic':
        return CONFIG.DEBUG.MNEMONIC1
      case 'name':
        return CONFIG.DEBUG.WALLET_NAME
      case 'password':
        return CONFIG.DEBUG.PASSWORD
      case 'networkId':
        return CONFIG.NETWORKS.BYRON_MAINNET.NETWORK_ID
      default:
        return ''
    }
  }
  return <MnemonicCheckScreen navigation={navigation} />
})
