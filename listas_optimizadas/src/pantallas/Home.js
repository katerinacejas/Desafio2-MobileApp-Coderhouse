import { StyleSheet, View} from 'react-native'
import React from 'react'
import Header from '../componentes/Header'
import { colores } from '../constantes/colores'
import IngresoGastos from '../componentes/IngresoGastos'
import MuestroGastos from '../componentes/MuestroGastos'
import { getStatusBarHeight } from 'react-native-status-bar-height';

const statusBarHeight = getStatusBarHeight() //para obtener el tamaño de la barra de notis pero no sale :(
    

const Home = () => {
    return (
        <View style={styles.fondo} >
            <Header titulo={'Mis Gastos'} />
            <IngresoGastos />
            {/* <MuestroGastos />  en un futuro lo voy a dividir en mas componentes*/}
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    fondo: {
        backgroundColor: colores.turquesa,
        width: '100%',
        marginTop: 60,
    },
})