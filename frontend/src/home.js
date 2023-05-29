import { useState, useEffect } from "react"
import {Link} from 'react-router-dom'

const Home = () => {
    const [allPdf, setAllPdf] = useState([])

    useEffect(() =>  {
      const getPdf = async () => {
          const response = await fetch('http://localhost:6500/api/file')
          const json = await response.json()
          setAllPdf(json)

          if(response.ok) {
            console.log(json)
          }

          if(!response.ok) {
            console.log(json.error)
          }
      }
      
      getPdf()
    },[])
    

    return (
        <div>
            {allPdf.length !== 0 && allPdf.map(data => 
                <div>
                    <Link to={`/pdfView/${data._id}`}>{data._id}</Link>
                </div>
            )}
        </div>
    )
}

export default Home