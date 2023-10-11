import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import { useState, useEffect } from "react";
import axios from "axios";

export const Page = () => {
  const client = axios.create({
    baseURL: "http://localhost:3000/api/",
  });
  const [product, setProduct] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [productOpen, setProductOpen] = useState({});
  const handleShowAdd = () => setShowAdd(true);
  const handleShowEdit = (index) => {
    setProductOpen(product[index]);
    setShowEdit(true);
  };
  const getProducts = () => {
    client.get("product/").then((response) => {
      setProduct(response.data);
    });
  };
  const addProduct = (product) => {
    console.log(product);
    client.post("product/", product).then((response) => {
      console.log(response.data);
      getProducts();
      setShowAdd(false);
    });
  };
  const editProduct = (product, id) => {
    console.log(product);
    client.put(`product/${id}/`, product).then((response) => {
      console.log(response.data);
      getProducts();
      setShowEdit(false);
    });
  };
  useEffect(() => {
    client.get("product/").then((response) => {
      setProduct(response.data);
    });
  }, []);

  return (
    <Container>
      <header className="App-header">
        <h1>Product List</h1>
      </header>
      <Button variant="primary" className="my-2" onClick={handleShowAdd}>
        Add Product
      </Button>{" "}
      <AddModal show={showAdd} setShow={setShowAdd} addProduct={addProduct} />
      <EditModal
        show={showEdit}
        setShow={setShowEdit}
        editProduct={editProduct}
        item={productOpen}
      />
      {product.length === 0 ? (
        <h3>No data to display</h3>
      ) : (
        <>
          <Table bordered>
            <thead>
              <tr key="unique">
                <th key="productNumber">Product Number</th>
                <th key="productName">Product Name</th>
                <th key="scrumMaster">Scrum Master</th>
                <th key="productOwner">Product Owner</th>
                <th key="developerNames">Developer Names</th>
                <th key="startDate">Start Date</th>
                <th key="methodology">Methodology</th>
                <th key="location">Location</th>
                <td key="Edit">Edit</td>
              </tr>
            </thead>
            <tbody>
              {product.map((item, index) => (
                <tr key={item.productId}>
                  <td key={`productNumber-${item.productId}`}>
                    {item.productId}
                  </td>
                  <td key={`productName-${item.productId}`}>
                    {item.productName}
                  </td>
                  <td key={`scrumMasterName-${item.productId}`}>
                    {item.scrumMasterName}
                  </td>
                  <td key={`productOwnerName-${item.productId}`}>
                    {item.productOwnerName}
                  </td>
                  <td key={`developers-${item.productId}`}>
                    {item.Developers.map((dev) => (
                      <Badge bg="info" pill key={`${dev}=${item.productId}`}>
                        {dev}
                      </Badge>
                    ))}
                  </td>
                  <td key={`startDate-${item.productId}`}>{item.startDate}</td>
                  <td key={`methodology-${item.productId}`}>
                    {item.methodology}
                  </td>
                  <td key={`location-${item.productId}`}>{item.location}</td>
                  <td key={`edit-${item.productId}`}>
                    <Button
                      key={index}
                      variant="warning"
                      onClick={() => handleShowEdit(index)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4>Total number of products: {product.length}</h4>
        </>
      )}
    </Container>
  );
};

export default Page;
