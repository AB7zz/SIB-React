import React from 'react'
import styles from './card3.style'
import { View, Text } from 'react-native'

const Card3 = () => {
  return (
    <>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 700}}>Offers</Text>
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                <Text style={{color: 'white', fontSize: 17}}>Offer1</Text>
            </View>
            <View style={styles.subcontainer}>
                <Text style={{color: 'white', fontSize: 17}}>Offer1</Text>
            </View>
        </View>
    </>
  )
}

export default Card3