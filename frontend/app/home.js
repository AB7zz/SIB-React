import { View, Text, SafeAreaView, ScrollView, Button } from 'react-native'
import { useStateContext } from '../context/StateContext'
import { Navbar, BotNav, Card1, Card2, Card3, Card4 } from '../components'
import React from 'react'

const Home = () => {
    const {triggerNoti, transactionTut, userDetails, setConsole, consoleMssg} = useStateContext()
    const [click, setClicks] = React.useState(0)
    const handlePress = () => {
        triggerNoti()
    }
    return(
        <SafeAreaView>
            <ScrollView>
                <Navbar />
                <View>
                    <Text>{consoleMssg}</Text>
                </View>
                <View style={{paddingLeft: 10, paddingRight: 10}}>
                    <Card1 />
                    <Card2 />
                    <Card3 />
                    <Card4 />
                </View>
                <BotNav />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home