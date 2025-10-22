import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../App.css"

const Create = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    country: "",
    timing: "",
    games: [],
  })

  const [games, setGames] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3000/games")
      .then((res) => setGames(res.data))
      .catch((err) => console.error("Error fetching games:", err))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:3000/themeparks", formData)
    navigate("/")
  }

  const handleGameChange = (e) => {
    const selectedIds = Array.from(e.target.selectedOptions, (opt) => opt.value)
    const selectedGames = games.filter((game) =>
      selectedIds.includes(String(game.id))
    )
    setFormData({ ...formData, games: selectedGames })
  }

  return (
    <div className="create-page">
      <div className="create-container">
        <h2 className="createTitle">Add a Theme Park</h2>

        <form onSubmit={handleSubmit} className="create-form">
          <input
            placeholder="Park Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <input
            placeholder="Image URL"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
          />

          <textarea
            placeholder="Description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <input
            placeholder="Country"
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          />

          <input
            placeholder="Timing"
            onChange={(e) =>
              setFormData({ ...formData, timing: e.target.value })
            }
          />

          <div className="games-select">
            <label>Select Rides/Games</label>
            <select multiple onChange={handleGameChange}>
              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.name}
                </option>
              ))}
            </select>

            {formData.games.length > 0 && (
              <div className="selected-games">
                <strong>Selected:</strong>{" "}
                {formData.games.map((g) => g.name).join(", ")}
              </div>
            )}
          </div>

          <button type="submit" className="save-btn">
            Save Theme Park
          </button>
        </form>
      </div>
    </div>
  )
}

export default Create
