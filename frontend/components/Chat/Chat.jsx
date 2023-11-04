import React from 'react'
import styles from './chat.style'
import { View, Text, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 
import { useStateContext } from '../../context/StateContext';
import axios from 'axios'

const Chat = () => {
    const {consoleMssg, setConsole} = useStateContext()
    const [inputValue, setInputValue] = React.useState('');
    const [aiValue, setAiValue] = React.useState('')
    const handleSend = async() => {
        try {
            const res = await axios.post('http://localhost:8000/gpt4', {
                prompt: inputValue // sending the inputValue to the backend
            })
            setAiValue(res.data.response)
        } catch (error) {
            setConsole(JSON.stringify(error))
        }
    }
    const handleInputChange = (text) => {
        setInputValue(text);
        setConsole(text)
      };
  return (
    <View style={styles.container}>
        {/* <Text>{consoleMssg}</Text> */}
        <View style={styles.heading}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 800}}>AI ChatBot</Text>
        </View>
        <View style={styles.body}>
            <View style={styles.outgoing}>
                <Text>{inputValue || 'Your message goes here'}</Text>
            </View>
            <View style={styles.incoming}>
                <Text>{aiValue || 'AI response comes here'}</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter text..."
                    onChangeText={handleInputChange}
                />
                <Ionicons onPress={handleSend} name="send" size={24} color="black" />
            </View>
        </View>

    </View>
  )
}

export default Chat