import React, { useState, useEffect, useContext } from 'react';
import './BidDisplay.css';
import { ShopContext } from '../../Context/ShopContext';
import no_img from '../Assets/no_img2.png';

const BidDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(product.auction_end_date));
  const [showBidHistory, setShowBidHistory] = useState(false);
  const [bidHistory, setBidHistory] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(product.auction_end_date));
    }, 1000);

    return () => clearInterval(timer);
  }, [product.auction_end_date]);

  function getTimeRemaining(endTime) {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  // Function to toggle bid history visibility
  const toggleBidHistory = () => {
    setShowBidHistory(!showBidHistory);
    if (!showBidHistory) {
      fetchBidHistory();
    }
  };

  // Function to fetch bid history
  const fetchBidHistory = () => {
    // Make API call to fetch bid history
    fetch(`http://127.0.0.1:8000/bid/get_bid?id=${product.item_id}`)
      .then(response => response.json())
      .then(data => setBidHistory(data))
      .catch(error => console.error('Error fetching bid history:', error));
  };

  return (
    <div className="biddisplay-container">
      <div className="biddisplay-image">
        <img src={product.pic ? `data:image/jpeg;base64,${product.pic}` : no_img} alt="" />
      </div>
      <div className="biddisplay-details">
        <h3>{product.name}</h3>
        <p>Condition: {product.condition}</p>
        <p>Stock Type: Single</p>
        <div className="bidding-details">
          <p>Starting Bid: ${product.starting_price} (Reserve Price: ${product.current_bid})</p>
          {timeLeft.total <= 0 ? (
            <p>Ended</p>
          ) : (
            <p>Time Left: {timeLeft.days} days {timeLeft.hours} hours {timeLeft.minutes} minutes {timeLeft.seconds} seconds</p>
          )}
          <div className="bid-section">
            <p>Enter your available bid (it's free)</p>
            <input className="bsi"  type="text" placeholder="Bid Amount" />
            <button className="bsb"  onClick={() => addToCart(product.item_id)}>Place Bid</button>
            
          </div>
          <div className="question-section">
            
            <input className="qsi" type="text" placeholder="place a question" />
            <button className="qsb"  onClick={() => addToCart(product.item_id)}>Upload question</button>
            
          </div>
          <button onClick={toggleBidHistory}>Show Bid History</button>
          {showBidHistory && (
            <div className="bid-history">
              <h4>Bid History:</h4>
              <table>
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Bid Amount</th>
                    <th>Bid Time</th>
                  </tr>
                </thead>
                <tbody>
                  {bidHistory.map((bid, index) => (
                    <tr key={index}>
                      <td>{bid.user.name}</td>
                      <td>${bid.bid_amount}</td>
                      <td>{bid.bid_time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BidDisplay;
