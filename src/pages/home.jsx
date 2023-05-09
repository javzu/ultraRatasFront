import { useEffect, useState } from "react";
import { useGet } from "../hooks/useGet";
import PublishedPointCard from "../components/publishedPoint";
import { Button, Grid } from "@mui/material";
import FormModal from "../components/createEditModal";

const Home=()=>{

    const [publishedP, setPublishedP]= useState([]);
    const [modal, setModal]= useState(false);
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
            onClick={()=>{setModal(true)}}
            >Crear publicación</Button>
            </div>

            <div className="card-container">
                <Grid container spacing={3}>
                    {publishedP.map((card)=>{
                        return(
                            <Grid item xs={4} key={card.id}>
                            <PublishedPointCard
                            description={card.description}
                            price={card.price}
                            state={card.publicationState}
                            pointName={card.pointType.pointName}
                            pointBank={card.pointType.bank.bankName}
                            />
                        </Grid> 
                        )
                       
                    })}
                </Grid>
            </div>
            <FormModal
            Open={modal}
            Close={()=>setModal(false)}
            />

        </div>
    );

}

export default Home;