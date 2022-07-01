import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import moment from "moment";
import { Form, InputGroup } from "react-bootstrap";

import axios from "../../services/axios";
import Swal from "sweetalert2";
import Loading from "../loading";

export default function MeasurementCreateModal({setOpenModal, listMeasurements, patientId}) {
    const [glucose, setGlucose] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [insulin, setInsulin] = useState(0);
    const [measurement_date, setMeasurementDate] = useState(moment().format('YYYY-MM-DDTHH:mm'));
    const [isLoading, setIsLoading] = useState(false)

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

        if(moment(measurement_date).isAfter(moment().format())){
            toast.error('Data inválida')
            formErrors = true
        }

        if(formErrors) return 

        setIsLoading(true)

        try {
            await axios.post(`/patients/measurements/${patientId}`, {
                glucose,
                insulin,
                carbs,
                measurement_date
            })
            Swal.fire({
                icon: 'success',
                title: 'Medição adicionda com sucesso'
            })
            setOpenModal(false);
            listMeasurements();
        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <Modal show >
            <Loading isLoading={isLoading}/>
            <Modal.Header closeButton  onClick={handleClose}>
            <Modal.Title>Cadastrar Paciente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
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
                        <Form.Label>Horário da medição:</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control type="datetime-local" value={measurement_date} max={moment().format()} onChange={e => setMeasurementDate(e.target.value)}/>
                    </InputGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Fechar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Adicionar
            </Button>
            </Modal.Footer>
        </Modal>
    )
}