'use strict';
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    NativeAppEventEmitter,
    ActivityIndicator,
} from 'react-native';

import AMapLocation from 'react-native-smart-amap-location';
import Button from 'react-native-smart-button';
import AppEventListenerEnhance from 'react-native-smart-app-event-listener-enhance';

class AMapLocationDemo extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            
        };
    }

    componentDidMount() {
        let viewAppearCallBack = (event) => {
            AMapLocation.init(null) //使用默认定位配置
        }
        this.addAppEventListener(
            this.props.navigator.navigationContext.addListener('didfocus', viewAppearCallBack),
            NativeAppEventEmitter.addListener('amap.location.onLocationResult', this._onLocationResult)
        )
    }

    componentWillUnmount () {
        //停止并销毁定位服务
        AMapLocation.cleanUp()
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Button
                    ref={ component => this._button_2 = component }
                    touchableType={Button.constants.touchableTypes.fade}
                    style={{margin: 10, width: 300, height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
                    textStyle={{fontSize: 17, color: 'white'}}
                    loadingComponent={
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{fontSize: 17, color: 'white', fontWeight: 'bold', fontFamily: '.HelveticaNeueInterface-MediumP4',}}>努力定位中</Text>
                        </View>
                    }
                    onPress={this._showLocation.bind(this)}>
                    定位地理编码信息
                </Button>
            </View>
        )
    }

    _onLocationResult = (result) => {
        if(result.error) {
            Alert.alert(`错误代码: ${result.error.code}, 错误信息: ${result.error.localizedDescription}`);
            console.log(result.error.localizedDescription);
        }
        else {
            if(result.formattedAddress) {
                Alert.alert(`格式化地址 = ${result.formattedAddress}`);
            }
            else {
                Alert.alert(`纬度 = ${result.coordinate.latitude}, 经度 = ${result.coordinate.longitude}`);
            }
        }
        if(this._button_2.state.loading) {
            this._button_2.setState({
                loading: false,
            });
        }
    }
    //单次定位并返回地理编码信息
    _showLocation = () => {
        this._button_2.setState({
            loading: true,
        });
        AMapLocation.getLocation();
    }

}

export default AppEventListenerEnhance(AMapLocationDemo)