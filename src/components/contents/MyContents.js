import React, { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext"
import { useHistory, Link, useRouteMatch } from "react-router-dom"
import { getContents } from "./Api"
import "./contents.css"
import logo from "../profile/pic-img.jpeg"
// import * as BiIcons from "react-icons/bi", Link 
import "../Auth/auth.css"
import Loading from "./Loading"
import Footer from "../../pages/Footer"
// import "bootstrap/dist/css/bootstrap.css"

function MyContents () {

    const { userData } = useContext(UserContext);
    const history = useHistory();
    const match = useRouteMatch();
    const [contents, setContents] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [visible, setVisible] = useState(9)
    const [search, setSearch] = useState("")
    const [filteredContents, setFilteredContents] = useState([]);

    useEffect(() => {
        
        if (! userData.user) 
            return history.push("/login")

        const fetchContents = async () => {
            setLoading(true)
            let token = userData.token
            let id = match.params.id

            const details = await getContents(token, id)
            setContents(details.myContents)
            setLoading(false)
        }
        fetchContents();
    }, [history, userData.user, userData.token, match.params.id])

    useEffect(() => {
        if (contents) {
           setFilteredContents(
                contents.filter( content => {
                    return content.title.toLowerCase().includes( search.toLowerCase() )
                })
            ) 
        }
        
    }, [search, contents])

    let maxContentLength = contents.length;
    
    const showMoreItems = () => {
        setVisible(prevState => prevState + 3 )
    }

    return (
        <div >   
            {
                contents.length >= 1 ? 
                <>
                <input id="find" className="search" 
                    type="search" placeholder="Search Contents" 
                    onChange={ e => setSearch(e.target.value) }
                />  <br/> <br/>

                <p align="right" style={{ marginRight: "3%" }}>
                    
                    <Link style={{ textDecoration: "none", color: "#fff"}} to="/contents/create"> 
                        <button className="btn btn-lg btn-success">
                            Create Content
                        </button>     
                    </Link> 
                </p> 
                </> : null
            }  
            <div className="services">
            {
                isLoading ? <Loading/> :
                filteredContents.length < 1 ?
                <div style={{
                    margin: "150px auto",
                    height: "30vh"
                }}> <br/> 
                    <h3> No content has been created </h3> 
                    <br/> 
                    <p align="right" style={{ marginRight: "20%" }}>
                        
                        <Link style={{ textDecoration: "none", color: "#fff"}} to="/contents/create"> 
                            <button className="btn btn-lg btn-success">
                                Create your Content
                            </button>     
                        </Link> 
                    </p> 
                </div> :
                !isLoading ?
                filteredContents.slice(0, visible).map( content => ( 
                    <div key={content._id} className="card">
                        <div style={{ backgroundImage: content.coverImage ? `url(${content.coverImage})` : `url(${logo})` }}
                            className="card-image">
                        </div>
                        <div className="card-text">
                            <span className="date"> { content.createdAt ? content.createdAt.substr(0, 10) : null} </span>
                            <h2> {content.title} </h2> <br/>
                            {
                                content.title.length <= 30 ?
                                <> <p> {content.descrp} </p> <br/> </> :
                                null
                            }
                        </div>
                        <div className="card-stats">
                            <div className="stat">
                                <div className="value"> {content.contentfiles.length} </div>
                                <div className="text"> { content.contentfiles.length === 1 ? "File": "Files" } </div>
                            </div>
                            <div className="stat border">
                                <div className="value"> {content.type === "free" ? "free" : content.price} </div> <hr style={{width: "80px"}} />
                                <div className="text"> {content.format} </div>
                                {/* {content.type === "paid" ? `${content.subscriberids.length} enrolled` : "share"} */}
                            </div>
                            <Link to={`/contents/view/${content._id}`} style={{ textDecoration: "none" }}>                               
                                <div className="stat">
                                    <div className="text" 
                                        style={{ marginTop: "10px", fontSize: "22px" }} >
                                        <span style={{ fontSize: "1.60rem" }} >&rarr;</span>
                                    </div>
                                    {/* <div className="value">32</div> */}
                                </div>  
                            </Link>
                        </div>      
                    </div>            
                )) : null
            }
            {
                visible <= maxContentLength ?
                <button className="btn btn-lg btn-success"  onClick={showMoreItems}>
                    Load More
                </button> : null
            }     
            <br/>   
            </div>
            <Footer/>
        </div>
    ) 
}

export default MyContents;