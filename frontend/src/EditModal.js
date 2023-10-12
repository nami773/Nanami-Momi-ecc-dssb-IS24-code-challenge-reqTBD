import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import serialize from "form-serialize";
import { useState } from "react";

export const EditModal = ({ show, setShow, editProduct, item }) => {
  const [devList, setDevList] = useState([]);
  const [devInput, setDevInput] = useState("");
  const handleClose = () => {
    setDevList([]);
    setDevInput("");
    setShow(false);
  };
  const handleOpen = () => {
    setDevList(item.Developers);
  };
  const handleAdd = (e) => {
    if (devInput.length > 0 && !devList.includes(devInput)) {
      let devListCopy = [...devList];
      devListCopy.push(devInput);
      setDevInput("");
      setDevList(devListCopy);
    }
  };
  const handleEdit = (e) => {
    e.preventDefault();
    const data = serialize(e.target, { hash: true, empty: true });
    if (!data["location"].startsWith("https://github.com/bcgov")) {
      alert(
        "Please enter a valid github repository link under https://github.com/bcgov"
      );
      return;
    }
    data["Developers"] = devList;
    editProduct(data, item.productId);
  };
  const removeDeveloper = (dev) => {
    let devListCopy = [...devList];
    devListCopy.splice(devListCopy.indexOf(dev), 1);
    setDevList(devListCopy);
  };
  return (
    <Modal show={show} onHide={handleClose} onShow={handleOpen} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>
          Edit Product <span style={{ color: "blue" }}>{item.productId}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEdit}>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              maxLength="200"
              defaultValue={item.productName}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="scrumMasterName">
            <Form.Label>Scrum Master</Form.Label>
            <Form.Control
              type="text"
              name="scrumMasterName"
              maxLength="200"
              defaultValue={item.scrumMasterName}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productOwnerName">
            <Form.Label>Product Owner Name</Form.Label>
            <Form.Control
              type="text"
              name="productOwnerName"
              maxLength="200"
              defaultValue={item.productOwnerName}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="yyyy-mm-dd"
              name="startDate"
              defaultValue={item.startDate}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="methodology">
            <Form.Label>Methodology</Form.Label>
            <Form.Select name="methodology" defaultValue={item.methodology}>
              <option value="Agile">Agile</option>
              <option value="Waterfall">Waterfall</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="link"
              placeholder="Github repository link under github.com/bcgov"
              name="location"
              maxLength="2048"
              defaultValue={item.location}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Developers">
            <Form.Label>
              Developers - assign up to 5 ,
              <span style={{ color: "red" }}>click the badge</span> to delete
              developers
            </Form.Label>
            <Row className="mt-2">
              <Col>
                <Form.Control
                  type="text"
                  value={devInput}
                  placeholder="Add a new developer"
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
            {!devList
              ? ""
              : devList.map((dev) => (
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
              Edit Product
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

export default EditModal;
