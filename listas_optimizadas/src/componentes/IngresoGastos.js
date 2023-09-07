import { StyleSheet, Text, View, TextInput, Button, FlatList, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colores } from '../constantes/colores'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { size } from '../constantes/Size';

const IngresoGastos = () => {
    const [gasto, setGasto] = useState('')
    const [importe, setImporte] = useState('')

    const [listaGastos, setListaGastos] = useState([])
    const [listaImportes, setListaImportes] = useState([])

    const captarGasto = (unGasto) => setGasto(unGasto)
    const captarImporte = (unImporte) => setImporte(unImporte)

    const [gastoABorrar, setGastoABorrar] = useState({})
    const [importeABorrar, setImporteABorrar] = useState({})

    const [gastoAEditar, setGastoAEditar] = useState({})
    const [importeAEditar, setImporteAEditar] = useState({})

    const [modalBorrarGasto, setModalBorrarGasto] = useState(false)
    const [modalEditarGasto, setModalEditarGasto] = useState(false)

    const [contador, setContador] = useState(0);

    const [color, setColor] = useState(false);

    const aumentarContador = () => {
        setContador(contador => contador + 1);
    };

    const agregarGasto = () => {
        if (gasto === "" || importe === "") {
            return
        }
        setListaGastos(listaGastos => [
            ...listaGastos,
            { id: contador, value: gasto },
        ])
        setListaImportes(listaImportes => [
            ...listaImportes,
            { id: contador, value: importe },
        ])
        aumentarContador()
        setGasto("")
        setImporte("")
    }

    const gestionarModalBorrarGasto = index => {
        setModalBorrarGasto(true)
        setGastoABorrar(index)
        setImporteABorrar(index)
    }

    const gestionarModalEditarGasto = index => {
        setModalEditarGasto(true)
        setGastoAEditar(index)
        setImporteAEditar(index)
    }

    const renderizarListaGastos = ({ item }) => (
        <Text style={styles.texto_items}> {item?.value} </Text>
    )

    const renderizarListaImportes = ({ item, index }) => (
        <View style={styles.viewflatlistmonedabotones}>
            <Text style={styles.monedaFlatList}> $ </Text>
            <View style={styles.viewFlatListEntero}>
                <View style={styles.texto_itemsview}>
                    <Text style={styles.texto_items}> {item?.value} </Text>
                </View>
                <View style={styles.botones}>
                    <View style={styles.botonEditar}>
                        <TouchableOpacity>
                            <AntDesign
                                name="edit"
                                size={size.botones}
                                color="black"
                                onPress={() => gestionarModalEditarGasto(index)}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <Feather
                            name="trash"
                            size={size.botones}
                            color="black"
                            onPress={() => gestionarModalBorrarGasto(index)} 
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

    const eliminarGasto = () => {
        let listaSinEseGasto = listaGastos
        listaSinEseGasto.splice(gastoABorrar, 1)
        setListaGastos(listaSinEseGasto)

        let listaSinEseImporte = listaImportes
        listaSinEseImporte.splice(importeABorrar, 1)
        setListaImportes(listaSinEseImporte)

        setModalBorrarGasto(false)
    }

    const editarGasto = () => {
        if (gasto === "" || importe === "") {
            return
        }

        let listaSinEseGasto = listaGastos
        listaSinEseGasto.splice(gastoAEditar, 1)
        setListaGastos(listaSinEseGasto)

        let listaSinEseImporte = listaImportes
        listaSinEseImporte.splice(importeAEditar, 1)
        setListaImportes(listaSinEseImporte)
        
        setListaGastos(listaGastos => [
            ...listaGastos,
            { id: contador, value: gasto },
        ])
        setListaImportes(listaImportes => [
            ...listaImportes,
            { id: contador, value: importe },
        ])
        aumentarContador()
        setGasto("")
        setImporte("")

        setModalEditarGasto(false)
    }

    const cancelarEditarGasto = () => {
        setGasto("")
        setImporte("")
        setModalEditarGasto(false)
    }

    const cancelarEliminarGasto = () => {
        setModalBorrarGasto(false)
    }

    const colorBoton = () => {
        if ({color}) {
            console.debug('color #8C6FF7')
            return '#8C6FF7'
        } else {
            console.debug('color #000000')
            return '#000000'
        }
    }

    return (
        <>
            <View>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder = "Ingrese un gasto"
                            style={styles.conceptoGasto}
                            value={gasto}
                            onChangeText={captarGasto} />
                    </View>
                    <Text style={styles.moneda}> $ </Text>
                    <View style={styles.inputContainer2}>
                        <TextInput
                            placeholder = "Importe"
                            style={styles.importeGasto}
                            value={importe}
                            keyboardType="numeric"
                            onChangeText={captarImporte} />
                    </View>
                    <TouchableOpacity       
                        onPress={() => setColor(false)} >
                        <MaterialIcons 
                            name="add-circle-outline" 
                            size={size.botones} 
                            color = {() => {
                                if ({color}) {
                                    console.debug('color #8C6FF7')
                                    return '#8C6FF7'
                                } else {
                                    console.debug('color #000000')
                                    return '#000000'
                                }
                            }}
                            onPress={agregarGasto}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.viewFlatList}>
                <View style={styles.viewFlatListGastos}>
                    <FlatList
                        data={listaGastos}
                        renderItem={renderizarListaGastos}
                        keyExtractor={item => item.id} />
                </View>
                <View style={styles.viewFlatListImportes}>
                    <FlatList
                        data={listaImportes}
                        renderItem={renderizarListaImportes}
                        keyExtractor={item => item.id} />
                </View>
            </View>
                <Modal
                    visible={modalEditarGasto}
                    animationType="slide"
                    transparent={true} >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View>
                                <Text style={styles.editarGastoTexto}>Editar gasto</Text>
                            </View>
                            <View>
                                <TextInput
                                    placeholder = "Ingrese un gasto"
                                    style={styles.editarGasto}
                                    value={gasto}
                                    onChangeText={captarGasto} />
                            </View>
                            <View>
                                <TextInput
                                    placeholder = "Importe"
                                    style={styles.editarImporte}
                                    value={importe}
                                    keyboardType="numeric"
                                    onChangeText={captarImporte} />
                            </View>
                            <View style={styles.modalButton}>
                                <View style={styles.modalButton1}>
                                    <TouchableOpacity onPress={editarGasto} style={styles.modalButton1}>
                                        <Text style={styles.textoBotones}>Editar</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.modalButton2}>
                                    <TouchableOpacity onPress={cancelarEditarGasto} style={styles.modalButton2}>
                                        <Text style={styles.textoBotones}>Cancelar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    visible={modalBorrarGasto}
                    animationType="slide"
                    transparent={true} >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContentEliminar}>
                            <View style={styles.modalTitle}>
                                <Text style={styles.eliminarGastoTexto}>Eliminar elemento?</Text>
                            </View>
                            <View style={styles.modalButton}>
                                <View style={styles.modalButton1}>
                                    <TouchableOpacity onPress={eliminarGasto} style={styles.modalButton1}>
                                        <Text style={styles.textoBotones}>Eliminar</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.modalButton2}>
                                    <TouchableOpacity onPress={cancelarEliminarGasto} style={styles.modalButton2}>
                                        <Text style={styles.textoBotones}>Cancelar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
        </>
    )
}

