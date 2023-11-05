import { View, Text, SafeAreaView, ScrollView, Button } from 'react-native'
import { useStateContext } from '../context/StateContext'
import { Navbar, BotNav, Card1, Card2, Card3, Card4 } from '../components'
import React from 'react'
import { Entypo } from '@expo/vector-icons'; 
import styles from './home.style'
import { Link } from 'expo-router';

const Home = () => {
    const {triggerNoti, transactionTut, userDetails, setConsole, consoleMssg} = useStateContext()
    const [sentOnce, setSentOnce] = React.useState(false)
    React.useEffect(() => {
        const checkTimeAndTrigger = () => {
            const now = new Date();
            const targetTime = new Date();
            targetTime.setHours(10, 0, 0, 0); // Set the target time to 19:00:00
      
            if (now >= targetTime && !sentOnce) {
                setSentOnce(true)
                triggerNoti();
            }
          };
      
          // Check every second
          const intervalId = setInterval(() => {
            // checkTimeAndTrigger();
          }, 10000);
    }, [])
    return(
        <SafeAreaView>
            <ScrollView>
            <Link href="/chat">
                <View style={styles.chatContainer}>
                    <View style={styles.chatCircle}>
                        <Entypo style={{marginLeft: 5}} name="chat" size={32} color="white" />
                    </View>
                </View>
            </Link>
                <Navbar />
                <View>
                    {/* <Text>{consoleMssg || 'no mess'}</Text> */}
                </View>
                <View style={{paddingLeft: 10, paddingRight: 10}}>
                    <Card1 />
                    <Card4 />
                    <Card2 />
                    {/* <Card3 /> */}
                </View>
                <BotNav />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home