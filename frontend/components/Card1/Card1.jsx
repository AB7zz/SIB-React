import React from 'react'
import styles from './card1.style'
import { View, Text } from 'react-native'

const Card1 = () => {
  return (
    <View style={styles.container}>
        <View style={styles.subcontainer}>
            <Text style={{color: '#c5161d', fontSize: 20, fontWeight: 700}}>Stocks</Text>
            <View style={styles.description}>
                <View style={styles.subdesc}>
                    <Text style={{color: '#c5161d'}}>Reliance</Text>
                    <Text style={{color: '#c5161d'}}>- 0.03</Text>
                </View>
                <View style={styles.subdesc}>
                    <Text style={{color: '#c5161d'}}>TCS</Text>
                    <Text style={{color: '#c5161d'}}>- 0.27</Text>
                </View>
                <View style={styles.subdesc}>
                    <Text style={{color: '#c5161d'}}>HDFC Bank</Text>
                    <Text style={{color: 'green'}}>+0.45</Text>
                </View>
                <View style={styles.subdesc}>
                    <Text style={{color: '#c5161d'}}>ICICI Bank</Text>
                    <Text style={{color: 'green'}}>+0.53</Text>
                </View>
            </View>
        </View>
    </View>
  )
}

export default Card1