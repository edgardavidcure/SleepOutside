import { getOrders } from "./externalServices.mjs";

export async function orders() {
    const ordersData = await getOrders();
    console.log(ordersData);
    
    if (Array.isArray(ordersData)) {
      const result = ordersData.reduce((groupedOrders, order) => {
        const { fname, lname } = order;
        const fullName = `${fname} ${lname}`;
        
        if (!groupedOrders[fullName]) {
          groupedOrders[fullName] = [];
        }
        groupedOrders[fullName].push(order);
        return groupedOrders;
      }, {});
      
      console.log(result);
    }
  }


  {
    "fname": "Ron",
    "lname": "zcx",
    "street": "cxzc",
    "city": "xzczxcxzcz",
    "state": "555",
    "zip": "555",
    "cardNumber": "1234123412341234",
    "expiration": "05/85",
    "code": "123",
    "orderDate": "2023-06-02T03:26:42.194Z",
    "orderTotal": "991.16",
    "tax": "55.20",
    "shipping": 16,
    "items": [
        {
            "id": "14GVF",
            "price": 229.99,
            "name": "Marmot 5°F Rampart Down Sleeping Bag - 650 Fill, Mummy (For Men and Women)",
            "quantity": 1
        },
        {
            "id": "14GVF",
            "price": 229.99,
            "name": "Marmot 5°F Rampart Down Sleeping Bag - 650 Fill, Mummy (For Men and Women)",
            "quantity": 1
        },
        {
            "id": "14GVF",
            "price": 229.99,
            "name": "Marmot 5°F Rampart Down Sleeping Bag - 650 Fill, Mummy (For Men and Women)",
            "quantity": 1
        },
        {
            "id": "14GVF",
            "price": 229.99,
            "name": "Marmot 5°F Rampart Down Sleeping Bag - 650 Fill, Mummy (For Men and Women)",
            "quantity": 1
        }
    ],
    "id": 350
}