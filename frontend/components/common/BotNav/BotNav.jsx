import React from 'react'
import { View, Text } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import styles from './botnav.style'
import {useRouter} from 'expo-router'
import { useStateContext } from '../../../context/StateContext'

const BotNav = () => {
    const {counter, setCounter} = useStateContext()
    
    const router = useRouter()
    
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
        router.push(`/${dest}`)
    }
  return (
    <View style={styles.container}>
        <View style={styles.subcontainer}>
            <View
            onPress={() => handleButtonClick('menu')}
            >
                <Ionicons name="home-sharp" size={32} color="green" />
                <Text>Home</Text>
            </View>
            <View
            onPress={() => handleButtonClick('transfer')}
            >
                <Ionicons name="md-checkmark-circle" size={32} color="green" />
                <Text>Fund Transfer</Text>
            </View>
            <View
            onPress={() => handleButtonClick('scan')}
            >
                <Ionicons name="md-checkmark-circle" size={32} color="green" />
                <Text>Scan</Text>
            </View>
            <View
            onPress={() => handleButtonClick('recharge')}
            >
                <Ionicons name="md-checkmark-circle" size={32} color="green" />
                <Text>Recharge</Text>
            </View>
            <View
            onPress={() => handleButtonClick('menu')}
            >
                <Ionicons name="menu-outline" size={32} color="green" />
                <Text>Menu</Text>
            </View>
        </View>
    </View>
  )
}

export default BotNav