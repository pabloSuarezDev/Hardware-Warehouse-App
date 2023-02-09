import { IonHeader, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { url } from "../helpers/global";
import { Button, Form } from "react-bootstrap";

const Editar = ({ todosProductos, setTodosProductos }) => {

  const params = useParams();
  const [producto, setProducto] = useState({});

  const getProducto = async (producto_id) => {
    const data = await fetch(`http://${url}/producto/${producto_id}`);
    const { producto } = await data.json();

    if (Object.keys(producto).length > 0) {
      setProducto(producto);
    }
  };

  const editar = async (e) => {
    e.preventDefault();

    let data = {
      nombre: e.target.nombre.value,
      precio: e.target.precio.value,
      stock: e.target.stock.value
    };

    if (data.nombre.length > 0 && data.precio.length > 0 && data.stock.length > 0) {
      const payload = await fetch(`http://${url}/producto/editar/${producto.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: data.nombre,
          precio: data.precio,
          stock: data.stock
        })
      });

      const dataFetched = await payload.json();

      if (dataFetched.status === "success") {
        let productosFiltrados = todosProductos.filter(producto => producto.id !== dataFetched.producto.id);

        setTodosProductos([...productosFiltrados, dataFetched.producto]);
      }
    }
  };

  useEffect(() => {
    getProducto(params.id);
  }, []);

  return (
    <>
      <IonHeader>
        <IonToolbar class="px-3" style={{ padding: "0px 20px", fontSize: "20px", fontWeight: "500", letterSpacing: "0.0125em" }}>
          Editar componente
        </IonToolbar>
      </IonHeader>
      {
        Object.keys(producto).length > 0 ? (
          <Form className="p-3" onSubmit={e => editar(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-light">Nombre</Form.Label>
              <Form.Control className="bg-dark text-light border-0 shadow-none" type="text" name="nombre" defaultValue={producto.nombre} pattern="[a-zA-z0-9\- ]+" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="text-light">Precio</Form.Label>
              <Form.Control className="bg-dark text-light border-0 shadow-none" type="number" name="precio" defaultValue={producto.precio} pattern="[0-9]+" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="text-light">Stock</Form.Label>
              <Form.Control className="bg-dark text-light border-0 shadow-none" type="number" name="stock" defaultValue={producto.stock} pattern="[0-9]+" required />
            </Form.Group>
            <Form.Group className="d-flex justify-content-center gap-3">
              <Button variant="primary" type="submit">
                Guardar
              </Button>
              <Button variant="danger" type="reset">
                Cancelar
              </Button>
            </Form.Group>
          </Form>
        ) : (
          <div className="text-center text-light p-3">
            <h1>Error 500</h1>
            <h3>Producto no encontrado</h3>
          </div>
        )
      }
    </>
  );
};

export default Editar;