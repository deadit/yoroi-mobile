package com.emurgo;

import android.app.Application;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
// import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
// import io.emurgo.chainlibs.ChainLibsPackage;
// import com.learnium.RNDeviceInfo.RNDeviceInfo;
// import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// import io.sentry.RNSentryPackage;
// import com.igorbelyayev.rnlocalresource.RNLocalResourcePackage;
// import org.devio.rn.splashscreen.SplashScreenReactPackage;
// import com.ocetnik.timer.BackgroundTimerPackage;
// import io.crossroad.rncardano.CardanoPackage;
// import org.reactnative.camera.RNCameraPackage;
// import com.bitgo.randombytes.RandomBytesPackage;
// import com.rnfs.RNFSPackage;
// import com.BV.LinearGradient.LinearGradientPackage;
// import com.horcrux.svg.SvgPackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {

      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new ChainLibsPackage());
      // packages.add(new CardanoPackage());
      packages.add(new KeyStorePackage());
      // packages.add(new ReactNativeConfigPackage());
      return packages;

        // new ChainLibsPackage(),
        // new RNDeviceInfo(),
        // new AsyncStoragePackage(),
        // new RNSentryPackage(),
        // new RNLocalResourcePackage(),
        // new ReactNativeConfigPackage(),
        // new SplashScreenReactPackage(),
        // new CardanoPackage(),
        // new RNCameraPackage(),
        // new RandomBytesPackage(),
        // new RNFSPackage(),
        // new LinearGradientPackage(),
        // new SvgPackage(),
        // new KeyStorePackage(),
        // new BackgroundTimerPackage()
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
