import React, { useEffect, useMemo, useState } from "react";
import ItemManagerContract from "./contracts/ItemManager.json";
import ItemContract from "./contracts/Item.json";
import getWeb3 from "./getWeb3";

const App = () => {

  const [item, setItem] = useState();
  const [itemManager, setItemManager] = useState();
  const [web3, setWeb3] = useState();
  const [accounts, setAccounts] = useState();
  const [loaded, setLoaded] = useState(false);
  const [coast, setCoast] = useState(0);
  const [itemName, setItemName] = useState("");

  useEffect(() => {
    async function connect() {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();

        const ItemManager = new web3.eth.Contract(
          ItemManagerContract.abi,
          ItemManagerContract.networks[networkId] && ItemManagerContract.networks[networkId].address,
        );

        const Item = new web3.eth.Contract(
          ItemContract.abi,
          ItemContract.networks[networkId] && ItemContract.networks[networkId].address,
        );

          setItemManager(ItemManager);
          setItem(Item);
          setWeb3(web3);
          setAccounts(accounts);
          setLoaded(true);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }
  connect();
  }, []);

  const handleSubmit = async () => {
    await itemManager.methods.createItem(itemName, coast).send({ from: accounts[0] });
  }

  const EventTrigger = useMemo(() => {
    return (
      <>
        <h1>Event Trigger / Supply Chain Example</h1>
        <h2>Items</h2>
        <h2>Add items</h2>
        Const in Wei: <input type="text" name="cost" value={coast} onChange={e => setCoast(e.target.value)} />
        Item identifier: <input type="text" name="itemName" value={itemName}  onChange={e => setItemName(e.target.value)}/>
        <button type="button" onClick={handleSubmit}>Create new Item</button>
      </>
    )
  }, [item, coast, itemName]);

  return (
    {loaded} ? (
      EventTrigger
    ) : (
      <h1>loading...</h1>
    )
  )
}
  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(5).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };

// }

export default App;