export default IngresoGastos

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: colores.fondoClaro,
        elevation: 6, 
    },
    inputContainer: {
        flex: 1,
        marginHorizontal: 0, 
    },
    inputContainer2: {
        flex: 1, 
        marginLeft: 180,
    },
    titulo: {
        backgroundColor: colores.fondoClaro,
        fontSize: size.titulosSecundarios,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    conceptoGasto: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        paddingVertical: 4,
        backgroundColor: colores.violeta,
        borderRadius: 8,
        width: 280,
        padding: 6,
        backgroundColor: colores.blanco,
        fontSize: size.inputTextos,
    },
    importeGasto: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        paddingVertical: 4,
        backgroundColor: colores.violeta,
        borderRadius: 8,
        width: 120,
        padding: 6,
        backgroundColor: colores.blanco,
        fontSize: size.inputTextos,
    },
    moneda: {
        fontSize: size.titulosSecundarios,    
        left: 180,   
    },
    texto_items: {
        backgroundColor: colores.fondoClaro,
        fontSize: size.titulosSecundarios,
        paddingHorizontal: 16,
        paddingVertical: 12,
        color: colores.negro,
    },
    viewFlatList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: colores.fondoClaro,
        elevation: 6,
    },
    viewFlatListGastos: {
        flex: 1,
    },
    monedaFlatList: {
        fontSize: size.titulosSecundarios,       
        flexDirection: 'row',
        alignSelf: 'center'
    },
    viewFlatListImportes: {
        flex: 1, 
        marginLeft: 28,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-evenly',
    },
    texto_itemsview: {
        flexDirection: 'row',
        right: 28,
    },
    viewFlatListEntero: {
        flex: 1, 
        marginLeft: 28,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-evenly',
    },
    viewflatlistmonedabotones: {
        flexDirection: 'row',
        flex: 1, 
        alignContent: 'center',
        justifyContent: 'flex-start',
    },
    botones: {
        marginLeft: 15,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    editarGasto: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: colores.negro,
        paddingVertical: 4,
        borderRadius: 8,
        width: 280,
        padding: 6,
        backgroundColor: colores.fondoClaro,
        fontSize: size.inputTextos,
        top: 10,
    },
    editarImporte: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: colores.negro,
        paddingVertical: 4,
        borderRadius: 8,
        width: 120,
        padding: 6,
        backgroundColor: colores.fondoClaro,
        fontSize: size.inputTextos,
        top: 20,
    },
    modalButton :{
        flexDirection: 'row',
        top: 40,
        alignSelf: 'center',
        alignItems:'center',
        flex:1,
        justifyContent: 'space-between'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo difuminado
    }, 
    modalContent: {
        width: 450,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
        height: 250,
    },
    modalContentEliminar: {
        width: 450,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
        height: 150,
    },
    editarGastoTexto: {
        fontSize: size.inputTextos,    
    },
    eliminarGastoTexto: {
        fontSize: size.inputTextos,    
    },
    modalButton1:{
        backgroundColor: colores.violeta,
        borderTopLeftRadius: 8,
        marginHorizontal: 20,
        borderRadius: 10,
        borderBottomLeftRadius: 8,
    },
    modalButton2:{
        backgroundColor: colores.violeta,
        borderTopLeftRadius: 8,
        marginHorizontal: 20,
        borderRadius: 10,
        borderBottomLeftRadius: 8,
    },
    textoBotones: {
        fontSize: size.inputTextos, 
    },
    modalMessage: {
        fontSize: size.inputTextos, 
    },
    botonEditar: {
        justifyContent: 'space-between',   
    }
})