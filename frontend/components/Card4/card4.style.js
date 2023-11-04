import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#c5161d",
        paddingTop: 10,
        paddingRight: 15,
        paddingBottom: 10,
        paddingLeft: 15,
        borderRadius: 12,
        marginTop: 15,
        marginBottom: 15
    },
    subcontainer: {
        display: 'grid',
    },
    description: {
        marginTop: 10,
        display: 'block',
    },
    subdesc: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 5
    }
})

export default styles