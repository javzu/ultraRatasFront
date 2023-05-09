import React, { useState } from "react";
import { Autocomplete, Box, Button, Modal, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';


const FormModal = ({
    Open,
    Close,
}) => {

    const banks = [
        { label: "banco1" },
        { label: "banco2" }
    ];

    const [totalPoints, setTotalPoints] = useState(0);
    const [price, setPrice] = useState(0);
    const [selectedBank, setSelectedBank] = useState(0);
    const [selectedPointType, setSelectedPointType] = useState(0);

    const submitData = async () => {

    }



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
                                variant="outlined" />
                            <TextField
                                onChange={(event) => { setPrice(event.target.value) }}
                                id="outlined-basic"
                                label="Precio"
                                variant="outlined" />
                            <Autocomplete
                                disablePortal
                                id="combo-box"
                                options={banks}
                                onChange={(event, value) => { console.log('auto ', value) }}
                                renderInput={(params) => <TextField {...params} label="Banco" />}
                            />
                            <Autocomplete
                                disablePortal
                                id="combo-box"
                                onChange={(event, value) => { console.log('auto ', value) }}
                                options={banks}
                                renderInput={(params) => <TextField {...params} label="Puntos" />}
                            />
                        </Stack>
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <Stack spacing={2}>

                            <Button variant="contained"
                                onClick={() => { }}
                                color="success"
                            >Crear publicación</Button>

                            <Button variant="contained"
                                onClick={() => { }}
                                color="secondary"
                            >Guardar para más tarde</Button>

                            <Button variant="contained"
                                onClick={() => { }}
                            >Crear nuevo tipo de punto</Button>
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
