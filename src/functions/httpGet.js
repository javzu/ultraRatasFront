const httpGet = async (url) => {

  try {
    const newUrl=url
    const response = await fetch(newUrl, {
      headers: {
        Accept: "application/json",
        'Content-type': 'application/json'
      },
    });
    let data = "";
      data = await response.json();

    return data;
  } catch (e) {
    return "error get ", e;
  }
};

export default httpGet;
