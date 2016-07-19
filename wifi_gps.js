function linkwifi(){
		    var Context = plus.android.importClass("android.content.Context");
            var WifiManager = plus.android.importClass("android.net.wifi.WifiManager");
            var WifiConfiguration = plus.android.importClass("android.net.wifi.WifiConfiguration");
            var wifiManager = plus.android.runtimeMainActivity().getSystemService(Context.WIFI_SERVICE);
            var List = plus.android.importClass("java.util.List");
            var ArrayList = plus.android.importClass("java.util.ArrayList");
            var ScanResult = plus.android.importClass("android.net.wifi.ScanResult");
            var wifis = new ArrayList();
            wifis = wifiManager.getScanResults();
            if (!wifiManager.isWifiEnabled()) {
                wifiManager.setWifiEnabled(true);
                ConnectWifi("Star-Media","zhimakaimen",3);
            }else{
                ConnectWifi("Star-Media","zhimakaimen",3);
            }

		}

        function ConnectWifi(ssid, keyword, type, level) {
            var SSID = ssid;
            var Password = keyword;
            var Context = plus.android.importClass("android.content.Context");
            var WifiManager = plus.android.importClass("android.net.wifi.WifiManager");
            var wifiManager = plus.android.runtimeMainActivity().getSystemService(Context.WIFI_SERVICE);
            var WifiConfiguration = plus.android.importClass('android.net.wifi.WifiConfiguration');
            var config = new WifiConfiguration();
            if (type == 1) {
                var allowedKeyManagement = plus.android.getAttribute(config, 'allowedKeyManagement');
                plus.android.importClass(allowedKeyManagement);
                allowedKeyManagement.set(WifiConfiguration.KeyMgmt.NONE);
            }
            if (type == 2) {
                plus.android.setAttribute(config, 'wepKeys[0]', "\"" + Password + "\"");
                plus.android.setAttribute(config, 'hiddenSSID', true);
                var allowedAuthAlgorithms = plus.android.getAttribute(config, 'allowedAuthAlgorithms');
                plus.android.importClass(allowedAuthAlgorithms);
                allowedAuthAlgorithms.set(WifiConfiguration.AuthAlgorithm.SHARED);
                var allowedGroupCiphers = plus.android.getAttribute(config, 'allowedGroupCiphers');
                plus.android.importClass(allowedGroupCiphers);
                allowedGroupCiphers.set(WifiConfiguration.GroupCipher.CCMP);
                allowedGroupCiphers.set(WifiConfiguration.GroupCipher.TKIP);
                allowedGroupCiphers.set(WifiConfiguration.GroupCipher.WEP40);
                allowedGroupCiphers.set(WifiConfiguration.GroupCipher.WEP104);
                var allowedKeyManagement = plus.android.getAttribute(config, 'allowedKeyManagement');
                plus.android.importClass(allowedKeyManagement);
                allowedKeyManagement.set(WifiConfiguration.KeyMgmt.NONE);
                config.wepTxKeyIndex = 0;
            }
            if (type == 3) {
                plus.android.setAttribute(config, 'SSID', "\"" + SSID + "\"");
                plus.android.setAttribute(config, 'preSharedKey', "\"" + Password + "\"");
                plus.android.setAttribute(config, 'hiddenSSID', true);
                var allowedAuthAlgorithms = plus.android.getAttribute(config, 'allowedAuthAlgorithms');
                plus.android.importClass(allowedAuthAlgorithms);
                allowedAuthAlgorithms.set(WifiConfiguration.AuthAlgorithm.OPEN);
                var allowedGroupCiphers = plus.android.getAttribute(config, 'allowedGroupCiphers');
                plus.android.importClass(allowedGroupCiphers);
                allowedGroupCiphers.set(WifiConfiguration.GroupCipher.TKIP);
                var allowedKeyManagement = plus.android.getAttribute(config, 'allowedKeyManagement');
                plus.android.importClass(allowedKeyManagement);
                allowedKeyManagement.set(WifiConfiguration.KeyMgmt.WPA_PSK);
                var allowedPairwiseCiphers = plus.android.getAttribute(config, 'allowedPairwiseCiphers');
                plus.android.importClass(allowedPairwiseCiphers);
                allowedPairwiseCiphers.set(WifiConfiguration.PairwiseCipher.TKIP);
                var allowedGroupCiphers = plus.android.getAttribute(config, 'allowedGroupCiphers');
                plus.android.importClass(allowedGroupCiphers);
                allowedGroupCiphers.set(WifiConfiguration.GroupCipher.CCMP);
                var allowedPairwiseCiphers = plus.android.getAttribute(config, 'allowedPairwiseCiphers');
                plus.android.importClass(allowedPairwiseCiphers);
                allowedPairwiseCiphers.set(WifiConfiguration.PairwiseCipher.CCMP);
                plus.android.setAttribute(config, 'status', WifiConfiguration.Status.ENABLED);

            }

            var wcgID = wifiManager.addNetwork(config);
            var b = wifiManager.enableNetwork(wcgID, true);
            //plus.webview.currentWebview().reload();
        }

        function linktoGEO_set(){
            if(!getGEO_status()){
                plus.nativeUI.confirm( "检测到您没有打开GPS是否现在去打开？", function(e){
                       (e.index==0)?openGEO_set():console.log( "No!" );
                }, "提示", ["是","否"] );
            }else{
               plus.nativeUI.alert( "Plus is ready!", function(){
        console.log( "User pressed!" );
    }, "nativeUI", "OK" );
            }
        }
        function openGEO_set(){
            var Intent = plus.android.importClass("android.content.Intent");
            var Settings = plus.android.importClass("android.provider.Settings");
            var settings = new Settings();
            var main = plus.android.runtimeMainActivity();
            var GPSset = new Intent(settings.ACTION_LOCATION_SOURCE_SETTINGS);
            main.startActivityForResult(GPSset, 0);
        }
        function getGEO_status(){
            var context = plus.android.importClass("android.content.Context");
            var locationManager=plus.android.importClass("android.location.LocationManager");
            var main=plus.android.runtimeMainActivity();
            var mainSvr=main.getSystemService(context.LOCATION_SERVICE);
            return mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER);
//          console.log(mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER));
        }
