import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "../App.css"

const Home = () => {
  const [parks, setParks] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/themeparks")
      .then((res) => res.json())
      .then((data) => setParks(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching parks:", err))
  }, [])

  return (
    <div className="home-page">
      <div className="home-container">
        <h1>Theme Parks</h1>

        {parks.length === 0 ? (
          <p>No theme parks yet. Add one!</p>
        ) : (
          <div className="parks-grid">
            {parks.map((park) => (
              <Link
                key={park._id}
                to={`/parks/${park._id}`}
                className="park-card"
              >
                {park.image && <img src={park.image} alt={park.name} />}
                <h2>{park.name}</h2>
                <p>{park.country}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
