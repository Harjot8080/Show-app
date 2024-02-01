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


  const extractText = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    return doc.body.innerText;
  };
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
    <div className='movie-root'>
    <div className='div-image'>
    <img className='movie-section-img' src={ShowData.image ? ShowData.image.medium : logo} alt='{id}' />
    </div>
    <section className='movie-section show-section movie-section1' style={{marginLeft : "0px"}}>
      <div className='movie-card'>
        <div className='show-content'>
          <h1>{ShowData.name}</h1>
          </div>
        <div className='pt-5 fs-5 text-muted' >
          <p>{extractText(ShowData.summary)}</p>
        </div>
       <div  style={{marginTop :"70px"}}>
       <div className="">
          <button className='btn' onClick={handleShow}>BOOK Your Show</button>
        </div>
       </div>
      </div>
      </section>
            
    </div>
      
      <Modal fullscreen="" show={show} contentClassName='my-modal' onHide={handleClose}>
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