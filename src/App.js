import React from 'react';
import axios from 'axios';
import { Card } from "react-bootstrap/";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locationResult: {},
      searchQuery: '',
      showLocInfo: false,
      showError: false
    }
  }

  getLocFun = async (e) => {
    e.preventDefault();

    await this.setState({
      searchQuery: e.target.city.value
    })
    console.log('key', process.env.REACT_APP_LOCATIONIQ_KEY);

    try {
      let reqUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;

      let locResult = await axios.get(reqUrl);

      this.setState({
        locationResult: locResult.data[0],
        showLocInfo: true,
        showError: false
      })
    } catch {

      this.setState({
        showError: true,
        showLocInfo: false
      })
    }

  }

  render() {
    return (
      <div>
        <h3>City Explorer app</h3>

        <form onSubmit={this.getLocFun} >
          <input type="text" name='city' />
          <input type="submit" value='get city info' />
        </form>

        {this.state.showLocInfo &&


          <>


            <Card style={{ width: "30rem" }}>
              {this.state.showLocInfo && (
                <Card.Img
                  variant="top"
                  src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=10`} alt="city" />
              )}

              <Card.Body>
                {this.state.showLocInfo && (
                  <Card.Title>
                    {this.state.locationResult.display_name}
                  </Card.Title>
                )}
                {this.state.showLocInfo && (

                  <Card.Text>

                    latitude: {this.state.locationResult.lat}&nbsp;
                    longitude:{" "}{this.state.locationResult.lon}
                  </Card.Text>
                )}
              </Card.Body>
            </Card>

            {/* <p>City name: {this.state.searchQuery}</p>
            <p>latitude: {this.state.locationResult.lat}</p>
            <p>longitude: {this.state.locationResult.lon} </p>

            <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=10`} alt="city" /> */}

          </>
        }

        {this.state.showError &&
          <p>Something went wrong in getting location data</p>
        }



      </div>
    )
  }
}

export default App;
