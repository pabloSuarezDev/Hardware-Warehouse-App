import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { hardwareChipOutline, searchOutline, addCircleOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { url } from './helpers/global';
import Componentes from './components/Componentes';
import Buscar from './components/Buscar';
import Agregar from './components/Agregar';
import Editar from './components/Editar';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {

  const [todosProductos, setTodosProductos] = useState([]);
  const [categorias, setCategorias] = useState([]); 

  const getData = async (): Promise<void> => {
    let categoriesData: Response = await fetch(`http://${url}/categoria/todas`);
    let marcasData: Response = await fetch(`http://${url}/marca/todas`);
    let productoData: Response = await fetch(`http://${url}/producto/todos`);
    
    let { categorias } = await categoriesData.json();
    let { marcas } = await marcasData.json();
    let { productos } = await productoData.json();

    if (categorias.length > 0 && marcas.length > 0 && productos.length > 0) {
      localStorage.setItem("categorias", JSON.stringify(categorias));
      localStorage.setItem("marcas", JSON.stringify(marcas));
      setCategorias(categorias);
      setTodosProductos(productos);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/componentes">
              <Componentes 
                categorias={categorias} 
                setCategorias={setCategorias}
                todosProductos={todosProductos}
                setTodosProductos={setTodosProductos}
              />
            </Route>
            <Route exact path="/buscar">
              <Buscar todosProductos={{todosProductos}} />
            </Route>
            <Route path="/agregar">
              <Agregar 
                todosProductos={todosProductos}
                setTodosProductos={setTodosProductos} 
              />
            </Route>
            <Route exact path="/">
              <Redirect to="/componentes" />
            </Route>
            <Route path="/editar/:id">
              <Editar
                todosProductos={todosProductos}
                setTodosProductos={setTodosProductos}
              />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="componentes" href="/componentes">
              <IonIcon icon={hardwareChipOutline} />
              <IonLabel>Componentes</IonLabel>
            </IonTabButton>
            <IonTabButton tab="buscar" href="/buscar">
              <IonIcon icon={searchOutline} />
              <IonLabel>Buscar</IonLabel>
            </IonTabButton>
            <IonTabButton tab="agregar" href="/agregar">
              <IonIcon icon={addCircleOutline} />
              <IonLabel>Añadir</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;