import React, { useState } from "react";
import { Collapse } from 'antd';


const ResultCostOptimRoute = (props) => {

    // const [trStartRouteDate, settrStartRouteDate] = useState(false)
    // const [dateNow, setdate] = useState('')
    // const [time, settime] = useState('')
   
  return (<>	

	
			<div id="feedbackTxt" 
      className="form-group">
            <p> {props.resp}
        
        </p>
        {props.HTMLTag.map( (i)=>  i ) }
    
      </div>

    </>
  );
};

export default ResultCostOptimRoute;
