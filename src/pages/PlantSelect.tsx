import React, {useEffect, useState} from "react";
import {Text, Image, StyleSheet, FlatList, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/core";

import {Header} from "../components/Header";
import {EnviromentButton} from "../components/EnviromentButton";

import wateringImg from '../assets/watering.png'

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import api from "../services/api";
import {PlantCardPrimary} from "../components/PlantCardPrimary";

interface IEnviromentsProps {
    key: string;
    title: string;
}

interface IPlantProps {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
        times: number;
        repeat_every: string;
    }
}


export function PlantSelect() {

    const [enviroments, setEnviroments] = useState<IEnviromentsProps[]>([])
    const [plants, setPlants] = useState<IPlantProps[]>([])

    useEffect(() => {
        async function fecthEnviroment() {
            const {data} = await api.get('plants_environments?_sort=title&order=asc')

            setEnviroments([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data
            ])


        }

        fecthEnviroment()

    }, [])

    useEffect(() => {
        async function fecthPlants() {
            const {data} = await api.get('plants?_sort=name&order=asc')
            setPlants(data)
        }

        fecthPlants()

    }, [])

    const navigation = useNavigation()

    function handleStart() {
        navigation.navigate('UserIdentification')
    }

    return (

        <View style={styles.container} >

            <View style={styles.header}>

                <Header />

                <Text style={styles.title}>Em qual ambiente</Text>
                <Text style={styles.subtitle}>você quer colocar sua planta?</Text>

            </View>

            <View>
                <FlatList
                    data={enviroments}
                    renderItem={({item}) => (
                        <EnviromentButton
                            title={item.title}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                />
            </View>


            <View style={styles.plants}>
                <FlatList
                    data={plants}
                    renderItem={({item}) => (
                        <PlantCardPrimary data={item} />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                />
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        // justifyContent: 'center',
        // alignItems: "center"
    },
    header: {
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15,
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },
    enviromentList: {
        height: 40,
        justifyContent: "center",
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32,
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: "center",
    },
})