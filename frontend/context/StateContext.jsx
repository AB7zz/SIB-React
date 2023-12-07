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
    const [tut, setTut] = React.useState(false)
    const [counter, setCounter] = React.useState({
      user_id: 123,
      states:{
        home: 0,
        scan: 0,
        transfer: 0,
        menu: 0,
        recharge: 0,
        stocks: 0
      }
    })
    const responseListener = React.useRef();
    const triggerNoti = async() => {
      await schedulePushNotification();
  }
  const [sentOnce, setSentOnce] = React.useState(false)
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
    

    const insertSecondsToS3 = (seconds, state) => {
      const csv_data = `${seconds},${state},${userDetails.user_id}\n`;
      setConsole(csv_data);
  
      const s3Params = {
          Bucket: process.env.EXPO_PUBLIC_AWS_BUCKET,
          Key: `users/time.csv`
      };
  
      s3Bucket.getObject(s3Params, (err, data) => {
        if (err) {
            console.error("Error fetching existing file from S3:", err);
        } else {
          const existingData = data.Body.toString('utf-8');
          const updatedData = existingData + csv_data;

          const uploadParams = {
              Bucket: process.env.EXPO_PUBLIC_AWS_BUCKET,
              Key: `users/time.csv`,
              Body: updatedData,
              ContentType: 'text/csv'
          };

          s3Bucket.upload(uploadParams, (err, data) => {
              if (err) {
                  console.error("Error uploading updated file to S3:", err);
              } else {
                  console.log("File updated and uploaded successfully:", data.Location);
              }
          });
        }
      });
    };
  
    const insertClicksToS3 = (clicks, state) => {
      const csv_data = `${clicks},${state},${userDetails.user_id}\n`;
      setConsole(csv_data);
  
      const s3Params = {
          Bucket: process.env.EXPO_PUBLIC_AWS_BUCKET,
          Key: `users/click.csv`
      };
  
      s3Bucket.getObject(s3Params, (err, data) => {
        if (err) {
            console.error("Error fetching existing file from S3:", err);
        } else {
          // Append new row to existing content
          const existingData = data.Body.toString('utf-8');
          const updatedData = existingData + csv_data;

          // Upload the updated content back to S3
          const uploadParams = {
              Bucket: process.env.EXPO_PUBLIC_AWS_BUCKET,
              Key: `users/click.csv`,
              Body: updatedData,
              ContentType: 'text/csv'
          };

          s3Bucket.upload(uploadParams, (err, data) => {
              if (err) {
                  console.error("Error uploading updated file to S3:", err);
              } else {
                  console.log("File updated and uploaded successfully:", data.Location);
              }
          });
        }
      });
    };
  
    return (
        <StateContext.Provider value={{
            transactionTut,
            userDetails,
            consoleMssg,
            counter,
            tut,
            setCounter,
            setConsole,
            setTransactionTut,
            triggerNoti,
            setUserDetails,
            insertSecondsToS3,
            insertClicksToS3,
            setTut
        }}>
        {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => React.useContext(StateContext)