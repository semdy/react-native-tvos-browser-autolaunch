import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import clear from '@/assets/clear.png';

type Props = Record<string, any>;
type State = {
  inputValue: string;
  finalValue: string;
  cacheReady: boolean;
  focused: boolean;
};

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: 'http://demo.xianglu-china.com/#/admin/openscreen',
      finalValue: '',
      cacheReady: false,
      focused: false,
    };
  }

  async componentDidMount() {
    const cachedValue = await AsyncStorage.getItem('lastUrl');
    if (cachedValue) {
      this.setState({finalValue: cachedValue, cacheReady: true});
    } else {
      this.setState({cacheReady: true});
    }
  }

  handleConfirm = () => {
    const {inputValue} = this.state;
    if (inputValue) {
      if (!inputValue.match(/https?:\/\//)) {
        return ToastAndroid.show('不合法的网址', ToastAndroid.SHORT);
      }
      this.setState({finalValue: inputValue});
      AsyncStorage.setItem('lastUrl', inputValue);
    } else {
      ToastAndroid.show('请输入网址', ToastAndroid.SHORT);
    }
  };

  handleClear = () => {
    this.setState({inputValue: ''});
  };

  handleFocus = () => {
    this.setState({focused: true});
  };

  handleBlur = () => {
    this.setState({focused: false});
  };

  renderInput(): React.ReactNode {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.searchBar}>
          <View style={styles.inputWrap}>
            <TextInput
              editable
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              placeholder="请输入网址"
              placeholderTextColor="#c0c0c0"
              style={[
                styles.searchInput,
                this.state.focused && styles.inputFocused,
              ]}
              value={this.state.inputValue}
              onChangeText={text => this.setState({inputValue: text})}
              onSubmitEditing={this.handleConfirm}
            />
            {!!this.state.inputValue && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.handleClear}
                style={styles.clear}>
                <Image style={styles.clearImg} source={clear} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.handleConfirm}
            style={styles.button}>
            <Text style={{color: '#fff', fontSize: 16}}>确定</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderWebview(): React.ReactNode {
    return (
      <View style={styles.container}>
        <WebView
          style={styles.container}
          source={{uri: this.state.finalValue}}
        />
        <StatusBar hidden />
      </View>
    );
  }

  render(): React.ReactNode {
    if (this.state.finalValue) {
      return this.renderWebview();
    }
    if (this.state.cacheReady) {
      return this.renderInput();
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  searchBar: {
    felx: 1,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrap: {
    position: 'relative',
    flex: 1,
  },
  clear: {
    position: 'absolute',
    right: 0,
    top: '50%',
    marginTop: -16,
    padding: 8,
  },
  clearImg: {
    width: 16,
    height: 16,
  },
  searchInput: {
    height: '100%',
    borderRadius: 6,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingRight: 26,
    color: '#444',
    flex: 1,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#e9e9e9',
  },
  inputFocused: {
    borderColor: '#5258dd',
  },
  button: {
    width: 70,
    height: '100%',
    marginLeft: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5258dd',
  },
});
