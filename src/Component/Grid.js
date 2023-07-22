import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Block from "./Block";
import Selector from "./Selector";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const MainContainer = styled.div`
  margin-left: 20px;
  place-items: center;
`;
const GridContainer = styled.div``;

const Wrapper = styled.div`
  display: flex;
`;

const SubmitButton = styled.div`
  height: 30px;
  font-size: 20px;
  font-family: system-ui, sans-serif;
  font-size: 20px;
  padding: 5px 8px 10px 0px;
  border: 2px solid grey;
  border-radius: 10px;
  right: 0;
  margin: 10px;
`;

const HeadingText = styled.div`
  font-family: system-ui, sans-serif;
  font-size: 40px;
  margin: 20px 0px;
`;
const Text = styled.div`
  font-family: system-ui, sans-serif;
  font-size: 20px;
  padding: 5px;
  margin-left: 5px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: center;
`;
const Bottom = styled.div`
  margin: 20px 0px;
  display: flex;
  justify-content: center;
`;

function Grid({ rows, cols }) {
  const [selectorBox, setSelectorBox] = useState(false);
  const [blockId, setblockId] = useState(0);

  const [initialObject, setInitialObject] = useState({});
  const [grid, setgrid] = useState();
  const [houseposition, sethouseposition] = useState([]);
  const [restaurantPosition, setRestaurantPosition] = useState([]);
  const [gymPosition, setGymPosition] = useState([]);
  const [hospitalPosition, setHospitalPosition] = useState([]);
  const [mapping, setMapping] = useState({});
  const [finalResult, setFinalResult] = useState("");
  useEffect(() => {
    function makematrix(r, c) {
      let ans = [];
      let count = 1;
      let initialObject1 = {};
      let initialMapping = {};
      for (let i = 0; i < r; i++) {
        let stream = [];
        for (let j = 0; j < c; j++) {
          stream.push(count);

          initialObject1[count] = [];
          initialMapping[count] = [i, j];
          count++;
        }
        //console.log(stream);
        ans.push(stream);
      }
      setInitialObject(initialObject1);
      setMapping(initialMapping);
      //console.log(initialMapping);
      return ans;
    }
    const finalgrid = makematrix(rows, cols);
    setgrid(finalgrid);
  }, []);

  function FindResult() {
    let ans = {
      point: 1e9,
    };

    for (let values of houseposition) {
      const x = mapping[values][0];
      const y = mapping[values][1];

      let Restaurantmin = restaurantPosition.reduce((acc, curr) => {
        let nx = mapping[curr][0];
        let ny = mapping[curr][1];
        let thisans = Math.abs(nx - x) + Math.abs(ny - y);
        acc = Math.min(acc, thisans);
        return acc;
      }, 1e9);
      let Gymmin = gymPosition.reduce((acc, curr) => {
        let nx = mapping[curr][0];
        let ny = mapping[curr][1];
        let thisans = Math.abs(nx - x) + Math.abs(ny - y);
        acc = Math.min(acc, thisans);
        return acc;
      }, 1e9);
      let Hospitalmin = hospitalPosition.reduce((acc, curr) => {
        let nx = mapping[curr][0];
        let ny = mapping[curr][1];
        let thisans = Math.abs(nx - x) + Math.abs(ny - y);
        acc = Math.min(acc, thisans);
        return acc;
      }, 1e9);
      if (Restaurantmin === 1e9) Restaurantmin = 0;
      if (Gymmin === 1e9) Gymmin = 0;
      if (Hospitalmin === 1e9) Hospitalmin = 0;
      let length = Restaurantmin + Gymmin + 0 + Hospitalmin;
      if (length < ans.point) {
        ans.point = length;
        ans.house = values;
      }
      //console.log(values, x, y, Restaurantmin, Gymmin, Hospitalmin, length);
    }
    console.log("called", ans);
    if (ans?.house) setFinalResult(houseposition.indexOf(ans?.house) + 1);
  }

  return (
    <>
      <MainContainer>
        <TopBar>
          <HeadingText>House Recommendation</HeadingText>
        </TopBar>
        <Container>
          <GridContainer>
            {grid &&
              grid.map((rows, key) => {
                return (
                  <Wrapper>
                    {rows.map((e, k) => {
                      return (
                        <Block
                          value={e}
                          setSelectorBox={setSelectorBox}
                          setblockId={setblockId}
                          houseposition={houseposition}
                          gymPosition={gymPosition}
                          hospitalPosition={hospitalPosition}
                          restaurantPosition={restaurantPosition}
                        />
                      );
                    })}
                  </Wrapper>
                );
              })}
          </GridContainer>
          {selectorBox && (
            <Selector
              setSelectorBox={setSelectorBox}
              initialObject={initialObject}
              blockId={blockId}
              setblockId={setblockId}
              houseposition={houseposition}
              sethouseposition={sethouseposition}
              restaurantPosition={restaurantPosition}
              setRestaurantPosition={setRestaurantPosition}
              gymPosition={gymPosition}
              setGymPosition={setGymPosition}
              hospitalPosition={hospitalPosition}
              setHospitalPosition={setHospitalPosition}
            />
          )}
        </Container>
        <Bottom>
          <SubmitButton onClick={FindResult}>
            <Text>Find Result</Text>
          </SubmitButton>
          {finalResult && (
            <SubmitButton onClick={FindResult}>
              <Text>House {finalResult}</Text>
            </SubmitButton>
          )}
        </Bottom>
      </MainContainer>
    </>
  );
}
export default Grid;
