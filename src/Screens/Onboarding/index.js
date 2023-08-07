import React, { useEffect, useContext, useState } from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Context } from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';


const index = (props) => {
    const [state, dispatch] = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem("taskDatas").then((value) => {
            const parsedData = JSON.parse(value);
            if (parsedData) {
                dispatch({ type: 'SET_LOCAL_COLLECTIONS', payload: parsedData })
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
                
            }
        })
    }, [])

    useEffect(() => {
        if (state?.taskDatas?.length) {
            props.navigation.navigate("TaskList")
        }
    }, [state])

    if (loading) {
        return (

            <View style={{justifyContent:"center",flex:1}}>
                <ActivityIndicator size={'large'} color='#7c4afa'/>
            </View>
            
        )
    }

    return (

        <View style={styles.container}>
            <View style={{ height: "70%", backgroundColor: "#7c4afa", borderBottomLeftRadius: 100, borderBottomRightRadius: 100 }}>
                <ImageBackground source={require('../../../assets/elipse.png')} style={{ height: 300, width: 300, flex: 1, justifyContent: 'center' }}>
                    <Image source={require('../../../assets/task.png')} style={{ height: 350, width: 350, alignSelf: 'center', marginTop: 100, marginLeft: 100 }} />
                </ImageBackground>
            </View>
            <View style={{ justifyContent: "center", marginTop: 30 }}>
                <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>Add a task {'\n'} to get started</Text>
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate("CreateTask")
                }} style={{ justifyContent: 'center', alignSelf: 'center', backgroundColor: "#7c4afa", borderRadius: 30, padding: 15, marginTop: 30 }}>
                    <MaterialCommunityIcons name="plus" size={25} color={"#fff"} />
                </TouchableOpacity>
            </View>
        </View>
    );

}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
