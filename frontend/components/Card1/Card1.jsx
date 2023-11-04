import React from 'react'
import styles from './card1.style'
import { View, Text } from 'react-native'

const Card1 = () => {
  return (
    <View style={styles.container}>
        <View style={styles.subcontainer}>
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
        </View>
    </View>
  )
}

export default Card1