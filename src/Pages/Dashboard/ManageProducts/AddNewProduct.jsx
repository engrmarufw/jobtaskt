import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import TextEditor from '../../Shared/TextEditor/TextEditor';

const AddNewProduct = () => {
    const navigator = useNavigate();
    const [shortDetails, setShortDetails] = useState('');
    const [longDetails, setLongDetails] = useState('');
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [variants, setVariants] = useState([]);
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const price = formData.get('price');
        const product = {
            title,
            price,
            images,
            variants,
            shortDetails,
            longDetails,
            images
        };
        axios.post(`http://localhost:5000/products`, product)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Your product has been added ?",
                        confirmButtonText: "Okay",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigator(-1)
                        }
                    });
                }

            })

    };

    const handleAddVariant = () => {
        if (color && size) {
            setVariants([...variants, { color, size }]);
            setColor('');
            setSize('');
        }
    };

    const handleRemoveVariant = (index) => {
        const updatedVariants = [...variants];
        updatedVariants.splice(index, 1);
        setVariants(updatedVariants);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 5) {
            alert('You can only upload up to 5 images.');
            return;
        }


        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
        }

        axios.post('http://localhost:5000/multiimguploadimgbb', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                setImages([...images, ...res.data]);
            })


    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    return (
        <div className='container'>
            <div className="flex justify-end">
                <button onClick={() => { navigator(- 1) }} className="btn btn-primary">Back</button>
            </div>
            <div className="m-4">
                <form onSubmit={handleSubmit}>
                    <div className="a">
                        <label htmlFor="title">Product Name</label>
                        <input id='title' name='title' type="text" placeholder="Type here" className="input input-bordered w-full my-2 " />
                    </div>
                    <div className="a">
                        <label htmlFor="price">Product Price</label>
                        <input id='price' name='price' type="text" placeholder="Type here" className="input input-bordered w-full my-2 " />
                    </div>
                    <div className="a">
                        <label htmlFor="images">Product images (min 3, max 5 images)</label>
                        <input
                            id="images"
                            name="images"
                            type="file"
                            className="file-input file-input-bordered w-full my-2"
                            onChange={handleImageChange}
                            multiple
                        />
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {images.map((image, index) => (
                            <div key={index} className="relative">
                                <div className="w-[6rem] h-[6rem] overflow-hidden p-2">
                                    <img src={image} className="cover" alt="" />
                                </div>
                                <button
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 cursor-pointer"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="a">
                        <label className='mb-2' htmlFor="shortdetails">Short Details</label>
                        <TextEditor idshortdetails setContent={setShortDetails} content={shortDetails}></TextEditor>
                    </div>


                    <div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Color</th>
                                    <th>Size</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="a">
                                            <label htmlFor="color">Product Color</label>
                                            <input
                                                id="color"
                                                onChange={(e) => setColor(e.target.value)}
                                                type="color"
                                                className="file-input file-input-bordered w-full my-2"
                                                value={color}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="a">
                                            <label htmlFor="tisizetle">Product Size</label>
                                            <input
                                                id="tisizetle"
                                                onChange={(e) => setSize(e.target.value)}
                                                type="text"
                                                placeholder="Product Size"
                                                className="input input-bordered w-full my-2"
                                                value={size}
                                            />
                                        </div>
                                    </td>
                                    <td>

                                        <button className="btn" onClick={handleAddVariant} type="button">
                                            Add Variant
                                        </button>
                                    </td>
                                </tr>
                                {variants.map((variant, index) => (
                                    <tr key={index}>
                                        <td>{variant.color}</td>
                                        <td>{variant.size}</td>
                                        <td>
                                            <button onClick={() => handleRemoveVariant(index)} className="btn">
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="a">
                        <label className='mb-2' htmlFor="shortdetails">Long Details</label>
                        <TextEditor id="shortdetails" setContent={setLongDetails} content={longDetails}></TextEditor>
                    </div>



                    <input className="btn" type='submit' value='Submit' />
                </form>
            </div>
        </div >
    );
};

export default AddNewProduct;