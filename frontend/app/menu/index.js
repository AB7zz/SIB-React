import React from 'react'
import { View, Text } from 'react-native'
import { useStateContext } from '../../context/StateContext'

const index = () => {
    const [seconds, setSeconds] = React.useState(0)
    const {insertSecondsToS3} = useStateContext()
    React.useEffect(() => {
        setInterval(() => {
            setSeconds(seconds+1)
        }, 1000)

        return () => {
            insertSecondsToS3(seconds, 'st_menu')
        }
    }, [])
  return (
    <View>
        <Text>index</Text>
    </View>
  )
}

export default index