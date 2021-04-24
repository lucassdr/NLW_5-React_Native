import React, {useEffect, useState} from "react";
import {Text, Image, StyleSheet, FlatList, View, ActivityIndicator} from "react-native";
import {Feather} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/core";

import {Header} from "../components/Header";
import {EnviromentButton} from "../components/EnviromentButton";
import {Load} from "../components/Load";

import wateringImg from '../assets/watering.png'

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import api from "../services/api";
import {PlantCardPrimary} from "../components/PlantCardPrimary";
import {PlantProps} from "../libs/storage";

interface IEnviromentsProps {
    key: string;
    title: string;
}

export function PlantSelect() {
    const navigation = useNavigation()

    const [enviroments, setEnviroments] = useState<IEnviromentsProps[]>([])
    const [plants, setPlants] = useState<PlantProps[]>([])
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
    const [enviromentsSelected, setEnviromentsSelected] = useState('all')
    const [loading, setLoading] = useState(true)

    //  paginação
    const [page, setPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)

    function handleEnviromentSelected(enviroment: string) {
        setEnviromentsSelected(enviroment)

        if (enviroment === 'all') {
            return setFilteredPlants(plants)
        }

        const filtered = plants.filter(plant => plant.environments.includes(enviroment))
        setFilteredPlants(filtered)
    }

    function handleFetchMore(distance: number) {
        if (distance < 1) {
            return
        }

        setLoadingMore(true)
        setPage(oldValue => oldValue + 1)
        fecthPlants()
    }

    async function fecthPlants() {
        const {data} = await api
            .get(`plants?_sort=name&order=asc&_page=${page}&_limit=8`)

        if (!data) {
            return setLoading(true)
        }

        if (page > 1) {
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
        } else {
            setPlants(data)
            setFilteredPlants(data)
        }

        setLoading(false)
        setLoadingMore(false)
    }

    function handlePlantSelect(plant: IPlantProps) {
        navigation.navigate("PlantSave", {plant})
    }

    useEffect(() => {
        async function fecthEnviroment() {
            const {data} = await api
                .get('plants_environments?_sort=title&order=asc')

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
        fecthPlants()
    }, [])


    if (loading) {
        return <Load />
    } else {
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
                        keyExtractor={(item) => String(item.key)}
                        renderItem={({item}) => (
                            <EnviromentButton
                                title={item.title}
                                active={item.key === enviromentsSelected}
                                onPress={() => handleEnviromentSelected(item.key)}
                            />
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.enviromentList}
                    />
                </View>


                <View style={styles.plants}>
                    <FlatList
                        data={filteredPlants}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({item}) => (
                            <PlantCardPrimary data={item} onPress={() => handlePlantSelect(item)} />
                        )}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        onEndReachedThreshold={0.1}
                        onEndReached={({distanceFromEnd}) => handleFetchMore(distanceFromEnd)}
                        ListFooterComponent={loadingMore ? <ActivityIndicator color={colors.green} /> : <></>}
                    />
                </View>

            </View>

        )
    }
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