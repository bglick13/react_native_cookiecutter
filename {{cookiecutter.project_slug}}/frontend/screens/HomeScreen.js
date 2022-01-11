import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {styles as rootStyles} from '../App';
import { Card, withTheme, Title, DataTable } from 'react-native-paper';
import my_app from '../constants';
import {Context} from '../App'
import { useFocusEffect } from '@react-navigation/core';

function HomeScreen(props) {
    const [state, dispatch] = React.useContext(Context);

    useFocusEffect(
        React.useCallback(() => {
            
            dispatch({type: 'SET_SETTINGS', payload: {...state.settings, last_page: "Home"}})
            my_app.post("/settings", state.settings)
            .then((res) => {console.log(res.data)})
        }, [state.settings.last_page])
    )

    return (
        <View style={rootStyles.container}>
            <View style={styles.containerRow}>
                <Card mode="outlined" style={
                    {flex: 0.2, alignItems: "center"}
                    }>
                    <Card.Title title='Hello World'/>
                    <Card.Content style={
                        {alignItems: "center", justifyContent: "center"}
                        }>
                        <Title>Edit this screen to your heart's content</Title>
                    </Card.Content>
                </Card>
            </View>            
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

export default withTheme(HomeScreen);