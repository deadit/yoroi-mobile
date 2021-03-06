// @flow

import React from 'react'
import {connect} from 'react-redux'
import {View} from 'react-native'
import {SafeAreaView} from 'react-navigation'
import {compose} from 'redux'
import {withHandlers} from 'recompose'
import {injectIntl, defineMessages} from 'react-intl'

import WalletDescription from './WalletDescription'
import {Button, StatusBar, ScreenBackground} from '../UiKit'
// uses same styles as WalletInitScreen
import styles from './styles/WalletInitScreen.style'
import {WALLET_INIT_ROUTES} from '../../RoutesList'
import {walletIsInitializedSelector} from '../../selectors'
import {
  NETWORK_REGISTRY,
  WALLET_IMPLEMENTATION_REGISTRY,
} from '../../config/types'
import {NETWORKS} from '../../config/networks'

import type {State} from '../../state'
import type {Navigation} from '../../types/navigation'
import type {NetworkId, WalletImplementationId} from '../../config/types'

const messages = defineMessages({
  addWalletButton: {
    id: 'components.walletinit.walletfreshinitscreen.addWalletButton',
    defaultMessage: '!!!Add wallet',
  },
  addWalletOnShelleyButton: {
    id: 'components.walletinit.walletfreshinitscreen.addWalletOnShelleyButton',
    defaultMessage: '!!!Add wallet (Shelley Testnet)',
  },
})

type Props = {|
  intl: any,
  walletIsInitialized: boolean,
  navigation: Navigation,
  navigateInitWallet: (Object, NetworkId, WalletImplementationId) => mixed,
|}

const WalletInitScreen = ({
  intl,
  walletIsInitialized,
  navigation,
  navigateInitWallet,
}: Props) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar type="dark" />

      <ScreenBackground>
        <View style={styles.container}>
          <View style={styles.content}>
            <WalletDescription />
          </View>
          <Button
            onPress={(event) =>
              navigateInitWallet(
                event,
                NETWORK_REGISTRY.HASKELL_SHELLEY,
                WALLET_IMPLEMENTATION_REGISTRY.HASKELL_SHELLEY,
              )
            }
            title={`${intl.formatMessage(
              messages.addWalletButton,
            )} (Shelley-era)`}
            style={styles.createButton}
            testID="addWalletOnHaskellShelleyButton"
          />

          <Button
            onPress={(event) =>
              navigateInitWallet(
                event,
                NETWORK_REGISTRY.HASKELL_SHELLEY,
                WALLET_IMPLEMENTATION_REGISTRY.HASKELL_BYRON,
              )
            }
            title={`${intl.formatMessage(
              messages.addWalletButton,
            )} (Byron-era)`}
            outline
            style={styles.createButton}
            testID="addWalletOnByronButton"
          />

          {NETWORKS.JORMUNGANDR.ENABLED && (
            <Button
              outline
              onPress={(event) =>
                navigateInitWallet(
                  event,
                  NETWORK_REGISTRY.JORMUNGANDR,
                  WALLET_IMPLEMENTATION_REGISTRY.JORMUNGANDR_ITN,
                )
              }
              title={intl.formatMessage(messages.addWalletOnShelleyButton)}
              testID="addWalletOnShelleyButton"
            />
          )}
        </View>
      </ScreenBackground>
    </SafeAreaView>
  )
}
export default injectIntl(
  compose(
    connect((state: State) => ({
      walletIsInitialized: walletIsInitializedSelector(state),
    })),
    withHandlers({
      navigateInitWallet: ({navigation}) => (
        event: Object,
        networkId: NetworkId,
        walletImplementationId: WalletImplementationId,
      ) =>
        navigation.navigate(WALLET_INIT_ROUTES.CREATE_RESTORE_SWITCH, {
          networkId,
          walletImplementationId,
        }),
    }),
  )(WalletInitScreen),
)
