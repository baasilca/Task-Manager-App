import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Card } from 'react-native-paper';
import { Context } from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const index = (props) => {
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        AsyncStorage.setItem("taskDatas", JSON.stringify(state?.taskDatas))
    }, [state])

    const deleteTask = async (item) => {
        Alert.alert(
            "Are you sure?",
            "Do you want to delete the task",
            [
                { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                {
                    text: 'Delete', onPress: async () => {
                        await dispatch({ type: 'DELETE_TASK', payload: item })
                        setLocalData()
                    }
                },
            ],
        );

    }


    const renderTasks = ({ item }) => {
        return (
            <Card style={{ backgroundColor: "#fff", padding: 10, marginBottom: 15 }} onPress={() => { props.navigation.navigate('CreateTask', { editData: item }) }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: "bold" }}>{item.taskName}</Text>
                    <TouchableOpacity onPress={() => {
                        deleteTask(item)
                    }} hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}>
                        <MaterialCommunityIcons name="delete-outline" size={25} color={"red"} />
                    </TouchableOpacity>
                </View>
                <Text style={{ opacity: 0.4, fontSize: 12 }}>{item.taskSubject}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="clock-outline" size={25} color={"#7c4afa"} />
                        <Text> {new Date(item?.taskBeginningTime)?.toLocaleTimeString()}</Text>
                    </View>

                    <View style={{ backgroundColor: item.taskStatus === "To do" ? "#7c4afa" : item.taskStatus === "In progress" ? "#ff822f" : "#7add70", justifyContent: "center", padding: 10, borderRadius: 30 }}>
                        <Text style={{ color: "#fff" }}>{item.taskStatus}</Text>
                    </View>

                </View>
            </Card>

        )
    }



    return (

        <View style={styles.container}>
            <Image source={require('../../../assets/elipse.png')} style={styles.imageBackground}>
            </Image>
            <View style={{ marginTop: -200, padding: 20, flex: 1 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 30 }}>Tasks.</Text>
                <FlatList
                    data={state?.taskDatas}
                    keyExtractor={(item) => { item.taskId }}
                    renderItem={renderTasks}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <Button mode="contained" contentStyle={{ margin: 5 }} style={{ marginTop: 15, borderRadius: 10, margin: 20 }} onPress={() => { props.navigation.navigate('CreateTask') }}>
                Add task
            </Button>
        </View>
    );

}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        height: 300,
        width: 300,
        opacity: 0.2,
        tintColor: "#7c4afa",
        resizeMode: 'contain',
        padding: 20,
        resizeMode: 'contain'
    },
    pencilIcon: {
        height: 250,
        width: 250,
        marginTop: 100,
        alignSelf: 'center',
        marginLeft: 100,
        transform: [
            { scaleX: -1 }
        ]
    },
    textBoxViewContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center"
    },
    textBoxTitles: {
        marginBottom: 10,
        fontWeight: 'bold'
    },
    textBoxIcons: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        margin: 10
    }
})
