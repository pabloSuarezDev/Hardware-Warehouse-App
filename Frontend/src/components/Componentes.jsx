import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { url } from '../helpers/global';
import { Button, Dropdown } from 'react-bootstrap';
import '../theme/Componentes.css';

const Componentes = ({ categorias, setCategorias, todosProductos, setTodosProductos }) => {

  const todasCategorias = JSON.parse(localStorage.getItem("categorias"));
  const [productos, setProductos] = useState([]);
  const [filtroCat, setFiltroCat] = useState("Filtrar categorias");

  const filtrarCategoria = (nombre_categoria, categoria_id = null) => {
    if (nombre_categoria === "Filtrar categorias") {
      setProductos(todosProductos);
      setCategorias(todasCategorias);
      setFiltroCat("Filtrar categorias");
      return true;
    }

    let productos_filtrados = todosProductos.filter(producto => producto.categoriaId === categoria_id);

    if (productos.length > 0 && productos_filtrados.length > 0) {
      setProductos(productos_filtrados);
      setFiltroCat(nombre_categoria);
    }
  };

  const borrar = async (producto_id) => {
    const producto_eliminado = await fetch(`http://${url}/producto/borrar/${producto_id}`, { method: "DELETE" })
    const dataFetched = await producto_eliminado.json();
    if (dataFetched.status === "success") {
      let nuevoListadoProd = todosProductos.filter(producto => producto.id !== dataFetched.producto.id);
      setTodosProductos(nuevoListadoProd);
    }
  };

  useEffect(() => {
    setProductos(todosProductos);
  }, [todosProductos]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Componentes</IonTitle> 
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Componentes</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          <Dropdown className="d-flex justify-content-center my-3">
            <Dropdown.Toggle className="btn-violet border-0" id="dropdown-basic" style={{ width: "160px" }}>
              {filtroCat}
            </Dropdown.Toggle>
            <Dropdown.Menu className="flex-column justify-content-center">
              <ul className="m-0 p-0">
                {
                  categorias?.length > 0 &&
                  categorias?.map(categoria => {
                    return (
                      <li
                        className="dropdown-item user-select-none" key={categoria.id}
                        onClick={() => filtrarCategoria(categoria.nombre, categoria.id)}
                      >
                        {categoria.nombre}
                      </li>
                    );
                  })
                }
                {
                  filtroCat !== "Filtrar categorias" ? (
                    <li
                      className="dropdown-item user-select-none" key="default"
                      onClick={() => filtrarCategoria("Filtrar categorias")}
                    >
                      Filtrar categorias
                    </li>
                  ) : false
                }
              </ul>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <table className="styled__table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Gestionar</th>
            </tr>
          </thead>
          <tbody>
            {
              productos.length > 0 &&
              productos.map(producto => {
                return (
                  <tr className="active-row" key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>{producto.precio}€</td>
                    <td>{producto.stock}</td>
                    <td>
                      <a href={`/editar/${producto.id}`} className="btn btn-primary text-text-decoration-none mb-3">Editar</a>
                      <br />
                      <Button variant="danger" onClick={() => borrar(producto.id)}>
                        Borrar
                      </Button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </IonContent>
    </IonPage >
  );
};

export default Componentes;