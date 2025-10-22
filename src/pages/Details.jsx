import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import "../App.css"

const Details = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [park, setPark] = useState(null)

  useEffect(() => {
    axios
      .get(`http://localhost:3000/themeparks/${id}`)
      .then((res) => setPark(res.data))
      .catch((err) => console.error("Error fetching park:", err))
  }, [id])

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this theme park?")) {
      await axios.delete(`http://localhost:3000/themeparks/${id}`)
      navigate("/")
    }
  }

  if (!park) return <p>Loading...</p>

  return (
    <div className="details-page">
      <div className="details-container">
        <img src={park.image} alt={park.name} className="park-image" />
        <h1>{park.name}</h1>
        <p>{park.description}</p>
        <p>
          <strong>Country:</strong> {park.country}
        </p>
        <p>
          <strong>Timing:</strong> {park.timing}
        </p>

        <h3>Rides</h3>
        {park.games && park.games.length > 0 ? (
          <div className="rides-grid">
            {park.games.map((game) => (
              <div key={game.id} className="ride-card">
                <img src={game.image} alt={game.name} />
                <h4>{game.name}</h4>
                <p>{game.description}</p>
                <p>
                  <strong>Thrill:</strong> {game.thrillLevel}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No rides added for this park.</p>
        )}

        <button onClick={handleDelete} className="delete-btn">
          Delete Park
        </button>
      </div>
    </div>
  )
}

export default Details
