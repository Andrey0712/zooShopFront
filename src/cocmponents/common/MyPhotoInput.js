import {useState} from "react";

const MyPhotoInput =({
    refFormik,
    field,
    image
    
}) => {

    const [startPhoto, setPhoto] = useState(image || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg");   
    
    const onChangeHandler = (event) => {
        const file = event.currentTarget.files[0];
        setPhoto(URL.createObjectURL(file));

        refFormik.current.setFieldValue(field, file);
    }
    
    return (
        <div className="mb-3">
            <label htmlFor={field} className="form-label">
                <img src={startPhoto} alt="no img"
                    width="150"
                    style={{cursor: "pointer"}}/>    
            </label>
            <input type="file" 
                    id={field}
                    name={field}
                    className="d-none"
                    onChange={onChangeHandler}

                    />
        </div>
    );
}
export default MyPhotoInput;