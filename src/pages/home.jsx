import { useEffect, useState } from "react";
import { useGet } from "../hooks/useGet";
import PublishedPointCard from "../components/publishedPoint";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import FormModal from "../components/createEditModal";
import httpGet from "../functions/httpGet";

const Home = () => {

    const [publishedP, setPublishedP] = useState([]);
    const [modal, setModal] = useState(false);
    const [selected, setSelected] = useState(null);
    const [reload, setReload] = useState(0);
    const { data } = useGet(`/publication`, reload);
    const [searchWord, setSearchWord] = useState("");
    const [doSearch, setDoSearch]= useState(0);
    const { data: bancos } = useGet("/banks");
    const { data: searched } = useGet(`/pointType/${searchWord}`)
    const [bank, setBank] = useState(null);
    const [pointType, setPointtype] = useState([]);
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [selectedState, setSelectedState] = useState(null);


    const publishmentState = [
        { label: "Borrador", label2: "draft" },
        { label: "Publicado", label2: "published" },
        { label: "Vendido", label2: "sold" },
    ];


    useEffect(() => {
        if (data) {
            setPublishedP(data);
            const temp = data.map((d) => ({
                label: d.pointType.pointName,
                id: d.pointType.idPointType
            }));
            const uniqueArr = temp.reduce((acc, cur) => {
                if (!acc.some(obj => obj.id === cur.id)) {
                    acc.push(cur);
                }
                return acc;
            }, []);
            setPointtype(uniqueArr);
            const temp2 = bancos.map((value) => ({
                label: value.bankName,
                id: value.id
            }));
            setBank([...temp2]);
        }
    }, [data, reload]);

    const searchByPoint = async () => {
        if(searchWord.length>0){
            const response = await httpGet(`/publication/${searchWord}`);
            if(response.length>0){
              setPublishedP(response);
            }
        }
    }

    useEffect(() => {
        searchByPoint();
    }, [doSearch])

    return (
        <div className="App">
            <p>Ultra Ratas</p>
            <div>
                <Button variant="contained"
                    onClick={() => {
                        setSelected(null);
                        setModal(true);
                    }}
                >Crear publicación</Button>
            </div>

            <div className="filter-container">
                <Autocomplete
                    disablePortal
                    id="combo-box"
                    options={publishmentState}
                    onChange={(_event, value) => { setSelectedState(value); }}
                    renderInput={(params) => <TextField {...params} label="Estado" style={{ width: 200 }}
                    />} />
                <Autocomplete
                    disablePortal
                    id="combo-box"
                    options={pointType}
                    onChange={(_event, value) => { setSelectedPoint(value); }}
                    renderInput={(params) => <TextField {...params} label="Puntos" style={{ width: 200 }}
                    />} />
                <TextField
                    onChange={(event) => { setSearchWord(event.target.value) }}
                    id="outlined-basic"
                    label="Busca publicación por puntos"
                    variant="outlined"
                    value={searchWord}
                />
                <Button variant="contained"
                    onClick={() => { setDoSearch(doSearch+1)}}
                    color="success"
                >Buscar</Button>
                   <Button variant="contained"
                    onClick={() => { setReload(reload+1); setSearchWord("")}}
                    color="success"
                >Limpiar</Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h5 style={{ marginRight: '10px', color: "gray" }}>Borrador</h5>
                <h5 style={{ marginRight: '10px', marginLeft: '10px', color: "green" }}>Publicado</h5>
                <h5 style={{ marginLeft: '10px', color: "blue" }}>Vendido</h5>
            </div>


            <div className="card-container">
                <Grid container spacing={3}>
                    {publishedP.map((card) => {
                        if (
                            (selectedPoint == null || card.pointType.idPointType === selectedPoint?.id) &&
                            (selectedState == null || card.publicationState === selectedState?.label2)
                        ) {
                            return (
                                <Grid item key={card.id}>
                                    <PublishedPointCard
                                        id={card.id}
                                        description={card.description}
                                        price={card.price}
                                        state={card.publicationState}
                                        pointName={card.pointType.pointName}
                                        pointBank={card.pointType.bank.bankName}
                                        openModal={setModal}
                                        setSelected={setSelected}
                                        data={card}
                                    />
                                </Grid>
                            );
                        } else {
                            return null;
                        }
                    })}

                </Grid>
            </div>
            {bank != null &&
                <FormModal
                    Open={modal}
                    Close={() => { setModal(false); setSelected(null); setReload(reload + 1); console.log('cerrado') }}
                    selected={selected}
                    banks={bank}
                />
            }


        </div>
    );

}

export default Home;