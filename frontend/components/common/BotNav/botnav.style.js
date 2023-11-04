import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        position: 'fixed',
        bottom: 0,
        backgroundColor: 'white'
    },
    subcontainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
})

export default styles