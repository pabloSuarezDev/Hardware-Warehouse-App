import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { searchOutline } from 'ionicons/icons';

const Buscar = ({ todosProductos }) => {

  const [busqueda, setBusqueda] = useState();

  const buscar = (e) => {
    e.preventDefault();
    let busqueda = e.target.search.value.toLowerCase();
    let producto_filtrado = todosProductos.todosProductos.filter(producto => producto.nombre.toLowerCase().includes(busqueda));

    if(producto_filtrado.length > 0) { 
      setBusqueda(producto_filtrado); 
    } else {
      setBusqueda("Sin resultados");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Buscar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Buscar</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Form className="d-flex flex-row-reverse w-75 m-auto my-3" onSubmit={e => buscar(e)}>
          <Form.Control
            type="search"
            placeholder="Buscar componentes"
            className="shadow-none border-0 bg-dark"
            aria-label="Search"
            name="search"
            style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0", color: "white" }}
          />
          <Button
            className="d-flex align-items-center bg-violet border-0"
            style={{ borderTopRightRadius: "0", borderBottomRightRadius: "0" }}
          >
            <IonIcon icon={searchOutline}></IonIcon>
          </Button>
        </Form>
        <div className="d-flex flex-wrap justify-content-center gap-1">
          {
            busqueda?.length > 0 &&
            busqueda === "Sin resultados" ? (
              <div>
                <h3>{busqueda}</h3>
              </div>
            ) : (
              busqueda?.map((resultado, index) => {
                return (
                  <Card className="bg-dark" style={{ width: '18rem' }} key={index}>
                    <Card.Body>
                      <Card.Title className="text-light">{resultado.nombre}</Card.Title>
                      <Card.Text className="text-light">
                        <span>Precio: {resultado.precio}€</span>
                        <br />
                        <span>Stock: {resultado.stock} unidades</span>
                      </Card.Text>
                      <Button className="btn-violet border-0 text-light">
                        <a href={`/editar/${resultado.id}`} className="text-decoration-none text-light">
                          Editar
                        </a>
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })
            )
          }
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Buscar;
