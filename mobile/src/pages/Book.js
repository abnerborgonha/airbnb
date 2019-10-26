import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Text, TextInput, AsyncStorage, TouchableOpacity, Alert, Image} from 'react-native';

import api from '../services/api';
import logo from '../assets/logo.png';

export default function Book({ navigation }) {
    const id = navigation.getParam('id');
    const  [date, setDate] = useState('');

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/bookings`, {
            date
        },{
            headers: {user_id}
        })
        console.log({user_id}, {id});
        Alert.alert('Solicitação de reserva enviada.');

        navigation.navigate('List');
    }

    function handleCancel() {
        navigation.navigate('List');
    }



    return (
        <SafeAreaView style={styles.container}>
             <Image style={styles.logo} source={logo} />
             <Text style={styles.label}>DATA DE INTERESSE *</Text>
                <TextInput
                     style={styles.input}
                     placeholder="Qual data você quer reservar?"
                     placeholderTextcolor="#999"
                     keyboardType="email-address"
                     autoCapitalize="none"
                     autoCorrect={false}
                     value={date}
                     onChangeText={setDate}
                 />
                 <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Solicitar reserva</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton ]}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
        </SafeAreaView>);
}

const styles = StyleSheet.create({

    container: {
        margin: 30,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginLeft: 12,
        marginTop: 20,
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize:16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 32
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 32,
        marginTop: 20,
    },

    cancelButton: {
        backgroundColor: '#ccc',
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10,
    },
});