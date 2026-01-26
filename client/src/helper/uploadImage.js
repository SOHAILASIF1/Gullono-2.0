const url = `https://api.cloudinary.com/v1_1/sohailarain/image/upload`;


const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'mern-gulluno'); // Unsigned preset name

    const dataRes = await fetch(url, {
        method: "POST",
        body: formData,
    });

    if (!dataRes.ok) {
        throw new Error(`Error: ${dataRes.statusText}`);
    }

    return await dataRes.json();
};

export default uploadImage;
