import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CodePush from 'react-native-code-push';
import Analytics from 'appcenter-analytics';
import Crashes from 'appcenter-crashes';


class App extends Component {

  componentDidMount() {
    CodePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESUME}, this.syncWithCodePush, null);
    this.checkEnable();
  }

  syncWithCodePush = (status) => {
    console.log('sync with code push : ' + status);
  }

  checkEnable = async() => {
    const enabled = await Analytics.isEnabled();
    console.log('analytics : ' + enabled)
  }

  createCrash = () => {
    // const test: any = {};
    // console.log(test.should.crash);
    // Analytics.trackEvent("ClickEvent");
    // throw new Error('My Test crash!');
    Crashes.generateTestCrash();
    // throw new Error('This is a test javascript crash!');
  }

  render() {
    return (
        <View style={styles.screen}>
          <Text>Force Update Another Test</Text>
          <TouchableOpacity onPress={() => {this.createCrash()}}>
            <Text>Create Crash</Text>
          </TouchableOpacity>
        </View>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
});

const codePushOptions = {
    checkFrequency: CodePush.CheckFrequency.ON_APP_START
};

export default CodePush(codePushOptions)(App);
