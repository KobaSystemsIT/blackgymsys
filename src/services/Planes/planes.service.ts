const url = "http://localhost:3001/api/getPlanes"; //Temporal

export const getPlanes = () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(url, requestOptions)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .catch((error) => {
            console.error('Error:', error);
            throw error;
        });

}