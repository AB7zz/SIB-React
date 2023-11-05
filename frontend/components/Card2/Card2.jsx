import React from 'react'
import styles from './card2.style'
import { View, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'; 
import { useStateContext } from '../../context/StateContext';

const Card2 = () => {
  const {counter} = useStateContext()
  return (
    <>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 700}}>Offers</Text>
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                <Text style={{color: 'white', fontSize: 17}}>Offer1</Text>
                <MaterialIcons name="local-offer" size={24} color="white" />
            </View>
            <View style={styles.subcontainer}>
                <Text style={{color: 'white', fontSize: 17}}>Offer1</Text>
                <MaterialIcons name="local-offer" size={24} color="white" />
            </View>
        </View>
    </>
  )
}

export default Card2