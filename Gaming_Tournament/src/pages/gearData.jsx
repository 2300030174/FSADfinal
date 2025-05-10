// gearData.js
const gamingGear = [
    { name: "Razer Viper V2 Mouse", price: "₹10999", img: "Razer-Viper-v2-proW.jpg" },
    { name: "Razer DeathAdder Mouse", price: "₹6999", img: "Razer-Deathadder-Essential.jpg" },
    { name: "Razer BlackWidow Keyboard", price: "₹14999", img: "Razer-Blackwidow-v4-X-green-switch-yellow-switch.jpg" },
    { name: "Razer Gigantus V2 Mouse Pad", price: "₹2999", img: "Razer Gigantus V2 Mouse Pad.jpg" },
    { name: "Logitech G Pro X Keyboard", price: "₹12999", img: "Logitech G Pro X Keyboard.jpg" },
    { name: "SteelSeries Arctis 7 Headset", price: "₹15999", img: "SteelSeries Arctis 7 Headset.jpg" },
    { name: "HyperX Cloud II Headset", price: "₹8999", img: "HyperX Cloud II Headset.jpg" },
    { name: "Corsair K70 RGB Keyboard", price: "₹13999", img: "Corsair K70 RGB Keyboard.jpg" },
  ];
  
  // Function to get all gaming gear items
  export function getAllGamingGear() {
    return gamingGear;
  }
  
  // Function to get only the first 4 gaming gear items
  export function getLimitedGamingGear(limit = 4) {
    return gamingGear.slice(0, limit);
  }
  