import React, {useEffect, useState} from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {getStatusBarHeight} from "react-native-iphone-x-helper";

import userImg from '../assets/lucas.jpeg'


import colors from '../styles/colors'
import fonts from '../styles/fonts'



export function Header() {

    const [userName, setUserName] = useState<string>()

    

    useEffect(() => {
        loadStorageUserName()
    }, [])

    async function loadStorageUserName() {
        const user = await AsyncStorage.getItem("@plantmanager:user")
        setUserName(user || '')
    }

    return (
        <View style={styles.container}>

            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.username}>{userName}</Text>
            </View>

            <View>
                <Image style={styles.image} source={userImg} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40,
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,

    },
    username: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    }
})