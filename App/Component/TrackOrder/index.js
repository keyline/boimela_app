import { View, Text, SafeAreaView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { styles } from './styles'
import WebView from 'react-native-webview';
import Header from '../../Container/Header';
import { ImagePath } from '../../Utils/ImagePath';

const TrackOrder = ({ navigation }) => {

    const [contentWidth, setContentWidth] = useState(0);

    const htmlContent = `
    <html>
    <head>
      <title>WebView with JavaScript</title>
    </head>
    <body>
    <script>var osURL= 'https://shipway.in/orderscan?key=UDVUb010d3h2MmNKaTlkc0M5OHIrOFpTdGZKQXNYOEJJVi9CRUJpQlQzTjVZS1daeXU2YXdyWjZHYUs2dy8zNw==&layout=55033';document.write('<scr'+'ipt type="text/JavaScript" src="https://shipway.in/orderscan/widget/widget.js"></scr'+'ipt>')</script>
    <div id="ship_oscan_main_content"></div>
    </body>
    </html>
  `;

    const webViewScript = `
  var viewport = document.querySelector("meta[name=viewport]");
  if (viewport) {
    viewport.parentNode.removeChild(viewport);
  }
  var meta = document.createElement('meta');
  meta.name = "viewport";
  meta.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0";
  document.getElementsByTagName('head')[0].appendChild(meta);
`;

    const onLeftPress = useCallback(async () => {
        navigation.openDrawer();
    })

    return (
        <SafeAreaView style={styles.container}>
            <Header leftIcon={ImagePath.menu} leftonPress={onLeftPress} />
            <View style={{ flex: 1, marginTop: '2%' }}>
                <WebView
                    source={{ html: htmlContent }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    injectedJavaScript={webViewScript}
                    // useWebKit={true}
                    style={{ flex: 1 }}
                />
            </View>
        </SafeAreaView>
    )
}

export default TrackOrder