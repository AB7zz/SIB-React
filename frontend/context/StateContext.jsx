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
  accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY,
  secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET_KEY,
  Bucket: process.env.EXPO_PUBIC_AWS_BUCKET,
  signatureVersion: 'v4',
  apiVersion: 'latest',
  region: 'us-east-1'
})

// const s3Bucket = new AWS.S3({
//   accessKeyId: "AKIA6JVV7EGVRGDLBT6K",
//   secretAccessKey: "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",
//   Bucket: "sib-react",
//   signatureVersion: 'v4',
//   apiVersion: 'latest',
//   region: 'us-east-1'
// })

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
    const [consoleMssg, setConsole] = React.useState('')
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
    const triggerNoti = async() => {
      await schedulePushNotification();
  }
    React.useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
        });

        const checkTimeAndTrigger = () => {
          const now = new Date();
          const targetTime = new Date();
          targetTime.setHours(19, 0, 0, 0); // Set the target time to 19:00:00
    
          if (now >= targetTime) {
            triggerNoti();
          }
        };
    
        // Initial check
        checkTimeAndTrigger();
    
        // Check every second
        const intervalId = setInterval(() => {
          checkTimeAndTrigger();
        }, 1000);

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
    

    const insertSecondsToS3 = (seconds, state) => {
      // AWS.config.region = 'us-east-1'
      // const credentials = new AWS.CognitoIdentityCredentials({
      //   IdentityPoolId: 'us-east-1:your-id-here',
      // })
      // const locationClient = new AWS.Location({
      //   credentials,
      // })
      
      // const json_data = {
      //   seconds,
      //   state,
      //   user_id: userDetails.user_id
      // }
      const csv_data = `${seconds},${state},${userDetails.user_id}\n`
      setConsole(csv_data)
      s3Bucket.createBucket(() => {
        const params = {
          Bucket: process.env.EXPO_PUBLIC_AWS_BUCKET,
          Key: `users/time.csv`,
          Body: csv_data,
          ContentType: 'text/csv'
        }

        s3Bucket.upload(params, (err, data) => {
          if(err){
            console.log(err)
          }else{
            console.log(data.Location)
          }
        })
      })
    }
    return (
        <StateContext.Provider value={{
            transactionTut,
            userDetails,
            consoleMssg,
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