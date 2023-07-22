import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Box = styled.div`
  width: 150px;
  height: 110px;
  background-color: antiquewhite;
  cursor: pointer;
  margin: 3px;
  display: flex;
  justify-content: center;
`;
const Text = styled.div`
  font-family: system-ui, sans-serif;
  font-size: 20px;
  margin: 1px;
`;

const InnerBox = styled.div`
  margin-top: 5px;
`;

function Block({
  value,
  setSelectorBox,
  setblockId,
  houseposition,
  gymPosition,
  hospitalPosition,
  restaurantPosition,
}) {
  const [houseNumber, setHouseNumber] = useState("");
  const [isGym, setIsGym] = useState(false);
  const [isRestaurant, setIsRestaurant] = useState(false);
  const [isHospital, SetIsHospital] = useState(false);
  useEffect(() => {
    if (houseposition.indexOf(value) >= 0) {
      setHouseNumber(houseposition.indexOf(value) + 1);
    } else {
      setHouseNumber("");
    }

    if (gymPosition.indexOf(value) >= 0) {
      setIsGym(true);
    } else {
      setIsGym(false);
    }

    if (hospitalPosition.indexOf(value) >= 0) {
      SetIsHospital(true);
    } else {
      SetIsHospital(false);
    }

    if (restaurantPosition.indexOf(value) >= 0) {
      setIsRestaurant(true);
    } else {
      setIsRestaurant(false);
    }
  }, [houseposition, gymPosition, hospitalPosition, restaurantPosition]);
  function handleClick() {
    setSelectorBox(true);
    setblockId(value);
  }
  return (
    <Box onClick={handleClick}>
      <InnerBox>
        {houseNumber && <Text>House {houseNumber}</Text>}
        {isRestaurant && <Text>Restaurant</Text>}
        {isGym && <Text>Gym</Text>}
        {isHospital && <Text>Hospital</Text>}
      </InnerBox>
    </Box>
  );
}
export default Block;
