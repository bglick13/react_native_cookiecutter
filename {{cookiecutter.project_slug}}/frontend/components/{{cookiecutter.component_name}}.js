import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {styles as rootStyles} from '../App';
import { Card, withTheme, Title, DataTable } from 'react-native-paper';
import my_app from '../constants.js';
import { useFocusEffect } from '@react-navigation/core';
import {Context} from '../App';

function {{cookiecutter.component_name}}(props) {
    const [state, dispatch] = React.useContext(Context);
    return (
        <View style={rootStyles.container}>

        </View>
    );

}

export default withTheme({{cookiecutter.component_name}});