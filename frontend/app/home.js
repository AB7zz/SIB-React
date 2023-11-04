import { View, Text, SafeAreaView, ScrollView, Button } from 'react-native'
import { useStateContext } from '../context/StateContext'
import { Navbar, BotNav } from '../components'
import React from 'react'
import { jsonToCSV, readRemoteFile } from 'react-native-csv'
import * as FileSystem from 'expo-file-system';

const Home = () => {
    const {triggerNoti, transactionTut, userDetails, setConsole, console} = useStateContext()
    const [click, setClicks] = React.useState(0)
    const handlePress = () => {
        triggerNoti()
        // setClicks(click + 1)
        // const jsonData = {
        //     id: userDetails.user_id,
        //     tag: 'st_login',
        //     click
        // }
        // const csvData = jsonToCSV(jsonData)
        // const directoryUri = FileSystem.documentDirectory;
        // const filePath = directoryUri + 'interest.csv';
        // setConsole(filePath)
        // FileSystem.writeAsStringAsync(filePath, csvData);
        // let read = readRemoteFile(filePath)
        // setConsole(JSON.stringify(read))
    }
    return(
        <SafeAreaView>
            <ScrollView style={{height: '100vh'}}>
                <Navbar />
                <View>
                    <Text>{console}</Text>
                </View>
                <View>
                    <Button
                    title="Click me" 
                    onPress={handlePress} />
                </View>
                <BotNav />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home