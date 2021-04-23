import React from 'react'
import {createStackNavigator} from "@react-navigation/stack";

import {Welcome} from '../pages/Welcome';
import {UserIdentification} from '../pages/UserIdentification';
import {Confirmation} from '../pages/Confirmation';
import {PlantSelect} from '../pages/PlantSelect';

import colors from '../styles/colors'

const stackRouts = createStackNavigator()

const AppRoutes: React.FC = () => (
    <stackRouts.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            }
        }}
    >

        <stackRouts.Screen
            name="Welcome"
            component={Welcome}
        />

        <stackRouts.Screen
            name="UserIdentification"
            component={UserIdentification}
        />

        <stackRouts.Screen
            name="Confirmation"
            component={Confirmation}
        />

        <stackRouts.Screen
            name="PlantSelect"
            component={PlantSelect}
        />

    </stackRouts.Navigator>
)

export default AppRoutes