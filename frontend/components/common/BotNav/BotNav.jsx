import React from 'react'
import { View, Text } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import styles from './botnav.style'
import { useStateContext } from '../../../context/StateContext'
import { Link } from 'expo-router'
import { TouchableOpacity } from 'react-native';
const BotNav = () => {
    const {counter, setCounter, insertClicksToS3, tut, setTut, setConsole} = useStateContext()
    
    const handleButtonClick = (dest) => {
        setTut(true)
        const updatedCounter = { ...counter };
        if(dest == 'home'){
            updatedCounter.states.home += 1,
            insertClicksToS3(updatedCounter.states.home, 'st_home')
        }else if(dest == 'transfer'){
            updatedCounter.states.transfer += 1,
            insertClicksToS3(updatedCounter.states.transfer, 'st_transfer')
        }else if(dest == 'scan'){
            updatedCounter.states.scan += 1,
            insertClicksToS3(updatedCounter.states.scan, 'st_scan')
        }else if(dest == 'recharge'){
            updatedCounter.states.recharge += 1,
            insertClicksToS3(updatedCounter.states.recharge, 'st_recharge')
        }else if(dest == 'menu'){
            updatedCounter.states.menu += 1,
            insertClicksToS3(updatedCounter.states.menu, 'st_menu')
        }
        setCounter(updatedCounter)
    }
  return (
    <View style={styles.container}>
        {tut &&
        <View style={{display: 'flex', justifyContent: 'center', marginLeft: 185}}>
            <FontAwesome name="hand-o-down" size={24} color="black" />
        </View>
        }
        <View style={styles.subcontainer}>
            <TouchableOpacity
            style={styles.icons}
            onPress={() => handleButtonClick('home')}
            >
                <Ionicons name="home-sharp" size={32} color="#c5161d" />
                <Link href="/home">Home</Link>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.icons}
            onPress={() => handleButtonClick('transfer')}
            >
                <MaterialCommunityIcons name="bank-transfer" size={32} color="#c5161d" />
                {/* <Ionicons name="bank-transfer" size={32} color="#c5161d" /> */}
                <Link href="/transfer">Fund Transfer</Link>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.icons}
            onPress={() => handleButtonClick('scan')}
            >
                <AntDesign name="scan1" size={32} color="#c5161d" />
                {/* <Ionicons name="line-scan" size={32} color="#c5161d" /> */}
                <Link href="/scan">Scan</Link>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.icons}
            onPress={() => handleButtonClick('recharge')}
            >
                <FontAwesome name="rupee" size={24} color="#c5161d" />
                {/* <Ionicons name="money-fill" size={32} color="#c5161d" /> */}
                <Link href="/recharge">Recharge</Link>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.icons}
            onPress={() => handleButtonClick('menu') }
            >
                <Ionicons name="menu-outline" size={32} color="#c5161d" />
                <Link href="/menu">Menu</Link>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default BotNav