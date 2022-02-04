import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../assets/css/serchCatagory.css";

const SerchCatagory = (props) => {
    const [search,setSearch] = useState("");
    const [out,setout] = useState("");
    
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.post("http://demo.cleversoindia.com/serviceApi/cwebsite/get_service_by_search",{searchValue:search}).catch(err => {
            console.error(err.message);
        });
        const vari = await response.data.response;
        if(vari.code === 200) {
          console.log(vari.data[0].serviceName);
          setout(vari.data[0].serviceName);
        } else {
          console.log("No data found...");
          setout("No data found...");
        }
    }

        fetchData();
    },[search]);
  return (
    <div className="serchCatagory">
      <p>SearchCatagory</p>
      <input type="text" placeholder="search..." value={search} onChange={txt => setSearch(txt.target.value)} />
      <br/><br/>
      <div>
        {out}
      </div>
    </div>
  );
};

export default SerchCatagory;