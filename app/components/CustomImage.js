import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
  Animated,
} from 'react-native';
import Images from '@assets';
import { isEmpty } from 'lodash';
export const CustomImage = ({
  source,
  width,
  height,
  resizeMode = 'contain',
  style,
}) => {
  const [download, setDownload] = React.useState(-1);

  const onLoadStart = () => {
    setDownload(0);
  };
  const onProgress = ({ nativeEvent: { loaded, total } }) => {
    setDownload(Math.round((loaded / total).toFixed(2) * 100));
  };
  const onLoadEnd = () => {
    setDownload(-1);
  };
  const onError = () => {
    setDownload(-1);
  };
  return (
    <View style={style}>
      <Image
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        onLoadEnd={onLoadEnd}
        onError={onError}
        source={!isEmpty(source.uri) ? source : Images.account_placeholder}
        defaultSource={Images.account_placeholder}
        resizeMode={resizeMode}
        style={[width && { width }, height && { height }, style]}
      />
      {download > 0 && (
        <View style={styles.imageOverlay}>
          <ActivityIndicator animating color="black" size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#e1e4e8',
  },
});
