import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { url } from '../helpers/global';
import { Button, Dropdown, Form } from 'react-bootstrap';

const Agregar = ({ todosProductos, setTodosProductos }) => {

  const todasCategorias = JSON.parse(localStorage.getItem("categorias"));
  const todasMarcas = JSON.parse(localStorage.getItem("marcas"));
  const [filtroCat, setFiltroCat] = useState("Escoger categoria");
  const [filtroMarc, setFiltroMarc] = useState("Escoger marca");

  const agregar = async (e) => {
    e.preventDefault();

    let categoriaId = todasCategorias.filter(categoria => categoria.nombre === e.target.formCategoria.value);
    let marcaId = todasMarcas.filter(marca => marca.nombre === e.target.formMarca.value);

    if(categoriaId[0].id === "Escoger categoria" || marcaId[0].id === "Escoger marca") { return false; }

    let data = {
      nombre: e.target.nombre.value,
      categoriaId: categoriaId[0].id,
      marcaId: marcaId[0].id,
      precio: e.target.precio.value,
      stock: e.target.stock.value
    };

    if (data.nombre.length > 0 && typeof data.categoriaId === "number" && typeof data.marcaId === "number" && data.precio.length > 0 && data.stock.length > 0) {
      const payload = await fetch(`http://${url}/producto/agregar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: data.nombre,
          categoriaId: data.categoriaId,
          marcaId: data.marcaId,
          precio: data.precio,
          stock: data.stock
        })
      });

      const dataFetched = await payload.json();

      if (dataFetched.status === "success") {
        setTodosProductos([...todosProductos, dataFetched.producto]);
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Agregar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Agregar</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Form className="p-3" onSubmit={e => agregar(e)}>
          <h3 className="text-center">Añadir producto</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nombre</Form.Label>
            <Form.Control className="shadow-none border-0 bg-dark text-light" name="nombre" type="text" placeholder="Nombre del producto..." pattern="[a-zA-Z0-9 ]+" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Precio</Form.Label>
            <Form.Control className="shadow-none border-0 bg-dark text-light" name="precio" type="number" placeholder="Precio del producto..." pattern="[0-9]+" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Stock</Form.Label>
            <Form.Control className="shadow-none border-0 bg-dark text-light" name="stock" type="number" placeholder="Stock del producto" pattern="[0-9]+" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Dropdown className="d-flex justify-content-center my-3">
              <Dropdown.Toggle className="btn-violet border-0" id="dropdown-basic" style={{ minWidth: "90vw" }}>
                {filtroCat}
                <input type="hidden" name="formCategoria" value={filtroCat} />
              </Dropdown.Toggle>
              <Dropdown.Menu className="flex-column justify-content-center">
                <ul className="m-0 p-0">
                  {
                    todasCategorias?.length > 0 &&
                    todasCategorias?.map(categoria => {
                      return (
                        <li
                          className="dropdown-item user-select-none" key={categoria.id}
                          onClick={() => setFiltroCat(categoria.nombre)}
                          style={{ minWidth: "90vw" }}
                        >
                          {categoria.nombre}
                        </li>
                      );
                    })
                  }
                </ul>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Dropdown className="d-flex justify-content-center my-3">
              <Dropdown.Toggle className="btn-violet border-0" id="dropdown-basic" style={{ minWidth: "90vw" }}>
                {filtroMarc}
                <input type="hidden" name="formMarca" value={filtroMarc} />
              </Dropdown.Toggle>
              <Dropdown.Menu className="flex-column justify-content-center">
                <ul className="m-0 p-0">
                  {
                    todasMarcas?.length > 0 &&
                    todasMarcas?.map(marca => {
                      return (
                        <li
                          className="dropdown-item user-select-none" key={marca.id}
                          onClick={() => setFiltroMarc(marca.nombre)}
                          style={{ minWidth: "90vw" }}
                        >
                          {marca.nombre}
                        </li>
                      );
                    })
                  }
                </ul>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Form.Group className="d-flex justify-content-center gap-3">
            <Button className="btn-primary border-0" type="submit">
              Añadir
            </Button>
            <Button variant="danger" type="reset">
              Cancelar
            </Button>
          </Form.Group>
        </Form>
      </IonContent>
    </IonPage>
  );
};

export default Agregar;