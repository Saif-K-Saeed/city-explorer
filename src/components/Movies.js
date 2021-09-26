import React from 'react'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css'
class Movies extends React.Component {
  render() {
    return (
      <Card style={{ width: "30rem" }}>
      {this.props.movies.map((value, index) => {
          return (
            <ul key={index}>
            <li>Movie Title : {value.title}</li>
            <li><img src={value.image_url} alt='img'></img></li>
            <li> Movie overview :{value.overview}</li>
            <li>Averge Votes :{value.average_votes}</li>
            <li>Total Votes :{value.total_votes}</li>
            <li>Popularity : {value.popularity}</li>
            <li>Released Date :{value.released_on}</li>
            <div>************************************</div>
          </ul>
          )
          })}
      </Card>
    );
  }
}
export default Movies