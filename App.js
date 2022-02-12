import React, {useEffect} from "react";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Settings from "./screens/Settings";
import {Ionicons} from "@expo/vector-icons";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import {Provider} from "react-native-paper";
import firebase from "firebase/compat";
import "firebase/auth";
import "firebase/firestore";
import { DefaultTheme } from 'react-native-paper';
import Market from "./screens/Market"



const firebaseConfig = {
    apiKey: "AIzaSyCcBMudqVRVbq_9dTnFYXQuaPzyw82uvCA",
    authDomain: "crypto-app-843e6.firebaseapp.com",
    projectId: "crypto-app-843e6",
    storageBucket: "crypto-app-843e6.appspot.com",
    messagingSenderId: "213275624916",
    appId: "1:213275624916:web:f164f40531dd376ac28241"
};
let app;
app= firebase.initializeApp(firebaseConfig);

const Stack= createNativeStackNavigator();
const Tabs= createBottomTabNavigator();


const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#2196f3',
        accent: '#e91e63',
    },
};



const TabNavigator=()=>{
    const navigation=useNavigation();
    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user=>{
            if(!user){
                navigation.navigate("SignUp");
            }
        });
    },[])
    return(

        <Tabs.Navigator>
            <Tabs.Screen
                name={"Market"}
                component={Market}
                options={()=>({

                    tabBarIcon:({color,size})=>{
                        return <Ionicons color={color} size={size} name={"home"}/>

                    },

                    tabBarInactiveTintColor:"gray",

                })}
            />
            <Tabs.Screen
                name={"Ayarlar"}
                component={Settings}
                options={()=>({
                    tabBarIcon:({color,size})=>{
                        return <Ionicons color={color} size={size} name={"settings"}/>
                    },
                    tabBarActiveTintColor:"tomato",
                    tabBarInactiveTintColor:"gray"
                })}/>
        </Tabs.Navigator>
    )
}

export default function App() {
    return (
        <NavigationContainer>
            <Provider theme={theme}>
                <Stack.Navigator>
                    <Stack.Screen
                        name={"Market"}
                        component={TabNavigator}
                        options={{headerShown:false}}/>
                    <Stack.Screen
                        name={"Login"}
                        component={Login}
                        options={{presentation:"fullScreenModal"}}
                    />
                    <Stack.Screen
                        name={"SignUp"}
                        component={SignUp}
                        options={{
                            presentation:"fullScreenModal"}}/>

                </Stack.Navigator>
            </Provider>


        </NavigationContainer>


    );
}


