import React from 'react';
import { StyleSheet, View } from 'react-native';
import {styles as rootStyles} from '../App';
import { Card, withTheme, Title, DataTable, Switch, Surface, Text, Button} from 'react-native-paper';
import my_app from '../constants';
import {Context} from '../App'
import { DatePickerInput } from 'react-native-paper-dates';

function SettingsScreen(props) {
    const [state, dispatch] = React.useContext(Context);
    const [isSwitchOn, setIsSwitchOn] = React.useState(true);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const onSave = () => {
        my_app.post('/settings', {on_off: isSwitchOn})
        .then((res) => {
            console.log(res.data)
            dispatch({type: 'SET_SETTINGS', payload: res.data})
            props.navigation.navigate('Home')
        })
    }
    return (
        <View style={rootStyles.container}>
            <Surface style={
                {height: "75%", width: "50%", alignItems: "center", justifyContent: "center"}
                }>
                
                <View style={
                    {flexDirection: "row", flex: 1}
                    }>
                    <Text>On/Off</Text>
                    <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                </View>
                <View style={
                    {flex: 1}
                    }>
                    <Button mode="outlined" onPress={onSave}>Save</Button>
                </View>
                
            </Surface>

            
        </View>
    )
}
export default withTheme(SettingsScreen);