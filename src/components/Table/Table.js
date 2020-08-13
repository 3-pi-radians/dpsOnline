import React, { useEffect , useState } from 'react';
import { useSprings , animated } from 'react-spring';
import './Table.css'; 

function Table( {status} ) {
  const [elements , setElements] = useState([]);

      const startSprings = useSprings(
        elements.length,
        elements.map((item,i) => ({
          to : {
            left : 720 +i,
            top : 300, 
            transform : 'rotate(180deg)'
          },
          config : {duration : 60*i},
          reset : status === 'restart' || 'start'? true : false,
          from : {left : 20, top : -400, transform : 'rotate(0deg)'}
        }))     
      );

      const shflSprings = useSprings(
        elements.length,
        elements.map((item , i) => ({
          reset : status === 'restart' || 'start' ? true : false,
          to : [
            {left : i%2? 680 -i : 760 +i , top : 300, zIndex : i},
            { top: 300 , left : 720 , zIndex : i},
            {left :  720 , top : i%2? 360+i : 260-i },
            { top : i%2? 260 : 360 , zIndex : 32-i},
            { top: 300 , left : 720 }
          ],
          from : {left : 720, top : 300}
        }))
      );

    useEffect(()=>{
      let arr = [];
      for(let i = 0; i< 32; i++) {
        arr.push(i);
      }
      setElements(arr);
      // return () => {
      //   console.log("component unmounted")
      // }
    },[])

    const performDeckOperation = (props) => {
      if(status === 'shuffle') {
        return(
          startSprings.map((spring, ind) => {
            return <animated.div key ={ind} className = 'Deckcard' style = {spring}></animated.div>
          })         
        )
      }
      if(status === 'distribute cards') {
        return(
          shflSprings.map((spring, ind) => {
            return <animated.div key ={ind} className = 'Deckcard' style = {spring}></animated.div>
          })         
        ) 
      }
      if(status === 'restart')
        return(<div></div>)
    }
    return (
          <div>
            <div className ="Table" ></div> 
            <div className = 'Cardanimate'>{performDeckOperation()}</div>
          </div>
    );           
}

export default Table;
