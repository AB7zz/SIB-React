import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
    },
    heading: {
        backgroundColor: "#c5161d",
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10
    },
    body: {
        paddingLeft: 10,
        paddingRight: 10
    },
    incoming: {
        backgroundColor: "#FFC4B8",
        borderRadius: 10,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,
        width: 200,
        marginTop: 10,
        marginBottom: 10
    },
    outgoing:{
        backgroundColor: "#CBFFFE",
        left: 140,
        borderRadius: 10,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,
        width: 200,
        marginTop: 10,
        marginBottom: 10
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    input: {
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        width: 300,
        marginRight: 10
    }
})

export default styles