import { useMemo } from "react";
import { Appear, Button, Loading, Paragraph } from "arwes";
import Clickable from "../components/Clickable";

const Launch = props => {
  const selectorBody = useMemo(() => {
    return props.planets?.map(planet => 
      <option value={planet.keplerName} key={planet.keplerName}>{planet.keplerName}</option>
    );
  }, [props.planets]);

  const today = new Date().toISOString().split("T")[0];

  const inputStyle = {
    width: "200px",
    height: "100%",
    background: "none",
    borderRadius: "3px",
    border: "2px solid #26dafd",
    color: "white",
    paddingLeft: "10px",
    fontFamily: '"Titillium Web", "sans-serif"'
  }

  return <Appear id="launch" animate show={props.entered}>
    <Paragraph>Schedule a mission launch for interstellar travel to one of the Kepler Exoplanets.</Paragraph>
    <Paragraph>Only confirmed planets matching the following criteria are available for the earliest scheduled missions:</Paragraph>
    <ul>
      <li>Planetary radius &lt; 1.6 times Earth's radius</li>
      <li>Effective stellar flux &gt; 0.36 times Earth's value and &lt; 1.11 times Earth's value</li>
    </ul>

    <form onSubmit={props.submitLaunch} style={{display: "inline-grid", gridTemplateColumns: "auto auto", gridGap: "10px 20px"}}>
      <label htmlFor="launch-day">Launch Date</label>
      <input type="date" id="launch-day" name="launch-day" min={today} max="2040-12-31" defaultValue={today} style={inputStyle} />
      <label htmlFor="mission-name">Mission Name</label>
      <input type="text" id="mission-name" name="mission-name" style={inputStyle}/>
      <label htmlFor="rocket-name">Rocket Type</label>
      <input type="text" id="rocket-name" name="rocket-name" defaultValue="Explorer IS1" style={inputStyle}/>
      <label htmlFor="planets-selector">Destination Exoplanet</label>
      <select id="planets-selector" name="planets-selector" style={inputStyle && {color:"#26dafd", backgroundColor: "black", }}>
        {selectorBody}
      </select>
      <Clickable>
        <Button animate 
          show={props.entered} 
          type="submit" 
          layer="success" 
          disabled={props.isPendingLaunch}>
          Launch Mission ✔
        </Button>
      </Clickable>
      {props.isPendingLaunch &&
        <Loading animate small />
      }
    </form>
  </Appear>
};

export default Launch;