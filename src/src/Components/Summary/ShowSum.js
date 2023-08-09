import React, {useState,useEffect ,useRef} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import logo from "../ShowCard/no.png"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './style.css'


const ShowSum = () => {
    const { id } = useParams();
  const API_URL = 'http://api.tvmaze.com/shows/';
   const [isLoading,setIsLoading]= useState(true);
  const [ShowData, setShowData] = useState("");
  const username = useRef();
  const email = useRef();



  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(false);
    console.log(username.current.value, "initial value");
    localStorage.setItem("UserName", username.current.value)
    localStorage.setItem("User-email",email.current.value)
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  const getShows = async (url) => {
    setIsLoading(true);
    try{
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        if(data){
            setIsLoading(false);
            setShowData(data)
        }
    }catch(error){
        console.log(error);
    }
  }
  



    useEffect(()=>{
      getShows(`${ API_URL }${id}`);
    }, [id]);
  
  
  
  if (isLoading) {
    return (
      <div className="movie-section">
        <div className='loading'>loading</div>
      </div>
    );
  }

  return (
    <>
    <NavLink to="/">
    <div className='header'>header</div></NavLink>
    <section className='movie-section'>
      <div className='movie-card'>
        <div className='show-content'>
          <h1>{ShowData.name}</h1>
          <p>{ShowData.summary}</p></div>
        <div>
        <img src={ShowData.image ? ShowData.image.medium : logo} alt='{id}' /></div>
        <div className="btn">
          <Button variant="primary" size="lg" onClick={handleShow}>BOOK Your Show</Button>
        </div>
      </div>
      </section>
      
      <Modal show={show} contentClassName='my-modal' onHide={handleClose}>
        <Modal.Header className='cust' closeButton>
          <Modal.Title>Boooking Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group className="mb-3 custom" controlId="exampleForm.ControlInput1">
              <Form.Label size="lg">name</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                autoFocus
                ref={username}
              />
            </Form.Group>
            <Form.Group className="mb-3 custom" controlId="exampleForm.ControlInput1">
              <Form.Label size="lg">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                ref={email}
              />
            </Form.Group>

             <Form.Group as={Row} className="mb-3 custom" controlId="formPlaintextEmail">
        <Form.Label size="" column sm="2">
          Show Name :
        </Form.Label >
        <Col sm="10">
          <Form.Control plaintext readOnly defaultValue={ShowData.name} />
        </Col>
      </Form.Group>

             <Form.Group as={Row} className="mb-3 custom" controlId="formPlaintextEmail">
        <Form.Label size="lg" column sm="2">
          Show duration :
        </Form.Label>
        <Col sm="10">
          <Form.Control plaintext readOnly defaultValue={ShowData.runtime!=null?ShowData.runtime:"N/A"}/>
        </Col>
      </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  
  );
}

export default ShowSum;