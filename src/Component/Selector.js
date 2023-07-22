import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Box = styled.div`
  height: 200px;
  width: 200px;
  border: 2px solid grey;
  border-radius: 10px;
  margin-left: 50px;
`;

const RowValue = styled.div`
  margin-left: 10px;
  padding-top: 5px;
  font-family: system-ui, sans-serif;
  font-size: 30px;
  line-height: 1;
  display: grid;
  grid-template-columns: 0.8em auto;
  gap: 0.2em;
`;
const TopDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CrossButton = styled.div`
  height: 10px;
  font-size: 20px;
  padding: 5px 8px 10px 0px;
`;

function Selector({
  setSelectorBox,
  initialObject,
  setblockId,
  blockId,
  houseposition,
  sethouseposition,
  restaurantPosition,
  setRestaurantPosition,
  gymPosition,
  setGymPosition,
  hospitalPosition,
  setHospitalPosition,
}) {
  const [house, setHouse] = useState("");
  const [Res, setRes] = useState("");
  const [gym, setgym] = useState("");
  const [hospital, sethospital] = useState("");
  //console.log(initialObject[blockId]);
  useEffect(() => {
    //console.log("blockId", blockId, initialObject[blockId]);
    if (initialObject[blockId].includes("0")) {
      setHouse("checked");
    } else {
      setHouse("");
    }
    if (initialObject[blockId].includes("1")) {
      setRes("checked");
    } else {
      setRes("");
    }
    if (initialObject[blockId].includes("2")) {
      setgym("checked");
    } else {
      setgym("");
    }
    if (initialObject[blockId].includes("3")) {
      sethospital("checked");
    } else {
      sethospital("");
    }
  }, [blockId]);

  function handleClick() {
    setSelectorBox(false);
    setblockId(0);
  }

  function RemoveItem(Id, value) {
    initialObject[Id] = initialObject[Id].filter((e) => {
      return e !== value;
    });
  }

  function RemoveFromItemArray(fun, arr, Id) {
    fun(arr.filter((e) => e !== Id));
  }
  function SetIntoItemArray(fun, arr, Id) {
    fun([...arr, Id]);
  }
  function HouseClicked() {
    if (house === "") {
      setHouse("checked");
      setRes("");
      setgym("");
      sethospital("");
      initialObject[blockId] = [];
      initialObject[blockId].push("0");
      //console.log(initialObject);
      SetIntoItemArray(sethouseposition, houseposition, blockId);
      RemoveFromItemArray(setRestaurantPosition, restaurantPosition, blockId);
      RemoveFromItemArray(setGymPosition, gymPosition, blockId);
      RemoveFromItemArray(setHospitalPosition, hospitalPosition, blockId);
    } else {
      setHouse("");
      initialObject[blockId] = [];
      RemoveFromItemArray(sethouseposition, houseposition, blockId);
    }
  }
  function RestaurentClicked() {
    if (Res === "") {
      setRes("checked");
      setHouse("");
      initialObject[blockId].push("1");
      RemoveItem(blockId, "0");
      SetIntoItemArray(setRestaurantPosition, restaurantPosition, blockId);
      RemoveFromItemArray(sethouseposition, houseposition, blockId);
    } else {
      setRes("");
      RemoveItem(blockId, "1");
      RemoveFromItemArray(setRestaurantPosition, restaurantPosition, blockId);
    }
  }
  function GymClicked() {
    if (gym === "") {
      setgym("checked");
      setHouse("");
      initialObject[blockId].push("2");
      RemoveItem(blockId, "0");
      SetIntoItemArray(setGymPosition, gymPosition, blockId);
      RemoveFromItemArray(sethouseposition, houseposition, blockId);
    } else {
      setgym("");
      RemoveItem(blockId, "2");
      RemoveFromItemArray(setGymPosition, gymPosition, blockId);
    }
  }
  function HospitalClicked() {
    if (hospital === "") {
      sethospital("checked");
      setHouse("");
      initialObject[blockId].push("3");
      RemoveItem(blockId, "0");
      SetIntoItemArray(setHospitalPosition, hospitalPosition, blockId);
      RemoveFromItemArray(sethouseposition, houseposition, blockId);
    } else {
      sethospital("");
      RemoveItem(blockId, "3");
      RemoveFromItemArray(setHospitalPosition, hospitalPosition, blockId);
    }
  }
  return (
    <Box>
      <TopDiv>
        <CrossButton onClick={handleClick}>❌</CrossButton>
      </TopDiv>

      <RowValue>
        <input type="checkbox" checked={house} onClick={HouseClicked} />
        House
      </RowValue>
      <RowValue>
        <input type="checkbox" checked={Res} onClick={RestaurentClicked} />
        Restaurant
      </RowValue>
      <RowValue>
        <input type="checkbox" checked={gym} onClick={GymClicked} />
        Gym
      </RowValue>
      <RowValue>
        <input type="checkbox" checked={hospital} onClick={HospitalClicked} />
        Hospital
      </RowValue>
    </Box>
  );
}
export default Selector;
