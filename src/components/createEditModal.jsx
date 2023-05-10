import React, { useEffect, useState } from "react";
import { Autocomplete, Box, Button, Modal, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useGet } from "../hooks/useGet";
import httpGet from "../functions/httpGet";


const FormModal = ({
    Open,
    Close,
    selected,
}) => {

    const [totalPoints, setTotalPoints] = useState(null);
    const [price, setPrice] = useState(null);
    const [selectedBank, setSelectedBank] = useState({ label: "", id: null });
    const [selectedPointType, setSelectedPointType] = useState(null);
    const [bank, setBank] = useState([]);
    const [points, setPoints] = useState([]);
    const [newPoint, setNewPoint]= useState(null);
    const { data, loading } = useGet("/banks");

    const fetch = async (value) => {
        const response = await httpGet(`/pointType/${value || selectedBank.id}`);
        const temp = response.map((value) => ({
            label: value.pointName,
            id: value.idPointType
        }));
        setPoints([...temp]);
    }

   

    const createOrUpdate = async (isDraft) => {
        if (totalPoints != 0 && price > 0 && selectedBank.id != null && selectedPointType != null) {
            //POST
            let body =
            {
                //"id":"7",
                "description": points,
                "price": price,
                "publicationState": isDraft ? 1 : 0,
                "publishedDate": "",
                "user": "2",
                "pointType": {
                    //"idPointType": selectedPointType.id,
                   // "pointName": selectedPointType.label,
                    "bank": {
                        "id": selectedBank.id,
                        "bankName": selectedBank.bankName
                    }
                }
            }
            if(selected!=null){
                body.id=selected.id;
            }
            if(newPoint==null){
                body.pointType.idPointType=selectedPointType.idPointType;
                body.pointType.pointName=selectedPointType.pointName
            }
            if(newPoint!=null){
                body.pointType.pointName=newPoint
            }
            console.log('este es body ', body);
        }
    }


    useEffect(() => {
        if (Open) {
            const temp = data.map((value) => ({
                label: value.bankName,
                id: value.id
            }));
            setBank([...temp]);
        }
    }, [Open]);

    useEffect(() => {
        if (selected != null) {
            setTotalPoints(selected.description);
            setPrice(selected.price);
            setSelectedPointType(selected.pointType);
            setSelectedBank(selected.pointType.bank);
            fetch(selected.pointType.bank.id)
        }
        if (selectedBank?.id != null) {
            fetch()
        }

    }, [selectedBank, selected]);


    return (
        <div>
            <Modal
                style={{ alignSelf: 'center' }}
                open={Open}
                onClose={Close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2>Crear o editar publicación</h2>
                    <div>
                        <Stack spacing={2}>
                            <TextField
                                onChange={(event) => { setTotalPoints(event.target.value) }}
                                id="outlined-basic"
                                label="Cantidad de puntos"
                                variant="outlined"
                                defaultValue={totalPoints}
                            />
                            <TextField
                                onChange={(event) => { setPrice(event.target.value) }}
                                id="outlined-basic"
                                label="Precio"
                                variant="outlined"
                                defaultValue={price}
                            />
                            <Autocomplete
                                disablePortal
                                id="combo-box"
                                options={bank}
                                value={selectedBank}
                                isOptionEqualToValue={(option, value)=>option.id===value.id}
                                getOptionLabel={(option) => option.bankName}
                                onChange={(_event, value) => { value != null && setSelectedBank(value);}}
                                renderInput={(params) => <TextField {...params} label="Banco"
                                /> 
                            }
                            />
                            <Autocomplete
                                disablePortal
                                id="combo-box"
                                value={selectedPointType}
                                isOptionEqualToValue={(option, value)=>option.id===value.id}
                                getOptionLabel={(option) => option.pointName}
                                onChange={(event, value) => { value != null && setSelectedPointType(value) }}
                                options={points}
                                renderInput={(params) => <TextField {...params} label="Puntos" />}
                            />
                           
                        </Stack>
                    </div>

                    <p>No existe tu punto en este banco. Crealo acá</p>

                    <div style={{ marginTop: 20 }}>
                        <Stack spacing={2}>
                            <TextField
                                onChange={(event) => { setNewPoint(event.target.value) }}
                                id="outlined-basic"
                                label="Nombre del punto"
                                variant="outlined"
                                defaultValue={price}
                            />

                            <Button variant="contained"
                                onClick={async () => { createOrUpdate(true) }}
                                color="success"
                            >{selected != null ? 'Editar y guardar' : 'Crear'} publicación</Button>

                            <Button variant="contained"
                                onClick={() => { }}
                                color="secondary"
                            >Guardar para más tarde</Button>
                        </Stack>
                    </div>
                </Box>
            </Modal>
        </div>

    );
};

export default FormModal;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 2,
    p: 4,
};
