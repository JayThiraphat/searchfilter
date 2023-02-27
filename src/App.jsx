import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [countries,setCountries] = useState([])
  const [word,setWord] = useState("")
  const [dataFilter] =useState(["name","capital"])

  useEffect(()=>{
    fetch("https://restcountries.com/v2/all")
    .then(res=>res.json())
    .then(data=>{
      setCountries(data)
    })
  },[])

  const searchCountries=(countries)=>{
    return countries.filter((item)=>{
      return dataFilter.some((filter)=>{
        if(item[filter]){
          return item[filter].toString().toLowerCase().indexOf(word.toString().toLowerCase())>-1
        }
      })
    })
  }
  const formatNumber=(num)=> {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

  return (
    <div className='container'>
      <div className="search-container">
        <div className="search-form">
          <label>
            <input type="text" 
            className='search-input' 
            placeholder='ค้นหาข้อมูลประเทศ (ชื่อประเทศ,ชื่อเมืองหลวง)' 
            value={word}
            onChange={(e)=>setWord(e.target.value)}
            />
          </label>
        </div>
      </div>
      <ul className='row'>
        {searchCountries(countries).map((item,index)=>{
          return (
                <li key={index} > 
                  <div className='card'>
                    <div className="card-title">
                      <img src={item.flags.svg} alt={item.name} />
                    </div>
                    <div className="card-body">
                      <div className="card-desc">
                         <h2>{item.name}</h2>
                         <ol className='card-list'>
                          <li>ประชากร : <span>{formatNumber(item.population)} คน</span></li>
                          <li>ภูมิภาค : <span>{item.region}</span></li>
                          <li>เมืองหลวง : <span>{item.capital}</span></li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App
