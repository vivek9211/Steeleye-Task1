import { useState } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  // My Codes
  const totalOrders = timestamps.results.length;
  // console.log(timestamps.results[0].timestamps.orderSubmitted);
  // console.log(currency);
  // console.log(searchText);

  const handleRowClick = (row, time) => {
    // console.log(row);
    // console.log(time);
    const rowValue = {
      buySellIndicator: row.executionDetails.buySellIndicator,
      orderStatus: row.executionDetails.orderStatus,
      orderType: row.executionDetails.orderType
    }
    // console.log(rowValue);
    const timeValue = {
      orderReceived: time.timestamps.orderReceived,
      orderStatusUpdated: time.timestamps.orderStatusUpdated,
      orderSubmitted: time.timestamps.orderSubmitted
    }
    // console.log(timeValue);
    setSelectedOrderDetails(rowValue);
    setSelectedOrderTimeStamps(timeValue);
  };

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle= {totalOrders} />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List rows={mockData.results} times={timestamps.results} currencySelected={currency} searchID={searchText} onRowClick={handleRowClick} />
      </div>
    </div>
  );
};

export default Dashboard;
