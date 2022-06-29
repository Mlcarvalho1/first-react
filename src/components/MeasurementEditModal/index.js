import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Form, InputGroup } from "react-bootstrap";

import axios from "../../services/axios";
import Swal from "sweetalert2";

export default function MeasurementEditModal({setOpenModal, listMeasurements, measurement, patientId}) {
    const [glucose, setGlucose] = useState(measurement.glucose);
    const [carbs, setCarbs] = useState(measurement.carbs);
    const [insulin, setInsulin] = useState(measurement.insulin);

    const handleClose = () => setOpenModal(false)
    const handleSubmit = async () => {
        let formErrors = false
        if(glucose === 0 || glucose > 900){
            toast.error('Medição inválida')
            formErrors = true
        }

        if(insulin && insulin > 100){
            toast.error('Insira o valor de insulina em unidades')
            formErrors = true
        }

        if(carbs && carbs > 400){
            toast.error('Os carboidratos devem ser expressos em gramas')
            formErrors = true
        }

        if(formErrors) return 

        await axios.put(`/patients/measurements/${patientId}/${measurement.id}`, {
            glucose,
            insulin,
            carbs,
        })
        Swal.fire({
            icon: 'success',
            title: 'Medição adicionda com sucesso'
          })

        setOpenModal(false);
        listMeasurements();
    }

    return(
        <Modal show >
            <Modal.Header closeButton  onClick={handleClose}>
            <Modal.Title>Cadastrar Paciente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                        <Form.Label>Glicemia:</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control type="number" value={glucose} onChange={e => setGlucose(e.target.value)}/>
                        <InputGroup.Text id="basic-addon2">mg/dl</InputGroup.Text>
                    </InputGroup>
                        <Form.Label>Carboidratos ingeridos:</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control type="number" value={carbs}  onChange={e => setCarbs(e.target.value)}/>
                        <InputGroup.Text id="basic-addon2">g</InputGroup.Text>
                    </InputGroup>
                        <Form.Label>Insulina aplicada:</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control type="number" value={insulin}  onChange={e => setInsulin(e.target.value)}/>
                        <InputGroup.Text id="basic-addon2">u</InputGroup.Text>
                    </InputGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Fechar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Salvar alterações
            </Button>
            </Modal.Footer>
        </Modal>
    )
}