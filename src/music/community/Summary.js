import { ListGroup } from "react-bootstrap"
import { useEffect, useState } from "react";

import { db } from "firebase/fBase";
import "./Detail.css";
export default function Summary(props) {
  let[item,setItems] = useState();
    useEffect(()=>{
      db.collection('Comment').limit(5).get().then((result)=>{
          var array =[];
          result.forEach((doc)=>{
              array.push(doc.data());
          });
        setItems(array);
      })
    },[]);

  return (
    <>
    <ListGroup variant="flush" as="ol">
      {
        item && item.map((a,i)=>{
          return(
            <ListGroup.Item className="click_motion"variant="secondary" onClick={()=>{props.setClickvalue(a.context); }} key={i}>
              {a.title}
            </ListGroup.Item>
          )
        })
      }
    </ListGroup>
    </>
  )
}