import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colores } from '../constantes/colores';
import { size } from '../constantes/Size';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const statusBarHeight = getStatusBarHeight()

const Header = ({ titulo }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.titulo}> {titulo} </Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        backgroundColor: colores.violeta,
        height: 80, 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: "100%",
        marginTop:{statusBarHeight},
    },
    titulo: {
        fontSize: size.header, 
        fontWeight: 'bold', 
        color: colores.negro,
    },
})