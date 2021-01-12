import React, {useState} from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import "../Auth/auth.css"

export const EditContentForm = ({ contentDetails, onSubmit }) => {

    const [isActive, setActive] = useState("false");

    const handleToggle = () => {
        setActive(!isActive)
    };
    const handleTogggle = () => {
        setActive("false")
    };

    const {register, handleSubmit} = useForm({
        defaultValues: { 
            title: contentDetails ? contentDetails.title: "",
            descrp: contentDetails ? contentDetails.descrp: "",
            price: contentDetails ? contentDetails.price: "",
            type: contentDetails ? contentDetails.type: "",
            tag: contentDetails ? contentDetails.tag: "",
            format: contentDetails ? contentDetails.format: "",
        },
    });

    const submitHandler = handleSubmit((data) => {
        onSubmit(data)
        // history.push("/")
    })

    return (

        <div className="page">
            <h2 style={{ padding: '1rem', color: "#0e5996" }}> 
                <Link to={`/contents/view/${contentDetails._id}`} style={{textDecoration: "none"}}> 
                    Edit Content  
                </Link>
            </h2>
            {/* {
                error && <ErrorNotice message={error} clearError={() => setError(undefined)} />
            } */}
            <form className="form" onSubmit={submitHandler}>
                <label htmlFor="content-title">Title: </label>
                <input 
                    id="content-title" 
                    name="title"
                    type="text" 
                    required
                    placeholder="content name"
                    ref={register}
                />

                <label htmlFor="content-descrp">Description: </label>
                <input 
                    id="content-descrp"
                    name="descrp" 
                    type="text" 
                    placeholder= "about content..." 
                    ref={register}
                />
                <label>
                   <input 
                        id="content-type" 
                        name="type"
                        type="radio" 
                        value="paid"
                        onClick={handleToggle}
                        ref={register} 
                    /> Bill
                </label>
                <label>
                    <input 
                        id="content-free" 
                        name="type"
                        type="radio" 
                        value="free"
                        onClick={handleTogggle}
                        ref={register}
                    /> Free
                </label>
                <div className={isActive ? "price" : null}>
                  <label htmlFor="content-price">Price: </label>
                    <input 
                        id="content-price" 
                        type="number" 
                        name="price"
                        ref={register}
                    />  
                </div>
                
                <label htmlFor="tags">Tags: </label>
                <textarea id="tags" 
                    cols={40} rows={5} 
                    ref={register}
                    name="tag"
                    placeholder="e.g music, tutorial, pdf e.t.c"
                />
                <p>Content Format:</p> <br/>
                <label>
                    <input 
                        id="content-doc" 
                        name="format"
                        type="radio" 
                        value="document"
                        ref={register}
                    /> Document
                </label>
                <label>
                    <input 
                        id="content-media" 
                        name="format"
                        type="radio" 
                        value="media"
                        ref={register}
                    /> Media
                </label>
                <label>
                    <input 
                        id="content-other" 
                        name="format"
                        type="radio" 
                        value="other"
                        ref={register}
                    /> Other
                </label>

                <input type="submit" value="Save" />
            </form>
            {/* <p>You can add your files after content creation</p> */}
        </div>
    )
}