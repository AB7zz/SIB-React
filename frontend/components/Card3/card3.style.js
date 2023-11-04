import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row'
    },
    subcontainer: {
        display: 'flex',
        flexDirection: 'row',
        width: 200,
        overflow: "scroll",
        justifyContent: 'space-between',
        backgroundColor: '#0e065c',
        marginRight: 10,
        borderRadius: 10,
        padding: 10,
        paddingTop: 15,
        paddingBottom: 15
    },
})

export default styles