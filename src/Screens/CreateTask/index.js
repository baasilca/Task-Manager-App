import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector'
import { Context } from '../../store';
import * as Crypto from 'expo-crypto';
import { StackActions } from '@react-navigation/native';

const index = (props) => {
    const [state, dispatch] = useContext(Context);
    const [taskName, setTaskName] = useState("");
    const [subject, setSubject] = useState("");
    const [date, setDate] = useState(new Date());
    const [status, setStatus] = useState("To do");
    const [beginningTime, setBeginningTime] = useState(new Date());
    const [finishedTime, setFinishedTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showBegenningTimePicker, setShowBegenningTimePicker] = useState(false);
    const [showFinishedTimePicker, setShowFinishedTimePicker] = useState(false);
    const [loading, setloading] = useState(false);
    const popAction = StackActions.pop(2);
    let index = 0;
    const data = [
        { key: index++, label: 'To do' },
        { key: index++, label: 'In progress' },
        { key: index++, label: 'Done' },
    ];


    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowDatePicker(false);
        setDate(currentDate);
    };
    const onChangeBeginningTime = (event, selectedTime) => {
        const currentTime = selectedTime;
        setShowBegenningTimePicker(false);
        setBeginningTime(currentTime);
    };
    const onChangeFinishedTime = (event, selectedTime) => {
        const currentTime = selectedTime;
        setShowFinishedTimePicker(false);
        setFinishedTime(currentTime);
    };

    useEffect(() => {
        if (props?.route?.params?.editData) {
            setTaskName(props?.route?.params?.editData?.taskName)
            setSubject(props?.route?.params?.editData?.taskSubject)
            setDate(props?.route?.params?.editData?.taskDate)
            setStatus(props?.route?.params?.editData?.taskStatus)
            setBeginningTime(props?.route?.params?.editData?.taskBeginningTime)
            setFinishedTime(props?.route?.params?.editData?.taskFinishedTime)
        }
    }, [])

    const generateRandomId = async () => {
        const randomBytes = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            Math.random().toString()
        );
        return randomBytes;
    };

    const addTask = async () => {
        if (!taskName) {
            ToastAndroid.show('Task name is required', ToastAndroid.SHORT);
        } else if (!subject) {
            ToastAndroid.show('Subject required', ToastAndroid.SHORT);
        } else {
            setloading(true)
            const taskId = await generateRandomId();
            const taskData = {
                taskId: props?.route?.params?.editData ? props.route.params.editData.taskId : taskId,
                taskName: taskName,
                taskSubject: subject,
                taskDate: date,
                taskStatus: status,
                taskBeginningTime: beginningTime,
                taskFinishedTime: finishedTime
            }
            await dispatch({ type: 'ADD_EDIT_TASK', payload: taskData })
            props.navigation.dispatch(popAction);
            props.navigation.navigate('TaskList')

        }
    }



    return (

        <ScrollView style={styles.container}>
            <ImageBackground source={require('../../../assets/elipseColored.png')} style={styles.imageBackground}>
                <Image source={require('../../../assets/pencil.png')} style={styles.pencilIcon} />
            </ImageBackground>
            <View style={{ padding: 20 }}>
                <View style={{ padding: 10 }}>
                    <Text style={styles.textBoxTitles}>Task name</Text>
                    <View style={styles.textBoxViewContainer}>
                        <Image source={require('../../../assets/taskNameIcon.png')} style={styles.textBoxIcons} />
                        <TextInput
                            onChangeText={value => setTaskName(value)}
                            value={taskName}
                            backgroundColor={"#fff"}
                            textColor={"#1d1d1b"}
                            style={{ borderRadius: 10, height: 50, flex: 1 }}
                            returnKeyType={'done'}
                        />
                    </View>
                </View>
                <View style={{ padding: 10 }}>


                    <Text style={styles.textBoxTitles}>Subject</Text>

                    <View style={styles.textBoxViewContainer}>
                        <Image source={require('../../../assets/subjectIcon.png')} style={[styles.textBoxIcons, { tintColor: "#7c4afa" }]} />
                        <TextInput
                            onChangeText={value => setSubject(value)}
                            value={subject}
                            backgroundColor={"#fff"}
                            textColor={"#1d1d1b"}
                            style={{ borderRadius: 10, height: 50, flex: 1 }}
                            returnKeyType={'done'}
                        />
                    </View>
                </View>
                <View style={{ padding: 10 }}>
                    <Text style={styles.textBoxTitles}>Date</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={[styles.textBoxViewContainer, { height: 50 }]}>
                        <Image source={require('../../../assets/calendarIcon.png')} style={[styles.textBoxIcons, { tintColor: "#7c4afa" }]} />
                        <Text>{new Date(date).toLocaleDateString()}</Text>

                    </TouchableOpacity>
                </View>

                <View style={{ padding: 10 }}>
                    <ModalSelector
                        data={data}
                        initValue="Select something yummy!"
                        onChange={(option) => { setStatus(option.label) }}>
                        <Text style={styles.textBoxTitles}>Status</Text>
                        <TouchableOpacity onPress={() => setShowBegenningTimePicker(true)} style={[styles.textBoxViewContainer, { height: 50 }]}>
                            <MaterialCommunityIcons name="list-status" size={25} style={{ margin: 10 }} color={"#7c4afa"} />
                            <Text>{status}</Text>

                        </TouchableOpacity>
                    </ModalSelector>

                </View>
                <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textBoxTitles}>Beginning time</Text>
                        <TouchableOpacity onPress={() => setShowBegenningTimePicker(true)} style={[styles.textBoxViewContainer, { height: 50, width: status === "Done" ? "95%" : "100%" }]}>
                            <MaterialCommunityIcons name="clock-outline" size={25} style={{ margin: 10 }} color={"#7c4afa"} />
                            <Text>{new Date(beginningTime).toLocaleTimeString(undefined, {
                            hour12: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}</Text>

                        </TouchableOpacity>
                    </View>
                    {status === "Done" &&
                        <View style={{ flex: 1, alignSelf: 'flex-end' }}>
                            <Text style={[styles.textBoxTitles, { marginLeft: 8 }]}>Finished time</Text>
                            <TouchableOpacity onPress={() => setShowFinishedTimePicker(true)} style={[styles.textBoxViewContainer, { height: 50, width: "95%", alignSelf: "flex-end" }]}>
                                <MaterialCommunityIcons name="clock-outline" size={25} style={{ margin: 10 }} color={"#7c4afa"} />
                                <Text>{new Date(finishedTime).toLocaleTimeString(undefined, {
                            hour12: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}</Text>

                            </TouchableOpacity>
                        </View>
                    }
                </View>
                <Button mode="contained" contentStyle={{ margin: 5 }} style={{ marginTop: 15, borderRadius: 10, margin: 10 }} onPress={() => { addTask() }}>
                    {loading ? "Please wait...": props?.route?.params?.editData ? "Edit task" : "Add task"}
                </Button>
            </View>

            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(date)}
                    mode={"date"}
                    onChange={onChangeDate}
                />
            )}
            {showBegenningTimePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(beginningTime)}
                    mode={"time"}
                    onChange={onChangeBeginningTime}
                />
            )}
            {showFinishedTimePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(finishedTime)}
                    mode={"time"}
                    onChange={onChangeFinishedTime}
                />
            )}

        </ScrollView>
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
        justifyContent: 'center',
        tintColor: "#7c4afa",
        resizeMode: 'contain',
        transform: [
            { scaleX: -1 }
        ],
        alignSelf: 'flex-end'
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
