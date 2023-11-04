import React from 'react'
import { View, Text } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import styles from './botnav.style'
import { useStateContext } from '../../../context/StateContext'
import { Link } from 'expo-router'

const BotNav = () => {
    const {counter, setCounter} = useStateContext()
    
    const handleButtonClick = (dest) => {
        const updatedCounter = { ...counter };
        if(dest == 'login'){
            updatedCounter.states.login += 1
        }else if(dest == 'transfer'){
            updatedCounter.states.transfer += 1
        }else if(dest == 'scan'){
            updatedCounter.states.scan += 1
        }else if(dest == 'recharge'){
            updatedCounter.states.recharge += 1
        }else if(dest == 'menu'){
            updatedCounter.states.menu += 1
        }
        setCounter(updatedCounter)
    }
  return (
    <View style={styles.container}>
        <View style={styles.subcontainer}>
            <View
            style={styles.icons}
            onPress={() => handleButtonClick('menu')}
            >
                <Ionicons name="home-sharp" size={32} color="#c5161d" />
                <Link href="/home">Home</Link>
            </View>
            <View
            style={styles.icons}
            onPress={() => handleButtonClick('transfer')}
            >
                <MaterialCommunityIcons name="bank-transfer" size={32} color="#c5161d" />
                {/* <Ionicons name="bank-transfer" size={32} color="#c5161d" /> */}
                <Link href="/transfer">Fund Transfer</Link>
            </View>
            <View
            style={styles.icons}
            onPress={() => handleButtonClick('scan')}
            >
                <AntDesign name="scan1" size={32} color="#c5161d" />
                {/* <Ionicons name="line-scan" size={32} color="#c5161d" /> */}
                <Link href="/scan">Scan</Link>
            </View>
            <View
            style={styles.icons}
            onPress={() => handleButtonClick('recharge')}
            >
                <FontAwesome name="rupee" size={24} color="#c5161d" />
                {/* <Ionicons name="money-fill" size={32} color="#c5161d" /> */}
                <Link href="/recharge">Recharge</Link>
            </View>
            <View
            style={styles.icons}
            onPress={() => handleButtonClick('menu')}
            >
                <Ionicons name="menu-outline" size={32} color="#c5161d" />
                <Link href="/menu">Menu</Link>
            </View>
        </View>
    </View>
  )
}

export default BotNav