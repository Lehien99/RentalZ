import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { deleteProduct, getProduct, updateProduct } from '../databaseHandler';
import { Product } from '../models';
import { trashBin } from 'ionicons/icons'

interface ParamId {
  id: string
}


const Details: React.FC = () => {
  const [propertyType, setPropertyType] = useState('');
  const [bedroom, setBedroom] = useState('');
  const [dateandtime, setdateandtime] = useState(new Date().toISOString());
  const [price, setprice] = useState<number>();
  const [Furniture, setfurniture] = useState('');
  const [note, setnote] = useState('');
  const [reporter, setReporter] = useState('');

  const history = useHistory();

  const { id } = useParams<ParamId>()
  const [currentProduct, setCurrentProduct] = useState<Product>();

  async function fetchData() {
    var result = await getProduct(Number.parseInt(id));
    setCurrentProduct(result);
    setPropertyType(result.propertyType!)
    setBedroom(result.bedroom!)
    setdateandtime(result.dateandtime!)
    setprice(result.price!)
    setfurniture(result.Furniture!)
    setnote(result.note!)
    setReporter(result.reporter!)
  }
  function formatVNDate(isoDate: string) {
    return new Date(isoDate).toLocaleDateString("vi-VN")
  }

  function updateHandle(){
    var product = {
      id:Number.parseInt(id), propertyType: propertyType, bedroom: bedroom,
      price: price, Furniture: Furniture, note: note, reporter: reporter,
      dateandtime: dateandtime
    }
       
    updateProduct(product);
    alert('Update done!')

  }
  async function handleDelete() {
    //call databaseHandle to delete the current customer
    let r = window.confirm("Are you sure to delete product ");
    console.log('your action', r)
    if (!r) {
      alert("You cancelled!")
    } else {
      await deleteProduct(Number.parseInt(id));
      history.goBack();
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonIcon onClick={handleDelete} icon={trashBin} slot="end"></IonIcon>
          <IonTitle>Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" >
        {currentProduct &&
          <IonList>
            <IonItemDivider color="secondary">
              <IonLabel>
                <big>propertyType</big>
              </IonLabel>
            </IonItemDivider>
            <IonItem>
              <IonSelect value={propertyType} onIonChange={e => setPropertyType(e.detail.value!)} >
                <IonSelectOption value="Flat">Flat</IonSelectOption>
                <IonSelectOption value="House">House</IonSelectOption>
                <IonSelectOption value="bungalow">bungalow</IonSelectOption>
              </IonSelect>
              {/* <IonInput >{currentProduct.propertyType}</IonInput> */}
            </IonItem>
            <IonItemDivider color="secondary">
              <IonLabel>
                <big>bedroom</big>
              </IonLabel>
            </IonItemDivider>
            <IonItem> <IonSelect value={bedroom} onIonChange={(e) => setBedroom(e.detail.value!)} >
              <IonSelectOption value="studio">Studio</IonSelectOption>
              <IonSelectOption value="One">One bedroom</IonSelectOption>
              <IonSelectOption value="True">True bedroom</IonSelectOption>
            </IonSelect></IonItem>
            <IonItemDivider color="secondary">
              <IonLabel>
                <big>dateandtime</big>
              </IonLabel>
            </IonItemDivider>
            <IonItem>
              <IonDatetime value={dateandtime}
                onIonChange={e => setdateandtime(e.detail.value!)}>
              </IonDatetime>
            </IonItem>
            <IonItemDivider color="secondary">
              <IonLabel>
                <big>price</big>
              </IonLabel>
            </IonItemDivider>
            <IonItem><IonInput onIonChange={(e) => setprice(parseInt(e.detail.value!))}
              value={price}>

            </IonInput>
            </IonItem>
            <IonItemDivider color="secondary">
              <IonLabel>
                <big>Furniture types</big>
              </IonLabel>
            </IonItemDivider>
            <IonItem>
            <IonSelect value={Furniture} onIonChange={(e) => setfurniture(e.detail.value!)} >
              <IonSelectOption value="Furnished">Furnished</IonSelectOption>
              <IonSelectOption value="Unfurnished">Unfurnished</IonSelectOption>
              <IonSelectOption value="partFurnished">partFurnished</IonSelectOption>
            </IonSelect>
            </IonItem>
            <IonItemDivider color="secondary">
              <IonLabel>
                <big>note</big>
              </IonLabel>
            </IonItemDivider>
            <IonItem>
              <IonInput onIonChange={e => setnote(e.detail.value!)}
                value={note}>

              </IonInput>
            </IonItem>
            <IonItemDivider color="secondary">
              <IonLabel>
                <big>reporter</big>
              </IonLabel>
            </IonItemDivider>
            <IonItem>
            <IonInput onIonChange={e => setReporter(e.detail.value!)}
                value={reporter}>

              </IonInput>
            </IonItem>
          </IonList>
        }
        <IonButton onClick={updateHandle} expand="block" color="warning">Update</IonButton>
      </IonContent>
    </IonPage>
  );
};
export default Details;
