import {
  IonButton,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { useState } from "react";
import { addCircle } from "ionicons/icons";
import { insertProduct } from "../databaseHandler";

const Register: React.FC = () => {
  const [propertyType, setPropertyType] = useState('');
  const [bedroom, setBedroom] = useState('');
  const [dateandtime, setdateandtime] = useState(new Date().toISOString());
  const [price, setprice] = useState<number>();
  const [Furniture, setfurniture] = useState('');
  const [note, setnote] = useState('');
  const [reporter, setReporter] = useState('');


  const [present, dismiss] = useIonToast();
  
  const formatDate = (isoDateString: string) => {
    return new Date(isoDateString).toLocaleDateString("vi-VN");
  }

  function registerHandler() {
    var product = {
      propertyType: propertyType, bedroom: bedroom,
      price: price, Furniture: Furniture, note: note, reporter: reporter,
      dateandtime: dateandtime
    }
       
    insertProduct(product).then(() => {
      present("Insert customer successfully!", 3000)
    })

  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Property type:</IonLabel>
            <IonSelect onIonChange={e => setPropertyType(e.detail.value!)} >
              <IonSelectOption value="Flat">Flat</IonSelectOption>
              <IonSelectOption value="House">House</IonSelectOption>
              <IonSelectOption value="bungalow">bungalow</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Bedrooms:</IonLabel>
            <IonSelect onIonChange={(e) => setBedroom(e.detail.value!)} >
              <IonSelectOption value="studio">Studio</IonSelectOption>
              <IonSelectOption value="One">One bedroom</IonSelectOption>
              <IonSelectOption value="True">True bedroom</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Date and time:</IonLabel>
            <IonDatetime value={dateandtime} onIonChange={e => setdateandtime(e.detail.value!)}></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Monthly rent price: </IonLabel>
            <IonInput type="number"   placeholder="Monthly rent price (value in dollars)" onIonChange={(e) => setprice(parseInt(e.detail.value!))} ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Furniture types </IonLabel>
            <IonSelect onIonChange={(e) => setfurniture(e.detail.value!)} >
              <IonSelectOption value="Furnished">Furnished</IonSelectOption>
              <IonSelectOption value="Unfurnished">Unfurnished</IonSelectOption>
              <IonSelectOption value="partFurnished">partFurnished</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Notes: </IonLabel>
            <IonTextarea rows={3} placeholder="Enter any notes here..." onIonChange={e => setnote(e.detail.value!)}></IonTextarea>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Name of the reporter: </IonLabel>
            <IonInput onIonChange={e => setReporter(e.detail.value!)} ></IonInput>
          </IonItem>
          <IonButton onClick={registerHandler} color="secondary" expand="block">
            <IonIcon slot="icon-only" icon={addCircle}></IonIcon>
            save
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Register;
