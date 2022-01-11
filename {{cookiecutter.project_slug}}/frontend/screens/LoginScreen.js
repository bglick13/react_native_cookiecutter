import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {styles as rootStyles} from '../App';
import { Card, withTheme, Title, DataTable, Button, TextInput } from 'react-native-paper';
import my_app from '../constants';
import {Context} from '../App'
import { useFocusEffect } from '@react-navigation/core';

function LoginScreen(props) {
    const [state, dispatch] = React.useContext(Context);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = () => {
        const data = new FormData();
        data.append("username", username);
        data.append("password", password);
        my_app.post('/login', data)
        .then((res) => {
            if (res.status === 200) {
                dispatch({type: 'SET_BEARER_TOKEN', payload: res.data.access_token});
                my_app.get('/settings/')
                .then((res) => {
                dispatch({type: 'SET_SETTINGS', payload: res.data});
                })
            }
        })
    }

    return (
        <View style={rootStyles.container}>
            <TextInput
                autoCapitalizs="none"
                mode="outlined"
                keyboardAppearance="dark"
                value={username}
                onChangeText={(val) => {setUsername(val)}}
                placeholder="Username"
            />
            <TextInput
                autoCapitalizs="none"
                mode="outlined"
                keyboardAppearance="dark"
                value={password}
                onChangeText={(val) => {setPassword(val)}}
                placeholder="Password"
                secureTextEntry={true}
            />
            <Button mode="outlined" onPress={handleLogin}>Login</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    containerRow: {
        padding: 10,
        margin: 10,
        flex: 1,
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-evenly"
    }
});

export default withTheme(LoginScreen);