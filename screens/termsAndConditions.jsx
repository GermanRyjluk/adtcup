import React, { Component, useState } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Header } from '../components/header';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

export default function TermsAndConditions({ navigation }) {

  const [accepted, setAccepted] = useState(false)
  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Termini e condizioni</Text>
        <ScrollView
          style={styles.tcContainer}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              setAccepted(true)
            }
          }}
          scrollEventThrottle={30}
        >
          <Text style={styles.tcP}>Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern [business name]’s relationship with you in relation to this website. If you disagree with any part of these terms and conditions, please do not use our website.</Text>
          <Text style={styles.tcP}>The term ‘[business name]’ or ‘us’ or ‘we’ refers to the owner of the website whose registered office is [address]. Our company registration number is [company registration number and place of registration]. The term ‘you’ refers to the user or viewer of our website.</Text>
          <Text style={styles.tcL}>{'\u2022'} The content of the pages of this website is for your general information and use only. It is subject to change without notice.</Text>
          <Text style={styles.tcL}>{'\u2022'} This website uses cookies to monitor browsing preferences. If you do allow cookies to be used, the following personal information may be stored by us for use by third parties: [insert list of information].</Text>
          <Text style={styles.tcL}>{'\u2022'} Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</Text>
          <Text style={styles.tcL}>{'\u2022'} Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.</Text>
          <Text style={styles.tcL}>{'\u2022'} This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</Text>
          <Text style={styles.tcL}>{'\u2022'} All trademarks reproduced in this website, which are not the property of, or licensed to the operator, are acknowledged on the website.
            Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence.</Text>
          <Text style={styles.tcL}>{'\u2022'} From time to time, this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).</Text>
          <Text style={styles.tcL}>{'\u2022'} Your use of this website and any dispute arising out of such use of the website is subject to the laws of England, Northern Ireland, Scotland and Wales.</Text>
          <Text style={styles.tcP}>The use of this website is subject to the following terms of use</Text>
        </ScrollView>

        <TouchableOpacity disabled={!accepted} onPress={() => { navigation.goBack() }} style={accepted ? styles.button : styles.buttonDisabled}><Text style={styles.buttonLabel}>Accept</Text></TouchableOpacity>
      </View>
    </>
  );
}

const { width, height } = Dimensions.get('window');

const styles = {

  container: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
    fontSize: 22,
    alignSelf: 'center'
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12
  },
  tcP: {
    marginTop: 10,
    fontSize: 12
  },
  tcL: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15,
    height: height * .7
  },

  button: {
    backgroundColor: '#136AC7',
    borderRadius: 5,
    padding: 10
  },

  buttonDisabled: {
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10
  },

  buttonLabel: {
    fontSize: 14,
    color: '#FFF',
    alignSelf: 'center'
  }

}


// import { View, Text, TouchableOpacity, Linking, Alert, Image } from "react-native";
// import React, { useState } from "react";
// import { colors } from "../shared/colors";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from "../firebase/firebase";
// import { Header } from "../components/header";

// import CheckBox from "expo-checkbox";

// export default function TermsAndConditions({ navigation, route }) {

//   const warningMessage = (state) => {
//     if (state) {
//       Alert.alert('Attenzione!', 'Se non hai inviato il google form, la tua richiesta di partecipazione non verrà considerata.', [
//         {
//           text: "L'ho compilato",
//           onPress: () => setCompleted(state),

//         },
//         {
//           text: "Compila form",
//           onPress: () => Linking.openURL("https://forms.gle/F9Asw7LQCaxHvnug6"),

//         },
//         {
//           text: "Esci",
//           onPress: () => null,
//           style: "cancel",
//         },
//       ],
//         {
//           cancelable: true,
//         },
//         [],
//         {
//           cancelable: true,
//           onDismiss: () => setCompleted(false),
//         })
//     } else {
//       setCompleted(state);
//     }
//   }
//   const handleSendRequest = async () => {
//     try {
//       await setDoc(
//         doc(
//           db,
//           "/events",
//           route.params.eventID,
//           "/bookings",
//           auth.currentUser.uid
//         ),
//         {
//           uid: auth.currentUser.uid,
//           name: auth.currentUser.displayName,
//           email: auth.currentUser.email,
//           status: "pending",
//         }
//       );
//       navigation.navigate("Home");
//       Alert.alert("Richiesta inviata!");
//     } catch (e) {
//       console.error(e);
//     }
//   };
//   return (
//     <>
//       <Header />
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: colors.primary,
//           padding: 30,
//         }}
//       >
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <Text style={{ fontSize: 25, fontWeight: '800', color: colors.secondary, textAlign: 'center' }}>FAI IL QUESTIONARIO E INVIA LA TUA RICHIESTA DI PARTECIPAZIONE</Text>
//         </View>
//         <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
//           <TouchableOpacity
//             style={{
//               padding: 20,
//               width: 250,
//               height: 70,
//               backgroundColor: colors.bg,
//               alignItems: "center",
//               justifyContent: "space-evenly",
//               borderRadius: 50,
//               flexDirection: 'row'
//             }}
//             onPress={() => {
//               Linking.openURL("https://forms.gle/F9Asw7LQCaxHvnug6");
//             }}
//           >
//             <Image source={require('../assets/googledocs.png')} style={{ width: 25, height: 31 }} />
//             <Text style={{ color: "black", fontSize: 25, fontWeight: "800", color: colors.primary }}>
//               Google Form
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
//           <View style={{ width: 250, flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
//             <CheckBox
//               style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
//               value={completed}
//               onValueChange={(state) => warningMessage(state)}
//               color={colors.secondary}
//             />
//             <Text style={{ fontSize: 15, fontWeight: '500', color: '#dadada' }}>Ho compilato il form</Text>
//           </View><View style={{ width: 250, flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
//             <CheckBox
//               style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
//               value={completedPrivacyPolicy}
//               onValueChange={(state) => setCompletedPrivacyPolicy(state)}
//               color={colors.secondary}
//             />
//             <Text style={{ fontSize: 15, fontWeight: '500', color: '#dadada' }}>Accetto</Text>
//             <TouchableOpacity >

//               <Text style={{ fontSize: 15, fontWeight: '500', color: colors.secondary }}> termini e condizioni</Text>
//             </TouchableOpacity>
//           </View>
//           <TouchableOpacity
//             disabled={!completed && !completedPrivacyPolicy}
//             style={{
//               padding: 20,
//               width: 250,
//               height: 70,
//               backgroundColor: completed && completedPrivacyPolicy ? colors.secondary : 'gray',
//               alignItems: "center",
//               justifyContent: "center",
//               borderRadius: 50,
//             }}
//             onPress={() => {
//               handleSendRequest();
//             }}
//           >
//             <Text
//               style={{ color: completed && completedPrivacyPolicy ? colors.primary : '#474747', fontSize: 25, fontWeight: "800" }}
//             >
//               Invia richiesta
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </>
//   );
// }
