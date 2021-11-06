import { RefresherEventDetail } from '@ionic/core';
import { IonContent, IonHeader, IonItem, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../databaseHandler';
import { Product } from '../models';


const Home: React.FC = () => {
  const [products, setProduct] = useState<Product[]>([]);

  async function fetchData() {
    let allProducts = await getAllProducts();
    setProduct(allProducts)
    console.log(products)
  }
  //it will run at least once every time the page is rendered

  useEffect(() => {
    fetchData();
  }, [])
  async function refreshTheData(event: any) {
    await fetchData() //to update customer list again
    setTimeout(() => { //pause some time to show the effect: refreshing
      event.detail.complete(); //done the refreshing=>effect will disapear
      console.log('Refresh completed!')
    }, 1000)

  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" >
        <IonRefresher slot='fixed' onIonRefresh={refreshTheData}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {products &&

          <IonList>
            <IonItem  >
              <IonItem >id </IonItem>
              <IonItem >reporter</IonItem>
              <IonItem >propertyType </IonItem>
              <IonItem >bedroom</IonItem>
              <IonItem >dateandtime</IonItem>
              <IonItem >price</IonItem>
              <IonItem >note</IonItem>
              <IonItem >Furniture</IonItem>
            </IonItem>
            {
              products.map((c, i) =>
                <IonItem button key={i} routerLink={'/detail/' + c.id} >
                  <IonItem >{c.id} </IonItem>
                  <IonItem >{c.reporter}</IonItem>
                  <IonItem >{c.propertyType} </IonItem>
                  <IonItem >{c.bedroom}</IonItem>
                  <IonItem ></IonItem>
                  <IonItem >{c.price}</IonItem>
                  <IonItem >{c.note}</IonItem>
                  <IonItem >{c.Furniture}</IonItem>
                
                </IonItem>

              )

            }
          </IonList>

        }
      </IonContent>
    </IonPage>
  );
};

export default Home;
