import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import serialize from "form-serialize";
import { useState } from "react";

export const AddModal = ({ show, setShow, addProduct }) => {
  const [devList, setDevList] = useState([]);
  const [devInput, setDevInput] = useState("");
  const handleClose = () => {
    setDevList([]);
    setDevInput("");
    setShow(false);
  };
  const handleAdd = (e) => {
    if (devInput.length > 0 && !devList.includes(devInput)) {
      let devListCopy = [...devList];
      devListCopy.push(devInput);
      setDevInput("");
      setDevList(devListCopy);
    }
  };
  const handleCreate = (e) => {
    e.preventDefault();
    const data = serialize(e.target, { hash: true, empty: true });
    data["Developers"] = devList;
    data["location"] = "";
    setDevList([]);
    setDevInput("");
    addProduct(data);
  };
  const removeDeveloper = (dev) => {
    let devListCopy = [...devList];
    devListCopy.splice(devListCopy.indexOf(dev), 1);
    setDevList(devListCopy);
  };
  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleCreate}>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" name="productName" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="scrumMasterName">
            <Form.Label>Scrum Master</Form.Label>
            <Form.Control type="text" name="scrumMasterName" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productOwnerName">
            <Form.Label>Product Owner Name</Form.Label>
            <Form.Control type="text" name="productOwnerName" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="yyyy-mm-dd"
              name="startDate"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="methodology">
            <Form.Label>Methodology</Form.Label>
            <Form.Select name="methodology">
              <option value="Agile">Agile</option>
              <option value="Waterfall">Waterfall</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Developers">
            <Form.Label>
              Developers - assign up to 5 , click the badge to delete developers
            </Form.Label>
            <Row className="mt-2">
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Add a new developer"
                  value={devInput}
                  onChange={(e) => setDevInput(e.target.value)}
                />
              </Col>
              <Col md="auto">
                {" "}
                <Button variant="info" onClick={handleAdd}>
                  Add Developer
                </Button>
              </Col>
            </Row>
            {devList.map((dev) => (
              <h4 style={{ display: "inline" }} key={dev}>
                <Badge
                  pill
                  bg="info"
                  key={dev}
                  onClick={() => removeDeveloper(dev)}
                >
                  {dev}
                </Badge>
              </h4>
            ))}
            <hr />
            <Button variant="primary" type="submit" className="float-start">
              Create Product
            </Button>
            <Button
              variant="secondary"
              onClick={handleClose}
              className="float-end"
            >
              Close
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
