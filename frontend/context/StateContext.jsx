import React from 'react'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Constants from 'expo-constants';
import AWS from 'aws-sdk'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
});

const StateContext = React.createContext()

const s3Bucket = new AWS.S3({
  accessKey: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY,
  secretKey: process.env.EXPO_PUBLIC_AWS_SECRET_KEY,
  Bucket: process.env.EXPO_PUBIC_AWS_BUCKET,
  signatureVersion: 'v4'
})

async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      
      token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig.extra.eas.projectId })).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
}

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
}

export const StateContextProvider = ({ children }) => {
    const [console, setConsole] = React.useState('')
    const [expoPushToken, setExpoPushToken] = React.useState('');
    const [notification, setNotification] = React.useState(false);
    const notificationListener = React.useRef();
    const [counter, setCounter] = React.useState({
      user_id: 123,
      states:{
        login: 0,
        scan: 0,
        transfer: 0,
        menu: 0,
        recharge: 0
      }
    })
    const responseListener = React.useRef();
    React.useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
        });

        return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, [])
    const [transactionTut, setTransactionTut] = React.useState(false)
    const [userDetails, setUserDetails] = React.useState({
        user_id: 123,
        name: 'Abhinav C V',
        age: '20',
        bal: '1000'
    })
    const triggerNoti = async() => {
        await schedulePushNotification();
    }

    const insertSecondsToS3 = (seconds, state) => {
      const json_data = {
        seconds,
        state,
        user_id: userDetails.user_id
      }
      s3Bucket.createBucket(() => {
        const params = {
          Bucket: process.env.EXPO_PUBLIC_AWS_BUCKET,
          Key: `users/${userDetails.user_id}/time.json`,
          Body: json_data,
          ContentType: 'application/json'
        }

        s3Bucket.upload(params, (err, data) => {
          if(err){
            reject(err)
          }else{
            resolve(data.Location)
          }
        })
      })
    }
    return (
        <StateContext.Provider value={{
            transactionTut,
            userDetails,
            console,
            counter,
            setCounter,
            setConsole,
            setTransactionTut,
            triggerNoti,
            setUserDetails,
            insertSecondsToS3
        }}>
        {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => React.useContext(StateContext)