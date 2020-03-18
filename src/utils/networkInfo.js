// @flow

import {Platform} from 'react-native'
import NetInfo from '@react-native-community/netinfo'

import {SubscriptionManager} from './subscription'

export type ConnectionInfo = {
  isOnline: boolean,
}

// https://github.com/facebook/react-native/issues/19039#issuecomment-386228738
// const _fetchConnectionInfo = (): Promise<any> => {
//   if (Platform.OS === 'ios') {
//     return new Promise((resolve, reject) => {
//       const handler = (info) => {
//         NetInfo.removeEventListener('connectionChange', handler)
//
//         resolve(info)
//       }
//
//       NetInfo.addEventListener('connectionChange', handler)
//     })
//   } else {
//     return NetInfo.getConnectionInfo()
//     return NetInfo.fetch()
//   }
// }
const _fetchConnectionInfo = (): Promise<any> => NetInfo.fetch()

// Hides native implementation details
const _facadeInfo = (info): ConnectionInfo => ({
  isOnline: info.type !== 'none' && info.type !== 'unknown',
})

let _latestInfo: ConnectionInfo = {
  isOnline: true,
}

const _subscriptions = new SubscriptionManager<ConnectionInfo>()

const _handleConnectionChange = (netInfo) => {
  const info = _facadeInfo(netInfo)
  _latestInfo = info
  _subscriptions.notify(_latestInfo)
}

NetInfo.addEventListener(_handleConnectionChange)
_fetchConnectionInfo().then(_handleConnectionChange)


export default {
  subscribe: _subscriptions.subscribe,
  getConnectionInfo: () => _latestInfo,
}
