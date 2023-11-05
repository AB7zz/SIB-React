import React from 'react'
import styles from './card4.style'
import { View, Text } from 'react-native'
import { useStateContext } from '../../context/StateContext'

const Card4 = () => {
    const {counter} = useStateContext()
  return (
    <View style={styles.container}>
        {counter.states.stocks < 4 && <View style={styles.subcontainer}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 700}}>Fixed Deposits</Text>
            <View style={styles.description}>
                <View style={styles.subdesc}>
                    <Text style={{color: 'white'}}>500 days (SIB 94PLUS)</Text>
                    <Text style={{color: 'green'}}>7.30%</Text>
                </View>
                <View style={styles.subdesc}>
                    <Text style={{color: 'white'}}>500 days (SIB 94PLUS)</Text>
                    <Text style={{color: 'green'}}>7.30%</Text>
                </View>
                <View style={styles.subdesc}>
                    <Text style={{color: 'white'}}>500 days (SIB 94PLUS)</Text>
                    <Text style={{color: 'green'}}>7.30%</Text>
                </View>
            </View>
        </View>}
    </View>
  )
}

export default Card4