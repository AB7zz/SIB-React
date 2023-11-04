import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    chatContainer:{
        position: 'fixed',
        left: 300,
        top: 600,
        zIndex: 9
    },
    chatCircle: {
        backgroundColor: "#c5161d",
        borderRadius: 50,
        paddingRight: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingTop: 5,
        width: 60,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    }
})

export default styles