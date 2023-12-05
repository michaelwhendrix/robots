import { useEffect, useState } from "react";

const AllRobots = () => {
    const [allRobots, setAllRobots] = useState([]);

useEffect( () => {

    const getAllRobots = async() =>{
        const response = await fetch('/robots');
        const results = await response.json();
        console.log(results);
        setAllRobots(results);
      }
    getAllRobots();
},[]);

    return (
        <>
        {allRobots && allRobots.map((robot) => {
            return <div className={"robot-card"}>
                <h3>{robot.name}</h3>
                <img src={robot.image} alt="robot image" 
                height={'200px'} width={'180px'}/>
            </div>
        })}
        
        </>

    )


}
export default AllRobots;
