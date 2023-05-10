const httpPost = async (url,datos) => {

    try {
      const newUrl=url
      const response = await fetch(newUrl, {
        method: "POST",
        headers: {
          'content-type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(datos),
      });
       const data = await response.json();
  
      return data;
    } catch (e) {
      return "error post ", e;
    }
  };
  
  export default httpPost;
  