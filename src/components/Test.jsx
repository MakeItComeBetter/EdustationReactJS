import React, { useEffect } from "react";

const Test = ({web3Connect, currentAccount, web3}) => {
  // useEffect(() => {
  //   console.log(web3.eth.Contract)
  // }, [web3]);

  const arr = [
    {name: 'Hieu', age: 20, num: 4, game: 3},
    {name: 'Hieu', age: 20, num: 4, game: 3},
    {name: 'Hieu', age: 20, num: 4, game: 3},
    {name: 'Hieu', age: 20, num: 4, game: 3},
    {name: 'Hieu', age: 20, num: 4, game: 3},
    {name: 'Hieu', age: 20, num: 4, game: 3},
    {name: 'Hieu', age: 20, num: 4, game: 3},
    {name: 'Hieu', age: 20, num: 4, game: 3}
  ]

  return <div className="test">
    <span>{currentAccount}</span>
    {/* <p>{web3}</p> */}
    <button type='button' onClick={() => web3Connect()}>Connect</button>
    <table style={{border: '1px solid black', borderCollapse: 'collapse'}}>
      <tr style={{border: '1px solid black'}}>
        <th style={{border: '1px solid black'}}>Name</th>
        <th style={{border: '1px solid black'}}>Age</th>
        <th style={{border: '1px solid black'}}>Num</th>
        <th style={{border: '1px solid black'}}>Name</th>
      </tr>
      {
        arr.map((v, i) => (
          <tr style={{border: '1px solid black'}}>
            <td style={{border: '1px solid black'}} rowSpan={8}>{v.name}</td>
            <td style={{border: '1px solid black'}}>{v.age}</td>
            <td style={{border: '1px solid black'}}>{v.num}</td>
            <td style={{border: '1px solid black'}}>{v.game}</td>
            
          </tr>
        ))
      }
    </table>
    </div>;
};

export default Test;
