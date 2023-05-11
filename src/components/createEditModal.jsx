import React, { useEffect, useState } from "react";
import { Autocomplete, Box, Button, Modal, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import httpGet from "../functions/httpGet";
import httpPost from "../functions/httpPost";


const FormModal = ({
    Open,
    Close,
    selected,
    banks
}) => {

    const [totalPoints, setTotalPoints] = useState(null);
    const [price, setPrice] = useState(null);
    const [selectedBank, setSelectedBank] = useState({ label: "", id: null });
    const [selectedPointType, setSelectedPointType] = useState(null);
    const [points, setPoints] = useState([]);
    const [newPoint, setNewPoint] = useState(null);
    const [ready, setReady] = useState(false);
    const [defaultIndex, setDefaultIndex] = useState(null);


    const fetch = async (value) => {
        const response = await httpGet(`/pointType/${value || selectedBank.id}`);
        const temp = response.map((value) => ({
            label: value.pointName,
            id: value.idPointType
        }));
        if (selected != null) {
            temp.filter((a, index) => {
                //console.log(a.id, selectedPointType.idPointType);
                if (a.id === selected.pointType.idPointType) {
                    setDefaultIndex(index);
                }
            });
        }

        setPoints([...temp]);
    }


    const createOrUpdate = async (state) => {
        if (totalPoints != 0 && price > 0 && selectedBank.id != null && (selectedPointType != null || newPoint!=null)) {
            let body =
            {
                "description": totalPoints,
                "price": price,
                "publishedDate": "",
                "user": "2",
                "pointType": {
                    "bank": {
                        "id": selectedBank.id,
                        "bankName": selectedBank.bankName
                    }
                }
            }
            if (selected != null) {
                body.id = selected.id;
            }
            if (newPoint == null) {
                body.pointType.idPointType = selectedPointType.idPointType;
                body.pointType.pointName = selectedPointType.pointName
            }
            if (newPoint != null) {
                body.pointType.pointName = newPoint
            }
            if(typeof state!='undefined'){
                body.publicationState=state;
            }
            await httpPost("/publication", body);
        }
    }




    useEffect(() => {
        setReady(false);
        if (selected === null) {
            setTotalPoints(null);
            setPrice(null);
            setSelectedPointType(null);
            setSelectedBank(null);
            setDefaultIndex(null);
            setPoints([]);
        }
        if (selected != null) {
            setTotalPoints(selected.description);
            setPrice(selected.price);
            setSelectedPointType(selected.pointType);
            setSelectedBank(selected.pointType.bank);
            fetch(selected.pointType.bank.id)
        }
        setReady(true);
        return () => { }

    }, [selected, Open]);

    useEffect(() => {
        if (selectedBank?.id != null) {
            fetch()
        }
    }, [selectedBank])


    return (
        <div>
            <Modal
                style={{ alignSelf: 'center' }}
                open={Open}
                onClose={Close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {ready ?
                    <Box sx={style}>
                        <h2>{selected != null ? 'Editar' : 'Crear'} publicación</h2>
                        <div>
                            <Stack spacing={2}
                            >
                                <TextField
                                    onChange={(event) => { setTotalPoints(event.target.value) }}
                                    id="outlined-basic"
                                    label={totalPoints || "Cantidad de puntos"}
                                    variant="outlined"
                                    value={totalPoints}

                                />
                                <TextField
                                    onChange={(event) => { setPrice(event.target.value) }}
                                    id="outlined-basic"
                                    label={price || "Precio"}
                                    variant="outlined"
                                    value={price}
                                />
                                <Autocomplete
                                    disablePortal
                                    id="combo-box"
                                    options={banks}
                                    value={banks[selectedBank?.id - 1] || null}
                                    isOptionEqualToValue={(option, value) => { return option.id === value.id }}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(_event, value) => { setSelectedBank(value); }}
                                    renderInput={(params) => <TextField {...params} label="Banco" />
                                    }
                                />
                                <Autocomplete
                                    disablePortal
                                    id="combo-box"
                                    value={defaultIndex != null ? points[defaultIndex] : null}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => { value != null && setSelectedPointType(value.id); }}
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
                                    defaultValue={newPoint}
                                />

                                <Button variant="contained"
                                    onClick={async () => { createOrUpdate(1); Close() }}
                                    color="success"
                                >{selected != null ? 'Editar y publicar' : 'Crear publicación'}</Button>

                                <Button variant="contained"
                                    onClick={() => { createOrUpdate(0);Close()  }}
                                    color="secondary"
                                >Guardar para más tarde</Button>
                                {
                                    selected != null && <Button variant="contained"
                                        onClick={() => { createOrUpdate(2);Close()  }}
                                        color="primary"
                                    >Marcar como punto vendido</Button>
                                }

                            </Stack>
                        </div>
                    </Box>
                    : <div></div>}

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
