import { useEffect, useState } from "react";
import { useGet } from "../hooks/useGet";
import PublishedPointCard from "../components/publishedPoint";
import { Button, Grid } from "@mui/material";
import FormModal from "../components/createEditModal";

const Home=()=>{

    const [publishedP, setPublishedP]= useState([]);
    const [modal, setModal]= useState(false);
    const [selected, setSelected]= useState(null);
    const {data, loading}= useGet(`/publication`);

    useEffect(()=>{
        if(data){
           setPublishedP(data);
        }
    },[data])

    return(
        <div className="App">
            <p>Ultra Ratas</p>
            <div>
            <Button variant="contained"
            onClick={()=>{
                setModal(true);
                setSelected(null);
            }}
            >Crear publicación</Button>
            </div>

            <div className="card-container">
                <Grid container spacing={3}>
                    {publishedP.map((card)=>{
                        return(
                            <Grid item xs={4} key={card.id}>
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
                        )
                       
                    })}
                </Grid>
            </div>
            <FormModal
            Open={modal}
            Close={()=>setModal(false)}
            selected={selected}
            />

        </div>
    );

}

export default Home;